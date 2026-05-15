const episodes = [
  {
    id: 1,
    title: "Blindaje jurídico del debido proceso",
    file: "audios/Blindaje_jurídico_del_debido_proceso (1).m4a",
    eje: "constitucion",
    ejeNombre: "🏛️ Constitución Política",
    icon: "🏛️",
    subtitulo: "Artículo 29 (Debido Proceso) | Derecho de Petición | Igualdad Real",
    duracion: "18:13",
    foco: "Análisis técnico del debido proceso como escudo contra nulidades"
  },
  {
    id: 2,
    title: "Anatomía del control disciplinario en Colombia",
    file: "audios/Anatomía_del_control_disciplinario_en_Colombia (1).m4a",
    eje: "estructura",
    ejeNombre: "⚙️ Estructura del Estado y PGN",
    icon: "⚙️",
    subtitulo: "Ramas del poder vs Órganos Autónomos (Art. 113)",
    duracion: "26:37",
    foco: "Misión de guarda del interés público"
  },
  {
    id: 3,
    title: "Día 3 - La maquinaria de la Procuraduría colombiana",
    file: "audios/dia 3 La_maquinaria_de_la_Procuraduría_colombiana (1).m4a",
    eje: "estructura",
    ejeNombre: "⚙️ Estructura del Estado y PGN",
    icon: "⚙️",
    subtitulo: "Las cuatro funciones macro",
    duracion: "0:00",
    foco: "Preventiva, Disciplinaria, Intervención y DD.HH."
  },
  {
    id: 4,
    title: "Día 4 - Estructura PGN: El triaje legal",
    file: "audios/dia 4 estructura pgn - El_triaje_legal_de_la_Procuraduría (1).m4a",
    eje: "estructura",
    ejeNombre: "⚙️ Estructura del Estado y PGN",
    icon: "⚙️",
    subtitulo: "Los tres ejes de competencia",
    duracion: "0:00",
    foco: "Vertical, Horizontal y Territorial para asignación de quejas"
  },
  {
    id: 5,
    title: "Radiografía del sistema operativo del Estado colombiano",
    file: "audios/Radiografía_del_sistema_operativo_del_Estado_colombiano (1).m4a",
    eje: "administrativo",
    ejeNombre: "📋 Derecho Administrativo (CPACA)",
    icon: "📋",
    subtitulo: "Artículo 3 de la Ley 1437",
    duracion: "0:00",
    foco: "Celeridad, Eficacia e Imparcialidad"
  },
  {
    id: 6,
    title: "Cómo evitar un hallazgo fiscal",
    file: "audios/Cómo_evitar_un_hallazgo_fiscal (1).m4a",
    eje: "funcional",
    ejeNombre: "💰 Temas Funcionales Especializados",
    icon: "💰",
    subtitulo: "Ley 80 y 1150 | Contratación Estatal",
    duracion: "0:00",
    foco: "Transparencia en planeación y Contratos de Prestación de Servicios"
  },
  {
    id: 7,
    title: "Las reglas del presupuesto público colombiano",
    file: "audios/Las_reglas_del_presupuesto_público_colombiano (1).m4a",
    eje: "funcional",
    ejeNombre: "💰 Temas Funcionales Especializados",
    icon: "💰",
    subtitulo: "Decreto 111 de 1996",
    duracion: "24:52",
    foco: "CDP, RP y PAC | Gestión financiera"
  },
  {
    id: 8,
    title: "Claves para el concurso de la Procuraduría",
    file: "audios/Claves_para_el_concurso_de_la_Procuraduría (1).m4a",
    eje: "estrategia",
    ejeNombre: "🎯 Estrategia de Prueba",
    icon: "🎯",
    subtitulo: "Componente psicométrico",
    duracion: "25:32",
    foco: "Preguntas de 'Suma 3' | Nivel A vs Nivel B"
  },
  {
    id: 9,
    title: "Estrategia psicométrica para el examen PGN",
    file: "audios/Estrategia_psicométrica_para_el_examen_PGN.m4a",
    eje: "estrategia",
    ejeNombre: "🎯 Estrategia de Prueba",
    icon: "🎯",
    subtitulo: "Evitar la 'trampa de la operatividad'",
    duracion: "0:00",
    foco: "Estrategia para preguntas de comportamiento"
  }
];

const STORAGE_KEYS = {
  progress: "pgn-study-progress",
  current: "pgn-study-current",
  theme: "pgn-study-theme",
  speed: "pgn-study-speed"
};

let currentAudio = null;
let currentEpisode = null;
let currentEje = "all";
let isPlaying = false;
let progressData = JSON.parse(localStorage.getItem(STORAGE_KEYS.progress) || "{}");
let sleepTimeout = null;

const episodesListEl = document.getElementById("episodesList");
const playerEl = document.getElementById("player");
const audioEl = document.getElementById("audioPlayer");
const currentTitleEl = document.getElementById("currentTitle");
const currentSubtituloEl = document.getElementById("currentSubtitulo");
const currentFocoEl = document.getElementById("currentFoco");
const playerEjeBadgeEl = document.getElementById("playerEjeBadge");
const artworkEmojiEl = document.getElementById("artworkEmoji");
const playPauseBtn = document.getElementById("playPauseBtn");
const progressBar = document.getElementById("progressBar");
const currentTimeEl = document.getElementById("currentTime");
const durationEl = document.getElementById("duration");
const closePlayerBtn = document.getElementById("closePlayerBtn");
const rewindBtn = document.getElementById("rewindBtn");
const forwardBtn = document.getElementById("forwardBtn");
const toastEl = document.getElementById("toast");
const continueBannerEl = document.getElementById("continueBanner");
const continueTitleEl = document.getElementById("continueTitle");
const continueBtnEl = document.getElementById("continueBtn");
const progressCountEl = document.getElementById("progressCount");
const statsBarFillEl = document.getElementById("statsBarFill");
const themeToggleBtn = document.getElementById("themeToggle");
const miniPlayerEl = document.getElementById("miniPlayer");
const miniArtworkEl = document.getElementById("miniArtwork");
const miniTitleEl = document.getElementById("miniTitle");
const miniProgressFillEl = document.getElementById("miniProgressFill");
const miniPlayBtn = document.getElementById("miniPlayBtn");
const miniExpandBtn = document.getElementById("miniExpandBtn");
const sleepModalEl = document.getElementById("sleepModal");
const sleepTimerBtn = document.getElementById("sleepTimerBtn");
const cancelSleepBtn = document.getElementById("cancelSleep");
const waveBarsEl = document.getElementById("waveBars");

function init() {
  renderWaveBars();
  applySavedTheme();
  renderizarLista();
  bindTabs();
  bindControls();
  bindSpeedControls();
  bindSleepTimer();
  restoreLastEpisode();
  updateContinueBanner();
  updateGlobalProgress();
}

function filtrarEpisodios() {
  return currentEje === "all" ? episodes : episodes.filter(ep => ep.eje === currentEje);
}

function getBadgeClass(eje) {
  const map = {
    constitucion: "badge-constitucion",
    estructura: "badge-estructura",
    administrativo: "badge-administrativo",
    funcional: "badge-funcional",
    estrategia: "badge-estrategia"
  };
  return map[eje] || "";
}

function getProgress(epId) {
  return progressData[epId] || { currentTime: 0, duration: 0, percent: 0, completed: false };
}

function formatTime(sec) {
  if (!isFinite(sec) || sec < 0) return "0:00";
  const minutes = Math.floor(sec / 60);
  const seconds = Math.floor(sec % 60).toString().padStart(2, "0");
  return `${minutes}:${seconds}`;
}

function renderizarLista() {
  const filtrados = filtrarEpisodios();
  episodesListEl.innerHTML = "";

  if (!filtrados.length) {
    episodesListEl.innerHTML = `<div class="empty-state">No hay episodios para este filtro.</div>`;
    return;
  }

  const agrupados = {};
  filtrados.forEach(ep => {
    if (!agrupados[ep.eje]) agrupados[ep.eje] = { nombre: ep.ejeNombre, episodios: [] };
    agrupados[ep.eje].episodios.push(ep);
  });

  Object.values(agrupados).forEach(grupo => {
    const header = document.createElement("div");
    header.className = "section-header";
    header.textContent = grupo.nombre;
    episodesListEl.appendChild(header);

    grupo.episodios.forEach(ep => {
      const p = getProgress(ep.id);
      const card = document.createElement("article");
      card.className = `episode-card ${currentEpisode?.id === ep.id ? "is-active" : ""}`;
      card.setAttribute("data-id", ep.id);
      card.setAttribute("aria-label", `Reproducir ${ep.title}`);

      card.innerHTML = `
        <div class="episode-icon">${ep.icon}</div>
        <div class="episode-info">
          <div class="episode-topline">
            <span class="eje-badge ${getBadgeClass(ep.eje)}">${ep.ejeNombre}</span>
          </div>
          <h3 class="episode-title">${ep.title}</h3>
          <p class="episode-subtitle">${ep.subtitulo}</p>
          <p class="episode-focus">${ep.foco}</p>
          <div class="episode-footer">
            <span class="episode-duration">${p.duration ? `${Math.round(p.percent)}% escuchado` : ep.duracion}</span>
          </div>
          <div class="card-progress">
            <div class="card-progress-fill" style="width:${p.percent || 0}%"></div>
          </div>
        </div>
        <div class="play-indicator">${currentEpisode?.id === ep.id && isPlaying ? "❚❚" : "▶"}</div>
      `;

      card.addEventListener("click", () => loadEpisode(ep, true));
      episodesListEl.appendChild(card);
    });
  });
}

function loadEpisode(ep, autoplay = false, resumeFromSaved = true) {
  currentEpisode = ep;
  currentAudio = ep.file;
  audioEl.src = ep.file;
  currentTitleEl.textContent = ep.title;
  currentSubtituloEl.textContent = ep.subtitulo;
  currentFocoEl.textContent = ep.foco;
  currentFocoEl.classList.remove("hidden");
  playerEjeBadgeEl.textContent = ep.ejeNombre;
  artworkEmojiEl.textContent = ep.icon || "🎙️";
  miniArtworkEl.textContent = ep.icon || "🎙️";
  miniTitleEl.textContent = ep.title;

  playerEl.classList.remove("hidden");
  miniPlayerEl.classList.remove("hidden");

  saveCurrentEpisodeMeta(ep.id);

  audioEl.addEventListener("loadedmetadata", () => {
    durationEl.textContent = formatTime(audioEl.duration);
    const saved = getProgress(ep.id);

    if (resumeFromSaved && saved.currentTime && saved.currentTime < audioEl.duration - 5) {
      audioEl.currentTime = saved.currentTime;
      progressBar.value = saved.percent || 0;
      currentTimeEl.textContent = formatTime(saved.currentTime);
    } else {
      progressBar.value = 0;
      currentTimeEl.textContent = "0:00";
    }
  }, { once: true });

  if (autoplay) {
    playAudio();
  } else {
    pauseAudio(false);
  }

  renderizarLista();
}

function playAudio() {
  if (!audioEl.src) {
    showToast("Selecciona un audio primero");
    return;
  }
  audioEl.play()
    .then(() => {
      isPlaying = true;
      playPauseBtn.textContent = "❚❚";
      miniPlayBtn.textContent = "❚❚";
      document.body.classList.add("is-playing");
    })
    .catch(() => {
      showToast("No se pudo reproducir el audio");
    });
}

function pauseAudio(updateState = true) {
  audioEl.pause();
  if (updateState) isPlaying = false;
  playPauseBtn.textContent = "▶";
  miniPlayBtn.textContent = "▶";
  document.body.classList.remove("is-playing");
}

function togglePlayPause() {
  if (!audioEl.src && episodes.length) {
    loadEpisode(episodes[0], true, false);
    return;
  }
  if (audioEl.paused) playAudio();
  else {
    isPlaying = false;
    pauseAudio();
  }
  renderizarLista();
}

function saveProgress() {
  if (!currentEpisode || !isFinite(audioEl.duration) || audioEl.duration <= 0) return;

  const percent = (audioEl.currentTime / audioEl.duration) * 100;
  progressData[currentEpisode.id] = {
    currentTime: audioEl.currentTime,
    duration: audioEl.duration,
    percent,
    completed: percent >= 95
  };

  localStorage.setItem(STORAGE_KEYS.progress, JSON.stringify(progressData));
  saveCurrentEpisodeMeta(currentEpisode.id);
  updateContinueBanner();
  updateGlobalProgress();
}

function saveCurrentEpisodeMeta(id) {
  localStorage.setItem(STORAGE_KEYS.current, JSON.stringify({ id }));
}

function restoreLastEpisode() {
  const savedCurrent = JSON.parse(localStorage.getItem(STORAGE_KEYS.current) || "null");
  if (!savedCurrent?.id) return;
  const ep = episodes.find(item => item.id === savedCurrent.id);
  if (!ep) return;
  continueTitleEl.textContent = ep.title;
}

function updateContinueBanner() {
  const savedCurrent = JSON.parse(localStorage.getItem(STORAGE_KEYS.current) || "null");
  if (!savedCurrent?.id) {
    continueBannerEl.classList.add("hidden");
    return;
  }

  const ep = episodes.find(item => item.id === savedCurrent.id);
  const progress = ep ? getProgress(ep.id) : null;

  if (!ep || !progress || progress.percent <= 1 || progress.completed) {
    continueBannerEl.classList.add("hidden");
    return;
  }

  continueTitleEl.textContent = `${ep.title} · ${Math.round(progress.percent)}%`;
  continueBannerEl.classList.remove("hidden");
}

function updateGlobalProgress() {
  const completed = Object.values(progressData).filter(item => item.completed).length;
  const percent = (completed / episodes.length) * 100;
  progressCountEl.textContent = `${completed}/${episodes.length} audios completados`;
  statsBarFillEl.style.width = `${percent}%`;
}

function bindTabs() {
  document.querySelectorAll(".tab-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      currentEje = btn.dataset.eje;
      document.querySelectorAll(".tab-btn").forEach(tab => {
        tab.classList.remove("active");
        tab.setAttribute("aria-selected", "false");
      });
      btn.classList.add("active");
      btn.setAttribute("aria-selected", "true");
      renderizarLista();
    });
  });
}

function bindControls() {
  playPauseBtn.addEventListener("click", togglePlayPause);
  miniPlayBtn.addEventListener("click", togglePlayPause);

  rewindBtn.addEventListener("click", () => {
    audioEl.currentTime = Math.max(0, audioEl.currentTime - 10);
    showToast("⏪ -10 segundos");
  });

  forwardBtn.addEventListener("click", () => {
    audioEl.currentTime = Math.min(audioEl.duration || 0, audioEl.currentTime + 10);
    showToast("⏩ +10 segundos");
  });

  closePlayerBtn.addEventListener("click", () => {
    playerEl.classList.add("hidden");
  });

  miniExpandBtn.addEventListener("click", () => {
    playerEl.classList.remove("hidden");
    playerEl.scrollIntoView({ behavior: "smooth", block: "nearest" });
  });

  continueBtnEl.addEventListener("click", () => {
    const savedCurrent = JSON.parse(localStorage.getItem(STORAGE_KEYS.current) || "null");
    if (!savedCurrent?.id) return;
    const ep = episodes.find(item => item.id === savedCurrent.id);
    if (ep) loadEpisode(ep, true, true);
  });

  progressBar.addEventListener("input", () => {
    if (!audioEl.duration) return;
    const targetTime = (progressBar.value / 100) * audioEl.duration;
    audioEl.currentTime = targetTime;
  });

  audioEl.addEventListener("timeupdate", () => {
    if (!audioEl.duration) return;
    const percent = (audioEl.currentTime / audioEl.duration) * 100;
    progressBar.value = percent;
    currentTimeEl.textContent = formatTime(audioEl.currentTime);
    durationEl.textContent = formatTime(audioEl.duration);
    miniProgressFillEl.style.width = `${percent}%`;
    saveProgress();
  });

  audioEl.addEventListener("play", () => {
    isPlaying = true;
    document.body.classList.add("is-playing");
    playPauseBtn.textContent = "❚❚";
    miniPlayBtn.textContent = "❚❚";
    renderizarLista();
  });

  audioEl.addEventListener("pause", () => {
    isPlaying = false;
    document.body.classList.remove("is-playing");
    playPauseBtn.textContent = "▶";
    miniPlayBtn.textContent = "▶";
    renderizarLista();
  });

  audioEl.addEventListener("ended", () => {
    saveProgress();
    showToast("Audio completado");
    renderizarLista();
    updateContinueBanner();
  });

  audioEl.addEventListener("error", () => {
    showToast("Error al cargar el archivo de audio");
  });

  document.addEventListener("visibilitychange", () => {
    saveProgress();
  });

  window.addEventListener("beforeunload", saveProgress);
}

function bindSpeedControls() {
  const savedSpeed = Number(localStorage.getItem(STORAGE_KEYS.speed) || "1");
  audioEl.playbackRate = savedSpeed;

  document.querySelectorAll(".speed-btn").forEach(btn => {
    if (Number(btn.dataset.speed) === savedSpeed) btn.classList.add("active");
    else btn.classList.remove("active");

    btn.addEventListener("click", () => {
      const speed = Number(btn.dataset.speed);
      audioEl.playbackRate = speed;
      localStorage.setItem(STORAGE_KEYS.speed, String(speed));

      document.querySelectorAll(".speed-btn").forEach(b => b.classList.remove("active"));
      btn.classList.add("active");
      showToast(`Velocidad ${speed}×`);
    });
  });
}

function bindSleepTimer() {
  sleepTimerBtn.addEventListener("click", () => {
    sleepModalEl.classList.remove("hidden");
  });

  cancelSleepBtn.addEventListener("click", () => {
    sleepModalEl.classList.add("hidden");
    clearTimeout(sleepTimeout);
    sleepTimeout = null;
    showToast("Sleep timer cancelado");
  });

  document.querySelectorAll(".sleep-opt").forEach(btn => {
    btn.addEventListener("click", () => {
      const minutes = Number(btn.dataset.min);
      sleepModalEl.classList.add("hidden");
      clearTimeout(sleepTimeout);
      sleepTimeout = setTimeout(() => {
        pauseAudio();
        showToast("Sleep timer finalizado");
      }, minutes * 60 * 1000);
      showToast(`Se detendrá en ${minutes} min`);
    });
  });

  sleepModalEl.addEventListener("click", (e) => {
    if (e.target === sleepModalEl) sleepModalEl.classList.add("hidden");
  });
}

function renderWaveBars() {
  waveBarsEl.innerHTML = "";
  for (let i = 0; i < 24; i++) {
    const bar = document.createElement("span");
    bar.className = "wave-bar";
    bar.style.animationDelay = `${i * 0.05}s`;
    bar.style.height = `${8 + (i % 6) * 3}px`;
    waveBarsEl.appendChild(bar);
  }
}

function showToast(message) {
  toastEl.textContent = message;
  toastEl.classList.add("show");
  clearTimeout(showToast._timer);
  showToast._timer = setTimeout(() => {
    toastEl.classList.remove("show");
  }, 2200);
}

function applySavedTheme() {
  const savedTheme = localStorage.getItem(STORAGE_KEYS.theme) || "dark";
  document.body.classList.toggle("light-theme", savedTheme === "light");
  themeToggleBtn.textContent = savedTheme === "light" ? "☀️" : "🌙";

  themeToggleBtn.addEventListener("click", () => {
    const isLight = document.body.classList.toggle("light-theme");
    localStorage.setItem(STORAGE_KEYS.theme, isLight ? "light" : "dark");
    themeToggleBtn.textContent = isLight ? "☀️" : "🌙";
    showToast(`Tema ${isLight ? "claro" : "oscuro"} activado`);
  });
}

// ===== MEJORAS PARA SCROLL EN PC =====
(function initTabsScroll() {
  const tabsContainer = document.getElementById('tabsContainer');
  const scrollLeftBtn = document.getElementById('scrollLeftBtn');
  const scrollRightBtn = document.getElementById('scrollRightBtn');
  
  if (!tabsContainer) return;
  
  // Scroll con rueda del mouse (horizontal)
  tabsContainer.addEventListener('wheel', (e) => {
    if (e.deltaY !== 0) {
      e.preventDefault();
      tabsContainer.scrollLeft += e.deltaY;
    }
  }, { passive: false });
  
  // Función para scroll suave
  const scrollTabs = (direction) => {
    const scrollAmount = 300;
    if (direction === 'left') {
      tabsContainer.scrollLeft -= scrollAmount;
    } else {
      tabsContainer.scrollLeft += scrollAmount;
    }
  };
  
  // Botones de flecha
  if (scrollLeftBtn) {
    scrollLeftBtn.addEventListener('click', () => scrollTabs('left'));
  }
  if (scrollRightBtn) {
    scrollRightBtn.addEventListener('click', () => scrollTabs('right'));
  }
  
  // Actualizar visibilidad de flechas según scroll
  const updateArrowsVisibility = () => {
    if (!scrollLeftBtn || !scrollRightBtn) return;
    const maxScroll = tabsContainer.scrollWidth - tabsContainer.clientWidth;
    scrollLeftBtn.style.opacity = tabsContainer.scrollLeft > 0 ? '1' : '0.3';
    scrollRightBtn.style.opacity = tabsContainer.scrollLeft < maxScroll - 5 ? '1' : '0.3';
  };
  
  tabsContainer.addEventListener('scroll', updateArrowsVisibility);
  window.addEventListener('resize', updateArrowsVisibility);
  setTimeout(updateArrowsVisibility, 100);
})();

init();