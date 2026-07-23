

const scriptsInEvents = {

	async E_game_Event8_Act1(runtime, localVars)
	{
		usdk.leaderboard.submitScore(runtime.globalVars.clicks);
	},

	async E_game_Event14_Act1(runtime, localVars)
	{
		usdk.showRewarded("booster");
	},

	async E_game_Event18_Act1(runtime, localVars)
	{
		usdk.showInterstitial();
	},

	async E_game_Event24_Act1(runtime, localVars)
	{
		usdk.inviteFriends({ text: "давай зарабатывать вместе на героев игры"&" НУБИК - МАНИЯ" });
	},

	async E_sharacter_selection_Event1_Act1(runtime, localVars)
	{
		usdk.showInterstitial();
	},

	async E_menu_Event1_Act9(runtime, localVars)
	{
		usdk.showBanner("bottom");
	},

	async E_menu_Event5_Act1(runtime, localVars)
	{

	},

	async E_menu_Event7_Act1(runtime, localVars)
	{
		usdk.inviteFriends({ text: "давай зарабатывать вместе на героев игры"&" НУБИК - МАНИЯ" });
	},

	async E_menu_Event8_Act1(runtime, localVars)
	{
		usdk.leaderboard.show("НУБОЛИДЕРЫ", "КЛИКИ", 10, true);
	},

	async E_info_Event2_Act1(runtime, localVars)
	{
		usdk.joinCommunity();
	},

	async E_bg_selection_Event1_Act1(runtime, localVars)
	{
		usdk.showInterstitial();
	},

	async Chat_Event1_Act2(runtime, localVars)
	{
		usdk.fetchChat(10,false);
	},

	async Chat_Event4_Act1(runtime, localVars)
	{
		usdk.fetchChat(10,false);
	},

	async Chat_Event6_Act1(runtime, localVars)
	{
		usdk.openChat("НИБИКОЧАТ",10,false);
	},

	async Bonus_Event7_Act2(runtime, localVars)
	{
		usdk.addToFavorites();
	},

	async Storage_Event1_Act1(runtime, localVars)
	{
		saveDict("ads"); //словарь
	},

	async Storage_Event2_Act1(runtime, localVars)
	{
		loadDict("ads");
	},

	async Achievements_Event7_Act1(runtime, localVars)
	{
		confetti.start(3000)
	},

	async Achievements_Event8_Act1(runtime, localVars)
	{
		confetti({
		  particleCount: 100,
		  spread: 70,
		  origin: { y: 0.6 }
		});
	},

	async Achievements_Event9_Act1(runtime, localVars)
	{
		function randomInRange(min, max) {
		  return Math.random() * (max - min) + min;
		}
		
		confetti({
		  angle: randomInRange(55, 125),
		  spread: randomInRange(50, 70),
		  particleCount: randomInRange(50, 100),
		  origin: { y: 0.6 }
		});
	},

	async Achievements_Event10_Act1(runtime, localVars)
	{
		var count = 200;
		var defaults = {
		  origin: { y: 0.7 }
		};
		
		function fire(particleRatio, opts) {
		  confetti(Object.assign({}, defaults, opts, {
		    particleCount: Math.floor(count * particleRatio)
		  }));
		}
		
		fire(0.25, {
		  spread: 26,
		  startVelocity: 55,
		});
		fire(0.2, {
		  spread: 60,
		});
		fire(0.35, {
		  spread: 100,
		  decay: 0.91,
		  scalar: 0.8
		});
		fire(0.1, {
		  spread: 120,
		  startVelocity: 25,
		  decay: 0.92,
		  scalar: 1.2
		});
		fire(0.1, {
		  spread: 120,
		  startVelocity: 45,
		});
	},

	async Achievements_Event11_Act1(runtime, localVars)
	{
		var duration = 15 * 1000;
		var animationEnd = Date.now() + duration;
		var defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };
		
		function randomInRange(min, max) {
		  return Math.random() * (max - min) + min;
		}
		
		var interval = setInterval(function() {
		  var timeLeft = animationEnd - Date.now();
		
		  if (timeLeft <= 0) {
		    return clearInterval(interval);
		  }
		
		  var particleCount = 50 * (timeLeft / duration);
		  // since particles fall down, start a bit higher than random
		  confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 } }));
		  confetti(Object.assign({}, defaults, { particleCount, origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 } }));
		}, 250);
	},

	async Achievements_Event12_Act1(runtime, localVars)
	{
		var duration = 15 * 1000;
		var animationEnd = Date.now() + duration;
		var skew = 1;
		
		function randomInRange(min, max) {
		  return Math.random() * (max - min) + min;
		}
		
		(function frame() {
		  var timeLeft = animationEnd - Date.now();
		  var ticks = Math.max(200, 500 * (timeLeft / duration));
		  skew = Math.max(0.8, skew - 0.001);
		
		  confetti({
		    particleCount: 1,
		    startVelocity: 0,
		    ticks: ticks,
		    origin: {
		      x: Math.random(),
		      // since particles fall down, skew start toward the top
		      y: (Math.random() * skew) - 0.2
		    },
		    colors: ['#ffffff'],
		    shapes: ['circle'],
		    gravity: randomInRange(0.4, 0.6),
		    scalar: randomInRange(0.4, 1),
		    drift: randomInRange(-0.4, 0.4)
		  });
		
		  if (timeLeft > 0) {
		    requestAnimationFrame(frame);
		  }
		}());
	},

	async Achievements_Event13_Act1(runtime, localVars)
	{
		var end = Date.now() + (1 * 1000);
		
		// go Buckeyes!
		var colors = ['#3cd037', '#ffffff'];
		
		(function frame() {
		  confetti({
		    particleCount: 2,
		    angle: 60,
		    spread: 55,
		    origin: { x: 0 },
		    colors: colors
		  });
		  confetti({
		    particleCount: 2,
		    angle: 120,
		    spread: 55,
		    origin: { x: 1 },
		    colors: colors
		  });
		
		  if (Date.now() < end) {
		    requestAnimationFrame(frame);
		  }
		}());
	},

	async Achievements_Event14_Act1(runtime, localVars)
	{
		var canvas = document.getElementById('my-canvas');
		
		// you should  only initialize a canvas once, so save this function
		// we'll save it to the canvas itself for the purpose of this demo
		canvas.confetti = canvas.confetti || confetti.create(canvas, { resize: true });
		
		canvas.confetti({
		  spread: 70,
		  origin: { y: 1.2 }
		});
	},

	async E_init_Event1_Act1(runtime, localVars)
	{
		usdkInit("nx6woHMInN3n8GcxdMVb", "b242fc5a00c33a37d1982872b0c82271");
	},

	async E_init_Event4_Act1(runtime, localVars)
	{

	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
