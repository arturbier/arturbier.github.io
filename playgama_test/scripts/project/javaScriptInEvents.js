

const scriptsInEvents = {

	async Egame_Event1_Act1(runtime, localVars)
	{
		const today = new Date().toISOString().split("T")[0];
		runtime.globalVars.todayDate = today;
		
		const lastDate = runtime.globalVars.lastResetDate;
		if (lastDate && lastDate !== today) {
		  // Дата сменилась — дневная таблица авто-сбрасывается через новый ключ
		}
		runtime.globalVars.lastResetDate = today;
	},

	async Egame_Event9_Act2(runtime, localVars)
	{
		clearBoard()
	},

	async Egame_Event11_Act6(runtime, localVars)
	{
		addRow(
		  localVars.name,
		  localVars.score,
		  localVars.gems,
		  localVars.avatar, 
		  localVars.pid,
		  localVars.index
		);
	},

	async Egame_Event11_Act7(runtime, localVars)
	{
		openLeaderboard(true, runtime.globalVars.playerID);
	},

	async Egame_Event13_Act2(runtime, localVars)
	{
		clearBoard()
	},

	async Egame_Event15_Act6(runtime, localVars)
	{
		addRow(
		  localVars.name,
		  localVars.score,
		  localVars.gems,
		  localVars.avatar, 
		  localVars.pid,
		  localVars.index
		);
	},

	async Egame_Event15_Act7(runtime, localVars)
	{
		openLeaderboard(true, runtime.globalVars.playerID);
	},

	async Egame_Event18(runtime, localVars)
	{
window.meFirst = false;
window.myPlayerID = "";

window.openLeaderboard = function (meFirst = false, myPlayerID = "") {

  window.meFirst = meFirst;

  window.myPlayerID = myPlayerID;

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

window.addRow = function (name, score, gems, avatarUrl, rank, pid) {

  const rows = document.querySelector(".rows");
  if (!rows) return;

  const row = document.createElement("div");
  row.className = "row";

  const isTop1 = rank === 0;
  const isMe =
    window.meFirst &&
    pid === window.myPlayerID;

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
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
