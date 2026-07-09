const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Button,
		C3.Plugins.EMI_INDO_sweetalert2,
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
		C3.Plugins.System.Cnds.OnLayoutStart,
		C3.JavaScriptInEvents.списоксобытий1_Event21_Act1,
		C3.Plugins.Button.Cnds.OnClicked,
		C3.Plugins.Button.Cnds.HasTags,
		C3.JavaScriptInEvents.списоксобытий1_Event23_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event24_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event25_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event26_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event27_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event28_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event29_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event30_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event31_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event32_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event33_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event34_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event35_Act1,
		C3.Plugins.Text.Cnds.HasTags,
		C3.Plugins.System.Acts.WaitForPreviousActions,
		C3.Plugins.Text.Acts.SetText,
		C3.JavaScriptInEvents.списоксобытий1_Event37_Act1
	];
};
self.C3_JsPropNameTable = [
	{Button: 0},
	{sweetalert2: 0},
	{debug: 0},
	{coins: 0},
	{playerName: 0}
];

self.InstanceType = {
	Button: class extends self.IButtonInstance {},
	sweetalert2: class extends C3.Plugins.EMI_INDO_sweetalert2.Instance {},
	debug: class extends self.ITextInstance {}
}