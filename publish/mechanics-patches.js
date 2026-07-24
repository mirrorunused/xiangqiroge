window.XQ = window.XQ || {};

(() => {
  function installRules(value) {
    if (!value?.legalMoves || value.legalMoves.charmKingGuard) return value;
    const original = value.legalMoves;
    const wrapped = function wrappedLegalMoves(board, id, state) {
      const piece = board.find((entry) => entry.id === id);
      const moves = original.call(this, board, id, state);
      if (piece?.side !== "r" || piece.type !== "K" || !state?.enemyCharm?.blade) return moves;
      return moves.filter((move) => !(state.charmTiles || [])
        .some((tile) => tile.x === move.x && tile.y === move.y));
    };
    wrapped.charmKingGuard = true;
    value.legalMoves = wrapped;
    value.sideMoves = (board, side, state) => board.filter((piece) => piece.side === side)
      .flatMap((piece) => value.legalMoves(board, piece.id, state)
        .map((move) => ({ ...move, id: piece.id })));
    return value;
  }

  function installEnemyItems(value) {
    if (!value?.takeRelated || value.takeRelated.singleNonConsumable) return value;
    const wrapped = function takeOneRelated(state, type) {
      const related = {
        K: ["kingFree", "kingRiver", "kingGuard", "turtleShell"],
        A: ["advisorFree", "advisorRiver", "advisorStride"],
        B: ["elephantRiver", "elephantStep"],
        N: ["horseStep", "horseLeap", "horseRun", "horseFly"],
        R: ["rookPhoenix"], C: ["cannon"], P: ["strongPawn", "elitePawn"], S: [], Q: [],
      };
      const items = (state.items || []).concat(window.XQ.Mode?.activeOuterItems?.(state) || []);
      const consumables = new Set(window.XQ.Config?.consumableIds || []);
      const item = items.find((entry) => (related[type] || []).includes(entry.id)
        && !consumables.has(entry.id)
        && (entry.id === "turtleShell" ? !state.enemyTurtle : !state.enemyTraits?.[entry.id]));
      if (!item) return [];
      const name = value.grant(state, item.id, item.name);
      if (!name) return [];
      removeOwned(state, item);
      return [name];
    };
    wrapped.singleNonConsumable = true;
    value.takeRelated = wrapped;
    return value;
  }

  function removeOwned(state, item) {
    const local = (state.items || []).indexOf(item);
    const outer = state.talents?.outerItems || [];
    const outerIndex = outer.indexOf(item);
    if (local >= 0) state.items.splice(local, 1);
    else if (outerIndex >= 0) outer.splice(outerIndex, 1);
    if (item.uid) state.keepUids = (state.keepUids || []).filter((uid) => uid !== item.uid);
    if (state.rebelOuterUid === item.uid) state.rebelOuterUid = null;
  }

  function installCharm(value) {
    if (!value?.onRedMove || value.onRedMove.kingSafe) return value;
    const original = value.onRedMove;
    const originalCapture = value.onBlackCapture;
    const wrapped = function wrappedRedMove(state, pieceId) {
      const piece = state.board?.find((entry) => entry.id === pieceId);
      const onTile = (state.charmTiles || [])
        .some((tile) => tile.x === piece?.x && tile.y === piece?.y);
      return piece?.side === "r" && piece.type === "K" && onTile
        ? "红帅不能进入魅惑格。"
        : original.call(this, state, pieceId);
    };
    wrapped.kingSafe = true;
    value.onRedMove = wrapped;
    value.onBlackCapture = function wrappedBlackCapture(state, result, pieceId) {
      const charm = originalCapture?.call(this, state, result, pieceId) || "";
      const sacrifice = window.XQ.Sacrifice?.onEnemyCapture?.(state, result.captured) || "";
      return [charm, sacrifice].filter(Boolean).join("\n");
    };
    return value;
  }

  function installSacrifice(value) {
    if (!value || value.onEnemyCapture) return value;
    value.onEnemyCapture = function onEnemyCapture(state, captured) {
      if (!state.enemySacrifice?.active || captured?.side !== "r") return "";
      const item = window.XQ.EnemyItems.grantRandom(state);
      const piece = window.XQ.Config.labels?.r?.[captured.type] || captured.type;
      return item ? `生祭：黑方吃掉红方${piece}，获得${item}` : `生祭：黑方吃掉红方${piece}`;
    };
    return value;
  }

  function installBattle(value) {
    if (!value?.create || value.create.checkPromptFixed) return value;
    const original = value.create;
    const wrapped = function wrappedCreate(options) {
      const render = options.render;
      return original.call(this, {
        ...options,
        render(...args) {
          const state = options.getState?.();
          if (state?.message === "这枚棋子当前无合法走法"
            && window.XQ.Rules.inCheck(state.board, "r", state)) {
            state.message = "红帅正被将军；这枚棋子当前没有合法解围走法";
          }
          return render(...args);
        },
      });
    };
    wrapped.checkPromptFixed = true;
    value.create = wrapped;
    return value;
  }

  function installLate(value) {
    if (!value?.startLevel || value.startLevel.charmNoticeFixed) return value;
    const original = value.startLevel;
    const wrapped = function wrappedStartLevel(state, ...args) {
      const result = original.call(this, state, ...args);
      if (state.hardNotice) state.hardNotice = state.hardNotice.replace(
        "红子踏入即倒戈，且黑方夺取对应棋子道具。",
        "红帅不能进入魅惑格；其他红子每次进入后倒戈，黑方仅夺取 1 个对应的非消耗品道具。",
      ).replace(
        "黑方可吃己方非将棋子并获得随机道具，每 2 回合随机增援一枚棋子。",
        "黑方吃掉红方棋子或献祭己方非将棋子时获得随机道具，每 2 回合随机增援一枚棋子。",
      );
      return result;
    };
    wrapped.charmNoticeFixed = true;
    value.startLevel = wrapped;
    return value;
  }

  function definePatched(name, install) {
    let current;
    Object.defineProperty(window.XQ, name, {
      configurable: true,
      enumerable: true,
      get() { return current; },
      set(value) { current = install(value); },
    });
  }

  definePatched("Rules", installRules);
  definePatched("EnemyItems", installEnemyItems);
  definePatched("Charm", installCharm);
  definePatched("Sacrifice", installSacrifice);
  definePatched("Battle", installBattle);
  definePatched("Late", installLate);
})();
