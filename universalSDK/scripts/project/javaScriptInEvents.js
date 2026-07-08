

const scriptsInEvents = {

	async списоксобытий1_Event1_Act1(runtime, localVars)
	{
		(async()=>{
		
		    await UniversalSDK.init();
		
		
		    console.log(
		        UniversalSDK.getPlatform()
		        );
		
		
		        let save =
		        await UniversalSDK.load();
		
		
		        console.log(
		            save
		            );
		
		
		            })();
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
