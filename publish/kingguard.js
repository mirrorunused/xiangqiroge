window.XQ = window.XQ || {};

window.XQ.KingGuard = (() => {
  function trigger(state, result, attackerId) {
    if (isDivineTarget(state, result.captured)) return triggerDivine(state, result, attackerId);
    if (result.captured?.type !== "K" || !hasGuard(state, result.captured.side)) return "";
    consume(state, result.captured.side);
    const attacker = state.board.find((piece) => piece.id === attackerId);
    if (attacker?.side === "r") window.XQ.Mode.redCaptured(state, attacker);
    state.board = state.board.filter((piece) => piece.id !== attackerId);
    state.board.push({ ...result.captured });
    const sideName = result.captured.side === "r" ? "帅" : "将";
    state.message = `护驾符触发：${sideName}免于被吃，并反杀来犯棋子`;
    return state.message;
  }

  function refreshDivine(state) {
    if (!state.enemyDivine?.active) return "";
    const candidates = (state.board || []).filter((piece) => piece.side === "b");
    const target = candidates[Math.floor(Math.random() * candidates.length)];
    state.enemyDivine.targetId = target?.id || null;
    return target ? `神选：黑方${label(target)}获得一回合护驾符。` : "";
  }

  function isDivineTarget(state, captured) {
    return captured?.side === "b" && state.enemyDivine?.active && state.enemyDivine.targetId === captured.id;
  }

  function triggerDivine(state, result, attackerId) {
    state.enemyDivine.targetId = null;
    const attacker = state.board.find((piece) => piece.id === attackerId);
    if (attacker?.side === "r") window.XQ.Mode.redCaptured(state, attacker);
    state.board = state.board.filter((piece) => piece.id !== attackerId);
    state.board.push({ ...result.captured });
    state.message = `神选护驾触发：黑方${label(result.captured)}免于被吃，并反杀来犯棋子`;
    return state.message;
  }

  function label(piece) {
    return window.XQ.Config.labels.b[piece.type] || piece.type;
  }

  function hasGuard(state, side) {
    if (side === "b") return Boolean(state.enemyTraits?.kingGuard);
    return activeItems(state).some((item) => item.id === "kingGuard");
  }

  function consume(state, side) {
    if (side === "b") {
      state.enemyTraits.kingGuard = false;
      return;
    }
    const item = activeItems(state).find((i) => i.id === "kingGuard");
    if (item) state.items = state.items.filter((i) => i.uid !== item.uid);
  }

  function activeItems(state) {
    return window.XQ.Late?.activeItems?.(state) || state.items || [];
  }

  return { has: hasGuard, refreshDivine, trigger };
})();
