"use strict";



{
	const scriptsInEvents = {

		async Ads_Event4_Act1(runtime, localVars)
		{
			vkBridge.send("VKWebAppCheckNativeAds", {ad_format:"reward"});
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
