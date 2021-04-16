"use strict";



{
	const scriptsInEvents = {

		async Main_Event91_Act2(runtime, localVars)
		{
			vkBridge.send("VKWebAppOpenApp", {"app_id": 7816086, "location": "https://vk.com/superkiwiadventure"});
		},

		async Menubutton_Event3_Act1(runtime, localVars)
		{
			vkBridge.send("VKWebAppTapticImpactOccurred", {"style": "heavy"});
		},

		async Menubutton_Event4_Act1(runtime, localVars)
		{
			vkbridge.send("VKWebAppShowNativeAds", {ad_format:"interstitial"});
		},

		async Menubutton_Event4_Act2(runtime, localVars)
		{
			vkbridge.send("VKWebAppShowNativeAds", {ad_format:"reward"});
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
