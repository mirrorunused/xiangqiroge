window.XQ = window.XQ || {};

window.XQ.Turtle = (() => {
  function trigger(state, result, attackerId) {
    const turtle = result.captured?.side === "b" ? state.enemyTurtle : playerTurtle(state);
    if (!["b", "r"].includes(result.captured?.side) || result.captured.type !== "K" || !turtle?.active) return "";
    const attacker = state.board.find((piece) => piece.id === attackerId);
    if (attacker && result.from) Object.assign(attacker, result.from);
    state.board.push({ ...result.captured });
    Object.assign(turtle, { active: false, shield: 3, cooldown: 9, justTriggered: true });
    return result.captured.side === "b"
      ? "黑将龟缩：本次吃将无效，黑将进入 3 回合无敌，9 回合后可再次龟缩。"
      : "龟壳触发：红帅龟缩避险，进入 3 回合无敌，9 回合后可再次生效。";
  }

  function blocks(board, move, side, state) {
    if (side === "r" && !protects(state, "b")) return false;
    if (side === "b" && !protects(state, "r")) return false;
    if (side !== "r" && side !== "b") return false;
    const target = board.find((piece) => piece.x === move.x && piece.y === move.y);
    return Boolean(target && target.side !== side && target.type === "K");
  }

  function ready(state, side) {
    return Boolean(turtleFor(state, side)?.active);
  }

  function protects(state, side) {
    return Boolean(turtleFor(state, side)?.shield > 0);
  }

  function afterRedAction(state) {
    const turtle = state.enemyTurtle;
    if (!turtle) return;
    if (turtle.justTriggered) { turtle.justTriggered = false; return; }
    if (turtle.shield > 0) turtle.shield -= 1;
    if (!turtle.active && turtle.cooldown > 0) turtle.cooldown -= 1;
    if (!turtle.active && turtle.cooldown <= 0) turtle.active = true;
  }

  function afterEnemyAction(state) {
    const turtle = playerTurtle(state);
    if (!turtle) return;
    if (turtle.justTriggered) { turtle.justTriggered = false; return; }
    if (turtle.shield > 0) turtle.shield -= 1;
    if (!turtle.active && turtle.cooldown > 0) turtle.cooldown -= 1;
    if (!turtle.active && turtle.cooldown <= 0) turtle.active = true;
  }

  function playerTurtle(state) {
    const hasShell = (window.XQ.Late?.activeItems?.(state) || state.items || []).some((item) => item.id === "turtleShell");
    if (!hasShell) { state.playerTurtle = null; return null; }
    const turtle = state.playerTurtle || { active: true, shield: 0, cooldown: 0 };
    turtle.shield = Math.max(0, Number(turtle.shield) || 0);
    turtle.cooldown = Math.max(0, Number(turtle.cooldown) || 0);
    turtle.justTriggered = Boolean(turtle.justTriggered);
    turtle.active = turtle.shield <= 0 && turtle.cooldown <= 0;
    state.playerTurtle = turtle;
    return turtle;
  }

  function turtleFor(state, side) {
    if (side === "b") return state.enemyTurtle;
    return side === "r" ? playerTurtle(state) : null;
  }

  return { afterEnemyAction, afterRedAction, blocks, protects, ready, sync: playerTurtle, trigger };
})();
