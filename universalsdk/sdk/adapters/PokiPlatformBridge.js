// PokiPlatformBridge.js — Poki SDK
// Docs: https://sdk.poki.com/html5 (modeled on Playgama's Poki bridge)
//
// Poki moderation checklist:
//   - SDK initialized + gameLoadingFinished() ✓
//   - gameplayStart() at the start of gameplay — MUST be triggered by a real
//     player interaction (call UniversalSDK.gameplayStart() from a button /
//     "Play" event), NOT automatically on load.
//   - gameplayStop() at the end of gameplay / when the tab is hidden ✓
//   - gameplayStart() again on resume (only if it was active before) ✓
// Ads (commercialBreak/rewardedBreak) are NOT wrapped in gameplayStop/Start —
// Poki throttles ads (not every call shows one) and pauses playback itself.
// (Purpose: none — imported by universalSDK.js)
import PlatformBridgeBase from "./PlatformBridgeBase.js";

const SDK_URL = "https://game-cdn.poki.com/scripts/v2/poki-sdk.js";

export default class PokiPlatformBridge extends PlatformBridgeBase {
    get platformId() { return "poki"; }

    get isInterstitialSupported() { return true; }
    get isRewardedSupported() { return true; }
    get isShareSupported() { return true; }

    async initialize() {
        if (this._isInitialized) return;

        await this._loadScript(SDK_URL).catch(() => {});
        this._platformSdk = await this._waitFor("PokiSDK").catch(() => null);
        if (!this._platformSdk) {
            console.error("[Poki] SDK failed to load");
            return;
        }

        try {
            await this._platformSdk.init();
            console.log("[Poki] SDK initialized");
        } catch (e) {
            console.error("[Poki] init error", e); // load game anyway per Poki guidance
        }

        try { this._platformSdk.gameLoadingFinished(); } catch (e) { /* ignore */ }

        this._isInitialized = true;
        this._gameplayActive = false;
        this._userInteracted = false;
        this._wantGameplay = false;
        this._armFirstInteraction();
    }

    // Poki requires gameplayStart() to follow a real player interaction.
    // gameplayStart() may be called early (e.g. On loader layout complete);
    // we DEFER the actual PokiSDK.gameplayStart() until the first genuine
    // click/tap/keypress ("player clicks anywhere → gameplayStart()").
    _armFirstInteraction() {
        const events = ["pointerdown", "touchstart", "keydown", "click"];
        const onInteract = () => {
            this._userInteracted = true;
            events.forEach((ev) => { try { document.removeEventListener(ev, onInteract, true); } catch (e) { /* ignore */ } });
            if (this._wantGameplay) this._doGameplayStart();
        };
        events.forEach((ev) => { try { document.addEventListener(ev, onInteract, true); } catch (e) { /* ignore */ } });
    }

    _doGameplayStart() {
        if (!this._platformSdk || this._gameplayActive) return;
        this._gameplayActive = true;
        try { this._platformSdk.gameplayStart(); } catch (e) { /* ignore */ }
    }

    gameplayStart() {
        this._wantGameplay = true;
        // Only fire once a real interaction has happened (Poki requirement).
        if (this._userInteracted) this._doGameplayStart();
    }

    gameplayStop() {
        this._wantGameplay = false;
        if (!this._platformSdk || !this._gameplayActive) return;
        this._gameplayActive = false;
        try { this._platformSdk.gameplayStop(); } catch (e) { /* ignore */ }
    }

    showInterstitial() {
        if (!this._platformSdk) return;
        this._emit("adstart", "interstitial");
        return this._platformSdk.commercialBreak()
            .then(() => { this._emit("adfinish", "interstitial"); })
            .catch((e) => { console.error("[Poki] Interstitial error", e); this._emit("adfinish", "interstitial"); });
    }

    showRewarded(onReward, onClose, onError) {
        if (!this._platformSdk) { if (onError) onError(new Error("Poki not ready")); return; }
        this._emit("adstart", "rewarded");
        return this._platformSdk.rewardedBreak()
            .then((withReward) => {
                this._emit("adfinish", "rewarded");
                if (withReward) { if (onReward) onReward(); }
                else if (onError) onError(new Error("no reward"));
                if (onClose) onClose();
            })
            .catch((e) => {
                console.error("[Poki] Rewarded error", e);
                this._emit("adfinish", "rewarded");
                if (onError) onError(e);
                if (onClose) onClose();
            });
    }

    async share(options = {}) {
        return this._platformSdk.shareableURL(options.params || {});
    }
}
