window.XQ = window.XQ || {};

window.XQ.Drops = (() => {
  const R = window.XQ.Rules;
  const TYPES = [
    { id: "freeze", name: "缚阵令", mark: "冻", text: "敌方接下来一到两次行动被冻结。" },
    { id: "rook", name: "车骑令", mark: "车", text: "拾取的红方棋子变为车；随机棋模式仅持续本局。" },
    { id: "pawn", name: "贬卒令", mark: "卒", text: "敌方优先随机非卒棋子变为卒。" },
  ];
  const QUEEN = { id: "queen", name: "升后令", mark: "后", text: "随机棋模式专属：拾取的红方棋子本局变为后。" };
  const HERBICIDE = { id: "herbicide", name: "除草剂", mark: "除", text: "随机清除最多 5 个草。" };

  function emptyCells(state) {
    const cells = [];
    for (let y = 0; y < 10; y += 1) {
      for (let x = 0; x < 9; x += 1) {
        if (!R.at(state.board, x, y) && !state.fieldItems.some((i) => i.x === x && i.y === y)
          && !state.collapseTiles?.some((i) => i.x === x && i.y === y)
          && !state.charmTiles?.some((i) => i.x === x && i.y === y)
          && !state.incenseTiles?.some((i) => i.x === x && i.y === y)) {
          cells.push({ x, y });
        }
      }
    }
    return cells;
  }

  function spawn(state, force) {
    if (state.dropRefreshLocked && !state.enemyMomentum?.active) return;
    state.fieldItems = state.fieldItems || [];
    if (!force && (state.fieldItems.length >= 2 || Math.random() > 0.34)) return;
    const cells = preferPlayerHalf(emptyCells(state));
    if (!cells.length) return;
    const cell = cells[Math.floor(Math.random() * cells.length)];
    const type = rollType(state);
    state.fieldItems.push({ ...type, ...cell, uid: `d${Date.now()}${Math.random()}` });
  }

  function rollType(state) {
    if (state.enemyFish?.active && Math.random() < 0.28) return HERBICIDE;
    const r = Math.random();
    if (state.mode === "random") return r < 0.16 ? TYPES[0] : r < 0.44 ? TYPES[1] : r < 0.72 ? QUEEN : TYPES[2];
    return r < 0.16 ? TYPES[0] : r < 0.58 ? TYPES[1] : TYPES[2];
  }

  function preferPlayerHalf(cells) {
    const own = cells.filter((cell) => cell.y >= 5);
    return own.length && Math.random() < 0.78 ? own : cells;
  }

  function start(state) {
    state.fieldItems = [];
    if (state.dropRefreshLocked && !state.enemyMomentum?.active) return;
    spawn(state, true);
  }

  async function collect(state, pieceId, side) {
    const piece = state.board.find((p) => p.id === pieceId);
    if (!piece) return "";
    const index = state.fieldItems.findIndex((i) => i.x === piece.x && i.y === piece.y);
    if (index < 0) return "";
    const item = state.fieldItems.splice(index, 1)[0];
    const targetSide = piece.side === "r" ? "b" : "r";
    if (item.id === "freeze") {
      const turns = window.XQ.Items.count(state, "tempo") > 0 ? 1 : 2;
      if (targetSide === "b") state.enemyFrozen += turns;
      else state.playerFrozen += turns;
    }
    let text = item.text;
    if (["rook", "queen"].includes(item.id) && side === "r") text = morph(state, piece, item);
    if (item.id === "pawn") weakenSide(state, targetSide);
    if (item.id === "herbicide") text = clearGrass(state, 5);
    spawn(state, false);
    return text;
  }

  function morph(state, piece, item) {
    const targetType = item.id === "queen" ? "Q" : "R";
    if (window.XQ.DropMorphs.apply(state, piece, targetType)) {
      return `${item.name}生效：该棋子本局变为${window.XQ.Config.labels.r[targetType]}，下一局恢复原兵种。`;
    }
    if (piece.type !== "K") {
      piece.type = targetType;
      return item.text;
    }
    const points = item.id === "queen" ? 100 : 80;
    state.score += points;
    return `帅不能变${window.XQ.Config.labels.r[targetType]}，改为获得 ${points} 积分。`;
  }

  function clearGrass(state, amount) {
    if (state.enemyFish?.active) Object.assign(state.enemyFish, { skipNextGrass: true, turns: 0 });
    const grass = state.board.filter((p) => p.side === "n" && p.type === "G");
    const picked = grass.map((piece) => ({ piece, key: Math.random() })).sort((a, b) => a.key - b.key).slice(0, amount).map((entry) => entry.piece.id);
    state.board = state.board.filter((piece) => !picked.includes(piece.id));
    return picked.length ? `除草剂生效：随机清除了 ${picked.length} 个草。` : "除草剂没有找到可清除的草。";
  }

  function weakenSide(state, side) {
    const strongTargets = state.board.filter((p) => p.side === side && p.type !== "K" && p.type !== "P");
    const targets = strongTargets.length ? strongTargets : state.board.filter((p) => p.side === side && p.type !== "K");
    if (!targets.length) return;
    const target = targets[Math.floor(Math.random() * targets.length)];
    target.type = "P";
  }

  return { collect, spawn, start };
})();
