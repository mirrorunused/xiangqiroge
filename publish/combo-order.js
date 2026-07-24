window.XQ = window.XQ || {};

window.XQ.ComboOrder = (() => {
  const START_OFFSET = 8;
  const REBEL_START = 16;
  const FIXED = [
    "turtle", "fish", "rabbit", "linkedBranches", "divine", "collapse", "eunuch",
    "charmFormation", "horse1", "horse2", "reinforcement", "charmBlade", "horse3",
    "corruption", "horse4", "music", "incense", "momentum", "karma", "sacrifice",
  ];
  const NAMES = {
    turtle: "龟缩", fish: "鱼水", rabbit: "兔阵", divine: "神选", collapse: "崩盘", eunuch: "宦潮",
    charmFormation: "媚阵", horse1: "纵马1", horse2: "纵马2", reinforcement: "增援",
    charmBlade: "媚骨蚀锋", horse3: "纵马3", corruption: "染心", horse4: "纵马4",
    music: "迷音", incense: "香阵", momentum: "盈不可久", karma: "业障", linkedBranches: "连枝", sacrifice: "生祭",
  };
  const BLOCKS = [
    ["turtle"], ["fish"], ["rabbit", "linkedBranches"], ["divine"], ["collapse"],
    ["eunuch", "charmFormation", "horse1", "horse2", "reinforcement", "charmBlade", "horse3", "corruption", "horse4", "music", "incense"],
    ["momentum", "karma"],
  ];

  function fixedAt(offset) {
    return FIXED[offset - START_OFFSET];
  }

  function fixedIds() {
    return [...FIXED];
  }

  function offset(id) {
    const index = FIXED.indexOf(id);
    return index < 0 ? -1 : START_OFFSET + index;
  }

  function ensureRandom(state) {
    const current = Array.isArray(state.randomComboOrder) ? state.randomComboOrder : [];
    if (valid(current)) {
      state.randomComboOrder = normalizeOrder(current);
      return state.randomComboOrder;
    }
    const migrated = migrate(current);
    if (migrated && valid(migrated)) {
      state.randomComboOrder = normalizeOrder(migrated);
      return state.randomComboOrder;
    }
    const blocks = BLOCKS.map((block) => [...block]);
    for (let index = blocks.length - 1; index > 0; index -= 1) {
      const pick = Math.floor(Math.random() * (index + 1));
      [blocks[index], blocks[pick]] = [blocks[pick], blocks[index]];
    }
    state.randomComboOrder = blocks.flat().concat("sacrifice");
    return state.randomComboOrder;
  }

  function levels() {
    return FIXED.map((id, index) => ({ id, level: REBEL_START + index }));
  }

  function randomLevels(state) {
    return ensureRandom(state).map((id, index) => ({ id, level: REBEL_START + index }));
  }

  function legacyRebelLevels(state) {
    const current = Array.isArray(state.rebelComboOrder) ? state.rebelComboOrder : [];
    const order = valid(current) ? normalizeOrder(current) : migrate(current);
    return (order && valid(order) ? normalizeOrder(order) : FIXED).map((id, index) => ({ id, level: REBEL_START + index }));
  }

  function migrate(current) {
    const core = FIXED.filter((id) => !["eunuch", "charmFormation", "reinforcement", "charmBlade", "corruption", "music", "incense", "karma", "linkedBranches", "sacrifice"].includes(id));
    if (!core.every((id) => current.includes(id))) return null;
    const result = current.filter((id) => FIXED.includes(id));
    insertBefore(result, "horse1", "eunuch");
    insertBefore(result, "horse1", "charmFormation");
    insertAfter(result, "horse2", "reinforcement");
    insertAfter(result, "reinforcement", "charmBlade");
    insertAfter(result, "horse3", "corruption");
    insertAfter(result, "horse4", "music");
    insertAfter(result, "music", "incense");
    insertAfter(result, "momentum", "karma");
    insertAfter(result, "rabbit", "linkedBranches");
    insertAfter(result, "karma", "sacrifice");
    return normalizeOrder(result);
  }

  function insertBefore(items, anchor, id) {
    if (items.includes(id)) return;
    items.splice(Math.max(0, items.indexOf(anchor)), 0, id);
  }

  function insertAfter(items, anchor, id) {
    if (items.includes(id)) return;
    items.splice(Math.max(0, items.indexOf(anchor) + 1), 0, id);
  }

  function valid(items) {
    return items.length === FIXED.length && FIXED.every((id) => items.includes(id));
  }

  function normalizeOrder(items) {
    const result = items.filter((id) => !["linkedBranches", "sacrifice"].includes(id));
    insertAfter(result, "rabbit", "linkedBranches");
    return result.concat("sacrifice");
  }

  return { ensure: ensureRandom, ensureRandom, fixedAt, fixedIds, legacyRebelLevels, levels, name: (id) => NAMES[id] || id, offset, randomLevels };
})();
