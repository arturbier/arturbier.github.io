"use strict";
{
    globalThis.C3.Plugins.Sparsha_FirebaseRealtimeDatabase.Exps = {
        readLeaderboard(id, key, index)
        {
            if (this.Read_C[id] != undefined)
            {
                if (this.Read_C[id][key + index] != undefined) return this.Read_C[id][key + index];
                else return ""
            }
            else return "";
        },

        readRank(id)
        {
            if (this.Rank_C[id] != undefined) return this.Rank_C[id];
            else return 0;
        },

        readValue(id)
        {
            if (this.myReadVal[id] != undefined) return this.myReadVal[id];
            else return "";
        },

        readJSON(id)
        {
            if (this.myReadJSON[id] != undefined) return this.myReadJSON[id];
            else return "{}";
        },

        readGridview(id)
        {
            if (this.myReadPROUI[id] != undefined) return this.myReadPROUI[id];
            else return "{}";
        },

        readArrayJSON(id)
        {
            if (this.myReadARRAY[id] != undefined) return this.myReadARRAY[id];
            else return "{}";
        },

        readData(id)
        {
            if (this.Read_C[id] != undefined) return this.Read_C[id];
            else return "";
        },

        errorMessage()
        {
            return this.ErrorMsg;
        },

        errorCode()
        {
            return this.ErrorCd;
        },

        errorMessageAt(type, id)
        {
            if (this.ErrorMsgAt[type + id] != undefined) return this.ErrorMsgAt[type + id];
            else return "";
        },

        errorCodeAt(type, id)
        {
            if (this.ErrorCdAt[type + id] != undefined) return this.ErrorCdAt[type + id];
            else return "";
        }
    };
}