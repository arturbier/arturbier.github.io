const C3 = globalThis.C3;
C3.Plugins.TelegramMiniAppsSDK.Cnds =
    {
        /**
         *
         * @author Buttons
         * @alias buttons
         */
        /**
         * @author Back Button
         */
        OnClickBackButton() { return true; },
        IsBackButtonVisible() { return Telegram.WebApp.BackButton.isVisible; },
        /**
         * @author Main Button
         */
        OnClickMainButton() { return true; },
        IsMainButtonVisible() { return Telegram.WebApp.MainButton.isVisible; },
        IsMainButtonActive() { return Telegram.WebApp.MainButton.isActive; },
        IsMainButtonProgressVisible() { return Telegram.WebApp.MainButton.isProgressVisible; },
        /**
         * @author Settings Button
         */
        OnClickSettingsButton() { return true; },
        IsSettingsButtonVisible() { return Telegram.WebApp.SettingsButton.isVisible; },
        /**
         *
         * @author Main
         * @alias main
         */
        IsInTelegram() { return this._isInTelegram() || false; },
        IsClosingConfirmationEnabled() { return Telegram.WebApp.isClosingConfirmationEnabled; },
        IsExpanded() { return Telegram.WebApp.isExpanded; },
        IsVerticalSwipesEnabled() { return Telegram.WebApp.isVerticalSwipesEnabled; },
        OnGetChatMemberSuccess() { return true; },
        OnGetChatMemberError() { return true; },
        OnAlertClosed() { return true; },
        OnConfirmOK() { return true; },
        OnConfirmClosed() { return true; },
        OnScanQrPopupResult() { return true; },
        /**
         *
         * @author Biometric Manager
         * @alias biometric-manager
         */
        OnBiometricAuthenticateSuccess() { return true; },
        OnBiometricAuthenticateError() { return true; },
        OnBiometricManagerInited() { return true; },
        OnBiometricAccessGranted() { return true; },
        OnBiometricAccessDeclined() { return true; },
        OnUpdateBiometricTokenSuccess() { return true; },
        OnUpdateBiometricTokenError() { return true; },
        IsBiometricManagerAccessGranted() { return Telegram.WebApp.BiometricManager.isAccessGranted; },
        IsBiometricAvailable() { return Telegram.WebApp.BiometricManager.isBiometricAvailable; },
        IsBiometricTokenSaved() { return Telegram.WebApp.BiometricManager.isBiometricTokenSaved; },
        IsBiometricManagerInited() { return Telegram.WebApp.BiometricManager.isInited; },
        /**
         *
         * @author Cloud Storade
         * @alias cloud-storage
         */
        OnCloudStorageItemGetSuccess(key) { return true; },
        OnCloudStorageItemGetError(key) { return true; },
        OnCloudStorageItemSetSuccess(key) { return true; },
        OnCloudStorageItemSetError(key) { return true; },
        OnCloudStorageItemRemoveSuccess(key) { return true; },
        OnCloudStorageItemRemoveError(key) { return true; },
        OnCloudStorageError(error) { return true; },
        /**
         *
         * @author Invoice
         * @alias invoice
         */
        OnInvoiceCancelled() { return true; },
        OnInvoiceFailed() { return true; },
        OnInvoicePaid() { return true; },
        OnInvoicePending() { return true; },
    };
// export {};
