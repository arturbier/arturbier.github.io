

const scriptsInEvents = {

	async списоксобытий1_Event2_Act1(runtime, localVars)
	{
		console.log("[game] SDK ready on", UniversalSDK.getPlatform())
	},

	async списоксобытий1_Event3_Act1(runtime, localVars)
	{
		// pause game
	},

	async списоксобытий1_Event4_Act1(runtime, localVars)
	{
		// resume game
	},

	async списоксобытий1_Event5_Act1(runtime, localVars)
	{
		// pause game
	},

	async списоксобытий1_Event6_Act1(runtime, localVars)
	{
		runtime.globalVars.coins += 100
	},

	async списоксобытий1_Event7_Act1(runtime, localVars)
	{
		// resume game
	},

	async списоксобытий1_Event8_Act1(runtime, localVars)
	{
		console.warn("reward failed, try again")
	},

	async списоксобытий1_Event11_Act1(runtime, localVars)
	{
		runtime.globalVars.playerName = UniversalSDK.adapter.playerName
	},

	async списоксобытий1_Event21_Act1(runtime, localVars)
	{
		UniversalSDK.init().then(() => {
		    runtime.callFunction("On_SDK_Ready");
		    // Wire ad lifecycle to callbacks (one-time setup)
		    if (!UniversalSDK._callbacksWired) {
		        UniversalSDK._callbacksWired = true;
		        UniversalSDK.on("adstart", () => runtime.callFunction("On_Interstitial_Show"));
		        UniversalSDK.on("adfinish", () => runtime.callFunction("On_Interstitial_Close"));
		    }
		}).catch(e => console.error("[game] SDK init failed", e));
	},

	async списоксобытий1_Event23_Act1(runtime, localVars)
	{
		UniversalSDK.showInterstitial().then(() => runtime.callFunction("On_Interstitial_Close"));
	},

	async списоксобытий1_Event24_Act1(runtime, localVars)
	{
		UniversalSDK.showRewarded(
		    () => { runtime.callFunction("On_Rewarded_Success"); runtime.callFunction("On_Rewarded_Close"); },
		    () => { runtime.callFunction("On_Rewarded_Close"); },
		    () => { runtime.callFunction("On_Rewarded_Error"); }
		);
	},

	async списоксобытий1_Event25_Act1(runtime, localVars)
	{
		UniversalSDK.showBanner().then(() => runtime.callFunction("On_Banner_Show"));
	},

	async списоксобытий1_Event26_Act1(runtime, localVars)
	{
		UniversalSDK.hideBanner().then(() => runtime.callFunction("On_Banner_Hide"));
	},

	async списоксобытий1_Event27_Act1(runtime, localVars)
	{
		UniversalSDK.share({ text: "Score: " + runtime.globalVars.coins }).then(() => runtime.callFunction("On_Share_Done"));
	},

	async списоксобытий1_Event28_Act1(runtime, localVars)
	{
		UniversalSDK.inviteFriends({ text: "Play with me!" }).then(() => runtime.callFunction("On_Invite_Done"));
	},

	async списоксобытий1_Event29_Act1(runtime, localVars)
	{
		UniversalSDK.authorizePlayer()
		    .then(() => { runtime.globalVars.playerName = UniversalSDK.adapter.playerName; runtime.callFunction("On_Auth_Success"); })
		    .catch(() => { runtime.callFunction("On_Auth_Fail"); });
	},

	async списоксобытий1_Event30_Act1(runtime, localVars)
	{
		UniversalSDK.rateGame().then(() => runtime.callFunction("On_Rate_Done")).catch(() => runtime.callFunction("On_Rate_Done"));
	},

	async списоксобытий1_Event31_Act1(runtime, localVars)
	{
		UniversalSDK.save({ coins: runtime.globalVars.coins }).then(() => { runtime.callFunction("On_Save_Done"); });
	},

	async списоксобытий1_Event32_Act1(runtime, localVars)
	{
		UniversalSDK.load().then(d => { runtime.globalVars.coins = d.coins || 0; runtime.callFunction("On_Load_Done"); });
	},

	async списоксобытий1_Event33_Act1(runtime, localVars)
	{
		UniversalSDK.clipboardWrite("universalSDK " + location.href);
	},

	async списоксобытий1_Event34_Act1(runtime, localVars)
	{
		UniversalSDK.happyTime(); runtime.callFunction("On_HappyTime");
	},

	async списоксобытий1_Event35_Act1(runtime, localVars)
	{
		UniversalSDK._ensureReady().then(() => { runtime.globalVars.playerName = UniversalSDK.adapter.playerName || "?"; runtime.callFunction("On_Auth_Success"); });
	},

	async списоксобытий1_Event36_Act1(runtime, localVars)
	{
		UniversalSDK.joinCommunity()
		    .then(() => runtime.callFunction("On_Join_Done"))
		    .catch(() => runtime.callFunction("On_Join_Fail"));
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
