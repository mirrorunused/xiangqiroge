window.XQ = window.XQ || {};

window.XQ.StorageData = (() => {
  function clone(value) {
    return JSON.parse(JSON.stringify(value ?? null));
  }

  function packMode(state) {
    window.XQ.Mode?.updateRecord?.(state);
    const data = clone(state);
    delete data.history;
    delete data.moveRecords;
    delete data.legal;
    delete data.selected;
    delete data.previewSelected;
    delete data.view;
    delete data.coreOffline;
    data.savedAt = Date.now();
    return data;
  }

  function packShared(state) {
    window.XQ.Mode?.updateRecord?.(state);
    return {
      score: Math.max(0, Number(state.score) || 0),
      talents: clone(state.talents || {}),
      settings: clone(state.settings || {}),
      bestRecords: clone(state.bestRecords || {}),
      activeMode: window.XQ.Mode.normalizeName(state.mode),
      savedAt: Date.now(),
    };
  }

  function merge(mode, saved, shared) {
    const savedScore = Number(saved?.score) || 0;
    const sharedScore = Number(shared?.score);
    const data = Object.assign({}, clone(saved) || {}, clone(shared) || {});
    data.mode = window.XQ.Mode.normalizeName(mode);
    if (saved && Number.isFinite(sharedScore)) {
      const delta = sharedScore - savedScore;
      data.levelStartScore = (Number(saved.levelStartScore) || savedScore) + delta;
      data.savedAt = saved.savedAt;
    }
    delete data.activeMode;
    return data;
  }

  function sharedFrom(data) {
    if (!data) return null;
    return {
      score: Math.max(0, Number(data.score) || 0),
      talents: clone(data.talents || {}),
      settings: clone(data.settings || {}),
      bestRecords: clone(data.bestRecords || {}),
      activeMode: window.XQ.Mode.normalizeName(data.mode),
      savedAt: Date.now(),
    };
  }

  return { merge, packMode, packShared, sharedFrom };
})();
