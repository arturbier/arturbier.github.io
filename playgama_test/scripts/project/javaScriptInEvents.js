

const scriptsInEvents = {

	async Egame_Event12_Act2(runtime, localVars)
	{
		clearBoard()
	},

	async Egame_Event14_Act5(runtime, localVars)
	{
		addRow(
		  localVars.name,
		  localVars.score,
		  localVars.gems,
		  localVars.avatar, 
		  localVars.index
		);
	},

	async Egame_Event16(runtime, localVars)
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

	async Egame_Event17(runtime, localVars)
	{
window.meFirst = false;
window.myPlayerName = "";

window.openLeaderboard = function (meFirst = false, myPlayerName = "") {

  window.meFirst = meFirst;

  window.myPlayerName = myPlayerName;

  const el = document.querySelector(".leaderboard-wrapper");

  const overlay = document.querySelector(".leaderboard-overlay");

  if (!el) return;

  if (overlay) {

    overlay.classList.add("show");

  }

  requestAnimationFrame(() => {

    el.classList.add("show");

  });

};

window.closeLeaderboard = function () {

  const el = document.querySelector(".leaderboard-wrapper");

  const overlay = document.querySelector(".leaderboard-overlay");

  if (el) {

    el.classList.remove("show");

  }

  if (overlay) {

    overlay.classList.remove("show");

  }

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
  const isMe =
    window.meFirst &&
    name === window.myPlayerName;

  if (isTop1)
    row.classList.add("top1");

  let badge = "";

  if (rank === 0) {
    badge = "👑";
  }
  else if (rank === 1) {
    badge = "🥈";
  }
  else if (rank === 2) {
    badge = "🥉";
  }
  else {
    badge = `${rank + 1}.`;
  }

  row.innerHTML = `
    <span class="player-cell">

      <span class="rank-badge">${badge}</span>

      <img
        class="avatar"
        src="${avatarUrl}"
        onerror="this.src='https://via.placeholder.com/64'"
      >

      <span class="${isTop1 ? "name-top1" : ""}">
        ${name}
      </span>

    </span>

    <span>${score}</span>

    <span>${gems}</span>
  `;

  if (isMe) {

    row.classList.add("my-row");

    rows.prepend(row);

  } else {

    rows.appendChild(row);

  }
};
	},

	async Egame_Event14_Act6(runtime, localVars)
	{
		openLeaderboard(true, runtime.globalVars.playerID);
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
