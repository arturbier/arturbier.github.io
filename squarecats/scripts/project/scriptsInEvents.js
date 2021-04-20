"use strict";



{
	const scriptsInEvents = {

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
