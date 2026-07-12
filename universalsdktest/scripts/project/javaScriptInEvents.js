

const scriptsInEvents = {

	async списоксобытий1_Event1_Act2(runtime, localVars)
	{
		Init("KFJKvDmvlQXp36FHl6ti", "b6226dcdb769d870fc613a46982dca2a");
	},

	async списоксобытий1_Event3_Act1(runtime, localVars)
	{
		console.log("[game] SDK ready on", usdk.getPlatform())
	},

	async списоксобытий1_Event4_Act1(runtime, localVars)
	{
		// pause game
	},

	async списоксобытий1_Event5_Act1(runtime, localVars)
	{
		// resume game
	},

	async списоксобытий1_Event6_Act1(runtime, localVars)
	{
		// pause game
	},

	async списоксобытий1_Event7_Act1(runtime, localVars)
	{
		runtime.globalVars.coins += 100
	},

	async списоксобытий1_Event8_Act1(runtime, localVars)
	{
		// resume game
	},

	async списоксобытий1_Event9_Act1(runtime, localVars)
	{
		console.warn("reward failed, try again")
	},

	async списоксобытий1_Event12_Act1(runtime, localVars)
	{
		runtime.globalVars.playerName = usdk.adapter.playerName || ""
	},

	async списоксобытий1_Event30_Act1(runtime, localVars)
	{
		usdk.showInterstitial();
	},

	async списоксобытий1_Event31_Act1(runtime, localVars)
	{
		usdk.showRewarded();
	},

	async списоксобытий1_Event32_Act1(runtime, localVars)
	{
		usdk.showBanner();
	},

	async списоксобытий1_Event33_Act1(runtime, localVars)
	{
		usdk.hideBanner();
	},

	async списоксобытий1_Event34_Act1(runtime, localVars)
	{
		usdk.share({ text: "Score: " + runtime.globalVars.coins });
	},

	async списоксобытий1_Event35_Act1(runtime, localVars)
	{
		usdk.inviteFriends({ text: "Play with me!" });
	},

	async списоксобытий1_Event36_Act1(runtime, localVars)
	{
		usdk.authorizePlayer()
		    .then(() => { runtime.globalVars.playerName = usdk.adapter.playerName || ""});
	},

	async списоксобытий1_Event37_Act1(runtime, localVars)
	{
		usdk.rateGame();
	},

	async списоксобытий1_Event39_Act2(runtime, localVars)
	{
		usdk.save("coins", runtime.globalVars.coins);
		usdk.save("level", runtime.globalVars.level);
		saveDict("World");
	},

	async списоксобытий1_Event41_Act2(runtime, localVars)
	{
		usdk.load("coins").then(v => { runtime.globalVars.coins = v })
	},

	async списоксобытий1_Event41_Act3(runtime, localVars)
	{
		usdk.load("level").then(v => { runtime.globalVars.level = v })
	},

	async списоксобытий1_Event41_Act5(runtime, localVars)
	{
		loadDict("World");
	},

	async списоксобытий1_Event42_Act1(runtime, localVars)
	{
		usdk.clipboardWrite("universalSDK " + location.href);
	},

	async списоксобытий1_Event43_Act1(runtime, localVars)
	{
		usdk.happyTime();
	},

	async списоксобытий1_Event44_Act1(runtime, localVars)
	{
		usdk.getPlayerName().then(n => { runtime.globalVars.playerName = n || "?";});
	},

	async списоксобытий1_Event45_Act1(runtime, localVars)
	{
		usdk.joinCommunity();
	},

	async списоксобытий1_Event46_Act1(runtime, localVars)
	{
		usdk.checkAdBlock();
	},

	async списоксобытий1_Event47_Act1(runtime, localVars)
	{
		usdk.addToHomeScreen();
	},

	async списоксобытий1_Event48_Act1(runtime, localVars)
	{
		usdk.addToFavorites();
	},

	async списоксобытий1_Event49_Act1(runtime, localVars)
	{
		usdk.gameplayStart(); 
	},

	async списоксобытий1_Event50_Act1(runtime, localVars)
	{
		usdk.gameplayStop(); 
	},

	async списоксобытий1_Event51_Act1(runtime, localVars)
	{
		usdk.leaderboard.show(10);
	},

	async списоксобытий1_Event52_Act1(runtime, localVars)
	{
		usdk.leaderboard.submitScore(runtime.globalVars.coins);
	},

	async списоксобытий1_Event53_Act1(runtime, localVars)
	{
		usdk.getLanguage();
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
