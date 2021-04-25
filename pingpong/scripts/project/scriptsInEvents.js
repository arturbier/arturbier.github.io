"use strict";



{
	const scriptsInEvents = {

		async Purchase_Event24_Act2(runtime, localVars)
		{
			vkBridge.send("VKWebAppTapticImpactOccurred", {"style": "heavy"}); //light, medium, heavy
		},

		async Characters_selected_Event17_Act2(runtime, localVars)
		{
			vkBridge.send("VKWebAppTapticImpactOccurred", {"style": "heavy"}); //light, medium, heavy
		},

		async Characters_selected_Event21_Act2(runtime, localVars)
		{
			vkBridge.send("VKWebAppTapticImpactOccurred", {"style": "heavy"}); //light, medium, heavy
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
