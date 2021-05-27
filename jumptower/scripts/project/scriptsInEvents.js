"use strict";



{
	const scriptsInEvents = {

		async Buttons_Event9_Act1(runtime, localVars)
		{
			vkbridge.send("VKWebAppJoinGroup", {"204017056": 1});
		},

		async Buttons_Event10_Act1(runtime, localVars)
		{
			window.open('https://vk.com/a_b_vstudio')
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
