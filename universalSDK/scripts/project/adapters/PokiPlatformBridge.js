// PokiPlatformBridge.js — Poki SDK
// Docs: https://sdk.poki.com/html5
// Ads + share; storage falls back to localStorage (base class).
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
            this._platformSdk.gameLoadingFinished();
            this._isInitialized = true;
            console.log("[Poki] SDK initialized");
        } catch (e) {
            console.error("[Poki] init error", e);
            this._isInitialized = true; // load game anyway per Poki guidance
        }
    }

    async showInterstitial() {
        if (!this._platformSdk) return;
        this._platformSdk.gameplayStop();
        this._emit("adstart");
        try {
            await this._platformSdk.commercialBreak();
        } catch (e) {
            console.error("[Poki] Interstitial error", e);
        }
        this._emit("adfinish");
        this._platformSdk.gameplayStart();
    }

    async showRewarded(onReward, onClose, onError) {
        if (!this._platformSdk) { if (onError) onError(new Error("Poki not ready")); return; }
        this._platformSdk.gameplayStop();
        this._emit("adstart");
        try {
            const withReward = await this._platformSdk.rewardedBreak();
            this._emit("adfinish");
            if (withReward) { if (onReward) onReward(); }
            else if (onError) onError(new Error("No reward"));
        } catch (e) {
            console.error("[Poki] Rewarded error", e);
            this._emit("adfinish");
            if (onError) onError(e);
        }
        if (onClose) onClose();
        this._platformSdk.gameplayStart();
    }

    gameplayStart() { try { this._platformSdk?.gameplayStart(); } catch (e) { /* ignore */ } }
    gameplayStop() { try { this._platformSdk?.gameplayStop(); } catch (e) { /* ignore */ } }

    async share(options = {}) {
        return this._platformSdk.shareableURL(options.params || {});
    }
}
