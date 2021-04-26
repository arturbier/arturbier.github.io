let gameRuntime = null

runOnStartup(async runtime =>
{
	gameRuntime = runtime
    runtime.addEventListener("afterprojectstart", () => OnAfterProjectStart())
})

async function OnAfterProjectStart()
{
	const PLATFORM_OPTIONS = {
		logsEnabled: true
	}
	
	window.platformProvider = new VKPlatformProvider(PLATFORM_OPTIONS)
	platformProvider.initialize().then(() => {
		gameRuntime.callFunction('onPlatformProviderInitialized')
	})
}