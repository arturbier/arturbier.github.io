const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Text,
		C3.Plugins.HTMLElement,
		C3.Behaviors.Anchor,
		C3.Plugins.System.Cnds.OnLayoutStart,
		C3.JavaScriptInEvents.списоксобытий1_Event1_Act1
	];
};
self.C3_JsPropNameTable = [
	{Text: 0},
	{Anchor: 0},
	{HTMLElement: 0}
];

self.InstanceType = {
	Text: class extends self.ITextInstance {},
	HTMLElement: class extends self.IHTMLElementInstance {}
}