// main.js — loads the hosted universalSDK and exposes usdkInit() for event sheets.
const U = "https://universalsdk.ru/sdk/v1/usdk.js";

// DNS prefetch — start resolving before SDK loads
(function(){var l=document.createElement("link");l.rel="dns-prefetch";l.href="https://universalsdk.ru";document.head.appendChild(l)})();

// Preload SDK script — browser downloads it early
(function(){var l=document.createElement("link");l.rel="preload";l.as="script";l.href=U;document.head.appendChild(l)})();

let rt = null;
runOnStartup(r => { rt = r; });

// Async load — doesn't block page rendering
(function(){var s=document.createElement("script");s.async=true;s.src=U;document.head.appendChild(s)})();

globalThis.usdkInit = async (appID, apiKey) => {
    if (!globalThis.usdk) await new Promise(ok => { var t = setInterval(() => globalThis.usdk && (clearInterval(t), ok()), 10); });
    await usdk.boot(appID, apiKey, rt);
};
