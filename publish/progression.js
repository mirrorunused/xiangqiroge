window.XQ = window.XQ || {};

window.XQ.Progression = (() => {
  function ensure(state) {
    const t = state.talents || (state.talents = {});
    t.chessStage = t.chessStage || 0;
    t.chess = Object.assign({ S: false, Q: false }, t.chess || {});
    t.outerTempoOffer = Boolean(t.outerTempoOffer);
    t.outerTempoNotice = Boolean(t.outerTempoNotice);
    t.randomModeUnlocked = Boolean(t.randomModeUnlocked || t.captureGalleryUnlocked);
    t.recruitModeUnlocked = Boolean(t.recruitModeUnlocked || t.randomModeUnlocked);
    t.shopUnlocks = Object.assign({ rabbitFoot: false, turtleShell: false, advisorStride: false, horseSale: false, endure: false, charmMakeup: false }, t.shopUnlocks || {});
    t.slotUses = Math.max(0, Math.floor(Number(t.slotUses) || 0));
    t.slotSession = normalizeSlotSession(t.slotSession);
    t.slotStats = Object.assign({ plays: 0, best: 0 }, t.slotStats || {});
    t.slotStats.plays = Math.max(0, Math.floor(Number(t.slotStats.plays) || 0));
    t.slotStats.best = Math.max(0, Math.floor(Number(t.slotStats.best) || 0));
    const rebelLevel = Math.max(state.mode === "rebel" ? state.level || 1 : 1, state.bestRecords?.rebel?.level || 1);
    if (rebelLevel > 15) unlockStoryGalleries(state);
    window.XQ.Achievements?.ensure?.(state);
    return t;
  }

  function normalizeSlotSession(session) {
    if (!session || typeof session !== "object" || !Array.isArray(session.pool) || !session.pool.length) return null;
    session.spin = Math.min(999, Math.max(0, Math.floor(Number(session.spin) || 0)));
    const fallbackRisk = session.spin >= 10 ? Math.min(60, 5 + (session.spin - 9) * 5) : 5;
    session.riskChance = Math.min(60, Math.max(5, Math.floor(Number(session.riskChance) || fallbackRisk)));
    session.total = Math.max(0, Math.floor(Number(session.total) || 0));
    session.lastPoints = Math.max(0, Math.floor(Number(session.lastPoints) || 0));
    session.grid = Array.isArray(session.grid) ? session.grid.slice(0, 9) : [];
    session.choices = Array.isArray(session.choices) ? session.choices.slice(0, 3) : [];
    session.details = Array.isArray(session.details) ? session.details.slice(0, 8) : [];
    if (session.phase === "complete") session.phase = "escape";
    session.phase = ["ready", "choice", "escape"].includes(session.phase) ? session.phase : "ready";
    if (session.spin >= 10 && session.phase === "ready") session.phase = "escape";
    if (session.phase === "choice" && !session.choices.length) session.phase = session.spin >= 10 ? "escape" : "ready";
    return session;
  }

  function finishRun(state) {
    const t = ensure(state);
    const unlocked = [];
    if (t.chessStage < 1) unlocked.push(...window.XQ.Achievements.complete(state, "bishop"));
    else if (t.chessStage < 2) unlocked.push(...window.XQ.Achievements.complete(state, "queen"));
    return unlocked;
  }

  function unlockTempo(state) {
    return window.XQ.Achievements.complete(state, "firstDefeat");
  }

  function unlockStoryGalleries(state) {
    if (state.mode !== "rebel" && (state.bestRecords?.rebel?.level || 1) <= 15) return [];
    return window.XQ.Achievements.complete(state, "rebelRescue");
  }

  function unlockComboShop(state) {
    ensure(state);
    return window.XQ.Achievements.completeCombo(state);
  }

  function failRun(state) {
    ensure(state);
    const unlocked = unlockTempo(state).concat(finishRun(state));
    if (!window.XQ.RandomMode?.is?.(state)) window.XQ.OuterItems.clearRunTempo(state);
    state.keepUids = state.keepUids || [];
    return unlocked;
  }

  function resetOuterUnlocks(state) {
    const t = ensure(state);
    t.retain = 0;
    t.outerItems = [];
    t.outerTempoOffer = false;
    t.outerTempoNotice = false;
    t.chessStage = 0;
    t.chess = { S: false, Q: false };
    if (t.achievements?.completed) {
      delete t.achievements.completed.firstDefeat;
      delete t.achievements.completed.bishop;
      delete t.achievements.completed.queen;
    }
    state.keepUids = [];
    state.rebelOuterUid = null;
  }

  function grantSlotUse(state, amount = 1) {
    const t = ensure(state);
    t.slotUses += Math.max(0, Math.floor(Number(amount) || 0));
    return t.slotUses;
  }

  return { ensure, failRun, finishRun, grantSlotUse, resetOuterUnlocks, unlockComboShop, unlockStoryGalleries, unlockTempo };
})();
