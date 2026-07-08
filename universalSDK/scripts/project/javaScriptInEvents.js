

const scriptsInEvents = {

	async списоксобытий1_Event1_Act1(runtime, localVars)
	{
		UniversalSDK.init();
	},

	async списоксобытий1_Event3_Act1(runtime, localVars)
	{
		UniversalSDK.showInterstitial();
	},

	async списоксобытий1_Event4_Act1(runtime, localVars)
	{
		UniversalSDK.showRewarded(
		    () => { runtime.globalVars.coins += 100; console.log("[GAME] Reward +100, coins =", runtime.globalVars.coins); },
		    () => { console.log("[GAME] Rewarded closed"); },
		    (e) => { console.error("[GAME] Rewarded error", e); }
		);
	},

	async списоксобытий1_Event5_Act1(runtime, localVars)
	{
		UniversalSDK.showBanner("bottom")
	},

	async списоксобытий1_Event6_Act1(runtime, localVars)
	{
		UniversalSDK.hideBanner();
	},

	async списоксобытий1_Event7_Act1(runtime, localVars)
	{
		UniversalSDK.share({ text: "Score: " + runtime.globalVars.coins, link: location.href });
	},

	async списоксобытий1_Event8_Act1(runtime, localVars)
	{
		UniversalSDK.inviteFriends({ text: "Play with me!" });
	},

	async списоксобытий1_Event9_Act1(runtime, localVars)
	{
		UniversalSDK.authorizePlayer().then(() => console.log("[GAME] authorized")).catch(e => console.warn("[GAME] auth failed", e));
	},

	async списоксобытий1_Event10_Act1(runtime, localVars)
	{
		UniversalSDK.rateGame().then(r => console.log("[GAME] review", r)).catch(e => console.warn("[GAME] rate n/a", e));
	},

	async списоксобытий1_Event11_Act1(runtime, localVars)
	{
		UniversalSDK.save({ coins: runtime.globalVars.coins }).then(() => console.log("[GAME] saved", runtime.globalVars.coins));
	},

	async списоксобытий1_Event12_Act1(runtime, localVars)
	{
		UniversalSDK.load().then(d => { runtime.globalVars.coins = d.coins || 0; console.log("[GAME] loaded", d); });
	},

	async списоксобытий1_Event13_Act1(runtime, localVars)
	{
		UniversalSDK.clipboardWrite("universalSDK " + location.href).then(() => console.log("[GAME] copied to clipboard"));
	},

	async списоксобытий1_Event14_Act1(runtime, localVars)
	{
		UniversalSDK.happyTime();
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
