// localAdapter.js  (Purpose: none — imported by universalSDK.js)
// Local/dev adapter with visual mock ads.

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

    async showRewarded(onReward, onClose) {
        return this.showMockRewarded(onReward, onClose);
    }

    showBanner() {
        if (this.mockBanner) return;
        const div = document.createElement("div");
        div.textContent = "TEST BANNER AD";
        Object.assign(div.style, {
            position: "fixed", bottom: "0", left: "0", width: "100%", height: "70px",
            background: "#222", color: "#fff", display: "flex",
            alignItems: "center", justifyContent: "center",
            fontSize: "24px", zIndex: "99999"
        });
        document.body.appendChild(div);
        this.mockBanner = div;
    }

    hideBanner() {
        if (this.mockBanner) {
            this.mockBanner.remove();
            this.mockBanner = null;
        }
    }

    async load() {
        try {
            const save = localStorage.getItem("save");
            if (save) return JSON.parse(save);
        } catch (e) { /* ignore */ }
        return {};
    }

    async save(data) {
        try {
            localStorage.setItem("save", JSON.stringify(data));
        } catch (e) { /* ignore */ }
        console.log("[SDK] Local: Saved", data);
    }

    // --- Visual mocks ---
    showMockInterstitial() {
        return this._fullscreen("TEST INTERSTITIAL", 3, "#000");
    }

    async showMockRewarded(onReward, onClose) {
        await this._fullscreen("TEST REWARDED VIDEO", 5, "#111");
        if (onReward) onReward();
        if (onClose) onClose();
    }

    _fullscreen(title, seconds, bg) {
        return new Promise(resolve => {
            const div = document.createElement("div");
            div.innerHTML = `<h1>${title}</h1><h2 id="sdkTimer">${seconds}</h2>`;
            Object.assign(div.style, {
                position: "fixed", top: "0", left: "0", width: "100%", height: "100%",
                background: bg, color: "#fff", display: "flex", flexDirection: "column",
                alignItems: "center", justifyContent: "center", zIndex: "99999"
            });
            document.body.appendChild(div);

            let t = seconds;
            const label = div.querySelector("#sdkTimer");
            const timer = setInterval(() => {
                t--;
                if (label) label.textContent = t;
                if (t <= 0) {
                    clearInterval(timer);
                    div.remove();
                    resolve();
                }
            }, 1000);
        });
    }
}

// Register globally so UniversalSDK can find it via window.localAdapter
globalThis.localAdapter = LocalAdapter;
