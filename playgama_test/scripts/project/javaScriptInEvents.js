

const scriptsInEvents = {

	async Egame_Event1_Act1(runtime, localVars)
	{
		const today = new Date().toISOString().split("T")[0];
		runtime.globalVars.todayDate = today;
		
		const lastDate = localStorage.getItem("ldr_date") || "";
		runtime.globalVars.oldResetDate = lastDate;
		localStorage.setItem("ldr_date", today);
	},

	async Egame_Event12_Act2(runtime, localVars)
	{
		clearBoard()
	},

	async Egame_Event14_Act6(runtime, localVars)
	{
		addRow(
		  localVars.name,
		  localVars.score,
		  localVars.gems,
		  localVars.avatar, 
		  localVars.index,
		  localVars.pid
		);
	},

	async Egame_Event16_Act1(runtime, localVars)
	{
		openLeaderboard(true, runtime.globalVars.playerID, runtime.globalVars.CurrentName);
	},

	async Egame_Event17_Act2(runtime, localVars)
	{
		clearBoard()
	},

	async Egame_Event19_Act6(runtime, localVars)
	{
		addRow(
		  localVars.name,
		  localVars.score,
		  localVars.gems,
		  localVars.avatar, 
		  localVars.index,
		  localVars.pid
		);
	},

	async Egame_Event21_Act1(runtime, localVars)
	{
		openLeaderboard(true, runtime.globalVars.playerID, runtime.globalVars.CurrentName);
	},

	async Egame_Event25(runtime, localVars)
	{
window.meFirst = false;
window.myPlayerID = "";
window.myPlayerName = "";

window.openLeaderboard = function (meFirst = false, myPlayerID = "", myPlayerName = "") {

  window.meFirst = meFirst;

  window.myPlayerID = myPlayerID;

  window.myPlayerName = myPlayerName;

  const el = document.querySelector(".leaderboard-wrapper");

  const overlay = document.querySelector(".leaderboard-overlay");

  if (!el) return;

  if (overlay) {

    overlay.classList.add("show");

  }

  requestAnimationFrame(() => {

    el.classList.add("show");
    setTimeout(window.initPullToRefresh, 100);

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
    (pid === window.myPlayerID || name === window.myPlayerName);

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

// ===== Pull-to-Refresh =====
window._pullStartY = 0;
window._pullDist = 0;
window._pulling = false;

window.initPullToRefresh = function() {
  const wrapper = document.getElementById("lb-wrapper");
  const rows = document.querySelector(".rows");
  if (!wrapper || !rows) return;

  wrapper.addEventListener("touchstart", function(e) {
    if (rows.scrollTop <= 1) {
      window._pullStartY = e.touches[0].clientY;
      window._pulling = true;
    }
  }, {passive: false});

  wrapper.addEventListener("mousedown", function(e) {
    if (rows.scrollTop <= 1) {
      window._pullStartY = e.clientY;
      window._pulling = true;
    }
  });

  wrapper.addEventListener("touchmove", function(e) {
    if (!window._pulling) return;
    window._pullDist = e.touches[0].clientY - window._pullStartY;
    if (window._pullDist > 0 && rows.scrollTop <= 1) {
      const ind = document.getElementById("pull-indicator");
      if (ind) {
        const h = Math.min(window._pullDist * 0.5, 80);
        ind.style.height = h + "px";
        ind.style.opacity = h / 80;
        if (h >= 70) ind.querySelector(".pull-icon").textContent = "⬆";
        else ind.querySelector(".pull-icon").textContent = "⬇";
      }
    }
  }, {passive: false});

  window.addEventListener("mousemove", function(e) {
    if (!window._pulling) return;
    window._pullDist = e.clientY - window._pullStartY;
    if (window._pullDist > 0 && rows.scrollTop <= 1) {
      const ind = document.getElementById("pull-indicator");
      if (ind) {
        const h = Math.min(window._pullDist * 0.5, 80);
        ind.style.height = h + "px";
        ind.style.opacity = h / 80;
        if (h >= 70) ind.querySelector(".pull-icon").textContent = "⬆";
        else ind.querySelector(".pull-icon").textContent = "⬇";
      }
    }
  });

  wrapper.addEventListener("touchend", function() {
    if (!window._pulling) return;
    window._pulling = false;
    const ind = document.getElementById("pull-indicator");
    if (window._pullDist > 70 && rows.scrollTop <= 1) {
      if (ind) ind.querySelector(".pull-text").textContent = "Обновление...";
      runtime.globalVars.refreshFlag = 1;
    }
    if (ind) {
      ind.style.height = "0px";
      ind.style.opacity = "0";
    }
    window._pullDist = 0;
  });

  window.addEventListener("mouseup", function() {
    if (!window._pulling) return;
    window._pulling = false;
    const ind = document.getElementById("pull-indicator");
    if (window._pullDist > 70 && rows.scrollTop <= 1) {
      if (ind) ind.querySelector(".pull-text").textContent = "Обновление...";
      runtime.globalVars.refreshFlag = 1;
    }
    if (ind) {
      ind.style.height = "0px";
      ind.style.opacity = "0";
    }
    window._pullDist = 0;
  });
};

// Убираем индикатор когда clearBoard вызван
const _origClear = window.clearBoard;
window.clearBoard = function() {
  _origClear();
  const ind = document.getElementById("pull-indicator");
  if (ind) {
    ind.style.height = "0px";
    ind.style.opacity = "0";
    ind.querySelector(".pull-icon").textContent = "⬇";
    ind.querySelector(".pull-text").textContent = "Потяните вниз чтобы обновить";
  }
};
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
