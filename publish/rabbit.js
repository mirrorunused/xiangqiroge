window.XQ = window.XQ || {};

window.XQ.Rabbit = (() => {
  function trigger(state, result) {
    const enemyRabbit = result.captured?.side === "b" && state.enemyRabbit && state.enemyRabbit.cooldown <= 0;
    const playerRabbit = result.captured?.side === "r" && hasRabbitFoot(state) && !(state.rabbitFootCooldown > 0);
    if (!enemyRabbit && !playerRabbit) return "";
    const back = { x: result.captured.x, y: result.captured.y + (enemyRabbit ? -1 : 1) };
    const inside = back.x >= 0 && back.x < window.XQ.Config.files && back.y >= 0 && back.y < window.XQ.Config.ranks;
    if (!inside || state.board.some((piece) => piece.x === back.x && piece.y === back.y)) return "";
    state.board.push({ ...result.captured, x: back.x, y: back.y });
    if (enemyRabbit) Object.assign(state.enemyRabbit, { cooldown: 4, justTriggered: true });
    else state.rabbitFootCooldown = 4;
    return enemyRabbit
      ? "兔阵触发：黑方被吃棋子后退一格避开吃子，4 回合后可再次触发。"
      : "兔脚触发：己方被吃棋子后跳避开吃子，4 回合后可再次触发。";
  }

  function afterRedAction(state) {
    const rabbit = state.enemyRabbit;
    if (!rabbit) return;
    if (rabbit.justTriggered) { rabbit.justTriggered = false; return; }
    if (rabbit.cooldown > 0) rabbit.cooldown -= 1;
  }

  function afterEnemyAction(state) {
    if (state.rabbitFootCooldown > 0) state.rabbitFootCooldown -= 1;
  }

  function hasRabbitFoot(state) {
    return (window.XQ.Late?.activeItems?.(state) || state.items || []).some((item) => item.id === "rabbitFoot");
  }

  return { afterEnemyAction, afterRedAction, trigger };
})();
