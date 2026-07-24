window.XQ = window.XQ || {};

window.XQ.Fish = (() => {
  const MAX_GRASS = 30;

  function startLevel(state) {
    if (!state.enemyFish?.active) return;
    state.enemyFish.turns = state.enemyFish.turns || 0;
    spawnMany(state, 1);
  }

  function prepareBoard(state) {
    if (!state.enemyFish?.active) return;
    [[0, 3], [8, 3]].forEach(([x, y]) => {
      const piece = (state.board || []).find((p) => p.side === "b" && p.x === x && p.y === y);
      if (piece && piece.type !== "K") piece.type = "C";
    });
  }

  function afterRedAction(state) {
    if (!state.enemyFish?.active) return "";
    if (state.enemyFish.skipNextGrass) {
      state.enemyFish.skipNextGrass = false;
      state.enemyFish.turns = 0;
      return "";
    }
    state.enemyFish.turns = (state.enemyFish.turns || 0) + 1;
    if (state.enemyFish.turns % 5 !== 0) return "";
    const amount = Math.min(5, 1 + Math.floor(state.enemyFish.turns / 5));
    const added = spawnMany(state, amount);
    return added ? `鱼水发动：新生成 ${added} 个“草”，当前 ${grassCount(state)} 个，仅阻隔行棋，双方均可吃。` : "";
  }

  function spawnMany(state, amount) {
    let added = 0;
    while (added < amount && grassCount(state) < MAX_GRASS && spawn(state)) added += 1;
    return added;
  }

  function grassCount(state) {
    return (state.board || []).filter((piece) => piece.side === "n" && piece.type === "G").length;
  }

  function spawn(state) {
    const cells = emptyCells(state);
    if (!cells.length) return false;
    const cell = cells[Math.floor(Math.random() * cells.length)];
    state.board.push({ id: `nG${Date.now()}${Math.random()}`, side: "n", type: "G", x: cell.x, y: cell.y });
    return true;
  }

  function emptyCells(state) {
    const blocked = new Set((state.board || []).map((p) => key(p.x, p.y)));
    (state.fieldItems || []).forEach((i) => blocked.add(key(i.x, i.y)));
    (state.collapseTiles || []).forEach((i) => blocked.add(key(i.x, i.y)));
    const cells = [];
    for (let y = 0; y < window.XQ.Config.ranks; y += 1) {
      for (let x = 0; x < window.XQ.Config.files; x += 1) if (!blocked.has(key(x, y))) cells.push({ x, y });
    }
    return cells;
  }

  function key(x, y) { return `${x},${y}`; }

  return { afterRedAction, prepareBoard, startLevel };
})();
