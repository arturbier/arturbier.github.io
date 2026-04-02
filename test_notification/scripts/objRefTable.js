const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Mouse,
		C3.Plugins.Touch,
		C3.Plugins.Touch.Cnds.OnTouchStart,
		C3.JavaScriptInEvents.EventSheet1_Event1_Act1
	];
};
self.C3_JsPropNameTable = [
	{Mouse: 0},
	{Touch: 0}
];

self.InstanceType = {
	Mouse: class extends self.IInstance {},
	Touch: class extends self.IInstance {}
}