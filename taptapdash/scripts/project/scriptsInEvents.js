"use strict";



{
	const scriptsInEvents = {

		async Main_Event91_Act2(runtime, localVars)
		{
			vkBridge.send("VKWebAppOpenApp", {"app_id": 7816086, "location": "https://vk.com/superkiwiadventure"});
		},

		async Menubutton_Event4_Act1(runtime, localVars)
		{
			vkBridge.send("VKWebAppCheckNativeAds", {ad_format:"reward"});
		},

		async Menubutton_Event4_Act3(runtime, localVars)
		{
			vkBridge.send("VKWebAppShowNativeAds", {ad_format:"reward"})
			.then(data => console.log(data.result)) 
			.catch(error => console.log(error));
		},

		async Menubutton_Event7_Act2(runtime, localVars)
		{
			vkbridge.send("VKWebAppTapticSelectionChanged", {}); 
		},

		async Menubutton_Event7_Act4(runtime, localVars)
		{
			vkBridge.send("VKWebAppTapticImpactOccurred", {"style": "heavy"}); //light, medium, heavy
		},

		async Menubutton_Event7_Act6(runtime, localVars)
		{
			vkbridge.send("VKWebAppTapticNotificationOccurred", {"type": "error"}); //error, success, warning
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
