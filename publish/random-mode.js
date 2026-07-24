window.XQ = window.XQ || {};

window.XQ.RandomMode = (() => {
  const TYPES = ["K", "A", "B", "N", "R", "C", "P", "S", "Q"];
  const DESTROY_SHOP_CHANCE = 0.3;
  const SCORE_OUTER = new Set(["banner", "cannon", "mult"]);
  const SHOP_ALLOWED = new Set([
    "banner", "cannon", "mult", "supply", "shopFree", "kingGuard",
    "pawnSpell", "revive", "letMove", "destroy", "donate", "morph", "meteor", "offboard", "riverFlood", "charmMakeup",
  ]);

  function is(state) {
    return ["random", "recruit"].includes(state?.mode);
  }

  function ensure(state) {
    if (!is(state)) return state;
    state.randomReserve = Array.isArray(state.randomReserve) ? state.randomReserve : [];
    state.randomPlacement = Boolean(state.randomPlacement);
    state.randomRunReady = Boolean(state.randomRunReady);
    state.randomLevelStartPieces = clone(state.randomLevelStartPieces);
    state.randomOpeningItemUids = Array.isArray(state.randomOpeningItemUids) ? state.randomOpeningItemUids : [];
    state.randomOpeningNoticePending = Boolean(state.randomOpeningNoticePending); window.XQ.ComboOrder.ensureRandom(state);
    ensureOpeningRules(state);
    return state;
  }

  function prepareRun(state) {
    if (!is(state) || state.randomRunReady) return;
    state.randomRunReady = true;
    state.randomPlacement = true;
    state.randomReserve = draft(state);
    state.randomPlacementSelected = state.randomReserve[0]?.id || null;
    state.randomLevelStartPieces = [];
    const granted = grantOpeningItems(state);
    const free = state.items.filter((item) => ["kingFree", "advisorFree"].includes(item.id));
    state.randomOpeningItemUids = free.concat(granted).map((item) => item.uid);
    state.randomOpeningNoticePending = true;
  }

  function draft(state) {
    const seed = `${Date.now()}${Math.random().toString(16).slice(2)}`;
    const types = state?.mode === "recruit"
      ? window.XQ.Config.redSetup.map(([type]) => type)
      : Array.from({ length: 16 }, () => TYPES[Math.floor(Math.random() * TYPES.length)]);
    const pieces = types.map((type, index) => ({ id: `rr${seed}${index}`, side: "r", type }));
    return shuffle(pieces);
  }

  function grantOpeningItems(state) {
    if (state.randomOpeningGranted) return [];
    state.randomOpeningGranted = true;
    const counts = pieceCounts(state.randomReserve);
    return window.XQ.ModeItems.grant(state, 5, {
      excludeIds: ["kingFree", "advisorFree"],
      pieceCounts: counts,
      randomLocked: true,
    });
  }

  function ensureOpeningRules(state) {
    window.XQ.ModeItems.grantIds(state, ["kingFree", "advisorFree"], true);
  }

  function pieceCounts(pieces) {
    return (pieces || []).reduce((counts, piece) => {
      counts[piece.type] = (counts[piece.type] || 0) + 1;
      return counts;
    }, {});
  }

  function beforeLevel(state) {
    if (!is(state)) return;
    window.XQ.DropMorphs.restoreState(state);
    prepareRun(state);
    if (!state.randomPlacement) state.randomLevelStartPieces = redPieces(state.board);
  }

  function carryBoard(state, black) {
    if (!is(state)) return black;
    const occupied = new Set(black.map(key));
    const result = black.map((piece) => ({ ...piece }));
    const returning = [];
    redPieces(state.board).forEach((piece) => {
      if (inside(piece) && piece.y >= 5 && !occupied.has(key(piece))) {
        occupied.add(key(piece));
        result.push({ ...piece });
      } else returning.push(piece);
    });
    const open = shuffle(ownCells().filter((cell) => !occupied.has(key(cell))));
    returning.forEach((piece) => {
      const cell = open.pop();
      if (!cell) return;
      const next = { ...piece, ...cell };
      occupied.add(key(next));
      result.push(next);
    });
    return result;
  }

  function restoreLevelStart(state) {
    if (is(state)) state.board = clone(state.randomLevelStartPieces);
  }

  function reward(state) {
    const cards = window.XQ.Items.roll(state.level, state);
    return [cards[Math.floor(Math.random() * cards.length)]];
  }

  function shopAllowed(card) {
    return SHOP_ALLOWED.has(card.id);
  }

  function shop(level, state, cards) {
    const itemIds = new Set(window.XQ.Config.randomItems.map((item) => item.id));
    const allowed = cards.filter((card) => (
      shopAllowed(card) && (card.id !== "destroy" || Math.random() < DESTROY_SHOP_CHANCE)
    ));
    const normal = allowed.filter((card) => itemIds.has(card.id) && !card.sharedSlot);
    const extras = allowed.filter((card) => !itemIds.has(card.id) || card.sharedSlot);
    const used = new Set(normal.map((card) => card.id));
    const pool = window.XQ.Config.randomItems.filter((item) => (
      item.id !== "revive" && shopAllowed(item) && !used.has(item.id) && window.XQ.Items.canOffer(state, item, "shop")
    ));
    while (normal.length < 3 && pool.length) {
      const item = window.XQ.ItemRoll.pick(pool, window.XQ.ItemRoll.shopBonus);
      const card = window.XQ.Items.makeCard(pool.splice(pool.indexOf(item), 1)[0], level);
      card.cost = shopCost(card, level, normal.length);
      normal.push(card);
    }
    return normal.concat(extras);
  }

  function shopCost(card, level, index) {
    const cost = 140 + level * 24 + index * 55;
    if (card.id === "kingGuard") return 800;
    if (card.id === "meteor") return window.XQ.Meteor.cost(level);
    if (card.id === "offboard") return 620 + level * 30;
    if (card.id === "shopFree") return 10;
    if (card.id === "supply") return Math.max(1, Math.floor((card.points || cost) / 2));
    return cost;
  }

  function activeOuterItems(state, items) {
    return is(state) ? items.filter((item) => SCORE_OUTER.has(item.id)) : items;
  }

  function passLocked(state, rules) {
    if (!is(state) || rules.sideMoves(state.board, "r", state).length) return false;
    state.side = "b";
    state.enemyMovesLeft = 1;
    state.message = "红方暂无合法走法，黑方继续行动";
    return true;
  }

  async function checkOutcome(state, options, rules) {
    if (!is(state)) return null;
    let result = null;
    if (!state.board.some((piece) => piece.side === "r")) {
      const modeName = state.mode === "recruit" ? "招兵买马" : "随机棋";
      result = options.lose(`红方棋子已全部被吃，${modeName}征程结束`);
    }
    else if (!state.board.some((piece) => piece.side === "b" && piece.type === "K")) result = options.win("斩将成功");
    else if (!rules.sideMoves(state.board, "b", state).length) result = options.win("黑方无合法走法");
    if (!result) return false;
    await result;
    return true;
  }

  function redPieces(board) {
    return (board || []).filter((piece) => piece.side === "r").map((piece) => ({ ...piece }));
  }

  function clone(value) {
    return (value || []).map((entry) => ({ ...entry }));
  }

  function ownCells() {
    const cells = [];
    for (let y = 5; y < 10; y += 1) for (let x = 0; x < 9; x += 1) cells.push({ x, y });
    return cells;
  }

  function shuffle(list) {
    const copy = [...list];
    for (let i = copy.length - 1; i > 0; i -= 1) {
      const j = Math.floor(Math.random() * (i + 1));
      [copy[i], copy[j]] = [copy[j], copy[i]];
    }
    return copy;
  }

  function key(piece) { return `${piece.x},${piece.y}`; }
  function inside(piece) { return piece.x >= 0 && piece.x < 9 && piece.y >= 0 && piece.y < 10; }

  return {
    activeOuterItems, beforeLevel, carryBoard, checkOutcome, ensure, is,
    ownCells, passLocked, prepareRun, redPieces, restoreLevelStart, reward, shop, shopAllowed,
    showOpening: (state) => state.mode === "recruit"
      ? window.XQ.ModeOpening.recruit(state)
      : window.XQ.ModeOpening.random(state),
  };
})();
