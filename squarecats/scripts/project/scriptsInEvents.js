"use strict";



{
	const scriptsInEvents = {

		async Main_Event40_Act1(runtime, localVars)
		{
			vkBridge.send("VKWebAppOpenApp", {"app_id": 7816086, "location": "https://vk.com/superkiwiadventure"});
		},

		async Main_Event41_Act1(runtime, localVars)
		{
			vkBridge.send("VKWebAppOpenApp", {"app_id": 7818856, "location": "https://vk.com/fallordead"});
		},

		async Main_Event42_Act1(runtime, localVars)
		{
			vkBridge.send("VKWebAppOpenApp", {"app_id": 7824963, "location": "https://vk.com/taptapjump"});
		},

		async Menu_Event19_Act2(runtime, localVars)
		{
			vkBridge.send("VKWebAppTapticImpactOccurred", {"style": "heavy"}); //light, medium, heavy
		},

		async Menu_Event29_Act2(runtime, localVars)
		{
			vkBridge.send("VKWebAppTapticImpactOccurred", {"style": "heavy"}); //light, medium, heavy
		},

		async Menu_Event53_Act2(runtime, localVars)
		{
			vkBridge.send("VKWebAppTapticImpactOccurred", {"style": "heavy"}); //light, medium, heavy
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
