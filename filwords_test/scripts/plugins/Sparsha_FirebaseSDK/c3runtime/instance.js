"use strict";
{
    if (globalThis.ImportFirebaseName = undefined) globalThis.ImportFirebaseName = null;
    //if (globalThis.SparshaFRAuthBasic == undefined) globalThis.SparshaFRAuthBasic = {};
    //if (globalThis.SparshaFRObjects == undefined) globalThis.SparshaFRObjects = {};
    //if (self.authExpPro == undefined) self.authExpPro = {};

    if (typeof globalThis.sparshaFirebaseData == 'undefined') {
        globalThis.sparshaFirebaseData={};
        /*globalThis.sparshaFirebaseData={
            _set(key,data){
                globalThis.sparshaFirebaseData[key]=data;
            },
            _get(key){
                return globalThis.sparshaFirebaseData[key];
            }
        }*/
    }

    const C3 = globalThis.C3;
    const DOM_COMPONENT_ID = "sparsha_firebase_sdk";
    C3.Plugins.Sparsha_FirebaseSDK.Instance = class FirebaseSDKInstance extends globalThis.ISDKInstanceBase
    {
        constructor()
        {
            super({ domComponentId: DOM_COMPONENT_ID });
            const properties = this._getInitProperties();
            var selObjNow;
            var configString = "";
            if (properties)
            {
                this.debug = properties[0];
                selObjNow = properties[1];

                this.tmOut = properties[2];
                this.autoLoad = properties[3];

                configString = properties[4];
                this.versionFB = properties[5];

                this.isAuthFB = properties[6];
                this.isDbFB = properties[7];
                this.isFirestore = properties[8];
                this.isStorageFB = properties[9];
                this.isAnalytics = properties[10];
                this.isPerformance = properties[11];

                this.isAppCheck = properties[12];
                this.captchaType = properties[13];
                this.captchaKey = properties[14];
                this.autoRefCapToken = properties[15];

                this.isRemoteConfig = properties[16];
                this.remoteConfigTime = properties[17];
                this.remoteConfigDefault = properties[18];

                this.remove_app = properties[19];
                this.remove_auth = properties[20];
                this.remove_database = properties[21];
                this.remove_firestore = properties[22];
                this.remove_storage = properties[23];
                this.remove_analytics = properties[24];
                this.remove_appcheck = properties[25];

                this.isMessagingFB = false;
                this.remove_messaging = false;
            }
            var self = this;


            this.objectType.sparshaFirebase={
                _set(key,data){
                    self.objectType.sparshaFirebase[key]=data;
                },
                _get(key){
                    return self.objectType.sparshaFirebase[key];
                }
            };

            this.SDKobject=this.objectType;

            this.PluginCnds = C3.Plugins.Sparsha_FirebaseSDK.Cnds;
            this.sdkInsID = this.objectType.name;

            if (configString)
            {
                this.ConfigJSON = configString.replace("apiKey:", "\"apiKey\":").replace("authDomain:", "\"authDomain\":").replace("databaseURL:", "\"databaseURL\":").replace("projectId:", "\"projectId\":").replace("storageBucket:", "\"storageBucket\":").replace("messagingSenderId:", "\"messagingSenderId\":").replace("appId:", "\"appId\":").replace("measurementId:", "\"measurementId\":").replace(";", "");
                this.ConfigJSON = JSON.parse("{" + this.ConfigJSON.split("{").pop());
            }
            else this.ConfigJSON = {};

            this.C3f_SD = 0;
            this.firebaseOb = {};
            this.initFB = {};
            this.authExpBasic = {};
            this.authExpPro = {};
            //if (globalThis.SparshaFRAuthBasic[this.sdkInsID] == undefined) globalThis.SparshaFRAuthBasic[this.sdkInsID] = {};
            this.GlobalFirebase = {};
            this.countAuthStateCall = 0;
            
            this.SDKobject.sparshaFirebase._set("enableDebug", this.debug);
            this.SDKobject.sparshaFirebase._set("remoteConfigDefault", JSON.parse(this.remoteConfigDefault));
            this.SDKobject.sparshaFirebase._set("configJSON", this.ConfigJSON);

            if (selObjNow != -1)
            {
                this.PrimarySDKobject = this.runtime.sdk.getObjectClassBySid(selObjNow);
                this.PrimarySDKname = this.PrimarySDKobject.name;
                if (this.PrimarySDKname == this.sdkInsID) globalThis.ImportFirebaseName = this.sdkInsID;
            }
            else globalThis.ImportFirebaseName = this.sdkInsID;

            this.nowIniting = 0;
            if (this.autoLoad) this._CallInit("init");
            
            this._addDOMMessageHandler("run_sparsha_fSDK" + this.uid, function(e)
            {
                if (e["status"] === "success")
                {
                    if (e["action"] === "init" || e["action"] === "reconnect")
                    {
                        if (self.nowIniting)
                        {
                            self.SDKobject.sparshaFirebase._set("authExpBasic", e["userBasic"]);
                            self.SDKobject.sparshaFirebase._set("authExpPro", e["userPro"]);
                            self.nowIniting = 0;
                            if (e["action"] === "init")
                            {
                                if (self.debug) console.log("FIREBASE SDK LOADED" + "\nsdkObject: " + self.sdkInsID);
                                self._trigger(self.PluginCnds.OnLoaded);
                            }
                            else
                            {
                                if (self.debug) console.log("FIREBASE SDK RECONNECTED" + "\nsdkObject: " + self.sdkInsID);
                                self._trigger(self.PluginCnds.OnReconnect);
                            }
                        }
                    }
                }
            });
        }
        _release()
        {
            super._release();
        }
        _saveToJson()
        {
            return {};
        }
        _loadFromJson(o)
        {}

        _CallInit(actionName)
        {
            var options_DOM = {
                "action": actionName,
                "sdkName": this.sdkInsID,
                "plugin_uid": this.uid,

                "recaptchatoken": this.captchaKey,

                "captchaType": this.captchaType,
                "autoRefCapToken": this.autoRefCapToken,

                "remove_app": this.remove_app,
                "remove_auth": this.remove_auth,
                "remove_database": this.remove_database,
                "remove_storage": this.remove_storage,
                "remove_firestore": this.remove_firestore,
                "remove_analytics": this.remove_analytics,
                "remove_appcheck": this.remove_appcheck,

                "enable_auth": this.isAuthFB,
                "enable_database": this.isDbFB,
                "enable_storage": this.isStorageFB,
                "enable_appcheck": this.isAppCheck,
                "enable_firestore": this.isFirestore,
                "enable_analytics": this.isAnalytics,
                "enable_messaging": this.isMessagingFB,
                "enable_remoteconfig": this.isRemoteConfig,
                "enable_performance": this.isPerformance,


                "remoteConfigTime": this.remoteConfigTime,
                "remoteConfigDefault": JSON.parse(this.remoteConfigDefault),

                "firebaseConfig": this.ConfigJSON,

                "version": this.versionFB,

                "debug": this.debug,
                "autoLoad": this.autoLoad,
                "tseconds": this.tmOut,
            };
            this.nowIniting = 1;
            this._postToDOM("domSync_sparsha_fSDK", options_DOM);
        }
    };
}