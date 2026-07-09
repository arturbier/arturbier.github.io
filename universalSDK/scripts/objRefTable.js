const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Button,
		C3.Plugins.Text,
		C3.Plugins.System.Cnds.IsGroupActive,
		C3.JavaScriptInEvents.списоксобытий1_Event2_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event3_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event4_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event5_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event6_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event7_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event8_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event11_Act1,
		C3.Plugins.Text.Cnds.HasTags,
		C3.Plugins.Text.Acts.SetText,
		C3.Plugins.System.Exps.projectversion,
		C3.Plugins.System.Cnds.OnLayoutStart,
		C3.JavaScriptInEvents.списоксобытий1_Event26_Act1,
		C3.Plugins.Button.Cnds.OnClicked,
		C3.Plugins.Button.Cnds.HasTags,
		C3.JavaScriptInEvents.списоксобытий1_Event28_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event29_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event30_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event31_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event32_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event33_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event34_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event35_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event36_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event37_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event38_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event39_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event40_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event41_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event42_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event43_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event44_Act1
	];
};
self.C3_JsPropNameTable = [
	{Button: 0},
	{debug: 0},
	{coins: 0},
	{playerName: 0}
];

self.InstanceType = {
	Button: class extends self.IButtonInstance {},
	debug: class extends self.ITextInstance {}
}