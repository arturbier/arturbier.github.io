// OkPlatformBridge.js
// Настройка: Purpose = Imports for events

window.OkPlatformBridge = class OkPlatformBridge {
    constructor() {
        this.sdk = null;
        this._isInitialized = false;
        // Параметры инициализации (замени на свои значения)
        this.server = window.server || {};
        this.connection = window.connection || {};
    }

    async initialize() {
        if (this._isInitialized) return Promise.resolve();
        
        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = '//api.ok.ru/js/fapi5.js';
            script.onload = () => {
                const check = setInterval(() => {
                    if (window.FAPI) {
                        clearInterval(check);
                        this.sdk = window.FAPI;
                        
                        // Привязываем колбэки к методам этого класса
                        window.API_callback = (method, result, data) => this.apiCallbacks[method]?.(result, data);
                        
                        this.sdk.init(this.server, this.connection, () => {
                            this._isInitialized = true;
                            console.log("[OK] Platform initialized");
                            resolve();
                        });
                    }
                }, 100);
            };
            document.head.appendChild(script);
        });
    }

    showInterstitial() {
        try { this.sdk.UI.showAd(); } 
        catch (e) { this.showAdFailurePopup(false); }
    }

    showRewarded() {
        try { this.sdk.UI.loadAd(); } 
        catch (e) { this.showAdFailurePopup(true); }
    }

    // Твой API колбэк-маппинг
    get apiCallbacks() {
        return {
            loadAd: (result) => this.onLoadedRewarded(result),
            showLoadedAd: (_, data) => this.onRewardedShown(data),
            showAd: (_, data) => this.onInterstitialShown(data)
        };
    }

    // Твои приватные методы логики
    onLoadedRewarded(result) { console.log("[OK] Reward loaded:", result); }

    onRewardedShown(data) {
        if (data === 'complete') {
            console.log("[OK] Reward Granted");
            // Тут твоя логика успеха
        } else {
            this.showAdFailurePopup(true);
        }
    }

    onInterstitialShown(data) {
        console.log("[OK] Interstitial shown", data);
    }

    showAdFailurePopup(isRewarded) {
        console.error("[OK] Ad failed to show. Is rewarded:", isRewarded);
    }
};

// Прокидываем в глобальный объект, чтобы UniversalSDK его увидел
globalThis.okAdapter = window.OkPlatformBridge;