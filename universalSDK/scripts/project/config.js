// config.js — UniversalSDK configuration
// forcedPlatform: hard-set platform for a build ("" = auto-detect).
//   Can be overridden at runtime with the URL param ?platform=<id>
// platforms: per-platform keys/options passed to the adapter constructor.
// Valid platform ids: local, vk, ok, yandex, crazygames, gamedistribution, poki

const UniversalSDKConfig = {
    forcedPlatform: "",
    platforms: {
        vk: {
            groupId: "public204017056"
        },
        ok: {
            groupId: "59748855382160"
        },
        gamedistribution: {
            gameId: "YOUR_GD_GAME_ID"
        }
    }
};

export default UniversalSDKConfig;
