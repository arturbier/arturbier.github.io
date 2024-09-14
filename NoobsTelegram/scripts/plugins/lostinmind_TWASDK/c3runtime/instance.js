const C3 = globalThis.C3;
class CommonData {
    constructor() {
        this.QrTextRecieved = '';
        this.PopupClosedButtonId = '';
        this.ScanQrPopupResultText = '';
        this.ConfirmResult = false;
        this.IsBiometricTokenUpdated = false;
        this.IsBiometricAccessGranted = false;
        this.IsBiometricAuthenticated = false;
    }
}
class SingleGlobalInstance extends globalThis.ISDKInstanceBase {
    constructor() {
        super();
        const _self = this;

        this.WebApp = window.Telegram.WebApp;
        this.isExpanded = false;
        this.isClosingConfirmationEnabled = false;
        this.isVerticalSwipesEnabled = false;
        this.CommonData = new CommonData();
        const properties = this._getInitProperties();
        if (properties) {
            if (typeof properties[0] === 'boolean') {
                this.isExpanded = properties[0];
                if (this.isExpanded) {
                    this.WebApp.expand();
                }
            }
            if (typeof properties[1] === 'boolean') {
                this.isClosingConfirmationEnabled = properties[1];
                if (this.isClosingConfirmationEnabled) {
                    this.WebApp.enableClosingConfirmation();
                }
                this.WebApp.disableClosingConfirmation();
            }
            if (typeof properties[2] === 'boolean') {
                this.isVerticalSwipesEnabled = properties[2];
                if (this.isVerticalSwipesEnabled) {
                    this.WebApp.enableVerticalSwipes();
                }
                this.WebApp.disableVerticalSwipes();
            }
        }
        this.WebApp.ready();

        window.Telegram.WebView.onEvent('back_button_pressed', () => {
            this._trigger(C3.Plugins.lostinmind_TWASDK.Cnds.OnClickBackButton);
        })

        window.Telegram.WebView.onEvent('main_button_pressed', () => {
            this._trigger(C3.Plugins.lostinmind_TWASDK.Cnds.OnClickMainButton);
        })

        window.Telegram.WebView.onEvent('settings_button_pressed', () => {
            this._trigger(C3.Plugins.lostinmind_TWASDK.Cnds.OnClickSettingsButton);
        })

        // this.WebApp.onEvent(eventType, () => {
        //     _self.Trigger(C3.Plugins.lostinmind_TWASDK.Cnds.OnEvent(eventTypeIndex));           
        // })

    }
    _release() {
        super._release();
    }

    onBiometricManagerAutheticateResult(isAuthenticated) {
        this.CommonData.IsBiometricAuthenticated = isAuthenticated;
    }
    onBiometricManagerRequestAccessResult(isAccessGranted) {
        this.CommonData.IsBiometricAccessGranted = isAccessGranted;
    }
    onBiometricTokenUpdateResult(isBiometricTokenUpdated) {
        this.CommonData.IsBiometricTokenUpdated = isBiometricTokenUpdated;
    }
    onConfirmResult(confirmed) {
        this.CommonData.ConfirmResult = confirmed;
    }
    onScanQrPopupResult(text) {
        this.CommonData.ScanQrPopupResultText = text;
    }
    onPopupClosed(button_id) {
        this.CommonData.PopupClosedButtonId = button_id;
    }
    onQrTextRecieved(data) {
        this.CommonData.QrTextRecieved = data;
    }
    onQrPopupClosed() {
    }
}
;
C3.Plugins.lostinmind_TWASDK.Instance = SingleGlobalInstance;
