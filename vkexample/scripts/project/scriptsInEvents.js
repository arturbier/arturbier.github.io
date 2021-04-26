"use strict";

function addJavaScript(src, type) {
    return new Promise(resolve => {
        let script = document.createElement('script')
        script.src = src

        if (type)
            script.type = type

        script.addEventListener('load', function() {
            resolve()
        })

        document.head.appendChild(script)
    })
}

function Timer(seconds) {
    let self = this
    self.seconds = seconds
    self.isCompleted = false
    self._timer = setInterval(() => {
        self.seconds -= 1

        if (self.seconds <= 0) {
            self.seconds = 0
            self.isCompleted = true
            clearInterval(self._timer)
        }
    }, 1000)
}

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
