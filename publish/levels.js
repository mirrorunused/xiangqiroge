window.XQ = window.XQ || {};
window.XQ.Levels = (() => {
  const C = window.XQ.Config;
  function piece(side, type, x, y, index) {
    return { id: `${side}${type}${index}`, side, type, x, y };
  }
  function enemyCount(level) {
    return Math.min(C.blackAddOrder.length, Math.max(0, level - 1));
  }
  function isFullEnemy(level) {
    return enemyCount(level) >= C.blackAddOrder.length;
  }
  function isHard(level) {
    return level > 0 && level % 3 === 0;
  }
  function buildBoard(level, state) {
    let index = 0;
    const board = [];
    if (!window.XQ.RandomMode?.is?.(state)) C.redSetup.forEach(([type, x, y]) => board.push(piece("r", type, x, y, index++)));
    C.blackCore.forEach(([type, x, y]) => board.push(piece("b", type, x, y, index++)));
    C.blackAddOrder.slice(0, enemyCount(level)).forEach(([type, x, y]) => {
      board.push(piece("b", type, x, y, index++));
    });
    if (isFullEnemy(level)) window.XQ.EnemyStages.apply(board, level, C.blackAddOrder.length);
    if (window.XQ.RandomMode?.is?.(state)) return window.XQ.RandomMode.carryBoard(state, board);
    if (state?.mode === "rebel") {
      const lost = new Set((state.capturedRed || []).map((entry) => entry.id));
      return board.filter((entry) => entry.side !== "r" || !lost.has(entry.id));
    }
    return board;
  }
  function baseState(saved) {
    const state = {
      level: 1,
      score: 0, levelStartScore: 0,
      scoreMult: 1,
      items: [],
      board: [],
      selected: null,
      legal: [],
      side: "r",
      playerMovesLeft: 1,
      phase: "play",
      lastMove: null,
      moveRecords: [],
      history: [],
      fieldItems: [],
      capturedRed: [], levelStartCapturedRed: null,
      shop: null, freeRefreshes: 0,
      enemyFrozen: 0, playerFrozen: 0,
      enemyTraits: {}, enemyTurtle: null, enemyRabbit: null, enemyDivine: null, enemyCollapse: null, enemyFish: null, enemyEunuch: false, enemyHorse: 0, enemyCharm: null, enemyCorruption: null, enemyMusic: null, enemyReinforcement: null, enemyIncense: null, enemyKarma: null, enemyLinkedBranches: null, enemySacrifice: null, charmTiles: [], incenseTiles: [], collapseTiles: [], hardNotice: "", tempoNotice: false, tempoDeclined: false, suppressedItemUids: [], dropRefreshLocked: false, currentComboId: null,
      baseReward: 100,
      lastSettlement: null,
      bestRecord: { level: 1, score: 0 },
      talents: { retain: 0, outerItems: [] },
      keepUids: [],
      morphBought: { R: 0, N: 0, C: 0, S: 0, Q: 0 },
      morphs: {},
      pendingMorph: null, pendingRevive: null,
      pendingDestroy: false, pendingWeaken: false, charmMakeupCharges: 0,
      message: "红方行动",
      mode: "normal", battleInProgress: false, rebelOuterUid: null, slotUsePending: false,
      bestRecords: { normal: { level: 1, score: 0 }, rebel: { level: 1, score: 0 }, random: { level: 1, score: 0 }, recruit: { level: 1, score: 0 } },
      settings: { captureStoryMode: "story", rebelDefeatStory: true, rebelEarlyDefeatStory: true },
      captureStorySeen: [], postRescueStorySeen: [], rebelComboOrder: [], randomComboOrder: [],
      enemyBonusMoves: 0, enemyMovesLeft: 0, playerBonusMoves: 0, enemyMomentum: null,
      meteorPending: false, meteorActive: false, meteorPenaltyPending: false, enemyTurnSource: null,
      riverFlooded: false,
      view: { hintCost: 30, maxMoves: 1, scoreMult: 1, levelName: "第 1 关" },
    };
    const merged = Object.assign(state, saved || {});
    merged.talents = Object.assign({ retain: 0, outerItems: [] }, merged.talents || {});
    merged.history = [];
    merged.fieldItems = merged.fieldItems || [];
    merged.capturedRed = merged.capturedRed || [];
    merged.levelStartCapturedRed = (Array.isArray(saved?.levelStartCapturedRed) ? saved.levelStartCapturedRed : merged.capturedRed).map((piece) => ({ ...piece }));
    merged.shop = merged.shop || null; merged.freeRefreshes = merged.freeRefreshes || 0;
    merged.enemyFrozen = merged.enemyFrozen || 0; merged.playerFrozen = merged.playerFrozen || 0;
    merged.enemyTraits = merged.enemyTraits || {}; merged.enemyTurtle = merged.enemyTurtle || null; merged.enemyRabbit = merged.enemyRabbit || null; merged.enemyDivine = merged.enemyDivine || null; merged.enemyCollapse = merged.enemyCollapse || null; merged.enemyFish = merged.enemyFish || null; merged.enemyEunuch = Boolean(merged.enemyEunuch); merged.enemyHorse = merged.enemyHorse || 0; merged.enemyCharm = merged.enemyCharm || null; merged.enemyCorruption = merged.enemyCorruption || null; merged.enemyMusic = merged.enemyMusic || null; merged.enemyReinforcement = merged.enemyReinforcement || null; merged.enemyIncense = merged.enemyIncense || null; merged.enemyKarma = merged.enemyKarma || null; merged.enemyLinkedBranches = merged.enemyLinkedBranches || null; merged.enemySacrifice = merged.enemySacrifice || null; merged.charmTiles = merged.charmTiles || []; merged.incenseTiles = merged.incenseTiles || []; merged.collapseTiles = merged.collapseTiles || []; merged.hardNotice = merged.hardNotice || ""; merged.tempoNotice = Boolean(merged.tempoNotice); merged.tempoDeclined = Boolean(merged.tempoDeclined); merged.suppressedItemUids = merged.suppressedItemUids || []; merged.dropRefreshLocked = Boolean(merged.dropRefreshLocked); merged.currentComboId = merged.currentComboId || null;
    merged.baseReward = typeof merged.baseReward === "number" ? merged.baseReward : 100; merged.levelStartScore = typeof merged.levelStartScore === "number" ? merged.levelStartScore : merged.score || 0;
    merged.bestRecord = merged.bestRecord || { level: merged.level || 1, score: merged.score || 0 };
    merged.keepUids = merged.keepUids || [];
    merged.morphBought = Object.assign({ R: 0, N: 0, C: 0, S: 0, Q: 0 }, merged.morphBought || {});
    merged.morphs = Object.assign({}, merged.morphs || {});
    merged.pendingRevive = merged.pendingRevive || null; merged.pendingDestroy = Boolean(merged.pendingDestroy); merged.pendingWeaken = merged.pendingWeaken || false; merged.pendingDonate = Boolean(merged.pendingDonate); merged.charmMakeupCharges = Math.max(0, merged.charmMakeupCharges || 0);
    merged.settings = Object.assign({ captureStoryMode: "story", rebelDefeatStory: true, rebelEarlyDefeatStory: true }, merged.settings || {});
    merged.captureStorySeen = Array.isArray(merged.captureStorySeen) ? merged.captureStorySeen : []; merged.postRescueStorySeen = Array.isArray(merged.postRescueStorySeen) ? merged.postRescueStorySeen : []; merged.rebelComboOrder = Array.isArray(merged.rebelComboOrder) ? merged.rebelComboOrder : []; merged.randomComboOrder = Array.isArray(merged.randomComboOrder) ? merged.randomComboOrder : [];
    merged.enemyBonusMoves = Math.min(2, Math.max(0, merged.enemyBonusMoves || 0)); merged.enemyMovesLeft = Math.max(0, merged.enemyMovesLeft || 0); merged.playerBonusMoves = Math.min(1, Math.max(0, merged.playerBonusMoves || 0)); merged.enemyMomentum = merged.enemyMomentum || null;
    merged.meteorPending = Boolean(merged.meteorPending); merged.meteorActive = Boolean(merged.meteorActive); merged.meteorPenaltyPending = Boolean(merged.meteorPenaltyPending); merged.enemyTurnSource = merged.enemyTurnSource || null;
    merged.riverFlooded = Boolean(merged.riverFlooded); merged.battleInProgress = Boolean(merged.battleInProgress); merged.slotUsePending = Boolean(merged.slotUsePending); delete merged.playerRiverDebt; delete merged.enemyRiverDebt;
    window.XQ.Meteor?.normalize?.(merged);
    window.XQ.Mode?.ensure?.(merged);
    window.XQ.Progression?.ensure?.(merged);
    window.XQ.Items?.normalize?.(merged);
    window.XQ.Turtle?.sync?.(merged);
    return merged;
  }
  function startLevel(state) {
    state.moveRecords = []; state.riverFlooded = false;
    state.enemyTraits = window.XQ.EnemyTraits.roll(state); state.enemyTurtle = null; state.enemyRabbit = null; state.enemyDivine = null; state.enemyCollapse = null; state.enemyFish = null; state.enemyEunuch = false; state.enemyHorse = 0; state.enemyCharm = null; state.enemyCorruption = null; state.enemyMusic = null; state.enemyReinforcement = null; state.enemyIncense = null; state.enemyKarma = null; state.enemyLinkedBranches = null; state.enemySacrifice = null; state.enemyMomentum = null; state.charmTiles = []; state.incenseTiles = []; state.collapseTiles = []; state.suppressedItemUids = []; state.currentComboId = null;
    state.hardNotice = isHard(state.level) ? `第 ${state.level} 关为强敌关：黑方开局拥有${window.XQ.EnemyTraits.text(state.enemyTraits).replace(" · ", "") || "铁壁营"}。` : "";
    if (state.hardNotice) window.XQ.MoveRecord?.event?.(state, state.hardNotice, "mechanism"); window.XQ.Late?.startLevel?.(state);
    state.board = buildBoard(state.level, state);
    if (state.enemyEunuch) state.board.filter((p) => p.side === "b" && (p.id.startsWith("bP") || p.id.startsWith("bB"))).forEach((p) => { p.type = "A"; });
    if (state.enemyHorse) state.board.filter((p) => p.side === "b" && p.id.startsWith("bP")).slice(0, state.enemyHorse + 1).forEach((p) => { p.type = "N"; });
    window.XQ.Fish?.prepareBoard?.(state);
    applyMorphs(state);
    window.XQ.KingGuard?.refreshDivine?.(state);
    state.side = "r";
    state.selected = null; state.previewSelected = null; state.pendingRevive = null; state.pendingDestroy = false; state.pendingWeaken = false; state.pendingDonate = false; state.pendingMorph = null;
    state.legal = [];
    state.phase = "play"; state.lastMove = null;
    state.history = []; state.fieldItems = []; if (state.mode === "normal") state.capturedRed = []; state.shop = null; state.collapseTiles = state.collapseTiles || [];
    state.enemyFrozen = 0; state.playerFrozen = 0; state.enemyBonusMoves = 0; state.enemyMovesLeft = 0; state.playerBonusMoves = 0; state.rabbitFootCooldown = 0; state.playerTurtle = null; window.XQ.Turtle.sync(state);
    state.baseReward = 100; state.levelStartScore = state.score;
    state.lastSettlement = null;
    state.message = "";
    if (state.mode === "normal" && state.level >= 15 && !state.tempoDeclined && window.XQ.Items.addTempo(state)) state.tempoNotice = true;
    state.playerMovesLeft = hasTempo(state) ? 2 : 1;
    state.message = hasTempo(state) ? "双步虎符：红方可连续走两步" : "红方行动";
    if (state.enemyMomentum) state.message = "盈不可久：红方每次吃子，都会强化黑方下一次行动";
    const meteor = window.XQ.Meteor.startLevel(state); if (meteor) { state.message = meteor; window.XQ.MoveRecord?.event?.(state, meteor, "item"); }
    if (state.randomPlacement) {
      state.phase = "placement";
      window.XQ.RandomPlacement.select(state, state.randomPlacementSelected);
    }
  }

  function applyMorphs(state) {
    Object.keys(state.morphs || {}).forEach((id) => {
      const piece = state.board.find((p) => p.id === id);
      if (piece && piece.side === "r" && piece.type !== "K") piece.type = state.morphs[id];
    });
  }

  function hasTempo(state) {
    if (state.mode !== "normal") return false;
    const outer = window.XQ.Mode.activeOuterItems(state).some((item) => item.id === "tempo");
    const blocked = new Set(state.suppressedItemUids || []);
    const local = (state.items || []).some((item) => item.id === "tempo" && !blocked.has(item.uid));
    return outer || (isFullEnemy(state.level) && local && state.items.length < 25);
  }

  function levelName(state) {
    const prefix = state.mode === "quick" ? "快速挑战" : `第 ${state.level} 关`;
    const flood = state.riverFlooded ? " · 河界汛期" : "";
    if (isFullEnemy(state.level)) return `${prefix}${comboText(state)}${flood} · ${window.XQ.EnemyStages.name(state.level, C.blackAddOrder.length)}${window.XQ.EnemyTraits.text(state.enemyTraits)}`;
    const left = C.blackAddOrder.length - enemyCount(state.level);
    return `${prefix}${comboText(state)}${flood} · ${isHard(state.level) ? "强敌" : "普通"} · 敌军缺 ${left} 子`;
  }

  function comboText(state) {
    const extra = window.XQ.LateExtra?.name?.(state); if (extra) return state.enemyLinkedBranches?.pairLimit ? " · 机制：连枝" : ` · 组合技：${extra}`;
    if (state.enemyCharm?.blade) return " · 组合技：媚骨蚀锋";
    if (state.enemyCharm?.formation) return " · 组合技：媚阵";
    if (state.enemyTurtle) return " · 组合技：龟缩";
    if (state.enemyRabbit) return " · 组合技：兔阵";
    if (state.enemyDivine) return " · 组合技：神选";
    if (state.enemyCollapse) return " · 组合技：崩盘";
    if (state.enemyEunuch) return " · 组合技：宦潮";
    if (state.enemyHorse) return ` · 组合技：纵马${state.enemyHorse}`;
    if (state.enemyFish) return " · 组合技：鱼水";
    return state.enemyMomentum ? " · 盈不可久" : "";
  }

  function bannerMult(state) {
    return (window.XQ.Late?.activeItems?.(state) || state.items)
      .filter((item) => item.id === "banner")
      .reduce((total, item) => total + bannerBonus(item), 1);
  }

  function bannerBonus(item) {
    const value = Number(item?.value);
    if (!Number.isFinite(value)) return 0.08;
    return Math.min(0.25, Math.max(0, value - 1));
  }

  function reduceBase(state, amount) {
    state.baseReward = Math.max(0, Math.round((state.baseReward || 100) - amount));
    return state.baseReward;
  }

  function settle(state) {
    const base = state.baseReward || 0;
    const banner = bannerMult(state);
    const scoreMult = window.XQ.Late ? window.XQ.Late.scoreMult(state) : state.scoreMult || 1;
    const points = Math.round(base * banner * scoreMult);
    state.score += points;
    state.lastSettlement = {
      base,
      banner,
      scoreMult,
      points,
      formula: `${base}（基础）*${banner.toFixed(2)}（破阵旗加算）*${scoreMult.toFixed(2)}（积分倍率）=${points}`,
    };
    return points;
  }

  return { baseState, buildBoard, hasTempo, isFullEnemy, levelName, reduceBase, settle, startLevel };
})();
