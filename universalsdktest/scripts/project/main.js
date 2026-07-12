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

// ── Dictionary helpers (event sheet calls: saveDict("Name") / loadDict("Name")) ──
// Save C3 Dictionary as JSON under usdk key "_dict_<name>"
globalThis.saveDict = async (dictName) => {
	var d = rt.objects[dictName] && rt.objects[dictName].getFirstInstance();
	if (!d) return;
	var obj = {};
	d.getDataMap().forEach(function(v, k) { obj[k] = v; });
	await usdk.save(dictName, JSON.stringify(obj));
};

// Load C3 Dictionary from usdk back into the object
globalThis.loadDict = async (dictName) => {
	var d = rt.objects[dictName] && rt.objects[dictName].getFirstInstance();
	if (!d) return;
	var json = await usdk.load(dictName) || "{}";
	var obj = {};
	try { obj = JSON.parse(json); } catch(e) {}
	var map = d.getDataMap();
	Object.keys(obj).forEach(function(k) { map.set(k, obj[k]); });
};
