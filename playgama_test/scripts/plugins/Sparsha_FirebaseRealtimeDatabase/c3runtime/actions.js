"use strict";
{
    globalThis.C3.Plugins.Sparsha_FirebaseRealtimeDatabase.Acts = {
        async AdvancedReadData(locationLink, id, sync, readJSON, readArray, readProui)
        {
            var options_DOM = {
                "action": "AdvancedReadData",
                "sdkName": this.sdkInsID,
                "uid": this.uid,
                "locationLink": locationLink,
                "id": id,
                "sync": sync,
                "readJSON": readJSON,
                "readArray": readArray,
                "readProui": readProui,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fRD", options_DOM);
            if (res["success"])
            {
                this.Read_C[id] = "";
                this.myReadJSON[id] = "{}";
                this.myReadPROUI[id] = "{}";
                this.myReadARRAY[id] = "{}";
                if (!sync) this._TriggerRead("Custom-Data", id, locationLink, res["DataNew"], res["paraType"]);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleMyError(error, id, "read")
            }
        },

        async AdvancedReadLeaderboard(locationLink, orderChild, size, id, sync, rankKey, rankData, readJSON, readProui)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var options_DOM = {
                "action": "AdvancedReadLeaderboard",
                "sdkName": this.sdkInsID,
                "uid": this.uid,
                "locationLink": locationLink,
                "orderChild": orderChild,
                "size": size,
                "id": id,
                "sync": sync,
                "rankKey": rankKey,
                "rankData": rankData,
                "readJSON": readJSON,
                "readProui": readProui,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fRD", options_DOM);
            if (res["success"])
            {
                this.Read_C[id] = res["Read_C"];
                this.myReadJSON[id] = res["myReadJSON"];
                this.myReadPROUI[id] = res["myReadPROUI"];
                this.myReadARRAY[id] = res["myReadARRAY"];
                this.Rank_C[id] = res["Rank_C"];
                if (!sync)
                {
                    this._TriggerRead("Custom-Leaderboard", id, locationLink, res["dataLog"], res["paraType"]);
                    if (res["dataLog"] === "[Object object]" && enableDebug) console.log(res["snapshotVal"]);
                }
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleMyError(error, id, "read")
            }
        },

        async SimpleReadData(Key, id, sync, readJSON, readProui)
        {
            var myUID = this.SDKobject.sparshaFirebase._get("authExpBasic")["myUID"];
            var locationLink = this.locUserData + "/" + myUID + "/" + Key;
            var options_DOM = {
                "action": "SimpleReadData",
                "sdkName": this.sdkInsID,
                "uid": this.uid,
                "locationLink": locationLink,
                "id": id,
                "sync": sync,
                "readJSON": readJSON,
                "readArray": false,
                "readProui": readProui,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fRD", options_DOM);
            if (res["success"])
            {
                this.Read_C[id] = "";
                this.myReadJSON[id] = "{}";
                this.myReadPROUI[id] = "{}";
                this.myReadARRAY[id] = "{}";
                if (!sync) this._TriggerRead("User Account-Data", id, locationLink, res["DataNew"], res["paraType"]);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleMyError(error, id, "read")
            }
        },

        async SimpleReadLeaderboard(orderChild, size, id, sync, readJSON, readProui)
        {
            var enableDebug = this.SDKobject.sparshaFirebase._get("enableDebug");
            var myUID = this.SDKobject.sparshaFirebase._get("authExpBasic")["myUID"];
            var locationLink = this.locUserLB;
            var options_DOM = {
                "action": "SimpleReadLeaderboard",
                "sdkName": this.sdkInsID,
                "uid": this.uid,
                "locationLink": locationLink,
                "orderChild": orderChild,
                "size": size,
                "id": id,
                "sync": sync,
                "rankKey": "userID",
                "rankData": myUID,
                "readJSON": readJSON,
                "readProui": readProui,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fRD", options_DOM);
            if (res["success"])
            {
                this.Read_C[id] = res["Read_C"];
                this.myReadJSON[id] = res["myReadJSON"];
                this.myReadPROUI[id] = res["myReadPROUI"];
                this.myReadARRAY[id] = res["myReadARRAY"];
                this.Rank_C[id] = res["Rank_C"];
                if (!sync)
                {
                    this._TriggerRead("User Account-Leaderboard", id, locationLink, res["dataLog"], res["paraType"]);
                    if (res["dataLog"] === "[Object object]" && enableDebug) console.log(res["snapshotVal"]);
                }
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleMyError(error, id, "read")
            }
        },

        async AdvancedWriteData(locationLink, data, id)
        {
            var options_DOM = {
                "action": "AdvancedWriteData",
                "sdkName": this.sdkInsID,
                "locationLink": locationLink,
                "data": data
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fRD", options_DOM);
            if (res["success"])
            {
                this._TriggerWrite("Custom-Data", id, locationLink, data)
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleMyError(error, id, "write")
            }
        },

        async AdvancedWriteLeaderboard(locationLink, key, separator, data, enforceString, id)
        {
            var options_DOM = {
                "action": "AdvancedWriteLeaderboard",
                "sdkName": this.sdkInsID,
                "locationLink": locationLink,
                "dataObj": this._GetWriteDataObject(key, separator, data, enforceString),
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fRD", options_DOM);
            if (res["success"])
            {
                this._TriggerWrite("Custom", id, locationLink + '/' + key, data)
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleMyError(error, id, "write")
            }
        },

        async SimpleWriteData(key, separator, data, enforceString, id)
        {
            var myUID = this.SDKobject.sparshaFirebase._get("authExpBasic")["myUID"];
            var options_DOM = {
                "action": "SimpleWriteData",
                "sdkName": this.sdkInsID,
                "myUID": myUID,
                "locUserData": this.locUserData,
                "dataObj": this._GetWriteDataObject(key, separator, data, enforceString),
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fRD", options_DOM);
            if (res["success"])
            {
                this._TriggerWrite("User Account-Data", id, this.locUserData + "/" + myUID + '/' + key, data)
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleMyError(error, id, "write")
            }
        },

        async SimpleWriteLeaderboard(key, separator, data, enforceString, id)
        {
            var myUID = this.SDKobject.sparshaFirebase._get("authExpBasic")["myUID"];
            var options_DOM = {
                "action": "SimpleWriteLeaderboard",
                "sdkName": this.sdkInsID,
                "myUID": myUID,
                "locUserLB": this.locUserLB,
                "dataObj": this._GetWriteDataObject(key, separator, data, enforceString),
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fRD", options_DOM);
            if (res["success"])
            {
                this._TriggerWrite("User Account-Leaderboard", id, this.locUserLB + "/" + myUID + '/' + key, data);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleMyError(error, id, "write")
            }
        },

        async RemoveData(locationLink, id)
        {
            var options_DOM = {
                "action": "RemoveData",
                "sdkName": this.sdkInsID,
                "locationLink": locationLink,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fRD", options_DOM);
            if (res["success"])
            {
                this._TriggerRemove("Custom-Remove", id, locationLink)
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleMyError(error, id, "remove")
            }
        },

        async SimpleRemove(key, id)
        {
            var myUID = this.SDKobject.sparshaFirebase._get("authExpBasic")["myUID"];
            var locationLink = this.locUserData + "/" + myUID + '/' + key + '/';
            var options_DOM = {
                "action": "SimpleRemove",
                "sdkName": this.sdkInsID,
                "locationLink": locationLink,
                "locUserLB": this.locUserLB,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fRD", options_DOM);
            if (res["success"])
            {
                this._TriggerRemove("User Account-Remove", id, locationLink);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleMyError(error, id, "remove")
            }
        },

        async AdvancedIncrement(locationLink, data, id)
        {
            var options_DOM = {
                "action": "AdvancedIncrement",
                "sdkName": this.sdkInsID,
                "locationLink": locationLink,
                "data": data,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fRD", options_DOM);
            if (res["success"])
            {
                this._TriggerIncrement("Custom-Increment", id, locationLink, data);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleMyError(error, id, "increment")
            }
        },

        async SimpleIncrement(key, data, id)
        {
            var myUID = this.SDKobject.sparshaFirebase._get("authExpBasic")["myUID"];
            var locationLink = this.locUserData + "/" + myUID + '/' + key + '/';
            var options_DOM = {
                "action": "SimpleIncrement",
                "sdkName": this.sdkInsID,
                "locationLink": locationLink,
                "data": data,
                "locUserLB": this.locUserLB,
                "myUID": myUID,
            };
            var res = await this._postToDOMAsync("domAsync_sparsha_fRD", options_DOM);
            if (res["success"])
            {
                this._TriggerIncrement("User Account-Increment", id, locationLink, data);
            }
            else
            {
                var error = {
                    code: res["errorCode"],
                    message: res["errorMessage"]
                }
                this._HandleMyError(error, id, "increment")
            }
        },

        GoOffline()
        {
            var options_DOM = {
                "action": "GoOffline",
                "sdkName": this.sdkInsID
            };
            this._postToDOM("domSync_sparsha_fRD", options_DOM);
            console.log("%cDATABASE OFFLINE - RD BASIC" + "\nsdkObject:" + this.sdkInsID, 'color: #ff0000');
        },

        GoOnline()
        {
            var options_DOM = {
                "action": "GoOnline",
                "sdkName": this.sdkInsID
            };
            this._postToDOM("domSync_sparsha_fRD", options_DOM);
            console.log("%cDATABASE ONLINE - RD BASIC" + "\nsdkObject:" + this.sdkInsID, 'color: #b1d930');
        }
    };
}