// CrazyGamesPlatformBridge.js — CrazyGames SDK v3
// Docs: https://docs.crazygames.com/sdk/intro
// (Purpose: none — imported by universalSDK.js)

import PlatformBridgeBase from "./PlatformBridgeBase.js";

const SDK_URL = "https://sdk.crazygames.com/crazygames-sdk-v3.js";
const BANNER_ID = "universalsdk-cg-banner";

export default class CrazyGamesPlatformBridge extends PlatformBridgeBase {
    get platformId() { return "crazygames"; }

    get isInterstitialSupported() { return true; }
    get isRewardedSupported() { return true; }
    get isBannerSupported() { return true; }
    get isPlayerAuthorizationSupported() { return true; }
    get isInviteSupported() { return true; }

    async initialize() {
        if (this._isInitialized) return;

        await this._loadScript(SDK_URL).catch(() => {});
        await this._waitFor("CrazyGames").catch(() => null);
        if (!window.CrazyGames || !window.CrazyGames.SDK) {
            console.error("[CrazyGames] SDK failed to load");
            return;
        }
        this._platformSdk = window.CrazyGames.SDK;

        try {
            await this._platformSdk.init();
            this._isInitialized = true;
            console.log("[CrazyGames] SDK initialized");
            if (this._platformSdk.user?.isUserAccountAvailable) {
                const user = await this._platformSdk.user.getUser();
                if (user) {
                    this._playerId = user.username;
                    this._playerName = user.username;
                    this._isPlayerAuthorized = true;
                }
            }
        } catch (e) {
            console.error("[CrazyGames] init error", e);
        }
    }

    async showInterstitial() {
        if (!this._platformSdk) return;
        return new Promise((resolve) => {
            this._platformSdk.ad.requestAd("midgame", {
                adStarted: () => this._emit("adstart", "interstitial"),
                adFinished: () => { this._emit("adfinish", "interstitial"); resolve(); },
                adError: (e) => { console.error("[CrazyGames] Interstitial error", e); this._emit("adfinish", "interstitial"); resolve(); }
            });
        });
    }

    async showRewarded(onReward, onClose, onError) {
        if (!this._platformSdk) { if (onError) onError(new Error("CrazyGames not ready")); return; }
        return new Promise((resolve) => {
            this._platformSdk.ad.requestAd("rewarded", {
                adStarted: () => this._emit("adstart", "rewarded"),
                adFinished: () => { this._emit("adfinish", "rewarded"); if (onReward) onReward(); if (onClose) onClose(); resolve(); },
                adError: (e) => { console.error("[CrazyGames] Rewarded error", e); this._emit("adfinish", "rewarded"); if (onError) onError(e); if (onClose) onClose(); resolve(); }
            });
        });
    }

    _ensureBannerContainer() {
        let el = document.getElementById(BANNER_ID);
        if (!el) {
            el = document.createElement("div");
            el.id = BANNER_ID;
            Object.assign(el.style, {
                position: "fixed", bottom: "0", left: "50%", transform: "translateX(-50%)",
                zIndex: "99999"
            });
            document.body.appendChild(el);
        }
        return el;
    }

    async showBanner() {
        if (!this._platformSdk) return;
        this._ensureBannerContainer();
        try { await this._platformSdk.banner.requestResponsiveBanner(BANNER_ID); }
        catch (e) { console.error("[CrazyGames] Banner error", e); }
    }

    async hideBanner() {
        if (!this._platformSdk) return;
        try { this._platformSdk.banner.clearAllBanners(); } catch (e) { /* ignore */ }
        const el = document.getElementById(BANNER_ID);
        if (el) el.remove();
    }

    gameplayStart() { try { this._platformSdk?.game.gameplayStart(); } catch (e) { /* ignore */ } }
    gameplayStop() { try { this._platformSdk?.game.gameplayStop(); } catch (e) { /* ignore */ } }
    happyTime() { try { this._platformSdk?.game.happytime(); } catch (e) { /* ignore */ } }

    async authorizePlayer() {
        if (!this._platformSdk) return Promise.reject(new Error("CrazyGames not ready"));
        const user = await this._platformSdk.user.showAuthPrompt();
        if (user) {
            this._playerId = user.username;
            this._playerName = user.username;
            this._isPlayerAuthorized = true;
        }
    }

    async inviteFriends(options = {}) {
        const link = this._platformSdk.game.inviteLink(options.params || {});
        return link;
    }
}
