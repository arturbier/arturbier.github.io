// config.js — usdk configuration
// forcedPlatform: hard-set platform for a build ("" = auto-detect).
//   Can be overridden at runtime with the URL param ?platform=<id>
// Platforms: per-platform keys/options passed to the adapter constructor.
// Firebase: shared backend for cloud storage & leaderboards.

const UsdkConfig = {
    forcedPlatform: "",

    // Shared Firebase backend (used by storage and leaderboard).
    firebase: {
        projectId: "universalsdk-be2ef",
        apiKey: "AIzaSyDu_nPxw1tbhI_WchMwLMJ7ODhgshaM_5Y",
        gameId: "universalsdk",
        environment: "dev"
    },

    // Leaderboard (reads/writes to Firestore collection).
    leaderboard: {
        collection: "leaderboards",
        gameName: "UniversalSDK Test",
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
