window.XQ = window.XQ || {};

window.XQ.Corruption = (() => {
  function onRedCapture(state, pieceId) {
    const effect = state.enemyCorruption;
    if (!effect?.active || effect.cooldown > 0) return "";
    const piece = state.board.find((entry) => entry.id === pieceId);
    if (!piece || piece.side !== "r") return "";
    const gained = window.XQ.EnemyItems.grantRelated(state, piece.type);
    markRedLoss(state, piece);
    piece.side = "b";
    Object.assign(effect, { cooldown: 3, justTriggered: true });
    const suffix = gained.length ? `，黑方夺取${gained.join("、")}` : "";
    return `染心发动：${label("r", piece.type)}吃子后遭到魅惑，倒戈为黑${label("b", piece.type)}${suffix}`;
  }

  function afterRedAction(state) {
    if ((state.playerMovesLeft || 1) > 1) return "";
    return tick(state);
  }

  function skipTurn(state) {
    return tick(state);
  }

  function tick(state) {
    const effect = state.enemyCorruption;
    if (!effect?.active) return "";
    if (effect.justTriggered) {
      effect.justTriggered = false;
      return "";
    }
    if (!(effect.cooldown > 0)) return "";
    effect.cooldown -= 1;
    return effect.cooldown === 0 ? "染心冷却结束，再次吃子将触发魅惑。" : "";
  }

  function armMakeup(state) {
    state.charmMakeupCharges = (state.charmMakeupCharges || 0) + 1;
    return true;
  }

  function onBlackCapture(state, pieceId) {
    if (!(state.charmMakeupCharges > 0)) return "";
    const piece = state.board.find((entry) => entry.id === pieceId);
    if (!piece || piece.side !== "b") return "";
    if (!window.XQ.ConsumableState.consume(state, "charmMakeup")) return "";
    piece.side = "r";
    return `媚妆生效：吃子的黑${label("b", piece.type)}转投红方`;
  }

  function markRedLoss(state, piece) {
    window.XQ.Levels.reduceBase(state, window.XQ.Config.values[piece.type] || 0);
    const active = window.XQ.Late?.activeItems?.(state) || state.items || [];
    if (active.some((item) => item.id === "endure")) state.playerBonusMoves = 1;
  }

  function label(side, type) {
    return window.XQ.Config.labels[side]?.[type] || type;
  }

  return { afterRedAction, armMakeup, onBlackCapture, onRedCapture, skipTurn };
})();
