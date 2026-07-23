

const scriptsInEvents = {

	async E_game_Event2_Act1(runtime, localVars)
	{
		// pause game
	},

	async E_game_Event3_Act1(runtime, localVars)
	{
		// resume game
	},

	async E_game_Event4_Act1(runtime, localVars)
	{
		// pause game
	},

	async E_game_Event7_Act1(runtime, localVars)
	{
		// resume game
	},

	async E_game_Event8_Act1(runtime, localVars)
	{
		console.warn("reward failed, try again")
	},

	async E_game_Event11_Act1(runtime, localVars)
	{
		runtime.globalVars.playerCurName = usdk.adapter.playerName || ""
	},

	async E_game_Event30_Act1(runtime, localVars)
	{
		usdk.showInterstitial();
	},

	async E_game_Event31_Act1(runtime, localVars)
	{
		usdk.showRewarded("100 coins");
	},

	async E_game_Event32_Act1(runtime, localVars)
	{
		usdk.showBanner();
	},

	async E_game_Event33_Act1(runtime, localVars)
	{
		usdk.hideBanner();
	},

	async E_game_Event34_Act1(runtime, localVars)
	{
		usdk.share({ text: "Score: " + runtime.globalVars.coins });
	},

	async E_game_Event35_Act1(runtime, localVars)
	{
		usdk.inviteFriends({ text: "Play with me!" });
	},

	async E_game_Event36_Act1(runtime, localVars)
	{
		usdk.authorizePlayer();
	},

	async E_game_Event37_Act1(runtime, localVars)
	{
		usdk.rateGame();
	},

	async E_game_Event39_Act2(runtime, localVars)
	{
		usdk.saveVar("coins"); //числа
	},

	async E_game_Event39_Act8(runtime, localVars)
	{
		saveDict("ads"); //словарь
	},

	async E_game_Event41_Act8(runtime, localVars)
	{
		loadDict("ads");
	},

	async E_game_Event42_Act1(runtime, localVars)
	{
		usdk.clipboardWrite("universalSDK " + location.href);
	},

	async E_game_Event43_Act1(runtime, localVars)
	{
		usdk.happyTime();
	},

	async E_game_Event44_Act1(runtime, localVars)
	{
		usdk.getPlayerName();
	},

	async E_game_Event45_Act1(runtime, localVars)
	{
		usdk.joinCommunity();
	},

	async E_game_Event46_Act1(runtime, localVars)
	{
		usdk.checkAdBlock();
	},

	async E_game_Event47_Act1(runtime, localVars)
	{
		usdk.addToHomeScreen();
	},

	async E_game_Event48_Act1(runtime, localVars)
	{
		usdk.addToFavorites();
	},

	async E_game_Event49_Act1(runtime, localVars)
	{
		usdk.gameplayStart(); 
	},

	async E_game_Event50_Act1(runtime, localVars)
	{
		usdk.gameplayStop(); 
	},

	async E_game_Event51_Act1(runtime, localVars)
	{
		usdk.leaderboard.show("ТАБЛИЦА ЛИДЕРОВ", "ОЧКИ", 10, false);
	},

	async E_game_Event52_Act1(runtime, localVars)
	{
		usdk.leaderboard.submitScore(runtime.globalVars.coins);
	},

	async E_game_Event53_Act1(runtime, localVars)
	{
		usdk.getLanguage().then(v => { runtime.globalVars.language = v })
	},

	async E_game_Event54_Act1(runtime, localVars)
	{
		usdk.openChat("СУПЕР ЧАТ",10,false);
	},

	async E_game_Event55_Act2(runtime, localVars)
	{
		usdk.fetchChat(10,false);
	},

	async E_init_Event1_Act2(runtime, localVars)
	{
		usdkInit("KFJKvDmvlQXp36FHl6ti", "b6226dcdb769d870fc613a46982dca2a");
	},

	async E_init_Event3_Act1(runtime, localVars)
	{
		usdk.gameplayStart(); // ← теперь SDK готов
	},

	async E_game_Event39_Act3(runtime, localVars)
	{
		usdk.saveVar("sound"); //булевые
	},

	async E_game_Event39_Act4(runtime, localVars)
	{
		usdk.saveVar("level"); //числа
	},

	async E_game_Event39_Act5(runtime, localVars)
	{
		usdk.saveVar("name"); //строки
	},

	async E_game_Event41_Act2(runtime, localVars)
	{
		usdk.loadVar("coins");
	},

	async E_game_Event41_Act4(runtime, localVars)
	{
		usdk.loadVar("sound");
	},

	async E_game_Event41_Act5(runtime, localVars)
	{
		usdk.loadVar("level");
	},

	async E_game_Event41_Act6(runtime, localVars)
	{
		usdk.loadVar("name");
	},

	async E_game_Event41_Act3(runtime, localVars)
	{
		usdk.load("coins").then(v => { runtime.globalVars.coins = v })
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
