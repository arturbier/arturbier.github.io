"use strict";



{
	const scriptsInEvents = {

		async Maineventsheet_Event3_Act1(runtime, localVars)
		{
			platformProvider.showInterstitial()
		},

		async Maineventsheet_Event4_Act1(runtime, localVars)
		{
			platformProvider.showRewarded()
		},

		async Maineventsheet_Event5_Act1(runtime, localVars)
		{
			platformProvider.vibrate()
		},

		async Maineventsheet_Event6_Act2(runtime, localVars)
		{
			platformProvider.share()
		},

		async Maineventsheet_Event7_Act2(runtime, localVars)
		{
			let options = {
				message: 'Example message',
				link: 'https://vk.com/mewton.games'
			}
			platformProvider.share(options)
		},

		async Maineventsheet_Event8_Act1(runtime, localVars)
		{
			platformProvider.addToFavorites()
		},

		async Maineventsheet_Event9_Act1(runtime, localVars)
		{
			platformProvider.showLeaderboard(5)
		}

	};
	
	self.C3.ScriptsInEvents = scriptsInEvents;
}
