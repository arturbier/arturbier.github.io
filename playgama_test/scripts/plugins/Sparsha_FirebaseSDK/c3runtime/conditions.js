"use strict";
{
    globalThis.C3.Plugins.Sparsha_FirebaseSDK.Cnds = {
        Isloadedfb()
        {
            if (this.C3f_SD) return true;
            else return false;
        },

        OnLoaded()
        {
            return true;
        },

        OnTimeout()
        {
            return true;
        },

        OnDisconnect()
        {
            return true;
        },

        OnReconnect()
        {
            return true;
        }
    };
}