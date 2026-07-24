window.XQ = window.XQ || {};

window.XQ.Incense = (() => {
  const PATTERNS = [
    [[1, 1]],
    [[1, 2]],
    [[1, 1], [1, 1]],
    [[1, 2], [1, 2], [2, 2]],
    [[2, 3], [2, 3]],
  ];

  function startLevel(state) {
    state.incenseTiles = [];
    if (!state.enemyIncense?.active) return "";
    Object.assign(state.enemyIncense, { turns: 0, stage: 0 });
    spawnStage(state);
    return "香阵开局：随机位置出现 1*1 香阵。";
  }

  function startTurn(state) {
    const effect = state.enemyIncense;
    if (!effect?.active) return "";
    effect.turns = (effect.turns || 0) + 1;
    if (effect.turns % 2 === 1) {
      retainHalf(state);
      return `香阵余韵：本回合保留 ${state.incenseTiles.length} 格范围。`;
    }
    effect.stage = Math.min(PATTERNS.length - 1, (effect.stage || 0) + 1);
    spawnStage(state);
    return `香阵扩张：本回合形成 ${state.incenseTiles.length} 格范围。`;
  }

  function blocksRed(state, piece) {
    return piece?.side === "r" && hasTile(state, piece.x, piece.y);
  }

  function blocksCapture(state, piece, move, board) {
    if (piece?.side !== "r") return false;
    const target = board.find((entry) => entry.x === move.x && entry.y === move.y);
    return target?.side === "b" && hasTile(state, target.x, target.y);
  }

  function protectsKing(state, side, king) {
    return side === "b" && king && hasTile(state, king.x, king.y);
  }

  function draw(state, board, pos) {
    if (!state.enemyIncense?.active || !(state.incenseTiles || []).length) return;
    const layer = document.createElement("div");
    layer.className = "incense-layer";
    layer.setAttribute("aria-hidden", "true");
    (state.incenseTiles || []).forEach((tile) => {
      const mark = document.createElement("div");
      mark.className = `incense-tile${tile.remnant ? " remnant" : ""}`;
      mark.textContent = "香";
      mark.title = "香阵：红子禁行，黑子不可被吃";
      pos(mark, tile.x, tile.y);
      layer.appendChild(mark);
    });
    board.appendChild(layer);
  }

  function spawnStage(state) {
    const pattern = PATTERNS[state.enemyIncense.stage] || PATTERNS.at(-1);
    const used = new Set();
    const tiles = [];
    pattern.forEach(([baseW, baseH]) => {
      const rotated = Math.random() < 0.5;
      const width = rotated ? baseH : baseW;
      const height = rotated ? baseW : baseH;
      const origin = place(width, height, used);
      if (!origin) return;
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const tile = { x: origin.x + x, y: origin.y + y, uid: uid() };
          used.add(key(tile.x, tile.y));
          tiles.push(tile);
        }
      }
    });
    state.incenseTiles = tiles;
  }

  function retainHalf(state) {
    const tiles = shuffle([...(state.incenseTiles || [])]);
    state.incenseTiles = tiles.slice(0, Math.ceil(tiles.length / 2))
      .map((tile) => ({ ...tile, remnant: true }));
  }

  function place(width, height, used) {
    const candidates = [];
    for (let y = 0; y <= window.XQ.Config.ranks - height; y += 1) {
      for (let x = 0; x <= window.XQ.Config.files - width; x += 1) {
        let clear = true;
        for (let dy = -1; dy <= height; dy += 1) {
          for (let dx = -1; dx <= width; dx += 1) {
            if (used.has(key(x + dx, y + dy))) clear = false;
          }
        }
        if (clear) candidates.push({ x, y });
      }
    }
    return candidates[Math.floor(Math.random() * candidates.length)] || null;
  }

  function hasTile(state, x, y) {
    return Boolean(state.enemyIncense?.active && state.incenseTiles?.some((tile) => tile.x === x && tile.y === y));
  }

  function shuffle(items) {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const pick = Math.floor(Math.random() * (index + 1));
      [items[index], items[pick]] = [items[pick], items[index]];
    }
    return items;
  }

  function uid() {
    return `in${Date.now()}${Math.random().toString(16).slice(2)}`;
  }

  function key(x, y) {
    return `${x},${y}`;
  }

  return { blocksCapture, blocksRed, covers: hasTile, draw, protectsKing, startLevel, startTurn };
})();
