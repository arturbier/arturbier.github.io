// =====================================================
// UniversalSDK | v1.1 | Modular
// Main entry (Purpose: main)
//
// Requires project setting "Use worker" = "DOM".
// Adapters register themselves on window.<platform>Adapter
// and are pulled in via the imports below (side-effect imports).
// =====================================================

import "./adapters/localAdapter.js";
import "./adapters/VkPlatformBridge.js";
import "./adapters/YandexPlatformBridge.js";
import "./adapters/OkPlatformBridge.js";

window.UniversalSDK = {
    platform: "local",
    adapter: null,
    isReady: false,
    debug: true,
    _initPromise: null,

    log(text, type = "info") {
        if (!this.debug) return;
        if (type === "init") {
            console.log(
                `[SDK] UNIVERSAL_SDK READY | PLATFORM: ${this.platform.toUpperCase()}`
            );
        } else {
            console.log("[SDK] " + text);
        }
    },

    // ---------------------------------------------
    // Platform detection
    // VK/OK inject their bridge later, so we also
    // look at launch URL params, not just globals.
    // ---------------------------------------------
    _detectPlatform() {
        const p = new URLSearchParams(location.search);
        if (typeof YaGames !== "undefined") return "yandex";
        if (typeof vkBridge !== "undefined" || p.has("vk_app_id")) return "vk";
        if (typeof FAPI !== "undefined" || p.has("api_server")) return "ok";
        return "local";
    },

    // init() is idempotent and safe to call many times.
    init() {
        if (!this._initPromise) this._initPromise = this._doInit();
        return this._initPromise;
    },

    async _doInit() {
        this.platform = this._detectPlatform();
        console.log("[SDK] Detected platform: " + this.platform);

        let AdapterClass = window[this.platform + "Adapter"];
        if (!AdapterClass) {
            console.error("[SDK] Adapter not found for " + this.platform + " -> fallback to local");
            this.platform = "local";
            AdapterClass = window.localAdapter;
        }

        this.adapter = new AdapterClass();
        try {
            await this.adapter.initialize?.();
        } catch (e) {
            console.error("[SDK] Adapter init failed", e);
        }

        this.isReady = true;
        this.log("READY", "init");
        return this.platform;
    },

    getPlatform() {
        return this.platform;
    },

    _ensureReady() {
        return this.init();
    },

    // ---------------------------------------------
    // Delegation (safe: waits for init, optional calls)
    // ---------------------------------------------
    async showInterstitial() {
        await this._ensureReady();
        return this.adapter.showInterstitial?.();
    },
    async showRewarded(onReward, onClose, onError) {
        await this._ensureReady();
        return this.adapter.showRewarded?.(onReward, onClose, onError);
    },
    async load() {
        await this._ensureReady();
        return (await this.adapter.load?.()) ?? {};
    },
    async save(data) {
        await this._ensureReady();
        return this.adapter.save?.(data);
    },
    async showBanner(pos) {
        await this._ensureReady();
        return this.adapter.showBanner?.(pos);
    },
    async hideBanner() {
        await this._ensureReady();
        return this.adapter.hideBanner?.();
    }
};
