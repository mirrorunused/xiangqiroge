window.XQ = window.XQ || {};

window.XQ.Defense = (() => {
  function canSaveKing(state) {
    return window.XQ.Turtle.ready(state, "r") || window.XQ.KingGuard.has(state, "r");
  }

  function deferLockedKing(state, rules) {
    if (!rules.inCheck(state.board, "r", state) || !canSaveKing(state)) return false;
    state.side = "b";
    state.enemyMovesLeft = 1;
    state.playerMovesLeft = 0;
    state.enemyTurnSource = "defense";
    state.selected = null;
    state.legal = [];
    state.previewSelected = null;
    state.message = "红帅已被将死，黑方继续吃帅以结算龟壳或护驾符";
    return true;
  }

  return { canSaveKing, deferLockedKing };
})();
