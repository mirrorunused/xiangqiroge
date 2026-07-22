window.XQ = window.XQ || {};

window.XQ.StoryVoice = (() => {
  const BASE_PATH = "./assets/audio/story/";
  const ASSET_VERSION = "20260722-1";
  const audio = new Audio();
  let currentId = "";
  let requestId = 0;
  let initialized = false;
  let unlocked = false;
  let voiceVolume = 1;

  audio.preload = "none";

  function init() {
    if (initialized) return;
    initialized = true;
    document.getElementById("captureVoiceBtn")?.addEventListener("click", toggle);
    document.addEventListener("pointerdown", unlock, { capture: true, once: true });
    audio.addEventListener("playing", () => update("pause"));
    audio.addEventListener("pause", () => {
      if (!audio.ended && currentId) update("play");
    });
    audio.addEventListener("ended", () => update("play"));
    audio.addEventListener("error", () => update("error"));
    update("hidden");
  }

  function prepare(id) {
    stop();
    currentId = validId(id) ? id : "";
    update(currentId ? "play" : "hidden");
  }

  async function playCurrent(automatic = false) {
    if (!currentId) return false;
    const playId = ++requestId;
    const src = `${BASE_PATH}${currentId}.mp3?v=${ASSET_VERSION}`;
    if (audio.dataset.voiceId !== currentId) {
      audio.src = src;
      audio.dataset.voiceId = currentId;
    }
    update("loading");
    try {
      audio.muted = false;
      audio.volume = Math.min(1, voiceVolume);
      await audio.play();
      if (playId !== requestId) return false;
      update("pause");
      return true;
    } catch (err) {
      if (playId !== requestId) return false;
      console.warn("story voice failed:", err?.name || "unknown", err?.message || "");
      update(automatic ? "play" : "error");
      return false;
    }
  }

  function toggle() {
    if (!currentId) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    playCurrent(false);
  }

  function stop() {
    requestId += 1;
    audio.pause();
    try {
      audio.currentTime = 0;
    } catch (err) {
      console.warn("story voice reset failed:", err.message);
    }
  }

  async function unlock(event) {
    if (unlocked) return;
    unlocked = true;
    if (event.target?.closest?.("#captureVoiceBtn")) return;
    try {
      audio.muted = true;
      audio.src = `${BASE_PATH}capture-p.mp3`;
      audio.dataset.voiceId = "";
      await audio.play();
      audio.pause();
      audio.currentTime = 0;
      audio.removeAttribute("src");
      audio.load();
    } catch (err) {
      console.warn("story voice unlock failed:", err?.name || "unknown", err?.message || "");
    } finally {
      audio.muted = false;
    }
  }

  function update(state) {
    const button = document.getElementById("captureVoiceBtn");
    const status = document.getElementById("captureVoiceStatus");
    if (!button || !status) return;
    button.classList.toggle("hidden", state === "hidden");
    button.disabled = state === "loading";
    button.setAttribute("aria-pressed", String(state === "pause"));
    const labels = {
      play: ["▶ 朗读", "离线语音"],
      pause: ["Ⅱ 暂停", "正在朗读"],
      loading: ["… 加载", "正在准备语音"],
      error: ["↻ 重试", "语音加载失败"],
      hidden: ["▶ 朗读", ""],
    };
    [button.textContent, status.textContent] = labels[state] || labels.play;
  }

  function validId(id) {
    return typeof id === "string" && /^[a-z0-9-]+$/.test(id);
  }

  function setVolume(value) {
    voiceVolume = Math.min(2.25, Math.max(0, Number(value) || 0));
    audio.volume = Math.min(1, voiceVolume);
  }

  return { init, playCurrent, prepare, setVolume, stop, volumeAware: true };
})();
