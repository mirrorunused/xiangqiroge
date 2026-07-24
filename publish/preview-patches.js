window.XQ = window.XQ || {};

(() => {
  let render;
  let fx;
  let storyVoice;
  let levelDetailState;

  function isComboState(state) {
    if (!state) return false;
    if (state.currentComboId) return true;
    if ([
      state.enemyTurtle, state.enemyRabbit, state.enemyDivine, state.enemyCollapse,
      state.enemyFish, state.enemyEunuch, state.enemyHorse, state.enemyCharm,
      state.enemyCorruption, state.enemyMusic, state.enemyReinforcement,
      state.enemyIncense, state.enemyMomentum, state.enemyKarma,
      state.enemyLinkedBranches, state.enemySacrifice,
    ].some(Boolean)) return true;
    const level = Number(state.level);
    const count = window.XQ.ComboOrder?.fixedIds?.().length || 20;
    if (!Number.isFinite(level)) return false;
    if (["rebel", "random", "recruit"].includes(state.mode)) return level >= 16 && level < 16 + count;
    const base = window.XQ.EnemyStages?.lateBase?.(window.XQ.Config?.blackAddOrder?.length);
    return state.mode === "normal" && Number.isFinite(base) && level >= base + 8 && level < base + 8 + count;
  }

  function syncComboLayout(state) {
    document.querySelector(".game-shell")?.classList.toggle("combo-active", isComboState(state));
    window.XQ.BoardLayout?.fit?.();
  }

  function syncIncensePieces(state) {
    const tiles = new Set((state?.incenseTiles || []).map((tile) => `${tile.x},${tile.y}`));
    (document.querySelectorAll?.(".piece") || []).forEach((node) => {
      const piece = state?.board?.find((entry) => entry.id === node.dataset.pieceId);
      node.classList.toggle("incense-covered", Boolean(piece && tiles.has(`${piece.x},${piece.y}`)));
    });
  }

  function cooldown(value) {
    const turns = Math.max(0, Number(value) || 0);
    return turns > 0 ? `冷却 ${turns} 回合` : "就绪";
  }

  function periodic(value, interval) {
    return interval - (Math.max(0, Number(value) || 0) % interval);
  }

  function enhanceLevelCards(cards, state) {
    if (!Array.isArray(cards) || !state) return cards;
    return cards.map((entry) => {
      const card = { ...entry };
      if (card.id === "turtle") {
        const effect = state.enemyTurtle;
        const status = effect.shield > 0
          ? `无敌剩余 ${effect.shield} 回合；再次触发${cooldown(effect.cooldown)}`
          : cooldown(effect.cooldown);
        card.text = `黑将被吃时取消本次吃将，进入 3 回合无敌，9 回合后可再次龟缩。当前状态：${status}。`;
      }
      if (card.id === "rabbit") card.text = `黑方棋子被吃时，若后方一格为空，则后退避开吃子，触发后冷却 4 回合。当前状态：${cooldown(state.enemyRabbit.cooldown)}。`;
      if (card.id === "corruption") card.text = `红方吃子后会倒戈并交出对应道具，触发后冷却 3 回合。当前状态：${cooldown(state.enemyCorruption.cooldown)}。`;
      if (card.id === "charm-blade") card.text = `媚阵生效；每个红方回合刷新 3 个持续一回合的魅惑格。红帅不能进入魅惑格；其他红子每次进入后倒戈，黑方仅夺取 1 个对应的非消耗品道具。当前魅惑格：${(state.charmTiles || []).length} 个。`;
      if (card.id === "fish") card.text = `开局生成草；之后每 5 次红方行动追加生成，草会阻隔行棋且双方均可吃。距离下次生成：${periodic(state.enemyFish.turns, 5)} 回合。`;
      if (card.id === "music") card.text = `每 3 回合随机控制红方非帅棋子一回合，受控棋子保留红方道具加成；第 6 回合起每次控制两枚。距离下次发动：${periodic(state.enemyMusic.turns, 3)} 回合。`;
      if (card.id === "reinforcement") {
        const turns = Math.max(0, Number(state.enemyReinforcement.turns) || 0);
        const wait = turns < 3 ? 3 - turns : (turns - 3) % 2 === 0 ? 2 : 1;
        card.text = `第 3 回合起每 2 回合随机增兵，数量从 1 枚逐步提升至 3 枚，兵种质量同步升级且皇后权重最低。当前第 ${state.enemyReinforcement.waves || 0} 波，距离下次增援：${wait} 回合。`;
      }
      if (card.id === "incense") card.text = `开局及每 2 回合生成逐步扩张的香阵，次回合保留一半；阵内红子不能移动，阵内黑子不能被吃。下回合：${(state.enemyIncense.turns || 0) % 2 === 0 ? "保留一半" : "扩张香阵"}。`;
      if (card.id === "sacrifice") card.text = `黑方每次吃子均获得随机道具，且黑子可以吃掉己方非将棋子；每 2 回合随机获得一枚棋子。距离下次增兵：${periodic(state.enemySacrifice.turns, 2)} 回合。`;
      return card;
    });
  }

  function installLevelDetail(value) {
    if (!value?.open || value.open.cooldownDetails) return value;
    const original = value.open;
    const wrapped = function wrappedOpen(state, ...args) {
      levelDetailState = state;
      try { return original.call(this, state, ...args); } finally { levelDetailState = null; }
    };
    wrapped.cooldownDetails = true;
    value.open = wrapped;
    return value;
  }

  function definePatched(name, install) {
    let current;
    Object.defineProperty(window.XQ, name, {
      configurable: true, enumerable: true,
      get() { return current; },
      set(value) { current = install(value); },
    });
  }

  window.XQ.UiHints = {
    bind() {
      const button = document.getElementById("uiSwitchBtn");
      if (!button || button.dataset.bound) return;
      button.dataset.bound = "true";
      button.addEventListener("click", () => {
        const lineMode = document.body.classList.toggle("hint-line-mode");
        button.setAttribute("aria-pressed", String(lineMode));
      });
    },
  };

  function installRender(value) {
    if (!value?.showCards || value.showCards.previewViewStyle) return;
    const original = value.showCards;
    const originalUpdate = value.update;
    const originalHide = value.hideRewards;
    const wrapped = function wrappedShowCards(title, ...args) {
      const modal = document.getElementById("rewardModal");
      if (modal) modal.dataset.view = title === "道具图鉴" ? "codex" : "";
      if (title === "本关详情") args[1] = enhanceLevelCards(args[1], levelDetailState);
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
      syncIncensePieces(state);
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

  definePatched("LevelDetail", installLevelDetail);
})();
