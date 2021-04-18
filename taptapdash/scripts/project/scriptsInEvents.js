"use strict";



{
	const scriptsInEvents = {

		async Main_Event97_Act2(runtime, localVars)
		{
			vkBridge.send("VKWebAppOpenApp", {"app_id": 7816086, "location": "https://vk.com/superkiwiadventure"});
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
