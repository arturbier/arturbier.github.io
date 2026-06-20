"use strict";
{
    globalThis.C3.Plugins.Sparsha_FirebaseAuth.Acts = {
        async Signupemail(emaildb, passdb)
        {
            var options_DOM = {
                "action": "Signupemail",
                "sdkName": this.sdkInsID,
                "email": emaildb,
                "password": passdb
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuth", options_DOM);
            if (res["success"])
            {
                res["userPro"]["userCredential"] = res["cred"];
                res["userPro"]["addInfoJSON"] = res["addInfoJSON"];
                res["userPro"]["isNewUser"] = true;
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
                this._ErrorHandle(error, "sign-up-email");
            }
        },

        async Signinemail(emaildb, passdb)
        {
            var options_DOM = {
                "action": "Signinemail",
                "sdkName": this.sdkInsID,
                "email": emaildb,
                "password": passdb
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuth", options_DOM);
            if (res["success"])
            {
                res["userPro"]["userCredential"] = res["cred"];
                res["userPro"]["addInfoJSON"] = res["addInfoJSON"];
                res["userPro"]["isNewUser"] = false;
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
                this._ErrorHandle(error, "sign-in-email");
            }
        },

        async VerifyEmail()
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var options_DOM = {
                "action": "VerifyEmail",
                "sdkName": this.sdkInsID,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuth", options_DOM);
            if (res["success"])
            {
                if (enableDebug) console.log("VERIFICATION EMAIL SENT" + "\nsdkObject: " + this.sdkInsID + "\n ")
                this._trigger(this.PluginCnds.OnVerifyEmailSent);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._ErrorHandle(error, "verify-email");
            }
        },

        async UpdateEmail(updateEmailPara)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var options_DOM = {
                "action": "UpdateEmail",
                "sdkName": this.sdkInsID,
                "newEmail": updateEmailPara
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuth", options_DOM);
            if (res["success"])
            {
                var AexpbO = this.SDKobject.sparshaFirebase._get("authExpBasic");
                AexpbO["myEmail"] = updateEmailPara;
                this.SDKobject.sparshaFirebase._set("authExpBasic", AexpbO);
                if (enableDebug) console.log("EMAIL UPDATED" + "\nsdkObject: " + this.sdkInsID + "\nNew email: " + updateEmailPara + "\n ")
                this._trigger(this.PluginCnds.OnUpdateEmail);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._ErrorHandle(error, "update-email");
            }
        },

        async Signupname(namedb, passdb, yourDomain)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var options_DOM = {
                "action": "Signupname",
                "sdkName": this.sdkInsID,
                "username": namedb,
                "password": passdb,
                "domain": yourDomain
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuth", options_DOM);
            if (res["success"])
            {
                res["userPro"]["userCredential"] = res["cred"];
                res["userPro"]["addInfoJSON"] = res["addInfoJSON"];
                res["userPro"]["isNewUser"] = true;
                if (res["nameChange"])
                {
                    res["userBasic"]["username"] = namedb;
                    if (enableDebug) console.log("USERNAME UPDATED" + "\nsdkObject: " + this.sdkInsID + "\nNew Username:" + namedb + "\n ");
                }
                else
                {
                    var error = {
                        code: res["errorCode"],
                        message: res["errorMessage"]
                    }
                    this._ErrorHandle(error, "sign-up-name");
                }
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
                this._ErrorHandle(error, "sign-up-name");
            }
        },

        async Signinname(namedb, passdb, yourDomain)
        {
            var options_DOM = {
                "action": "Signinname",
                "sdkName": this.sdkInsID,
                "username": namedb,
                "password": passdb,
                "domain": yourDomain
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuth", options_DOM);
            if (res["success"])
            {
                res["userPro"]["userCredential"] = res["cred"];
                res["userPro"]["addInfoJSON"] = res["addInfoJSON"];
                res["userPro"]["isNewUser"] = false;
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
                this._ErrorHandle(error, "sign-in-name");
            }
        },

        async ResetPassword(email)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var options_DOM = {
                "action": "ResetPassword",
                "sdkName": this.sdkInsID,
                "email": email,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuth", options_DOM);
            if (res["success"])
            {
                if (enableDebug) console.log("PASSWORD RESET EMAIL SENT" + "\nsdkObject: " + this.sdkInsID + "\n ")
                this._trigger(this.PluginCnds.OnResetPasswordEmail);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._ErrorHandle(error, "reset-password");
            }
        },

        async UpdatePassword(updatePass)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var options_DOM = {
                "action": "UpdatePassword",
                "sdkName": this.sdkInsID,
                "password": updatePass,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuth", options_DOM);
            if (res["success"])
            {
                //NOTE: IF POSSIBLE UPDATE CREDENTIAL
                //var AexppO = this.SDKobject.sparshaFirebase._get("authExpPro");
                //AexppO["userCredential"] = res["cred"];
                //this.SDKobject.sparshaFirebase._set("authExpPro", AexppO);
                if (enableDebug) console.log("PASSWORD UPDATED" + "\nsdkObject: " + this.sdkInsID + "\nNew password: " + updatePass + "\n ")
                this._trigger(this.PluginCnds.OnUpdatePass);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._ErrorHandle(error, "update-password");
            }
        },

        async SendPhoneNumber(phoneNumber)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var options_DOM = {
                "action": "SendPhoneNumber",
                "sdkName": this.sdkInsID,
                "phoneNumber": phoneNumber,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuth", options_DOM);
            if (res["success"])
            {
                if (enableDebug) console.log("OTP SENT TO PHONE" + "\nsdkObject: " + this.sdkInsID + "\n ")
                this._trigger(this.PluginCnds.OnSendPhone);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._ErrorHandle(error, "get-otp");
            }
        },

        async SubmitOtp(otp)
        {
            var options_DOM = {
                "action": "SubmitOtp",
                "sdkName": this.sdkInsID,
                "otp": otp,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuth", options_DOM);
            if (res["success"])
            {
                res["userPro"]["userCredential"] = res["cred"];
                res["userPro"]["addInfoJSON"] = res["addInfoJSON"];
                res["userBasic"]["isNewUser"] = res["isNewUser"];
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
                this._ErrorHandle(error, "submit-otp");
            }
        },

        async RenderRecaptcha(theme)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var themeName;
            if (theme == 0) themeName = "Light";
            else themeName = "Dark"
            var options_DOM = {
                "action": "RenderRecaptcha",
                "sdkName": this.sdkInsID,
                "theme": themeName,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuth", options_DOM);
            if (res["success"])
            {
                if (enableDebug) console.log("reCaptcha VERIFIED" + "\nsdkObject: " + this.sdkInsID + "\n ");
                this._trigger(this.PluginCnds.IsCaptchaVerified);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._ErrorHandle(error, "render-recaptcha");
            }
        },

        RemoveRecaptcha()
        {
            var options_DOM = {
                "action": "RemoveRecaptcha",
                "sdkName": this.sdkInsID,
            };
            this._postToDOM("domSync_sparsha_fAuth", options_DOM);
        },

        async SignOut()
        {
            var options_DOM = {
                "action": "SignOut",
                "sdkName": this.sdkInsID,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuth", options_DOM);
            if (res["success"])
            {
                this.SDKobject.sparshaFirebase._set("authExpPro",
                {});
                this.SDKobject.sparshaFirebase._set("authExpBasic",
                {});
                this._trigger(this.PluginCnds.OnSignedOut);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._ErrorHandle(error, "sign-out");
            }
        },

        async UpdateUsername(name, photourl)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var AexpbO = this.SDKobject.sparshaFirebase._get("authExpBasic");
            var updateType;
            var updateProfOb = {};
            if (name != "" && photourl != "")
            {
                updateProfOb = {
                    "displayName": name,
                    "photoURL": photourl
                }
                updateType = "BOTH";
            }
            else if (name == "" && photourl != "")
            {
                updateProfOb = {
                    "photoURL": photourl
                }
                updateType = "PHOTO";
            }
            else if (name != "" && photourl == "")
            {
                updateProfOb = {
                    "displayName": name
                }
                updateType = "NAME";
            }
            else updateType = "NONE";
            if (updateType != "NONE")
            {
                var options_DOM = {
                    "action": "UpdateUsername",
                    "sdkName": this.sdkInsID,
                    "updateProfOb": updateProfOb,
                };
                var res = await this._postToDOMAsync("domAsync_sparsha_fAuth", options_DOM);
                if (res["success"])
                {
                    if (updateType == "BOTH")
                    {
                        AexpbO["username"] = name;
                        AexpbO["photoURL"] = photourl;
                        if (enableDebug) console.log("PROFILE UPDATED" + "\nsdkObject: " + this.sdkInsID + "\nNew Username: " + name + "\nNew PhotoURL: " + photourl + "\n ");
                    }
                    else if (updateType == "PHOTO")
                    {
                        AexpbO["photoURL"] = photourl;
                        if (enableDebug) console.log("PROFILE UPDATED" + "\nsdkObject: " + this.sdkInsID + "\nNew PhotoURL: " + photourl + "\n ");
                    }
                    else if (updateType == "NAME")
                    {
                        AexpbO["username"] = name;
                        if (enableDebug) console.log("PROFILE UPDATED" + "\nsdkObject: " + this.sdkInsID + "\nNew Username: " + name + "\n ");
                    }
                    this.SDKobject.sparshaFirebase._set("authExpBasic", AexpbO);
                    this._trigger(this.PluginCnds.OnUpdateProfile);
                }
                else
                {
                    var error = {
                        code: res["errorCode"],
                        message: res["errorMessage"]
                    }
                    this._ErrorHandle(error, "update-profile");
                }
            }
        },

        async DeleteUser()
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var options_DOM = {
                "action": "DeleteUser",
                "sdkName": this.sdkInsID,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuth", options_DOM);
            if (res["success"])
            {
                this.SDKobject.sparshaFirebase._set("authExpPro",
                {});
                this.SDKobject.sparshaFirebase._set("authExpBasic",
                {});

                if (enableDebug) console.log("USER DELETED" + "\nsdkObject: " + this.sdkInsID + "\n ");
                this._trigger(this.PluginCnds.OnDeleteUser);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._ErrorHandle(error, "delete-user");
            }
        },

        ClearError()
        {
            this.errCd = "";
            this.errMsg = "";
            this.errAction = "";
            this.errCdAt = {};
            this.errMsgAt = {};
        },

        async PopupOauth(providerNo, googlePromptSelect)
        {
            var options_DOM = {
                "action": "PopupOauth",
                "sdkName": this.sdkInsID,
                "providerNo": providerNo,
                "googlePromptSelect": googlePromptSelect,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fAuth", options_DOM);
            this._AfterOAuth(res, providerNo);
        },

        PopupOauthSafe(providerNo, buttonId, googlePromptSelect)
        {
            var options_DOM = {
                "action": "PopupOauthSafe",
                "plugin_uid": this.uid,
                "sdkName": this.sdkInsID,
                "providerNo": providerNo,
                "buttonId": buttonId,
                "googlePromptSelect": googlePromptSelect,
            };
            this._postToDOM("domSync_sparsha_fAuth", options_DOM);
        }
    };
}