"use strict";



{
	const scriptsInEvents = {

		async Main_Event91_Act2(runtime, localVars)
		{
			vkBridge.send("VKWebAppOpenApp", {"app_id": 7816086, "location": "https://vk.com/superkiwiadventure"});
		},

		async Menubutton_Event4_Act1(runtime, localVars)
		{
			vkbridge.send("VKWebAppShowNativeAds", {ad_format:"rewarded"}) 
			.then(data => console.log(data.result)) 
			.catch(error => console.log(error));
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
