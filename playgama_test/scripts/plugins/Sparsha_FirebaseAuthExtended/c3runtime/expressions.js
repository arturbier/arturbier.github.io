"use strict";
{
    globalThis.C3.Plugins.Sparsha_FirebaseAuthExtended.Exps = {
        credentials()
        {
            var authExp = this.SDKobject.sparshaFirebase._get("authExpPro");
            if (authExp["userCredential"]) return authExp["userCredential"];
            else return "";
        },

        errorCode()
        {
            return this.errCode;
        },

        errorMessage()
        {
            return this.errMsg;
        },

        cordovaErr_Phone()
        {
            return this.PhoneErr;
        },

        accountCreationTime()
        {
            var authExp = this.SDKobject.sparshaFirebase._get("authExpPro");
            return authExp["userCreatnTime"]
        },

        lastSignInTime()
        {
            var authExp = this.SDKobject.sparshaFirebase._get("authExpPro");
            return authExp["userLastSign"];
        },

        providerCount()
        {
            var authExp = this.SDKobject.sparshaFirebase._get("authExpPro");
            return authExp["countProviderPro"];
        },

        providerIdAt(index)
        {
            var authExp = this.SDKobject.sparshaFirebase._get("authExpPro");
            var retVal = authExp["providerSDPro"][index]["providerId"];
            if (retVal != undefined) return retVal;
            else return "";
        },

        IdToken()
        {
            return this.idTokenRes;
        },

        AdditionalInfoOnSignIn()
        {
            var authExp = this.SDKobject.sparshaFirebase._get("authExpPro");
            var retVal = authExp["addInfoJSON"];
            if (retVal != undefined) return retVal;
            else return "";
        },

        CredentialOnSignIn()
        {
            var authExp = this.SDKobject.sparshaFirebase._get("authExpPro");
            if (authExp["userCredential"]) return authExp["userCredential"];
            else return "";
        }
    };
}