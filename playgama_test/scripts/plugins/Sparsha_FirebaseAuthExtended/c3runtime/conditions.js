"use strict";
{
    globalThis.C3.Plugins.Sparsha_FirebaseAuthExtended.Cnds = {
        OnAuthChangeExt()
        {
            var authExp = this.SDKobject.sparshaFirebase._get("authExpPro");
            if (typeof authExp !== "undefined" && authExp["TrigNotEvent"])
            {
                authExp["TrigNotEvent"] = 0;
                this.SDKobject.sparshaFirebase._set("authExpPro", authExp);
                return true;
            }
        },

        OnLink()
        {
            return true;
        },

        OnPersistence()
        {
            return true;
        },

        OnUnlink()
        {
            return true;
        },

        OnSignedIn()
        {
            return true;
        },

        IsAnonymous()
        {
            var authExp = this.SDKobject.sparshaFirebase._get("authExpPro");
            return authExp["isAnonymPro"];
        },

        PhoneIn()
        {
            var authExp = this.SDKobject.sparshaFirebase._get("authExpBasic");
            if (authExp["PhoneProAuthIn"] == 1) return true;
            else return false;
        },

        OnPhoneSendCordova()
        {
            return true;
        },

        OnPhoneLinkOtp()
        {
            return true;
        },

        ErrorOccured()
        {
            return true;
        },

        OnErrorAt(action, provider)
        {
            var actionCodeHere = ["redirect-", "sign-in-credential", "sign-in-anonymous", "link-popup-", "link-redirect-", "link-password", "link-phone", "link-credential", "unlink-", "unlink-password", "unlink-phone", "reauthenticate"];
            var providerNmArr = ["none", "google", "facebook", "apple", "twitter", "github", "microsoft", "yahoo"];
            if (action == 0 || action == 2 || action == 3 || action == 7)
            {
                actionCodeHere[action] += providerNmArr[provider];
            }
            if (typeof this.onErrorAt[actionCodeHere[action]] != "undefined")
            {
                if (this.onErrorAt[actionCodeHere[action]] == 1)
                {
                    //this.onErrorAt[actionCodeHere[action]] = 0;
                    return true;
                }
                else return false;
            }
            else return false;
        },

        OnGetidtoken()
        {
            return true;
        }
    };
}