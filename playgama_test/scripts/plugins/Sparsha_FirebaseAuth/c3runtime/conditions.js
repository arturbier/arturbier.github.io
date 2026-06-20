"use strict";
{
    globalThis.C3.Plugins.Sparsha_FirebaseAuth.Cnds = {
        IsEmailVerified()
        {
            var authExpData = this.SDKobject.sparshaFirebase._get("authExpBasic");
            if (authExpData["isEmailVerified"]) return true;
            else return false;
        },

        OnVerifyEmailSent()
        {
            return true;
        },

        OnUpdateEmail()
        {
            return true;
        },

        OnResetPasswordEmail()
        {
            return true;
        },

        OnUpdatePass()
        {
            return true;
        },

        OnSignedUp()
        {
            return true;
        },

        OnSendPhone()
        {
            return true;
        },

        IsCaptchaVerified()
        {
            return true;
        },

        IsSignedIn()
        {
            var authExpData = this.SDKobject.sparshaFirebase._get("authExpBasic");
            if (authExpData != undefined && authExpData["isSignedIn"] == 1) return true;
            else return false;
        },

        OnSignedOut()
        {
            return true;
        },

        OnUpdateProfile()
        {
            return true;
        },

        OnDeleteUser()
        {
            return true;
        },

        ErrorOccured()
        {
            return true;
        },

        OnErrorAt(action)
        {
            var actionCodeHere = ["sign-up-email", "sign-in-email", "sign-up-name", "sign-in-name", "update-email", "update-password", "verify-email", "reset-password", "render-recaptcha", "get-otp", "submit-otp", "popup-google", "popup-facebook", "popup-apple", "popup-twitter", "popup-github", "popup-microsoft", "popup-yahoo", "update-profile", "delete-user", "sign-out"];
            if (typeof this.onErrorAt[actionCodeHere[action]] != "undefined")
            {
                if (this.onErrorAt[actionCodeHere[action]] == 1)
                {
                    return true;
                }
                else return false;
            }
            else return false;
        },

        OnSignedIn()
        {
            return true;
        },

        IsNewUser()
        {
            var authExpData = this.SDKobject.sparshaFirebase._get("authExpPro");
            if (authExpData != undefined && authExpData["isNewUser"] === true) return true;
            else return false;

            // Also needs edit for Auth Pro, Pro mobile all plugins
        }
    };
}