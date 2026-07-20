window.XQ = window.XQ || {};

window.XQ.TurnFlow = (() => {
  function afterRedAction(state) {
    const texts = [];
    const collapse = window.XQ.Collapse?.afterRedAction?.(state, state.lastActionCaptured);
    const fish = window.XQ.Fish?.afterRedAction?.(state);
    const corruption = window.XQ.Corruption?.afterRedAction?.(state);
    window.XQ.Turtle?.afterRedAction?.(state);
    window.XQ.Rabbit?.afterRedAction?.(state);
    if (collapse) texts.push(collapse);
    if (fish) texts.push(fish);
    if (corruption) texts.push(corruption);
    const max = (window.XQ.Levels.hasTempo(state) ? 2 : 1) + (active(state, "endure") ? 1 : 0);
    state.playerMovesLeft = Math.min(state.playerMovesLeft || 1, max);
    const capturedBlack = Boolean(state.lastActionCaptured && state.lastMove?.side === "r" && state.lastMove?.captured?.side === "b");
    const meteor = window.XQ.Meteor.afterRedAction(state, capturedBlack);
    if (meteor.text) texts.push(meteor.text);
    if (meteor.penalty) return { notice: texts.join("\n"), reason: "meteor" };
    state.playerMovesLeft -= 1;
    if (state.playerMovesLeft <= 0) {
      state.enemyMovesLeft = 1 + Math.min(2, state.enemyBonusMoves || 0);
      state.enemyBonusMoves = 0;
      state.enemyTurnSource = state.enemyMovesLeft > 1 ? "momentum" : null;
    }
    return { notice: texts.join("\n"), reason: meteor.warning ? "meteor-warning" : "" };
  }

  function active(state, id) {
    return (window.XQ.Late?.activeItems?.(state) || state.items || []).some((item) => item.id === id);
  }

  return { afterRedAction };
})();
