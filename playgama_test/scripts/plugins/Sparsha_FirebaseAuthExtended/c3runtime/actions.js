"use strict";
{
    globalThis.C3.Plugins.Sparsha_FirebaseAuthExtended.Acts = {
        async OauthRedirect(providerNo, googlePromptSelect)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var errProviders = ["google", "facebook", "apple", "twitter", "github", "microsoft", "yahoo"];
            var options_DOM = {
                "action": "OauthRedirect",
                "sdkName": this.sdkInsID,
                "providerNo": providerNo,
                "googlePromptSelect": googlePromptSelect,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuthPRO", options_DOM);
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
                    this._HandleErrors(error, "redirect-" + errProviders[providerNo]);
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
                this._HandleErrors(error, "redirect-" + errProviders[providerNo]);
            }
        },

        async OauthLink(type, providerNo)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var errProviders = ["google", "facebook", "apple", "twitter", "github", "microsoft", "yahoo"];
            var typeString = ["Popup", "Redirect"];
            var options_DOM = {
                "action": "OauthLink",
                "sdkName": this.sdkInsID,
                "type": type,
                "providerNo": providerNo,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuthPRO", options_DOM);
            if (res["success"])
            {
                if (enableDebug) console.log("Linked OAuth-" + typeString[type] + "\nsdkObject:" + this.sdkInsID + "\n");
                this._trigger(this.PluginCnds.OnLink);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleErrors(error, "link-" + typeString[type].toLowerCase() + "-" + errProviders[providerNo]);
            }
        },

        async SetPersistence(persistence)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var persName = ["LOCAL", "SESSION", "NONE"];
            var options_DOM = {
                "action": "SetPersistence",
                "sdkName": this.sdkInsID,
                "persistence": persistence,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuthPRO", options_DOM);
            if (res["success"])
            {
                if (enableDebug) console.log("Persistence Set: " + persName[persistence] + "\nsdkObject:" + this.sdkInsID + "\n");
                this._trigger(this.PluginCnds.OnPersistence);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleErrors(error, "peristence-" + persName[persistence].toLowerCase());
            }
        },

        async UnlinkProviders(pnum)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var pIDString = ["password", "phone", "google.com", "facebook.com", "apple.com", "twitter.com", "github.com", "microsoft.com", "yahoo.com"];
            var options_DOM = {
                "action": "UnlinkProviders",
                "sdkName": this.sdkInsID,
                "pnum": pnum,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuthPRO", options_DOM);
            if (res["success"])
            {
                if (enableDebug) console.log("Unlinked: " + pIDString[pnum] + "\nsdkObject:" + this.sdkInsID + "\n");
                this._trigger(this.PluginCnds.OnUnlink);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleErrors(error, "unlink-" + pIDString[pnum]);
            }
        },

        async SignInCredential(cred, type)
        {
            var options_DOM = {
                "action": "SignInCredential",
                "sdkName": this.sdkInsID,
                "cred": cred,
                "type": type
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuthPRO", options_DOM);
            if (res["success"])
            {
                res["userPro"]["userCredential"] = cred;
                res["userPro"]["addInfoJSON"] = res["addInfoJSON"];
                res["userPro"]["isNewUser"] = res["isNewUser"];
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
                this._HandleErrors(error, "sign-in-credential");
            }
        },

        async LinkCredential(cred, type)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var options_DOM = {
                "action": "LinkCredential",
                "sdkName": this.sdkInsID,
                "cred": cred,
                "type": type
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuthPRO", options_DOM);
            if (res["success"])
            {
                if (enableDebug) console.log("Linked Credentials" + "\nsdkObject:" + this.sdkInsID + "\n");
                this._trigger(this.PluginCnds.OnLink);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleErrors(error, "link-credential");
            }
        },

        async AnonymousAuth()
        {
            var options_DOM = {
                "action": "AnonymousAuth",
                "sdkName": this.sdkInsID,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuthPRO", options_DOM);
            if (res["success"])
            {
                res["userPro"]["userCredential"] = res["cred"];
                res["userPro"]["addInfoJSON"] = res["addInfoJSON"];
                res["userPro"]["isNewUser"] = res["isNewUser"];
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
                this._HandleErrors(error, "sign-in-anonymous");
            }
        },

        async SendMessage(phone)
        {
            //Deprecated
        },

        async SubmitOtp(code)
        {
            //Deprecated
        },

        async CordovaLinkPhone(code)
        {
            //Deprecated
        },

        async CordovaOauth(providerNo)
        {
            //Deprecated
        },

        async PhoneLinkBrowser(phonenum)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var options_DOM = {
                "action": "PhoneLinkBrowser",
                "sdkName": this.sdkInsID,
                "phonenum": phonenum,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuthPRO", options_DOM);
            if (res["success"])
            {
                if (enableDebug) console.log("Linked Phone: " + phonenum + "\nsdkObject:" + this.sdkInsID + "\n");
                this._trigger(this.PluginCnds.OnPhoneLinkOtp);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleErrors(error, "link-phone");
            }
        },

        async LinkEmail(email, pass)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var options_DOM = {
                "action": "LinkEmail",
                "sdkName": this.sdkInsID,
                "email": email,
                "pass": pass
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuthPRO", options_DOM);
            if (res["success"])
            {
                if (enableDebug) console.log("Linked Email with Password" + "\nsdkObject:" + this.sdkInsID + "\n");
                this._trigger(this.PluginCnds.OnLink);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleErrors(error, "link-email");
            }
        },

        async SignInCustomToken(string, serverLoc)
        {
            var myProjectID = this.SDKobject.sparshaFirebase._get("configJSON").projectId;
            var options_DOM = {
                "action": "SignInCustomToken",
                "sdkName": this.sdkInsID,
                "string": string,
                "myProjectID": myProjectID,
                "serverLoc": serverLoc
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuthPRO", options_DOM);
            if (res["success"])
            {
                res["userPro"]["userCredential"] = "{}";
                res["userPro"]["addInfoJSON"] = res["addInfoJSON"];
                res["userPro"]["isNewUser"] = res["isNewUser"];
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
                this._HandleErrors(error, "sign-in-string");
            }
        },

        async GetJwt(idtype)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var options_DOM = {
                "action": "GetJwt",
                "sdkName": this.sdkInsID,
                "idtype": idtype,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuthPRO", options_DOM);
            if (res["success"])
            {
                if (enableDebug) console.log("Fetched ID Token JWT" + "\nsdkObject:" + this.sdkInsID + "\n");
                this.idTokenRes = res["idToken"];
                this._trigger(this.PluginCnds.OnGetidtoken);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleErrors(error, "get-idtoken");
            }
        }
    };
}