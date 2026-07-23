"use strict";
{
    globalThis.C3.Plugins.PaulPlay_TapticEnginePlugin.Instance = class HapticEnginePluginInstance extends globalThis.ISDKInstanceBase {
        constructor() {
            super();
        }

        _release() {
            super.Release();
        }

        _saveToJson() {
            return {};
        }

        _getDebuggerProperties() {
            return [
                {
                    title: "HapticEnginePlugin",
                    properties: []
                }];
        }
    };
}