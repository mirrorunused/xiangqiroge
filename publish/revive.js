window.XQ = window.XQ || {};

window.XQ.Revive = (() => {
  const C = window.XQ.Config;
  const UI = window.XQ.Render;

  async function start(state, render) {
    const dead = state.capturedRed || [];
    if (!dead.length) return UI.banner("暂无可取回的己方棋子");
    const cards = dead.map((piece) => ({
      id: piece.capturedUid,
      name: `${C.labels.r[piece.type]} 归阵`,
      rarity: piece.type === "R" || piece.type === "C" ? "gold" : "purple",
      text: "放在己方半场空格不消耗行动；若落在可拾取道具上会立即触发，并消耗一次红方行动。",
    }));
    UI.showCards("归阵令", "选择一个被吃掉的己方棋子。空格归阵不消耗行动，拾取道具时才消耗行动。", cards, async (card) => {
      state.pendingRevive = { capturedUid: card.id };
      state.selected = null;
      state.legal = cells(state);
      state.message = "选择己方半场空位放置";
      UI.hideRewards();
      render();
    }, "locked");
  }

  async function place(state, x, y) {
    if (!state.pendingRevive || !state.legal.some((cell) => cell.x === x && cell.y === y)) return false;
    const index = state.capturedRed.findIndex((piece) => piece.capturedUid === state.pendingRevive.capturedUid);
    if (index < 0) return false;
    const [piece] = state.capturedRed.splice(index, 1);
    const pickedUp = (state.fieldItems || []).some((item) => item.x === x && item.y === y);
    state.board.push({ ...piece, x, y });
    state.pendingRevive = null;
    state.legal = [];
    state.lastActionCaptured = false;
    const label = C.labels.r[piece.type];
    const pickupText = await window.XQ.Drops.collect(state, piece.id, "r");
    state.message = pickedUp ? `${label}归阵并拾取道具` : `${label}已归阵，行动次数不变`;
    return {
      consumesAction: pickedUp,
      text: pickedUp ? `${label}已归阵；${pickupText || "拾取道具"}` : state.message,
    };
  }

  function cells(state) {
    const spots = [];
    for (let y = 5; y < 10; y += 1) for (let x = 0; x < 9; x += 1) {
      if (!window.XQ.Rules.at(state.board, x, y)) spots.push({ x, y });
    }
    return spots;
  }

  return { place, start };
})();
