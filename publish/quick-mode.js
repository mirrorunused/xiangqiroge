window.XQ = window.XQ || {};

window.XQ.QuickMode = (() => {
  function is(state) {
    return state?.mode === "quick";
  }

  function ensure(state) {
    if (!is(state)) return state;
    state.quickRunReady = Boolean(state.quickRunReady);
    state.quickChallengeLevel = Number(state.quickChallengeLevel) || 0;
    state.quickOpeningItemUids = Array.isArray(state.quickOpeningItemUids) ? state.quickOpeningItemUids : [];
    state.quickOpeningNoticePending = Boolean(state.quickOpeningNoticePending);
    return state;
  }

  function beforeLevel(state) {
    if (!is(state) || state.quickRunReady) return;
    state.quickRunReady = true;
    state.level = randomLevel();
    state.quickChallengeLevel = state.level;
    const pieceCounts = window.XQ.Config.redSetup.reduce((counts, [type]) => {
      counts[type] = (counts[type] || 0) + 1;
      return counts;
    }, {});
    const granted = window.XQ.ModeItems.grant(state, 5, { allowLocked: true, pieceCounts });
    state.quickOpeningItemUids = granted.map((item) => item.uid);
    state.quickOpeningNoticePending = true;
  }

  function randomLevel() {
    const first = window.XQ.Config.blackAddOrder.length + 1;
    const last = window.XQ.EnemyStages.lateBase(window.XQ.Config.blackAddOrder.length) + 18;
    return first + Math.floor(Math.random() * (last - first + 1));
  }

  function settleWin(state) {
    const points = 1000;
    state.score += points;
    state.phase = "quick-won";
    state.message = "快速模式胜利";
    state.pendingRewards = [];
    state.lastSettlement = {
      base: points,
      banner: 1,
      scoreMult: 1,
      points,
      formula: "快速模式固定胜利奖励=1000",
    };
    return { rewards: [], unlocked: [] };
  }

  function showEnd(state, won, leave) {
    const title = won ? "快速模式胜利" : "快速模式结束";
    const intro = won
      ? `固定胜利奖励 +1000 积分。当前积分 ${state.score}。`
      : `本局挑战结束。当前积分 ${state.score}。`;
    window.XQ.Render.showCards(title, intro, [{
      id: "menu",
      name: "返回模式选择",
      rarity: won ? "gold" : "red",
      text: "快速模式只进行一局，再次进入会重新随机关卡和开局道具。",
    }], async () => {
      window.XQ.Render.hideRewards();
      await leave();
    }, "locked");
  }

  return { beforeLevel, ensure, is, settleWin, showEnd, showOpening: window.XQ.ModeOpening.quick };
})();
