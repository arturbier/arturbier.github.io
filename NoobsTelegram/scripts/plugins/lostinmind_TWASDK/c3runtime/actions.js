const C3 = globalThis.C3;
function getStyleByIndex(styleIndex) {
    const styles = ["light", "medium", "heavy", "rigid", "soft"];
    return styles[styleIndex];
}
function getTypeByIndex(typeIndex) {
    const types = ["error", "success", "warning"];
    return types[typeIndex];
}
C3.Plugins.lostinmind_TWASDK.Acts =
    {
        // back-button
        HideBackButton() {
            this.WebApp.BackButton.hide();
        },
        ShowBackButton() {
            this.WebApp.BackButton.show();
        },
        // biometric-manager
        AuthenticateBiometricManager(reason) {
            this.WebApp.BiometricManager.authenticate({
                reason: reason
            }, (isAuthenticated) => {
                this.onBiometricManagerAutheticateResult(isAuthenticated);
            });
        },
        InitBiometricManager() {
            this.WebApp.BiometricManager.init(() => {
                this.onBiometricManagerInited();
            });
        },
        OpenSettingsBiometricManager() {
            this.WebApp.BiometricManager.openSettings();
        },
        RequestAccessBiometricManager(reason) {
            this.WebApp.BiometricManager.requestAccess({
                reason: reason
            }, (isAccessGranted) => {
                this.onBiometricManagerRequestAccessResult(isAccessGranted);
            });
        },
        UpdateBiometricToken(token) {
            this.WebApp.BiometricManager.updateBiometricToken(token, (isBiometricTokenUpdated) => {
                this.onBiometricTokenUpdateResult(isBiometricTokenUpdated);
            });
        },
        // cloud-storage --> next feature!
        // haptic-feedback
        ImpactOccurred(styleIndex) {
            let style = getStyleByIndex(styleIndex);
            this.WebApp.HapticFeedback.impactOccurred(style);
        },
        NotificationOccurred(typeIndex) {
            let type = getTypeByIndex(typeIndex);
            this.WebApp.HapticFeedback.notificationOccurred(type);
        },
        // main-button
        DisableMainButton() {
            this.WebApp.MainButton.disable();
        },
        EnableMainButton() {
            this.WebApp.MainButton.enable();
        },
        HideMainButton() {
            this.WebApp.MainButton.hide();
        },
        ShowMainButton() {
            this.WebApp.MainButton.show();
        },
        SetMainButtonText(text) {
            this.WebApp.MainButton.setText(text);
        },

        // settings-button
        HideSettingsButton() {
            this.WebApp.SettingsButton.hide();
        },
        ShowSettingsButton() {
            this.WebApp.SettingsButton.show();
        },
        // common
        Close() {
            this.WebApp.close();
        },
        DisableClosingConfirmation() {
            this.WebApp.disableClosingConfirmation();
        },
        EnableClosingConfirmation() {
            this.WebApp.enableClosingConfirmation();
        },
        DisableVerticalSwipes() {
            this.WebApp.disableVerticalSwipes();
        },
        EnableVerticalSwipes() {
            this.WebApp.enableVerticalSwipes();
        },
        Expand() {
            this.WebApp.expand();
        },
        OpenLink(url, _try_instant_view) {
            let try_instant_view = true;
            switch (_try_instant_view) {
                case 0:
                    try_instant_view = true;
                    break;
                case 1:
                    try_instant_view = false;
                    break;
            }
            this.WebApp.openLink(url, {
                try_instant_view: try_instant_view
            });
        },
        OpenTelegramLink(url) {
            this.WebApp.openTelegramLink(url);
        },
        Share(url, text) {
            const path = `/share/url?text=${text}&url=${url}`;
            this.WebApp.openTelegramLink(path);
        },
        ShareToStory(media_url, text, story_widget_url, story_widget_name) {
            this.WebApp.shareToStory(media_url, {
                text: text,
                widget_link: {
                    url: story_widget_url,
                    name: story_widget_name
                }
            });
        },
        ShowAlert(message) {
            this.WebApp.showAlert(message, () => {
                this.onAlert();
            });
        },
        ShowConfirm(message) {
            this.WebApp.showConfirm(message, (confirmed) => {
                this.onConfirmResult(confirmed);
            });
        },
        // showPopup(this: SDKInstanceClass, title: string, message: string, buttons: string) {
        //     const params = {
        //         title: title,
        //         message: message,
        //         buttons: JSON.parse(buttons)
        //     }
        //     this.WebApp.showPopup(params, )
        // }
        ShowScanQrPopup(text) {
            this.WebApp.showScanQrPopup({
                text: text
            }, (text) => {
                this.onScanQrPopupResult(text);
            });
        }
    };
