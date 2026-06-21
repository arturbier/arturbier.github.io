"use strict";
{
    globalThis.C3.Plugins.Sparsha_FirebaseAuth.Exps = {
        userName()
        {
            var authExpData = this.SDKobject.sparshaFirebase._get("authExpBasic");
            return authExpData["username"];
        },

        userID()
        {
            var authExpData = this.SDKobject.sparshaFirebase._get("authExpBasic");
            return authExpData["myUID"];
        },

        email()
        {
            var authExpData = this.SDKobject.sparshaFirebase._get("authExpBasic");
            return authExpData["myEmail"];
        },

        picURL()
        {
            var authExpData = this.SDKobject.sparshaFirebase._get("authExpBasic");
            return authExpData["photoURL"];
        },

        provider()
        {
            var authExpData = this.SDKobject.sparshaFirebase._get("authExpBasic");
            return authExpData["providerID"];
        },

        userPhoneNumber()
        {
            var authExpData = this.SDKobject.sparshaFirebase._get("authExpBasic");
            return authExpData["phoneNo"];
        },

        errorCode()
        {
            return this.errCd;
        },

        errorMessage()
        {
            return this.errMsg;
        },

        errorActionCode()
        {
            return this.errAction;
        },

        errorCodeAt(code)
        {
            if (this.errCdAt[code] != undefined) return this.errCdAt[code];
            else return "";
        },

        errorMessageAt(code)
        {
            if (this.errMsgAt[code] != undefined) return this.errMsgAt[code];
            else return "";
        }
    };
}