window.XQ = window.XQ || {};

(() => {
  let render;
  let fx;
  let storyVoice;

  function isComboState(state) {
    if (!state) return false;
    if (state.currentComboId) return true;
    if ([
      state.enemyTurtle, state.enemyRabbit, state.enemyDivine, state.enemyCollapse,
      state.enemyFish, state.enemyEunuch, state.enemyHorse, state.enemyCharm,
      state.enemyCorruption, state.enemyMusic, state.enemyReinforcement,
      state.enemyIncense, state.enemyMomentum, state.enemySacrifice,
    ].some(Boolean)) return true;
    const level = Number(state.level);
    const count = window.XQ.ComboOrder?.fixedIds?.().length || 18;
    if (!Number.isFinite(level)) return false;
    if (["rebel", "random"].includes(state.mode)) return level >= 16 && level < 16 + count;
    const base = window.XQ.EnemyStages?.lateBase?.(window.XQ.Config?.blackAddOrder?.length);
    return state.mode === "normal" && Number.isFinite(base) && level >= base + 8 && level < base + 8 + count;
  }

  function syncComboLayout(state) {
    document.querySelector(".game-shell")?.classList.toggle("combo-active", isComboState(state));
    window.XQ.BoardLayout?.fit?.();
  }

  function installRender(value) {
    if (!value?.showCards || value.showCards.previewViewStyle) return;
    const original = value.showCards;
    const originalUpdate = value.update;
    const originalHide = value.hideRewards;
    const wrapped = function wrappedShowCards(title, ...args) {
      const modal = document.getElementById("rewardModal");
      if (modal) modal.dataset.view = title === "道具图鉴" ? "codex" : "";
      const result = original.call(this, title, ...args);
      window.XQ.AudioManager?.showSettings?.(title === "设置");
      return result;
    };
    wrapped.previewViewStyle = true;
    value.showCards = wrapped;
    value.update = function wrappedUpdate(state, ...args) {
      syncComboLayout(state);
      window.XQ.AudioManager?.bindState?.(state);
      const result = originalUpdate.call(this, state, ...args);
      syncComboLayout(state);
      return result;
    };
    value.hideRewards = function wrappedHideRewards(...args) {
      window.XQ.AudioManager?.showSettings?.(false);
      return originalHide.apply(this, args);
    };
  }

  Object.defineProperty(window.XQ, "Render", {
    configurable: true,
    enumerable: true,
    get() { return render; },
    set(value) {
      render = value;
      installRender(value);
    },
  });

  Object.defineProperty(window.XQ, "FX", {
    configurable: true,
    enumerable: true,
    get() { return fx; },
    set(value) {
      if (fx?.volumeAware && !value?.volumeAware) return;
      fx = value;
    },
  });

  Object.defineProperty(window.XQ, "StoryVoice", {
    configurable: true,
    enumerable: true,
    get() { return storyVoice; },
    set(value) {
      if (storyVoice?.volumeAware && !value?.volumeAware) return;
      storyVoice = value;
    },
  });
})();
