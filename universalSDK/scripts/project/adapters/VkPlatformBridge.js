// VkPlatformBridge.js
// Настройка: Purpose = Imports for events

window.VkPlatformBridge = class VkPlatformBridge {
    constructor() {
        this.sdk = null;
        this._isInitialized = false;
        this._playerId = null;
    }

    async initialize() {
        if (this._isInitialized) return Promise.resolve();

        return new Promise((resolve) => {
            const script = document.createElement('script');
            script.src = 'https://unpkg.com/@vkontakte/vk-bridge/dist/browser.min.js';
            script.onload = () => {
                this.sdk = window.vkBridge;
                this.sdk.send('VKWebAppInit').then(() => {
                    this.sdk.send('VKWebAppGetUserInfo').then((data) => {
                        this._playerId = data.id;
                        console.log("[VK] User info loaded:", data.first_name);
                    }).finally(() => {
                        this._isInitialized = true;
                        resolve();
                    });
                });
            };
            document.head.appendChild(script);
        });
    }

    // Реклама
    showInterstitial() {
        if (!this.sdk) return;
        this.sdk.send('VKWebAppShowNativeAds', { ad_format: 'interstitial' })
            .then(data => console.log("[VK] Interstitial result:", data.result))
            .catch(e => console.error("[VK] Interstitial error", e));
    }

    showRewarded() {
        if (!this.sdk) return;
        this.sdk.send('VKWebAppShowNativeAds', { ad_format: 'reward', use_waterfall: true })
            .then(data => {
                if (data.result) {
                    console.log("[VK] Reward granted!");
                }
            })
            .catch(e => console.error("[VK] Reward error", e));
    }

    // Хранилище
    async getData(key) {
        if (!this.sdk) return null;
        const data = await this.sdk.send('VKWebAppStorageGet', { keys: [key] });
        return data.keys[0].value;
    }

    async saveData(key, value) {
        if (!this.sdk) return;
        await this.sdk.send('VKWebAppStorageSet', { key, value });
    }
};

// Прокидываем в глобальную область для UniversalSDK
globalThis.vkAdapter = window.VkPlatformBridge;