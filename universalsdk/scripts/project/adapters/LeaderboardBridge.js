// LeaderboardBridge.js — shared Firestore-backed leaderboard & cloud storage.
// Provides _firestore(), submitScore(), getTop(), getPlayerRank(), showLeaderboard()
// and cloud save/load. Any adapter can use it via new LeaderboardBridge(opts, playerId).
// (Purpose: none — imported by usdk.js and used by PlatformBridgeBase)

export default class LeaderboardBridge {
    constructor(opts, playerId, platformId) {
        this._opts = opts || {};
        this._playerId = LeaderboardBridge._str(playerId);
        this._platformId = LeaderboardBridge._str(platformId);
    }

    // Platform player ids can be numbers (VK/OK) — always store as string.
    static _str(v) { return (v === undefined || v === null || v === "") ? "unknown" : String(v); }

    // Slugify the game id for use as a Firestore path segment (path-safe).
    static _slug(v) {
        return String(v || "").trim().toLowerCase().replace(/[^a-z0-9_-]+/g, "_").replace(/^_+|_+$/g, "") || "unknown";
    }
    _gid() { return LeaderboardBridge._slug(this._opts.gameId); }

    setPlayerId(id) { this._playerId = LeaderboardBridge._str(id); }
    setPlatformId(id) { this._platformId = LeaderboardBridge._str(id); }

    // ---------- Firestore REST helper ----------
    _firestore(method, path, body = null) {
        const pid = this._opts.projectId;
        const key = this._opts.apiKey;
        if (!pid || !key) return Promise.reject(new Error("Firebase config missing"));
        const sep = path.includes("?") ? "&" : "?";
        let docPath;
        if (path.includes(":runQuery")) {
            docPath = "documents/" + path;
        } else if (path.startsWith(":")) {
            docPath = "documents" + path;
        } else {
            docPath = "documents/" + path;
        }
        const url = `https://firestore.googleapis.com/v1/projects/${pid}/databases/(default)/${docPath}${sep}key=${key}`;
        const opts = { method, headers: { "Content-Type": "application/json" } };
        if (body) opts.body = JSON.stringify(body);
        return fetch(url, opts).then((r) => { if (!r.ok) return r.json().then((e) => { throw e; }); return r.json(); });
    }

    // ---------- leaderboard ----------
    _lbDoc(score, playerName, playerPhoto) {
        return {
            fields: {
                gameId: { stringValue: this._gid() },
                gameName: { stringValue: this._opts.gameName || this._opts.gameId || "unknown" },
                environment: { stringValue: this._opts.environment || "prod" },
                playerId: { stringValue: this._playerId },
                playerName: { stringValue: playerName || "Unknown" },
                playerPhoto: { stringValue: playerPhoto || "" },
                score: { integerValue: String(score) },
                platform: { stringValue: this._platformId },
                timestamp: { timestampValue: new Date().toISOString() }
            }
        };
    }

    async submitScore(score, playerName, playerPhoto) {
        const id = String(this._playerId || "unknown").replace(/[\/#?\[\]@!$&'()*+,;=]/g, "_");
        const gameId = this._gid();
        const env = this._opts.environment || "prod";
        const coll = this._opts.collection || "leaderboards";
        const path = `${coll}/${gameId}/${env}/${id}`;
        return this._firestore("PATCH", path + "?updateMask.fieldPaths=gameId&updateMask.fieldPaths=gameName&updateMask.fieldPaths=environment&updateMask.fieldPaths=playerId&updateMask.fieldPaths=playerName&updateMask.fieldPaths=playerPhoto&updateMask.fieldPaths=score&updateMask.fieldPaths=platform&updateMask.fieldPaths=timestamp", this._lbDoc(score, playerName, playerPhoto));
    }

    async getTop(limit = 10) {
        const gameId = this._gid();
        const env = this._opts.environment || "prod";
        const coll = this._opts.collection || "leaderboards";
        const body = {
            structuredQuery: {
                from: [{ collectionId: env, allDescendants: false }],
                orderBy: [{ field: { fieldPath: "score" }, direction: "DESCENDING" }],
                limit: limit || 10
            }
        };
        const res = await this._firestore("POST", `${coll}/${gameId}:runQuery`, body);
        const entries = (res && Array.isArray(res) ? res : []).filter(Boolean);
        return entries.map((r) => {
            const doc = r.document || r;
            const f = (doc && doc.fields) ? doc.fields : {};
            return {
                playerName: f.playerName ? f.playerName.stringValue : "?",
                playerPhoto: f.playerPhoto ? f.playerPhoto.stringValue : "",
                score: f.score ? parseInt(String(f.score.integerValue || f.score.doubleValue || "0"), 10) : 0,
                platform: f.platform ? f.platform.stringValue : "?",
                playerId: f.playerId ? f.playerId.stringValue : ""
            };
        }).filter(e => e.score > 0);
    }

    async getPlayerRank() {
        const gameId = this._gid();
        const env = this._opts.environment || "prod";
        const coll = this._opts.collection || "leaderboards";
        const body = {
            structuredQuery: {
                from: [{ collectionId: env, allDescendants: false }],
                where: { fieldFilter: { field: { fieldPath: "playerId" }, op: "EQUAL", value: { stringValue: this._playerId } } },
                orderBy: [{ field: { fieldPath: "score" }, direction: "DESCENDING" }]
            }
        };
        const res = await this._firestore("POST", `${coll}/${gameId}:runQuery`, body);
        const entries = (res && Array.isArray(res)) ? res.filter(Boolean) : [];
        return { rank: entries.length > 0 ? 1 : null, totalEntries: entries.length };
    }

    async showLeaderboard(limit = 10) {
        if (typeof document === "undefined") return;
        const entries = await this.getTop(limit).catch(() => []);
        return this._overlay(entries, limit);
    }

    // ---------- shared visual overlay (works on every platform) ----------
    _esc(str) {
        return String(str).replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
    }

    _injectStyles() {
        if (typeof document === "undefined" || document.getElementById("usdk-lb-styles")) return;
        const s = document.createElement("style");
        s.id = "usdk-lb-styles";
        s.textContent = `
.usdk-lb-ov{position:fixed;inset:0;z-index:2147483000;display:flex;align-items:center;justify-content:center;
  background:rgba(8,10,20,.72);backdrop-filter:blur(7px);-webkit-backdrop-filter:blur(7px);
  font-family:-apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Arial,sans-serif}
.usdk-lb-card{width:min(420px,86vw);max-height:80vh;overflow-y:auto;background:linear-gradient(160deg,#232640,#12131c);
  border:1px solid rgba(255,255,255,.09);border-radius:22px;padding:26px;color:#eef0ff;text-align:center;
  box-shadow:0 24px 70px rgba(0,0,0,.55)}
.usdk-lb-badge{display:inline-block;font-size:11px;letter-spacing:.18em;text-transform:uppercase;color:#a8adcc;
  border:1px solid rgba(255,255,255,.16);border-radius:999px;padding:4px 12px;margin-bottom:14px}
.usdk-lb-title{font-size:22px;font-weight:750;margin:0 0 14px}
.usdk-lb-header,.usdk-lb-row{display:flex;gap:6px;align-items:center;padding:8px 6px;font-size:14px}
.usdk-lb-header{color:#8e94b0;font-weight:650;font-size:12px;letter-spacing:.05em;border-bottom:1px solid rgba(255,255,255,.08)}
.usdk-lb-row{border-bottom:1px solid rgba(255,255,255,.04)}
.usdk-lb-me{background:rgba(124,108,255,.12);border-radius:9px}
.usdk-lb-pos{width:28px;text-align:center;font-weight:750;color:#ffd45e;flex-shrink:0}
.usdk-lb-ava{width:28px;height:28px;border-radius:50%;flex-shrink:0;display:flex;align-items:center;justify-content:center;
  background:linear-gradient(135deg,#7c6cff,#00d1b2);overflow:hidden;font-size:16px}
.usdk-lb-ava img{width:100%;height:100%;object-fit:cover}
.usdk-lb-name{flex:1;text-align:left;overflow:hidden;text-overflow:ellipsis;white-space:nowrap}
.usdk-lb-score{width:60px;text-align:right;font-weight:750;flex-shrink:0}
.usdk-lb-plat{width:32px;text-align:center;flex-shrink:0}
.usdk-lb-empty{font-size:14px;color:#9aa0c4;padding:18px 0}
.usdk-lb-btn{appearance:none;border:0;cursor:pointer;font:600 15px/1 inherit;padding:13px 20px;border-radius:13px;margin-top:16px;
  background:linear-gradient(135deg,#7c6cff,#5b4bdb);color:#fff;box-shadow:0 8px 20px rgba(124,108,255,.35)}`;
        document.head.appendChild(s);
    }

    _overlay(entries, limit) {
        this._injectStyles();
        const me = this._playerId;
        const icons = { vk: "🌐", ok: "👥", yandex: "🟡", crazygames: "🟣", gamedistribution: "🔴", poki: "🟢", local: "🛠️" };
        const rows = entries.length
            ? entries.map((e, i) => `<div class="usdk-lb-row${e.playerId === me ? " usdk-lb-me" : ""}">
                <span class="usdk-lb-pos">${i + 1}</span>
                <span class="usdk-lb-ava">${e.playerPhoto ? `<img src="${this._esc(e.playerPhoto)}" alt="">` : "👤"}</span>
                <span class="usdk-lb-name">${this._esc(String(e.playerName || "?").slice(0, 20))}</span>
                <span class="usdk-lb-score">${e.score}</span>
                <span class="usdk-lb-plat" title="${this._esc(e.platform || "")}">${icons[e.platform] || "🎮"}</span>
            </div>`).join("")
            : '<div class="usdk-lb-empty">No scores yet — be the first!</div>';

        return new Promise((resolve) => {
            const ov = document.createElement("div");
            ov.className = "usdk-lb-ov";
            ov.innerHTML = `<div class="usdk-lb-card">
                <div class="usdk-lb-badge">Leaderboard</div>
                <div class="usdk-lb-title">🏆 Top ${limit} scores</div>
                <div class="usdk-lb-header"><span>#</span><span></span><span>Name</span><span>Score</span><span>Plat</span></div>
                ${rows}
                <button class="usdk-lb-btn" data-c>Close</button>
            </div>`;
            document.body.appendChild(ov);
            const done = () => { ov.remove(); resolve(); };
            ov.querySelector("[data-c]").addEventListener("click", done);
            ov.addEventListener("click", (e) => { if (e.target === ov) done(); });
        });
    }

    // ---------- cloud storage (Firebase) ----------
    _storagePath() {
        const id = String(this._playerId || "unknown").replace(/[\/#?\[\]@!$&'()*+,;=]/g, "_");
        const gameId = this._gid();
        const env = this._opts.environment || "prod";
        const coll = this._opts.storageCollection || "saves";
        return `${coll}/${gameId}/${env}/${id}`;
    }

    _storageDoc(data) {
        return {
            fields: {
                data: { stringValue: typeof data === "string" ? data : JSON.stringify(data) },
                updatedAt: { timestampValue: new Date().toISOString() }
            }
        };
    }

    async cloudLoad() {
        try {
            const res = await this._firestore("GET", this._storagePath());
            const f = res && res.fields;
            if (f && f.data && f.data.stringValue) {
                try { return JSON.parse(f.data.stringValue); } catch (e) { return f.data.stringValue; }
            }
        } catch (e) { /* ignore — document may not exist yet */ }
        return {};
    }

    async cloudSave(data) {
        return this._firestore("PATCH", this._storagePath() + "?updateMask.fieldPaths=data&updateMask.fieldPaths=updatedAt", this._storageDoc(data));
    }
}
