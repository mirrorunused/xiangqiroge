window.XQ = window.XQ || {};

window.XQ.Outcome = (() => {
  function onlyKings(state) {
    const red = state.board.filter((p) => p.side === "r");
    return (state.board.length === 2 && state.board.every((p) => p.type === "K")) || (red.length === 1 && red[0].type === "K");
  }

  function redLocked(state) {
    return !window.XQ.Rules.sideMoves(state.board, "r", state).length;
  }

  function winText(state) {
    if (!state.board.some((piece) => piece.side === "b" && piece.type === "K")) return "斩将成功";
    if (!window.XQ.Rules.sideMoves(state.board, "b", state).length) return "黑方无合法走法";
    return "";
  }

  function settleWin(state, text) {
    const resultText = winText(state);
    if (!resultText) throw new Error("胜利条件未满足");
    if (window.XQ.QuickMode.is(state)) {
      state.message = text || resultText;
      return window.XQ.QuickMode.settleWin(state);
    }
    window.XQ.Levels.settle(state);
    state.phase = "won";
    state.message = text || resultText;
    if (state.level === 14) window.XQ.Progression.unlockTempo(state);
    let storyGallery = "";
    if (state.level === 15) {
      window.XQ.Progression.finishRun(state);
      storyGallery = window.XQ.Progression.unlockStoryGalleries(state);
    }
    const unlocked = window.XQ.Progression.unlockComboShop(state);
    if (storyGallery) unlocked.unshift(storyGallery);
    const rewards = state.mode === "random" ? window.XQ.RandomMode.reward(state) : window.XQ.Items.roll(state.level, state);
    state.pendingRewards = rewards;
    return { rewards, unlocked };
  }

  function applyReward(state, card) {
    const real = (state.pendingRewards || []).find((item) => item.id === card.id && item.name === card.name);
    if (!real) throw new Error("奖励卡校验失败");
    window.XQ.Items.apply(state, real);
    state.phase = "rewarded";
    state.pendingRewards = [];
    state.message = real.points ? `获得 ${real.name}，积分 +${real.points}` : `获得 ${real.name}`;
    return real;
  }

  return { applyReward, onlyKings, redLocked, settleWin, winText };
})();
