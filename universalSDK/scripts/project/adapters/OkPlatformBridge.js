// OkPlatformBridge.js — Odnoklassniki (OK) Games via FAPI
// Modeled on Playgama's proven OK integration.
//
// IMPORTANT: on the merged VK/OK games infrastructure FAPI is already
// initialized by the platform launcher and the OK launch params (api_server /
// apiconnection) are NOT present in the game iframe URL. In that case we must
// NOT call FAPI.init again — we just use window.FAPI as-is.
// (Purpose: none — imported by universalSDK.js)

import PlatformBridgeBase from "./PlatformBridgeBase.js";

const SDK_URL = "//api.ok.ru/js/fapi5.js";

export default class OkPlatformBridge extends PlatformBridgeBase {
    constructor(options) {
        super(options);
        this._pending = {};       // per-UI-method promise settlers
        this._rewardCb = null;
        this._bannerPosition = null;
    }

    get platformId() { return "ok"; }
    get isInterstitialSupported() { return true; }
    get isRewardedSupported() { return true; }
    get isBannerSupported() { return true; }
    get isShareSupported() { return true; }
    get isInviteSupported() { return true; }
    get isRateSupported() { return true; }
    get isJoinCommunitySupported() { return true; }
    get isPlayerAuthorizationSupported() { return true; }
    get isClipboardSupported() { return false; }

    async initialize() {
        if (this._isInitialized) return;

        this._platformSdk = (typeof FAPI !== "undefined")
            ? FAPI
            : await this._loadScript(SDK_URL).then(() => this._waitFor("FAPI", 8000)).catch(() => null);

        if (!this._platformSdk) { console.error("[OK] FAPI unavailable"); return; }

        // Route FAPI UI callbacks here; chain onto the platform's own handler.
        const prev = window.API_callback;
        window.API_callback = (method, result, data) => {
            if (typeof prev === "function") { try { prev(method, result, data); } catch (e) { /* ignore */ } }
            const handler = this._apiHandlers[method];
            if (handler) { try { handler(result, data); } catch (e) { console.error("[OK] callback", method, e); } }
        };

        // Classic OK: init with launch params. On the merged infra those params
        // are absent and FAPI is already initialized by the platform — skip init.
        let params = {};
        try { params = this._platformSdk.Util.getRequestParameters() || {}; } catch (e) { /* ignore */ }
        if (params.api_server && params.apiconnection) {
            await new Promise((resolve) => {
                try { this._platformSdk.init(params.api_server, params.apiconnection, resolve, resolve); }
                catch (e) { resolve(); }
            });
        } else {
            console.log("[OK] Using platform-initialized FAPI (merged VK/OK infra)");
        }

        this._isInitialized = true;

        // Best-effort player profile.
        try {
            this._platformSdk.Client.call(
                { fields: "uid,name,pic50x50", method: "users.getCurrentUser" },
                (status, data) => {
                    if (status === "ok" && data) {
                        this._playerId = data.uid;
                        this._playerName = data.name;
                        this._isPlayerAuthorized = true;
                    }
                }
            );
        } catch (e) { /* optional */ }
    }

    // ---------------- ads ----------------
    showInterstitial() {
        this._emit("adstart", "interstitial");
        try { this._platformSdk.UI.showAd(); }
        catch (e) { console.error("[OK] interstitial", e); this._emit("adfinish", "interstitial"); }
    }

    showRewarded(onReward, onClose, onError) {
        this._rewardCb = { onReward, onClose, onError };
        this._emit("adstart", "rewarded");
        try { this._platformSdk.UI.loadAd(); }
        catch (e) { console.error("[OK] loadAd", e); this._emit("adfinish", "rewarded"); if (onError) onError(e); this._rewardCb = null; }
    }

    // ---------------- banner ----------------
    showBanner(position) {
        this._bannerPosition = position;
        try { this._platformSdk.invokeUIMethod("requestBannerAds"); }
        catch (e) { console.error("[OK] banner", e); }
    }

    hideBanner() {
        try { this._platformSdk.invokeUIMethod("hideBannerAds"); }
        catch (e) { console.error("[OK] hide banner", e); }
    }

    // ---------------- social ----------------
    share(options = {}) {
        const media = [];
        if (options.text) media.push({ type: "text", text: options.text });
        return this._call("postMediatopic", () => this._platformSdk.UI.postMediatopic({ media }, false));
    }

    inviteFriends(options = {}) {
        const text = (options.text || "Play with me!").slice(0, 120);
        return this._call("showInvite", () => this._platformSdk.UI.showInvite(text));
    }

    rateGame() {
        return this._call("showRatingDialog", () => this._platformSdk.UI.showRatingDialog());
    }

    joinCommunity(options = {}) {
        const groupId = options.groupId || this._options.groupId;
        if (!groupId) { console.warn("[OK] groupId not set — fill config.js platforms.ok.groupId"); return Promise.reject(new Error("OK: groupId not set")); }
        const enableMessages = options.enableMessages ?? this._options.enableMessages ?? false;
        // resolveOnError: an already-subscribed user gets "error"; treat as done.
        return this._call("joinGroup", () => this._platformSdk.UI.joinGroup(groupId, enableMessages), true);
    }

    // ---------------- callback plumbing ----------------
    _call(method, fn, resolveOnError = false) {
        return new Promise((resolve, reject) => {
            this._pending[method] = { resolve, reject, resolveOnError };
            setTimeout(() => { if (this._pending[method]) { delete this._pending[method]; resolve(); } }, 30000);
            try { fn(); } catch (e) { delete this._pending[method]; reject(e); }
        });
    }

    _settle(method, result, data) {
        const p = this._pending[method];
        if (!p) return;
        delete this._pending[method];
        if (result === "error" && !p.resolveOnError) p.reject(new Error(`[OK] ${method}: ${data || result}`));
        else p.resolve(data);
    }

    get _apiHandlers() {
        return {
            // rewarded flow
            loadAd: (result) => {
                if (result === "error") {
                    this._emit("adfinish", "rewarded");
                    if (this._rewardCb) this._rewardCb.onError?.(new Error("no ad"));
                    this._rewardCb = null;
                } else {
                    try { this._platformSdk.UI.showLoadedAd(); } catch (e) { console.error("[OK] showLoadedAd", e); }
                }
            },
            showLoadedAd: (_, data) => {
                this._emit("adfinish", "rewarded");
                const cb = this._rewardCb; this._rewardCb = null;
                if (data === "complete") { cb?.onReward?.(); }
                else { cb?.onError?.(new Error(data || "skip")); }
                cb?.onClose?.();
            },
            // interstitial
            showAd: (_, data) => {
                if (data === "ready" || data === "ad_prepared") return;
                this._emit("adfinish", "interstitial");
            },
            // banner
            requestBannerAds: (result, data) => {
                if (result === "error") return;
                if (data === "ad_loaded") {
                    try { this._platformSdk.invokeUIMethod("showBannerAds", this._bannerPosition); }
                    catch (e) { console.error("[OK] showBannerAds", e); }
                }
            },
            showBannerAds: () => {},
            hideBannerAds: () => {},
            // social
            showInvite: (result, data) => this._settle("showInvite", result, data),
            postMediatopic: (result, data) => this._settle("postMediatopic", result, data),
            showRatingDialog: (result, data) => this._settle("showRatingDialog", result, data),
            joinGroup: (result, data) => { console.log("[OK] joinGroup result:", result, data); this._settle("joinGroup", result, data); }
        };
    }
}
