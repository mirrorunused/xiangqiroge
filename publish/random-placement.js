window.XQ = window.XQ || {};

window.XQ.RandomPlacement = (() => {
  let controls = null;

  function configure(next) {
    controls = next;
  }

  function active(state) {
    return window.XQ.RandomMode.is(state) && state.randomPlacement;
  }

  function recruit(state) {
    return state?.mode === "recruit";
  }

  function cells(state) {
    const occupied = new Set(state.board.map(key));
    return window.XQ.RandomMode.ownCells().filter((cell) => !occupied.has(key(cell)));
  }

  function select(state, id) {
    if (!active(state) || !state.randomReserve.some((piece) => piece.id === id)) return false;
    state.randomPlacementSelected = id;
    state.legal = cells(state);
    const piece = state.randomReserve.find((entry) => entry.id === id);
    state.message = `选择己方半场空位放置${label(piece)}`;
    return true;
  }

  function place(state, x, y) {
    if (!active(state) || !state.legal.some((cell) => cell.x === x && cell.y === y)) return false;
    const index = state.randomReserve.findIndex((piece) => piece.id === state.randomPlacementSelected);
    if (index < 0) return false;
    const [piece] = state.randomReserve.splice(index, 1);
    state.board.push({ ...piece, x, y });
    state.randomPlacementSelected = state.randomReserve[0]?.id || null;
    state.legal = state.randomReserve.length ? cells(state) : [];
    state.message = state.randomReserve.length ? `还需摆放 ${state.randomReserve.length} 枚棋子` : "布阵完成，可以开战";
    return true;
  }

  function remove(state, id) {
    if (!active(state)) return false;
    const index = state.board.findIndex((piece) => piece.id === id && piece.side === "r");
    if (index < 0) return false;
    const [piece] = state.board.splice(index, 1);
    state.randomReserve.unshift({ id: piece.id, side: "r", type: piece.type });
    select(state, piece.id);
    return true;
  }

  function auto(state) {
    if (!active(state)) return;
    const open = shuffle(cells(state));
    while (state.randomReserve.length && open.length) {
      state.board.push({ ...state.randomReserve.shift(), ...open.shift() });
    }
    state.randomPlacementSelected = null;
    state.legal = [];
    state.message = "已自动完成布阵，可以开战";
  }

  async function finish(state) {
    if (!active(state) || state.randomReserve.length || !controls) return;
    const total = window.XQ.RecruitTools.roster(state).length;
    if (!total) {
      window.XQ.Render.banner("至少选择一枚棋子才能开始");
      return;
    }
    const cost = window.XQ.RecruitTools.totalCost(state);
    if (recruit(state) && (state.score < 0 || state.score < cost)) {
      window.XQ.Render.banner(state.score < 0 ? "积分为负，不能开始招兵买马" : `积分不足，本轮需要 ${cost} 积分`);
      return;
    }
    if (recruit(state)) {
      state.score -= cost;
      state.recruitPaidCost = cost;
    }
    state.randomPlacement = false;
    state.phase = "play";
    state.selected = null;
    state.legal = [];
    state.message = recruit(state) ? `招兵买马开战：本轮出阵花费 ${cost} 积分` : "随机棋开战：全军覆没才会失败";
    state.randomLevelStartPieces = window.XQ.RandomMode.redPieces(state.board);
    window.XQ.Fish?.startLevel?.(state);
    window.XQ.Drops.start(state);
    window.XQ.Collapse?.startLevel?.(state);
    window.XQ.RoundEffects?.startLevel?.(state);
    controls.render();
    await controls.flush();
    window.XQ.Render.banner("布阵完成，开始战斗");
  }

  async function handlePiece(state, id) {
    if (!active(state)) return false;
    if (remove(state, id)) {
      controls.render();
      void controls.save();
    }
    return true;
  }

  async function handleMove(state, x, y) {
    if (!active(state)) return false;
    if (place(state, x, y)) {
      controls.render();
      void controls.save();
    }
    return true;
  }

  function render(state) {
    const panel = document.getElementById("randomPlacementPanel");
    if (!panel) return;
    const isActive = active(state);
    const isRecruit = isActive && recruit(state);
    document.querySelector(".game-shell")?.classList.toggle("recruit-placement-active", isRecruit);
    panel.classList.toggle("hidden", !isActive);
    window.XQ.BoardLayout?.fit?.();
    if (!isActive) return;
    const reserve = document.getElementById("randomReserve");
    reserve.classList.toggle("recruiting", recruit(state));
    document.getElementById("randomPlacementTitle").textContent = recruit(state) ? "招兵买马布阵" : "随机棋布阵";
    const selectedType = state.randomReserve.find((piece) => piece.id === state.randomPlacementSelected)?.type;
    const counts = new Map();
    state.randomReserve.forEach((piece) => counts.set(piece.type, (counts.get(piece.type) || 0) + 1));
    if (recruit(state)) {
      state.board.filter((piece) => piece.side === "r").forEach((piece) => counts.set(piece.type, (counts.get(piece.type) || 0) + 1));
    }
    reserve.innerHTML = "";
    if (recruit(state)) window.XQ.RecruitTools.renderControls(state, reserve, selectedType, counts, {
      cells, render: controls.render, save: controls.save, select,
    });
    else counts.forEach((count, type) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = selectedType === type ? "selected" : "";
        button.textContent = `${window.XQ.Config.labels.r[type]} ×${count}`;
        button.onclick = () => {
          const piece = state.randomReserve.find((entry) => entry.type === type);
          if (piece && select(state, piece.id)) controls.render();
        };
        reserve.appendChild(button);
      });
    document.getElementById("randomPlacementStatus").textContent = recruit(state)
      ? `已摆放 ${state.board.filter((piece) => piece.side === "r").length}/${window.XQ.RecruitTools.roster(state).length} · 费用 ${window.XQ.RecruitTools.totalCost(state)} 积分`
      : `已摆放 ${16 - state.randomReserve.length}/16`;
    const start = document.getElementById("randomStartBtn");
    start.disabled = state.randomReserve.length > 0 || !window.XQ.RecruitTools.roster(state).length;
    start.onclick = () => void finish(state);
    document.getElementById("randomAutoBtn").onclick = () => {
      auto(state);
      controls.render();
      void controls.save();
    };
  }

  function shuffle(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function key(piece) { return `${piece.x},${piece.y}`; }
  function label(piece) { return window.XQ.Config.labels.r[piece?.type] || "棋子"; }

  return { active, auto, cells, configure, finish, handleMove, handlePiece, place, remove, render, select };
})();
