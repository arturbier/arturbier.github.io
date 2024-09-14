const C3 = globalThis.C3;
C3.Plugins.lostinmind_TWASDK.Exps =
    {
        // web-app-user
        UserId() {
            if (this.WebApp.initDataUnsafe.user) {
                return this.WebApp.initDataUnsafe.user.id;
            }
            return -1;
        },
        UserFirstName() {
            if (this.WebApp.initDataUnsafe.user) {
                return this.WebApp.initDataUnsafe.user.first_name;
            }
            return "-";
        },
        IsUserPremium() {
            if (this.WebApp.initDataUnsafe.user) {
                if (this.WebApp.initDataUnsafe.user.is_premium) {
                    return 1
                } else return 0
            }
            return -1;
        },
        UserLanguageCode() {
            if (this.WebApp.initDataUnsafe.user) {
                return this.WebApp.initDataUnsafe.user.language_code;
            }
            return "-";
        },
        UserLastName() {
            if (this.WebApp.initDataUnsafe.user) {
                return this.WebApp.initDataUnsafe.user.last_name;
            }
            return "-";
        },
        UserUsername() {
            if (this.WebApp.initDataUnsafe.user) {
                return this.WebApp.initDataUnsafe.user.username;
            }
            return "-";
        },
        // common
        Platform() {
            return this.WebApp.platform;
        },
        Version() {
            return this.WebApp.version;
        },
        IsExpanded() {
            if (this.WebApp.isExpanded) {
                return 1
            } else return 0
        },
        IsClosingConfirmationEnabled() {
            if (this.WebApp.isClosingConfirmationEnabled) {
                return 1
            } else return 0
        },
        IsVerticalSwipesEnabled() {
            if (this.WebApp.isVerticalSwipesEnabled) {
                return 1
            } else return 0
        },
        ColorScheme() {
            return this.WebApp.colorScheme;
        },
        // back-button
        IsBackButtonVisible() {
            if (this.WebApp.BackButton.isVisible) {
                return 1
            } else return 0
        },
        // biometric-manager
        BiometricType() {
            return this.WebApp.BiometricManager.biometricType;
        },
        BiometricDeviceId() {
            return this.WebApp.BiometricManager.deviceId;
        },
        IsBiometricAccessGranted() {
            if (this.WebApp.BiometricManager.isAccessGranted) {
                return 1
            } else return 0
        },
        IsBiometricAccessRequested() {
            if (this.WebApp.BiometricManager.isAccessRequested) {
                return 1
            } else return 0
        },
        IsBiometricAvailable() {
            if (this.WebApp.BiometricManager.isBiometricAvailable) {
                return 1
            } else return 1
        },
        IsBiometricTokenSaved() {
            if (this.WebApp.BiometricManager.isBiometricTokenSaved) {
                return 1
            } else return 0
        },
        IsBiometricInited() {
            if (this.WebApp.BiometricManager.isInited) {
                return 1
            } else return 0
        },
        // main-button
        IsMainButtonActive() {
            if (this.WebApp.MainButton.isActive) {
                return 1
            } else return 0
        },
        IsMainButtonVisible() {
            if (this.WebApp.MainButton.isVisible) {
                return 1
            } else return 0
        },
        // settings-button
        IsSettingsButtonVisible() {
            if (this.WebApp.SettingsButton.isVisible) {
                return 1
            } else return 0
        }
    };
