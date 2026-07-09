// YandexPlatformBridge.js — Yandex Games
// Requires <script src="/sdk.js"> in <head> (html-head file) so YaGames exists.
// (Purpose: none — imported by universalSDK.js)

import PlatformBridgeBase from "./PlatformBridgeBase.js";

export default class YandexPlatformBridge extends PlatformBridgeBase {
    constructor(options) {
        super(options);
        this._player = null;
    }

    get platformId() { return "yandex"; }

    get isInterstitialSupported() { return true; }
    get isRewardedSupported() { return true; }
    get isBannerSupported() { return true; }
    get isPlayerAuthorizationSupported() { return true; }
    get isRateSupported() { return true; }
    get isClipboardSupported() { return true; }
    get isAddToHomeScreenSupported() { return true; }

    async initialize() {
        if (this._isInitialized) return;
        if (typeof YaGames === "undefined") {
            console.error("[Yandex] YaGames not found (add sdk.js to <head>)");
            return;
        }
        this._platformSdk = await YaGames.init();
        this._isInitialized = true;
        console.log("[Yandex] SDK Initialized");
        try { this._platformSdk.features?.LoadingAPI?.ready?.(); } catch (e) { /* optional */ }

        try {
            this._player = await this._platformSdk.getPlayer({ scopes: false });
            this._playerName = this._player.getName();
            this._playerId = this._player.getUniqueID();
            this._isPlayerAuthorized = this._player.getMode() !== "lite";
        } catch (e) { /* player optional */ }
    }

    async _getPlayer() {
        if (!this._player) this._player = await this._platformSdk.getPlayer();
        return this._player;
    }

    showInterstitial() {
        if (!this._platformSdk) return;
        this._platformSdk.adv.showFullscreenAdv({
            callbacks: {
                onOpen: () => this._emit("adstart", "interstitial"),
                onClose: () => this._emit("adfinish", "interstitial"),
                onError: (e) => { console.error("[Yandex] Interstitial error", e); this._emit("adfinish", "interstitial"); }
            }
        });
    }

    showRewarded(onReward, onClose, onError) {
        if (!this._platformSdk) { if (onError) onError(new Error("Yandex not ready")); return; }
        this._platformSdk.adv.showRewardedVideo({
            callbacks: {
                onOpen: () => this._emit("adstart", "rewarded"),
                onRewarded: () => { if (onReward) onReward(); },
                onClose: () => { this._emit("adfinish", "rewarded"); if (onClose) onClose(); },
                onError: (e) => { console.error("[Yandex] Rewarded error", e); this._emit("adfinish", "rewarded"); if (onError) onError(e); }
            }
        });
    }

    async showBanner() {
        if (!this._platformSdk) return;
        try { await this._platformSdk.adv.showBannerAdv(); }
        catch (e) { console.error("[Yandex] Banner error", e); }
    }

    async hideBanner() {
        if (!this._platformSdk) return;
        try { await this._platformSdk.adv.hideBannerAdv(); }
        catch (e) { console.error("[Yandex] Hide banner error", e); }
    }

    async load() {
        if (!this._platformSdk) return {};
        try {
            const player = await this._getPlayer();
            return (await player.getData()) || {};
        } catch (e) { console.error("[Yandex] load error", e); return {}; }
    }

    async save(data) {
        if (!this._platformSdk) return;
        try {
            const player = await this._getPlayer();
            await player.setData(data, true);
        } catch (e) { console.error("[Yandex] save error", e); }
    }

    async authorizePlayer() {
        if (!this._platformSdk) return Promise.reject(new Error("Yandex not ready"));
        await this._platformSdk.auth.openAuthDialog();
        this._player = await this._platformSdk.getPlayer();
        this._playerName = this._player.getName();
        this._playerId = this._player.getUniqueID();
        this._isPlayerAuthorized = this._player.getMode() !== "lite";
    }

    async rateGame() {
        if (!this._platformSdk || !this._platformSdk.feedback) return Promise.reject(new Error("not supported"));
        return this._platformSdk.feedback.canReview().then(({ value }) => {
            if (value) return this._platformSdk.feedback.requestReview();
        });
    }

    async clipboardWrite(text) {
        if (!this._platformSdk) return super.clipboardWrite(text);
        try {
            await this._platformSdk.clipboard.writeText(String(text));
        } catch (e) {
            return super.clipboardWrite(text);
        }
    }

    async addToHomeScreen() {
        if (!this._platformSdk || !this._platformSdk.shortcut) return Promise.reject(new Error("Yandex: shortcut unavailable"));
        const canShow = await this._platformSdk.shortcut.canShowPrompt();
        if (!canShow || !canShow.canShow) return Promise.reject(new Error("Yandex: prompt not available"));
        return this._platformSdk.shortcut.showPrompt();
    }

    // Yandex GameplayAPI — signal real gameplay start/stop (pauses ads etc.).
    gameplayStart() {
        try { this._platformSdk?.features?.GameplayAPI?.start?.(); } catch (e) { /* ignore */ }
    }

    gameplayStop() {
        try { this._platformSdk?.features?.GameplayAPI?.stop?.(); } catch (e) { /* ignore */ }
    }
}
