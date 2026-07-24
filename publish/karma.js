window.XQ = window.XQ || {};

window.XQ.Karma = (() => {
  function startLevel(state) {
    if (!state.enemyKarma?.active) return "";
    state.enemyKarma.turn = 1;
    state.enemyKarma.pieces = {};
    return "";
  }

  function startTurn(state) {
    if (!state.enemyKarma?.active) return "";
    state.enemyKarma.turn = Math.max(1, Number(state.enemyKarma.turn) || 1) + 1;
    return "";
  }

  function blocks(state, piece) {
    if (!state.enemyKarma?.active || piece?.side !== "r") return false;
    const record = state.enemyKarma.pieces?.[piece.id];
    return Boolean(record && record.blockedTurn === state.enemyKarma.turn);
  }

  function onRedCapture(state, pieceId) {
    if (!state.enemyKarma?.active) return "";
    const piece = state.board.find((entry) => entry.id === pieceId && entry.side === "r");
    if (!piece) return "";
    const records = state.enemyKarma.pieces || (state.enemyKarma.pieces = {});
    const record = records[pieceId] || (records[pieceId] = { captures: 0, blockedTurn: 0 });
    record.captures += 1;
    if (record.captures === 2) {
      record.blockedTurn = state.enemyKarma.turn + 1;
      return `业障：${label(piece)}累计吃子 2 枚，下一个红方回合无法行动`;
    }
    if (record.captures === 3) {
      const lost = losePlayerItem(state);
      return lost
        ? `业障：${label(piece)}累计吃子 3 枚，失去${lost}`
        : `业障：${label(piece)}累计吃子 3 枚，但没有可失去的非消耗品`;
    }
    if (record.captures === 4) {
      window.XQ.Mode.redCaptured(state, piece);
      state.board = state.board.filter((entry) => entry.id !== pieceId);
      return `业障：${label(piece)}累计吃子 4 枚，按被黑方吃掉结算`;
    }
    return "";
  }

  function losePlayerItem(state) {
    const consumables = new Set(window.XQ.Config.consumableIds || []);
    const candidates = (state.items || []).concat(window.XQ.Mode.activeOuterItems(state) || [])
      .filter((item) => !consumables.has(item.id));
    if (!candidates.length) return "";
    const item = candidates[Math.floor(Math.random() * candidates.length)];
    removeOwned(state, item);
    return item.name || item.id;
  }

  function removeOwned(state, item) {
    const local = (state.items || []).indexOf(item);
    const outer = state.talents?.outerItems || [];
    const outerIndex = outer.indexOf(item);
    if (local >= 0) state.items.splice(local, 1);
    else if (outerIndex >= 0) outer.splice(outerIndex, 1);
    if (item.uid) state.keepUids = (state.keepUids || []).filter((uid) => uid !== item.uid);
    if (state.rebelOuterUid === item.uid) state.rebelOuterUid = null;
  }

  function label(piece) {
    return `红方${window.XQ.Config.labels.r[piece.type] || piece.type}`;
  }

  return { blocks, onRedCapture, startLevel, startTurn };
})();
