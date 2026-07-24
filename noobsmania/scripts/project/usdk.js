const U = "https://universalsdk.ru/sdk/v1/usdk.js";
let rt = null;
runOnStartup(r => { rt = r; });
document.head.appendChild(Object.assign(document.createElement("script"), { src: U }));
globalThis.usdkInit = async (appID, apiKey) => {
    if (!globalThis.usdk) await new Promise(ok => { var t = setInterval(() => globalThis.usdk && (clearInterval(t), ok()), 10); });
    await usdk.boot(appID, apiKey, rt);
};
