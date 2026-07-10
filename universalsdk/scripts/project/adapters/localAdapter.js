// localAdapter.js — dev/local adapter with rich visual USDK_Mock.
// Simulates ads, player auth, share/invite, rating, clipboard & toasts.
// Configurable via config.platforms.local:
//   { interstitialSeconds, rewardedSeconds, adBlock, silent }
// (Purpose: none — imported by usdk.js)

import PlatformBridgeBase from "./PlatformBridgeBase.js";

const STYLE_ID = "usdk-mock-styles";
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
  display:flex;align-items:center;justify-content:center}
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
.usdk-hint{font-size:11px;color:#6f748f;margin-top:14px}
.usdk-banner{position:fixed;left:0;right:0;bottom:0;z-index:2147483000;height:66px;
  background:linear-gradient(90deg,#7c6cff,#00d1b2);color:#fff;display:flex;align-items:center;justify-content:center;gap:12px;
  font:600 16px/1 -apple-system,"Segoe UI",Roboto,Arial,sans-serif;box-shadow:0 -8px 28px rgba(0,0,0,.4);
  animation:usdk-slideup .32s ease}
@keyframes usdk-slideup{from{transform:translateY(100%)}to{transform:none}}
.usdk-banner .usdk-tag{background:rgba(0,0,0,.28);border-radius:7px;padding:4px 8px;font-size:11px;letter-spacing:.12em}
.usdk-banner .usdk-x{position:absolute;right:14px;top:50%;transform:translateY(-50%);width:30px;height:30px;
  background:rgba(0,0,0,.28);border-radius:9px;display:flex;align-items:center;justify-content:center;cursor:pointer;font-size:18px}
.usdk-toasts{position:fixed;left:50%;bottom:30px;transform:translateX(-50%);z-index:2147483001;
  display:flex;flex-direction:column;gap:8px;align-items:center;pointer-events:none}
.usdk-toast{background:#232640;color:#eef0ff;border:1px solid rgba(255,255,255,.12);border-radius:13px;padding:13px 20px;
  font:500 14px/1.3 -apple-system,"Segoe UI",Roboto,Arial,sans-serif;box-shadow:0 14px 44px rgba(0,0,0,.5);
  animation:usdk-toast .3s ease;max-width:82vw}
@keyframes usdk-toast{from{opacity:0;transform:translateY(12px)}to{opacity:1;transform:none}}
.usdk-lb-header,.usdk-lb-row{display:flex;gap:6px;align-items:center;padding:8px 6px;font-size:14px}
.usdk-lb-header{color:#8e94b0;font-weight:650;font-size:12px;letter-spacing:.05em;border-bottom:1px solid rgba(255,255,255,.08)}
.usdk-lb-row{border-bottom:1px solid rgba(255,255,255,.04)}
.usdk-lb-me{background:rgba(124,108,255,.12);border-radius:9px}
.usdk-lb-pos{width:28px;text-align:center;font-weight:750;color:#ffd45e;flex-shrink:0}
.usdk-lb-name{flex:1;text-align:left;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.usdk-lb-score{width:60px;text-align:right;font-weight:750;flex-shrink:0}
.usdk-lb-platform{width:32px;text-align:center;flex-shrink:0}
`;

export default class LocalPlatformBridge extends PlatformBridgeBase {
    constructor(options) {
        super(options);
        const o = this._options || {};
        this._mock = {
            interstitialSeconds: Number.isFinite(o.interstitialSeconds) ? o.interstitialSeconds : 3,
            rewardedSeconds: Number.isFinite(o.rewardedSeconds) ? o.rewardedSeconds : 5,
            adBlock: !!o.adBlock,
            silent: !!o.silent
        };
        this._banner = null;
        this._adBusy = false;
        // Persistent guest ID: survives page reloads in localStorage.
        let gid = null;
        try { gid = localStorage.getItem("usdk_guest_id"); } catch (e) { /* ignore */ }
        if (!gid) {
            gid = "guest_" + Math.floor(1000 + Math.random() * 9000);
            try { localStorage.setItem("usdk_guest_id", gid); } catch (e) { /* ignore */ }
        }
        this._playerId = gid;
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
    get isLeaderboardsSupported() { return true; }

    async initialize() {
        this._injectStyles();
        this._isInitialized = true;
        console.log("[SDK] Local USDK_Mock initialized", this._mock.silent ? "(silent)" : "");
    }

    // Storage is inherited from PlatformBridgeBase → LeaderboardBridge (Firebase).
    // No localStorage override — all platforms use the same Firebase saves collection.

    // ---------------- ads ----------------
    async showInterstitial() {
        this._emit("adstart", "interstitial");
        if (!this._mock.silent) {
            await this._adOverlay({ title: "Interstitial Ad", sub: "Your game will continue shortly…", seconds: this._mock.interstitialSeconds, rewarded: false });
        }
        this._emit("adfinish", "interstitial");
    }

    async showRewarded(onReward, onClose, onError) {
        this._emit("adstart", "rewarded");
        let granted = true;
        if (!this._mock.silent) {
            granted = await this._adOverlay({ title: "Rewarded Video", sub: "Watch the full ad to earn your reward.", seconds: this._mock.rewardedSeconds, rewarded: true });
        }
        this._emit("adfinish", "rewarded");
        if (granted) {
            this._toast("✅ Reward granted (USDK_Mock)");
            if (onReward) onReward();
        } else {
            this._toast("Ad skipped — no reward (USDK_Mock)");
            if (onError) onError(new Error("skipped"));
        }
        if (onClose) onClose();
    }

    async showBanner() {
        if (this._banner || this._mock.silent) return;
        this._injectStyles();
        const bar = document.createElement("div");
        bar.className = "usdk-banner";
        bar.innerHTML = `<span class="usdk-tag">AD</span><span>Your banner advertisement</span><span class="usdk-x" title="Close">×</span>`;
        bar.querySelector(".usdk-x").addEventListener("click", () => this.hideBanner());
        document.body.appendChild(bar);
        this._banner = bar;
    }

    async hideBanner() {
        if (this._banner) { this._banner.remove(); this._banner = null; }
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
        const ok = await this._modal({
            badge: "Share", title: "Share your progress",
            sub: "This link would open the platform share dialog.",
            body: `<input class="usdk-input" readonly value="${this._esc(options.link || (typeof location !== "undefined" ? location.href : ""))}">`,
            buttons: [{ label: "Share", value: true }, { label: "Close", value: false, ghost: true }]
        });
        if (ok) this._toast("Shared! (USDK_Mock)");
    }

    async inviteFriends(options = {}) {
        const ok = await this._modal({
            avatar: "🤝", title: "Invite friends", sub: this._esc(options.text || "Invite your friends to play together."),
            buttons: [{ label: "Send invite", value: true }, { label: "Close", value: false, ghost: true }]
        });
        if (ok) this._toast("Invite sent! (USDK_Mock)");
    }

    async joinCommunity(options = {}) {
        const ok = await this._modal({
            avatar: "⭐", title: "Join community",
            sub: "Subscribe to the game's community" + (options.groupId ? ` (#${this._esc(String(options.groupId))})` : "") + "?",
            buttons: [{ label: "Subscribe", value: true }, { label: "Later", value: false, ghost: true }]
        });
        if (!ok) throw new Error("join cancelled");
        this._toast("Subscribed! (USDK_Mock)");
    }

    // ---------------- rate / clipboard / misc ----------------
    async rateGame() {
        const stars = await this._ratingModal();
        if (!stars) throw new Error("rate cancelled");
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

    gameplayStart() { console.log("[USDK_Mock] gameplayStart"); }
    gameplayStop() { console.log("[USDK_Mock] gameplayStop"); }

    async checkAdBlock() {
        const blocked = (typeof window !== "undefined" && typeof window.__mockAdBlock !== "undefined")
            ? !!window.__mockAdBlock
            : this._mock.adBlock;
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

    // ---------------- leaderboard ----------------
    // Uses the shared visual overlay from PlatformBridgeBase → LeaderboardBridge.

    // ---------------- UI helpers ----------------
    _esc(str) {
        return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    }

    _injectStyles() {
        if (typeof document === "undefined" || document.getElementById(STYLE_ID)) return;
        const s = document.createElement("style");
        s.id = STYLE_ID;
        s.textContent = CSS;
        document.head.appendChild(s);
    }

    _adOverlay(opts) {
        this._injectStyles();
        // Only one ad overlay at a time — don't stack on rapid clicks.
        if (this._adBusy) return Promise.resolve(!opts.rewarded);
        this._adBusy = true;

        return new Promise((resolve) => {
            const finish = (granted) => { clearInterval(tm); this._adBusy = false; ov.remove(); resolve(granted); };

            const ov = document.createElement("div");
            ov.className = "usdk-overlay";
            ov.innerHTML = `<div class="usdk-card">
                <div class="usdk-badge">Advertisement</div>
                <div class="usdk-title">${this._esc(opts.title)}</div>
                <div class="usdk-sub">${this._esc(opts.sub)}</div>
                <div class="usdk-ring"><div class="usdk-num">${opts.seconds}</div></div>
                <div class="usdk-actions">
                    ${opts.rewarded ? '<button class="usdk-btn ghost" data-skip>Skip</button>' : ""}
                    <button class="usdk-btn" data-action disabled>${opts.rewarded ? "Claim reward" : "Continue"}</button>
                </div>
                <div class="usdk-hint">USDK_Mock — local test ad</div></div>`;
            document.body.appendChild(ov);

            const ring = ov.querySelector(".usdk-ring");
            const num = ov.querySelector(".usdk-num");
            const action = ov.querySelector("[data-action]");
            const skip = ov.querySelector("[data-skip]");

            let t = opts.seconds;
            const total = opts.seconds || 1;
            const render = () => { ring.style.setProperty("--p", ((total - t) / total) * 100); num.textContent = t; };
            render();

            const tm = setInterval(() => {
                t--;
                if (t <= 0) {
                    clearInterval(tm);
                    ring.style.setProperty("--p", 100);
                    num.textContent = "✓";
                    action.disabled = false;
                    if (!opts.rewarded) setTimeout(() => finish(true), 500);
                } else render();
            }, 1000);

            action.addEventListener("click", () => { if (!action.disabled) finish(true); });
            if (skip) skip.addEventListener("click", () => finish(false));
        });
    }

    _modal(opts = {}) {
        this._injectStyles();
        const buttons = opts.buttons || [{ label: "OK", value: true }];
        // Value used when the user closes via backdrop / Esc (first ghost button, else false).
        const cancelBtn = buttons.find((b) => b.ghost);
        const cancelValue = cancelBtn ? cancelBtn.value : false;

        return new Promise((resolve) => {
            const ov = document.createElement("div");
            ov.className = "usdk-overlay";
            const btns = buttons.map((b, i) => `<button class="usdk-btn ${b.ghost ? "ghost" : ""}" data-i="${i}">${this._esc(b.label)}</button>`).join("");
            ov.innerHTML = `<div class="usdk-card">
                ${opts.avatar ? `<div class="usdk-avatar">${opts.avatar}</div>` : ""}
                ${opts.badge ? `<div class="usdk-badge">${this._esc(opts.badge)}</div>` : ""}
                <div class="usdk-title">${this._esc(opts.title || "")}</div>
                ${opts.sub ? `<div class="usdk-sub">${opts.sub}</div>` : ""}
                ${opts.body || ""}
                <div class="usdk-actions">${btns}</div></div>`;
            document.body.appendChild(ov);

            const onKey = (e) => { if (e.key === "Escape") close(cancelValue); };
            const close = (val) => {
                document.removeEventListener("keydown", onKey);
                ov.remove();
                resolve(val);
            };

            ov.querySelectorAll("[data-i]").forEach((el) =>
                el.addEventListener("click", () => close(buttons[+el.dataset.i].value)));
            // Click on dark backdrop (outside the card) = cancel.
            ov.addEventListener("click", (e) => { if (e.target === ov) close(cancelValue); });
            document.addEventListener("keydown", onKey);
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
                <div class="usdk-actions">
                    <button class="usdk-btn ghost" data-cancel>Cancel</button>
                    <button class="usdk-btn" data-submit disabled>Submit</button>
                </div></div>`;
            document.body.appendChild(ov);

            let value = 0;
            const stars = [...ov.querySelectorAll(".usdk-stars span")];
            const submit = ov.querySelector("[data-submit]");
            const onKey = (e) => { if (e.key === "Escape") close(0); };
            const close = (val) => { document.removeEventListener("keydown", onKey); ov.remove(); resolve(val); };

            stars.forEach((s) => s.addEventListener("click", () => {
                value = +s.dataset.n;
                stars.forEach((x) => { x.textContent = (+x.dataset.n <= value) ? "★" : "☆"; });
                submit.disabled = false;
            }));
            submit.addEventListener("click", () => { if (value) close(value); });
            ov.querySelector("[data-cancel]").addEventListener("click", () => close(0));
            ov.addEventListener("click", (e) => { if (e.target === ov) close(0); });
            document.addEventListener("keydown", onKey);
        });
    }

    _toast(text, ms = 2200) {
        this._injectStyles();
        if (typeof document === "undefined") return;
        let box = document.getElementById("usdk-toasts");
        if (!box) {
            box = document.createElement("div");
            box.id = "usdk-toasts";
            box.className = "usdk-toasts";
            document.body.appendChild(box);
        }
        const t = document.createElement("div");
        t.className = "usdk-toast";
        t.textContent = text;
        box.appendChild(t);
        setTimeout(() => {
            t.style.transition = "opacity .3s, transform .3s";
            t.style.opacity = "0";
            t.style.transform = "translateY(8px)";
            setTimeout(() => { t.remove(); if (box && !box.childElementCount) box.remove(); }, 300);
        }, ms);
    }
}
