"use strict";
{
    globalThis.C3.Plugins.Sparsha_FirebaseSDK.Acts = {
        LoadSD(configString)
        {
            if (configString)
            {
                this.ConfigJSON = configString.replace("apiKey:", "\"apiKey\":").replace("authDomain:", "\"authDomain\":").replace("databaseURL:", "\"databaseURL\":").replace("projectId:", "\"projectId\":").replace("storageBucket:", "\"storageBucket\":").replace("messagingSenderId:", "\"messagingSenderId\":").replace("appId:", "\"appId\":").replace("measurementId:", "\"measurementId\":").replace(";", "");
                this.ConfigJSON = JSON.parse("{" + this.ConfigJSON.split("{").pop());
                this.SDKobject.sparshaFirebase._set("configJSON", this.ConfigJSON);
            }
            if (this.autoLoad === false) this._CallInit("init");
        },

        Disconnect()
        {
            var options_DOM = {
                "action": "disconnect",
                "sdkName": this.sdkInsID,
            };
            this._postToDOM("domSync_sparsha_fSDK", options_DOM);
            if (this.debug) console.log("FIREBASE DISCONNECTED" + "\nsdkObject: " + this.sdkInsID);
        },

        Reconnect(configString)
        {
            if (configString)
            {
                this.ConfigJSON = configString.replace("apiKey:", "\"apiKey\":").replace("authDomain:", "\"authDomain\":").replace("databaseURL:", "\"databaseURL\":").replace("projectId:", "\"projectId\":").replace("storageBucket:", "\"storageBucket\":").replace("messagingSenderId:", "\"messagingSenderId\":").replace("appId:", "\"appId\":").replace("measurementId:", "\"measurementId\":").replace(";", "");
                this.ConfigJSON = JSON.parse("{" + this.ConfigJSON.split("{").pop());
                this.SDKobject.sparshaFirebase._set("configJSON", this.ConfigJSON);
            }
            this._CallInit("reconnect");
        }
    };
}