const C3 = globalThis.C3;
const DOM_COMPONENT_ID = "TelegramMiniAppsSDK";
class SingleGlobalInstance extends globalThis.ISDKInstanceBase {
    constructor() {
        super({ domComponentId: DOM_COMPONENT_ID });
        this.isVerticalSwipesEnabled = false;
        this.isClosingConfirmationEnabled = false;
        this.isExpanded = false;
        this.qrTextReceived = '';
        this.biometricToken = '';
        this.cloudStorage = null;
        this.PluginConditions = C3.Plugins.TelegramMiniAppsSDK.Cnds;
        const properties = this._getInitProperties();
        if (properties) {
            this.isExpanded = properties[0];
            if (this.isExpanded)
                Telegram.WebApp.expand();
            this.isClosingConfirmationEnabled = properties[1];
            if (this.isClosingConfirmationEnabled) {
                Telegram.WebApp.enableClosingConfirmation();
            }
            Telegram.WebApp.disableClosingConfirmation();
            this.isVerticalSwipesEnabled = properties[2];
            if (this.isVerticalSwipesEnabled) {
                Telegram.WebApp.enableVerticalSwipes();
            }
            Telegram.WebApp.disableVerticalSwipes();
        }
        this._loadCloudStorage();
        this._setupEventHandlers();
        Telegram.WebApp.ready();
        // this.runtime.addLoadPromise(
        //     this._postToDOMAsync("get-telegram-object").then(
        //         _data => {
        //             console.log(_data);
        //             //const data = _data as JSONObject;
        //             //console.log(data);
        //         }
        //     )
        // )
    }
    _release() {
        super._release();
    }
    _getNumberFromBoolean(bool) {
        if (bool) {
            return 1;
        }
        return 0;
    }
    _isInTelegram() {
        if (typeof Telegram.WebApp.initDataUnsafe.user !== 'undefined') {
            return true;
        }
        else {
            return false;
        }
    }
    _loadCloudStorage() {
        if (Telegram.WebApp.version !== '6.0') {
            Telegram.WebApp.CloudStorage.getKeys((error, keys) => {
                if (keys !== null) {
                    Telegram.WebApp.CloudStorage.getItems(keys, (error, values) => {
                        if (error === null) {
                            this.cloudStorage = values;
                        }
                    });
                }
            });
        }
    }
    _setupEventHandlers() {
        Telegram.WebApp.onEvent('backButtonClicked', () => {
            this._trigger(this.PluginConditions.OnClickBackButton);
        });
        Telegram.WebApp.onEvent('mainButtonClicked', () => {
            this._trigger(this.PluginConditions.OnClickMainButton);
        });
        Telegram.WebApp.onEvent('settingsButtonClicked', () => {
            this._trigger(this.PluginConditions.OnClickSettingsButton);
        });
        Telegram.WebApp.onEvent('invoiceClosed', (eventData) => {
            switch (eventData.status) {
                case 'paid':
                    this._trigger(this.PluginConditions.OnInvoicePaid);
                    break;
                case 'cancelled':
                    this._trigger(this.PluginConditions.OnInvoiceCancelled);
                    break;
                case 'failed':
                    this._trigger(this.PluginConditions.OnInvoiceFailed);
                    break;
                case 'pending':
                    this._trigger(this.PluginConditions.OnInvoicePending);
                    break;
            }
        });
        Telegram.WebApp.onEvent('biometricTokenUpdated', (eventData) => {
            switch (eventData.isUpdated) {
                case true:
                    this._trigger(this.PluginConditions.OnUpdateBiometricTokenSuccess);
                    break;
                case false:
                    this._trigger(this.PluginConditions.OnUpdateBiometricTokenError);
                    break;
            }
        });
        Telegram.WebApp.onEvent('biometricAuthRequested', (eventData) => {
            switch (eventData.isAuthenticated) {
                case true:
                    this.biometricToken = (eventData.biometricToken) ? eventData.biometricToken : '';
                    this._trigger(this.PluginConditions.OnBiometricAuthenticateSuccess);
                    break;
                case false:
                    this._trigger(this.PluginConditions.OnBiometricAuthenticateError);
                    break;
            }
        });
        Telegram.WebApp.onEvent('qrTextReceived', (eventData) => {
            this.qrTextReceived = eventData.data;
            this._trigger(this.PluginConditions.OnScanQrPopupResult);
        });
    }
}
;
C3.Plugins.TelegramMiniAppsSDK.Instance = SingleGlobalInstance;
// export {};
