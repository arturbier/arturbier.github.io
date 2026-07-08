// =====================================================
// PlatformBridgeBase
// Base class for all platform adapters.
// Provides the unified interface, capability flags,
// default localStorage storage, helpers and an event bus.
// (Purpose: none — imported by other adapters)
// =====================================================

export default class PlatformBridgeBase {
    constructor(options = {}) {
        this._options = options || {};
        this._isInitialized = false;
        this._platformSdk = null;

        this._playerId = null;
        this._playerName = null;
        this._isPlayerAuthorized = false;

        this._listeners = {};
    }

    // ---------- platform ----------
    get platformId() { return "unknown"; }
    get isInitialized() { return this._isInitialized; }

    // ---------- capabilities (overridden by adapters) ----------
    get isInterstitialSupported() { return false; }
    get isRewardedSupported() { return false; }
    get isBannerSupported() { return false; }
    get isPlayerAuthorizationSupported() { return false; }
    get isShareSupported() { return false; }
    get isInviteSupported() { return false; }
    get isRateSupported() { return false; }
    get isClipboardSupported() { return true; }

    // ---------- player ----------
    get isPlayerAuthorized() { return this._isPlayerAuthorized; }
    get playerId() { return this._playerId; }
    get playerName() { return this._playerName; }

    // ---------- lifecycle ----------
    async initialize() {
        this._isInitialized = true;
    }

    // ---------- advertisement (defaults: unsupported) ----------
    async showInterstitial() {
        this._emit("adstart");
        this._emit("adfinish");
    }

    async showRewarded(onReward, onClose, onError) {
        if (onError) onError(new Error(`${this.platformId}: rewarded not supported`));
    }

    async showBanner() { /* unsupported by default */ }
    async hideBanner() { /* unsupported by default */ }

    // ---------- gameplay signals ----------
    gameplayStart() { /* optional */ }
    gameplayStop() { /* optional */ }

    // ---------- storage (default: localStorage) ----------
    async load() {
        try {
            const save = localStorage.getItem("save");
            if (save) return JSON.parse(save);
        } catch (e) { /* ignore */ }
        return {};
    }

    async save(data) {
        try {
            localStorage.setItem("save", JSON.stringify(data));
        } catch (e) { /* ignore */ }
    }

    async getData(key) {
        const all = await this.load();
        return all ? all[key] : undefined;
    }

    async setData(key, value) {
        const all = (await this.load()) || {};
        all[key] = value;
        return this.save(all);
    }

    // ---------- player ----------
    async authorizePlayer() {
        return Promise.reject(new Error(`${this.platformId}: authorization not supported`));
    }

    // ---------- social ----------
    async share() {
        return Promise.reject(new Error(`${this.platformId}: share not supported`));
    }

    async inviteFriends() {
        return Promise.reject(new Error(`${this.platformId}: invite not supported`));
    }

    // ---------- rate / feedback ----------
    async rateGame() {
        return Promise.reject(new Error(`${this.platformId}: rate not supported`));
    }

    // ---------- clipboard (default: Web Clipboard API) ----------
    async clipboardWrite(text) {
        if (navigator && navigator.clipboard && navigator.clipboard.writeText) {
            return navigator.clipboard.writeText(String(text));
        }
        return Promise.reject(new Error("clipboard not available"));
    }

    // ---------- misc ----------
    happyTime() { /* optional: signal a positive moment */ }

    // ---------- event bus ----------
    on(event, cb) {
        (this._listeners[event] = this._listeners[event] || []).push(cb);
    }

    off(event, cb) {
        const arr = this._listeners[event];
        if (arr) this._listeners[event] = arr.filter((f) => f !== cb);
    }

    _emit(event, ...args) {
        (this._listeners[event] || []).forEach((cb) => {
            try { cb(...args); } catch (e) { console.error(e); }
        });
    }

    // ---------- helpers ----------
    _loadScript(src) {
        return new Promise((resolve, reject) => {
            const s = document.createElement("script");
            s.src = src;
            s.async = true;
            s.onload = () => resolve();
            s.onerror = () => reject(new Error("Failed to load " + src));
            document.head.appendChild(s);
        });
    }

    _waitFor(globalName, timeout = 10000) {
        return new Promise((resolve, reject) => {
            if (typeof window[globalName] !== "undefined") return resolve(window[globalName]);
            const start = Date.now();
            const t = setInterval(() => {
                if (typeof window[globalName] !== "undefined") {
                    clearInterval(t);
                    resolve(window[globalName]);
                } else if (Date.now() - start > timeout) {
                    clearInterval(t);
                    reject(new Error(globalName + " wait timeout"));
                }
            }, 100);
        });
    }
}
