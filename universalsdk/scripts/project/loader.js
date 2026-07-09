// UniversalSDK loader (Purpose: main)
// Loads the SDK from the CDN as an ES module. Construct waits for this
// module (and its CDN imports) during the loading screen, so window.UniversalSDK
// is guaranteed ready before "On start of layout".
//
// Per-game config is set in the html-head file (window.UNIVERSAL_SDK_CONFIG)
// BEFORE this module evaluates. Pinned by commit SHA (immutable).
import "https://cdn.jsdelivr.net/gh/arturbier/universalsdk@c70aa03feea1e8ee687e9e204094ca1e07ade024/sdk/universalSDK.js";
