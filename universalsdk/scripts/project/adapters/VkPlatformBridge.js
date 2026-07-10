// VkPlatformBridge.js — VK Games / VK Mini Apps
// (Purpose: none — imported by universalSDK.js)

import PlatformBridgeBase from "./PlatformBridgeBase.js";

const SDK_URL = "https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js";

export default class VkPlatformBridge extends PlatformBridgeBase {
    get platformId() { return "vk"; }

    get isInterstitialSupported() { return true; }
    get isRewardedSupported() { return true; }
    get isBannerSupported() { return true; }
    get isPlayerAuthorizationSupported() { return true; }
    get isShareSupported() { return true; }
    get isInviteSupported() { return true; }
    get isClipboardSupported() { return true; }
    get isJoinCommunitySupported() { return true; }
    get isAddToHomeScreenSupported() { return this._platform === "html5_android"; }
    get isAddToFavoritesSupported() { return true; }

    async initialize() {
        if (this._isInitialized) return;

        this._appId = new URLSearchParams(location.search).get("vk_app_id") || "";
        this._platform = new URLSearchParams(location.search).get("vk_platform") || "";

        await this._loadScript(SDK_URL).catch(() => {});
        this._platformSdk = await this._waitFor("vkBridge").catch(() => null);
        if (!this._platformSdk) {
            console.error("[VK] vkBridge failed to load");
            return;
        }

        try {
            await this._platformSdk.send("VKWebAppInit");
            const data = await this._platformSdk.send("VKWebAppGetUserInfo");
            if (data) {
                this._playerId = data.id;
                this._playerName = `${data.first_name} ${data.last_name}`.trim();
                this._isPlayerAuthorized = true;
            }
        } catch (e) {
            console.error("[VK] init error", e);
        }
        this._isInitialized = true;
    }

    async showInterstitial() {
        if (!this._platformSdk) return;
        this._emit("adstart", "interstitial");
        try {
            await this._platformSdk.send("VKWebAppShowNativeAds", { ad_format: "interstitial" });
        } catch (e) {
            console.error("[VK] Interstitial error", e);
        }
        this._emit("adfinish", "interstitial");
    }

    async showRewarded(onReward, onClose, onError) {
        if (!this._platformSdk) { if (onError) onError(new Error("VK not ready")); return; }
        this._emit("adstart", "rewarded");
        try {
            const data = await this._platformSdk.send("VKWebAppShowNativeAds", { ad_format: "reward", use_waterfall: true });
            if (data && data.result) { if (onReward) onReward(); }
            else if (onError) onError(data);
        } catch (e) {
            console.error("[VK] Reward error", e);
            if (onError) onError(e);
        }
        this._emit("adfinish", "rewarded");
        if (onClose) onClose();
    }

    async showBanner(pos = "bottom") {
        if (!this._platformSdk) return;
        try { await this._platformSdk.send("VKWebAppShowBannerAd", { banner_location: pos }); }
        catch (e) { console.error("[VK] Banner error", e); }
    }

    async hideBanner() {
        if (!this._platformSdk) return;
        try { await this._platformSdk.send("VKWebAppHideBannerAd"); }
        catch (e) { console.error("[VK] Hide banner error", e); }
    }

    async authorizePlayer() {
        // VK players are always authorized inside the mini app.
        return Promise.resolve();
    }

    async share(options = {}) {
        // Never share the raw hosting URL — share the VK app page instead.
        const link = options.link || (this._appId ? `https://vk.com/app${this._appId}` : undefined);
        return this._platformSdk.send("VKWebAppShare", link ? { link } : {});
    }

    async inviteFriends() {
        return this._platformSdk.send("VKWebAppShowInviteBox", {});
    }

    async clipboardWrite(text) {
        if (!this._platformSdk) return super.clipboardWrite(text);
        try {
            await this._platformSdk.send("VKWebAppCopyText", { text: String(text) });
        } catch (e) {
            return super.clipboardWrite(text);
        }
    }

    // Subscribe to a VK community. options: { groupId }
    async joinCommunity(options = {}) {
        let groupId = options.groupId || this._options.groupId;
        if (!groupId) { console.warn("[VK] groupId not set — fill config.js platforms.vk.groupId or pass { groupId }"); return Promise.reject(new Error("VK: groupId not set")); }
        groupId = parseInt(groupId, 10);
        if (Number.isNaN(groupId)) return Promise.reject(new Error("VK: invalid groupId"));
        const result = await this._platformSdk.send("VKWebAppJoinGroup", { group_id: groupId });
        try { window.open(`https://vk.com/public${groupId}`); } catch (e) { /* ignore */ }
        return result;
    }

    // Add game shortcut to the device home screen (Android only).
    async addToHomeScreen() {
        return this._platformSdk.send("VKWebAppAddToHomeScreen", {});
    }

    // Add game to the user's VK favorites.
    async addToFavorites() {
        return this._platformSdk.send("VKWebAppAddToFavorites", {});
    }
}
