window.XQ = window.XQ || {};

window.XQ.Rules = (() => {
  const C = window.XQ.Config;
  const inside = (x, y) => x >= 0 && x < C.files && y >= 0 && y < C.ranks;
  const clone = (board) => board.map((p) => ({ ...p }));
  const at = (board, x, y) => board.find((p) => p.x === x && p.y === y);
  const enemy = (side) => (side === "r" ? "b" : "r");
  const palace = (side, x, y) => x >= 3 && x <= 5 && (side === "r" ? y >= 7 && y <= 9 : y >= 0 && y <= 2);
  const crossed = (p) => (p.side === "r" ? p.y <= 4 : p.y >= 5);
  const has = (state, side, id) => {
    if (!state) return false;
    if (side === "r") return window.XQ.Items.count(state, id) > 0;
    return Boolean(state.enemyTraits?.[id]);
  };
  const ownHalf = (side, y) => side === "r" ? y >= 5 : y <= 4;

  function clearLine(board, x1, y1, x2, y2) {
    const dx = Math.sign(x2 - x1);
    const dy = Math.sign(y2 - y1);
    let x = x1 + dx;
    let y = y1 + dy;
    let count = 0;
    while (x !== x2 || y !== y2) {
      if (at(board, x, y)) count += 1;
      x += dx;
      y += dy;
    }
    return count;
  }

  function rayMoves(board, p, cannon, dirs) {
    const moves = [];
    (dirs || [[1, 0], [-1, 0], [0, 1], [0, -1]]).forEach(([dx, dy]) => {
      let x = p.x + dx;
      let y = p.y + dy;
      let screen = false;
      while (inside(x, y)) {
        const t = at(board, x, y);
        if (!cannon) {
          if (!t) moves.push({ x, y });
          else {
            if (t.side !== p.side) moves.push({ x, y });
            break;
          }
        } else if (!screen) {
          if (!t) moves.push({ x, y });
          else screen = true;
        } else if (t) {
          if (t.side !== p.side) moves.push({ x, y });
          break;
        }
        x += dx;
        y += dy;
      }
    });
    return moves;
  }

  function rookPhoenixMoves(board, p) {
    return rayMoves(board, p, false).concat(rayMoves(board, p, false, [[1, 1], [1, -1], [-1, 1], [-1, -1]])
      .filter((m) => Math.abs(m.x - p.x) <= 4));
  }

  function pseudo(board, p, state) {
    const own = (x, y) => at(board, x, y)?.side === p.side;
    const add = (arr, x, y) => inside(x, y) && !own(x, y) && arr.push({ x, y });
    const moves = [];
    if (p.type === "R") return has(state, p.side, "rookPhoenix") ? rookPhoenixMoves(board, p) : rayMoves(board, p, false);
    if (p.type === "S") return rayMoves(board, p, false, [[1, 1], [1, -1], [-1, 1], [-1, -1]]);
    if (p.type === "Q") return rayMoves(board, p, false, [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]);
    if (p.type === "C") return rayMoves(board, p, true);
    if (p.type === "K") {
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
        const x = p.x + dx;
        const y = p.y + dy;
        const area = has(state, p.side, "kingRiver")
          ? inside(x, y)
          : has(state, p.side, "kingFree") ? inside(x, y) && ownHalf(p.side, y) : palace(p.side, x, y);
        if (area && !own(x, y)) moves.push({ x, y });
      });
      const other = board.find((q) => q.type === "K" && q.side !== p.side);
      if (other && other.x === p.x && clearLine(board, p.x, p.y, other.x, other.y) === 0) {
        moves.push({ x: other.x, y: other.y });
      }
    }
    if (p.type === "A") {
      const open = has(state, p.side, "advisorFree");
      const river = has(state, p.side, "advisorRiver");
      const steps = river
        ? [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]]
        : [[1, 1], [1, -1], [-1, 1], [-1, -1]];
      steps.forEach(([dx, dy]) => {
        const x = p.x + dx;
        const y = p.y + dy;
        const area = open && river ? inside(x, y) : open ? inside(x, y) && ownHalf(p.side, y) : palace(p.side, x, y);
        if (area && !own(x, y)) moves.push({ x, y });
      });
      if (open && river && has(state, p.side, "advisorStride")) {
        [[2, 2], [2, -2], [-2, 2], [-2, -2], [2, 0], [-2, 0], [0, 2], [0, -2]]
          .forEach(([dx, dy]) => add(moves, p.x + dx, p.y + dy));
      }
    }
    if (p.type === "B") {
      [[2, 2], [2, -2], [-2, 2], [-2, -2]].forEach(([dx, dy]) => {
        const x = p.x + dx;
        const y = p.y + dy;
        const blocked = at(board, p.x + dx / 2, p.y + dy / 2);
        const ownSide = has(state, p.side, "elephantRiver") || (p.side === "r" ? y >= 5 : y <= 4);
        if (inside(x, y) && ownSide && !blocked && !own(x, y)) moves.push({ x, y });
      });
      if (has(state, p.side, "elephantStep")) {
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => add(moves, p.x + dx, p.y + dy));
      }
    }
    if (p.type === "N") {
      const ignoresLeg = has(state, p.side, "horseLeap");
      [[2, 1, 1, 0], [2, -1, 1, 0], [-2, 1, -1, 0], [-2, -1, -1, 0],
        [1, 2, 0, 1], [-1, 2, 0, 1], [1, -2, 0, -1], [-1, -2, 0, -1]]
        .forEach(([dx, dy, lx, ly]) => (ignoresLeg || !at(board, p.x + lx, p.y + ly)) && add(moves, p.x + dx, p.y + dy));
      if (has(state, p.side, "horseStep")) {
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => add(moves, p.x + dx, p.y + dy));
      }
      if (has(state, p.side, "horseRun")) [[2, 0], [-2, 0], [0, 2], [0, -2]].forEach(([dx, dy]) => add(moves, p.x + dx, p.y + dy));
      if (has(state, p.side, "horseFly")) [[3, 0], [-3, 0], [0, 3], [0, -3]].forEach(([dx, dy]) => add(moves, p.x + dx, p.y + dy));
    }
    if (p.type === "P") {
      const dir = p.side === "r" ? -1 : 1;
      add(moves, p.x, p.y + dir);
      if (crossed(p) || has(state, p.side, "strongPawn")) {
        add(moves, p.x - 1, p.y);
        add(moves, p.x + 1, p.y);
      }
      if (has(state, p.side, "elitePawn")) [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([dx, dy]) => add(moves, p.x + dx, p.y + dy));
    }
    return moves;
  }

  function move(board, id, x, y) {
    const next = clone(board);
    const p = next.find((q) => q.id === id);
    const from = { x: p.x, y: p.y };
    const captured = next.find((q) => q.x === x && q.y === y);
    const filtered = next.filter((q) => q.id !== captured?.id);
    const moved = filtered.find((q) => q.id === id);
    moved.x = x;
    moved.y = y;
    return { board: filtered, captured, from };
  }

  function kingsFace(board) {
    const r = board.find((p) => p.side === "r" && p.type === "K");
    const b = board.find((p) => p.side === "b" && p.type === "K");
    return r && b && r.x === b.x && clearLine(board, r.x, r.y, b.x, b.y) === 0;
  }

  function inCheck(board, side, state) {
    if (state?.mode === "random" && side === "r") return false;
    const k = board.find((p) => p.side === side && p.type === "K");
    if (!k) return state?.mode !== "random";
    if (kingsFace(board)) return true;
    return board.some((p) => p.side !== side && pseudo(board, p, state).some((m) => m.x === k.x && m.y === k.y));
  }

  function legalMoves(board, id, state) {
    const p = board.find((q) => q.id === id);
    if (!p) return [];
    return pseudo(board, p, state).filter((m) => !blocksDivineKingCapture(board, m, p, state) && !window.XQ.Turtle?.blocks?.(board, m, p.side, state) && !inCheck(move(board, id, m.x, m.y).board, p.side, state));
  }

  function blocksDivineKingCapture(board, m, p, state) {
    const target = at(board, m.x, m.y);
    return p.side === "r" && p.type === "K" && target?.side === "b" && state?.enemyDivine?.targetId === target.id;
  }

  function sideMoves(board, side, state) {
    return board.filter((p) => p.side === side).flatMap((p) => legalMoves(board, p.id, state).map((m) => ({ ...m, id: p.id })));
  }

  return { at, clone, enemy, inCheck, legalMoves, move, sideMoves };
})();
