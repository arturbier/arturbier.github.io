const C3 = globalThis.C3;
function getStyleByIndex(styleIndex) {
    const styles = ["light", "medium", "heavy", "rigid", "soft"];
    return styles[styleIndex];
}
function getTypeByIndex(typeIndex) {
    const types = ["error", "success", "warning"];
    return types[typeIndex];
}
C3.Plugins.TelegramMiniAppsSDK.Acts =
    {
        /**
         *
         * @author Buttons
         * @alias buttons
         */
        /**
         * @author Back Button
         */
        HideBackButton() { Telegram.WebApp.BackButton.hide(); },
        ShowBackButton() { Telegram.WebApp.BackButton.show(); },
        /**
         * @author Main Button
         */
        DisableMainButton() { Telegram.WebApp.MainButton.disable(); },
        EnableMainButton() { Telegram.WebApp.MainButton.enable(); },
        HideMainButton() { Telegram.WebApp.MainButton.hide(); },
        ShowMainButton() { Telegram.WebApp.MainButton.show(); },
        SetMainButtonColor(color = '#RRGGBB') { Telegram.WebApp.MainButton.color = color; },
        SetMainButtonText(text) { Telegram.WebApp.MainButton.setText(text); },
        SetMainButtonTextColor(color = '#RRGGBB') { Telegram.WebApp.MainButton.textColor = color; },
        ShowMainButtonProgress(leaveActive) { Telegram.WebApp.MainButton.showProgress(leaveActive); },
        HideMainButtonProgress() { Telegram.WebApp.MainButton.hideProgress(); },
        /**
         * @author Settings Button
         */
        HideSettingsButton() { Telegram.WebApp.SettingsButton.hide(); },
        ShowSettingsButton() { Telegram.WebApp.SettingsButton.show(); },
        /**
         *
         * @author Biometric Manager
         * @alias biometric-manager
         */
        InitBiometricManager() {
            Telegram.WebApp.BiometricManager.init(async () => {
                //@ts-ignore
                await this.TriggerAsync(this.PluginConditions.OnBiometricManagerInited);
            });
        },
        AuthenticateBiometricManager(reason) {
            const params = {
                reason: reason
            };
            Telegram.WebApp.BiometricManager.authenticate(params, () => { });
        },
        OpenSettingsBiometricManager() { Telegram.WebApp.BiometricManager.openSettings(); },
        RequestAccessBiometricManager(reason) {
            Telegram.WebApp.BiometricManager.requestAccess({
                reason: reason
            }, isAccessGranted => {
                if (isAccessGranted) {
                    this._trigger(this.PluginConditions.OnBiometricAccessGranted);
                }
                else {
                    this._trigger(this.PluginConditions.OnBiometricAccessDeclined);
                }
            });
        },
        UpdateBiometricToken(token) {
            Telegram.WebApp.BiometricManager.updateBiometricToken(token, isBiometricTokenUpdated => {
                if (isBiometricTokenUpdated) {
                    this._trigger(this.PluginConditions.OnUpdateBiometricTokenSuccess);
                }
                else {
                    this._trigger(this.PluginConditions.OnUpdateBiometricTokenError);
                }
            });
        },
        /**
         *
         * @author Haptic Feedback
         * @alias haptic-feedback
         */
        ImpactOccurred(styleIndex) {
            let style = getStyleByIndex(styleIndex);
            Telegram.WebApp.HapticFeedback.impactOccurred(style);
        },
        NotificationOccurred(typeIndex) {
            let type = getTypeByIndex(typeIndex);
            Telegram.WebApp.HapticFeedback.notificationOccurred(type);
        },
        OnSelectionChanged() { Telegram.WebApp.HapticFeedback.selectionChanged(); },
        /**
         *
         * @author Main
         * @alias main
         */
        SetBackgroundColor(color = '#RRGGBB') { Telegram.WebApp.backgroundColor = color; },
        SetHeaderColor(color = '#RRGGBB') { Telegram.WebApp.headerColor = color; },
        CloseMiniApp() { Telegram.WebApp.close(); },
        DisableClosingConfirmation() { Telegram.WebApp.disableClosingConfirmation(); },
        EnableClosingConfirmation() { Telegram.WebApp.enableClosingConfirmation(); },
        DisableVerticalSwipes() { Telegram.WebApp.disableVerticalSwipes(); },
        EnableVerticalSwipes() { Telegram.WebApp.enableVerticalSwipes(); },
        Expand() { Telegram.WebApp.expand(); },
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
            Telegram.WebApp.openLink(url, {
                try_instant_view: try_instant_view
            });
        },
        OpenTelegramLink(url) { Telegram.WebApp.openTelegramLink(url); },
        Share(url, text) {
            const path = {
                path_full: `/share/url?text=${text}&url=${url}`
            };
            //@ts-ignore
            Telegram.WebView.postEvent('web_app_open_tg_link', () => {
                // callback
            }, path);
        },
        ShareToStory(media_url, text, story_widget_url, story_widget_name) {
            Telegram.WebApp.shareToStory(media_url, {
                text: text,
                widget_link: {
                    url: story_widget_url,
                    name: story_widget_name
                }
            });
        },
        ShowAlert(message) {
            Telegram.WebApp.showAlert(message, () => {
                this._trigger(this.PluginConditions.OnAlertClosed);
            });
        },
        ShowConfirm(message) {
            Telegram.WebApp.showConfirm(message, (ok) => {
                if (ok) {
                    this._trigger(this.PluginConditions.OnConfirmOK);
                }
                else {
                    this._trigger(this.PluginConditions.OnConfirmClosed);
                }
            });
        },
        ShowScanQrPopup(text) {
            const params = {
                text: text
            };
            Telegram.WebApp.showScanQrPopup(params);
        },
        CloseScanQrPopup() { Telegram.WebApp.closeScanQrPopup(); },
        CopyToClipboard(data) {
            const o = document.createElement('textarea');
            o.value = data;
            o.style.left = "-9999px";
            document.body.appendChild(o);
            o.select();
            document.execCommand('copy');
            document.body.removeChild(o);
        },
        GetChatMember(botToken, chatId = '@channelusername', userId) {
            isUserInChannel(botToken, chatId, userId).then(isInChannel => {
                if (isInChannel) {
                    this._trigger(this.PluginConditions.OnGetChatMemberSuccess);
                }
                else {
                    this._trigger(this.PluginConditions.OnGetChatMemberError);
                }
            });
        },
        /**
         *
         * @author Cloud Storade
         * @alias cloud-storage
         */
        /**
         * @deprecated
         */
        CloudStorageGetItem(key) {
            // if (this.cloudStorage !== null) {
            //     this.cloudStorage[key];
            // } else {
            // }
            // Telegram.WebApp.CloudStorage.getItem(key, (error, value) => {
            //     if (error !== null) {
            //         this._trigger(this.PluginConditions.OnCloudStorageError(error));
            //         this._trigger(this.PluginConditions.OnCloudStorageItemGetError(key));          
            //     } else {
            //         this.cloudStorageValue = (value !== null) ? value : '';
            //         this._trigger(this.PluginConditions.OnCloudStorageItemGetSuccess(key));
            //     }
            // })
        },
        CloudStorageSetItem(key, value) {
            Telegram.WebApp.CloudStorage.setItem(key, value, (error, success) => {
                if (success)
                    this._loadCloudStorage();
            });
        },
        CloudStorageRemoveItem(key) {
            Telegram.WebApp.CloudStorage.removeItem(key, (error, success) => {
                if (success)
                    this._loadCloudStorage();
            });
        },
        /**
         *
         * @author Invoice
         * @alias invoice
         */
        OpenInvoice(url) {
            Telegram.WebApp.openInvoice(url, () => { });
        },
    };
async function isUserInChannel(botToken, chatId, userId) {
    const url = `https://api.telegram.org/bot${botToken}/getChatMember`;
    const params = new URLSearchParams({
        chat_id: String(chatId),
        user_id: String(userId)
    });
    try {
        const response = await fetch(`${url}?${params.toString()}`);
        const data = await response.json();
        if (data.ok) {
            // Check the user's status in the channel
            const status = data.result.status;
            return status === 'member' || status === 'administrator' || status === 'creator';
        }
        else {
            throw new Error(`Error: ${data.description}`);
        }
    }
    catch (error) {
        console.error('Failed to check user in channel:', error);
        return false;
    }
}
// export {};
