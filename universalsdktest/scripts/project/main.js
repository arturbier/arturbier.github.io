// main.js — loads the hosted universalSDK and exposes usdkInit() for event sheets.
const USDK_URL = "https://universalsdk.ru/sdk/v1/usdk.js";
let rt = null;
runOnStartup(r => { rt = r; });

// Event sheet:  Init("APP_ID", "API_KEY")
globalThis.Init = async (appID, apiKey) => {
	if (!globalThis.usdk) await new Promise((ok, no) => {
		const s = document.createElement("script");
		s.src = USDK_URL; s.onload = ok; s.onerror = no;
		document.head.appendChild(s);
	});
	return usdk.boot(appID, apiKey, rt);
};

