

const scriptsInEvents = {

	async E_sharacter_selection_Event1_Act1(runtime, localVars)
	{
		usdk.showInterstitial();
	},

	async E_game_Event9_Act1(runtime, localVars)
	{
		usdk.leaderboard.submitScore(runtime.globalVars.clicks);
	},

	async E_game_Event15_Act1(runtime, localVars)
	{
		usdk.showRewarded("booster");
	},

	async E_game_Event21_Act1(runtime, localVars)
	{
		usdk.showInterstitial();
	},

	async E_game_Event27_Act1(runtime, localVars)
	{
		usdk.inviteFriends({ text: "давай зарабатывать вместе на героев игры"&" НУБИК - МАНИЯ" });
	},

	async E_menu_Event1_Act4(runtime, localVars)
	{
		usdk.showBanner("bottom");
	},

	async E_menu_Event6_Act1(runtime, localVars)
	{
		usdk.showInterstitial();
	},

	async E_menu_Event9_Act1(runtime, localVars)
	{
		usdk.inviteFriends({ text: "давай зарабатывать вместе на героев игры"&" НУБИК - МАНИЯ" });
	},

	async E_menu_Event10_Act1(runtime, localVars)
	{
		usdk.leaderboard.show("НУБОЛИДЕРЫ", "КЛИКИ", 10, true);
	},

	async E_menu_Event12_Act1(runtime, localVars)
	{
		usdk.achievements.show();
	},

	async E_menu_Event22_Act1(runtime, localVars)
	{
		usdk.showModal("В игре новый движок","прогресс был утерян, спасибо за понимание","понял","принял","usdk");
	},

	async E_info_Event2_Act1(runtime, localVars)
	{
		usdk.joinCommunity();
	},

	async E_bg_selection_Event1_Act1(runtime, localVars)
	{
		usdk.showInterstitial();
	},

	async Bonus_Event5_Act10(runtime, localVars)
	{
		usdk.achievements.unlock("gift",true);
	},

	async Bonus_Event7_Act2(runtime, localVars)
	{
		usdk.addToFavorites();
	},

	async Achievements_Event2_Act1(runtime, localVars)
	{
		usdk.achievements.unlock("100clicks",true);
	},

	async Achievements_Event3_Act1(runtime, localVars)
	{
		usdk.achievements.unlock("250clicks",true);
	},

	async Achievements_Event4_Act1(runtime, localVars)
	{
		usdk.achievements.unlock("500clicks",true);
	},

	async Chat_Event1_Act2(runtime, localVars)
	{
		usdk.fetchChat(10,false);
	},

	async Chat_Event4_Act1(runtime, localVars)
	{
		usdk.fetchChat(10,false);
	},

	async Chat_Event6_Act1(runtime, localVars)
	{
		usdk.openChat("НИБИКОЧАТ",10,false);
	},

	async Storage_Event1_Act1(runtime, localVars)
	{
		saveDict("ads"); //словарь
	},

	async Storage_Event2_Act1(runtime, localVars)
	{
		loadDict("ads");
	},

	async E_init_Event1_Act1(runtime, localVars)
	{
		usdkInit("nx6woHMInN3n8GcxdMVb", "b242fc5a00c33a37d1982872b0c82271");
	},

	async E_init_Event2_Act1(runtime, localVars)
	{
		usdk.gameplayStart(); // ← теперь SDK готов
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
