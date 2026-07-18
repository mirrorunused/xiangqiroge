window.XQ = window.XQ || {};

window.XQ.Collapse = (() => {
  function enter(state, id, side) {
    if (side !== "r" || !state.enemyCollapse?.active) return "";
    const piece = state.board.find((p) => p.id === id);
    if (!piece) return "";
    const index = (state.collapseTiles || []).findIndex((tile) => tile.x === piece.x && tile.y === piece.y);
    if (index < 0) return "";
    state.collapseTiles.splice(index, 1);
    state.board = state.board.filter((p) => p.id !== id);
    window.XQ.Mode.redCaptured(state, piece);
    return `崩落位吞没了${window.XQ.Config.labels.r[piece.type]}，视作被黑方吃子。`;
  }

  function startLevel(state) {
    if (!state.enemyCollapse?.active) return "";
    Object.assign(state.enemyCollapse, { quiet: 0, turns: 0 });
    return spawn(state) ? "崩盘开局：棋盘出现 1 个崩落位。" : "";
  }

  function afterRedAction(state, captured) {
    if (!state.enemyCollapse?.active) return "";
    state.collapseTiles = (state.collapseTiles || []).map((tile) => ({ ...tile, ttl: tile.ttl - 1 })).filter((tile) => tile.ttl > 0);
    state.enemyCollapse.turns = (state.enemyCollapse.turns || 0) + 1;
    state.enemyCollapse.quiet = captured ? 0 : (state.enemyCollapse.quiet || 0) + 1;
    const target = Math.min(5, 1 + Math.floor(state.enemyCollapse.turns / 4));
    let changed = state.enemyCollapse.turns % 4 === 0 && fill(state, target);
    if (state.enemyCollapse.quiet >= 4) { state.enemyCollapse.quiet = 0; changed = fill(state, target) || changed; }
    return changed ? `崩盘发动：当前崩落位 ${state.collapseTiles.length} 个，单个持续 2 回合。` : "";
  }

  function fill(state, target) {
    let changed = false;
    while ((state.collapseTiles || []).length < target && spawn(state)) changed = true;
    return changed;
  }

  function spawn(state) {
    const occupied = new Set(state.board.map((p) => key(p.x, p.y)));
    (state.fieldItems || []).forEach((item) => occupied.add(key(item.x, item.y)));
    (state.collapseTiles || []).forEach((tile) => occupied.add(key(tile.x, tile.y)));
    const cells = [];
    for (let y = 0; y < window.XQ.Config.ranks; y += 1) {
      for (let x = 0; x < window.XQ.Config.files; x += 1) if (!occupied.has(key(x, y))) cells.push({ x, y });
    }
    if (!cells.length) return false;
    const cell = cells[Math.floor(Math.random() * cells.length)];
    state.collapseTiles = (state.collapseTiles || []).concat({ ...cell, ttl: 2, uid: `x${Date.now()}${Math.random()}` });
    return true;
  }

  function key(x, y) {
    return `${x},${y}`;
  }

  return { afterRedAction, enter, startLevel };
})();
