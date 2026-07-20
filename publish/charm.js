window.XQ = window.XQ || {};

window.XQ.Charm = (() => {
  function startLevel(state) {
    state.charmTiles = [];
    if (state.enemyCharm?.blade) return startTurn(state);
    return "";
  }

  function startTurn(state) {
    if (!state.enemyCharm?.blade) return "";
    const cells = emptyCells(state);
    shuffle(cells);
    state.charmTiles = cells.slice(0, 3).map((cell, index) => ({
      ...cell,
      uid: `ch${Date.now()}${index}${Math.random().toString(16).slice(2)}`,
    }));
    return state.charmTiles.length
      ? `媚骨蚀锋：本回合生成 ${state.charmTiles.length} 个魅惑格。`
      : "";
  }

  function draw(state, board, pos) {
    (state.charmTiles || []).forEach((tile) => {
      const mark = document.createElement("div");
      mark.className = "charm-tile";
      mark.textContent = "魅";
      mark.title = "魅惑格：红方棋子踏入后倒戈";
      pos(mark, tile.x, tile.y);
      board.appendChild(mark);
    });
  }

  function onBlackCapture(state, result, moverId) {
    if (!state.enemyCharm?.formation || result.captured?.side !== "r") return "";
    const gained = state.enemyCharm.blade
      ? window.XQ.EnemyItems.takeRelated(state, result.captured.type)
      : window.XQ.EnemyItems.grantRelated(state, result.captured.type);
    const attacker = state.board.find((piece) => piece.id === moverId);
    const spawned = attacker ? spawnBehind(state, attacker, result.captured) : null;
    const parts = [];
    if (spawned) parts.push(`媚阵复制出黑${label("b", spawned.type)}`);
    if (gained.length) parts.push(state.enemyCharm.blade ? `黑方夺取${gained.join("、")}` : `黑方获得${gained.join("、")}，红方保留`);
    return parts.join("；");
  }

  function onRedMove(state, pieceId) {
    if (!state.enemyCharm?.blade) return "";
    const piece = state.board.find((entry) => entry.id === pieceId);
    if (!piece || piece.side !== "r") return "";
    const index = (state.charmTiles || []).findIndex((tile) => tile.x === piece.x && tile.y === piece.y);
    if (index < 0) return "";
    state.charmTiles.splice(index, 1);
    const gained = window.XQ.EnemyItems.takeRelated(state, piece.type);
    window.XQ.Levels.reduceBase(state, window.XQ.Config.values[piece.type] || 0);
    if (activeItems(state).some((item) => item.id === "endure")) state.playerBonusMoves = 1;
    piece.side = "b";
    const suffix = gained.length ? `，黑方夺取${gained.join("、")}` : "";
    return `${label("r", piece.type)}踏入魅惑格，倒戈为黑${label("b", piece.type)}${suffix}`;
  }

  function spawnBehind(state, attacker, captured) {
    const x = attacker.x;
    const y = attacker.y - 1;
    if (y < 0 || state.board.some((piece) => piece.x === x && piece.y === y)) return null;
    const copy = {
      id: `bc${Date.now()}${Math.random().toString(16).slice(2)}`,
      side: "b",
      type: captured.type,
      x,
      y,
    };
    state.board.push(copy);
    return copy;
  }

  function emptyCells(state) {
    const occupied = new Set(state.board.map((piece) => key(piece.x, piece.y)));
    (state.fieldItems || []).forEach((item) => occupied.add(key(item.x, item.y)));
    (state.collapseTiles || []).forEach((tile) => occupied.add(key(tile.x, tile.y)));
    const cells = [];
    for (let y = 0; y < window.XQ.Config.ranks; y += 1) {
      for (let x = 0; x < window.XQ.Config.files; x += 1) {
        if (!occupied.has(key(x, y))) cells.push({ x, y });
      }
    }
    return cells;
  }

  function activeItems(state) {
    return (state.items || []).concat(window.XQ.Mode?.activeOuterItems?.(state) || []);
  }

  function label(side, type) {
    return window.XQ.Config.labels[side]?.[type] || type;
  }

  function shuffle(items) {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const pick = Math.floor(Math.random() * (index + 1));
      [items[index], items[pick]] = [items[pick], items[index]];
    }
  }

  function key(x, y) {
    return `${x},${y}`;
  }

  return { draw, onBlackCapture, onRedMove, startLevel, startTurn };
})();
