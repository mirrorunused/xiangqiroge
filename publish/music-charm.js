window.XQ = window.XQ || {};

window.XQ.MusicCharm = (() => {
  function startLevel(state) {
    restore(state);
    if (!state.enemyMusic?.active) return "";
    Object.assign(state.enemyMusic, { turns: 0, controlledIds: [] });
    return "";
  }

  function startTurn(state) {
    const effect = state.enemyMusic;
    if (!effect?.active) return "";
    restore(state);
    effect.turns = (effect.turns || 0) + 1;
    if (effect.turns % 3 !== 0) return "";
    const count = effect.turns >= 6 ? 2 : 1;
    const candidates = shuffle(state.board.filter((piece) => piece.side === "r" && piece.type !== "K"));
    const picked = candidates.slice(0, count);
    picked.forEach((piece) => {
      piece.side = "b";
      piece.musicControlled = true;
      piece.musicOriginalSide = "r";
    });
    effect.controlledIds = picked.map((piece) => piece.id);
    if (!picked.length) return "迷音发动，但没有可控制的红方棋子。";
    const names = picked.map((piece) => window.XQ.Config.labels.r[piece.type] || piece.type);
    return `迷音发动：${names.join("、")}暂由黑方控制一回合，并保留红方道具加成。`;
  }

  function restore(state) {
    let count = 0;
    (state.board || []).forEach((piece) => {
      if (!piece.musicControlled) return;
      piece.side = piece.musicOriginalSide || "r";
      delete piece.musicControlled;
      delete piece.musicOriginalSide;
      count += 1;
    });
    if (state.enemyMusic) state.enemyMusic.controlledIds = [];
    return count;
  }

  function shuffle(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const pick = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[pick]] = [copy[pick], copy[index]];
    }
    return copy;
  }

  return { restore, startLevel, startTurn };
})();
