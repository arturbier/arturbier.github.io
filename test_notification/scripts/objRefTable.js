const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Mouse,
		C3.Plugins.Mouse.Cnds.OnClick,
		C3.JavaScriptInEvents.EventSheet1_Event1_Act1
	];
};
self.C3_JsPropNameTable = [
	{Mouse: 0}
];

self.InstanceType = {
	Mouse: class extends self.IInstance {}
}