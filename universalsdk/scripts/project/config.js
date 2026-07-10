// config.js — usdk configuration
// forcedPlatform: hard-set platform for a build ("" = auto-detect).
//   Can be overridden at runtime with the URL param ?platform=<id>
// Platforms: per-platform keys/options passed to the adapter constructor.
// Firebase: shared backend for cloud storage & leaderboards.

const UsdkConfig = {
    forcedPlatform: "",

    // Force a UI language ("" = auto-detect). Overridable at runtime with ?lang=<code>.
    forcedLanguage: "",

    // Shared Firebase backend (used by storage and leaderboard).
    // gameId & environment are auto-assigned: gameId ← project name (slugified),
    // environment ← platform (local → "dev", others → "prod").
    firebase: {
        projectId: "universalsdk-be2ef",
        apiKey: "AIzaSyDu_nPxw1tbhI_WchMwLMJ7ODhgshaM_5Y",
        gameId: ""
    },

    // Leaderboard (reads/writes to Firestore collection).
    // gameName: "" = auto (uses document.title — the game's page title set by C3).
    leaderboard: {
        collection: "leaderboards",
        gameName: "",
        defaultLimit: 10
    },

    // Cloud storage (reads/writes to Firestore collection).
    storage: {
        collection: "saves"
    },

    platforms: {
        // Local dev mock (USDK_Mock). All fields optional.
        local: {
            interstitialSeconds: 3,
            rewardedSeconds: 5,
            adBlock: false,
            silent: false
        },
        vk: {
            groupId: "204017056"
        },
        ok: {
            groupId: "59748855382160",
            enableMessages: true
        },
        gamedistribution: {
            gameId: "YOUR_GD_GAME_ID"
        }
    }
};

export default UsdkConfig;
