

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

	async Egame_Event12_Act3(runtime, localVars)
	{
		openLeaderboard(true);
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
		openLeaderboard(true);
	},

	async Egame_Event17_Act2(runtime, localVars)
	{
		clearBoard()
	},

	async Egame_Event17_Act3(runtime, localVars)
	{
		openLeaderboard(true);
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
		openLeaderboard(true);
	},

	async Egame_Event25(runtime, localVars)
	{
// =====================
// GLOBAL STATE
// =====================
window.meFirst = false;
window.myPlayerID = "";
window.myPlayerName = "";

// =====================
// LEADERBOARD OPEN/CLOSE
// =====================
window.openLeaderboard = function (meFirst = false) {

  window.meFirst = meFirst;

  window.myPlayerID = runtime.globalVars.playerID || "";
  window.myPlayerName = runtime.globalVars.CurrentName || "";

  const el = document.querySelector(".leaderboard-wrapper");
  const overlay = document.querySelector(".leaderboard-overlay");

  if (!el) return;

  overlay?.classList.add("show");

  requestAnimationFrame(() => {
    el.classList.add("show");
  });
};

window.closeLeaderboard = function () {

  const el = document.querySelector(".leaderboard-wrapper");
  const overlay = document.querySelector(".leaderboard-overlay");

  el?.classList.remove("show");
  overlay?.classList.remove("show");

  window.resetPullToRefresh();
};

// =====================
// BOARD
// =====================
window.clearBoard = function () {
  const rows = document.querySelector(".rows");
  if (rows) rows.innerHTML = "";

  window.resetPullToRefresh();
};

// =====================
// ROW RENDER
// =====================
window.addRow = function (name, score, gems, avatarUrl, rank, pid) {

  const rows = document.querySelector(".rows");
  if (!rows) return;

  const row = document.createElement("div");
  row.className = "row";

  const isTop1 = rank === 0;

  const isMe =
    window.meFirst &&
    (
      pid === window.myPlayerID ||
      name === window.myPlayerName
    );

  let badge =
    rank === 0 ? "👑" :
    rank === 1 ? "🥈" :
    rank === 2 ? "🥉" :
    `${rank + 1}.`;

  if (isTop1) row.classList.add("top1");

  row.innerHTML = `
    <span class="player-cell">
      <span class="rank-badge">${badge}</span>
      <img class="avatar"
           src="${avatarUrl}"
           onerror="this.src='https://via.placeholder.com/64'">
      <span class="${isTop1 ? "name-top1" : ""}">${name}</span>
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

// =====================
// PULL TO REFRESH
// =====================
window._pullDist = 0;
window._pullActive = false;
window._wheelTimer = null;

window._ptrGetInd = () =>
  document.getElementById("pull-indicator");

window._ptrSet = (h, txt) => {
  const ind = window._ptrGetInd();
  if (!ind) return;

  ind.style.height = h + "px";
  ind.style.opacity = Math.min(h / 80, 1);

  ind.querySelector(".pull-icon").textContent =
    h >= 70 ? "⬆" : "⬇";

  if (txt)
    ind.querySelector(".pull-text").textContent = txt;
};

window._ptrReset = function () {
  window._pullDist = 0;
  window._pullActive = false;
  window._ptrSet(0, "Потяните вниз чтобы обновить");
};

window._ptrRefresh = function () {

  // защита от спама
  if (runtime.globalVars.refreshFlag === 1) return;

  runtime.globalVars.refreshFlag = 1;

  window._ptrSet(40, "Обновление...");
};

window._ptrCommit = function () {
  if (window._pullDist > 70) {
    window._ptrRefresh();
  } else {
    window._ptrReset();
  }
};

// =====================
// PULL-TO-REFRESH (inline handlers)
// =====================
window._ptrDist = 0;
window._ptrTouchY = 0;
window._ptrActive = false;
window._ptrWheelTimer = null;

window._ptrInd = function() { return document.getElementById("pull-indicator"); };
window._ptrSet = function(h, txt) {
  var ind = window._ptrInd();
  if (!ind) return;
  ind.style.height = h + "px";
  ind.style.opacity = Math.min(h / 80, 1);
  var icon = ind.querySelector(".pull-icon");
  if (icon) icon.textContent = h >= 70 ? "\u2b06" : "\u2b07";
  if (txt) ind.querySelector(".pull-text").textContent = txt;
};
window._ptrDoRefresh = function() {
  if (runtime.globalVars.refreshFlag === 1) return;
  window._ptrSet(40, "\u041e\u0431\u043d\u043e\u0432\u043b\u0435\u043d\u0438\u0435...");
  runtime.globalVars.refreshFlag = 1;
};
window._ptrReset = function() {
  window._ptrDist = 0;
  window._ptrActive = false;
  window._ptrSet(0, "\u041f\u043e\u0442\u044f\u043d\u0438\u0442\u0435 \u0432\u043d\u0438\u0437 \u0447\u0442\u043e\u0431\u044b \u043e\u0431\u043d\u043e\u0432\u0438\u0442\u044c");
};

// === INLINE HANDLERS (работают как onclick) ===
window._ptrStart = function(e) {
  var rows = document.querySelector(".rows");
  if (!rows || rows.scrollTop > 1) return;
  window._ptrTouchY = e.touches[0].clientY;
  window._ptrActive = true;
};
window._ptrMove = function(e) {
  if (!window._ptrActive) return;
  var rows = document.querySelector(".rows");
  if (!rows || rows.scrollTop > 1) { window._ptrReset(); return; }
  window._ptrDist = e.touches[0].clientY - window._ptrTouchY;
  if (window._ptrDist > 0) {
    window._ptrSet(Math.min(window._ptrDist * 0.5, 80));
  } else {
    window._ptrReset();
  }
};
window._ptrEnd = function() {
  if (!window._ptrActive) return;
  window._ptrActive = false;
  if (window._ptrDist > 70) window._ptrDoRefresh();
  window._ptrSet(0);
  window._ptrDist = 0;
};
window._ptrWheel = function(e) {
  var rows = document.querySelector(".rows");
  var wrapper = document.querySelector(".leaderboard-wrapper");
  if (!rows || !wrapper) return;
  if (!wrapper.classList.contains("show")) return;
  if (rows.scrollTop > 1) return;
  if (e.deltaY >= 0) return;
  e.preventDefault();
  window._ptrDist += Math.abs(e.deltaY) * 0.5;
  if (window._ptrDist > 120) window._ptrDist = 120;
  window._ptrSet(Math.min(window._ptrDist * 0.67, 80));
  clearTimeout(window._ptrWheelTimer);
  window._ptrWheelTimer = setTimeout(function() {
    if (window._ptrDist > 70) window._ptrDoRefresh();
    window._ptrSet(0);
    window._ptrDist = 0;
  }, 300);
};

// =====================
// RESET
// =====================
window.resetPullToRefresh = function() {
  window._ptrReset();
  clearTimeout(window._ptrWheelTimer);
};
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
