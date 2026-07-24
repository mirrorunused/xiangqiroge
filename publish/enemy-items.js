window.XQ = window.XQ || {};

window.XQ.EnemyItems = (() => {
  const RELATED = {
    K: ["kingFree", "kingRiver", "kingGuard", "turtleShell"],
    A: ["advisorFree", "advisorRiver", "advisorStride"],
    B: ["elephantRiver", "elephantStep"],
    N: ["horseStep", "horseLeap", "horseRun", "horseFly"],
    R: ["rookPhoenix"],
    C: ["cannon"],
    P: ["strongPawn", "elitePawn"],
    S: [],
    Q: [],
  };
  const RANDOM_POOL = [
    "guard", "elephantRiver", "elephantStep", "advisorFree", "advisorRiver",
    "advisorStride", "kingFree", "kingRiver", "kingGuard", "turtleShell",
    "rookPhoenix", "strongPawn", "elitePawn", "horseStep", "horseLeap",
    "horseRun", "horseFly",
  ];

  function grantRelated(state, type) {
    const wanted = new Set(RELATED[type] || []);
    return activeItems(state).filter((item) => wanted.has(item.id))
      .map((item) => grant(state, item.id, item.name)).filter(Boolean);
  }

  function takeRelated(state, type) {
    const items = activeItems(state);
    const wanted = new Set(RELATED[type] || []);
    const consumables = new Set(window.XQ.Config.consumableIds || []);
    const item = items.find((entry) => (
      wanted.has(entry.id) && !consumables.has(entry.id) && available(state, entry.id)
    ));
    if (!item) return [];
    const name = grant(state, item.id, item.name);
    if (!name) return [];
    removeOwned(state, item);
    return [name];
  }

  function grantRandom(state) {
    const pool = RANDOM_POOL.filter((id) => available(state, id));
    if (!pool.length) return "";
    const id = pool[Math.floor(Math.random() * pool.length)];
    return grant(state, id);
  }

  function grant(state, id, customName) {
    state.enemyTraits = state.enemyTraits || {};
    if (id === "turtleShell") {
      if (state.enemyTurtle) return "";
      state.enemyTurtle = { active: true, shield: 0, cooldown: 0 };
      return customName || itemName(id);
    }
    if (state.enemyTraits[id]) return "";
    state.enemyTraits[id] = true;
    window.XQ.EnemyTraits?.normalize?.(state.enemyTraits);
    return customName || itemName(id);
  }

  function loseRandom(state) {
    const ids = Object.keys(state.enemyTraits || {}).filter((id) => state.enemyTraits[id]);
    const candidates = state.enemyTurtle ? ids.concat("turtleShell") : ids;
    if (!candidates.length) return "";
    const id = candidates[Math.floor(Math.random() * candidates.length)];
    if (id === "turtleShell") state.enemyTurtle = null;
    else state.enemyTraits[id] = false;
    return itemName(id);
  }

  function available(state, id) {
    return id === "turtleShell" ? !state.enemyTurtle : !state.enemyTraits?.[id];
  }

  function activeItems(state) {
    return (state.items || []).concat(window.XQ.Mode?.activeOuterItems?.(state) || []);
  }

  function removeOwned(state, item) {
    const local = (state.items || []).indexOf(item);
    if (local >= 0) state.items.splice(local, 1);
    else {
      const outer = state.talents?.outerItems || [];
      const index = outer.indexOf(item);
      if (index >= 0) outer.splice(index, 1);
    }
    if (item.uid) state.keepUids = (state.keepUids || []).filter((uid) => uid !== item.uid);
    if (state.rebelOuterUid === item.uid) state.rebelOuterUid = null;
  }

  function itemName(id) {
    return window.XQ.Config.randomItems.find((item) => item.id === id)?.name || id;
  }

  return { grant, grantRandom, grantRelated, loseRandom, takeRelated };
})();
