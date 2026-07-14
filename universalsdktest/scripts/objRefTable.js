const C3 = self.C3;
self.C3_GetObjectRefTable = function () {
	return [
		C3.Plugins.Button,
		C3.Plugins.Text,
		C3.Plugins.Dictionary,
		C3.Plugins.System.Cnds.IsGroupActive,
		C3.JavaScriptInEvents.E_game_Event2_Act1,
		C3.JavaScriptInEvents.E_game_Event3_Act1,
		C3.JavaScriptInEvents.E_game_Event4_Act1,
		C3.Plugins.System.Cnds.CompareVar,
		C3.Plugins.System.Acts.AddVar,
		C3.JavaScriptInEvents.E_game_Event7_Act1,
		C3.JavaScriptInEvents.E_game_Event8_Act1,
		C3.JavaScriptInEvents.E_game_Event11_Act1,
		C3.Plugins.Button.Cnds.OnClicked,
		C3.Plugins.Button.Cnds.HasTags,
		C3.JavaScriptInEvents.E_game_Event27_Act1,
		C3.JavaScriptInEvents.E_game_Event28_Act1,
		C3.JavaScriptInEvents.E_game_Event29_Act1,
		C3.JavaScriptInEvents.E_game_Event30_Act1,
		C3.JavaScriptInEvents.E_game_Event31_Act1,
		C3.JavaScriptInEvents.E_game_Event32_Act1,
		C3.JavaScriptInEvents.E_game_Event33_Act1,
		C3.JavaScriptInEvents.E_game_Event34_Act1,
		C3.JavaScriptInEvents.E_game_Event36_Act2,
		C3.JavaScriptInEvents.E_game_Event36_Act3,
		C3.JavaScriptInEvents.E_game_Event36_Act5,
		C3.JavaScriptInEvents.E_game_Event38_Act2,
		C3.JavaScriptInEvents.E_game_Event38_Act3,
		C3.JavaScriptInEvents.E_game_Event38_Act5,
		C3.JavaScriptInEvents.E_game_Event39_Act1,
		C3.JavaScriptInEvents.E_game_Event40_Act1,
		C3.JavaScriptInEvents.E_game_Event41_Act1,
		C3.JavaScriptInEvents.E_game_Event42_Act1,
		C3.JavaScriptInEvents.E_game_Event43_Act1,
		C3.JavaScriptInEvents.E_game_Event44_Act1,
		C3.JavaScriptInEvents.E_game_Event45_Act1,
		C3.JavaScriptInEvents.E_game_Event46_Act1,
		C3.JavaScriptInEvents.E_game_Event47_Act1,
		C3.JavaScriptInEvents.E_game_Event48_Act1,
		C3.JavaScriptInEvents.E_game_Event49_Act1,
		C3.JavaScriptInEvents.E_game_Event50_Act1,
		C3.Plugins.System.Cnds.OnLayoutStart,
		C3.JavaScriptInEvents.E_init_Event1_Act2,
		C3.JavaScriptInEvents.E_init_Event2_Act1,
		C3.Plugins.System.Acts.GoToLayout
	];
};
self.C3_JsPropNameTable = [
	{Button: 0},
	{TitleText: 0},
	{World: 0},
	{coins: 0},
	{level: 0},
	{playerName: 0},
	{tag: 0}
];

self.InstanceType = {
	Button: class extends self.IButtonInstance {},
	TitleText: class extends self.ITextInstance {},
	World: class extends self.IDictionaryInstance {}
}