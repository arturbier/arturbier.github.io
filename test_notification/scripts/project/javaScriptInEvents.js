

const scriptsInEvents = {

	async EventSheet1_Event1_Act1(runtime, localVars)
	{
		Notification.requestPermission().then(p => {
		    if (p === "granted") {
		        new Notification("Готово", {
		            body: "Уведомления включены"
		        });
		    }
		});
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
