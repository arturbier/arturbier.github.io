function VKPlatformProvider(options) {
    this.options = { ... options }
	this.userId = null
	
    if (!this.options.minDelayBetweenAds)
        this.options.minDelayBetweenAds = 30
}

VKPlatformProvider.prototype.initialize = function() {
    return new Promise(resolve => {
        addJavaScript('https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js')
            .then(() => {
                vkBridge.send('VKWebAppInit')
                    .then(() => {
                        if (this.options.logsEnabled)
                            console.log('VKPlatformProvider: initialized')

                        resolve()
                    })
            })
    })
}

VKPlatformProvider.prototype.getUserId = function() {
    return new Promise(resolve => {
        if (this.userId != null) {
            resolve(this.userId)

            if (this.options.logsEnabled)
                console.log('VKPlatformProvider.getUserId, result: ' + this.userId)

            return
        }

        this.userId = new URL(window.location.href).searchParams.get('viewer_id')

        if (this.options.logsEnabled)
            console.log('VKPlatformProvider.getUserId, result: ' + this.userId)

        resolve(this.userId)
    })
}

VKPlatformProvider.prototype.showInterstitial = function(ignoreDelay = false) {
    if (!ignoreDelay && this._nextAdsAvailableTimer != null && !this._nextAdsAvailableTimer.isCompleted)
        return

    if (this.options.logsEnabled)
        console.log('VKPlatformProvider.showInterstitial')

    vkBridge.send('VKWebAppShowNativeAds', { ad_format: 'preloader' }).catch(error => console.log(error))

    if (!ignoreDelay)
        this._nextAdsAvailableTimer = new Timer(this.options.minDelayBetweenAds)
}

VKPlatformProvider.prototype.showRewarded = function() {
    if (this.options.logsEnabled)
        console.log('VKPlatformProvider.showRewarded')

    vkBridge.send('VKWebAppShowNativeAds', { ad_format: 'reward' }).catch(error => console.log(error))
}

VKPlatformProvider.prototype.vibrate = function() {
    if (this.options.logsEnabled)
        console.log('VKPlatformProvider.vibrate')

    // TODO: Add other types
    let type = 'warning'

    vkBridge.send('VKWebAppTapticNotificationOccurred', { 'type': type })
}

VKPlatformProvider.prototype.share = function(options) {
    if (this.options.logsEnabled)
        console.log('VKPlatformProvider.share, options: ', options)

    if (!options)
        vkBridge.send('VKWebAppShare')
    else
        vkBridge.send('VKWebAppShowWallPostBox', { 'message': options.message, 'attachments': options.link })
}

VKPlatformProvider.prototype.addToFavorites = function() {
    if (this.options.logsEnabled)
        console.log('VKPlatformProvider.addToFavorites')

    vkBridge.send('VKWebAppAddToFavorites')
}

VKPlatformProvider.prototype.showLeaderboard = function(userResult) {
    if (this.options.logsEnabled)
        console.log('VKPlatformProvider.showLeaderboard, userResult: ' + userResult)

    vkBridge.send('VKWebAppShowLeaderBoardBox', { 'user_result': userResult })
}