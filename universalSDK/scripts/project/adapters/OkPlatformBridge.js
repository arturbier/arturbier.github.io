// OkPlatformBridge.js  (Purpose: none — imported by universalSDK.js)

window.OkPlatformBridge = class OkPlatformBridge {
    constructor() {
        this.sdk = null;
        this._isInitialized = false;
        this._rewardCb = null;
        this._closeCb = null;
        // Init params come from launch URL (OK passes them as query params).
        const p = new URLSearchParams(location.search);
        this.server = p.get("api_server") || "";
        this.connection = p.get("apiconnection") || "";
    }

    async initialize() {
        if (this._isInitialized) return;

        await new Promise((resolve) => {
            const script = document.createElement("script");
            script.src = "//api.ok.ru/js/fapi5.js";
            script.onload = () => {
                const check = setInterval(() => {
                    if (window.FAPI) {
                        clearInterval(check);
                        this.sdk = window.FAPI;
                        window.API_callback = (method, result, data) =>
                            this.apiCallbacks[method]?.(result, data);
                        this.sdk.init(this.server, this.connection, () => {
                            this._isInitialized = true;
                            console.log("[OK] Platform initialized");
                            resolve();
                        }, () => resolve());
                    }
                }, 100);
            };
            script.onerror = () => resolve();
            document.head.appendChild(script);
        });
    }

    // --- Ads ---
    showInterstitial() {
        try { this.sdk.UI.showAd(); }
        catch (e) { this.showAdFailurePopup(false); }
    }

    showRewarded(onReward, onClose) {
        this._rewardCb = onReward || null;
        this._closeCb = onClose || null;
        try { this.sdk.UI.loadAd(); }
        catch (e) { this.showAdFailurePopup(true); }
    }

    // --- Banner (not natively supported here) ---
    showBanner() { console.warn("[OK] Banner not implemented"); }
    hideBanner() { console.warn("[OK] Banner not implemented"); }

    // --- Storage (localStorage fallback) ---
    async load() {
        try {
            const save = localStorage.getItem("save");
            if (save) return JSON.parse(save);
        } catch (e) { /* ignore */ }
        return {};
    }

    async save(data) {
        try { localStorage.setItem("save", JSON.stringify(data)); }
        catch (e) { /* ignore */ }
    }

    // --- FAPI callback mapping ---
    get apiCallbacks() {
        return {
            loadAd: (result) => this.onLoadedRewarded(result),
            showLoadedAd: (_, data) => this.onRewardedShown(data),
            showAd: (_, data) => this.onInterstitialShown(data)
        };
    }

    onLoadedRewarded(result) {
        console.log("[OK] Reward loaded:", result);
        try { this.sdk.UI.showLoadedAd(); }
        catch (e) { this.showAdFailurePopup(true); }
    }

    onRewardedShown(data) {
        if (data === "complete") {
            console.log("[OK] Reward Granted");
            this._rewardCb?.();
        } else {
            this.showAdFailurePopup(true);
        }
        this._closeCb?.();
    }

    onInterstitialShown(data) {
        console.log("[OK] Interstitial shown", data);
    }

    showAdFailurePopup(isRewarded) {
        console.error("[OK] Ad failed to show. Is rewarded:", isRewarded);
    }
};

// Register globally for UniversalSDK
globalThis.okAdapter = window.OkPlatformBridge;
