const C3 = globalThis.C3;
C3.Plugins.TelegramMiniAppsSDK.Exps =
    {
        /**
         *
         * @author User
         * @alias user
         */
        UserId() { return (this._isInTelegram()) ? Telegram.WebApp.initDataUnsafe.user?.id : -1; },
        UserFirstName() { return (this._isInTelegram()) ? Telegram.WebApp.initDataUnsafe.user?.username : ""; },
        IsUserPremium() { return (this._isInTelegram()) ? Telegram.WebApp.initDataUnsafe.user?.is_premium : -1; },
        UserLanguageCode() { return (this._isInTelegram()) ? Telegram.WebApp.initDataUnsafe.user?.language_code : ""; },
        UserLastName() { return (this._isInTelegram()) ? Telegram.WebApp.initDataUnsafe.user?.last_name : ""; },
        UserUsername() { return (this._isInTelegram()) ? Telegram.WebApp.initDataUnsafe.user?.username : ""; },
        /**
         *
         * @author Main
         * @alias main
         */
        InitData() { return Telegram.WebApp.initData; },
        Platform() { return Telegram.WebApp.platform; },
        Version() { return Telegram.WebApp.version; },
        IsExpanded() { return this._getNumberFromBoolean(Telegram.WebApp.isExpanded); },
        IsClosingConfirmationEnabled() { return this._getNumberFromBoolean(Telegram.WebApp.isClosingConfirmationEnabled); },
        IsVerticalSwipesEnabled() { return this._getNumberFromBoolean(Telegram.WebApp.isVerticalSwipesEnabled); },
        ColorScheme() { return Telegram.WebApp.colorScheme; },
        QrTextData() { return this.qrTextReceived; },
        /**
         *
         * @author Buttons
         * @alias buttons
         */
        /**
         * @author Back Button
         */
        IsBackButtonVisible() { return this._getNumberFromBoolean(Telegram.WebApp.BackButton.isVisible); },
        /**
         * @author Main Button
         */
        IsMainButtonActive() { return this._getNumberFromBoolean(Telegram.WebApp.MainButton.isActive); },
        IsMainButtonVisible() { return this._getNumberFromBoolean(Telegram.WebApp.MainButton.isVisible); },
        IsMainButtonProgressVisible() { return this._getNumberFromBoolean(Telegram.WebApp.MainButton.isProgressVisible); },
        /**
         * @author Settings Button
         */
        IsSettingsButtonVisible() { return this._getNumberFromBoolean(Telegram.WebApp.SettingsButton.isVisible); },
        /**
         *
         * @author Biometric Manager
         * @alias biometric-manager
         */
        BiometricType() { return Telegram.WebApp.BiometricManager.biometricType; },
        BiometricDeviceId() { return Telegram.WebApp.BiometricManager.deviceId; },
        IsBiometricAccessGranted() { return this._getNumberFromBoolean(Telegram.WebApp.BiometricManager.isAccessGranted); },
        IsBiometricAccessRequested() { return this._getNumberFromBoolean(Telegram.WebApp.BiometricManager.isAccessGranted); },
        IsBiometricAvailable() { return this._getNumberFromBoolean(Telegram.WebApp.BiometricManager.isBiometricAvailable); },
        IsBiometricTokenSaved() { return this._getNumberFromBoolean(Telegram.WebApp.BiometricManager.isBiometricTokenSaved); },
        IsBiometricInited() { return this._getNumberFromBoolean(Telegram.WebApp.BiometricManager.isInited); },
        /**
         *
         * @author Cloud Storade
         * @alias cloud-storage
         */
        CloudStorageValue(key) {
            if (this.cloudStorage !== null && this.cloudStorage[key] !== null) {
                return String(this.cloudStorage[key]);
            }
            else
                return '';
        }
    };
// export {};
