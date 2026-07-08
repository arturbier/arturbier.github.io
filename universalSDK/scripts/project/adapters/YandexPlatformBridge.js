// YandexPlatformBridge.js  (Purpose: none — imported by universalSDK.js)
// NOTE: Yandex requires <script src="/sdk.js"> in the page <head>
// (add it as an "html-head" project file) so YaGames is available.

window.YandexPlatformBridge = class YandexPlatformBridge {
    constructor() {
        this.sdk = null;
        this.player = null;
        this._isInitialized = false;
    }

    async initialize() {
        if (this._isInitialized) return;
        if (!window.YaGames) {
            console.error("[Yandex] YaGames SDK not found in window (add sdk.js to <head>)");
            return;
        }
        this.sdk = await window.YaGames.init();
        this._isInitialized = true;
        console.log("[Yandex] SDK Initialized");
        try {
            this.sdk.features?.LoadingAPI?.ready?.();
        } catch (e) { /* optional */ }
    }

    async _getPlayer() {
        if (!this.player) this.player = await this.sdk.getPlayer();
        return this.player;
    }

    // --- Ads ---
    showInterstitial() {
        if (!this.sdk) return;
        this.sdk.adv.showFullscreenAdv({
            callbacks: {
                onOpen: () => console.log("[Yandex] Interstitial opened"),
                onClose: (wasShown) => console.log("[Yandex] Interstitial closed, shown:", wasShown),
                onError: (e) => console.error("[Yandex] Interstitial error:", e)
            }
        });
    }

    showRewarded(onReward, onClose, onError) {
        if (!this.sdk) return;
        this.sdk.adv.showRewardedVideo({
            callbacks: {
                onRewarded: () => { console.log("[Yandex] Reward granted!"); onReward?.(); },
                onClose: () => { console.log("[Yandex] Rewarded closed"); onClose?.(); },
                onError: (e) => { console.error("[Yandex] Rewarded error:", e); onError?.(e); }
            }
        });
    }

    // --- Banner (sticky) ---
    async showBanner() {
        if (!this.sdk) return;
        try { await this.sdk.adv.showBannerAdv(); }
        catch (e) { console.error("[Yandex] Banner error", e); }
    }

    async hideBanner() {
        if (!this.sdk) return;
        try { await this.sdk.adv.hideBannerAdv(); }
        catch (e) { console.error("[Yandex] Hide banner error", e); }
    }

    // --- Storage ---
    async load() {
        if (!this.sdk) return {};
        try {
            const player = await this._getPlayer();
            return (await player.getData()) || {};
        } catch (e) {
            console.error("[Yandex] load error", e);
            return {};
        }
    }

    async save(data) {
        if (!this.sdk) return;
        try {
            const player = await this._getPlayer();
            await player.setData(data, true);
        } catch (e) {
            console.error("[Yandex] save error", e);
        }
    }
};

// Register globally for UniversalSDK
globalThis.yandexAdapter = window.YandexPlatformBridge;
