window.XQ = window.XQ || {};

window.XQ.MusicLoader = (() => {
  const TRACKS = {
    menu: { url: "./assets/audio/bgm/Lullaby.mp3", bytes: 2500189 },
    battle: { url: "./assets/audio/bgm/knight.mp3", bytes: 2481345 },
  };
  const TOTAL_BYTES = Object.values(TRACKS).reduce((sum, track) => sum + track.bytes, 0);
  const loadedBytes = { menu: 0, battle: 0 };
  const sources = {};
  let menuPromise = null, battlePromise = null, allPromise = null;
  let backgroundActive = false, playbackActive = false, scheduled = false;
  let hideTimer = 0;
  const $ = (id) => document.getElementById(id);

  function show() {
    clearTimeout(hideTimer);
    $("musicLoadingStatus")?.classList.remove("hidden");
  }

  function hideSoon() {
    clearTimeout(hideTimer);
    hideTimer = setTimeout(() => {
      if (!backgroundActive && !playbackActive) $("musicLoadingStatus")?.classList.add("hidden");
    }, 650);
  }

  function renderProgress() {
    const loaded = Object.values(loadedBytes).reduce((sum, value) => sum + value, 0);
    const percent = Math.min(100, Math.round((loaded / TOTAL_BYTES) * 100));
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
        renderProgress();
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
        renderProgress();
      }
      loadedBytes[id] = track.bytes;
      renderProgress();
      const type = response.headers.get("content-type") || "audio/mpeg";
      return URL.createObjectURL(new Blob(chunks, { type }));
    } catch (err) {
      console.warn("background music preload failed:", id, err.message);
      loadedBytes[id] = track.bytes;
      renderProgress();
      return track.url;
    }
  }

  function finish() {
    backgroundActive = false;
    renderProgress();
    if (!playbackActive) hideSoon();
  }

  function start() {
    if (allPromise) return allPromise;
    backgroundActive = true;
    renderProgress();
    menuPromise = loadTrack("menu").then((source) => (sources.menu = source));
    battlePromise = menuPromise.then(() => loadTrack("battle"))
      .then((source) => (sources.battle = source));
    allPromise = Promise.all([menuPromise, battlePromise]).finally(finish);
    return allPromise;
  }

  function ready(id) {
    if (!TRACKS[id]) return Promise.reject(new Error(`Unknown music scene: ${id}`));
    start();
    return id === "menu" ? menuPromise : battlePromise;
  }

  function showPlaybackLoading(active) {
    playbackActive = Boolean(active);
    if (backgroundActive) return;
    if (!playbackActive) return hideSoon();
    show();
    $("musicLoadingStatus")?.classList.add("is-indeterminate");
    if ($("musicLoadingText")) $("musicLoadingText").textContent = "音乐正在缓冲";
    if ($("musicLoadingValue")) $("musicLoadingValue").textContent = "";
  }

  function schedule() {
    if (scheduled || allPromise) return;
    scheduled = true;
    const begin = () => setTimeout(start, 180);
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
