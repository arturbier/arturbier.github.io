"use strict";



{
	const scriptsInEvents = {

		async Ads_Event3_Act2(runtime, localVars)
		{
			vkBridge.send("VKWebAppCheckNativeAds", {ad_format:"reward"});
		},

		async Ads_Event4_Act2(runtime, localVars)
		{
			vkBridge.send("VKWebAppShowNativeAds", {ad_format:"reward"}) 
			.then(data => console.log(data.result)) 
			.catch(error => console.log(error));
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
