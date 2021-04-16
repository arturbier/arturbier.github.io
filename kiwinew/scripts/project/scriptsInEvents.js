"use strict";



{
	const scriptsInEvents = {

		async Etittlescreen_Event40_Act1(runtime, localVars)
		{
			vkBridge.send("VKWebAppCheckNativeAds", {ad_format:"reward"});
		},

		async Etittlescreen_Event40_Act3(runtime, localVars)
		{
			vkBridge.send("VKWebAppShowNativeAds", {ad_format:"reward"});
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
