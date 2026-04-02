

const scriptsInEvents = {

	async EventSheet1_Event1_Act1(runtime, localVars)
	{
		Notification.requestPermission().then(function(permission) {
		    if (permission === "granted") {
		
		        const n = new Notification("Pomodoro", {
		            body: "Время вышло"
		        });
		
		        n.onclick = function() {
		            window.focus();
		        };
		
		    } else {
		        console.log("Нет разрешения на уведомления");
		    }
		});
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
