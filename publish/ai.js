window.XQ = window.XQ || {};

window.XQ.AI = (() => {
  const C = window.XQ.Config;
  const R = window.XQ.Rules;

  function scoreMove(state, move) {
    const p = state.board.find((q) => q.id === move.id);
    const target = R.at(state.board, move.x, move.y);
    const guard = window.XQ.Items.count(state, "guard");
    let score = Math.random() * 4;
    if (target) score += C.values[target.type] * (guard ? 0.78 : 1);
    const next = R.move(state.board, move.id, move.x, move.y).board;
    if (R.inCheck(next, "r", state)) score += 55;
    if (R.inCheck(next, "b", state)) score -= 180;
    if (p.type === "K") score -= 10;
    score += p.type === "R" || p.type === "C" ? 4 : 0;
    score -= Math.abs(4 - move.x) * 0.7;
    return score;
  }

  function choose(state) {
    const moves = R.sideMoves(state.board, "b", state);
    if (!moves.length) return null;
    return moves
      .map((m) => ({ ...m, score: scoreMove(state, m) }))
      .sort((a, b) => b.score - a.score)[0];
  }

  function hint(state) {
    const moves = R.sideMoves(state.board, "r", state);
    if (!moves.length) return null;
    const scout = window.XQ.Items.count(state, "scout");
    return moves
      .map((m) => {
        const target = R.at(state.board, m.x, m.y);
        const next = R.move(state.board, m.id, m.x, m.y).board;
        let score = target ? C.values[target.type] : 0;
        if (R.inCheck(next, "b", state)) score += scout ? 80 : 35;
        if (R.inCheck(next, "r", state)) score -= 80;
        return { ...m, score };
      })
      .sort((a, b) => b.score - a.score)[0];
  }

  return { choose, hint };
})();
