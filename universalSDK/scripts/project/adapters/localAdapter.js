// Используем class, а не присвоение сразу, для чистоты
class LocalAdapter {
    constructor() {
        this.mockBanner = null;
    }

    async initialize() {
        console.log("[SDK] Local mode initialized");
    }

    async showInterstitial() {
        return this.showMockInterstitial();
    }

    async showRewarded(onReward, onClose, onError) {
        return this.showMockRewarded(onReward, onClose);
    }

    // Твои мок-методы
    showMockInterstitial() {
        return new Promise(resolve => {
            let div = document.createElement("div");
            div.innerHTML = `<h1>TEST INTERSTITIAL</h1><h2 id="sdkTimer">3</h2>`;
            Object.assign(div.style, {
                position: "fixed", top: "0", left: "0", width: "100%", height: "100%",
                background: "#000", color: "#fff", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", zIndex: "99999"
            });
            document.body.appendChild(div);
            
            let t = 3;
            let timer = setInterval(() => {
                t--;
                const timerEl = div.querySelector("#sdkTimer");
                if (timerEl) timerEl.innerHTML = t;
                if (t <= 0) {
                    clearInterval(timer);
                    div.remove();
                    resolve();
                }
            }, 1000);
        });
    }

    async showMockRewarded(onReward, onClose) {
        return new Promise(resolve => {
            let div = document.createElement("div");
            div.innerHTML = `<h1>TEST REWARDED VIDEO</h1><h2 id="rewardTimer">5</h2>`;
            Object.assign(div.style, {
                position: "fixed", top: "0", left: "0", width: "100%", height: "100%",
                background: "#111", color: "#fff", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", zIndex: "99999"
            });
            document.body.appendChild(div);
            
            let t = 5;
            let timer = setInterval(() => {
                t--;
                const timerEl = div.querySelector("#rewardTimer");
                if (timerEl) timerEl.innerHTML = t;
                if (t <= 0) {
                    clearInterval(timer);
                    div.remove();
                    if (onReward) onReward();
                    if (onClose) onClose();
                    resolve();
                }
            }, 1000);
        });
    }
}

// Принудительно выкидываем класс в глобальную область, чтобы UniversalSDK его увидел
globalThis.localAdapter = LocalAdapter;