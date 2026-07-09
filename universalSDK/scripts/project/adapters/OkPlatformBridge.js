// OkPlatformBridge.js — Odnoklassniki (OK) Games
//
// VK and OK games now run on VK's shared infrastructure: the VK bridge
// (window.vkBridge / VKWebApp*) works for ads, banner, storage, share and
// invite even when the game runs on OK. OK-specific community subscription
// still requires OK's FAPI (fapi5.js, provided by the OK platform page).
//
// Therefore OK REUSES the whole VK implementation and only overrides
// joinCommunity() to subscribe to the OK group through FAPI.
// (Purpose: none — imported by universalSDK.js)

import VkPlatformBridge from "./VkPlatformBridge.js";

const FAPI_URL = "//api.ok.ru/js/fapi5.js";

export default class OkPlatformBridge extends VkPlatformBridge {
    get platformId() { return "ok"; }
    get isJoinCommunitySupported() { return true; }

    async initialize() {
        // Initialize the VK bridge — it drives ads/banner/storage on OK too.
        await super.initialize();
        // Load OK FAPI INTO THE GAME FRAME (the parent ok.ru page has its own
        // copy, but our iframe needs its own) for community subscription.
        if (typeof FAPI === "undefined") {
            await this._loadScript(FAPI_URL).catch(() => {});
        }
        this._fapi = await this._waitFor("FAPI", 8000).catch(() => null);
        if (!this._fapi) console.warn("[OK] FAPI not available — group subscription disabled");
    }

    // OK community subscription via FAPI (the VK bridge can't join an OK group).
    async joinCommunity(options = {}) {
        const groupId = options.groupId || this._options.groupId;
        if (!groupId) {
            console.warn("[OK] groupId not set — fill config.js platforms.ok.groupId or pass { groupId }");
            return Promise.reject(new Error("OK: groupId not set"));
        }

        const fapi = this._fapi || (typeof FAPI !== "undefined" ? FAPI : null);
        if (!fapi || !fapi.UI || typeof fapi.UI.joinGroup !== "function") {
            return Promise.reject(new Error("OK: FAPI.UI.joinGroup unavailable"));
        }

        const enableMessages = options.enableMessages ?? this._options.enableMessages ?? false;

        return new Promise((resolve, reject) => {
            const prev = window.API_callback;
            let done = false;
            const finish = (fn, arg) => {
                if (done) return;
                done = true;
                window.API_callback = prev;   // restore platform's own handler
                fn(arg);
            };

            // Chain onto the existing callback so we don't clobber the platform.
            window.API_callback = (method, result, data) => {
                if (typeof prev === "function") { try { prev(method, result, data); } catch (e) { /* ignore */ } }
                if (method === "joinGroup") {
                    console.log("[OK] joinGroup result:", result, data);
                    // Resolve regardless: an already-subscribed user returns a
                    // non-"ok" result, but the goal (being subscribed) is met.
                    finish(resolve, data);
                }
            };

            setTimeout(() => finish(resolve), 30000);

            try { fapi.UI.joinGroup(groupId, enableMessages); }
            catch (e) { finish(reject, e); }
        });
    }
}
