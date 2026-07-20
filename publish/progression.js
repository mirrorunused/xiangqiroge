window.XQ = window.XQ || {};

window.XQ.Progression = (() => {
  function ensure(state) {
    const t = state.talents || (state.talents = {});
    t.chessStage = t.chessStage || 0;
    t.chess = Object.assign({ S: false, Q: false }, t.chess || {});
    t.outerTempoOffer = Boolean(t.outerTempoOffer);
    t.outerTempoNotice = Boolean(t.outerTempoNotice);
    t.randomModeUnlocked = Boolean(t.randomModeUnlocked || t.captureGalleryUnlocked);
    t.shopUnlocks = Object.assign({ rabbitFoot: false, turtleShell: false, advisorStride: false, horseSale: false, endure: false, charmMakeup: false }, t.shopUnlocks || {});
    const rebelLevel = Math.max(state.mode === "rebel" ? state.level || 1 : 1, state.bestRecords?.rebel?.level || 1);
    if (rebelLevel > 15) unlockStoryGalleries(state);
    window.XQ.Achievements?.ensure?.(state);
    return t;
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
    if (state.mode !== "random") window.XQ.OuterItems.clearRunTempo(state);
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

  return { ensure, failRun, finishRun, resetOuterUnlocks, unlockComboShop, unlockStoryGalleries, unlockTempo };
})();
