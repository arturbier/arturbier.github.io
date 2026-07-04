var maxParticleCount = 150; //set max confetti count
var particleSpeed = 2; //set the particle animation speed
var startConfetti; //call to start confetti animation
var stopConfetti; //call to stop adding confetti
var toggleConfetti; //call to start or stop the confetti animation depending on whether it's already running
var removeConfetti; //call to stop the confetti animation and remove all confetti immediately

(function() {
	startConfetti = startConfettiInner;
	stopConfetti = stopConfettiInner;
	toggleConfetti = toggleConfettiInner;
	removeConfetti = removeConfettiInner;
	var colors = ["DodgerBlue", "OliveDrab", "Gold", "Pink", "SlateBlue", "LightBlue", "Violet", "PaleGreen", "SteelBlue", "SandyBrown", "Chocolate", "Crimson"]
	var streamingConfetti = false;
	var animationTimer = null;
	var particles = [];
	var waveAngle = 0;
	
	function resetParticle(particle, width, height) {
		particle.color = colors[(Math.random() * colors.length) | 0];
		particle.x = Math.random() * width;
		particle.y = Math.random() * height - height;
		particle.diameter = Math.random() * 10 + 5;
		particle.tilt = Math.random() * 10 - 10;
		particle.tiltAngleIncrement = Math.random() * 0.07 + 0.05;
		particle.tiltAngle = 0;
		return particle;
	}

	function startConfettiInner() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		window.requestAnimFrame = (function() {
			return window.requestAnimationFrame ||
				window.webkitRequestAnimationFrame ||
				window.mozRequestAnimationFrame ||
				window.oRequestAnimationFrame ||
				window.msRequestAnimationFrame ||
				function (callback) {
					return window.setTimeout(callback, 16.6666667);
				};
		})();
		var canvas = document.getElementById("confetti-canvas");
		if (canvas === null) {
			canvas = document.createElement("canvas");
			canvas.setAttribute("id", "confetti-canvas");
			canvas.setAttribute("style", "display:block;z-index:999999;pointer-events:none");
			document.body.appendChild(canvas);
			canvas.width = width;
			canvas.height = height;
			window.addEventListener("resize", function() {
				canvas.width = window.innerWidth;
				canvas.height = window.innerHeight;
			}, true);
		}
		var context = canvas.getContext("2d");
		while (particles.length < maxParticleCount)
			particles.push(resetParticle({}, width, height));
		streamingConfetti = true;
		if (animationTimer === null) {
			(function runAnimation() {
				context.clearRect(0, 0, window.innerWidth, window.innerHeight);
				if (particles.length === 0)
					animationTimer = null;
				else {
					updateParticles();
					drawParticles(context);
					animationTimer = requestAnimFrame(runAnimation);
				}
			})();
		}
	}

	function stopConfettiInner() {
		streamingConfetti = false;
	}

	function removeConfettiInner() {
		stopConfetti();
		particles = [];
	}

	function toggleConfettiInner() {
		if (streamingConfetti)
			stopConfettiInner();
		else
			startConfettiInner();
	}

	function drawParticles(context) {
		var particle;
		var x;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			context.beginPath();
			context.lineWidth = particle.diameter;
			context.strokeStyle = particle.color;
			x = particle.x + particle.tilt;
			context.moveTo(x + particle.diameter / 2, particle.y);
			context.lineTo(x, particle.y + particle.tilt + particle.diameter / 2);
			context.stroke();
		}
	}

	function updateParticles() {
		var width = window.innerWidth;
		var height = window.innerHeight;
		var particle;
		waveAngle += 0.01;
		for (var i = 0; i < particles.length; i++) {
			particle = particles[i];
			if (!streamingConfetti && particle.y < -15)
				particle.y = height + 100;
			else {
				particle.tiltAngle += particle.tiltAngleIncrement;
				particle.x += Math.sin(waveAngle);
				particle.y += (Math.cos(waveAngle) + particle.diameter + particleSpeed) * 0.5;
				particle.tilt = Math.sin(particle.tiltAngle) * 15;
			}
			if (particle.x > width + 20 || particle.x < -20 || particle.y > height) {
				if (streamingConfetti && particles.length <= maxParticleCount)
					resetParticle(particle, width, height);
				else {
					particles.splice(i, 1);
					i--;
				}
			}
		}
	}
})();

const scriptsInEvents = {

	async E_help_Event25_Act1(runtime, localVars)
	{
		const elem = document.querySelector('.glass');
		
		if (elem) {
		    // Включаем блюр мгновенно (без тяжелой анимации)
		    elem.style.backdropFilter = "blur(5px)";
		    elem.style.background = "rgba(255, 255, 255, 0.1)";
		    
		    // Анимируем ТОЛЬКО прозрачность (это супер-легко для любых устройств)
		    elem.style.transition = "opacity 0.3s ease";
		    elem.style.opacity = "1";
		    
		    // Остальные легкие стили
		    elem.style.padding = "20px 40px";
		    elem.style.borderRadius = "10px";
		    elem.style.pointerEvents = "none";
		}
	},

	async E_help_Event26_Act1(runtime, localVars)
	{
		const elem = document.querySelector('.glass');
		
		if (elem) {
		    // Плавно гасим прозрачность элемента
		    elem.style.transition = "opacity 0.3s ease";
		    elem.style.opacity = "0";
		    
		    // Ждем 300 мс (пока идет анимация), а затем полностью убиваем тяжелый блюр
		    setTimeout(() => {
		        if (elem.style.opacity === "0") {
		            elem.style.backdropFilter = "none";
		            elem.style.background = "transparent";
		        }
		    }, 300);
		}
	},

	async E_effect_Event4_Act1(runtime, localVars)
	{
		startConfetti();
	},

	async E_effect_Event4_Act5(runtime, localVars)
	{
		stopConfetti();
	},

	async E_effect_Event5_Act1(runtime, localVars)
	{
		stopConfetti();
	},

	async E_game_Event12_Act1(runtime, localVars)
	{
		// Массив с русскими буквами
		var letters = 'АБВГДЕЁЖЗИИЙКЛМНОПРСТУФХЦЧШЩЫЭЮЯабвгдеёжзийклмнопрстуфхцчшщыэюя';
		
		// Переменная для контроля частоты появления частиц
		var lastParticleTime = 0;
		var particleDelay = 100; // Задержка между частицами (в миллисекундах)
		
		// Функция для создания частицы с буквой
		function createParticle(x, y) {
		    // Генерация случайной буквы
		    var letter = letters[Math.floor(Math.random() * letters.length)];
		
		    var particleContainer = document.createElement('div');
		    particleContainer.classList.add('particle');
		    particleContainer.style.position = 'absolute';
		    particleContainer.style.left = (x - 10) + 'px'; // Позиционирование на месте курсора
		    particleContainer.style.top = (y - 10) + 'px';
		
		    // Генерация случайного размера буквы
		    var size = Math.floor(Math.random() * 30) + 10; // Размер от 10px до 40px
		    particleContainer.style.fontSize = size + 'px';
		    particleContainer.style.color = 'white';
		    particleContainer.style.fontFamily = 'Arial, sans-serif';
		    particleContainer.style.fontWeight = 'bold';
		    particleContainer.innerText = letter;
		
		    // Устанавливаем z-index
		    particleContainer.style.zIndex = -1;
		
		    document.body.appendChild(particleContainer);
		
		    // Анимация частицы с буквой
		    let scale = 2;
		    let opacity = 1;
		    let interval = setInterval(function() {
		        scale += 0.03; // Увеличиваем размер медленнее
		        opacity -= 0.03; // Уменьшаем прозрачность медленнее
		        particleContainer.style.transform = 'scale(' + scale + ')';
		        particleContainer.style.opacity = opacity;
		
		        // Остановка анимации, когда opacity становится 0
		        if (opacity <= 0) {
		            clearInterval(interval);
		            particleContainer.remove();
		        }
		    }, 50); // Каждые 50 миллисекунд
		
		}
		
		// Слушаем события мыши для создания частиц с задержкой
		document.body.addEventListener('mousemove', function(e) {
		    var currentTime = Date.now();
		    if (currentTime - lastParticleTime > particleDelay) {
		        createParticle(e.clientX, e.clientY); // При движении мыши создаем частицы
		        lastParticleTime = currentTime; // Обновляем время последней частицы
		    }
		});
	},

	async E_newgrid_Event3_Act1(runtime, localVars)
	{

	},

	async E_newgrid_Event3_Act2(runtime, localVars)
	{
		window.generateGameGrid = function(size) {
		    try {
		        const arr = runtime.objects.wordsArray.getFirstInstance();
		        const gridArr = runtime.objects.GridArray.getFirstInstance();
		        const usedWords = runtime.objects.usedWords.getFirstInstance();
		        
		        // Работаем через DataMap, как ты показал в примере
		        const history = runtime.objects.GlobalHistory.getFirstInstance().getDataMap();
		
		        const wordList = [];
		        const height = arr.height;
		
		        for (let y = 0; y < height; y++) {
		            try {
		                const w = arr.getAt(0, y, 0);
		                if (w && typeof w === "string" && w.trim().length > 1) {
		                    wordList.push(w.trim().toUpperCase());
		                }
		            } catch (e) {}
		        }
		
		        const N = size;
		
		        // ... (функции generateDFSPath и generateFallbackPath остаются без изменений) ...
		                function generateDFSPath() {
		            const DIRS = [[1,0],[-1,0],[0,1],[0,-1]];
		            const visited = Array.from({length: N}, () => new Uint8Array(N));
		            const path = [];
		            let ops = 0; // СЧЕТЧИК ОПЕРАЦИЙ (предохранитель от зависания)
		
		            function dfs(r, c, depth) {
		                // Если скрипт сделал слишком много попыток - прерываем его
		                if (ops > 5000) return false; 
		                ops++;
		
		                visited[r][c] = 1;
		                path.push({r, c});
		                if (depth === N * N) return true;
		
		                const nb = [];
		                for (const [dr, dc] of DIRS) {
		                    const nr = r + dr, nc = c + dc;
		                    if (nr >= 0 && nr < N && nc >= 0 && nc < N && !visited[nr][nc]) {
		                        let deg = 0;
		                        for (const [ddr, ddc] of DIRS) {
		                            const nnr = nr + ddr, nnc = nc + ddc;
		                            if (nnr >= 0 && nnr < N && nnc >= 0 && nnc < N && !visited[nnr][nnc]) deg++;
		                        }
		                        nb.push({nr, nc, deg});
		                    }
		                }
		                
		                nb.sort((a, b) => a.deg - b.deg || Math.random() - 0.5);
		                
		                for (const {nr, nc} of nb) { 
		                    if (dfs(nr, nc, depth + 1)) return true; 
		                }
		                
		                visited[r][c] = 0;
		                path.pop();
		                return false;
		            }
		
		            // Даем алгоритму 10 попыток найти путь
		            for (let att = 0; att < 10; att++) {
		                ops = 0; // Сбрасываем счетчик для новой попытки
		                for (let r = 0; r < N; r++) visited[r].fill(0);
		                path.length = 0;
		                
		                const sr = (Math.random() * N) | 0;
		                const sc = (Math.random() * N) | 0;
		                
		                if (dfs(sr, sc, 1)) return [...path];
		            }
		            return null; // Если не получилось, мгновенно отдаем fallbackPath
		        }
		
		        function generateFallbackPath() {
		            const path = [];
		            const horz = Math.random() < 0.5;
		            if (horz) {
		                for (let r = 0; r < N; r++) { const fwd = !(r & 1); for (let i = 0; i < N; i++) { const c = fwd ? i : N - 1 - i; path.push({r, c}); } }
		            } else {
		                for (let c = 0; c < N; c++) { const fwd = !(c & 1); for (let i = 0; i < N; i++) { const r = fwd ? i : N - 1 - i; path.push({r, c}); } }
		            }
		            const off = (Math.random() * path.length) | 0;
		            const head = path.splice(0, off);
		            path.push(...head);
		            return path;
		        }
		
		                let path = generateDFSPath() || generateFallbackPath();
		        const TOTAL = path.length;
		
		        // Фильтруем слова, которые еще не использовались
		        let cands = wordList.filter(w => w.length <= TOTAL && !history.has(w));
		        
		        // Если слов не хватает, сбрасываем историю
		        if (cands.length === 0) {
		            console.warn("Слова закончились! Очищаем историю...");
		            history.clear();
		            cands = wordList.filter(w => w.length <= TOTAL);
		        }
		
		        // Находим минимальную длину слова в словаре (чтобы не оставлять пустые "хвосты" по 1-2 клетки)
		        const minWordLen = cands.length > 0 ? Math.min(...cands.map(w => w.length)) : 3;
		
		        let selectedWords = [];
		        let isSuccess = false;
		
		        // Рандомный быстрый подбор слов под точную длину TOTAL (максимум 500 попыток)
		        for (let attempt = 0; attempt < 500; attempt++) {
		            let shuffled = [...cands].sort(() => Math.random() - 0.5);
		            selectedWords = [];
		            let currentLen = 0;
		
		            for (const w of shuffled) {
		                let nextLen = currentLen + w.length;
		                if (nextLen <= TOTAL) {
		                    let rem = TOTAL - nextLen;
		                    // Берем слово, только если остаток равен 0 ИЛИ если в остаток еще влезет хотя бы самое короткое слово
		                    if (rem === 0 || rem >= minWordLen) {
		                        selectedWords.push(w);
		                        currentLen = nextLen;
		                    }
		                }
		                // Если собрали ровно нужную длину - выходим
		                if (currentLen === TOTAL) {
		                    isSuccess = true;
		                    break;
		                }
		            }
		            if (isSuccess) break;
		        }
		
		        if (isSuccess) {
		            // Подготавливаем сетку
		            gridArr.setSize(size, size, 3);
		            for (let r = 0; r < size; r++) {
		                for (let c = 0; c < size; c++) { 
		                    gridArr.setAt("", c, r, 0); 
		                }
		            }
		
		            usedWords.setSize(selectedWords.length, 2, 1);
		            let currentPos = 0;
		
		            // Распределяем выбранные слова по заранее сгенерированному пути
		            selectedWords.forEach((word, wordIdx) => {
		                history.set(word, 1); // Записываем в историю
		                usedWords.setAt(word, wordIdx, 0, 0);
		                usedWords.setAt(Array.from({length: word.length}, (_, i) => i).join(""), wordIdx, 1, 0);
		
		                for (let i = 0; i < word.length; i++) {
		                    const p = path[currentPos + i];
		                    gridArr.setAt(word[i], p.c, p.r, 0); // Z=0: Сама буква
		                    gridArr.setAt(wordIdx, p.c, p.r, 1); // Z=1: Индекс слова
		                    gridArr.setAt(i, p.c, p.r, 2);       // Z=2: Позиция буквы
		                }
		                currentPos += word.length;
		            });
		
		            console.log("УСПЕХ. Размер: " + size + "x" + size + ". Слова:", selectedWords.join(", "));
		        } else {
		            console.error("РЕШЕНИЕ НЕ НАЙДЕНО. Не удалось подобрать комбинацию слов длиной ровно " + TOTAL);
		            // Если вдруг комбинация не подобралась (что редкость), очищаем историю и пробуем еще раз
		            history.clear();
		            window.generateGameGrid(size); 
		        }
		
		    } catch (err) {
		        console.error("Ошибка генерации:", err);
		    }
		};
	},

	async E_newgrid_Event3_Act3(runtime, localVars)
	{
		window.generateGameGrid(localVars.gridSize);
	},

	async E_newgrid_Event6_Act1(runtime, localVars)
	{
		const palette = runtime.objects.Palette.getFirstInstance();
		palette.setSize(3, 50, 1);
		
		// Используем золотое сечение (0.618033988749895), чтобы цвета 
		// равномерно распределялись по цветовому кругу
		const goldenRatioConjugate = 0.618033988749895;
		let hue = Math.random(); // Случайный начальный оттенок
		
		for (let i = 0; i < 50; i++) {
		    hue += goldenRatioConjugate;
		    hue %= 1; // Удерживаем значение в диапазоне [0, 1]
		
		    // Конвертируем HSL в RGB
		    // H (Hue) = hue, S (Saturation) = 0.7, L (Lightness) = 0.6
		    let rgb = hslToRgb(hue, 0.7, 0.6);
		
		    palette.setAt(Math.floor(rgb[0] * 255), 0, i, 0);
		    palette.setAt(Math.floor(rgb[1] * 255), 1, i, 0);
		    palette.setAt(Math.floor(rgb[2] * 255), 2, i, 0);
		}
		
		// Вспомогательная функция (добавь её в тот же скрипт)
		function hslToRgb(h, s, l) {
		    let r, g, b;
		    if (s === 0) {
		        r = g = b = l;
		    } else {
		        const hue2rgb = (p, q, t) => {
		            if (t < 0) t += 1;
		            if (t > 1) t -= 1;
		            if (t < 1/6) return p + (q - p) * 6 * t;
		            if (t < 1/2) return q;
		            if (t < 2/3) return p + (q - p) * (2/3 - t) * 6;
		            return p;
		        };
		        const q = l < 0.5 ? l * (1 + s) : l + s - l * s;
		        const p = 2 * l - q;
		        r = hue2rgb(p, q, h + 1/3);
		        g = hue2rgb(p, q, h);
		        b = hue2rgb(p, q, h - 1/3);
		    }
		    return [r, g, b];
		}
	},

	async ["E_leaderboard_Event-1_Act2"](runtime, localVars)
	{
		showAchievement("🎉 Первый рекорд!","Твой результат в таблице лидеров","🎯","first");
	},

	async E_leaderboard_Event25_Act1(runtime, localVars)
	{
		var d=new Date();runtime.globalVars.histTime=d.getTime();runtime.globalVars.histIndex=Number(localStorage.getItem('hist_idx')||0);runtime.globalVars.histIndex=runtime.globalVars.histIndex+1;localStorage.setItem('hist_idx',runtime.globalVars.histIndex)
	},

	async E_leaderboard_Event4_Act2(runtime, localVars)
	{
		showAchievement("🎉 Первый рекорд!","Твой результат в таблице лидеров","🎯","first");
	},

	async E_leaderboard_Event5_Act1(runtime, localVars)
	{
		clearBoard()
	},

	async E_leaderboard_Event5_Act2(runtime, localVars)
	{
		openLeaderboard(true);
	},

	async E_leaderboard_Event7_Act6(runtime, localVars)
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

	async E_leaderboard_Event8_Act1(runtime, localVars)
	{
		clearBoard()
	},

	async E_leaderboard_Event8_Act2(runtime, localVars)
	{
		openLeaderboard(true);
	},

	async E_leaderboard_Event10_Act6(runtime, localVars)
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

	async E_leaderboard_Event15_Act4(runtime, localVars)
	{
		var p=String(localVars.achPid);var n=String(localVars.achName);var id=String(runtime.globalVars.playerID||"");var nm=String(runtime.globalVars.CurrentName||"");if(p===id||n===nm){var r=localVars.achRank;runtime.globalVars.foundRank=r;var prev=localStorage.getItem("ach_state_rank");if(prev!==String(r)){runtime.globalVars.writeRank=1;if(r===0)window.showAchievement("👑 Король дня!","Ты на первом месте","👑",null,null);else if(r===1)window.showAchievement("🥈 Серебро!","Ты на втором месте","🥈",null,null);else if(r===2)window.showAchievement("🥉 Бронза!","Ты на третьем месте","🥉",null,null);if(prev==="0"&&r!==0)window.showAchievement("📉 Потерял первое место!","Теперь не на вершине","😢",null,null)}localStorage.setItem("ach_state_rank",String(r))}
	},

	async E_leaderboard_Event19_Act3(runtime, localVars)
	{
		window.addHistoryRow(localVars.historyRank, localVars.historyTime)
	},

	async E_leaderboard_Event20_Act1(runtime, localVars)
	{
		window.renderHistoryChart();
	},

	async E_leaderboard_Event22(runtime, localVars)
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

	async E_leaderboard_Event1_Act1(runtime, localVars)
	{
		const today = new Date().toISOString().split("T")[0];
		runtime.globalVars.todayDate = today;
		
		const lastDate = localStorage.getItem("ldr_date") || "";
		runtime.globalVars.oldResetDate = lastDate;
		localStorage.setItem("ldr_date", today);
	}
};

globalThis.C3.JavaScriptInEvents = scriptsInEvents;
