window.XQ = window.XQ || {};
window.XQ.AudioManager = (() => {
  const DEFAULTS = { master: 1, music: 1, voice: 1, musicMuted: false };
  const MAX_VOLUME = 1.5, MUSIC_GAIN = 0.33;
  const audio = new Audio(); let state = null, values = { ...DEFAULTS }, scene = "menu";
  let unlocked = false, audioCtx = null, playRequest = 0, errorNotified = false, bufferingTimer = 0;
  const $ = (id) => document.getElementById(id);
  audio.loop = true; audio.preload = "none";
  ["loadstart", "waiting", "stalled"].forEach((event) => audio.addEventListener(event, () => {
    clearTimeout(bufferingTimer);
    bufferingTimer = setTimeout(() => {
      if (!audio.paused && audio.readyState < 3) setLoading(true);
    }, 600);
  }));
  ["canplay", "playing"].forEach((event) => audio.addEventListener(event, () => {
    clearTimeout(bufferingTimer); setLoading(false);
  }));
  audio.addEventListener("error", () => reportPlaybackError(audio.error));
  function clamp(value, fallbackValue) {
    const number = Number(value);
    return Number.isFinite(number) ? Math.min(MAX_VOLUME, Math.max(0, number)) : fallbackValue;
  }
  function snapPercent(value) {
    const amount = Number(value);
    return Math.abs(amount - 100) <= 5 ? 100 : amount;
  }
  function bindState(nextState) {
    if (!nextState) return;
    state = nextState;
    state.settings = state.settings || {};
    const saved = state.settings.audio || {};
    const legacyDefaults = saved.master === 0.8 && saved.music === 0.55 && (saved.voice ?? 1) === 1;
    values = {
      master: clamp(legacyDefaults ? DEFAULTS.master : saved.master, DEFAULTS.master),
      music: clamp(legacyDefaults ? DEFAULTS.music : saved.music, DEFAULTS.music),
      voice: clamp(saved.voice, DEFAULTS.voice),
      musicMuted: Boolean(saved.musicMuted),
    };
    state.settings.audio = values;
    apply();
  }
  function apply() {
    audio.volume = values.musicMuted ? 0 : values.master * values.music * MUSIC_GAIN;
    window.XQ.StoryVoice?.setVolume?.(values.master * values.voice);
    ["master", "music", "voice"].forEach((key) => {
      const input = $(`${key}Volume`);
      const output = $(`${key}VolumeValue`);
      const amount = Math.round(values[key] * 100);
      if (input && document.activeElement !== input) input.value = String(amount);
      if (output) output.textContent = `${amount}%`;
    });
    updateButtons();
    if (values.musicMuted || audio.volume === 0) {
      playRequest += 1;
      audio.pause();
      setLoading(false);
    } else if (unlocked && document.visibilityState !== "hidden" && audio.paused) {
      void play();
    }
  }
  function setLoading(visible) {
    const active = Boolean(
      visible && unlocked && !values.musicMuted && audio.volume > 0 &&
      document.visibilityState !== "hidden"
    );
    window.XQ.MusicLoader?.showPlaybackLoading?.(active);
    ["menuMusicBtn", "battleMusicBtn"].forEach((id) => {
      $(id)?.setAttribute("aria-busy", String(active));
    });
  }
  function reportPlaybackError(err) {
    setLoading(false);
    console.warn("bgm playback failed:", err?.code || err?.name || "unknown", err?.message || "");
    if (errorNotified) return;
    errorNotified = true;
    window.XQ.Render?.banner?.("背景音乐加载失败");
  }
  function updateButtons() {
    const muted = values.musicMuted || values.master === 0 || values.music === 0;
    ["menuMusicBtn", "battleMusicBtn"].forEach((id) => {
      const button = $(id);
      if (!button) return;
      button.classList.toggle("is-muted", muted);
      button.setAttribute("aria-pressed", String(muted));
      button.setAttribute("aria-label", muted ? "开启背景音乐" : "关闭背景音乐");
      button.title = muted ? "开启背景音乐" : "关闭背景音乐";
    });
  }
  function toggleMusic() {
    if (values.music === 0) {
      values.music = DEFAULTS.music;
      values.musicMuted = false;
    } else {
      values.musicMuted = !values.musicMuted;
    }
    if (state) state.settings.audio = values;
    apply();
    persist();
  }
  function persist() {
    if (!state || !window.XQ.Storage?.queue) return;
    window.XQ.Storage.queue(state, (message) => window.XQ.Render?.banner?.(message));
  }
  function switchScene(next) {
    if (!window.XQ.MusicLoader?.has?.(next) || (scene === next && audio.dataset.scene === next)) return;
    scene = next;
    playRequest += 1;
    errorNotified = false;
    setLoading(false);
    audio.pause();
    if (unlocked) void play();
  }
  async function play() {
    if (!unlocked || values.musicMuted || audio.volume === 0 || document.visibilityState === "hidden") return false;
    const request = ++playRequest;
    errorNotified = false;
    setLoading(true);
    try {
      const source = await window.XQ.MusicLoader.ready(scene);
      if (request !== playRequest) return false;
      if (audio.dataset.scene !== scene) {
        audio.src = source;
        audio.dataset.scene = scene;
      }
      await audio.play();
      if (request === playRequest) setLoading(false);
      return true;
    } catch (err) {
      if (request === playRequest) reportPlaybackError(err);
      return false;
    }
  }
  function context() {
    if (audioCtx) return audioCtx;
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) return null;
    audioCtx = new AudioContext();
    return audioCtx;
  }
  function playTone(freq, seconds, level) {
    const ctx = context();
    if (!ctx || level <= 0) return false;
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    const now = ctx.currentTime;
    osc.type = scene === "menu" ? "sine" : "triangle";
    osc.frequency.setValueAtTime(freq, now);
    gain.gain.setValueAtTime(0.0001, now);
    gain.gain.exponentialRampToValueAtTime(Math.max(0.0002, level), now + 0.025);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + seconds);
    osc.connect(gain).connect(ctx.destination);
    osc.start(now);
    osc.stop(now + seconds + 0.04);
    return true;
  }
  function effectTone(freq, ms) {
    return playTone(freq, Math.max(0.04, ms / 1000), values.master * 0.04);
  }
  function showSettings(visible) {
    $("audioSettingsPanel")?.classList.toggle("hidden", !visible);
    if (visible) apply();
  }
  function init() {
    $("menuMusicBtn")?.addEventListener("click", toggleMusic);
    $("battleMusicBtn")?.addEventListener("click", toggleMusic);
    ["master", "music", "voice"].forEach((key) => {
      const input = $(`${key}Volume`);
      input?.addEventListener("input", () => {
        const amount = snapPercent(input.value);
        input.value = String(amount);
        values[key] = clamp(amount / 100, DEFAULTS[key]);
        if (state) state.settings.audio = values;
        apply();
      });
      input?.addEventListener("change", persist);
    });
    document.addEventListener("pointerdown", () => {
      unlocked = true;
      switchScene($("startScreen")?.classList.contains("hidden") ? "battle" : "menu");
      void play();
    }, { capture: true, once: true });
    document.addEventListener("visibilitychange", () => {
      if (document.visibilityState === "hidden") {
        playRequest += 1;
        audio.pause();
        setLoading(false);
        try { void audioCtx?.suspend(); } catch (_) {}
      } else {
        void play();
      }
    });
    const start = $("startScreen");
    if (start) new MutationObserver(() => switchScene(start.classList.contains("hidden") ? "battle" : "menu"))
      .observe(start, { attributes: true, attributeFilter: ["class"] });
    switchScene(start?.classList.contains("hidden") ? "battle" : "menu");
    apply();
  }
  init();
  return { bindState, effectTone, getSettings: () => ({ ...values }), showSettings, switchScene };
})();
