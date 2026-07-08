// YandexPlatformBridge.js
// Настройка: Purpose = Imports for events
// ВАЖНО: поставь это первой строкой в YandexPlatformBridge.js
console.log("--- Yandex Bridge ФАЙЛ ЗАГРУЖЕН ---");
window.YandexPlatformBridge = class YandexPlatformBridge {
    constructor() {
        this.sdk = null;
        this._isInitialized = false;
    }

    async initialize() {
        if (this._isInitialized) return Promise.resolve();
        
        // Яндекс SDK обычно уже подключен в index.html через <script>
        // Но на всякий случай проверяем наличие YaGames
        return new Promise((resolve, reject) => {
            if (window.YaGames) {
                window.YaGames.init().then(sdk => {
                    this.sdk = sdk;
                    this._isInitialized = true;
                    console.log("[Yandex] SDK Initialized");
                    resolve();
                });
            } else {
                console.error("[Yandex] YaGames SDK not found in window!");
                reject();
            }
        });
    }

    showInterstitial() {
        if (!this.sdk) return;
        this.sdk.adv.showFullscreenAdv({
            callbacks: {
                onOpen: () => console.log("[Yandex] Interstitial opened"),
                onClose: (wasShown) => console.log("[Yandex] Interstitial closed, shown:", wasShown),
                onError: (e) => console.error("[Yandex] Interstitial error:", e)
            }
        });
    }

    showRewarded(onReward, onClose, onError) {
        if (!this.sdk) return;
        this.sdk.adv.showRewardedVideo({
            callbacks: {
                onRewarded: () => {
                    console.log("[Yandex] Reward granted!");
                    onReward?.();
                },
                onClose: () => {
                    console.log("[Yandex] Rewarded closed");
                    onClose?.();
                },
                onError: (e) => {
                    console.error("[Yandex] Rewarded error:", e);
                    onError?.(e);
                }
            }
        });
    }

    async getData() {
        if (!this.sdk) return {};
        const player = await this.sdk.getPlayer();
        return await player.getData();
    }

    async saveData(data) {
        if (!this.sdk) return;
        const player = await this.sdk.getPlayer();
        return await player.setData(data);
    }
};

// Прокидываем в глобальную область
globalThis.yandexAdapter = window.YandexPlatformBridge;