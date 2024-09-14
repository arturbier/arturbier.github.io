const C3 = globalThis.C3;
function getEventTypeByIndex(eventTypeIndex) {
    const eventTypes = ["popupClosed", "qrTextReceived", "scanQrPopupClosed"];
    return eventTypes[eventTypeIndex];
}
C3.Plugins.lostinmind_TWASDK.Cnds =
    {
        // back-button
        IsBackButtonVisible() {
            return this.WebApp.BackButton.isVisible;
        },
        OnClickBackButton() { return true },
        // biometric-manager
        OnBiometricManagerAccessGranted() {
            return this.WebApp.BiometricManager.isAccessGranted;
        },
        OnBiometricManagerAccessRequested() {
            return this.WebApp.BiometricManager.isAccessGranted;
        },
        IsBiometricAvailable() {
            return this.WebApp.BiometricManager.isBiometricAvailable;
        },
        OnBiometricTokenSaved() {
            return this.WebApp.BiometricManager.isBiometricTokenSaved;
        },
        IsBiometricManagerInited() {
            return this.WebApp.BiometricManager.isInited;
        },
        // main-button
        IsMainButtonVisible() {
            return this.WebApp.MainButton.isVisible;
        },
        IsMainButtonActive() {
            return this.WebApp.MainButton.isActive;
        },
        OnClickMainButton() { return true },
        // settings-button
        IsSettingsButtonVisible() {
            return this.WebApp.SettingsButton.isVisible;
        },
        OnClickSettingsButton() { return true },
        // common
        IsClosingConfirmationEnabled() {
            return this.WebApp.isClosingConfirmationEnabled;
        },
        IsExpanded() {
            return this.WebApp.isExpanded;
        },
        IsVerticalSwipesEnabled() {
            return this.WebApp.isVerticalSwipesEnabled;
        },
        // OnEvent(eventTypeIndex) {
        //     const eventType = getEventTypeByIndex(eventTypeIndex);
        //     switch (eventType) {
        //         case "popupClosed":
        //             this.WebApp.onEvent(eventType, (buttonId) => {
        //                 if (buttonId === null) {
        //                     this.onPopupClosed('-');
        //                 }
        //                 else {
        //                     this.onPopupClosed(buttonId);
        //                 }
        //                 return true;
        //             });
        //             break;
        //         case "qrTextReceived":
        //             this.WebApp.onEvent(eventType, (data) => {
        //                 this.onQrTextRecieved(data);
        //                 return true;
        //             });
        //             break;
        //         case "scanQrPopupClosed":
        //             this.WebApp.onEvent(eventType, () => {
        //                 this.onQrPopupClosed();
        //                 return true;
        //             });
        //             break;
        //         default:
        //             break;
        //     }
        // }
        // https://core.telegram.org/bots/webapps#events-available-for-mini-apps
        // OnEvent(eventType) {
        //     this.TG_WebApp.onEvent(eventType, (eventData) => {
        //         this.onEvent(eventType, eventData);
        //     });
        // }
    };
