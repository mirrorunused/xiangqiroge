window.XQ = window.XQ || {};

window.XQ.StateOps = (() => {
  const R = window.XQ.Rules;
  const L = window.XQ.Levels;
  const D = window.XQ.Drops;

  function beginLevel(state) {
    window.XQ.RandomMode.beforeLevel(state);
    window.XQ.QuickMode.beforeLevel(state);
    state.levelStartCapturedRed = clonePieces(state.capturedRed);
    L.startLevel(state);
    if (window.XQ.RandomPlacement.active(state)) return;
    window.XQ.Fish?.startLevel?.(state);
    D.start(state);
    window.XQ.Collapse?.startLevel?.(state);
    window.XQ.RoundEffects?.startLevel?.(state);
  }

  function restartLevel(state) {
    state.capturedRed = clonePieces(state.levelStartCapturedRed);
    window.XQ.RandomMode.restoreLevelStart(state);
    beginLevel(state);
  }

  function snapshot(state) {
    state.history.push({
      score: state.score,
      scoreMult: state.scoreMult,
      baseReward: state.baseReward,
      levelStartScore: state.levelStartScore,
      items: state.items.map((item) => ({ ...item })),
      board: R.clone(state.board),
      side: state.side,
      playerMovesLeft: state.playerMovesLeft,
      lastMove: state.lastMove,
      fieldItems: state.fieldItems.map((i) => ({ ...i })),
      capturedRed: state.capturedRed.map((i) => ({ ...i })),
      enemyFrozen: state.enemyFrozen,
      playerFrozen: state.playerFrozen,
      enemyTraits: { ...state.enemyTraits },
      enemyTurtle: state.enemyTurtle ? { ...state.enemyTurtle } : null,
      enemyRabbit: state.enemyRabbit ? { ...state.enemyRabbit } : null,
      enemyDivine: state.enemyDivine ? { ...state.enemyDivine } : null,
      enemyCollapse: state.enemyCollapse ? { ...state.enemyCollapse } : null,
      enemyFish: state.enemyFish ? { ...state.enemyFish } : null,
      enemyEunuch: Boolean(state.enemyEunuch),
      enemyHorse: state.enemyHorse || 0,
      enemyCharm: state.enemyCharm ? { ...state.enemyCharm } : null,
      enemyCorruption: state.enemyCorruption ? { ...state.enemyCorruption } : null,
      enemyMusic: state.enemyMusic ? { ...state.enemyMusic, controlledIds: [...(state.enemyMusic.controlledIds || [])] } : null,
      enemyReinforcement: state.enemyReinforcement ? { ...state.enemyReinforcement } : null,
      enemyIncense: state.enemyIncense ? { ...state.enemyIncense } : null,
      enemySacrifice: state.enemySacrifice ? { ...state.enemySacrifice } : null,
      enemyBonusMoves: state.enemyBonusMoves || 0,
      enemyMovesLeft: state.enemyMovesLeft || 0,
      playerBonusMoves: state.playerBonusMoves || 0,
      meteorPending: Boolean(state.meteorPending),
      meteorActive: Boolean(state.meteorActive),
      meteorPenaltyPending: Boolean(state.meteorPenaltyPending),
      enemyTurnSource: state.enemyTurnSource || null,
      riverFlooded: Boolean(state.riverFlooded),
      captureStorySeen: [...(state.captureStorySeen || [])],
      postRescueStorySeen: [...(state.postRescueStorySeen || [])],
      collapseTiles: (state.collapseTiles || []).map((i) => ({ ...i })),
      charmTiles: (state.charmTiles || []).map((i) => ({ ...i })),
      incenseTiles: (state.incenseTiles || []).map((i) => ({ ...i })),
      morphs: { ...(state.morphs || {}) },
      morphBought: { ...(state.morphBought || {}) },
      pendingRevive: state.pendingRevive,
      pendingDestroy: state.pendingDestroy,
      pendingWeaken: state.pendingWeaken,
      pendingMorph: state.pendingMorph,
      pendingDonate: state.pendingDonate,
      charmMakeupCharges: state.charmMakeupCharges || 0,
      message: state.message,
    });
    if (state.history.length > 3) state.history.shift();
  }

  function restore(state) {
    const old = state.history.pop();
    if (!old) return false;
    Object.assign(state, old);
    state.pendingRevive = null;
    state.selected = null;
    state.previewSelected = null;
    state.legal = [];
    state.phase = "play";
    return true;
  }

  function retainedItems(items) {
    const result = [];
    let multIndex = -1;
    items.forEach((item) => {
      if (item.id !== "mult") result.push(item);
      else if (multIndex < 0) { multIndex = result.length; result.push(item); }
      else if (window.XQ.ItemMult.value(item) > window.XQ.ItemMult.value(result[multIndex])) result[multIndex] = item;
    });
    return result;
  }

  function newRun(current) {
    const limit = current.talents?.retain || 0;
    const picked = current.items.filter((i) => current.keepUids?.includes(i.uid));
    const keep = retainedItems(picked).slice(0, limit);
    const scoreMult = keep.filter((i) => i.id === "mult").reduce((m, i) => Math.max(m, window.XQ.ItemMult.value(i)), 1);
    window.XQ.Mode.updateRecord(current);
    const next = L.baseState({ mode: current.mode, score: current.score, scoreMult, items: keep, talents: current.talents, settings: current.settings, bestRecords: current.bestRecords, captureStorySeen: [], postRescueStorySeen: [] });
    if (current.mode !== "normal") window.XQ.Mode.stripTempo(next);
    next.morphBought = { R: 0, N: 0, C: 0, S: 0, Q: 0 };
    next.morphs = {};
    beginLevel(next);
    return { next, kept: keep.length };
  }

  function toggleKeep(state, uid) {
    const limit = state.talents?.retain || 0;
    if (!uid || limit <= 0 || !state.items.some((item) => item.uid === uid)) return "无法保留该道具";
    state.keepUids = state.keepUids || [];
    if (state.keepUids.includes(uid)) state.keepUids = state.keepUids.filter((id) => id !== uid);
    else if (state.keepUids.length < limit) state.keepUids.push(uid);
    else return "保留栏已满";
    return true;
  }

  function bestOf(best, state) {
    const current = { level: state.level || 1, score: state.score || 0 };
    const old = best || current;
    return current.level > old.level || (current.level === old.level && current.score > old.score) ? current : old;
  }

  function clonePieces(pieces) {
    return (pieces || []).map((piece) => ({ ...piece }));
  }

  return { beginLevel, newRun, restartLevel, restore, snapshot, toggleKeep };
})();
