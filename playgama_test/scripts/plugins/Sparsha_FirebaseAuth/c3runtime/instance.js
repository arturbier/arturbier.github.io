"use strict";
{
    //globalThis.SparshaFRAuthBasic = {};
    //globalThis.SparshaFRAuthPro = {};

    //globalThis.SparshaFRAuthBasic.CaptchaConfirm = {};
    //globalThis.SparshaFRAuthBasic.CaptchaVerifier = {};

    const C3 = globalThis.C3;
    const DOM_COMPONENT_ID = "sparsha_firebase_auth";
    C3.Plugins.Sparsha_FirebaseAuth.Instance = class FirebaseAuthInstance extends globalThis.ISDKInstanceBase
    {
        constructor()
        {
            super({ domComponentId: DOM_COMPONENT_ID });
            const properties = this._getInitProperties();


            if (properties)
            {
                this.SDKobject = this.runtime.sdk.getObjectClassBySid(properties[0]);
                if(this.SDKobject==null) globalThis.alert(this.objectType.name + " ERROR: \n\nChoose SDK Object (in PLugin Properties)\n-\n");
                this.sdkInsID = this.SDKobject.name;
                //if (globalThis.SparshaFRAuthBasic[this.sdkInsID] == undefined) globalThis.SparshaFRAuthBasic[this.sdkInsID] = {};
                //if (globalThis.SparshaFRAuthPro[this.sdkInsID] == undefined) globalThis.SparshaFRAuthPro[this.sdkInsID] = {};
                //var CentralPlug_Obj = this.runtime.sdk.getObjectClassBySid(properties[0]);
                this.PluginCnds = C3.Plugins.Sparsha_FirebaseAuth.Cnds;
                this.errCd = "";
                this.errMsg = "";
                this.errAction = "";
                this.errCdAt = {};
                this.errMsgAt = {};
                this.onErrorAt = {};
            }

            var self = this;
            this._addDOMMessageHandler("run_sparsha_fAuthBasic" + this.uid, function(res)
            {
                if (res["action"] === "PopupOauthSafe")
                {
                    self._AfterOAuth(res, res["providerNo"]);
                }
            });
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

        _AfterOAuth(res, providerNo)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var errProviders = ["google", "facebook", "apple", "twitter", "github", "microsoft", "yahoo"];
            if (res["success"])
            {
                res["userPro"]["userCredential"] = res["cred"];
                res["userPro"]["addInfoJSON"] = res["addInfoJSON"];
                res["userPro"]["isNewUser"] = res["isNewUser"];
                if (providerNo === 1 && res["picChange"])
                {
                    res["userBasic"]["photoURL"] = res["newPicUrl"];
                    if (enableDebug) console.log("PHOTO-URL UPDATED" + "\nsdkObject: " + this.sdkInsID + "\nNew PhotoURL:" + res["newPicUrl"] + "\n ");
                }
                else if (providerNo === 1)
                {
                    var error = {
                        code: res["errorCode"],
                        message: res["errorMessage"]
                    }
                    this._ErrorHandle(error, "popup-" + errProviders[providerNo]);
                };
                this.SDKobject.sparshaFirebase._set("authExpBasic", res["userBasic"]);
                this.SDKobject.sparshaFirebase._set("authExpPro", res["userPro"]);
                this._trigger(this.PluginCnds.OnSignedIn);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._ErrorHandle(error, "popup-" + errProviders[providerNo]);
            }
        }

        _ErrorHandle(err, nameSDfb)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            this.onErrorAt = {};
            this.errCd = err["code"];
            this.errMsg = err["message"];

            this.errCdAt[nameSDfb] = this.errCd;
            this.errMsgAt[nameSDfb] = this.errMsg;

            this.errAction = nameSDfb;
            if (enableDebug)
            {
                console.error("ERROR REPORT - AUTH BASIC" + "\nsdkObject: " + this.sdkInsID + "\nerrorActionCode: " + this.errAction + "\nerrorcode: " + err["code"] + "\nerrormessage: " + err["message"] + "\n ")
            }
            this.onErrorAt[nameSDfb] = 1;

            this._trigger(C3.Plugins.Sparsha_FirebaseAuth.Cnds.ErrorOccured);
            this._trigger(C3.Plugins.Sparsha_FirebaseAuth.Cnds.OnErrorAt);
            this.onErrorAt[nameSDfb] = 0;
        }
    };
}