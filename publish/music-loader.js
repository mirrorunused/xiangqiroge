window.XQ = window.XQ || {};

window.XQ.MusicLoader = (() => {
  const TRACKS = {
    menu: { url: "./assets/audio/bgm/Lullaby.mp3", bytes: 2500189 },
    battle: { url: "./assets/audio/bgm/knight.mp3", bytes: 2481345 },
  };
  const loadedBytes = { menu: 0, battle: 0 };
  const sources = {};
  let menuPromise = null, battlePromise = null;
  let backgroundLoads = 0, playbackActive = false, menuScheduled = false;
  let hideTimer = 0;
  const $ = (id) => document.getElementById(id);

  function show() {
    clearTimeout(hideTimer);
    $("musicLoadingStatus")?.classList.remove("hidden");
  }

  function hideSoon() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!backgroundLoads && !playbackActive) $("musicLoadingStatus")?.classList.add("hidden");
    }, 650);
  }

  function renderProgress(id) {
    const track = TRACKS[id];
    const percent = Math.min(100, Math.round((loadedBytes[id] / track.bytes) * 100));
    show();
    $("musicLoadingStatus")?.classList.remove("is-indeterminate");
    if ($("musicLoadingText")) $("musicLoadingText").textContent = "音乐后台加载";
    if ($("musicLoadingValue")) $("musicLoadingValue").textContent = `${percent}%`;
    if ($("musicLoadingBar")) $("musicLoadingBar").style.width = `${percent}%`;
    $("musicLoadingTrack")?.setAttribute("aria-valuenow", String(percent));
  }

  async function loadTrack(id) {
    const track = TRACKS[id];
    try {
      const response = await fetch(track.url, { cache: "force-cache" });
      if (!response.ok) throw new Error(`HTTP ${response.status}`);
      if (!response.body?.getReader) {
        const blob = await response.blob();
        loadedBytes[id] = track.bytes;
        renderProgress(id);
        return URL.createObjectURL(blob);
      }
      const reader = response.body.getReader();
      const chunks = [];
      let received = 0;
      for (;;) {
        const { done, value } = await reader.read();
        if (done) break;
        chunks.push(value);
        received += value.byteLength;
        loadedBytes[id] = Math.min(track.bytes, received);
        renderProgress(id);
      }
      loadedBytes[id] = track.bytes;
      renderProgress(id);
      const type = response.headers.get("content-type") || "audio/mpeg";
      return URL.createObjectURL(new Blob(chunks, { type }));
    } catch (err) {
      console.warn("background music preload failed:", id, err.message);
      loadedBytes[id] = track.bytes;
      renderProgress(id);
      return track.url;
    }
  }

  async function load(id) {
    backgroundLoads += 1;
    renderProgress(id);
    try {
      sources[id] = await loadTrack(id);
      return sources[id];
    } finally {
      backgroundLoads = Math.max(0, backgroundLoads - 1);
      if (!backgroundLoads && !playbackActive) hideSoon();
    }
  }

  function loadMenu() {
    if (!menuPromise) menuPromise = load("menu");
    return menuPromise;
  }

  function loadBattle() {
    if (!battlePromise) battlePromise = loadMenu().then(() => load("battle"));
    return battlePromise;
  }

  function ready(id) {
    if (!TRACKS[id]) return Promise.reject(new Error(`Unknown music scene: ${id}`));
    return id === "menu" ? loadMenu() : loadBattle();
  }

  function showPlaybackLoading(active) {
    playbackActive = Boolean(active);
    if (backgroundLoads) return;
    if (!playbackActive) return hideSoon();
    show();
    $("musicLoadingStatus")?.classList.add("is-indeterminate");
    if ($("musicLoadingText")) $("musicLoadingText").textContent = "音乐正在缓冲";
    if ($("musicLoadingValue")) $("musicLoadingValue").textContent = "";
  }

  function schedule() {
    if (menuScheduled || menuPromise) return;
    menuScheduled = true;
    const begin = () => setTimeout(loadMenu, 180);
    if (typeof requestIdleCallback === "function") requestIdleCallback(begin, { timeout: 700 });
    else begin();
  }

  function watchMainMenu() {
    const startScreen = $("startScreen");
    if (!startScreen) return;
    const check = () => {
      if (!startScreen.classList.contains("hidden")) schedule();
    };
    check();
    new MutationObserver(check).observe(startScreen, {
      attributes: true,
      attributeFilter: ["class"],
    });
  }

  watchMainMenu();
  return { has: (id) => Boolean(TRACKS[id]), ready, schedule, showPlaybackLoading };
})();
