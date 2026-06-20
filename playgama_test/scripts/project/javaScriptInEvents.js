

const scriptsInEvents = {

	async Egame_Event1_Act4(runtime, localVars)
	{
		function updateOrientation() {
		  const el = document.querySelector('.leaderboard-wrapper');
		  if (!el) return;
		
		  if (window.innerWidth > window.innerHeight) {
		    el.classList.add('landscape');
		  } else {
		    el.classList.remove('landscape');
		  }
		}
		
		updateOrientation();
		window.addEventListener('resize', updateOrientation);
		window.addEventListener('orientationchange', updateOrientation);
	},

	async Egame_Event7_Act2(runtime, localVars)
	{
		clearBoard()
	},

	async Egame_Event9_Act5(runtime, localVars)
	{
		addRow(
		  localVars.name,
		  localVars.score,
		  localVars.gems,
		  localVars.avatar, 
		  localVars.index
		);
	},

	async Egame_Event9_Act6(runtime, localVars)
	{
		openLeaderboard();
	},

	async Egame_Event11(runtime, localVars)
	{
window.clearBoard = function() {
  let board = document.querySelector('.leaderboard');
  if (!board) return;

  board.innerHTML = `
    <div class='header'>
      <span>Игрок</span>
      <span>Очки</span>
      <span>Тип</span>
    </div>`;
};

window.addRow = function(name, score, gems) {
  let board = document.querySelector('.leaderboard');
  if (!board) return;

  let row = document.createElement('div');
  row.className = 'row';

  row.innerHTML = `
    <span class='name'>${name}</span>
    <span class='score'>${score}</span>
    <span class='gems'>${gems}</span>`;

  board.appendChild(row);
};
	},

	async Egame_Event12(runtime, localVars)
	{
window.openLeaderboard = function () {
  const el = document.querySelector(".leaderboard-wrapper");
  if (!el) return;

  requestAnimationFrame(() => {
    el.classList.add("show");
  });
};

window.closeLeaderboard = function () {
  const el = document.querySelector(".leaderboard-wrapper");
  if (!el) return;

  el.classList.remove("show");
};

window.clearBoard = function () {
  const rows = document.querySelector(".rows");
  if (rows) rows.innerHTML = "";
};

window.openLeaderboard = function () {
  const el = document.querySelector(".leaderboard-wrapper");
  if (!el) return;

  requestAnimationFrame(() => {
    el.classList.add("show");
  });
};

window.closeLeaderboard = function () {
  const el = document.querySelector(".leaderboard-wrapper");
  if (!el) return;

  el.classList.remove("show");
};

window.clearBoard = function () {
  const rows = document.querySelector(".rows");
  if (rows) rows.innerHTML = "";
};

window.addRow = function (name, score, gems, avatarUrl, rank) {

  const rows = document.querySelector(".rows");

  if (!rows) return;

  const row = document.createElement("div");

  row.className = "row";

  const isTop1 = rank === 0;

  if (isTop1) row.classList.add("top1");

  let badge = "";

  if (rank === 0) badge = "👑";

  else if (rank === 1) badge = "🥈";

  else if (rank === 2) badge = "🥉";

  row.innerHTML = `

    <span class="player-cell">

      <span class="rank-badge">${badge}</span>

      <img class="avatar" src="${avatarUrl}">

      <span class="${isTop1 ? "name-top1" : ""}">${name}</span>

    </span>

    <span>${score}</span>

    <span>${gems}</span>

  `;

  rows.appendChild(row);

};
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
