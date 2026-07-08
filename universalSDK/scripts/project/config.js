// config.js — UniversalSDK configuration
// forcedPlatform: hard-set platform for a build ("" = auto-detect).
//   Can be overridden at runtime with the URL param ?platform=<id>
// platforms: per-platform keys/options passed to the adapter constructor.
// Valid platform ids: local, vk, ok, yandex, crazygames, gamedistribution, poki

const UniversalSDKConfig = {
    forcedPlatform: "",
    platforms: {
        gamedistribution: {
            gameId: "YOUR_GD_GAME_ID"
        }
    }
};

export default UniversalSDKConfig;
