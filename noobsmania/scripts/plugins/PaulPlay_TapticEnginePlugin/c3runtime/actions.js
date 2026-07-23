"use strict";

{
    const PLUGIN_ID = "PaulPlay_TapticEnginePlugin";

    globalThis.C3.Plugins[PLUGIN_ID].Acts = {
        SelectionVibrate() {
            if (globalThis.TapticEngine) globalThis.TapticEngine.selection();
        },

        ImpactVibrate(impactStyle) {
            if (globalThis.TapticEngine) globalThis.TapticEngine.impact({ style: impactStyle });
        },

        VibrateNotification(vibrationType) {
            if (globalThis.TapticEngine) globalThis.TapticEngine.notification({ type: vibrationType });
        }
    };
}
