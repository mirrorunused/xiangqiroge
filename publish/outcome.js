window.XQ = window.XQ || {};

window.XQ.Outcome = (() => {
  function onlyKings(state) {
    const red = state.board.filter((p) => p.side === "r");
    return (state.board.length === 2 && state.board.every((p) => p.type === "K")) || (red.length === 1 && red[0].type === "K");
  }

  function redLocked(state) {
    const locked = !window.XQ.Rules.sideMoves(state.board, "r", state).length;
    if (locked && window.XQ.Defense.deferLockedKing(state, window.XQ.Rules)) return false;
    return locked;
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
    let milestones = [];
    if (state.level === 15) {
      milestones = window.XQ.Progression.finishRun(state);
      milestones.push(...window.XQ.Progression.unlockStoryGalleries(state));
      if (["normal", "rebel", "random", "recruit"].includes(state.mode)) state.slotUsePending = true;
    }
    const unlocked = milestones.concat(window.XQ.Progression.unlockComboShop(state));
    const rewards = window.XQ.RandomMode?.is?.(state) ? window.XQ.RandomMode.reward(state) : window.XQ.Items.roll(state.level, state);
    state.pendingRewards = rewards;
    return { rewards, unlocked };
  }

  function applyReward(state, card) {
    const real = (state.pendingRewards || []).find((item) => item.id === card.id && item.name === card.name);
    if (!real) throw new Error("奖励卡校验失败");
    window.XQ.Items.apply(state, real);
    window.XQ.MoveRecord?.event?.(state, `获得过关奖励：${real.name}`, "item");
    state.phase = "rewarded";
    state.pendingRewards = [];
    const slotUse = state.slotUsePending;
    if (slotUse) {
      window.XQ.Progression.grantSlotUse(state);
      state.slotUsePending = false;
      window.XQ.MoveRecord?.event?.(state, "征程结算完成：私库搜寻次数 +1", "mechanism");
    }
    state.message = real.points ? `获得 ${real.name}，积分 +${real.points}` : `获得 ${real.name}`;
    if (slotUse) state.message += "；征程结算完成，私库搜寻次数 +1";
    return real;
  }

  return { applyReward, onlyKings, redLocked, settleWin, winText };
})();
