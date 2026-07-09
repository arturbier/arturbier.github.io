// localAdapter.js — dev/local adapter with rich visual USDK_Mock.
// Simulates ads, player auth, share/invite, rating, clipboard & toasts.
// (Purpose: none — imported by universalSDK.js)

import PlatformBridgeBase from "./PlatformBridgeBase.js";

const STYLE_ID = "usdk-USDK_Mock-styles";
const CSS = `
.usdk-overlay{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;
  background:rgba(8,10,20,.72);backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif;animation:usdk-fade .25s ease}
@keyframes usdk-fade{from{opacity:0}to{opacity:1}}
.usdk-card{width:min(420px,86vw);background:linear-gradient(160deg,#232640,#12131c);
  border:1px solid rgba(255,255,255,.09);border-radius:22px;padding:30px 26px;color:#eef0ff;text-align:center;
  box-shadow:0 24px 70px rgba(0,0,0,.55);animation:usdk-pop .32s cubic-bezier(.2,.9,.3,1.35)}
@keyframes usdk-pop{from{transform:translateY(16px) scale(.95);opacity:0}to{transform:none;opacity:1}}
.usdk-badge{display:inline-block;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#a8adcc;
  border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:4px 12px;margin-bottom:16px}
.usdk-title{font-size:23px;font-weight:750;margin:0 0 6px;letter-spacing:.2px}
.usdk-sub{font-size:14px;color:#9aa0c4;margin:0 0 22px;line-height:1.5}
.usdk-ring{--p:0;width:104px;height:104px;border-radius:50%;margin:4px auto 20px;
  background:conic-gradient(#7c6cff calc(var(--p)*1%),rgba(255,255,255,.09) 0);
  display:flex;align-items:center;justify-content:center;transition:--p .4s linear}
.usdk-ring>div{width:84px;height:84px;border-radius:50%;background:#14151f;display:flex;align-items:center;
  justify-content:center;font-size:30px;font-weight:750;color:#fff}
.usdk-actions{display:flex;justify-content:center;flex-wrap:wrap;gap:8px;margin-top:6px}
.usdk-btn{appearance:none;border:0;cursor:pointer;font:600 15px/1 inherit;padding:13px 20px;border-radius:13px;
  background:linear-gradient(135deg,#7c6cff,#5b4bdb);color:#fff;transition:transform .08s,filter .15s,box-shadow .15s;
  box-shadow:0 8px 20px rgba(124,108,255,.35)}
.usdk-btn:hover{filter:brightness(1.08)}.usdk-btn:active{transform:scale(.96)}
.usdk-btn.ghost{background:rgba(255,255,255,.08);color:#cdd2f0;box-shadow:none}
.usdk-btn:disabled{opacity:.45;cursor:not-allowed;box-shadow:none}
.usdk-avatar{width:70px;height:70px;border-radius:50%;margin:0 auto 14px;
  background:linear-gradient(135deg,#7c6cff,#00d1b2);display:flex;align-items:center;justify-content:center;
  font-size:28px;font-weight:750;color:#fff;box-shadow:0 10px 30px rgba(0,0,0,.4)}
.usdk-input{width:100%;box-sizing:border-box;padding:12px 14px;border-radius:11px;border:1px solid rgba(255,255,255,.15);
  background:rgba(255,255,255,.05);color:#eef0ff;font:14px inherit;margin-bottom:16px}
.usdk-stars{font-size:38px;letter-spacing:8px;color:#ffd45e;margin:2px 0 20px;cursor:pointer;user-select:none}
.usdk-stars span:hover{filter:brightness(1.2)}
.usdk-banner{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;height:66px;
  background:linear-gradient(90deg,#7c6cff,#00d1b2);color:#fff;display:flex;align-items:center;justify-content:center;gap:12px;
  font:600 16px/1 -apple-system,"Segoe UI",Roboto,Arial,sans-serif;box-shadow:0 -8px 28px rgba(0,0,0,.4);
  animation:usdk-slideup .32s ease}
@keyframes usdk-slideup{from{transform:translateY(100%)}to{transform:none}}
.usdk-banner .usdk-tag{background:rgba(0,0,0,.28);border-radius:7px;padding:4px 8px;font-size:11px;letter-spacing:.12em}
.usdk-banner .usdk-x{position:absolute;right:14px;top:50%;transform:translateY(-50%);width:30px;height:30px;
  background:rgba(0,0,0,.28);border-radius:9px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px}
.usdk-toast{position:fixed;left:50%;bottom:30px;transform:translateX(-50%);z-index:2147483001;
  background:#232640;color:#eef0ff;border:1px solid rgba(255,255,255,.12);border-radius:13px;padding:13px 20px;
  font:500 14px/1.3 -apple-system,"Segoe UI",Roboto,Arial,sans-serif;box-shadow:0 14px 44px rgba(0,0,0,.5);
  animation:usdk-toast .3s ease;max-width:82vw}
@keyframes usdk-toast{from{opacity:0;transform:translate(-50%,12px)}to{opacity:1;transform:translate(-50%,0)}}
`;

export default class LocalPlatformBridge extends PlatformBridgeBase {
    constructor(options) {
        super(options);
        this._USDK_MockBanner = null;
        this._playerId = "guest_" + Math.floor(1000 + Math.random() * 9000);
        this._playerName = "Guest";
    }

    get platformId() { return "local"; }

    get isInterstitialSupported() { return true; }
    get isRewardedSupported() { return true; }
    get isBannerSupported() { return true; }
    get isPlayerAuthorizationSupported() { return true; }
    get isShareSupported() { return true; }
    get isInviteSupported() { return true; }
    get isRateSupported() { return true; }
    get isJoinCommunitySupported() { return true; }
    get isCheckAdBlockSupported() { return true; }
    get isAddToHomeScreenSupported() { return true; }
    get isAddToFavoritesSupported() { return true; }

    async initialize() {
        this._injectStyles();
        this._isInitialized = true;
        console.log("[SDK] Local USDK_Mock initialized");
    }

    // ---------------- ads ----------------
    async showInterstitial() {
        this._emit("adstart", "interstitial");
        await this._adOverlay({ title: "Interstitial Ad", sub: "Your game will continue shortly…", seconds: 3, rewarded: false });
        this._emit("adfinish", "interstitial");
    }

    async showRewarded(onReward, onClose) {
        this._emit("adstart", "rewarded");
        const granted = await this._adOverlay({ title: "Rewarded Video", sub: "Watch the full ad to earn your reward.", seconds: 5, rewarded: true });
        this._emit("adfinish", "rewarded");
        if (granted && onReward) onReward();
        if (onClose) onClose();
    }

    async showBanner() {
        if (this._USDK_MockBanner) return;
        this._injectStyles();
        const bar = document.createElement("div");
        bar.className = "usdk-banner";
        bar.innerHTML = `<span class="usdk-tag">AD</span><span>Your banner advertisement</span><span class="usdk-x">×</span>`;
        bar.querySelector(".usdk-x").addEventListener("click", () => this.hideBanner());
        document.body.appendChild(bar);
        this._USDK_MockBanner = bar;
    }

    async hideBanner() {
        if (this._USDK_MockBanner) { this._USDK_MockBanner.remove(); this._USDK_MockBanner = null; }
    }

    // ---------------- player ----------------
    async authorizePlayer() {
        const ok = await this._modal({
            avatar: "👤", title: "Sign in", sub: "Continue as a guest player?",
            buttons: [{ label: "Sign in", value: true }, { label: "Cancel", value: false, ghost: true }]
        });
        if (!ok) throw new Error("auth cancelled");
        this._isPlayerAuthorized = true;
        this._playerName = "Player " + this._playerId.slice(-4);
        this._toast("Signed in as " + this._playerName);
    }

    // ---------------- social ----------------
    async share(options = {}) {
        await this._modal({
            badge: "Share", title: "Share your progress",
            sub: "This link would open the platform share dialog.",
            body: `<input class="usdk-input" readonly value="${(options.link || location.href)}">`,
            buttons: [{ label: "Share", value: true }, { label: "Close", value: false, ghost: true }]
        });
        this._toast("Shared! (USDK_Mock)");
    }

    async inviteFriends(options = {}) {
        await this._modal({
            avatar: "🤝", title: "Invite friends", sub: options.text || "Invite your friends to play together.",
            buttons: [{ label: "Send invite", value: true }, { label: "Close", value: false, ghost: true }]
        });
        this._toast("Invite sent! (USDK_Mock)");
    }

    async joinCommunity(options = {}) {
        const ok = await this._modal({
            avatar: "⭐", title: "Join community",
            sub: "Subscribe to the game's community" + (options.groupId ? ` (#${options.groupId})` : "") + "?",
            buttons: [{ label: "Subscribe", value: true }, { label: "Later", value: false, ghost: true }]
        });
        if (!ok) throw new Error("join cancelled");
        this._toast("Subscribed! (USDK_Mock)");
    }

    // ---------------- rate / clipboard / misc ----------------
    async rateGame() {
        const stars = await this._ratingModal();
        this._toast(`Thanks for rating: ${stars}★ (USDK_Mock)`);
        return { value: true, stars };
    }

    async clipboardWrite(text) {
        try { await super.clipboardWrite(text); } catch (e) { /* USDK_Mock ignores */ }
        this._toast("Copied to clipboard (USDK_Mock)");
    }

    happyTime() {
        this._toast("🎉 Happy moment recorded!");
    }

    async checkAdBlock() {
        const blocked = typeof window.__mockAdBlock !== "undefined" ? !!window.__mockAdBlock : false;
        this._toast("AdBlock: " + (blocked ? "detected" : "not detected") + " (USDK_Mock)");
        return blocked;
    }

    async addToHomeScreen() {
        const ok = await this._modal({
            avatar: "🏠", title: "Add to home screen", sub: "Add a shortcut to this game?",
            buttons: [{ label: "Add", value: true }, { label: "Cancel", value: false, ghost: true }]
        });
        if (!ok) throw new Error("cancelled");
        this._toast("Added to home screen (USDK_Mock)");
    }

    async addToFavorites() {
        const ok = await this._modal({
            avatar: "⭐", title: "Add to favorites", sub: "Add this game to your favorites?",
            buttons: [{ label: "Add", value: true }, { label: "Cancel", value: false, ghost: true }]
        });
        if (!ok) throw new Error("cancelled");
        this._toast("Added to favorites (USDK_Mock)");
    }

    // ---------------- UI helpers ----------------
    _injectStyles() {
        if (document.getElementById(STYLE_ID)) return;
        const s = document.createElement("style");
        s.id = STYLE_ID;
        s.textContent = CSS;
        document.head.appendChild(s);
    }

    _adOverlay(opts) {
        this._injectStyles();
        return new Promise((resolve) => {
            const ov = document.createElement("div");
            ov.className = "usdk-overlay";
            ov.innerHTML = `<div class="usdk-card">
                <div class="usdk-badge">Advertisement</div>
                <div class="usdk-title">${opts.title}</div>
                <div class="usdk-sub">${opts.sub}</div>
                <div class="usdk-ring"><div class="usdk-num">${opts.seconds}</div></div>
                <div class="usdk-actions">
                    ${opts.rewarded ? '<button class="usdk-btn ghost" data-skip>Skip</button>' : ""}
                    <button class="usdk-btn" data-action disabled>${opts.rewarded ? "Claim reward" : "Continue"}</button>
                </div></div>`;
            document.body.appendChild(ov);

            const ring = ov.querySelector(".usdk-ring");
            const num = ov.querySelector(".usdk-num");
            const action = ov.querySelector("[data-action]");
            const skip = ov.querySelector("[data-skip]");

            let t = opts.seconds;
            const total = opts.seconds;
            const render = () => { ring.style.setProperty("--p", ((total - t) / total) * 100); num.textContent = t; };
            render();

            const done = (granted) => { clearInterval(tm); ov.remove(); resolve(granted); };
            const tm = setInterval(() => {
                t--;
                if (t <= 0) {
                    clearInterval(tm);
                    ring.style.setProperty("--p", 100);
                    num.textContent = "✓";
                    action.disabled = false;
                    if (!opts.rewarded) setTimeout(() => done(true), 500);
                } else render();
            }, 1000);

            action.addEventListener("click", () => { if (!action.disabled) done(true); });
            if (skip) skip.addEventListener("click", () => done(false));
        });
    }

    _modal(opts = {}) {
        this._injectStyles();
        const buttons = opts.buttons || [{ label: "OK", value: true }];
        return new Promise((resolve) => {
            const ov = document.createElement("div");
            ov.className = "usdk-overlay";
            const btns = buttons.map((b, i) => `<button class="usdk-btn ${b.ghost ? "ghost" : ""}" data-i="${i}">${b.label}</button>`).join("");
            ov.innerHTML = `<div class="usdk-card">
                ${opts.avatar ? `<div class="usdk-avatar">${opts.avatar}</div>` : ""}
                ${opts.badge ? `<div class="usdk-badge">${opts.badge}</div>` : ""}
                <div class="usdk-title">${opts.title || ""}</div>
                ${opts.sub ? `<div class="usdk-sub">${opts.sub}</div>` : ""}
                ${opts.body || ""}
                <div class="usdk-actions">${btns}</div></div>`;
            document.body.appendChild(ov);
            ov.querySelectorAll("[data-i]").forEach((el) =>
                el.addEventListener("click", () => { ov.remove(); resolve(buttons[+el.dataset.i].value); }));
        });
    }

    _ratingModal() {
        this._injectStyles();
        return new Promise((resolve) => {
            const ov = document.createElement("div");
            ov.className = "usdk-overlay";
            ov.innerHTML = `<div class="usdk-card">
                <div class="usdk-badge">Feedback</div>
                <div class="usdk-title">Rate the game</div>
                <div class="usdk-sub">Tap the stars to rate.</div>
                <div class="usdk-stars">${[1, 2, 3, 4, 5].map((n) => `<span data-n="${n}">☆</span>`).join("")}</div>
                <div class="usdk-actions"><button class="usdk-btn" data-submit disabled>Submit</button></div></div>`;
            document.body.appendChild(ov);

            let value = 0;
            const stars = [...ov.querySelectorAll(".usdk-stars span")];
            const submit = ov.querySelector("[data-submit]");
            stars.forEach((s) => s.addEventListener("click", () => {
                value = +s.dataset.n;
                stars.forEach((x) => { x.textContent = (+x.dataset.n <= value) ? "★" : "☆"; });
                submit.disabled = false;
            }));
            submit.addEventListener("click", () => { if (value) { ov.remove(); resolve(value); } });
        });
    }

    _toast(text, ms = 2200) {
        this._injectStyles();
        const t = document.createElement("div");
        t.className = "usdk-toast";
        t.textContent = text;
        document.body.appendChild(t);
        setTimeout(() => { t.style.transition = "opacity .3s"; t.style.opacity = "0"; setTimeout(() => t.remove(), 300); }, ms);
    }
}
