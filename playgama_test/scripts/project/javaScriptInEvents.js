

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
		var p=String(localVars.achPid);var n=String(localVars.achName);var id=String(runtime.globalVars.playerID||"");var nm=String(runtime.globalVars.CurrentName||"");if(p===id||n===nm){var r=localVars.achRank;runtime.globalVars.foundRank=r;var prev=localStorage.getItem("ach_state_rank");if(prev!==String(r)){runtime.globalVars.writeRank=1;if(r===0)window.showAchievement("👑 Король дня!","Ты на первом месте","👑",null,null);else if(r===1)window.showAchievement("🥈 Серебро!","Ты на втором месте","🥈",null,null);else if(r===2)window.showAchievement("🥉 Бронза!","Ты на третьем месте","🥉",null,null);if(prev==="0"&&r!==0)window.showAchievement("📉 Потерял первое место!","Теперь не на вершине","😢",null,null)}localStorage.setItem("ach_state_rank",String(r))}
	},

	async Egame_Event28_Act3(runtime, localVars)
	{
		window.addHistoryRow(localVars.historyRank, localVars.historyTime)
	},

	async Egame_Event29_Act1(runtime, localVars)
	{
		window.renderHistoryChart();
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
  localStorage.removeItem('hist_idx');
  localStorage.removeItem('hist_tip_shown');
  window._achShown = {};
  window.showAchievement('🗑 Очищено!', 'Достижения сброшены', '🔄');
};

// =====================
// HISTORY
// =====================
window.showHistory = function(pid, playerName) {
  if (runtime.globalVars.currentTab !== 'daily') return;
  var popup = document.getElementById('history-popup');
  if (!popup) return;
  popup.querySelector('.hist-name').textContent = playerName;
  var overlay = document.getElementById('history-overlay');
  if (overlay) overlay.classList.add('show');
  popup.classList.remove('hide');
  popup.classList.add('show');
  var list = popup.querySelector('.hist-list');
  if (list) list.innerHTML = "<div class='hist-loading'><span class='hist-dot'>●</span><span class='hist-dot'>●</span><span class='hist-dot'>●</span></div>";
  window._histStartTime = Date.now();
  runtime.globalVars.histPlayerID = pid;
  runtime.globalVars.histTrigger = 1;
};

window.closeHistory = function() {
  var popup = document.getElementById("history-popup");
  var overlay = document.getElementById("history-overlay");
  if (popup) { popup.classList.remove("show"); popup.classList.add("hide"); }
  if (overlay) { overlay.classList.remove("show"); }
  window._histRows = [];
};

window.addHistoryRow = function(rank, time) {
  var parts = String(rank).split(',');
  var r = Number(parts[0]) || 0;
  var t = Number(parts[1]) || Number(time) || 0;
  if (!window._histRows) window._histRows = [];
  window._histRows.push({r: r, t: t});
};

// =====================
// RENDER HISTORY
// =====================

window.renderHistoryChart = function() {
  var list = document.querySelector('.hist-list');
  if (!list) return;

  var arr = window._histRows || [];
  if (arr.length === 0) {
    list.innerHTML = "<div class='hist-empty'>Нет данных</div>";
    return;
  }

  let html = `<div class="hist-chart-wrap"><div class="hist-bars">`;

  for (let i = arr.length - 1; i >= 0; i--) {
    const o = arr[i];
    const r = o.r || 0; // r=0 (1 место), r=1 (2 место)... r=49 (50 место)

    // Расчет высоты по вашей логике
    let h;
    if (r === 0) {
      h = 100; // 1 место
    } else if (r === 1) {
      h = 60;  // 2 место (снизили с 75 до 60 для контраста)
    } else if (r === 2) {
      h = 40;  // 3 место (снизили с 50 до 40)
    } else {
      // 4-е место начинается с 25% и идет до 5%
      const cappedR = Math.min(r, 49);
      const progress = (cappedR - 3) / (49 - 3); 
      h = 25 - (progress * 20);
    }

    const col = r === 0 ? '#ffc800' : r === 1 ? '#a0aac3' : r === 2 ? '#cd7f32' : '#556677';
    const medal = r === 0 ? '👑' : r === 1 ? '🥈' : r === 2 ? '🥉' : '#' + (r + 1);

    const dt = (o.t && o.t > 0) ? new Date(o.t) : null;
    const d = dt ? ('0' + dt.getDate()).slice(-2) + '.' + ('0' + (dt.getMonth() + 1)).slice(-2) : '—';
    const tm = dt ? ('0' + dt.getHours()).slice(-2) + ':' + ('0' + dt.getMinutes()).slice(-2) : '';

    html += `
      <div class="hist-col">
        <div class="hist-medal">${medal}</div>
        <div class="hist-bar" data-h="${h}" style="background:${col}; height:0%"></div>
        <div class="hist-date-text">${d}<br>${tm}</div>
      </div>`;
  }

  html += `</div></div>`;
  list.innerHTML = html;

  // Анимация высоты
  requestAnimationFrame(function() {
    requestAnimationFrame(function() {
      var bars = list.querySelectorAll('.hist-bar');
      for (var j = 0; j < bars.length; j++) {
        var h = bars[j].getAttribute('data-h');
        if (h) bars[j].style.height = h + '%';
      }
    });
  });
};

// =====================
// LEADERBOARD & ROW RENDER
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
  if (tab === 'daily' && !localStorage.getItem('hist_tip_shown')) {
    localStorage.setItem('hist_tip_shown', '1');
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
  requestAnimationFrame(() => { el.classList.add("show"); });
  initSwipeToClose(el);
};
//СВАП ЗАКРЫТИЯ
window.initSwipeToClose = function(el) {
  var rows = el.querySelector('.rows');
  if (!rows || el._swipeInited) return;
  el._swipeInited = true;

  var startY = 0, dist = 0, active = false;
  var captureTarget = null;
  var wasDragged = false; 

  var onEnd = function() {
    if (!active) return;
    active = false;
    
    el.style.transition = 'transform 0.35s ease';

    if (dist > 100) {
      el.style.transform = ''; 
      window.closeLeaderboard(); 
    } else {
      el.style.transform = ''; 
    }
    dist = 0;

    setTimeout(function() { if (!active) el.style.transition = ''; }, 350);
  };

  // ==========================
  // 1. TOUCH (СМАРТФОНЫ)
  // ==========================
  el.addEventListener('touchstart', function(e) {
    if (rows && rows.scrollTop > 1) return;
    startY = e.touches[0].clientY; dist = 0; active = true; wasDragged = false;
  }, {passive: false});

  el.addEventListener('touchmove', function(e) {
    if (!active || (rows && rows.scrollTop > 1)) return;
    dist = e.touches[0].clientY - startY;
    
    // КРИТИЧНЫЙ ФИКС ДЛЯ СМАРТФОНА: Если мы тянем вниз,
    // жестко запрещаем браузеру дергать саму страницу
    if (dist > 0) {
      if (e.cancelable) e.preventDefault(); 
      if (dist > 5) wasDragged = true;
      
      el.style.transition = 'none';
      el.style.transform = 'translate(-50%, ' + Math.min(dist * 0.6, 200) + 'px)';
    }
  }, {passive: false});

  el.addEventListener('touchend', onEnd);
  el.addEventListener('touchcancel', onEnd);

  // ==========================
  // 2. MOUSE (ПК)
  // ==========================
  el.ondragstart = function() { return false; };

  el.addEventListener('pointerdown', function(e) {
    if (e.pointerType !== 'mouse' || e.button !== 0) return;
    if (rows && rows.scrollTop > 1) return;

    startY = e.clientY; dist = 0; active = true; wasDragged = false;
    
    captureTarget = e.target;
    if (captureTarget.setPointerCapture) {
      try { captureTarget.setPointerCapture(e.pointerId); } catch(err){}
    }
  });

  el.addEventListener('pointermove', function(e) {
    if (!active || e.pointerType !== 'mouse') return;
    dist = e.clientY - startY;
    
    if (dist > 0) {
      if (dist > 5) wasDragged = true;
      el.style.transition = 'none';
      el.style.transform = 'translate(-50%, ' + Math.min(dist * 0.6, 200) + 'px)';
    }
  });

  el.addEventListener('pointerup', function(e) {
    if (!active || e.pointerType !== 'mouse') return;
    if (captureTarget && captureTarget.releasePointerCapture) {
      try { captureTarget.releasePointerCapture(e.pointerId); } catch(err){}
    }
    captureTarget = null;
    onEnd();
  });

  el.addEventListener('pointercancel', function(e) {
    if (!active || e.pointerType !== 'mouse') return;
    if (captureTarget && captureTarget.releasePointerCapture) {
      try { captureTarget.releasePointerCapture(e.pointerId); } catch(err){}
    }
    captureTarget = null;
    onEnd();
  });

  // ==========================
  // 3. БЛОКИРОВКА ЛОЖНЫХ КЛИКОВ
  // ==========================
  el.addEventListener('click', function(e) {
    if (wasDragged) {
      e.preventDefault();
      e.stopPropagation();
      wasDragged = false;
    }
  }, true); 
};


//////
window.closeLeaderboard = function () {
  const el = document.querySelector(".leaderboard-wrapper");
  const overlay = document.querySelector(".leaderboard-overlay");
  
  if (el) {
    el.classList.remove("show");
    // ЖЕСТКАЯ ОЧИСТКА: убиваем зависшие стили от прерванного свайпа,
    // чтобы CSS-класс смог корректно скрыть окно!
    el.style.transform = '';
    el.style.transition = '';
    el._swipeInited = false; // Позволяем переинициализировать свайп при новом открытии
  }
  
  if (overlay) {
    overlay.classList.remove("show");
  }
};

window.clearBoard = function () {
  const rows = document.querySelector(".rows");
  if (rows) rows.innerHTML = "";
  const pinned = document.getElementById("pinned-row");
  if (pinned) pinned.innerHTML = "";
};

window.addRow = function (name, score, gems, avatarUrl, rank, pid) {
  const rows = document.querySelector(".rows");
  if (!rows) return;
  const row = document.createElement("div");
  row.className = "row";
  const isTop1 = rank === 0;
  const isMe = window.meFirst && (pid === window.myPlayerID || name === window.myPlayerName);
  let badge = rank === 0 ? "👑" : rank === 1 ? "🥈" : rank === 2 ? "🥉" : `${rank + 1}.`;
  if (isTop1) row.classList.add("top1");
  row.innerHTML = `
    <span class="player-cell">
      <span class="rank-badge">${badge}</span>
      <img class="avatar" src="${avatarUrl}" onerror="this.src='https://via.placeholder.com/64'">
      <span class="${isTop1 ? "name-top1" : ""}">${name}${isMe ? " 📌" : ""}</span>
    </span>
    <span>${score}</span>
    <span>${gems}</span>`;
  row.style.cursor = 'pointer';
  row.onclick = function(e) { e.stopPropagation(); window.showHistory(pid, name); };
  if (isMe) {
    row.classList.add("my-row");
    const pinned = document.getElementById("pinned-row");
    if (pinned) { pinned.innerHTML = ""; pinned.appendChild(row); }
    else rows.prepend(row);
  } else {
    rows.appendChild(row);
  }
};
	},

	async Egame_Event34_Act1(runtime, localVars)
	{
		var d=new Date();runtime.globalVars.histTime=d.getTime();runtime.globalVars.histIndex=Number(localStorage.getItem('hist_idx')||0);runtime.globalVars.histIndex=runtime.globalVars.histIndex+1;localStorage.setItem('hist_idx',runtime.globalVars.histIndex)
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
