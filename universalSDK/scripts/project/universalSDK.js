// =====================================================
// UniversalSDK | v1.0 | Monolith | CODEX EDITION
// =====================================================

window.UniversalSDK = {
    platform: "local",
    adapter: null,
    isReady: false,
    _readyQueue: [],
    debug: true,

    log(text, type = "info") {
        if (!this.debug) return;
        if (type === "init") {
            const asciiLogo = `
 __   __  __    _  ___   __   __  _______  ______    _______  _______  ___              _______  ______   ___   _ 
|  | |  ||  |  | ||   | |  | |  ||       ||    _ |  |       ||   _   ||   |            |       ||      | |   | | |
|  | |  ||   |_| ||   | |  |_|  ||    ___||   | ||  |  _____||  |_|  ||   |            |  _____||  _    ||   |_| |
|  |_|  ||       ||   | |       ||   |___ |   |_||_ | |_____ |       ||   |            | |_____ | | |   ||      _|
|       ||  _    ||   | |       ||    ___||    __  ||_____  ||       ||   |___         |_____  || |_|   ||     |_ 
|       || | |   ||   |  |     | |   |___ |   |  | | _____| ||   _   ||       | _____   _____| ||       ||    _  |
|_______||_|  |__||___|   |___|  |_______||___|  |_||_______||__| |__||_______||_____| |_______||______| |___| |_|
             >> UNIVERSALSDK INITIALIZED <<
             >> PLATFORM: ${this.platform.toUpperCase()}
            `;
            console.log(asciiLogo);
        } else {
            console.log("%c[SDK] " + text);
        }
    },

    async init() {
        // Определяем платформу, проверяя объекты напрямую в текущем окне (iframe)
        if (typeof YaGames !== 'undefined') this.platform = "yandex";
        else if (typeof vkBridge !== 'undefined') this.platform = "vk";
        else if (typeof FAPI !== 'undefined') this.platform = "ok";
        else this.platform = "local";

        console.log("[SDK] Detected platform: " + this.platform);

        // Ищем класс адаптера: сначала в реестре, затем глобально в window
        // Для платформы "yandex" ищем window.yandexAdapter и т.д.
        const AdapterClass = this.adapters[this.platform] || window[this.platform + "Adapter"];
        
        if (!AdapterClass) {
            console.error("[SDK] ОШИБКА: Адаптер не найден для " + this.platform);
            return;
        }

        this.adapter = new AdapterClass();
        
        // ВАЖНО: используем initialize(), так как во всех наших адаптерах метод называется именно так
        await this.adapter.initialize();
        
        this.isReady = true;
        this.log("READY", "init");
        this._readyQueue.forEach(r => r());
        return true;
    },

    // Методы делегирования (теперь безопасные)
    async showInterstitial() { await this._ensureReady(); return this.adapter.showInterstitial?.(); },
    async showRewarded(r, c, e) { await this._ensureReady(); return this.adapter.showRewarded?.(r, c, e); },
    async load() { await this._ensureReady(); return this.adapter.load?.(); },
    async save(d) { await this._ensureReady(); return this.adapter.save?.(d); },
    async showBanner(pos) { await this._ensureReady(); return this.adapter.showBanner?.(pos); },
    async hideBanner() { await this._ensureReady(); return this.adapter.hideBanner?.(); },
    
    async _ensureReady() {
        if (this.isReady) return;
        return new Promise(resolve => this._readyQueue.push(resolve));
    },

    adapters: {
local: class {
            async initialize() { console.log("[SDK] Local ready"); }
            async showInterstitial() { console.log("[SDK] Local: Interstitial"); }
            async showRewarded(onR) { 
                console.log("[SDK] Local: Rewarded"); 
                onR?.(); 
            }
            async load() { return {}; }
            async save(d) { console.log("[SDK] Local: Saved", d); }
            async showBanner() { console.log("[SDK] Local: Banner"); }
            async hideBanner() { console.log("[SDK] Local: Hide Banner"); }
        }
    }
};