window.XQ = window.XQ || {};

window.XQ.RecruitTools = (() => {
  const TYPES = ["K", "A", "B", "N", "R", "C", "P", "S", "Q"];
  const RECRUIT_VALUES = { K: 25, Q: 180 };

  function roster(state) {
    return state.board.filter((piece) => piece.side === "r").concat(state.randomReserve);
  }

  function totalCost(state) {
    return roster(state).reduce((sum, piece) => sum + value(piece.type), 0);
  }

  function value(type) {
    return RECRUIT_VALUES[type] ?? window.XQ.Config.values[type] ?? 0;
  }

  function renderControls(state, reserve, selectedType, counts, api) {
    TYPES.forEach((type) => {
      const row = document.createElement("div");
      row.className = "recruit-piece-control";
      const minus = document.createElement("button");
      minus.type = "button";
      minus.textContent = "-";
      minus.title = `减少${window.XQ.Config.labels.r[type]}`;
      minus.disabled = !state.randomReserve.some((piece) => piece.type === type);
      minus.onclick = () => {
        const index = state.randomReserve.findIndex((piece) => piece.type === type);
        if (index < 0) return;
        state.randomReserve.splice(index, 1);
        state.randomPlacementSelected = state.randomReserve[0]?.id || null;
        state.legal = state.randomReserve.length ? api.cells(state) : [];
        api.render();
        void api.save();
      };
      const pick = document.createElement("button");
      pick.type = "button";
      pick.className = selectedType === type ? "selected" : "";
      pick.textContent = `${window.XQ.Config.labels.r[type]} ×${counts.get(type) || 0}`;
      pick.onclick = () => {
        const piece = state.randomReserve.find((entry) => entry.type === type);
        if (piece && api.select(state, piece.id)) api.render();
      };
      const plus = document.createElement("button");
      plus.type = "button";
      plus.textContent = "+";
      plus.title = `增加${window.XQ.Config.labels.r[type]}`;
      plus.disabled = roster(state).length >= 16;
      plus.onclick = () => {
        const id = `rr${Date.now()}${Math.random().toString(16).slice(2)}`;
        state.randomReserve.push({ id, side: "r", type });
        api.select(state, id);
        api.render();
        void api.save();
      };
      row.append(minus, pick, plus);
      reserve.appendChild(row);
    });
  }

  return { renderControls, roster, totalCost };
})();
