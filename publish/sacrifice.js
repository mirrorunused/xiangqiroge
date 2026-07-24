window.XQ = window.XQ || {};

window.XQ.Sacrifice = (() => {
  const TYPES = ["P", "P", "P", "A", "B", "N", "R", "C", "S", "Q"];

  function canCaptureOwn(state, mover, target) {
    return Boolean(state?.enemySacrifice?.active && mover?.side === "b"
      && target?.side === "b" && target.type !== "K" && mover.id !== target.id);
  }

  function onCapture(state, moverSide, captured) {
    if (!state.enemySacrifice?.active || moverSide !== "b" || !["r", "b"].includes(captured?.side)) return "";
    const item = window.XQ.EnemyItems.grantRandom(state);
    const target = captured.side === "b"
      ? `己方${label(captured.type)}`
      : `红方${window.XQ.Config.labels?.r?.[captured.type] || captured.type}`;
    return item ? `生祭：黑方吃掉${target}，获得${item}` : `生祭：黑方吃掉${target}`;
  }

  function startLevel(state) {
    if (!state.enemySacrifice?.active) return "";
    state.enemySacrifice.turns = 0;
    return "";
  }

  function startTurn(state) {
    const effect = state.enemySacrifice;
    if (!effect?.active) return "";
    effect.turns = (effect.turns || 0) + 1;
    if (effect.turns % 2 !== 0) return "";
    const piece = spawnPiece(state);
    return piece ? `生祭增兵：黑方随机获得一枚${label(piece.type)}。` : "";
  }

  function spawnPiece(state) {
    const cells = emptyCells(state);
    if (!cells.length) return null;
    const ownHalf = cells.filter((cell) => cell.y <= 4);
    const pool = ownHalf.length ? ownHalf : cells;
    const cell = pool[Math.floor(Math.random() * pool.length)];
    const type = TYPES[Math.floor(Math.random() * TYPES.length)];
    const piece = { id: uid(), side: "b", type, ...cell };
    state.board.push(piece);
    return piece;
  }

  function emptyCells(state) {
    const occupied = new Set(state.board.map((piece) => key(piece.x, piece.y)));
    (state.fieldItems || []).forEach((item) => occupied.add(key(item.x, item.y)));
    (state.collapseTiles || []).forEach((tile) => occupied.add(key(tile.x, tile.y)));
    (state.charmTiles || []).forEach((tile) => occupied.add(key(tile.x, tile.y)));
    (state.incenseTiles || []).forEach((tile) => occupied.add(key(tile.x, tile.y)));
    const cells = [];
    for (let y = 0; y < window.XQ.Config.ranks; y += 1) {
      for (let x = 0; x < window.XQ.Config.files; x += 1) {
        if (!occupied.has(key(x, y))) cells.push({ x, y });
      }
    }
    return cells;
  }

  function label(type) {
    return window.XQ.Config.labels.b[type] || type;
  }

  function uid() {
    return `bs${Date.now()}${Math.random().toString(16).slice(2)}`;
  }

  function key(x, y) {
    return `${x},${y}`;
  }

  return { canCaptureOwn, onCapture, startLevel, startTurn };
})();
