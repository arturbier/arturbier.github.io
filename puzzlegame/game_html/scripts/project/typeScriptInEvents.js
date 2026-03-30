const scriptsInEvents = {
    async E_menu_Event2_Act1(runtime, localVars) {
        function checkPing() {
            return fetch("https://arturbier.github.io/puzzlegame/ping.json", { mode: "no-cors" })
                .then(() => localVars.ping = 1)
                .catch(() => localVars.ping = 0);
        }
        checkPing().then(ping => {
            runtime.callFunction("OnPing", ping);
        });
    },
    async E_menu_Event61_Act1(runtime, localVars) {
        function checkPing() {
            return fetch("https://arturbier.github.io/puzzlegame/ping.json", { mode: "no-cors" })
                .then(() => localVars.ping = 1)
                .catch(() => localVars.ping = 0);
        }
        checkPing().then(ping => {
            runtime.callFunction("OnPing", ping);
        });
    },
    async E_menu_Event68_Act1(runtime, localVars) {
        function checkPing() {
            return fetch("https://arturbier.github.io/puzzlegame/ping.json", { mode: "no-cors" })
                .then(() => localVars.ping = 1)
                .catch(() => localVars.ping = 0);
        }
        checkPing().then(ping => {
            runtime.callFunction("OnPing", ping);
        });
    }
};
globalThis.C3.TypeScriptInEvents = scriptsInEvents;
export {};
