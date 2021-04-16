"use strict";



{
	const scriptsInEvents = {

		async Main_s_Event24_Act2(runtime, localVars)
		{
			vkBridge.send("VKWebAppTapticImpactOccurred", {"style": "heavy"}); //light, medium, heavy
		},

		async Menu_s_Event14_Act4(runtime, localVars)
		{
			vkbridge.send("VKWebAppTapticNotificationOccurred", {"type": "success"}); //error, success, warning
		},

		async Menu_s_Event49_Act3(runtime, localVars)
		{
			vkbridge.send("VKWebAppTapticSelectionChanged", {}); 
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
