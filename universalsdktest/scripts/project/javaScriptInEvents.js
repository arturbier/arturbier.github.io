

const scriptsInEvents = {

	async списоксобытий1_Event2_Act1(runtime, localVars)
	{
		console.log("[game] SDK ready on", usdk.getPlatform())
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
		runtime.globalVars.playerName = usdk.adapter.playerName || ""
	},

	async списоксобытий1_Event28_Act1(runtime, localVars)
	{
		usdk.init({ appID: "dH4zLIodrWPLSHYwlXbZ", apiKey: "b26fb244b156ef4b4e29a95af3bfc9db" }).then(() => {
		    runtime.callFunction("On_SDK_Ready");
		    // Wire ad lifecycle to callbacks (one-time setup)
		    if (!usdk._callbacksWired) {
		        usdk._callbacksWired = true;
		        usdk.on("adstart", (type) => runtime.callFunction(type === "rewarded" ? "On_Rewarded_Show" : "On_Interstitial_Show"));
		        usdk.on("adfinish", (type) => runtime.callFunction(type === "rewarded" ? "On_Rewarded_Close" : "On_Interstitial_Close"));
		    }
		}).catch(e => console.error("[game] SDK init failed", e));
	},

	async списоксобытий1_Event30_Act1(runtime, localVars)
	{
		usdk.showInterstitial();
	},

	async списоксобытий1_Event31_Act1(runtime, localVars)
	{
		usdk.showRewarded(
		    () => { runtime.callFunction("On_Rewarded_Success"); },
		    () => {},
		    () => { runtime.callFunction("On_Rewarded_Error"); }
		);
	},

	async списоксобытий1_Event32_Act1(runtime, localVars)
	{
		usdk.showBanner().then(() => runtime.callFunction("On_Banner_Show"));
	},

	async списоксобытий1_Event33_Act1(runtime, localVars)
	{
		usdk.hideBanner().then(() => runtime.callFunction("On_Banner_Hide"));
	},

	async списоксобытий1_Event34_Act1(runtime, localVars)
	{
		usdk.share({ text: "Score: " + runtime.globalVars.coins }).then(() => runtime.callFunction("On_Share_Done"));
	},

	async списоксобытий1_Event35_Act1(runtime, localVars)
	{
		usdk.inviteFriends({ text: "Play with me!" }).then(() => runtime.callFunction("On_Invite_Done"));
	},

	async списоксобытий1_Event36_Act1(runtime, localVars)
	{
		usdk.authorizePlayer()
		    .then(() => { runtime.globalVars.playerName = usdk.adapter.playerName || ""; runtime.callFunction("On_Auth_Success"); })
		    .catch(() => { runtime.callFunction("On_Auth_Fail"); });
	},

	async списоксобытий1_Event37_Act1(runtime, localVars)
	{
		usdk.rateGame().then(() => runtime.callFunction("On_Rate_Done")).catch(() => runtime.callFunction("On_Rate_Done"));
	},

	async списоксобытий1_Event38_Act1(runtime, localVars)
	{
		usdk.save({coins:runtime.globalVars.coins}).then(()=>runtime.callFunction("On_Save_Done"));
	},

	async списоксобытий1_Event39_Act1(runtime, localVars)
	{
		usdk.load().then(d=>{runtime.globalVars.coins=d.coins||0;runtime.callFunction("On_Load_Done");});
	},

	async списоксобытий1_Event40_Act1(runtime, localVars)
	{
		usdk.clipboardWrite("universalSDK " + location.href);
	},

	async списоксобытий1_Event41_Act1(runtime, localVars)
	{
		usdk.happyTime(); runtime.callFunction("On_HappyTime");
	},

	async списоксобытий1_Event42_Act1(runtime, localVars)
	{
		usdk.getPlayerName().then(n => { runtime.globalVars.playerName = n || "?"; runtime.callFunction("On_Auth_Success"); });
	},

	async списоксобытий1_Event43_Act1(runtime, localVars)
	{
		usdk.joinCommunity()
		    .then(() => { console.log("[GAME] joined community"); runtime.callFunction("On_Join_Done"); })
		    .catch(e => { console.warn("[GAME] join failed:", e && e.message ? e.message : e); runtime.callFunction("On_Join_Fail"); });
	},

	async списоксобытий1_Event44_Act1(runtime, localVars)
	{
		usdk.checkAdBlock().then(b => { console.log("[GAME] adblock:", b); if (b) runtime.callFunction("On_AdBlock_Detected"); });
	},

	async списоксобытий1_Event45_Act1(runtime, localVars)
	{
		usdk.addToHomeScreen().then(() => runtime.callFunction("On_AddedToHome")).catch(e => console.warn("[GAME] home n/a", e && e.message ? e.message : e));
	},

	async списоксобытий1_Event46_Act1(runtime, localVars)
	{
		usdk.addToFavorites().then(() => runtime.callFunction("On_AddedToFav")).catch(e => console.warn("[GAME] fav n/a", e && e.message ? e.message : e));
	},

	async списоксобытий1_Event47_Act1(runtime, localVars)
	{
		usdk.gameplayStart(); console.log("[GAME] gameplayStart");
	},

	async списоксобытий1_Event48_Act1(runtime, localVars)
	{
		usdk.gameplayStop(); console.log("[GAME] gameplayStop");
	},

	async списоксобытий1_Event49_Act1(runtime, localVars)
	{
		usdk.leaderboard.show(10).then(() => runtime.callFunction("On_Leaderboard_Shown"));
	},

	async списоксобытий1_Event50_Act1(runtime, localVars)
	{
		usdk.leaderboard.submitScore(runtime.globalVars.coins).then(()=>runtime.callFunction("On_Score_Submitted"));
	},

	async списоксобытий1_Event51_Act1(runtime, localVars)
	{
		usdk.getLanguage().then(l => console.log("[GAME] language:", l));
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
