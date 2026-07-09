// OkPlatformBridge.js — Odnoklassniki (OK) Games
// Docs: https://apiok.ru/dev/sdk/js , https://apiok.ru/apps/features/ads
// (Purpose: none — imported by universalSDK.js)

import PlatformBridgeBase from "./PlatformBridgeBase.js";

const SDK_URL = "//api.ok.ru/js/fapi5.js";

export default class OkPlatformBridge extends PlatformBridgeBase {
    constructor(options) {
        super(options);
        this._pendingSocial = {};
    }

    get platformId() { return "ok"; }

    get isInterstitialSupported() { return true; }
    get isRewardedSupported() { return true; }
    get isBannerSupported() { return true; }
    get isShareSupported() { return true; }
    get isInviteSupported() { return true; }
    get isJoinCommunitySupported() { return true; }

    async initialize() {
        if (this._isInitialized) return;

        await this._loadScript(SDK_URL).catch(() => {});
        this._platformSdk = await this._waitFor("FAPI").catch(() => null);
        if (!this._platformSdk) {
            console.error("[OK] FAPI failed to load");
            return;
        }

        // Route FAPI UI callbacks (ads + social) into this adapter.
        window.API_callback = (method, result, data) => this._onApiCallback(method, result, data);

        let params;
        try { params = this._platformSdk.Util.getRequestParameters(); }
        catch (e) {
            const p = new URLSearchParams(location.search);
            params = { api_server: p.get("api_server"), apiconnection: p.get("apiconnection") };
        }

        // App id for referencing the OK game in feed posts (not the hosting URL).
        this._appId = params["application_id"] || params["app_id"] || "";

        await new Promise((resolve) => {
            try {
                this._platformSdk.init(
                    params["api_server"] || "",
                    params["apiconnection"] || "",
                    () => { this._isInitialized = true; console.log("[OK] Platform initialized"); resolve(); },
                    (err) => { console.error("[OK] init error", err); resolve(); }
                );
            } catch (e) { console.error("[OK] init exception", e); resolve(); }
        });
    }

    _onApiCallback(method, result, data) {
        const pending = this._pendingSocial[method];
        if (pending) {
            delete this._pendingSocial[method];
            if (result === "ok" || result === true) pending.resolve(data);
            else pending.reject(new Error(`[OK] ${method}: ${result}`));
        }
    }

    _socialPromise(method) {
        return new Promise((resolve, reject) => {
            this._pendingSocial[method] = { resolve, reject };
            // Fallback so the game never hangs if OK sends no callback.
            setTimeout(() => {
                if (this._pendingSocial[method]) {
                    delete this._pendingSocial[method];
                    resolve();
                }
            }, 30000);
        });
    }

    showInterstitial() {
        this._emit("adstart", "interstitial");
        try { this._platformSdk.UI.showAd(); }
        catch (e) { console.error("[OK] Interstitial error", e); this._emit("adfinish", "interstitial"); }
    }

    showRewarded(onReward, onClose, onError) {
        this._emit("adstart", "rewarded");
        try {
            this._platformSdk.UI.loadAd({
                onLoad: (ad) => {
                    try {
                        this._platformSdk.UI.showLoadedAd(ad);
                        if (onReward) onReward();
                    } catch (e) { if (onError) onError(e); }
                    finally { this._emit("adfinish", "rewarded"); if (onClose) onClose(); }
                },
                onError: (err) => { console.error("[OK] Ad load failed", err); this._emit("adfinish", "rewarded"); if (onError) onError(err); }
            });
        } catch (e) { console.error("[OK] loadAd error", e); this._emit("adfinish", "rewarded"); if (onError) onError(e); }
    }

    showBanner() {
        try {
            this._platformSdk.UI.requestBannerAds?.();
            this._platformSdk.UI.showBannerAds();
        } catch (e) { console.error("[OK] Banner error", e); }
    }

    hideBanner() {
        try { this._platformSdk.UI.hideBannerAds(); }
        catch (e) { console.error("[OK] Hide banner error", e); }
    }

    // Post to the user's feed (share). options: { text, link }
    async share(options = {}) {
        if (!this._platformSdk) return Promise.reject(new Error("OK not ready"));
        const media = [];
        if (options.text) media.push({ type: "text", text: options.text });
        // Reference the OK game itself, not the raw hosting URL.
        if (this._appId) media.push({ type: "app-ref", appId: this._appId });
        else if (options.link) media.push({ type: "link", url: options.link });
        const attachment = { media };
        const promise = this._socialPromise("postMediatopic");
        try { this._platformSdk.UI.postMediatopic(attachment, "on"); }
        catch (e) { delete this._pendingSocial.postMediatopic; return Promise.reject(e); }
        return promise;
    }

    // Invite friends. options: { text, params, selectedUids }
    async inviteFriends(options = {}) {
        if (!this._platformSdk) return Promise.reject(new Error("OK not ready"));
        const text = (options.text || "Join me!").slice(0, 120);
        const promise = this._socialPromise("showInvite");
        try { this._platformSdk.UI.showInvite(text, options.params || "", options.selectedUids || ""); }
        catch (e) { delete this._pendingSocial.showInvite; return Promise.reject(e); }
        return promise;
    }

    // Subscribe to an OK group. options: { groupId, enableMessages }
    async joinCommunity(options = {}) {
        if (!this._platformSdk) return Promise.reject(new Error("OK not ready"));
        const groupId = options.groupId || this._options.groupId;
        if (!groupId) { console.warn("[OK] groupId not set — fill config.js platforms.ok.groupId or pass { groupId }"); return Promise.reject(new Error("OK: groupId not set")); }
        const promise = this._socialPromise("joinGroup");
        try { this._platformSdk.UI.joinGroup(groupId, options.enableMessages ?? false); }
        catch (e) { delete this._pendingSocial.joinGroup; return Promise.reject(e); }
        return promise;
    }
}
