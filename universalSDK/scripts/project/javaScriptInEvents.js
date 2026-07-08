

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
		UniversalSDK.showRewarded();
	},

	async списоксобытий1_Event5_Act1(runtime, localVars)
	{
		UniversalSDK.showBanner("bottom")
	},

	async списоксобытий1_Event6_Act1(runtime, localVars)
	{
		UniversalSDK.hideBanner();
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
