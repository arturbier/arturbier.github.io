"use strict";



{
	const scriptsInEvents = {

		async Buttons_Event8_Act1(runtime, localVars)
		{
			vkbridge.send("VKWebAppDenyNotifications");
		},

		async Buttons_Event11_Act1(runtime, localVars)
		{
			vkbridge.windows.open('https://vk.com/a_b_vstudio')
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
