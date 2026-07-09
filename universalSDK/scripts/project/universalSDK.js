// =====================================================
// UniversalSDK | v2.0 | Modular multi-platform bridge
// Main entry (Purpose: main)
//
// Requires project setting "Use worker" = "DOM".
// Own implementation (patterns inspired by open bridges,
// implemented from official platform docs).
// =====================================================

import UniversalSDKConfig from "./config.js";
import LocalPlatformBridge from "./adapters/localAdapter.js";
import VkPlatformBridge from "./adapters/VkPlatformBridge.js";
import OkPlatformBridge from "./adapters/OkPlatformBridge.js";
import YandexPlatformBridge from "./adapters/YandexPlatformBridge.js";
import CrazyGamesPlatformBridge from "./adapters/CrazyGamesPlatformBridge.js";
import GameDistributionPlatformBridge from "./adapters/GameDistributionPlatformBridge.js";
import PokiPlatformBridge from "./adapters/PokiPlatformBridge.js";

const ADAPTERS = {
    local: LocalPlatformBridge,
    vk: VkPlatformBridge,
    ok: OkPlatformBridge,
    yandex: YandexPlatformBridge,
    crazygames: CrazyGamesPlatformBridge,
    gamedistribution: GameDistributionPlatformBridge,
    poki: PokiPlatformBridge
};

window.UniversalSDK = {
    platform: "local",
    adapter: null,
    isReady: false,
    debug: true,
    config: UniversalSDKConfig,
    _initPromise: null,

    log(text, type = "info") {
        if (!this.debug) return;
        if (type === "init") {
            console.log(
                `[SDK] UNIVERSALSDK READY | PLATFORM: ${this.platform.toUpperCase()}`
            );
        } else {
            console.log("[SDK] " + text);
        }
    },

    // ---------- platform detection ----------
    // Order: ?platform= > config.forcedPlatform > auto > local
    // NOTE: VK and OK games now share VK's infrastructure, so on OK the VK
    // bridge (vkBridge / vk_app_id) is ALSO present. Therefore OK must be
    // detected BEFORE VK, using OK-specific launch params / FAPI / ok.ru host.
    _detectPlatform() {
        const p = new URLSearchParams(location.search);
        const forced = p.get("platform") || this.config.forcedPlatform;
        if (forced && ADAPTERS[forced]) return forced;

        // Top-window host chain — robust discriminator on the shared VK/OK infra.
        let hostChain = "";
        try { hostChain = Array.from(location.ancestorOrigins || []).join(" "); } catch (e) { /* ignore */ }
        hostChain += " " + (document.referrer || "");
        this._detectSignals = {
            api_server: p.has("api_server"),
            application_key: p.has("application_key"),
            apiconnection: p.has("apiconnection"),
            vk_app_id: p.has("vk_app_id"),
            FAPI: typeof FAPI !== "undefined",
            vkBridge: typeof vkBridge !== "undefined",
            host: hostChain.trim()
        };

        if (typeof YaGames !== "undefined") return "yandex";

        // OK BEFORE VK
        if (p.has("api_server") || p.has("apiconnection") || p.has("application_key")) return "ok";
        if (typeof FAPI !== "undefined") return "ok";
        if (/ok\.ru/.test(hostChain)) return "ok";

        if (p.has("vk_app_id") || typeof vkBridge !== "undefined" || /vk\.(com|ru)/.test(hostChain)) return "vk";

        return "local";
    },

    // init() is idempotent and safe to call multiple times.
    init() {
        if (!this._initPromise) this._initPromise = this._doInit();
        return this._initPromise;
    },

    async _doInit() {
        this.platform = this._detectPlatform();
        console.log("[SDK] Detected platform: " + this.platform, this._detectSignals || {});

        let AdapterClass = ADAPTERS[this.platform];
        if (!AdapterClass) {
            console.error("[SDK] Adapter not found for " + this.platform + " -> fallback to local");
            this.platform = "local";
            AdapterClass = ADAPTERS.local;
        }

        const options = (this.config.platforms && this.config.platforms[this.platform]) || {};
        this.adapter = new AdapterClass(options);

        try { await this.adapter.initialize(); }
        catch (e) { console.error("[SDK] Adapter init failed", e); }

        this.isReady = true;
        this.log("READY", "init");
        return this.platform;
    },

    getPlatform() { return this.platform; },
    _ensureReady() { return this.init(); },

    // ---------- capabilities ----------
    // feature: interstitial|rewarded|banner|playerAuth|share|invite
    async isSupported(feature) {
        await this._ensureReady();
        const map = {
            interstitial: "isInterstitialSupported",
            rewarded: "isRewardedSupported",
            banner: "isBannerSupported",
            playerAuth: "isPlayerAuthorizationSupported",
            share: "isShareSupported",
            invite: "isInviteSupported",
            rate: "isRateSupported",
            clipboard: "isClipboardSupported",
            joinCommunity: "isJoinCommunitySupported"
        };
        return !!this.adapter[map[feature]];
    },

    // ---------- advertisement ----------
    async showInterstitial() {
        await this._ensureReady();
        return this.adapter.showInterstitial();
    },
    async showRewarded(onReward, onClose, onError) {
        await this._ensureReady();
        return this.adapter.showRewarded(onReward, onClose, onError);
    },
    async showBanner(pos) {
        await this._ensureReady();
        return this.adapter.showBanner(pos);
    },
    async hideBanner() {
        await this._ensureReady();
        return this.adapter.hideBanner();
    },

    // ---------- gameplay signals ----------
    async gameplayStart() { await this._ensureReady(); return this.adapter.gameplayStart(); },
    async gameplayStop() { await this._ensureReady(); return this.adapter.gameplayStop(); },

    // ---------- storage ----------
    async load() { await this._ensureReady(); return (await this.adapter.load()) ?? {}; },
    async save(data) { await this._ensureReady(); return this.adapter.save(data); },
    async getData(key) { await this._ensureReady(); return this.adapter.getData(key); },
    async setData(key, value) { await this._ensureReady(); return this.adapter.setData(key, value); },

    // ---------- player ----------
    async authorizePlayer() { await this._ensureReady(); return this.adapter.authorizePlayer(); },
    async isPlayerAuthorized() { await this._ensureReady(); return this.adapter.isPlayerAuthorized; },
    async getPlayerId() { await this._ensureReady(); return this.adapter.playerId; },
    async getPlayerName() { await this._ensureReady(); return this.adapter.playerName; },

    // ---------- social ----------
    async share(options) { await this._ensureReady(); return this.adapter.share(options); },
    async inviteFriends(options) { await this._ensureReady(); return this.adapter.inviteFriends(options); },
    async joinCommunity(options) { await this._ensureReady(); return this.adapter.joinCommunity(options); },

    // ---------- rate / clipboard / misc ----------
    async rateGame() { await this._ensureReady(); return this.adapter.rateGame(); },
    async clipboardWrite(text) { await this._ensureReady(); return this.adapter.clipboardWrite(text); },
    async happyTime() { await this._ensureReady(); return this.adapter.happyTime(); },

    // ---------- ad lifecycle events (adstart / adfinish) ----------
    async on(event, cb) { await this._ensureReady(); this.adapter.on(event, cb); },
    async off(event, cb) { await this._ensureReady(); this.adapter.off(event, cb); }
};
