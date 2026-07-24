window.XQ = window.XQ || {};

window.XQ.Mode = (() => {
  const EMPTY_RECORD = { level: 1, score: 0 };
  const REBEL_STORY = "曌帝残暴，天下男丁几被屠尽，唯有一支小队戮力杀敌，剑指昏君，为男丁亡魂讨回公道。你是这支队伍的指挥官，曌帝治下男人最后的希望。";

  function ensure(state) {
    state.mode = normalizeName(state.mode);
    const legacy = state.bestRecord || EMPTY_RECORD;
    state.bestRecords = Object.assign({
      normal: { ...legacy },
      rebel: { ...EMPTY_RECORD },
      random: { ...EMPTY_RECORD },
      recruit: { ...EMPTY_RECORD },
    }, state.bestRecords || {});
    state.bestRecords.normal = normalizeRecord(state.bestRecords.normal);
    state.bestRecords.rebel = normalizeRecord(state.bestRecords.rebel);
    state.bestRecords.random = normalizeRecord(state.bestRecords.random);
    state.bestRecords.recruit = normalizeRecord(state.bestRecords.recruit);
    if (state.mode !== "normal") stripTempo(state);
    window.XQ.RandomMode?.ensure?.(state);
    window.XQ.QuickMode?.ensure?.(state);
    updateRecord(state);
    return state;
  }

  function normalizeName(mode) {
    return ["normal", "rebel", "random", "recruit", "quick"].includes(mode) ? mode : "normal";
  }

  function normalizeRecord(record) {
    return {
      level: Math.max(1, Number(record?.level) || 1),
      score: Math.max(0, Number(record?.score) || 0),
    };
  }

  function updateRecord(state) {
    if (!state?.bestRecords) return;
    if (state.mode === "quick") return;
    const key = normalizeName(state.mode);
    const old = normalizeRecord(state.bestRecords[key]);
    const current = { level: state.level || 1, score: state.score || 0 };
    if (current.level > old.level || (current.level === old.level && current.score > old.score)) {
      state.bestRecords[key] = current;
    }
    state.bestRecord = state.bestRecords.normal;
  }

  function stripTempo(state) {
    state.items = (state.items || []).filter((item) => item.id !== "tempo");
    state.tempoNotice = false;
    state.tempoDeclined = true;
  }

  function activeOuterItems(state) {
    const items = state?.talents?.outerItems || [];
    if (window.XQ.RandomMode?.is?.(state)) return window.XQ.RandomMode.activeOuterItems(state, items);
    if (state?.mode === "quick") return [];
    if (state?.mode !== "rebel") return items;
    const selected = items.find((item) => item.uid === state.rebelOuterUid && item.id !== "tempo");
    return selected ? [selected] : [];
  }

  function redCaptured(state, piece) {
    if (!piece) return;
    window.XQ.Levels.reduceBase(state, window.XQ.Config.values[piece.type] || 0);
    const active = window.XQ.Late?.activeItems?.(state) || state.items || [];
    if (active.some((item) => item.id === "endure")) state.playerBonusMoves = 1;
    if (piece.type === "K" && !window.XQ.RandomMode?.is?.(state)) return;
    const list = state.capturedRed || (state.capturedRed = []);
    if (!list.some((entry) => entry.id === piece.id)) {
      list.push({ ...piece, capturedUid: `c${Date.now()}${Math.random().toString(16).slice(2)}` });
    }
  }

  function isRebel(state) {
    return state?.mode === "rebel";
  }

  return { REBEL_STORY, activeOuterItems, ensure, isRebel, normalizeName, redCaptured, stripTempo, updateRecord };
})();
