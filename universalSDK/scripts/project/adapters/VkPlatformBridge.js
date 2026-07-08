// VkPlatformBridge.js  (Purpose: none — imported by universalSDK.js)

window.VkPlatformBridge = class VkPlatformBridge {
    constructor() {
        this.sdk = null;
        this._isInitialized = false;
        this._playerId = null;
    }

    async initialize() {
        if (this._isInitialized) return;

        await new Promise((resolve) => {
            if (window.vkBridge) return resolve();
            const script = document.createElement("script");
            script.src = "https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js";
            script.onload = () => resolve();
            script.onerror = () => resolve();
            document.head.appendChild(script);
        });

        this.sdk = window.vkBridge;
        if (!this.sdk) {
            console.error("[VK] vkBridge failed to load");
            return;
        }

        try {
            await this.sdk.send("VKWebAppInit");
            const data = await this.sdk.send("VKWebAppGetUserInfo");
            this._playerId = data.id;
            console.log("[VK] User info loaded:", data.first_name);
        } catch (e) {
            console.error("[VK] init error", e);
        }
        this._isInitialized = true;
    }

    // --- Ads ---
    async showInterstitial() {
        if (!this.sdk) return;
        try {
            const data = await this.sdk.send("VKWebAppShowNativeAds", { ad_format: "interstitial" });
            console.log("[VK] Interstitial result:", data.result);
        } catch (e) {
            console.error("[VK] Interstitial error", e);
        }
    }

    async showRewarded(onReward, onClose, onError) {
        if (!this.sdk) return;
        try {
            const data = await this.sdk.send("VKWebAppShowNativeAds", { ad_format: "reward", use_waterfall: true });
            if (data && data.result) {
                console.log("[VK] Reward granted!");
                onReward?.();
            } else {
                onError?.(data);
            }
            onClose?.();
        } catch (e) {
            console.error("[VK] Reward error", e);
            onError?.(e);
        }
    }

    // --- Banner ---
    async showBanner(pos = "bottom") {
        if (!this.sdk) return;
        try {
            await this.sdk.send("VKWebAppShowBannerAd", { banner_location: pos });
        } catch (e) {
            console.error("[VK] Banner error", e);
        }
    }

    async hideBanner() {
        if (!this.sdk) return;
        try {
            await this.sdk.send("VKWebAppHideBannerAd");
        } catch (e) {
            console.error("[VK] Hide banner error", e);
        }
    }

    // --- Storage ---
    async load() {
        if (!this.sdk) return {};
        try {
            const res = await this.sdk.send("VKWebAppStorageGet", { keys: ["save"] });
            const item = res && res.keys && res.keys[0];
            if (item && item.value) return JSON.parse(item.value);
        } catch (e) {
            console.error("[VK] load error", e);
        }
        return {};
    }

    async save(data) {
        if (!this.sdk) return;
        try {
            await this.sdk.send("VKWebAppStorageSet", { key: "save", value: JSON.stringify(data) });
        } catch (e) {
            console.error("[VK] save error", e);
        }
    }
};

// Register globally for UniversalSDK
globalThis.vkAdapter = window.VkPlatformBridge;
