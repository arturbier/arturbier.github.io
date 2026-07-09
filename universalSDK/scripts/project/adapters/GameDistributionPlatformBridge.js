// GameDistributionPlatformBridge.js — GameDistribution HTML5 SDK
// Docs: https://github.com/gamedistribution/gd-html5/wiki
// Ads only; storage falls back to localStorage (base class).
// (Purpose: none — imported by universalSDK.js)

import PlatformBridgeBase from "./PlatformBridgeBase.js";

const SDK_URL = "https://html5.api.gamedistribution.com/main.min.js";

export default class GameDistributionPlatformBridge extends PlatformBridgeBase {
    constructor(options) {
        super(options);
        this._rewardCb = null;
        this._closeCb = null;
        this._readyResolve = null;
    }

    get platformId() { return "gamedistribution"; }

    get isInterstitialSupported() { return true; }
    get isRewardedSupported() { return true; }

    async initialize() {
        if (this._isInitialized) return;

        const gameId = this._options.gameId || "YOUR_GD_GAME_ID";

        const readyPromise = new Promise((resolve) => { this._readyResolve = resolve; });

        window.GD_OPTIONS = {
            gameId,
            onEvent: (event) => this._onEvent(event)
        };

        await this._loadScript(SDK_URL).catch(() => {});

        // Resolve on SDK_READY, but don't hang forever.
        await Promise.race([
            readyPromise,
            new Promise((r) => setTimeout(r, 8000))
        ]);

        this._platformSdk = window.gdsdk || null;
        this._isInitialized = true;
        if (!this._platformSdk) console.warn("[GD] gdsdk not ready after timeout");
    }

    _onEvent(event) {
        switch (event.name) {
            case "SDK_READY":
                this._platformSdk = window.gdsdk || null;
                if (this._readyResolve) this._readyResolve();
                break;
            case "SDK_GAME_PAUSE":
                this._emit("adstart", this._currentAdType || "interstitial");
                break;
            case "SDK_GAME_START":
                this._emit("adfinish", this._currentAdType || "interstitial");
                if (this._closeCb) { this._closeCb(); this._closeCb = null; }
                break;
            case "SDK_REWARDED_WATCH_COMPLETE":
                if (this._rewardCb) { this._rewardCb(); this._rewardCb = null; }
                break;
            case "SDK_ERROR":
                console.error("[GD] SDK error");
                break;
            default:
                break;
        }
    }

    async showInterstitial() {
        if (!this._platformSdk) return;
        this._currentAdType = "interstitial";
        try { await this._platformSdk.showAd(); }
        catch (e) { console.error("[GD] Interstitial error", e); }
    }

    async showRewarded(onReward, onClose, onError) {
        if (!this._platformSdk) { if (onError) onError(new Error("GD not ready")); return; }
        this._currentAdType = "rewarded";
        this._rewardCb = onReward || null;
        this._closeCb = onClose || null;
        try {
            await this._platformSdk.preloadAd("rewarded");
            await this._platformSdk.showAd("rewarded");
        } catch (e) {
            console.error("[GD] Rewarded error", e);
            this._rewardCb = null;
            if (onError) onError(e);
        }
    }
}
