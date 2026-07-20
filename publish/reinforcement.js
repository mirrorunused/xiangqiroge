window.XQ = window.XQ || {};

window.XQ.Reinforcement = (() => {
  const POOLS = [
    [["P", 8], ["A", 3], ["B", 3]],
    [["P", 5], ["A", 3], ["B", 3], ["N", 2], ["C", 2]],
    [["P", 3], ["A", 2], ["B", 2], ["N", 3], ["C", 3], ["R", 1]],
    [["A", 2], ["B", 2], ["N", 3], ["C", 3], ["R", 2], ["S", 1]],
    [["N", 3], ["C", 3], ["R", 3], ["S", 2], ["Q", 1]],
  ];

  function startLevel(state) {
    if (!state.enemyReinforcement?.active) return "";
    Object.assign(state.enemyReinforcement, { turns: 0, waves: 0 });
    return "";
  }

  function startTurn(state) {
    const effect = state.enemyReinforcement;
    if (!effect?.active) return "";
    effect.turns = (effect.turns || 0) + 1;
    if (effect.turns < 3 || (effect.turns - 3) % 2 !== 0) return "";
    effect.waves = (effect.waves || 0) + 1;
    const amount = Math.min(3, 1 + Math.floor((effect.waves - 1) / 2));
    const pieces = spawn(state, amount, effect.waves);
    if (!pieces.length) return "增援抵达，但棋盘已无可用空位。";
    const names = pieces.map((piece) => window.XQ.Config.labels.b[piece.type] || piece.type);
    return `增援第 ${effect.waves} 波：黑方获得${names.join("、")}。`;
  }

  function spawn(state, amount, wave) {
    const cells = emptyCells(state);
    const pieces = [];
    while (pieces.length < amount && cells.length) {
      const cell = cells.splice(Math.floor(Math.random() * cells.length), 1)[0];
      const piece = { id: uid(), side: "b", type: pickType(wave), ...cell };
      state.board.push(piece);
      pieces.push(piece);
    }
    return pieces;
  }

  function pickType(wave) {
    const pool = POOLS[Math.min(POOLS.length - 1, Math.max(0, wave - 1))];
    const total = pool.reduce((sum, entry) => sum + entry[1], 0);
    let roll = Math.random() * total;
    for (const [type, weight] of pool) {
      roll -= weight;
      if (roll <= 0) return type;
    }
    return pool[0][0];
  }

  function emptyCells(state) {
    const occupied = new Set((state.board || []).map((piece) => key(piece.x, piece.y)));
    ["fieldItems", "collapseTiles", "charmTiles", "incenseTiles"].forEach((name) => {
      (state[name] || []).forEach((entry) => occupied.add(key(entry.x, entry.y)));
    });
    const cells = [];
    for (let y = 0; y < window.XQ.Config.ranks; y += 1) {
      for (let x = 0; x < window.XQ.Config.files; x += 1) {
        if (!occupied.has(key(x, y))) cells.push({ x, y });
      }
    }
    return cells;
  }

  function uid() {
    return `br${Date.now()}${Math.random().toString(16).slice(2)}`;
  }

  function key(x, y) {
    return `${x},${y}`;
  }

  return { startLevel, startTurn };
})();
