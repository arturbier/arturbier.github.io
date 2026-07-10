// LeaderboardBridge.js — shared Firestore-backed leaderboard & cloud storage.
// Provides _firestore(), submitScore(), getTop(), getPlayerRank(), showLeaderboard()
// and cloud save/load. Any adapter can use it via new LeaderboardBridge(opts, playerId).
// (Purpose: none — imported by usdk.js and used by PlatformBridgeBase)

export default class LeaderboardBridge {
    constructor(opts, playerId, platformId) {
        this._opts = opts || {};
        this._playerId = playerId || "unknown";
        this._platformId = platformId || "unknown";
    }

    setPlayerId(id) { this._playerId = id || "unknown"; }
    setPlatformId(id) { this._platformId = id || "unknown"; }

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
    _lbDoc(score, playerName) {
        return {
            fields: {
                gameId: { stringValue: this._opts.gameId || "unknown" },
                gameName: { stringValue: this._opts.gameName || this._opts.gameId || "unknown" },
                environment: { stringValue: this._opts.environment || "prod" },
                playerId: { stringValue: this._playerId },
                playerName: { stringValue: playerName || "Unknown" },
                score: { integerValue: String(score) },
                platform: { stringValue: this._platformId },
                timestamp: { timestampValue: new Date().toISOString() }
            }
        };
    }

    async submitScore(score, playerName) {
        const id = (this._playerId || "unknown").replace(/[\/#?\[\]@!$&'()*+,;=]/g, "_");
        const gameId = this._opts.gameId || "unknown";
        const env = this._opts.environment || "prod";
        const coll = this._opts.collection || "leaderboards";
        const path = `${coll}/${gameId}/${env}/${id}`;
        return this._firestore("PATCH", path + "?updateMask.fieldPaths=gameId&updateMask.fieldPaths=gameName&updateMask.fieldPaths=environment&updateMask.fieldPaths=playerId&updateMask.fieldPaths=playerName&updateMask.fieldPaths=score&updateMask.fieldPaths=platform&updateMask.fieldPaths=timestamp", this._lbDoc(score, playerName));
    }

    async getTop(limit = 10) {
        const gameId = this._opts.gameId || "unknown";
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
                score: f.score ? parseInt(String(f.score.integerValue || f.score.doubleValue || "0"), 10) : 0,
                platform: f.platform ? f.platform.stringValue : "?",
                playerId: f.playerId ? f.playerId.stringValue : ""
            };
        }).filter(e => e.score > 0);
    }

    async getPlayerRank() {
        const gameId = this._opts.gameId || "unknown";
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

    showLeaderboard(limit) {
        // Base no-op. Override in localAdapter for visual overlay.
    }

    // ---------- cloud storage (Firebase) ----------
    _storagePath() {
        const id = (this._playerId || "unknown").replace(/[\/#?\[\]@!$&'()*+,;=]/g, "_");
        const gameId = this._opts.gameId || "unknown";
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
