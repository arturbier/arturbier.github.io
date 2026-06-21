"use strict";
{
    //if (globalThis.SparshaFRAuthBasic == undefined) globalThis.SparshaFRAuthBasic = {};
    //if (globalThis.SparshaFRAuthPro == undefined) globalThis.SparshaFRAuthPro = {};

    const DOM_COMPONENT_ID = "sparsha_firebase_authPRO";

    const C3 = globalThis.C3;
    C3.Plugins.Sparsha_FirebaseAuthExtended.Instance = class FirebaseAuthInstance extends globalThis.ISDKInstanceBase
    {
        constructor()
        {
            super({ domComponentId: DOM_COMPONENT_ID });
            const properties = this._getInitProperties();


            if (properties)
            {

                //this.PhoneAuthEn = properties[0];
                this.SDKobject = this.runtime.sdk.getObjectClassBySid(properties[0]);
                if(this.SDKobject==null) globalThis.alert(this.objectType.name + " ERROR: \n\nChoose SDK Object (in PLugin Properties)\n-\n");
                this.sdkInsID = this.SDKobject.name;
                //this.webClientId = properties[2];

                //globalThis.SparshaFRAuthPro[this.sdkInsID] = {};

                //if (globalThis.SparshaFRAuthBasic[this.sdkInsID] == undefined) globalThis.SparshaFRAuthBasic[this.sdkInsID] = {};
                //if (globalThis.SparshaFRAuthPro[this.sdkInsID] == undefined) globalThis.SparshaFRAuthPro[this.sdkInsID] = {};

                //globalThis.SparshaFRAuthPro[this.sdkInsID].AuthProEnabled = 1;

                /*
                globalThis.SparshaFRAuthPro[this.sdkInsID].isAnonymPro = false;
                globalThis.SparshaFRAuthPro[this.sdkInsID].userCreatnTime = "";
                globalThis.SparshaFRAuthPro[this.sdkInsID].userLastSign = "";
                globalThis.SparshaFRAuthPro[this.sdkInsID].providerSDPro = "";
                globalThis.SparshaFRAuthPro[this.sdkInsID].countProviderPro = 0;
                globalThis.SparshaFRAuthPro[this.sdkInsID].userCredential = "";
                globalThis.SparshaFRAuthPro[this.sdkInsID].PhoneProAuthIn = 0;
                
                globalThis.SparshaFRAuthPro[this.sdkInsID].LoginByEvent = 0;
                globalThis.SparshaFRAuthPro[this.sdkInsID].TrigNotEvent = 0;
                */
                this.PluginCnds = C3.Plugins.Sparsha_FirebaseAuthExtended.Cnds;

                this.onAccountLink = 0;
                this.onAccountUnlink = 0;

                this.errCode = "";
                this.errMsg = "";
                this.errName = "";
                this.errChk = 0

                this.verificationID = "";


                //var PhoneProAuthEnabled = 0;

                this.linkPhoneURL_Ref;
                //this.linkStartNo = 0;

                this.onErrorAt = {};

                this.errorPhoneLinker = 0;
                this.onPhoneLinkerExit = 0;

                this.onSetPersistence = 0;

                this.onStartLinkPhone = 0;

                this.onSendPhoneAuthCordova = 0;


                this.PhoneErr = "";
                this.PhoneErrName = "";
                //var onthis.PhoneErr = 0;

                this.idTokenRes = "";

                var self = this;


            }
        }

        _release()
        {
            super._release();
        }

        _saveToJson()
        {
            return {
                // data to be saved for savegames
            };
        }

        _loadFromJson(o)
        {
            // load state for savegames
        }

        /*_getInitProperties()
        {
            return [
            {
                title: "FirebaseAuth",
                properties: [
                    //{name: ".current-animation",	value: this._currentAnimation.GetName(),	onedit: v => this.CallAction(Acts.SetAnim, v, 0) },
                ]
            }];
        }*/


        _HandleErrors(err, nameSDfb)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            this.onErrorAt = {};
            this.errCode = err["code"];
            this.errMsg = err["message"];
            this.errName = nameSDfb;
            if (enableDebug)
            {
                console.error("ERROR REPORT - AUTH PRO" + "\nsdkObject:" + this.sdkInsID + "\nerrorActionCode: " + this.errName + "\nerrorcode: " + err["code"] + "\nerrormessage: " + err["message"] + "\n ")
            }
            this.onErrorAt[nameSDfb] = 1;
            this._trigger(C3.Plugins.Sparsha_FirebaseAuthExtended.Cnds.ErrorOccured);
            this._trigger(C3.Plugins.Sparsha_FirebaseAuthExtended.Cnds.OnErrorAt);
            this.onErrorAt[nameSDfb] = 0;
        }
    };
}