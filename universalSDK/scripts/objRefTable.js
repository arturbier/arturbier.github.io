const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Button,
		C3.Plugins.System.Cnds.OnLayoutStart,
		C3.JavaScriptInEvents.списоксобытий1_Event1_Act1,
		C3.Plugins.Button.Cnds.OnClicked,
		C3.Plugins.Button.Cnds.HasTags,
		C3.JavaScriptInEvents.списоксобытий1_Event3_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event4_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event5_Act1,
		C3.JavaScriptInEvents.списоксобытий1_Event6_Act1
	];
};
self.C3_JsPropNameTable = [
	{Button: 0}
];

self.InstanceType = {
	Button: class extends self.IButtonInstance {}
}