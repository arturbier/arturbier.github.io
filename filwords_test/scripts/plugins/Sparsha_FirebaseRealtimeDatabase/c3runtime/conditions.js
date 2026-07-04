"use strict";
{
    globalThis.C3.Plugins.Sparsha_FirebaseRealtimeDatabase.Cnds = {
        OnAdvRead(id)
        {
            return false;
        },

        OnAdvNoexist(id)
        {
            return false;
        },

        OnAdvTrigger(id)
        {
            if (typeof this.onTrig_C[id] != "undefined")
            {
                if (this.onTrig_C[id] == 1)
                {
                    return true;
                }
                else return false;
            }
            else return false;
        },

        OnWriteAction(id)
        {
            if (typeof this.onWrite[id] != "undefined")
            {
                if (this.onWrite[id] == 1)
                {
                    return true;
                }
                else return false;
            }
            else return false;
        },

        OnRemove(id)
        {
            if (typeof this.onRemove[id] != "undefined")
            {
                if (this.onRemove[id] == 1)
                {
                    return true;
                }
                else return false;
            }
            else return false;
        },

        OnIncrement(id)
        {
            if (typeof this.onIncre[id] != "undefined")
            {
                if (this.onIncre[id] == 1)
                {
                    return true;
                }
                else return false;
            }
            else return false;
        },

        OnError(type)
        {
            var typeName;
            if (type == 0) typeName = "read";
            if (type == 1) typeName = "write";
            if (type == 2) typeName = "increment";
            if (type == 3) typeName = "remove";
            if (typeof this.onError[typeName] != "undefined")
            {
                if (this.onError[typeName] == 1)
                {
                    return true;
                }
                else return false;
            }
            else return false;
        },

        OnErrorAt(type, id)
        {
            var typeName;
            if (type == 0) typeName = "read";
            if (type == 1) typeName = "write";
            if (type == 2) typeName = "increment";
            if (type == 3) typeName = "remove";
            if (typeof this.onErrorAt[typeName + id] != "undefined")
            {
                if (this.onErrorAt[typeName + id] == 1)
                {
                    return true;
                }
                else return false;
            }
            else return false;
        },

        IsAdvNoexist2(id)
        {
            if (typeof this.onNoExist_C[id] != "undefined")
            {
                if (this.onNoExist_C[id] == 1)
                {
                    return false;
                }
                else return true;
            }
            else return false;
        }
    };
}