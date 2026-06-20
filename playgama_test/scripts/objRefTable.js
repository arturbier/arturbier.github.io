const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Sprite,
		C3.Plugins.PlaygamaBridge,
		C3.Plugins.Text,
		C3.Plugins.System.Cnds.OnLayoutStart,
		C3.Plugins.PlaygamaBridge.Acts.ShowBanner,
		C3.Plugins.Text.Acts.SetText,
		C3.Plugins.PlaygamaBridge.Exps.PlayerName
	];
};
self.C3_JsPropNameTable = [
	{Sprite: 0},
	{PlaygamaBridge: 0},
	{Text: 0}
];

self.InstanceType = {
	Sprite: class extends self.ISpriteInstance {},
	PlaygamaBridge: class extends C3.Plugins.PlaygamaBridge.Instance {},
	Text: class extends self.ITextInstance {}
}