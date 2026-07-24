window.XQ = window.XQ || {};

window.XQ.Meteor = (() => {
  const NAME = "飒沓流星";

  function canBuy(state) {
    return !state.meteorPending && !state.meteorActive && !state.meteorPenaltyPending;
  }

  function arm(state) {
    if (!canBuy(state)) return false;
    state.meteorPending = false;
    state.meteorActive = true;
    state.meteorPenaltyPending = false;
    return true;
  }

  function cost(level) {
    return Math.max(1, Math.floor((160 + Math.max(1, level || 1) * 28) / 2));
  }

  function normalize(state) {
    state.meteorPenaltyPending = Boolean(state.meteorPenaltyPending);
    if (state.meteorPending && state.side === "r") {
      state.meteorPending = false;
      state.meteorActive = true;
    }
    return state;
  }

  function startTurn(state) {
    if (!state.meteorPending) return "";
    state.meteorPending = false;
    state.meteorActive = true;
    state.meteorPenaltyPending = false;
    return `${NAME}生效：本回合每吃一个黑子，增加一次红方行动；首次未吃子将触发反噬。`;
  }

  function startLevel(state) {
    state.meteorActive = false;
    state.meteorPenaltyPending = false;
    state.enemyTurnSource = null;
    return startTurn(state);
  }

  function afterRedAction(state, capturedBlack) {
    if (state.meteorPenaltyPending) {
      state.meteorPenaltyPending = false;
      return triggerPenalty(state);
    }
    if (!state.meteorActive) return { penalty: false, text: "" };
    if (capturedBlack) {
      state.playerMovesLeft = (state.playerMovesLeft || 0) + 1;
      return { penalty: false, text: `${NAME}：吃子续行，红方行动次数 +1。` };
    }
    state.meteorActive = false;
    if ((state.playerMovesLeft || 1) > 1) {
      state.meteorPenaltyPending = true;
      return { penalty: false, warning: true, text: "" };
    }
    return triggerPenalty(state);
  }

  function triggerPenalty(state) {
    state.playerMovesLeft = 0;
    state.enemyMovesLeft = 3;
    state.enemyBonusMoves = 0;
    state.enemyTurnSource = "meteor";
    return { penalty: true, text: `${NAME}反噬：本次未吃子，黑方连续行动 3 步。` };
  }

  function confirmPurchase(card, confirm, cancel) {
    window.XQ.Render.showCards(`确认购买：${NAME}`,
      `将花费 ${card.cost} 积分。购买后立即作用于当前红方回合；首次未吃子时效果失效，若仍有原有行动可先走完，之后黑方连续行动 3 步。`,
      [
        { id: "confirm", name: "确认购入", rarity: "red", text: "接受反噬风险，购买该消耗品。" },
        { id: "cancel", name: "暂不购买", rarity: "white", text: "返回局内商店，不扣除积分。" },
      ],
      async (choice) => {
        if (choice.id === "confirm") await confirm();
        else cancel();
      }, "locked");
  }

  return { afterRedAction, arm, canBuy, confirmPurchase, cost, normalize, startLevel, startTurn };
})();
