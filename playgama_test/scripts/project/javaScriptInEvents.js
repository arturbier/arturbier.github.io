

const scriptsInEvents = {

	async Egame_Event1_Act1(runtime, localVars)
	{
		const today = new Date().toISOString().split("T")[0];
		runtime.globalVars.todayDate = today;
		
		const lastDate = localStorage.getItem("ldr_date") || "";
		runtime.globalVars.oldResetDate = lastDate;
		localStorage.setItem("ldr_date", today);
	},

	async Egame_Event4_Act7(runtime, localVars)
	{

	},

	async Egame_Event11_Act2(runtime, localVars)
	{
		showAchievement("🎉 Первый рекорд!","Твой результат в таблице лидеров","🎯","first");
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

	async Egame_Event16_Act2(runtime, localVars)
	{
		clearBoard()
	},

	async Egame_Event16_Act3(runtime, localVars)
	{
		openLeaderboard(true);
	},

	async Egame_Event18_Act6(runtime, localVars)
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

	async Egame_Event24_Act4(runtime, localVars)
	{
		var p=String(localVars.achPid);var n=String(localVars.achName);var id=String(runtime.globalVars.playerID||"");var nm=String(runtime.globalVars.CurrentName||"");if(p===id||n===nm){var r=localVars.achRank;runtime.globalVars.foundRank=r;var prev=localStorage.getItem("ach_state_rank");if(prev!==String(r)){runtime.globalVars.writeRank=1;window.saveHistory(id,r);if(r===0)window.showAchievement("👑 Король дня!","Ты на первом месте","👑",null,null);else if(r===1)window.showAchievement("🥈 Серебро!","Ты на втором месте","🥈",null,null);else if(r===2)window.showAchievement("🥉 Бронза!","Ты на третьем месте","🥉",null,null);if(prev==="0"&&r!==0)window.showAchievement("📉 Потерял первое место!","Теперь не на вершине","😢",null,null)}localStorage.setItem("ach_state_rank",String(r))}
	},

	async Egame_Event26_Act1(runtime, localVars)
	{
		window._histRows = [];
	},

	async Egame_Event28_Act2(runtime, localVars)
	{
		var parts = String(localVars.histRank).split(',');
		var r = Number(parts[0]);
		var d = parts[1] || '';
		if (window._histRows) window._histRows.unshift({r: r, d: d});
	},

	async Egame_Event29_Act1(runtime, localVars)
	{
		var popup = document.getElementById("history-popup");
		if (!popup || !window._histRows) return;
		var html = "";
		if (window._histRows.length === 0) {
		  html = "<div class='hist-empty'>Нет данных</div>";
		} else {
		  var maxR = 10;
		  html += '<div class=hist-chart>';
		  window._histRows.reverse().forEach(function(r) {
		    var h = Math.max(8, (1 - r / maxR) * 100);
		    var c = r === 0 ? '#ffc800' : r === 1 ? '#a0aac3' : r === 2 ? '#cd7f32' : '#00d4ff';
		    html += '<div class=hist-bar style=height:' + h + '%;background:' + c + '></div>';
		  });
		  html += '</div>';
		  html += '<div class=hist-labels>';
		  window._histRows.reverse().forEach(function(r) {
		    html += '<span>' + (r+1) + '</span>';
		  });
		  html += '</div>';
		  html += '<div class=hist-dates>';
		  window._histRows.reverse().forEach(function() {
		    html += '<span>—</span>';
		  });
		  html += '</div>';
		}
		popup.querySelector('.hist-list').innerHTML = html;
		var arr = window._histRows || [];
		if (arr.length > 0) {
		  localStorage.setItem('hist_' + runtime.globalVars.histPlayerID, JSON.stringify(arr));
		}
	},

	async Egame_Event31(runtime, localVars)
	{
// =====================
// GLOBAL STATE
// =====================
window.meFirst = false;
window.myPlayerID = "";
window.myPlayerName = "";

// =====================
// ACHIEVEMENT POPUP
// =====================
window._achTimer = null;
(function(){
  var d = new Date().toISOString().split("T")[0];
  if (localStorage.getItem("ach_date") !== d) {
    localStorage.setItem("ach_date", d);
    localStorage.removeItem("ach_top1");
    localStorage.removeItem("ach_top2");
    localStorage.removeItem("ach_top3");
    localStorage.removeItem("ach_lostTop1");
  }
})();
window.showAchievement = function(title, text, icon, id, state) {
  state = state != null ? String(state) : "1";
  if (id) {
    const key = "ach_state_" + id;
    const last = localStorage.getItem(key);
    if (last === state) return;
    localStorage.setItem(key, state);
  }
  var popup = document.getElementById("achievement-popup");
  if (!popup) return;
  clearTimeout(window._achTimer);
  popup.querySelector(".ach-icon").textContent = icon || "\ud83c\udfc6";
  popup.querySelector(".ach-title").textContent = title;
  popup.querySelector(".ach-text").textContent = text;
  popup.classList.remove("hide");
  popup.classList.add("show");
  var iconEl = popup.querySelector(".ach-icon");
  iconEl.style.animation = "none";
  iconEl.offsetHeight;
  iconEl.style.animation = "ach-pulse 0.6s ease";
  window._achTimer = setTimeout(function() {
    popup.classList.remove("show");
    popup.classList.add("hide");
  }, 3000);
};

window.clearAchievements = function() {
  localStorage.removeItem("hist_tip_shown");
  window.showAchievement("🗑 Очищено!", "Достижения сброшены", "🔄");
};

// =====================
// HISTORY POPUP
// =====================
window.showHistory = function(pid, playerName) {
  if (runtime.globalVars.currentTab !== 'daily') return;
  var popup = document.getElementById("history-popup");
  if (!popup) return;
  popup.querySelector(".hist-name").textContent = playerName;
  var overlay = document.getElementById("history-overlay");
  if (overlay) overlay.classList.add("show");
  popup.classList.remove("hide");
  popup.classList.add("show");
  var histData = JSON.parse(localStorage.getItem("hist_" + pid) || "[]");
  var html = "";
  if (histData.length === 0) {
    html = "<div class='hist-empty'>Ищем ваши рекорды...</div>";
    runtime.globalVars.histPlayerID = pid;
    runtime.globalVars.histTrigger = 1;
    setTimeout(function() {
      var p = document.getElementById('history-popup');
      if (p && p.querySelector('.hist-list').innerHTML.indexOf('Загрузка') !== -1) {
        p.querySelector('.hist-list').innerHTML = "<div class='hist-empty'>Не найдено</div>";
      }
    }, 10000);
  } else {
    html += '<div class=hist-cols>';
    html += '<div class=hist-left>';
    var items = histData.slice(-10).reverse();
    items.forEach(function(e, i) {
      var r = typeof e === 'object' ? e.r : e;
    });
    html += '<div class=hist-chart-wrap>';
    var maxRank = 1;
    items.forEach(function(e) { var r = typeof e === 'object' ? e.r : e; if (r > maxRank) maxRank = r; });
    var maxRank = Math.max(10, maxRank);
    var items = histData.slice(-10).reverse();
    html += '<div class=hist-bars>';
    items.forEach(function(e) {
      var r = typeof e === 'object' ? e.r : e;
      var cappedR = Math.min(r, 9);
      var h = Math.max(8, (1 - cappedR / 10) * 100);
      var color = r === 0 ? '#ffc800' : r === 1 ? '#a0aac3' : r === 2 ? '#cd7f32' : '#00d4ff';
      var medal = r === 0 ? '👑' : r === 1 ? '🥈' : r === 2 ? '🥉' : '';
      html += '<div class=hist-col>';
      html += '<div class=hist-medal>' + medal + '</div>';
      html += '<div class=hist-bar style=height:' + h + '%;background:' + color + '></div>';
      html += '</div>';
    });
    html += '</div>';
    html += '<div class=hist-dates>';
    items.forEach(function(e) {
      var d = '—';
      if (typeof e === 'object' && e.t) { var dt = new Date(e.t); d = ('0'+dt.getDate()).slice(-2) + '.' + ('0'+(dt.getMonth()+1)).slice(-2); }
      html += '<span>' + d + '</span>';
    });
    html += '</div>';
    html += '</div>';
  }
  popup.querySelector(".hist-list").innerHTML = html;
};
window.closeHistory = function() {
  var popup = document.getElementById("history-popup");
  var overlay = document.getElementById("history-overlay");
  if (popup) { popup.classList.remove("show"); popup.classList.add("hide"); }
  if (overlay) { overlay.classList.remove("show"); }
};
window.saveHistory = function(pid, rank) {
  var data = JSON.parse(localStorage.getItem("hist_" + pid) || "[]");
  data.push({r: rank, t: Date.now()});
  if (data.length > 10) data = data.slice(-10);
  localStorage.setItem("hist_" + pid, JSON.stringify(data));
};

// =====================
// LEADERBOARD OPEN/CLOSE
// =====================
window.openLeaderboard = function (meFirst = false) {

  window.meFirst = meFirst;
  window.myPlayerID = runtime.globalVars.playerID || "";
  window.myPlayerName = runtime.globalVars.CurrentName || "";

  const el = document.querySelector(".leaderboard-wrapper");
  const overlay = document.querySelector(".leaderboard-overlay");
  const titleEl = document.querySelector(".lb-header .title");

  if (!el) return;

  const tab = runtime.globalVars.currentTab;
  if (titleEl) titleEl.textContent = tab === "daily" ? "ТОП ДНЯ" : "ЛИДЕРЫ";
  if (tab === "daily" && !localStorage.getItem("hist_tip_shown")) {
    localStorage.setItem("hist_tip_shown", "1");
    setTimeout(function() {
      var tip = document.createElement('div');
      tip.className = 'hist-tutorial';
      tip.innerHTML = '👆 Нажми на игрока<br>чтобы увидеть историю позиций';
      document.querySelector('.leaderboard-wrapper').appendChild(tip);
      setTimeout(function() { tip.classList.add('fade'); }, 4000);
      setTimeout(function() { tip.remove(); }, 5000);
    }, 800);
  }

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
  const pinned = document.getElementById("pinned-row");
  if (pinned) pinned.innerHTML = "";

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
  const isTop2 = rank === 1;
  const isTop3 = rank === 2;

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
  if (isTop2) row.classList.add("top2");
  if (isTop3) row.classList.add("top3");

  row.innerHTML = `
    <span class="player-cell">
      <span class="rank-badge">${badge}</span>
      <img class="avatar"
           src="${avatarUrl}"
           onerror="this.src='https://via.placeholder.com/64'">
      <span class="${isTop1 ? "name-top1" : ""}">${name}${isMe ? " 📌" : ""}</span>
    </span>

    <span>${score}</span>
    <span>${gems}</span>
  `;
  row.setAttribute('onclick', "event.stopPropagation();window.showHistory('" + pid + "','" + name.replace(/'/g, "\\'") + "')");

  if (isMe) {
    row.classList.add("my-row");
    const pinned = document.getElementById("pinned-row");
    if (pinned) { pinned.innerHTML = ""; pinned.appendChild(row); }
    else rows.prepend(row);
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
	},

	async Egame_Event34_Act6(runtime, localVars)
	{
		var d=new Date();runtime.globalVars.histDate=d.getDate()+'.'+(d.getMonth()+1)
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
