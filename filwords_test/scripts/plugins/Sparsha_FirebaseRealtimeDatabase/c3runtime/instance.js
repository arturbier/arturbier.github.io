"use strict";
{
    const DOM_COMPONENT_ID = "sparsha_firebase_database";
    const C3 = globalThis.C3;
    C3.Plugins.Sparsha_FirebaseRealtimeDatabase.Instance = class FirebaseReadDataInstance extends globalThis.ISDKInstanceBase
    {
        constructor()
        {
            super({ domComponentId: DOM_COMPONENT_ID });
            const properties = this._getInitProperties();


            if (properties)
            {
                //this.disReadLogs = properties[0];
                //this.disWriteLogs = properties[1];

                this.SDKobject = this.runtime.sdk.getObjectClassBySid(properties[0]);
                if(this.SDKobject==null) globalThis.alert(this.objectType.name + " ERROR: \n\nChoose SDK Object (in PLugin Properties)\n-\n");
                this.sdkInsID = this.SDKobject.name;

                this.locUserData = properties[1];
                this.locUserLB = properties[2];


                this.uidLBSet_C = false;

                this.Read_C = {};
                this.myReadVal = {};
                this.myReadJSON = {};
                this.myReadPROUI = {};
                this.myReadARRAY = {};
                this.Rank_C = {};

                this.onTrig_C = {};

                this.onNoExist_C = {};

                this.onError = {};
                this.onErrorAt = {};

                this.ErrorCd = ""
                this.ErrorMsg = ""
                this.ErrorCdAt = {}
                this.ErrorMsgAt = {}


                this.onError = {}
                this.onErrorAt = {}



                this.onRemove = {};
                this.onRemoveErrorAt = {};
                this.RemoveErrorAt = {};

                this.onIncre = {};
                this.onIncreErrorAt = {};
                this.IncreErrorAt = {}

                this.onWrite = {};

                //this.PluginCnds = C3.Plugins.Sparsha_FirebaseRealtimeDatabase.Cnds;
            }

            var self = this;
            this._addDOMMessageHandler("on_complete" + this.uid, function(res)
            {
                var TriggerString;
                if (res["action"] === "AdvancedReadLeaderboard") TriggerString = "Custom-Leaderboard";
                if (res["action"] === "SimpleReadLeaderboard") TriggerString = "User Account-Leaderboard";
                if (res["action"] === "AdvancedReadData") TriggerString = "Custom-Data";
                if (res["action"] === "SimpleReadData") TriggerString = "User Account-Data";

                var enableDebug = self.SDKobject.sparshaFirebase._get("enableDebug");

                if (res["action"] === "AdvancedReadLeaderboard" || res["action"] === "SimpleReadLeaderboard")
                {
                    if (res["success"])
                    {
                        self.Read_C[res["id"]] = res["Read_C"];
                        self.myReadJSON[res["id"]] = res["myReadJSON"];
                        self.myReadPROUI[res["id"]] = res["myReadPROUI"];
                        self.myReadARRAY[res["id"]] = res["myReadARRAY"];
                        self.Rank_C[res["id"]] = res["Rank_C"];
                        self._TriggerRead(TriggerString, res["id"], res["locationLink"], res["dataLog"], res["paraType"]);
                        if (res["dataLog"] === "[Object object]" && enableDebug) console.log(res["snapshotVal"]);
                    }
                    else
                    {
                        var error = {
                            code: res["errorCode"],
                            message: res["errorMessage"]
                        }
                        self._HandleMyError(error, res["id"], "read")
                    }
                }
                else if (res["action"] === "AdvancedReadData" || res["action"] === "SimpleReadData")
                {
                    if (res["success"])
                    {
                        self.Read_C[res["id"]] = "";
                        self.myReadJSON[res["id"]] = "{}";
                        self.myReadPROUI[res["id"]] = "{}";
                        self.myReadARRAY[res["id"]] = "{}";
                        self._TriggerRead(TriggerString, res["id"], res["locationLink"], res["DataNew"], res["paraType"]);
                    }
                    else
                    {
                        var error = {
                            code: res["errorCode"],
                            message: res["errorMessage"]
                        }
                        self._HandleMyError(error, res["id"], "read");
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
                title: "FirebaseReadData",
                properties: [
                    //{name: ".current-animation",	value: this._currentAnimation.GetName(),	onedit: v => this.CallAction(Acts.SetAnim, v, 0) },
                ]
            }];
        }*/

        _GetWriteDataObject(keys, separator, data, enforceString)
        {
            keys = "'" + keys + "'";
            keys = keys.replace(/ /g, "");
            keys = keys.replace(/,/g, "','");
            keys = eval("[" + keys + "]");
            var n = keys.length;
            data = data.toString();
            data = data.replace(/\t/g, "\t");
            data = data.replace(/\\/g, "\\\\");
            data = data.replace(/'/g, "\\'");
            data = "'" + data + "'";
            data = data.replace(/\n/g, "\\n");
            data = data.replace(eval("/" + separator + "/g"), "','");
            data = eval("[" + data + "]");
            var SendData = {};
            for (var i = 0; i < n; i++)
            {
                if (!enforceString && isNaN(data[i]) == false && data[i].substring(0, 2) != "0x") data[i] = parseFloat(data[i]);
                SendData[keys[i]] = data[i];
            }
            return SendData;
        }


        _HandleMyError(err, id, type)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");

            this.onError = {};
            this.onErrorAt = {};

            this.ErrorCd = err.code;
            this.ErrorMsg = err.message;
            this.ErrorCdAt[type + id] = err.code;
            this.ErrorMsgAt[type + id] = err.message;

            if (enableDebug) console.error("ERROR REPORT - RD BASIC" + "\nsdkObject:" + this.sdkInsID + "\naction-category: " + type + "\nread-id: " + id + "\nerrorCode: " + this.ErrorCd + "\nerrorMessage: " + this.ErrorMsg);

            this.onError[type] = 1;
            this.onErrorAt[type + id] = 1;

            this._trigger(C3.Plugins.Sparsha_FirebaseRealtimeDatabase.Cnds.OnError);
            this._trigger(C3.Plugins.Sparsha_FirebaseRealtimeDatabase.Cnds.OnErrorAt);
            this.onError[type] = 0;
            this.onErrorAt[type + id] = 0;
        }



        _TriggerRead(category, id, loc, value, type)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            this.onNoExist_C[id] = 0;
            if (enableDebug && type != "noExist")
            {
                console.log("%cREAD SUCCESSFUL - RD BASIC" + "\nsdkObject:" + this.sdkInsID + "\ncategory:" + category + "\nread-id: " + id + "\nlocation: " + loc + "\ndata: " + value.Val + "\n ", 'color: #00a8a8');
            }
            if (type == "read")
            {
                this.Read_C[id] = value.valueOLD;
                this.myReadVal[id] = value.Val;
                this.myReadJSON[id] = value.JSON;
                this.myReadPROUI[id] = value.PROUI;
                this.myReadARRAY[id] = value.ARRAY;
            }
            if (type == "noExist")
            {
                if (enableDebug)
                {
                    console.log("%cREAD DATA DOES NOT EXIST - RD BASIC" + "\nsdkObject:" + this.sdkInsID + "\ncategory:" + category + "\nread-id: " + id + "\nlocation: " + loc + "\n ", 'color: #ff0000');
                }
                this.Read_C[id] = "";
                this.myReadVal[id] = "";
                this.myReadJSON[id] = "";
                this.myReadPROUI[id] = "";
                this.onNoExist_C[id] = 1;
            }
            this.onTrig_C[id] = 1;
            this._trigger(C3.Plugins.Sparsha_FirebaseRealtimeDatabase.Cnds.OnAdvTrigger);
            this.onTrig_C[id] = 0;

        }

        _TriggerWrite(category, id, loc, value)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");

            this.onWrite[id] = 1;
            if (enableDebug)
            {
                console.log("%cWRITE SUCCESSFUL - RD BASIC" + "\nsdkObject: " + this.sdkInsID + "\ncategory: " + category + "\nwrite-id: " + id + "\nlocation: " + loc + "\ndata: " + value + "\n ", 'color: #7463db');
            }
            this._trigger(C3.Plugins.Sparsha_FirebaseRealtimeDatabase.Cnds.OnWriteAction);
            this.onWrite[id] = 0;
        }

        _TriggerIncrement(category, id, loc, value)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");

            this.onIncre[id] = 1;
            if (enableDebug)
            {
                console.log("%cINCREMENT SUCCESSFUL - RD BASIC" + "\nsdkObject: " + this.sdkInsID + "\ncategory: " + category + "\nincrement-id: " + id + "\nlocation: " + loc + "\nvalue: " + value + "\n ", 'color: #7463db');
            }
            this._trigger(C3.Plugins.Sparsha_FirebaseRealtimeDatabase.Cnds.OnIncrement);
            this.onIncre[id] = 0;
        }

        _TriggerRemove(category, id, loc)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");

            this.onRemove[id] = 1;
            if (enableDebug)
            {
                console.log("%cREMOVE SUCCESSFUL - RD BASIC" + "\nsdkObject: " + this.sdkInsID + "\ncategory: " + category + "\nremove-id: " + id + "\nlocation: " + loc + "\n ", 'color: #7463db');
            }
            this._trigger(C3.Plugins.Sparsha_FirebaseRealtimeDatabase.Cnds.OnRemove);
            this.onRemove[id] = 0;
        }

    };
}