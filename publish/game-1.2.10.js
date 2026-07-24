/* config.js */
window.XQ = window.XQ || {};

window.XQ.Config={
  version: "1.2.10",
  files: 9,
  ranks: 10,
  labels: {
    r: { K: "帅", A: "仕", B: "相", N: "马", R: "车", C: "炮", P: "兵", S: "主", Q: "后" },
    b: { K: "将", A: "士", B: "象", N: "马", R: "车", C: "炮", P: "卒", S: "主", Q: "后" },
    n: { G: "草" },
  },
  values: { K: 900, Q: 120, R: 90, S: 55, C: 45, N: 40, B: 20, A: 20, P: 12, G: 0 },
  redSetup: [
    ["R", 0, 9], ["N", 1, 9], ["B", 2, 9], ["A", 3, 9], ["K", 4, 9],
    ["A", 5, 9], ["B", 6, 9], ["N", 7, 9], ["R", 8, 9],
    ["C", 1, 7], ["C", 7, 7], ["P", 0, 6], ["P", 2, 6],
    ["P", 4, 6], ["P", 6, 6], ["P", 8, 6],
  ],
  blackCore: [["A", 3, 0], ["K", 4, 0], ["A", 5, 0]],
  blackAddOrder: [
    ["P", 4, 3], ["B", 2, 0], ["C", 1, 2], ["N", 1, 0],
    ["R", 0, 0], ["P", 2, 3], ["B", 6, 0], ["C", 7, 2],
    ["N", 7, 0], ["R", 8, 0], ["P", 6, 3], ["P", 0, 3], ["P", 8, 3],
  ],
  randomItems: [
    { id: "guard", name: "铁壁营", rarity: "white", text: "敌方吃子评分降低，AI 更保守。", stacks: false },
    { id: "cannon", name: "神机炮", rarity: "green", text: "每件使击破车约 +11、马约 +5、炮约 +5 即时积分。", stacks: true },
    { id: "scout", name: "斥候图", rarity: "purple", text: "提示会标出一个高价值走法。", stacks: false },
    { id: "oracle", name: "问策签", rarity: "green", text: "每件使提示消耗积分降低 20%。", stacks: true },
    { id: "supply", name: "粮草车", rarity: "gold", text: "立即获得额外积分。", stacks: true },
    { id: "shopFree", name: "免刷新券", rarity: "purple", text: "接下来三次可付费商店刷新免费。", stacks: true },
    { id: "kingGuard", name: "护驾符", rarity: "red", text: "将帅首次被吃时免疫，并反杀吃将帅的棋子。", stacks: true },
    { id: "pawnSpell", name: "贬卒符", rarity: "purple", text: "选择敌方一个非将帅棋子变为卒。", stacks: true },
    { id: "banner", name: "破阵旗", rarity: "red", text: "每面提高过关基础积分，多面旗帜加算。", stacks: true },
    { id: "revive", name: "归阵令", rarity: "gold", text: "取回一个被吃掉的己方棋子放在己方半场；空格归阵不消耗行动，拾取道具时消耗一次红方行动。", stacks: true },
    { id: "rabbitFoot", name: "兔脚", rarity: "gold", text: "己方棋子被吃时，若后方一格为空，则后跳避开吃子；触发后冷却 4 回合。", stacks: false, shopOnly: true, unlock: "rabbitFoot" },
    { id: "turtleShell", name: "龟壳", rarity: "red", text: "红帅首次被吃时龟缩避险，进入 3 回合无敌，9 回合后重新生效。", stacks: false, shopOnly: true, unlock: "turtleShell" },
    { id: "endure", name: "卧薪尝胆", rarity: "gold", text: "己方棋子被吃后，红方下一回合额外行动 1 次，最多累积 1 次。", stacks: false, shopOnly: true, unlock: "endure" },
    { id: "charmMakeup", name: "媚妆", rarity: "red", text: "消耗品。红方下一枚被吃的棋子阵亡后，吃子的黑方棋子转投红方。", stacks: true, shopOnly: true, unlock: "charmMakeup" },
    { id: "meteor", name: "飒沓流星", rarity: "red", text: "消耗品。购买后立即作用于当前红方回合，每吃一个黑子增加一次行动；首次未吃子时效果失效，先走完原有行动，再由黑方连续行动 3 步。", stacks: true, shopOnly: true },
    { id: "offboard", name: "盘外招", rarity: "gold", text: "消耗品。购买后双方剩余棋子立即进入弹幕战；红帅可拾取冻符使黑方冻结 1 秒，红帅阵亡则战败。", stacks: true, shopOnly: true },
    { id: "riverFlood", name: "河界汛期", rarity: "gold", text: "本关河界出现河内线。双方棋子跨河前必须先停到河内线；从河内线开始的行动不受限制。", stacks: true, shopOnly: true },
    { id: "elephantRiver", name: "飞象渡河", rarity: "purple", text: "象可过河，仍走田字；持有象时更易出现。", stacks: false },
    { id: "rookPhoenix", name: "车化凤辇", rarity: "red", text: "车可沿斜线移动最多 4 格，仍不能越子。", stacks: false },
    { id: "elephantStep", name: "象位移", rarity: "gold", text: "象除走田字外，可选横竖移动一格。", stacks: false },
    { id: "horseStep", name: "马位移", rarity: "purple", text: "马除走日字外，可选横竖移动一格。", stacks: false },
    { id: "horseLeap", name: "马腾跃", rarity: "gold", text: "马走日字时不再受蹩马腿限制。", stacks: false, requires: "horseStep" },
    { id: "horseRun", name: "马驰骋", rarity: "red", text: "马可额外横竖移动两格。", stacks: false, requires: "horseLeap" },
    { id: "horseFly", name: "马踏飞燕", rarity: "red", text: "马可额外横竖移动三格。", stacks: false, requires: "horseRun" },
    { id: "advisorRiver", name: "仕过河", rarity: "gold", text: "仕可过河，可走横竖斜一格；持有仕时更易出现。", stacks: false, requires: "advisorFree" },
    { id: "advisorStride", name: "仕途通达", rarity: "red", text: "仕可横竖斜移动两格，且可越子。", stacks: false, shopOnly: true, unlock: "advisorStride", requires: "advisorRiver" },
    { id: "advisorFree", name: "仕出宫", rarity: "green", text: "仕可出宫，在己方半场斜走一格。", stacks: false },
    { id: "strongPawn", name: "强兵", rarity: "purple", text: "兵卒过河前也可横向移动。", stacks: false },
    { id: "elitePawn", name: "精兵", rarity: "gold", text: "兵卒可斜走一格。", stacks: false, requires: "strongPawn" },
    { id: "kingFree", name: "将帅出宫", rarity: "red", text: "帅可出宫，在己方半场横竖一格。", stacks: false },
    { id: "kingRiver", name: "将帅过河", rarity: "gold", text: "将帅可过河，在全盘横竖移动一格。", stacks: false, requires: "kingFree" },
  ],
  rarityOrder: ["white", "green", "purple", "gold", "red"],
  rarityWeights: { white: 1, green: 0.82, purple: 0.58, gold: 0.34, red: 0.14 },
  shopWeightBonuses: { offboard: 3 },
  consumableIds: ["supply", "shopFree", "letMove", "pawnSpell", "destroy", "donate", "kingGuard", "revive", "meteor", "offboard", "riverFlood", "charmMakeup"],
};


/* item-roll.js */
window.XQ = window.XQ || {};

window.XQ.ItemRoll=(() => {
  function rarityWeight(item) {
    return window.XQ.Config.rarityWeights?.[item?.rarity] || 1;
  }

  function shopBonus(item) {
    return window.XQ.Config.shopWeightBonuses?.[item?.id] || 1;
  }

  function pick(items, bonus = () => 1) {
    if (!items.length) return null;
    const weighted = items.map((item) => ({
      item,
      weight: Math.max(0, rarityWeight(item) * Number(bonus(item) || 0)),
    }));
    const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
    if (total <= 0) return items[Math.floor(Math.random() * items.length)];
    let roll = Math.random() * total;
    return weighted.find((entry) => (roll -= entry.weight) <= 0)?.item || weighted.at(-1).item;
  }

  function sample(items, count, bonus) {
    const pool = [...items];
    const result = [];
    while (result.length < count && pool.length) {
      const item = pick(pool, bonus);
      result.push(item);
      pool.splice(pool.indexOf(item), 1);
    }
    return result;
  }

  return { pick, rarityWeight, sample, shopBonus };
})();


/* combo-order.js */
window.XQ = window.XQ || {};

window.XQ.ComboOrder=(() => {
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


/* late-extra.js */
window.XQ = window.XQ || {};

window.XQ.LateExtra=(() => {
  function apply(state, id, notice) {
    if (id === "corruption") {
      state.enemyCorruption = { active: true, cooldown: 0, justTriggered: false };
      notice(state, "组合技关卡：染心。红方吃子后会倒戈并使黑方夺取对应道具，触发后冷却 3 回合。");
      return true;
    }
    if (id === "music") {
      state.enemyMusic = { active: true, turns: 0, controlledIds: [] };
      notice(state, "组合技关卡：迷音。每 3 回合随机魅惑一枚红方非帅棋子，由黑方控制一回合且保留红方道具加成；第 6 回合起每次魅惑两枚。");
      return true;
    }
    if (id === "reinforcement") {
      state.enemyReinforcement = { active: true, turns: 0, waves: 0 };
      notice(state, "组合技关卡：增援。从第 3 回合起每 2 回合在随机空位增兵；数量由 1 枚逐步升至 3 枚，兵种质量逐步提高，皇后权重最低。");
      return true;
    }
    if (id === "incense") {
      state.enemyIncense = { active: true, turns: 0, stage: 0 };
      notice(state, "组合技关卡：香阵。开局及每 2 回合生成扩张香阵，次回合保留一半；阵内红子禁行，黑子不可被吃。");
      return true;
    }
    if (id === "karma") {
      state.enemyKarma = { active: true, turn: 0, pieces: {} };
      notice(state, "组合技关卡：业障。同一红子累计吃 2 子后下一回合无法行动；累计吃 3 子随机失去一个非消耗品；累计吃 4 子按被黑方吃掉结算。");
      return true;
    }
    if (id === "linkedBranches") {
      state.enemyLinkedBranches = { active: true, pairs: [] };
      notice(state, "组合技关卡：连枝。黑方随机三对棋子结为连枝；一子被吃后，另一子继承其移动范围；一对俱亡时黑方随机失去一个道具。");
      return true;
    }
    if (id === "sacrifice") {
      state.enemySacrifice = { active: true, turns: 0 };
      notice(state, "组合技关卡：生祭。黑方每次吃子均获得随机道具，且黑子可以吃掉己方非将棋子；每 2 回合随机增援一枚棋子。");
      return true;
    }
    return false;
  }

  function name(state) {
    if (state.enemyCorruption?.active) return "染心";
    if (state.enemyMusic?.active) return "迷音";
    if (state.enemyReinforcement?.active) return "增援";
    if (state.enemyIncense?.active) return "香阵";
    if (state.enemyKarma?.active) return "业障";
    if (state.enemyLinkedBranches?.active) return "连枝";
    if (state.enemySacrifice?.active) return "生祭";
    return "";
  }

  return { apply, name };
})();


/* late.js */
window.XQ = window.XQ || {};

window.XQ.Late=(() => {
  const traitPool = ["guard", "elephantRiver", "horseStep", "horseLeap", "horseRun", "horseFly", "advisorFree", "kingFree", "kingGuard"];
  const traitNames = { guard: "铁壁营", elephantRiver: "象过河", horseStep: "马位移", horseLeap: "马腾跃", horseRun: "马驰骋", horseFly: "马踏飞燕", advisorFree: "士出宫", kingFree: "将帅出宫", kingGuard: "护驾符" };
  const weights = { banner: 0.25, mult: 0.25, cannon: 0.35, tempo: 0.05 };
  const rebelComboStart = 16;

  function finalQueenLevel() {
    return window.XQ.EnemyStages.lateBase(window.XQ.Config.blackAddOrder.length);
  }

  function startLevel(state) {
    state.dropRefreshLocked = false;
    if (state.level === finalQueenLevel() + 1) addEnemyTrait(state);
    if (state.mode !== "quick" && state.level >= finalQueenLevel() + 2) suppressItems(state);
    if (["rebel", "recruit"].includes(state.mode)) startRebelCombo(state);
    else if (state.mode === "random") startRandomCombo(state);
    else startFixedCombo(state);
    if (state.level >= finalQueenLevel() + 4) lockDrops(state);
  }

  function startFixedCombo(state) {
    const offset = state.level - finalQueenLevel();
    applyCombo(state, window.XQ.ComboOrder.fixedAt(offset));
    if (offset > window.XQ.ComboOrder.offset("sacrifice")) {
      const step = offset - window.XQ.ComboOrder.offset("sacrifice");
      applyPostSacrificeFeature(state, step);
    }
  }

  function startRebelCombo(state) {
    const index = state.level - rebelComboStart;
    if (index < 0) return;
    const order = window.XQ.ComboOrder.fixedIds();
    applyCombo(state, order[index]);
    if (index >= order.length) applyPostSacrificeFeature(state, index - order.length + 1);
  }

  function startRandomCombo(state) {
    const index = state.level - rebelComboStart;
    if (index < 0) return;
    const order = window.XQ.ComboOrder.ensureRandom(state);
    applyCombo(state, order[index]);
    if (index >= order.length) applyPostSacrificeFeature(state, index - order.length + 1);
  }

  function rebelComboLevels() {
    return window.XQ.ComboOrder.levels();
  }

  function randomComboLevels(state) {
    return window.XQ.ComboOrder.randomLevels(state);
  }

  function applyCombo(state, id) {
    state.currentComboId = id || null;
    if (id === "turtle") turtleCombo(state);
    if (id === "fish") fishCombo(state);
    if (id === "rabbit") rabbitCombo(state);
    if (id === "divine") divineCombo(state);
    if (id === "collapse") collapseCombo(state);
    if (id === "eunuch") eunuchCombo(state);
    if (id === "charmFormation") charmCombo(state, false);
    if (id?.startsWith("horse")) horseCombo(state, Number(id.slice(5)));
    if (id === "charmBlade") charmCombo(state, true);
    if (id === "momentum") momentumCombo(state);
    window.XQ.LateExtra.apply(state, id, appendNotice);
  }

  function applyPostSacrificeFeature(state, step) {
    const pairLimit = Math.min(3, Math.max(1, Math.ceil((Number(step) || 1) / 2)));
    state.enemyLinkedBranches = { active: true, pairs: [], pairLimit };
    appendNotice(state, "机制：连枝。黑方随机配对棋子共享移动能力，配对数量随关卡逐步增加，最多三对。");
  }

  function addEnemyTrait(state) {
    const pool = traitPool.filter((id) => !state.enemyTraits[id] && (id !== "horseFly" || horseSeriesComplete(state)));
    const id = pool[Math.floor(Math.random() * pool.length)] || traitPool[0];
    state.enemyTraits[id] = true;
    window.XQ.EnemyTraits.normalize(state.enemyTraits);
    appendNotice(state, `后期强阵之后，敌军额外携带一次道具：${traitNames[id]}。`);
  }

  function suppressItems(state) {
    const candidates = (state.items || []).filter((item) => item.uid && !item.id.startsWith("morph-"));
    const count = Math.min(candidates.length, 1 + Math.floor((state.level - finalQueenLevel() - 2) / 2));
    state.suppressedItemUids = weighted(candidates).slice(0, count).map((item) => item.uid);
    if (!state.suppressedItemUids.length) return;
    const names = candidates.filter((item) => state.suppressedItemUids.includes(item.uid)).map((item) => item.name);
    appendNotice(state, `敌军压制升级，本关随机屏蔽 ${names.length} 个玩家道具效果：${names.join("、")}。`);
  }

  function activeItems(state) {
    const blocked = new Set(state.suppressedItemUids || []);
    const local = (state.items || []).filter((item) => !blocked.has(item.uid));
    return local.concat(window.XQ.Mode.activeOuterItems(state));
  }

  function lockDrops(state) {
    if (state.enemyMomentum?.active) return;
    const step = Math.floor((state.level - finalQueenLevel() - 4) / 2);
    const chance = Math.min(0.9, 0.25 + step * 0.15);
    state.dropRefreshLocked = Math.random() < chance;
    if (state.dropRefreshLocked) appendNotice(state, "敌军封锁补给，本关不再刷新局内可拾取道具。");
  }

  function turtleCombo(state) {
    state.enemyTurtle = { active: true, shield: 0, cooldown: 0 };
    appendNotice(state, "组合技关卡：黑将拥有龟缩。首次被吃时取消吃将，进入 3 回合无敌，并在 9 回合冷却后重新生效。");
  }

  function rabbitCombo(state) {
    state.enemyRabbit = { cooldown: 0 };
    appendNotice(state, "组合技关卡：兔阵。黑方棋子被吃时，若后方一格为空，则后退避开吃子，触发后冷却 4 回合。");
  }

  function collapseCombo(state) {
    state.enemyCollapse = { active: true, quiet: 0, turns: 0 };
    state.collapseTiles = [];
    appendNotice(state, "组合技关卡：崩盘。开局出现崩落位；之后按回合计数和连续不吃子两套规则生成，持续 2 回合且数量逐步增加。");
  }

  function divineCombo(state) {
    state.enemyDivine = { active: true, targetId: null };
    appendNotice(state, "组合技关卡：神选。黑方每回合随机一枚棋子获得一回合护驾符，首次被吃时免疫并反杀来犯棋子。");
  }

  function fishCombo(state) {
    state.enemyFish = { active: true, turns: 0 };
    appendNotice(state, "组合技关卡：鱼水。开局生成“草”，之后每 5 次红方行动追加生成且数量逐步增加，最多同时 30 个；两侧边卒化炮，并会刷新除草剂。");
  }

  function eunuchCombo(state) {
    state.enemyEunuch = true;
    Object.assign(state.enemyTraits, { advisorFree: true, advisorRiver: true, advisorStride: true });
    appendNotice(state, "组合技关卡：宦潮。五卒与两象化仕，黑方持有仕出宫、仕过河、仕途通达。");
  }

  function horseCombo(state, stage) {
    Object.assign(state.enemyTraits, { horseStep: true, horseLeap: stage >= 2, horseRun: stage >= 3, horseFly: stage >= 4 });
    state.enemyHorse = stage;
    appendNotice(state, `组合技关卡：纵马${stage}。黑方马系列道具逐步升级，本关 ${stage + 1} 卒化马。`);
  }

  function charmCombo(state, blade) {
    state.enemyCharm = { formation: true, blade };
    appendNotice(state, blade
      ? "组合技关卡：媚骨蚀锋。媚阵生效；每个红方回合刷新 3 个持续一回合的魅惑格。红帅不能进入魅惑格；其他红子每次进入后倒戈，黑方仅夺取 1 个对应的非消耗品道具。"
      : "组合技关卡：媚阵。黑方吃掉红子后，在吃子棋子后方空位复制一枚同兵种黑子，并获得对应棋子道具，但红方不会失去道具。");
  }

  function momentumCombo(state) {
    state.enemyMomentum = { active: true };
    state.dropRefreshLocked = false;
    appendNotice(state, "特殊关卡：盈不可久。红方每次吃子，黑方下一次行动额外走一步，最多累计两步。");
  }

  function scoreMult(state) {
    const best = activeItems(state).filter((item) => item.id === "mult").reduce((top, item) => !top || value(item) > value(top) ? item : top, null);
    return best ? value(best) : 1;
  }

  function appendNotice(state, text) {
    state.hardNotice = state.hardNotice ? `${state.hardNotice}\n${text}` : text;
    window.XQ.MoveRecord?.event?.(state, text, "mechanism");
  }

  function weighted(items) {
    return items.map((item) => ({ item, key: weightKey(item) })).sort((a, b) => b.key - a.key).map((entry) => entry.item);
  }

  function weightKey(item) {
    return Math.pow(Math.random(), 1 / (weights[item.id] || 1));
  }

  function value(item) {
    return typeof item?.value === "number" && Number.isFinite(item.value) ? item.value : 1;
  }

  function horseSeriesComplete(state, level = state.level) {
    const horse4 = ["rebel", "recruit"].includes(state.mode) ? rebelComboLevels().find((entry) => entry.id === "horse4")?.level
      : state.mode === "random" ? randomComboLevels(state).find((entry) => entry.id === "horse4")?.level
        : finalQueenLevel() + window.XQ.ComboOrder.offset("horse4");
    return level > horse4;
  }

  return { activeItems, horseSeriesComplete, randomComboLevels, rebelComboLevels, scoreMult, startLevel };
})();


/* kingguard.js */
window.XQ = window.XQ || {};

window.XQ.KingGuard=(() => {
  function trigger(state, result, attackerId) {
    if (isDivineTarget(state, result.captured)) return triggerDivine(state, result, attackerId);
    if (result.captured?.type !== "K" || !hasGuard(state, result.captured.side)) return "";
    consume(state, result.captured.side);
    const attacker = state.board.find((piece) => piece.id === attackerId);
    if (attacker?.side === "r") window.XQ.Mode.redCaptured(state, attacker);
    state.board = state.board.filter((piece) => piece.id !== attackerId);
    state.board.push({ ...result.captured });
    const sideName = result.captured.side === "r" ? "帅" : "将";
    state.message = `护驾符触发：${sideName}免于被吃，并反杀来犯棋子`;
    return state.message;
  }

  function refreshDivine(state) {
    if (!state.enemyDivine?.active) return "";
    const candidates = (state.board || []).filter((piece) => piece.side === "b");
    const target = candidates[Math.floor(Math.random() * candidates.length)];
    state.enemyDivine.targetId = target?.id || null;
    return target ? `神选：黑方${label(target)}获得一回合护驾符。` : "";
  }

  function isDivineTarget(state, captured) {
    return captured?.side === "b" && state.enemyDivine?.active && state.enemyDivine.targetId === captured.id;
  }

  function triggerDivine(state, result, attackerId) {
    state.enemyDivine.targetId = null;
    const attacker = state.board.find((piece) => piece.id === attackerId);
    if (attacker?.side === "r") window.XQ.Mode.redCaptured(state, attacker);
    state.board = state.board.filter((piece) => piece.id !== attackerId);
    state.board.push({ ...result.captured });
    state.message = `神选护驾触发：黑方${label(result.captured)}免于被吃，并反杀来犯棋子`;
    return state.message;
  }

  function label(piece) {
    return window.XQ.Config.labels.b[piece.type] || piece.type;
  }

  function hasGuard(state, side) {
    if (side === "b") return Boolean(state.enemyTraits?.kingGuard);
    return activeItems(state).some((item) => item.id === "kingGuard");
  }

  function consume(state, side) {
    if (side === "b") {
      state.enemyTraits.kingGuard = false;
      return;
    }
    const item = activeItems(state).find((i) => i.id === "kingGuard");
    if (item) state.items = state.items.filter((i) => i.uid !== item.uid);
  }

  function activeItems(state) {
    return window.XQ.Late?.activeItems?.(state) || state.items || [];
  }

  return { has: hasGuard, refreshDivine, trigger };
})();


/* turtle.js */
window.XQ = window.XQ || {};

window.XQ.Turtle=(() => {
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


/* defense.js */
window.XQ = window.XQ || {};

window.XQ.Defense=(() => {
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


/* rabbit.js */
window.XQ = window.XQ || {};

window.XQ.Rabbit=(() => {
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


/* collapse.js */
window.XQ = window.XQ || {};

window.XQ.Collapse=(() => {
  function enter(state, id, side) {
    if (side !== "r" || !state.enemyCollapse?.active) return "";
    const piece = state.board.find((p) => p.id === id);
    if (!piece) return "";
    const index = (state.collapseTiles || []).findIndex((tile) => tile.x === piece.x && tile.y === piece.y);
    if (index < 0) return "";
    state.collapseTiles.splice(index, 1);
    state.board = state.board.filter((p) => p.id !== id);
    window.XQ.Mode.redCaptured(state, piece);
    return `崩落位吞没了${window.XQ.Config.labels.r[piece.type]}，视作被黑方吃子。`;
  }

  function startLevel(state) {
    if (!state.enemyCollapse?.active) return "";
    Object.assign(state.enemyCollapse, { quiet: 0, turns: 0 });
    return spawn(state) ? "崩盘开局：棋盘出现 1 个崩落位。" : "";
  }

  function afterRedAction(state, captured) {
    if (!state.enemyCollapse?.active) return "";
    state.collapseTiles = (state.collapseTiles || []).map((tile) => ({ ...tile, ttl: tile.ttl - 1 })).filter((tile) => tile.ttl > 0);
    state.enemyCollapse.turns = (state.enemyCollapse.turns || 0) + 1;
    state.enemyCollapse.quiet = captured ? 0 : (state.enemyCollapse.quiet || 0) + 1;
    const target = Math.min(5, 1 + Math.floor(state.enemyCollapse.turns / 4));
    let changed = state.enemyCollapse.turns % 4 === 0 && fill(state, target);
    if (state.enemyCollapse.quiet >= 4) { state.enemyCollapse.quiet = 0; changed = fill(state, target) || changed; }
    return changed ? `崩盘发动：当前崩落位 ${state.collapseTiles.length} 个，单个持续 2 回合。` : "";
  }

  function fill(state, target) {
    let changed = false;
    while ((state.collapseTiles || []).length < target && spawn(state)) changed = true;
    return changed;
  }

  function spawn(state) {
    const occupied = new Set(state.board.map((p) => key(p.x, p.y)));
    (state.fieldItems || []).forEach((item) => occupied.add(key(item.x, item.y)));
    (state.collapseTiles || []).forEach((tile) => occupied.add(key(tile.x, tile.y)));
    const cells = [];
    for (let y = 0; y < window.XQ.Config.ranks; y += 1) {
      for (let x = 0; x < window.XQ.Config.files; x += 1) if (!occupied.has(key(x, y))) cells.push({ x, y });
    }
    if (!cells.length) return false;
    const cell = cells[Math.floor(Math.random() * cells.length)];
    state.collapseTiles = (state.collapseTiles || []).concat({ ...cell, ttl: 2, uid: `x${Date.now()}${Math.random()}` });
    return true;
  }

  function key(x, y) {
    return `${x},${y}`;
  }

  return { afterRedAction, enter, startLevel };
})();


/* enemy-items.js */
window.XQ = window.XQ || {};

window.XQ.EnemyItems=(() => {
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


/* charm.js */
window.XQ = window.XQ || {};

window.XQ.Charm=(() => {
  function startLevel(state) {
    state.charmTiles = [];
    if (state.enemyCharm?.blade) return startTurn(state);
    return "";
  }

  function startTurn(state) {
    if (!state.enemyCharm?.blade) return "";
    const cells = emptyCells(state);
    shuffle(cells);
    state.charmTiles = cells.slice(0, 3).map((cell, index) => ({
      ...cell,
      uid: `ch${Date.now()}${index}${Math.random().toString(16).slice(2)}`,
    }));
    return state.charmTiles.length
      ? `媚骨蚀锋：本回合生成 ${state.charmTiles.length} 个魅惑格。`
      : "";
  }

  function draw(state, board, pos) {
    (state.charmTiles || []).forEach((tile) => {
      const mark = document.createElement("div");
      mark.className = "charm-tile";
      mark.textContent = "魅";
      mark.title = "魅惑格：红方棋子踏入后倒戈";
      pos(mark, tile.x, tile.y);
      board.appendChild(mark);
    });
  }

  function onBlackCapture(state, result, moverId) {
    if (!state.enemyCharm?.formation || result.captured?.side !== "r") return "";
    const gained = state.enemyCharm.blade
      ? window.XQ.EnemyItems.takeRelated(state, result.captured.type)
      : window.XQ.EnemyItems.grantRelated(state, result.captured.type);
    const attacker = state.board.find((piece) => piece.id === moverId);
    const spawned = attacker ? spawnBehind(state, attacker, result.captured) : null;
    const parts = [];
    if (spawned) parts.push(`媚阵复制出黑${label("b", spawned.type)}`);
    if (gained.length) parts.push(state.enemyCharm.blade ? `黑方夺取${gained.join("、")}` : `黑方获得${gained.join("、")}，红方保留`);
    return parts.join("；");
  }

  function onRedMove(state, pieceId) {
    if (!state.enemyCharm?.blade) return "";
    const piece = state.board.find((entry) => entry.id === pieceId);
    if (!piece || piece.side !== "r") return "";
    const index = (state.charmTiles || []).findIndex((tile) => tile.x === piece.x && tile.y === piece.y);
    if (index < 0) return "";
    if (piece.type === "K") return "红帅不能进入魅惑格。";
    state.charmTiles.splice(index, 1);
    const gained = window.XQ.EnemyItems.takeRelated(state, piece.type);
    window.XQ.Levels.reduceBase(state, window.XQ.Config.values[piece.type] || 0);
    if (activeItems(state).some((item) => item.id === "endure")) state.playerBonusMoves = 1;
    piece.side = "b";
    const suffix = gained.length ? `，黑方夺取${gained.join("、")}` : "";
    return `${label("r", piece.type)}踏入魅惑格，倒戈为黑${label("b", piece.type)}${suffix}`;
  }

  function spawnBehind(state, attacker, captured) {
    const x = attacker.x;
    const y = attacker.y - 1;
    if (y < 0 || state.board.some((piece) => piece.x === x && piece.y === y)) return null;
    const copy = {
      id: `bc${Date.now()}${Math.random().toString(16).slice(2)}`,
      side: "b",
      type: captured.type,
      x,
      y,
    };
    state.board.push(copy);
    return copy;
  }

  function emptyCells(state) {
    const occupied = new Set(state.board.map((piece) => key(piece.x, piece.y)));
    (state.fieldItems || []).forEach((item) => occupied.add(key(item.x, item.y)));
    (state.collapseTiles || []).forEach((tile) => occupied.add(key(tile.x, tile.y)));
    const cells = [];
    for (let y = 0; y < window.XQ.Config.ranks; y += 1) {
      for (let x = 0; x < window.XQ.Config.files; x += 1) {
        if (!occupied.has(key(x, y))) cells.push({ x, y });
      }
    }
    return cells;
  }

  function activeItems(state) {
    return (state.items || []).concat(window.XQ.Mode?.activeOuterItems?.(state) || []);
  }

  function label(side, type) {
    return window.XQ.Config.labels[side]?.[type] || type;
  }

  function shuffle(items) {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const pick = Math.floor(Math.random() * (index + 1));
      [items[index], items[pick]] = [items[pick], items[index]];
    }
  }

  function key(x, y) {
    return `${x},${y}`;
  }

  return { draw, onBlackCapture, onRedMove, startLevel, startTurn };
})();


/* corruption.js */
window.XQ = window.XQ || {};

window.XQ.Corruption=(() => {
  function onRedCapture(state, pieceId) {
    const effect = state.enemyCorruption;
    if (!effect?.active || effect.cooldown > 0) return "";
    const piece = state.board.find((entry) => entry.id === pieceId);
    if (!piece || piece.side !== "r") return "";
    const gained = window.XQ.EnemyItems.grantRelated(state, piece.type);
    markRedLoss(state, piece);
    piece.side = "b";
    Object.assign(effect, { cooldown: 3, justTriggered: true });
    const suffix = gained.length ? `，黑方夺取${gained.join("、")}` : "";
    return `染心发动：${label("r", piece.type)}吃子后遭到魅惑，倒戈为黑${label("b", piece.type)}${suffix}`;
  }

  function afterRedAction(state) {
    if ((state.playerMovesLeft || 1) > 1) return "";
    return tick(state);
  }

  function skipTurn(state) {
    return tick(state);
  }

  function tick(state) {
    const effect = state.enemyCorruption;
    if (!effect?.active) return "";
    if (effect.justTriggered) {
      effect.justTriggered = false;
      return "";
    }
    if (!(effect.cooldown > 0)) return "";
    effect.cooldown -= 1;
    return effect.cooldown === 0 ? "染心冷却结束，再次吃子将触发魅惑。" : "";
  }

  function armMakeup(state) {
    state.charmMakeupCharges = (state.charmMakeupCharges || 0) + 1;
    return true;
  }

  function onBlackCapture(state, pieceId) {
    if (!(state.charmMakeupCharges > 0)) return "";
    const piece = state.board.find((entry) => entry.id === pieceId);
    if (!piece || piece.side !== "b") return "";
    if (!window.XQ.ConsumableState.consume(state, "charmMakeup")) return "";
    piece.side = "r";
    return `媚妆生效：吃子的黑${label("b", piece.type)}转投红方`;
  }

  function markRedLoss(state, piece) {
    window.XQ.Levels.reduceBase(state, window.XQ.Config.values[piece.type] || 0);
    const active = window.XQ.Late?.activeItems?.(state) || state.items || [];
    if (active.some((item) => item.id === "endure")) state.playerBonusMoves = 1;
  }

  function label(side, type) {
    return window.XQ.Config.labels[side]?.[type] || type;
  }

  return { afterRedAction, armMakeup, onBlackCapture, onRedCapture, skipTurn };
})();


/* music-charm.js */
window.XQ = window.XQ || {};

window.XQ.MusicCharm=(() => {
  function startLevel(state) {
    restore(state);
    if (!state.enemyMusic?.active) return "";
    Object.assign(state.enemyMusic, { turns: 0, controlledIds: [] });
    return "";
  }

  function startTurn(state) {
    const effect = state.enemyMusic;
    if (!effect?.active) return "";
    restore(state);
    effect.turns = (effect.turns || 0) + 1;
    if (effect.turns % 3 !== 0) return "";
    const count = effect.turns >= 6 ? 2 : 1;
    const candidates = shuffle(state.board.filter((piece) => piece.side === "r" && piece.type !== "K"));
    const picked = candidates.slice(0, count);
    picked.forEach((piece) => {
      piece.side = "b";
      piece.musicControlled = true;
      piece.musicOriginalSide = "r";
    });
    effect.controlledIds = picked.map((piece) => piece.id);
    if (!picked.length) return "迷音发动，但没有可控制的红方棋子。";
    const names = picked.map((piece) => window.XQ.Config.labels.r[piece.type] || piece.type);
    return `迷音发动：${names.join("、")}暂由黑方控制一回合，并保留红方道具加成。`;
  }

  function restore(state) {
    let count = 0;
    (state.board || []).forEach((piece) => {
      if (!piece.musicControlled) return;
      piece.side = piece.musicOriginalSide || "r";
      delete piece.musicControlled;
      delete piece.musicOriginalSide;
      count += 1;
    });
    if (state.enemyMusic) state.enemyMusic.controlledIds = [];
    return count;
  }

  function shuffle(items) {
    const copy = [...items];
    for (let index = copy.length - 1; index > 0; index -= 1) {
      const pick = Math.floor(Math.random() * (index + 1));
      [copy[index], copy[pick]] = [copy[pick], copy[index]];
    }
    return copy;
  }

  return { restore, startLevel, startTurn };
})();


/* reinforcement.js */
window.XQ = window.XQ || {};

window.XQ.Reinforcement=(() => {
  const POOLS = [
    [["P", 8], ["A", 3], ["B", 3]],
    [["P", 5], ["A", 3], ["B", 3], ["N", 2], ["C", 2]],
    [["P", 3], ["A", 2], ["B", 2], ["N", 3], ["C", 3], ["R", 1]],
    [["A", 2], ["B", 2], ["N", 3], ["C", 3], ["R", 2], ["S", 1]],
    [["N", 3], ["C", 3], ["R", 3], ["S", 2], ["Q", 1]],
  ];

  function startLevel(state) {
    if (!state.enemyReinforcement?.active) return "";
    Object.assign(state.enemyReinforcement, { turns: 0, waves: 0 });
    return "";
  }

  function startTurn(state) {
    const effect = state.enemyReinforcement;
    if (!effect?.active) return "";
    effect.turns = (effect.turns || 0) + 1;
    if (effect.turns < 3 || (effect.turns - 3) % 2 !== 0) return "";
    effect.waves = (effect.waves || 0) + 1;
    const amount = Math.min(3, 1 + Math.floor((effect.waves - 1) / 2));
    const pieces = spawn(state, amount, effect.waves);
    if (!pieces.length) return "增援抵达，但棋盘已无可用空位。";
    const names = pieces.map((piece) => window.XQ.Config.labels.b[piece.type] || piece.type);
    return `增援第 ${effect.waves} 波：黑方获得${names.join("、")}。`;
  }

  function spawn(state, amount, wave) {
    const cells = emptyCells(state);
    const pieces = [];
    while (pieces.length < amount && cells.length) {
      const cell = cells.splice(Math.floor(Math.random() * cells.length), 1)[0];
      const piece = { id: uid(), side: "b", type: pickType(wave), ...cell };
      state.board.push(piece);
      pieces.push(piece);
    }
    return pieces;
  }

  function pickType(wave) {
    const pool = POOLS[Math.min(POOLS.length - 1, Math.max(0, wave - 1))];
    const total = pool.reduce((sum, entry) => sum + entry[1], 0);
    let roll = Math.random() * total;
    for (const [type, weight] of pool) {
      roll -= weight;
      if (roll <= 0) return type;
    }
    return pool[0][0];
  }

  function emptyCells(state) {
    const occupied = new Set((state.board || []).map((piece) => key(piece.x, piece.y)));
    ["fieldItems", "collapseTiles", "charmTiles", "incenseTiles"].forEach((name) => {
      (state[name] || []).forEach((entry) => occupied.add(key(entry.x, entry.y)));
    });
    const cells = [];
    for (let y = 0; y < window.XQ.Config.ranks; y += 1) {
      for (let x = 0; x < window.XQ.Config.files; x += 1) {
        if (!occupied.has(key(x, y))) cells.push({ x, y });
      }
    }
    return cells;
  }

  function uid() {
    return `br${Date.now()}${Math.random().toString(16).slice(2)}`;
  }

  function key(x, y) {
    return `${x},${y}`;
  }

  return { startLevel, startTurn };
})();


/* incense.js */
window.XQ = window.XQ || {};

window.XQ.Incense=(() => {
  const PATTERNS = [
    [[1, 1]],
    [[1, 2]],
    [[1, 1], [1, 1]],
    [[1, 2], [1, 2], [2, 2]],
    [[2, 3], [2, 3]],
  ];

  function startLevel(state) {
    state.incenseTiles = [];
    if (!state.enemyIncense?.active) return "";
    Object.assign(state.enemyIncense, { turns: 0, stage: 0 });
    spawnStage(state);
    return "香阵开局：随机位置出现 1*1 香阵。";
  }

  function startTurn(state) {
    const effect = state.enemyIncense;
    if (!effect?.active) return "";
    effect.turns = (effect.turns || 0) + 1;
    if (effect.turns % 2 === 1) {
      retainHalf(state);
      return `香阵余韵：本回合保留 ${state.incenseTiles.length} 格范围。`;
    }
    effect.stage = Math.min(PATTERNS.length - 1, (effect.stage || 0) + 1);
    spawnStage(state);
    return `香阵扩张：本回合形成 ${state.incenseTiles.length} 格范围。`;
  }

  function blocksRed(state, piece) {
    return piece?.side === "r" && hasTile(state, piece.x, piece.y);
  }

  function blocksCapture(state, piece, move, board) {
    if (piece?.side !== "r") return false;
    const target = board.find((entry) => entry.x === move.x && entry.y === move.y);
    return target?.side === "b" && hasTile(state, target.x, target.y);
  }

  function protectsKing(state, side, king) {
    return side === "b" && king && hasTile(state, king.x, king.y);
  }

  function draw(state, board, pos) {
    if (!state.enemyIncense?.active || !(state.incenseTiles || []).length) return;
    const layer = document.createElement("div");
    layer.className = "incense-layer";
    layer.setAttribute("aria-hidden", "true");
    (state.incenseTiles || []).forEach((tile) => {
      const mark = document.createElement("div");
      mark.className = `incense-tile${tile.remnant ? " remnant" : ""}`;
      mark.textContent = "香";
      mark.title = "香阵：红子禁行，黑子不可被吃";
      pos(mark, tile.x, tile.y);
      layer.appendChild(mark);
    });
    board.appendChild(layer);
  }

  function spawnStage(state) {
    const pattern = PATTERNS[state.enemyIncense.stage] || PATTERNS.at(-1);
    const used = new Set();
    const tiles = [];
    pattern.forEach(([baseW, baseH]) => {
      const rotated = Math.random() < 0.5;
      const width = rotated ? baseH : baseW;
      const height = rotated ? baseW : baseH;
      const origin = place(width, height, used);
      if (!origin) return;
      for (let y = 0; y < height; y += 1) {
        for (let x = 0; x < width; x += 1) {
          const tile = { x: origin.x + x, y: origin.y + y, uid: uid() };
          used.add(key(tile.x, tile.y));
          tiles.push(tile);
        }
      }
    });
    state.incenseTiles = tiles;
  }

  function retainHalf(state) {
    const tiles = shuffle([...(state.incenseTiles || [])]);
    state.incenseTiles = tiles.slice(0, Math.ceil(tiles.length / 2))
      .map((tile) => ({ ...tile, remnant: true }));
  }

  function place(width, height, used) {
    const candidates = [];
    for (let y = 0; y <= window.XQ.Config.ranks - height; y += 1) {
      for (let x = 0; x <= window.XQ.Config.files - width; x += 1) {
        let clear = true;
        for (let dy = -1; dy <= height; dy += 1) {
          for (let dx = -1; dx <= width; dx += 1) {
            if (used.has(key(x + dx, y + dy))) clear = false;
          }
        }
        if (clear) candidates.push({ x, y });
      }
    }
    return candidates[Math.floor(Math.random() * candidates.length)] || null;
  }

  function hasTile(state, x, y) {
    return Boolean(state.enemyIncense?.active && state.incenseTiles?.some((tile) => tile.x === x && tile.y === y));
  }

  function shuffle(items) {
    for (let index = items.length - 1; index > 0; index -= 1) {
      const pick = Math.floor(Math.random() * (index + 1));
      [items[index], items[pick]] = [items[pick], items[index]];
    }
    return items;
  }

  function uid() {
    return `in${Date.now()}${Math.random().toString(16).slice(2)}`;
  }

  function key(x, y) {
    return `${x},${y}`;
  }

  return { blocksCapture, blocksRed, covers: hasTile, draw, protectsKing, startLevel, startTurn };
})();


/* karma.js */
window.XQ = window.XQ || {};

window.XQ.Karma=(() => {
  function startLevel(state) {
    if (!state.enemyKarma?.active) return "";
    state.enemyKarma.turn = 1;
    state.enemyKarma.pieces = {};
    return "";
  }

  function startTurn(state) {
    if (!state.enemyKarma?.active) return "";
    state.enemyKarma.turn = Math.max(1, Number(state.enemyKarma.turn) || 1) + 1;
    return "";
  }

  function blocks(state, piece) {
    if (!state.enemyKarma?.active || piece?.side !== "r") return false;
    const record = state.enemyKarma.pieces?.[piece.id];
    return Boolean(record && record.blockedTurn === state.enemyKarma.turn);
  }

  function onRedCapture(state, pieceId) {
    if (!state.enemyKarma?.active) return "";
    const piece = state.board.find((entry) => entry.id === pieceId && entry.side === "r");
    if (!piece) return "";
    const records = state.enemyKarma.pieces || (state.enemyKarma.pieces = {});
    const record = records[pieceId] || (records[pieceId] = { captures: 0, blockedTurn: 0 });
    record.captures += 1;
    if (record.captures === 2) {
      record.blockedTurn = state.enemyKarma.turn + 1;
      return `业障：${label(piece)}累计吃子 2 枚，下一个红方回合无法行动`;
    }
    if (record.captures === 3) {
      const lost = losePlayerItem(state);
      return lost
        ? `业障：${label(piece)}累计吃子 3 枚，失去${lost}`
        : `业障：${label(piece)}累计吃子 3 枚，但没有可失去的非消耗品`;
    }
    if (record.captures === 4) {
      window.XQ.Mode.redCaptured(state, piece);
      state.board = state.board.filter((entry) => entry.id !== pieceId);
      return `业障：${label(piece)}累计吃子 4 枚，按被黑方吃掉结算`;
    }
    return "";
  }

  function losePlayerItem(state) {
    const consumables = new Set(window.XQ.Config.consumableIds || []);
    const candidates = (state.items || []).concat(window.XQ.Mode.activeOuterItems(state) || [])
      .filter((item) => !consumables.has(item.id));
    if (!candidates.length) return "";
    const item = candidates[Math.floor(Math.random() * candidates.length)];
    removeOwned(state, item);
    return item.name || item.id;
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

  function label(piece) {
    return `红方${window.XQ.Config.labels.r[piece.type] || piece.type}`;
  }

  return { blocks, onRedCapture, startLevel, startTurn };
})();


/* linked-branches.js */
window.XQ = window.XQ || {};

window.XQ.LinkedBranches=(() => {
  const STYLES = [
    { color: "cyan", marker: "I" },
    { color: "magenta", marker: "II" },
    { color: "lime", marker: "III" },
  ];

  function startLevel(state) {
    if (!state.enemyLinkedBranches?.active) return "";
    const shuffled = shuffle(state.board.filter((piece) => piece.side === "b" && piece.type !== "K"));
    const candidates = prioritizeHorseQueen(shuffled);
    const limit = Math.min(3, Math.max(1, Number(state.enemyLinkedBranches.pairLimit) || 3));
    const pairCount = Math.min(limit, Math.floor(candidates.length / 2));
    state.enemyLinkedBranches.pairs = Array.from({ length: pairCount }, (_, index) => {
      const a = candidates[index * 2];
      const b = candidates[index * 2 + 1];
      return {
        id: `linked-${index + 1}`,
        index: index + 1,
        color: STYLES[index].color,
        marker: STYLES[index].marker,
        aId: a.id,
        bId: b.id,
        aType: a.type,
        bType: b.type,
        fallen: {},
        broken: false,
      };
    });
    return pairCount ? `连枝：黑方已指定 ${pairCount} 对连枝棋子` : "";
  }

  function prioritizeHorseQueen(candidates) {
    const horse = candidates.find((piece) => piece.type === "N");
    const queen = candidates.find((piece) => piece.type === "Q");
    if (!horse || !queen) return candidates;
    return [horse, queen].concat(candidates.filter((piece) => piece.id !== horse.id && piece.id !== queen.id));
  }

  function onBlackCaptured(state, captured) {
    if (!state.enemyLinkedBranches?.active || captured?.side !== "b") return "";
    const pair = pairFor(state, captured.id);
    if (!pair || pair.broken) return "";
    pair.fallen = pair.fallen || {};
    pair.fallen[captured.id] = captured.type;
    const partnerId = pair.aId === captured.id ? pair.bId : pair.aId;
    const partner = state.board.find((piece) => piece.id === partnerId);
    if (partner) {
      pair.inherited = pair.inherited || {};
      pair.inherited[partnerId] = captured.type;
      return `连枝${pair.marker}：${blackLabel(partner)}继承${typeLabel(captured.type)}的移动范围`;
    }
    pair.broken = true;
    const lost = window.XQ.EnemyItems.loseRandom(state);
    return lost
      ? `连枝${pair.marker}俱断：黑方失去${lost}`
      : `连枝${pair.marker}俱断：黑方没有可失去的道具`;
  }

  function extraTypes(state, piece) {
    if (!state.enemyLinkedBranches?.active || piece?.side !== "b") return [];
    const pair = pairFor(state, piece.id);
    if (!pair || pair.broken) return [];
    const partnerId = pair.aId === piece.id ? pair.bId : pair.aId;
    const inherited = pair.inherited?.[piece.id] || pair.fallen?.[partnerId];
    return inherited && inherited !== piece.type ? [inherited] : [];
  }

  function pairFor(state, pieceId) {
    return (state.enemyLinkedBranches?.pairs || [])
      .find((pair) => pair.aId === pieceId || pair.bId === pieceId);
  }

  function shuffle(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const pick = Math.floor(Math.random() * (index + 1));
      [result[index], result[pick]] = [result[pick], result[index]];
    }
    return result;
  }

  function blackLabel(piece) {
    return `黑方${typeLabel(piece.type)}`;
  }

  function typeLabel(type) {
    return window.XQ.Config.labels.b[type] || type;
  }

  return { extraTypes, onBlackCaptured, pairFor, startLevel };
})();


/* sacrifice.js */
window.XQ = window.XQ || {};

window.XQ.Sacrifice=(() => {
  const TYPES = ["P", "P", "P", "A", "B", "N", "R", "C", "S", "Q"];

  function canCaptureOwn(state, mover, target) {
    return Boolean(state?.enemySacrifice?.active && mover?.side === "b"
      && target?.side === "b" && target.type !== "K" && mover.id !== target.id);
  }

  function onCapture(state, moverSide, captured) {
    if (!state.enemySacrifice?.active || moverSide !== "b" || !["r", "b"].includes(captured?.side)) return "";
    const item = window.XQ.EnemyItems.grantRandom(state);
    const target = captured.side === "b"
      ? `己方${label(captured.type)}`
      : `红方${window.XQ.Config.labels?.r?.[captured.type] || captured.type}`;
    return item ? `生祭：黑方吃掉${target}，获得${item}` : `生祭：黑方吃掉${target}`;
  }

  function startLevel(state) {
    if (!state.enemySacrifice?.active) return "";
    state.enemySacrifice.turns = 0;
    return "";
  }

  function startTurn(state) {
    const effect = state.enemySacrifice;
    if (!effect?.active) return "";
    effect.turns = (effect.turns || 0) + 1;
    if (effect.turns % 2 !== 0) return "";
    const piece = spawnPiece(state);
    return piece ? `生祭增兵：黑方随机获得一枚${label(piece.type)}。` : "";
  }

  function spawnPiece(state) {
    const cells = emptyCells(state);
    if (!cells.length) return null;
    const ownHalf = cells.filter((cell) => cell.y <= 4);
    const pool = ownHalf.length ? ownHalf : cells;
    const cell = pool[Math.floor(Math.random() * pool.length)];
    const type = TYPES[Math.floor(Math.random() * TYPES.length)];
    const piece = { id: uid(), side: "b", type, ...cell };
    state.board.push(piece);
    return piece;
  }

  function emptyCells(state) {
    const occupied = new Set(state.board.map((piece) => key(piece.x, piece.y)));
    (state.fieldItems || []).forEach((item) => occupied.add(key(item.x, item.y)));
    (state.collapseTiles || []).forEach((tile) => occupied.add(key(tile.x, tile.y)));
    (state.charmTiles || []).forEach((tile) => occupied.add(key(tile.x, tile.y)));
    (state.incenseTiles || []).forEach((tile) => occupied.add(key(tile.x, tile.y)));
    const cells = [];
    for (let y = 0; y < window.XQ.Config.ranks; y += 1) {
      for (let x = 0; x < window.XQ.Config.files; x += 1) {
        if (!occupied.has(key(x, y))) cells.push({ x, y });
      }
    }
    return cells;
  }

  function label(type) {
    return window.XQ.Config.labels.b[type] || type;
  }

  function uid() {
    return `bs${Date.now()}${Math.random().toString(16).slice(2)}`;
  }

  function key(x, y) {
    return `${x},${y}`;
  }

  return { canCaptureOwn, onCapture, startLevel, startTurn };
})();


/* round-effects.js */
window.XQ = window.XQ || {};

window.XQ.RoundEffects=(() => {
  function startLevel(state) {
    return [
      window.XQ.Charm?.startLevel?.(state),
      window.XQ.MusicCharm?.startLevel?.(state),
      window.XQ.Reinforcement?.startLevel?.(state),
      window.XQ.Incense?.startLevel?.(state),
      window.XQ.Karma?.startLevel?.(state),
      window.XQ.LinkedBranches?.startLevel?.(state),
      window.XQ.Sacrifice?.startLevel?.(state),
    ].filter(Boolean).join("\n");
  }

  function startTurn(state) {
    return [
      window.XQ.Charm?.startTurn?.(state),
      window.XQ.MusicCharm?.startTurn?.(state),
      window.XQ.Reinforcement?.startTurn?.(state),
      window.XQ.Incense?.startTurn?.(state),
      window.XQ.Karma?.startTurn?.(state),
      window.XQ.Sacrifice?.startTurn?.(state),
    ].filter(Boolean).join("\n");
  }

  function skipPlayerTurn(state) {
    return [window.XQ.Corruption?.skipTurn?.(state), window.XQ.MusicCharm?.startTurn?.(state),
      window.XQ.Reinforcement?.startTurn?.(state), window.XQ.Incense?.startTurn?.(state),
      window.XQ.Karma?.startTurn?.(state), window.XQ.Sacrifice?.startTurn?.(state)]
      .filter(Boolean).join("\n");
  }

  return { skipPlayerTurn, startLevel, startTurn };
})();


/* fish.js */
window.XQ = window.XQ || {};

window.XQ.Fish=(() => {
  const MAX_GRASS = 30;

  function startLevel(state) {
    if (!state.enemyFish?.active) return;
    state.enemyFish.turns = state.enemyFish.turns || 0;
    spawnMany(state, 1);
  }

  function prepareBoard(state) {
    if (!state.enemyFish?.active) return;
    [[0, 3], [8, 3]].forEach(([x, y]) => {
      const piece = (state.board || []).find((p) => p.side === "b" && p.x === x && p.y === y);
      if (piece && piece.type !== "K") piece.type = "C";
    });
  }

  function afterRedAction(state) {
    if (!state.enemyFish?.active) return "";
    if (state.enemyFish.skipNextGrass) {
      state.enemyFish.skipNextGrass = false;
      state.enemyFish.turns = 0;
      return "";
    }
    state.enemyFish.turns = (state.enemyFish.turns || 0) + 1;
    if (state.enemyFish.turns % 5 !== 0) return "";
    const amount = Math.min(5, 1 + Math.floor(state.enemyFish.turns / 5));
    const added = spawnMany(state, amount);
    return added ? `鱼水发动：新生成 ${added} 个“草”，当前 ${grassCount(state)} 个，仅阻隔行棋，双方均可吃。` : "";
  }

  function spawnMany(state, amount) {
    let added = 0;
    while (added < amount && grassCount(state) < MAX_GRASS && spawn(state)) added += 1;
    return added;
  }

  function grassCount(state) {
    return (state.board || []).filter((piece) => piece.side === "n" && piece.type === "G").length;
  }

  function spawn(state) {
    const cells = emptyCells(state);
    if (!cells.length) return false;
    const cell = cells[Math.floor(Math.random() * cells.length)];
    state.board.push({ id: `nG${Date.now()}${Math.random()}`, side: "n", type: "G", x: cell.x, y: cell.y });
    return true;
  }

  function emptyCells(state) {
    const blocked = new Set((state.board || []).map((p) => key(p.x, p.y)));
    (state.fieldItems || []).forEach((i) => blocked.add(key(i.x, i.y)));
    (state.collapseTiles || []).forEach((i) => blocked.add(key(i.x, i.y)));
    const cells = [];
    for (let y = 0; y < window.XQ.Config.ranks; y += 1) {
      for (let x = 0; x < window.XQ.Config.files; x += 1) if (!blocked.has(key(x, y))) cells.push({ x, y });
    }
    return cells;
  }

  function key(x, y) { return `${x},${y}`; }

  return { afterRedAction, prepareBoard, startLevel };
})();


/* meteor.js */
window.XQ = window.XQ || {};

window.XQ.Meteor=(() => {
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


/* river-flood.js */
window.XQ = window.XQ || {};

window.XQ.RiverFlood=(() => {
  function blocks(piece, target, state) {
    if (!state?.riverFlooded || !piece || !target) return false;
    const towardBlack = piece.y >= 5 && target.y <= 4;
    const towardRed = piece.y <= 4 && target.y >= 5;
    return (towardBlack && piece.y !== 5) || (towardRed && piece.y !== 4);
  }

  return { blocks };
})();


/* turnflow.js */
window.XQ = window.XQ || {};

window.XQ.TurnFlow=(() => {
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


/* rules.js */
window.XQ = window.XQ || {};

window.XQ.Rules=(() => {
  const C = window.XQ.Config;
  const inside = (x, y) => x >= 0 && x < C.files && y >= 0 && y < C.ranks;
  const clone = (board) => board.map((p) => ({ ...p }));
  const at = (board, x, y) => board.find((p) => p.x === x && p.y === y);
  const enemy = (side) => (side === "r" ? "b" : "r");
  const palace = (side, x, y) => x >= 3 && x <= 5 && (side === "r" ? y >= 7 && y <= 9 : y >= 0 && y <= 2);
  const crossed = (p) => (p.side === "r" ? p.y <= 4 : p.y >= 5);
  const has = (state, side, id, piece) => {
    if (!state) return false;
    if (side === "r" || piece?.musicOriginalSide === "r") return window.XQ.Items.count(state, id) > 0;
    return Boolean(state.enemyTraits?.[id]);
  };
  const ownHalf = (side, y) => side === "r" ? y >= 5 : y <= 4;

  function clearLine(board, x1, y1, x2, y2) {
    const dx = Math.sign(x2 - x1);
    const dy = Math.sign(y2 - y1);
    let x = x1 + dx;
    let y = y1 + dy;
    let count = 0;
    while (x !== x2 || y !== y2) {
      if (at(board, x, y)) count += 1;
      x += dx;
      y += dy;
    }
    return count;
  }

  function rayMoves(board, p, cannon, dirs, state) {
    const moves = [];
    (dirs || [[1, 0], [-1, 0], [0, 1], [0, -1]]).forEach(([dx, dy]) => {
      let x = p.x + dx;
      let y = p.y + dy;
      let screen = false;
      while (inside(x, y)) {
        const t = at(board, x, y);
        if (!cannon) {
          if (!t) moves.push({ x, y });
          else {
            if (t.side !== p.side || window.XQ.Sacrifice?.canCaptureOwn?.(state, p, t)) moves.push({ x, y });
            break;
          }
        } else if (!screen) {
          if (!t) moves.push({ x, y });
          else screen = true;
        } else if (t) {
          if (t.side !== p.side || window.XQ.Sacrifice?.canCaptureOwn?.(state, p, t)) moves.push({ x, y });
          break;
        }
        x += dx;
        y += dy;
      }
    });
    return moves;
  }

  function rookPhoenixMoves(board, p, state) {
    return rayMoves(board, p, false, null, state).concat(rayMoves(board, p, false, [[1, 1], [1, -1], [-1, 1], [-1, -1]], state)
      .filter((m) => Math.abs(m.x - p.x) <= 4));
  }

  function pseudo(board, p, state) {
    const own = (x, y) => { const target = at(board, x, y); return target?.side === p.side && !window.XQ.Sacrifice?.canCaptureOwn?.(state, p, target); };
    const add = (arr, x, y) => inside(x, y) && !own(x, y) && arr.push({ x, y });
    const moves = [];
    if (p.type === "R") return has(state, p.side, "rookPhoenix", p) ? rookPhoenixMoves(board, p, state) : rayMoves(board, p, false, null, state);
    if (p.type === "S") return rayMoves(board, p, false, [[1, 1], [1, -1], [-1, 1], [-1, -1]], state);
    if (p.type === "Q") return rayMoves(board, p, false, [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]], state);
    if (p.type === "C") return rayMoves(board, p, true, null, state);
    if (p.type === "K") {
      [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
        const x = p.x + dx;
        const y = p.y + dy;
        const area = has(state, p.side, "kingRiver", p)
          ? inside(x, y)
          : has(state, p.side, "kingFree", p) ? inside(x, y) && ownHalf(p.side, y) : palace(p.side, x, y);
        if (area && !own(x, y)) moves.push({ x, y });
      });
      const other = board.find((q) => q.type === "K" && q.side !== p.side);
      if (other && other.x === p.x && clearLine(board, p.x, p.y, other.x, other.y) === 0) {
        moves.push({ x: other.x, y: other.y });
      }
    }
    if (p.type === "A") {
      const open = has(state, p.side, "advisorFree", p);
      const river = has(state, p.side, "advisorRiver", p);
      const steps = river
        ? [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]]
        : [[1, 1], [1, -1], [-1, 1], [-1, -1]];
      steps.forEach(([dx, dy]) => {
        const x = p.x + dx;
        const y = p.y + dy;
        const area = open && river ? inside(x, y) : open ? inside(x, y) && ownHalf(p.side, y) : palace(p.side, x, y);
        if (area && !own(x, y)) moves.push({ x, y });
      });
      if (open && river && has(state, p.side, "advisorStride", p)) {
        [[2, 2], [2, -2], [-2, 2], [-2, -2], [2, 0], [-2, 0], [0, 2], [0, -2]]
          .forEach(([dx, dy]) => add(moves, p.x + dx, p.y + dy));
      }
    }
    if (p.type === "B") {
      [[2, 2], [2, -2], [-2, 2], [-2, -2]].forEach(([dx, dy]) => {
        const x = p.x + dx;
        const y = p.y + dy;
        const blocked = at(board, p.x + dx / 2, p.y + dy / 2);
        const ownSide = has(state, p.side, "elephantRiver", p) || (p.side === "r" ? y >= 5 : y <= 4);
        if (inside(x, y) && ownSide && !blocked && !own(x, y)) moves.push({ x, y });
      });
      if (has(state, p.side, "elephantStep", p)) {
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => add(moves, p.x + dx, p.y + dy));
      }
    }
    if (p.type === "N") {
      const ignoresLeg = has(state, p.side, "horseLeap", p);
      [[2, 1, 1, 0], [2, -1, 1, 0], [-2, 1, -1, 0], [-2, -1, -1, 0],
        [1, 2, 0, 1], [-1, 2, 0, 1], [1, -2, 0, -1], [-1, -2, 0, -1]]
        .forEach(([dx, dy, lx, ly]) => (ignoresLeg || !at(board, p.x + lx, p.y + ly)) && add(moves, p.x + dx, p.y + dy));
      if (has(state, p.side, "horseStep", p)) {
        [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => add(moves, p.x + dx, p.y + dy));
      }
      if (has(state, p.side, "horseRun", p)) [[2, 0], [-2, 0], [0, 2], [0, -2]].forEach(([dx, dy]) => add(moves, p.x + dx, p.y + dy));
      if (has(state, p.side, "horseFly", p)) [[3, 0], [-3, 0], [0, 3], [0, -3]].forEach(([dx, dy]) => add(moves, p.x + dx, p.y + dy));
    }
    if (p.type === "P") {
      const dir = p.side === "r" ? -1 : 1;
      add(moves, p.x, p.y + dir);
      if (crossed(p) || has(state, p.side, "strongPawn", p)) {
        add(moves, p.x - 1, p.y);
        add(moves, p.x + 1, p.y);
      }
      if (has(state, p.side, "elitePawn", p)) [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([dx, dy]) => add(moves, p.x + dx, p.y + dy));
    }
    return moves;
  }

  function pseudoWithLinked(board, piece, state) {
    const moves = pseudo(board, piece, state);
    window.XQ.LinkedBranches?.extraTypes?.(state, piece)
      .forEach((type) => moves.push(...pseudo(board, { ...piece, type }, state)));
    return [...new Map(moves.map((move) => [`${move.x},${move.y}`, move])).values()];
  }

  function move(board, id, x, y) {
    const next = clone(board);
    const p = next.find((q) => q.id === id);
    const from = { x: p.x, y: p.y };
    const captured = next.find((q) => q.x === x && q.y === y);
    const filtered = next.filter((q) => q.id !== captured?.id);
    const moved = filtered.find((q) => q.id === id);
    moved.x = x;
    moved.y = y;
    return { board: filtered, captured, from };
  }

  function kingsFace(board) {
    const r = board.find((p) => p.side === "r" && p.type === "K");
    const b = board.find((p) => p.side === "b" && p.type === "K");
    return r && b && r.x === b.x && clearLine(board, r.x, r.y, b.x, b.y) === 0;
  }

  function inCheck(board, side, state) {
    if (window.XQ.RandomMode?.is?.(state) && side === "r") return false;
    if (window.XQ.Turtle?.protects?.(state, side)) return false;
    const k = board.find((p) => p.side === side && p.type === "K");
    if (!k) return !window.XQ.RandomMode?.is?.(state);
    if (window.XQ.Incense?.protectsKing?.(state, side, k)) return false;
    return board.some((p) => p.side !== side && !window.XQ.Karma?.blocks?.(state, p) && !window.XQ.Incense?.blocksRed?.(state, p) && pseudoWithLinked(board, p, state).some((m) => !window.XQ.RiverFlood.blocks(p, m, state) && m.x === k.x && m.y === k.y));
  }

  function legalMoves(board, id, state) {
    const p = board.find((q) => q.id === id);
    if (!p) return [];
    if (window.XQ.Karma?.blocks?.(state, p)) return [];
    if (window.XQ.Incense?.blocksRed?.(state, p)) return [];
    return pseudoWithLinked(board, p, state).filter((m) => !blocksCharmKing(m, p, state) && !window.XQ.Incense?.blocksCapture?.(state, p, m, board) && !window.XQ.RiverFlood.blocks(p, m, state) && !blocksDivineKingCapture(board, m, p, state) && !window.XQ.Turtle?.blocks?.(board, m, p.side, state) && !inCheck(move(board, id, m.x, m.y).board, p.side, state));
  }

  function blocksCharmKing(move, piece, state) {
    return piece.side === "r" && piece.type === "K" && state?.enemyCharm?.blade
      && (state.charmTiles || []).some((tile) => tile.x === move.x && tile.y === move.y);
  }

  function blocksDivineKingCapture(board, m, p, state) {
    const target = at(board, m.x, m.y);
    return p.side === "r" && p.type === "K" && target?.side === "b" && state?.enemyDivine?.targetId === target.id;
  }

  function sideMoves(board, side, state) {
    return board.filter((p) => p.side === side).flatMap((p) => legalMoves(board, p.id, state).map((m) => ({ ...m, id: p.id })));
  }

  return { at, clone, enemy, inCheck, legalMoves, move, sideMoves };
})();


/* board-preview.js */
window.XQ = window.XQ || {};

window.XQ.BoardPreview=(() => {
  function toggle(state, pieceId) {
    state.previewSelected = state.previewSelected === pieceId ? null : pieceId;
  }

  function clear(state) {
    state.previewSelected = null;
  }

  function moves(state) {
    const piece = state.board.find((entry) => entry.id === state.previewSelected);
    if (!piece || piece.side !== "b") return [];
    return window.XQ.Rules.legalMoves(state.board, piece.id, state);
  }

  async function handlePiece(state, piece, moveTo, render) {
    const target = state.legal.find((move) => move.x === piece.x && move.y === piece.y);
    if (target) await moveTo(target.x, target.y);
    else if (piece.side === "b") {
      toggle(state, piece.id);
      render();
    }
  }

  function draw(state, board, position) {
    moves(state).forEach((move) => {
      const marker = document.createElement("div");
      marker.className = "cell enemy-hint";
      marker.setAttribute("aria-hidden", "true");
      position(marker, move.x, move.y);
      board.appendChild(marker);
    });
  }

  function selected(state, pieceId) {
    return state.previewSelected === pieceId;
  }

  return { clear, draw, handlePiece, moves, selected, toggle };
})();


/* achievements.js */
window.XQ = window.XQ || {};

window.XQ.Achievements=(() => {
  const COMBOS = {
    turtle: "龟缩", fish: "鱼水", rabbit: "兔阵", divine: "神选", collapse: "崩盘",
    eunuch: "宦潮", charmFormation: "媚阵", horse1: "纵马1", horse2: "纵马2",
    reinforcement: "增援", charmBlade: "媚骨蚀锋", horse3: "纵马3", corruption: "染心",
    horse4: "纵马4", music: "迷音", incense: "香阵", momentum: "盈不可久",
    karma: "业障", linkedBranches: "连枝", sacrifice: "生祭",
  };
  const REWARDS = {
    turtle: ["turtleShell", "龟壳"],
    rabbit: ["rabbitFoot", "兔脚"],
    eunuch: ["advisorStride", "仕途通达"],
    horse4: ["horseSale", "马系列商店半价"],
    corruption: ["charmMakeup", "媚妆"],
    momentum: ["endure", "卧薪尝胆"],
  };
  const EXTRA = [
    ["firstDefeat", "败而知进", "首次战败", "解锁局外双步虎符、道具图鉴、随机棋与招兵买马模式"],
    ["bishop", "异制初启", "完成首次征程结算", "开放主教改制购买"],
    ["queen", "后仪临阵", "完成第二次征程结算", "开放皇后改制购买"],
    ["rebelRescue", "破狱救援", "义军破敌推进至组合技阶段", "解锁关押剧情与义军兵败剧情图鉴"],
  ];
  const SCORE_THRESHOLDS = [5000, 10000, 20000, 50000, 100000];
  const SCORE = SCORE_THRESHOLDS.map((threshold, index) => [
    `score-${threshold}`,
    `积金累玉·${chineseNumber(index + 1)}`,
    threshold,
    Math.round(threshold * 0.1),
  ]);

  function ensure(state) {
    const talents = state.talents || (state.talents = {});
    talents.shopUnlocks = talents.shopUnlocks || {};
    const data = talents.achievements || (talents.achievements = { completed: {} });
    data.completed = data.completed || {};
    data.scoreRewards = data.scoreRewards || {};
    migrate(state, data.completed);
    return data;
  }

  function completeCombo(state) {
    if (state.mode !== "rebel") return [];
    const id = comboId(state);
    if (!COMBOS[id]) return [];
    const messages = mark(state, `combo-${id}`, `义军成就“破阵·${COMBOS[id]}”`);
    if (!messages.length) return messages;
    const reward = REWARDS[id];
    if (reward && !state.talents.shopUnlocks[reward[0]]) {
      state.talents.shopUnlocks[reward[0]] = true;
      messages.push(`成就奖励：已解锁${reward[1]}。`);
    } else if (!reward) {
      window.XQ.Progression.grantSlotUse(state);
      messages.push("成就奖励：私库搜寻次数 +1。");
    }
    return messages;
  }

  function complete(state, id) {
    ensure(state);
    const messages = mark(state, id, title(id));
    if (!messages.length) return messages;
    const t = state.talents;
    if (id === "firstDefeat") {
      t.outerTempoOffer = true;
      t.outerTempoNotice = true;
      t.captureGalleryUnlocked = true;
      t.randomModeUnlocked = true;
    }
    if (id === "bishop") t.chessStage = Math.max(1, t.chessStage || 0);
    if (id === "queen") t.chessStage = Math.max(2, t.chessStage || 0);
    if (id === "rebelRescue") {
      t.prisonGalleryUnlocked = true;
      t.defeatGalleryUnlocked = true;
    }
    messages.push(`成就奖励：${rewardText(id)}。`);
    return messages;
  }

  function cards(state) {
    checkScore(state);
    const completed = ensure(state).completed;
    return EXTRA.map(([id, name, condition, reward]) => card(id, name, condition, reward, completed[id]))
      .concat(SCORE.map(([id, name, threshold, reward]) => card(
        id, name, `积分达到 ${threshold.toLocaleString("zh-CN")}`, `${reward.toLocaleString("zh-CN")} 积分`, completed[id],
      )))
      .concat(window.XQ.ComboOrder.fixedIds().map((id) => card(
        `combo-${id}`, `破阵·${COMBOS[id]}`, `义军破敌通关组合技“${COMBOS[id]}”`,
        REWARDS[id] ? `解锁${REWARDS[id][1]}` : "1 次私库搜寻次数",
        completed[`combo-${id}`],
      )));
  }

  function open(state) {
    const list = cards(state);
    const done = list.filter((entry) => entry.done).length;
    window.XQ.Render.showCards("成就", `已完成 ${done}/${list.length}。成就奖励达成时自动发放。`, list, () => {}, "save");
  }

  function progress(state) {
    const list = cards(state);
    return { done: list.filter((entry) => entry.done).length, total: list.length };
  }

  function checkScore(state) {
    const data = ensure(state);
    let score = Math.max(0, Number(state.score) || 0);
    return SCORE.flatMap(([id, name, threshold, reward]) => {
      if (score < threshold && !data.completed[id]) return [];
      const newlyCompleted = !data.completed[id];
      if (newlyCompleted) data.completed[id] = Date.now();
      if (data.scoreRewards[id]) return newlyCompleted ? [`成就完成：${name}。`] : [];
      data.scoreRewards[id] = Date.now();
      score += reward;
      state.score = score;
      return [newlyCompleted
        ? `成就完成：${name}。奖励积分 +${reward.toLocaleString("zh-CN")}。`
        : `成就奖励补发：${name}，积分 +${reward.toLocaleString("zh-CN")}。`];
    });
  }

  function mark(state, id, name) {
    const completed = ensure(state).completed;
    if (completed[id]) return [];
    completed[id] = Date.now();
    return [`成就完成：${name}。`];
  }

  function migrate(state, completed) {
    const t = state.talents || {};
    if (t.outerTempoOffer) completed.firstDefeat ||= 1;
    if ((t.chessStage || 0) >= 1) completed.bishop ||= 1;
    if ((t.chessStage || 0) >= 2) completed.queen ||= 1;
    if (t.prisonGalleryUnlocked && t.defeatGalleryUnlocked) completed.rebelRescue ||= 1;
    const best = state.bestRecords?.rebel?.level || 1;
    if (best > 15 && state.rebelComboOrder?.length) {
      window.XQ.ComboOrder.legacyRebelLevels(state).forEach((entry) => {
        if (entry.level < best) completed[`combo-${entry.id}`] ||= 1;
      });
    }
    Object.entries(REWARDS).forEach(([id, reward]) => {
      if (t.shopUnlocks?.[reward[0]]) completed[`combo-${id}`] ||= 1;
      if (completed[`combo-${id}`]) t.shopUnlocks[reward[0]] = true;
    });
  }

  function comboId(state) {
    return state.currentComboId || window.XQ.ComboOrder.levels().find((entry) => entry.level === state.level)?.id;
  }

  function title(id) {
    return EXTRA.find((entry) => entry[0] === id)?.[1] || id;
  }

  function rewardText(id) {
    return EXTRA.find((entry) => entry[0] === id)?.[3] || "成就记录";
  }

  function chineseNumber(value) {
    const digits = "零一二三四五六七八九";
    if (value < 10) return digits[value];
    if (value === 10) return "十";
    if (value < 20) return `十${digits[value % 10]}`;
    if (value < 100) return `${digits[Math.floor(value / 10)]}十${value % 10 ? digits[value % 10] : ""}`;
    return String(value);
  }

  function card(id, name, condition, reward, done) {
    return {
      id, name: `${done ? "[已完成]" : "[未完成]"} ${name}`, rarity: done ? "gold" : "white",
      text: done && reward ? `${condition}。奖励：${reward}。` : `${condition}。`, done: Boolean(done),
    };
  }

  return { cards, checkScore, complete, completeCombo, ensure, open, progress };
})();


/* progression.js */
window.XQ = window.XQ || {};

window.XQ.Progression=(() => {
  function ensure(state) {
    const t = state.talents || (state.talents = {});
    t.chessStage = t.chessStage || 0;
    t.chess = Object.assign({ S: false, Q: false }, t.chess || {});
    t.outerTempoOffer = Boolean(t.outerTempoOffer);
    t.outerTempoNotice = Boolean(t.outerTempoNotice);
    t.randomModeUnlocked = Boolean(t.randomModeUnlocked || t.captureGalleryUnlocked);
    t.recruitModeUnlocked = Boolean(t.recruitModeUnlocked || t.randomModeUnlocked);
    t.shopUnlocks = Object.assign({ rabbitFoot: false, turtleShell: false, advisorStride: false, horseSale: false, endure: false, charmMakeup: false }, t.shopUnlocks || {});
    t.slotUses = Math.max(0, Math.floor(Number(t.slotUses) || 0));
    t.slotSession = normalizeSlotSession(t.slotSession);
    t.slotStats = Object.assign({ plays: 0, best: 0 }, t.slotStats || {});
    t.slotStats.plays = Math.max(0, Math.floor(Number(t.slotStats.plays) || 0));
    t.slotStats.best = Math.max(0, Math.floor(Number(t.slotStats.best) || 0));
    const rebelLevel = Math.max(state.mode === "rebel" ? state.level || 1 : 1, state.bestRecords?.rebel?.level || 1);
    if (rebelLevel > 15) unlockStoryGalleries(state);
    window.XQ.Achievements?.ensure?.(state);
    return t;
  }

  function normalizeSlotSession(session) {
    if (!session || typeof session !== "object" || !Array.isArray(session.pool) || !session.pool.length) return null;
    session.spin = Math.min(999, Math.max(0, Math.floor(Number(session.spin) || 0)));
    const fallbackRisk = session.spin >= 10 ? Math.min(60, 5 + (session.spin - 9) * 5) : 5;
    session.riskChance = Math.min(60, Math.max(5, Math.floor(Number(session.riskChance) || fallbackRisk)));
    session.total = Math.max(0, Math.floor(Number(session.total) || 0));
    session.lastPoints = Math.max(0, Math.floor(Number(session.lastPoints) || 0));
    session.grid = Array.isArray(session.grid) ? session.grid.slice(0, 9) : [];
    session.choices = Array.isArray(session.choices) ? session.choices.slice(0, 3) : [];
    session.details = Array.isArray(session.details) ? session.details.slice(0, 8) : [];
    if (session.phase === "complete") session.phase = "escape";
    session.phase = ["ready", "choice", "escape"].includes(session.phase) ? session.phase : "ready";
    if (session.spin >= 10 && session.phase === "ready") session.phase = "escape";
    if (session.phase === "choice" && !session.choices.length) session.phase = session.spin >= 10 ? "escape" : "ready";
    return session;
  }

  function finishRun(state) {
    const t = ensure(state);
    const unlocked = [];
    if (t.chessStage < 1) unlocked.push(...window.XQ.Achievements.complete(state, "bishop"));
    else if (t.chessStage < 2) unlocked.push(...window.XQ.Achievements.complete(state, "queen"));
    return unlocked;
  }

  function unlockTempo(state) {
    return window.XQ.Achievements.complete(state, "firstDefeat");
  }

  function unlockStoryGalleries(state) {
    if (state.mode !== "rebel" && (state.bestRecords?.rebel?.level || 1) <= 15) return [];
    return window.XQ.Achievements.complete(state, "rebelRescue");
  }

  function unlockComboShop(state) {
    ensure(state);
    return window.XQ.Achievements.completeCombo(state);
  }

  function failRun(state) {
    ensure(state);
    const unlocked = unlockTempo(state).concat(finishRun(state));
    if (!window.XQ.RandomMode?.is?.(state)) window.XQ.OuterItems.clearRunTempo(state);
    state.keepUids = state.keepUids || [];
    return unlocked;
  }

  function resetOuterUnlocks(state) {
    const t = ensure(state);
    t.retain = 0;
    t.outerItems = [];
    t.outerTempoOffer = false;
    t.outerTempoNotice = false;
    t.chessStage = 0;
    t.chess = { S: false, Q: false };
    if (t.achievements?.completed) {
      delete t.achievements.completed.firstDefeat;
      delete t.achievements.completed.bishop;
      delete t.achievements.completed.queen;
    }
    state.keepUids = [];
    state.rebelOuterUid = null;
  }

  function grantSlotUse(state, amount = 1) {
    const t = ensure(state);
    t.slotUses += Math.max(0, Math.floor(Number(amount) || 0));
    return t.slotUses;
  }

  return { ensure, failRun, finishRun, grantSlotUse, resetOuterUnlocks, unlockComboShop, unlockStoryGalleries, unlockTempo };
})();


/* enemy-stages.js */
window.XQ = window.XQ || {};

window.XQ.EnemyStages=(() => {
  const stages = [
    { name: "全子", mix: [] },
    { name: "1卒化马", mix: [["N", 1]] },
    { name: "2卒化马", mix: [["N", 2]] },
    { name: "3卒化马", mix: [["N", 3]] },
    { name: "4卒化马", mix: [["N", 4]] },
    { name: "5卒化马", mix: [["N", 5]] },
    { name: "1炮4马", mix: [["C", 1], ["N", 4]] },
    { name: "2炮3马", mix: [["C", 2], ["N", 3]] },
    { name: "3炮2马", mix: [["C", 3], ["N", 2]] },
    { name: "4炮1马", mix: [["C", 4], ["N", 1]] },
    { name: "1车3炮1马", mix: [["N", 1], ["C", 3], ["R", 1]] },
    { name: "2车2炮1马", mix: [["N", 1], ["C", 2], ["R", 2]] },
    { name: "3车1炮1马", mix: [["N", 1], ["C", 1], ["R", 3]] },
    { name: "4车1马", mix: [["N", 1], ["R", 4]] },
    { name: "5卒化车", mix: [["R", 5]] },
    { name: "2卒化主教", mix: [["S", 2]] },
    { name: "5卒化主教", mix: [["S", 5]] },
    { name: "1士化主教", mix: [], advisors: 1 },
    { name: "2士化主教", mix: [], advisors: 2 },
    { name: "1卒化皇后", mix: [["Q", 1]], advisors: 2 },
    { name: "1后2主", mix: [["Q", 1], ["S", 2]], advisors: 2 },
    { name: "2后3主", mix: [["Q", 2], ["S", 3]], advisors: 2 },
    { name: "2后3炮", mix: [["Q", 2], ["C", 3]], advisors: 2 },
    { name: "2后3车", mix: [["Q", 2], ["R", 3]], advisors: 2 },
  ];

  function stage(level, fullAt) {
    return stages[Math.min(Math.max(0, level - fullAt - 1), stages.length - 1)];
  }

  function apply(board, level, fullAt) {
    const pawns = board.filter((p) => p.side === "b" && p.type === "P");
    const advisors = board.filter((p) => p.side === "b" && p.type === "A");
    const used = new Set();
    const current = stage(level, fullAt);
    current.mix.forEach(([type, count]) => {
      const candidates = pawns.filter((pawn) => !used.has(pawn.id) && (type !== "C" || pawn.x !== 4));
      candidates.slice(0, count).forEach((pawn) => {
        pawn.type = type;
        used.add(pawn.id);
      });
    });
    advisors.slice(0, current.advisors || 0).forEach((p) => { p.type = "S"; });
  }

  function name(level, fullAt) { return stage(level, fullAt).name; }
  function lateBase(fullAt) { return fullAt + stages.findIndex((item) => item.mix.some(([type]) => type === "Q")); }

  return { apply, lateBase, name };
})();


/* enemy-traits.js */
window.XQ = window.XQ || {};

window.XQ.EnemyTraits=(() => {
  function roll(state) {
    const level = state.level || 1;
    const traits = {};
    const full = level > window.XQ.Config.blackAddOrder.length;
    const fullHorseChain = window.XQ.Late.horseSeriesComplete(state, level);
    if (full) {
      traits.elephantRiver = Math.random() < 0.45;
      traits.advisorFree = Math.random() < 0.45;
      traits.kingGuard = Math.random() < 0.25;
      traits.strongPawn = Math.random() < 0.35;
      traits.elitePawn = traits.strongPawn && Math.random() < 0.2;
      traits.horseLeap = Math.random() < 0.25;
      traits.horseRun = traits.horseLeap && Math.random() < 0.18;
      traits.horseFly = fullHorseChain && traits.horseRun && Math.random() < 0.12;
    }
    if (level > 0 && level % 3 === 0) Object.assign(traits, hard(level, fullHorseChain));
    normalize(traits);
    if (level > 14 && traits.kingFree && Object.keys(traits).filter((key) => traits[key]).length === 1) traits.advisorFree = true;
    return traits;
  }

  function hard(level, fullHorseChain) {
    const sets = [
      { advisorFree: true }, { elephantRiver: true }, { rookPhoenix: true },
      { strongPawn: true }, { strongPawn: true, elitePawn: true },
      { advisorFree: true, advisorRiver: true }, { kingFree: true },
      { kingGuard: true }, { elephantRiver: true, advisorFree: true },
      { horseStep: true, horseLeap: true },
      { horseStep: true, horseLeap: true, horseRun: true },
    ];
    if (fullHorseChain) sets.push({ horseStep: true, horseLeap: true, horseRun: true, horseFly: true });
    return sets[Math.floor(level / 3) % sets.length];
  }

  function normalize(traits) {
    if (traits.horseFly) traits.horseRun = true;
    if (traits.horseRun) traits.horseLeap = true;
    if (traits.horseLeap) traits.horseStep = true;
    if (traits.advisorStride) traits.advisorRiver = true;
    if (traits.advisorRiver) traits.advisorFree = true;
    if (traits.elitePawn) traits.strongPawn = true;
    return traits;
  }

  function text(traits) {
    const names = [];
    if (traits?.guard) names.push("铁壁营");
    if (traits?.elephantRiver) names.push("象过河");
    if (traits?.elephantStep) names.push("象位移");
    if (traits?.advisorFree) names.push("士出宫");
    if (traits?.advisorRiver) names.push("士过河");
    if (traits?.advisorStride) names.push("仕途通达");
    if (traits?.kingFree) names.push("将帅出宫");
    if (traits?.kingRiver) names.push("将帅过河");
    if (traits?.kingGuard) names.push("护驾符");
    if (traits?.rookPhoenix) names.push("车化凤辇");
    if (traits?.strongPawn) names.push("强兵");
    if (traits?.elitePawn) names.push("精兵");
    if (traits?.horseStep) names.push("马位移");
    if (traits?.horseLeap) names.push("马腾跃");
    if (traits?.horseRun) names.push("马驰骋");
    if (traits?.horseFly) names.push("马踏飞燕");
    if (traits?.cannon) names.push("神机炮");
    return names.length ? ` · ${names.join("/")}` : "";
  }

  return { normalize, roll, text };
})();


/* levels.js */
window.XQ = window.XQ || {};
window.XQ.Levels=(() => {
  const C = window.XQ.Config;
  function piece(side, type, x, y, index) {
    return { id: `${side}${type}${index}`, side, type, x, y };
  }
  function enemyCount(level) {
    return Math.min(C.blackAddOrder.length, Math.max(0, level - 1));
  }
  function isFullEnemy(level) {
    return enemyCount(level) >= C.blackAddOrder.length;
  }
  function isHard(level) {
    return level > 0 && level % 3 === 0;
  }
  function buildBoard(level, state) {
    let index = 0;
    const board = [];
    if (!window.XQ.RandomMode?.is?.(state)) C.redSetup.forEach(([type, x, y]) => board.push(piece("r", type, x, y, index++)));
    C.blackCore.forEach(([type, x, y]) => board.push(piece("b", type, x, y, index++)));
    C.blackAddOrder.slice(0, enemyCount(level)).forEach(([type, x, y]) => {
      board.push(piece("b", type, x, y, index++));
    });
    if (isFullEnemy(level)) window.XQ.EnemyStages.apply(board, level, C.blackAddOrder.length);
    if (window.XQ.RandomMode?.is?.(state)) return window.XQ.RandomMode.carryBoard(state, board);
    if (state?.mode === "rebel") {
      const lost = new Set((state.capturedRed || []).map((entry) => entry.id));
      return board.filter((entry) => entry.side !== "r" || !lost.has(entry.id));
    }
    return board;
  }
  function baseState(saved) {
    const state = {
      level: 1,
      score: 0, levelStartScore: 0,
      scoreMult: 1,
      items: [],
      board: [],
      selected: null,
      legal: [],
      side: "r",
      playerMovesLeft: 1,
      phase: "play",
      lastMove: null,
      moveRecords: [],
      history: [],
      fieldItems: [],
      capturedRed: [], levelStartCapturedRed: null,
      shop: null, freeRefreshes: 0,
      enemyFrozen: 0, playerFrozen: 0,
      enemyTraits: {}, enemyTurtle: null, enemyRabbit: null, enemyDivine: null, enemyCollapse: null, enemyFish: null, enemyEunuch: false, enemyHorse: 0, enemyCharm: null, enemyCorruption: null, enemyMusic: null, enemyReinforcement: null, enemyIncense: null, enemyKarma: null, enemyLinkedBranches: null, enemySacrifice: null, charmTiles: [], incenseTiles: [], collapseTiles: [], hardNotice: "", tempoNotice: false, tempoDeclined: false, suppressedItemUids: [], dropRefreshLocked: false, currentComboId: null,
      baseReward: 100,
      lastSettlement: null,
      bestRecord: { level: 1, score: 0 },
      talents: { retain: 0, outerItems: [] },
      keepUids: [],
      morphBought: { R: 0, N: 0, C: 0, S: 0, Q: 0 },
      morphs: {},
      pendingMorph: null, pendingRevive: null,
      pendingDestroy: false, pendingWeaken: false, charmMakeupCharges: 0,
      message: "红方行动",
      mode: "normal", battleInProgress: false, rebelOuterUid: null, slotUsePending: false,
      bestRecords: { normal: { level: 1, score: 0 }, rebel: { level: 1, score: 0 }, random: { level: 1, score: 0 }, recruit: { level: 1, score: 0 } },
      settings: { captureStoryMode: "story", rebelDefeatStory: true, rebelEarlyDefeatStory: true },
      captureStorySeen: [], postRescueStorySeen: [], rebelComboOrder: [], randomComboOrder: [],
      enemyBonusMoves: 0, enemyMovesLeft: 0, playerBonusMoves: 0, enemyMomentum: null,
      meteorPending: false, meteorActive: false, meteorPenaltyPending: false, enemyTurnSource: null,
      riverFlooded: false,
      view: { hintCost: 30, maxMoves: 1, scoreMult: 1, levelName: "第 1 关" },
    };
    const merged = Object.assign(state, saved || {});
    merged.talents = Object.assign({ retain: 0, outerItems: [] }, merged.talents || {});
    merged.history = [];
    merged.fieldItems = merged.fieldItems || [];
    merged.capturedRed = merged.capturedRed || [];
    merged.levelStartCapturedRed = (Array.isArray(saved?.levelStartCapturedRed) ? saved.levelStartCapturedRed : merged.capturedRed).map((piece) => ({ ...piece }));
    merged.shop = merged.shop || null; merged.freeRefreshes = merged.freeRefreshes || 0;
    merged.enemyFrozen = merged.enemyFrozen || 0; merged.playerFrozen = merged.playerFrozen || 0;
    merged.enemyTraits = merged.enemyTraits || {}; merged.enemyTurtle = merged.enemyTurtle || null; merged.enemyRabbit = merged.enemyRabbit || null; merged.enemyDivine = merged.enemyDivine || null; merged.enemyCollapse = merged.enemyCollapse || null; merged.enemyFish = merged.enemyFish || null; merged.enemyEunuch = Boolean(merged.enemyEunuch); merged.enemyHorse = merged.enemyHorse || 0; merged.enemyCharm = merged.enemyCharm || null; merged.enemyCorruption = merged.enemyCorruption || null; merged.enemyMusic = merged.enemyMusic || null; merged.enemyReinforcement = merged.enemyReinforcement || null; merged.enemyIncense = merged.enemyIncense || null; merged.enemyKarma = merged.enemyKarma || null; merged.enemyLinkedBranches = merged.enemyLinkedBranches || null; merged.enemySacrifice = merged.enemySacrifice || null; merged.charmTiles = merged.charmTiles || []; merged.incenseTiles = merged.incenseTiles || []; merged.collapseTiles = merged.collapseTiles || []; merged.hardNotice = merged.hardNotice || ""; merged.tempoNotice = Boolean(merged.tempoNotice); merged.tempoDeclined = Boolean(merged.tempoDeclined); merged.suppressedItemUids = merged.suppressedItemUids || []; merged.dropRefreshLocked = Boolean(merged.dropRefreshLocked); merged.currentComboId = merged.currentComboId || null;
    merged.baseReward = typeof merged.baseReward === "number" ? merged.baseReward : 100; merged.levelStartScore = typeof merged.levelStartScore === "number" ? merged.levelStartScore : merged.score || 0;
    merged.bestRecord = merged.bestRecord || { level: merged.level || 1, score: merged.score || 0 };
    merged.keepUids = merged.keepUids || [];
    merged.morphBought = Object.assign({ R: 0, N: 0, C: 0, S: 0, Q: 0 }, merged.morphBought || {});
    merged.morphs = Object.assign({}, merged.morphs || {});
    merged.pendingRevive = merged.pendingRevive || null; merged.pendingDestroy = Boolean(merged.pendingDestroy); merged.pendingWeaken = merged.pendingWeaken || false; merged.pendingDonate = Boolean(merged.pendingDonate); merged.charmMakeupCharges = Math.max(0, merged.charmMakeupCharges || 0);
    merged.settings = Object.assign({ captureStoryMode: "story", rebelDefeatStory: true, rebelEarlyDefeatStory: true }, merged.settings || {});
    merged.captureStorySeen = Array.isArray(merged.captureStorySeen) ? merged.captureStorySeen : []; merged.postRescueStorySeen = Array.isArray(merged.postRescueStorySeen) ? merged.postRescueStorySeen : []; merged.rebelComboOrder = Array.isArray(merged.rebelComboOrder) ? merged.rebelComboOrder : []; merged.randomComboOrder = Array.isArray(merged.randomComboOrder) ? merged.randomComboOrder : [];
    merged.enemyBonusMoves = Math.min(2, Math.max(0, merged.enemyBonusMoves || 0)); merged.enemyMovesLeft = Math.max(0, merged.enemyMovesLeft || 0); merged.playerBonusMoves = Math.min(1, Math.max(0, merged.playerBonusMoves || 0)); merged.enemyMomentum = merged.enemyMomentum || null;
    merged.meteorPending = Boolean(merged.meteorPending); merged.meteorActive = Boolean(merged.meteorActive); merged.meteorPenaltyPending = Boolean(merged.meteorPenaltyPending); merged.enemyTurnSource = merged.enemyTurnSource || null;
    merged.riverFlooded = Boolean(merged.riverFlooded); merged.battleInProgress = Boolean(merged.battleInProgress); merged.slotUsePending = Boolean(merged.slotUsePending); delete merged.playerRiverDebt; delete merged.enemyRiverDebt;
    window.XQ.Meteor?.normalize?.(merged);
    window.XQ.Mode?.ensure?.(merged);
    window.XQ.Progression?.ensure?.(merged);
    window.XQ.Items?.normalize?.(merged);
    window.XQ.Turtle?.sync?.(merged);
    return merged;
  }
  function startLevel(state) {
    state.moveRecords = []; state.riverFlooded = false;
    state.enemyTraits = window.XQ.EnemyTraits.roll(state); state.enemyTurtle = null; state.enemyRabbit = null; state.enemyDivine = null; state.enemyCollapse = null; state.enemyFish = null; state.enemyEunuch = false; state.enemyHorse = 0; state.enemyCharm = null; state.enemyCorruption = null; state.enemyMusic = null; state.enemyReinforcement = null; state.enemyIncense = null; state.enemyKarma = null; state.enemyLinkedBranches = null; state.enemySacrifice = null; state.enemyMomentum = null; state.charmTiles = []; state.incenseTiles = []; state.collapseTiles = []; state.suppressedItemUids = []; state.currentComboId = null;
    state.hardNotice = isHard(state.level) ? `第 ${state.level} 关为强敌关：黑方开局拥有${window.XQ.EnemyTraits.text(state.enemyTraits).replace(" · ", "") || "铁壁营"}。` : "";
    if (state.hardNotice) window.XQ.MoveRecord?.event?.(state, state.hardNotice, "mechanism"); window.XQ.Late?.startLevel?.(state);
    state.board = buildBoard(state.level, state);
    if (state.enemyEunuch) state.board.filter((p) => p.side === "b" && (p.id.startsWith("bP") || p.id.startsWith("bB"))).forEach((p) => { p.type = "A"; });
    if (state.enemyHorse) state.board.filter((p) => p.side === "b" && p.id.startsWith("bP")).slice(0, state.enemyHorse + 1).forEach((p) => { p.type = "N"; });
    window.XQ.Fish?.prepareBoard?.(state);
    applyMorphs(state);
    window.XQ.KingGuard?.refreshDivine?.(state);
    state.side = "r";
    state.selected = null; state.previewSelected = null; state.pendingRevive = null; state.pendingDestroy = false; state.pendingWeaken = false; state.pendingDonate = false; state.pendingMorph = null;
    state.legal = [];
    state.phase = "play"; state.lastMove = null;
    state.history = []; state.fieldItems = []; if (state.mode === "normal") state.capturedRed = []; state.shop = null; state.collapseTiles = state.collapseTiles || [];
    state.enemyFrozen = 0; state.playerFrozen = 0; state.enemyBonusMoves = 0; state.enemyMovesLeft = 0; state.playerBonusMoves = 0; state.rabbitFootCooldown = 0; state.playerTurtle = null; window.XQ.Turtle.sync(state);
    state.baseReward = 100; state.levelStartScore = state.score;
    state.lastSettlement = null;
    state.message = "";
    if (state.mode === "normal" && state.level >= 15 && !state.tempoDeclined && window.XQ.Items.addTempo(state)) state.tempoNotice = true;
    state.playerMovesLeft = hasTempo(state) ? 2 : 1;
    state.message = hasTempo(state) ? "双步虎符：红方可连续走两步" : "红方行动";
    if (state.enemyMomentum) state.message = "盈不可久：红方每次吃子，都会强化黑方下一次行动";
    const meteor = window.XQ.Meteor.startLevel(state); if (meteor) { state.message = meteor; window.XQ.MoveRecord?.event?.(state, meteor, "item"); }
    if (state.randomPlacement) {
      state.phase = "placement";
      window.XQ.RandomPlacement.select(state, state.randomPlacementSelected);
    }
  }

  function applyMorphs(state) {
    Object.keys(state.morphs || {}).forEach((id) => {
      const piece = state.board.find((p) => p.id === id);
      if (piece && piece.side === "r" && piece.type !== "K") piece.type = state.morphs[id];
    });
  }

  function hasTempo(state) {
    if (state.mode !== "normal") return false;
    const outer = window.XQ.Mode.activeOuterItems(state).some((item) => item.id === "tempo");
    const blocked = new Set(state.suppressedItemUids || []);
    const local = (state.items || []).some((item) => item.id === "tempo" && !blocked.has(item.uid));
    return outer || (isFullEnemy(state.level) && local && state.items.length < 25);
  }

  function levelName(state) {
    const prefix = state.mode === "quick" ? "快速挑战" : `第 ${state.level} 关`;
    const flood = state.riverFlooded ? " · 河界汛期" : "";
    if (isFullEnemy(state.level)) return `${prefix}${comboText(state)}${flood} · ${window.XQ.EnemyStages.name(state.level, C.blackAddOrder.length)}${window.XQ.EnemyTraits.text(state.enemyTraits)}`;
    const left = C.blackAddOrder.length - enemyCount(state.level);
    return `${prefix}${comboText(state)}${flood} · ${isHard(state.level) ? "强敌" : "普通"} · 敌军缺 ${left} 子`;
  }

  function comboText(state) {
    const extra = window.XQ.LateExtra?.name?.(state); if (extra) return state.enemyLinkedBranches?.pairLimit ? " · 机制：连枝" : ` · 组合技：${extra}`;
    if (state.enemyCharm?.blade) return " · 组合技：媚骨蚀锋";
    if (state.enemyCharm?.formation) return " · 组合技：媚阵";
    if (state.enemyTurtle) return " · 组合技：龟缩";
    if (state.enemyRabbit) return " · 组合技：兔阵";
    if (state.enemyDivine) return " · 组合技：神选";
    if (state.enemyCollapse) return " · 组合技：崩盘";
    if (state.enemyEunuch) return " · 组合技：宦潮";
    if (state.enemyHorse) return ` · 组合技：纵马${state.enemyHorse}`;
    if (state.enemyFish) return " · 组合技：鱼水";
    return state.enemyMomentum ? " · 盈不可久" : "";
  }

  function bannerMult(state) {
    return (window.XQ.Late?.activeItems?.(state) || state.items)
      .filter((item) => item.id === "banner")
      .reduce((total, item) => total + bannerBonus(item), 1);
  }

  function bannerBonus(item) {
    const value = Number(item?.value);
    if (!Number.isFinite(value)) return 0.08;
    return Math.min(0.25, Math.max(0, value - 1));
  }

  function reduceBase(state, amount) {
    state.baseReward = Math.max(0, Math.round((state.baseReward || 100) - amount));
    return state.baseReward;
  }

  function settle(state) {
    const base = state.baseReward || 0;
    const banner = bannerMult(state);
    const scoreMult = window.XQ.Late ? window.XQ.Late.scoreMult(state) : state.scoreMult || 1;
    const points = Math.round(base * banner * scoreMult);
    state.score += points;
    state.lastSettlement = {
      base,
      banner,
      scoreMult,
      points,
      formula: `${base}（基础）*${banner.toFixed(2)}（破阵旗加算）*${scoreMult.toFixed(2)}（积分倍率）=${points}`,
    };
    return points;
  }

  return { baseState, buildBoard, hasTempo, isFullEnemy, levelName, reduceBase, settle, startLevel };
})();


/* mode.js */
window.XQ = window.XQ || {};

window.XQ.Mode=(() => {
  const EMPTY_RECORD = { level: 1, score: 0 };
  const REBEL_STORY = "曌帝残暴，天下男丁几被屠尽，唯有一支小队戮力杀敌，剑指昏君，为男丁亡魂讨回公道。你是这支队伍的指挥官，曌帝治下男人最后的希望。";

  function ensure(state) {
    state.mode = normalizeName(state.mode);
    const legacy = state.bestRecord || EMPTY_RECORD;
    state.bestRecords = Object.assign({
      normal: { ...legacy },
      rebel: { ...EMPTY_RECORD },
      random: { ...EMPTY_RECORD },
      recruit: { ...EMPTY_RECORD },
    }, state.bestRecords || {});
    state.bestRecords.normal = normalizeRecord(state.bestRecords.normal);
    state.bestRecords.rebel = normalizeRecord(state.bestRecords.rebel);
    state.bestRecords.random = normalizeRecord(state.bestRecords.random);
    state.bestRecords.recruit = normalizeRecord(state.bestRecords.recruit);
    if (state.mode !== "normal") stripTempo(state);
    window.XQ.RandomMode?.ensure?.(state);
    window.XQ.QuickMode?.ensure?.(state);
    updateRecord(state);
    return state;
  }

  function normalizeName(mode) {
    return ["normal", "rebel", "random", "recruit", "quick"].includes(mode) ? mode : "normal";
  }

  function normalizeRecord(record) {
    return {
      level: Math.max(1, Number(record?.level) || 1),
      score: Math.max(0, Number(record?.score) || 0),
    };
  }

  function updateRecord(state) {
    if (!state?.bestRecords) return;
    if (state.mode === "quick") return;
    const key = normalizeName(state.mode);
    const old = normalizeRecord(state.bestRecords[key]);
    const current = { level: state.level || 1, score: state.score || 0 };
    if (current.level > old.level || (current.level === old.level && current.score > old.score)) {
      state.bestRecords[key] = current;
    }
    state.bestRecord = state.bestRecords.normal;
  }

  function stripTempo(state) {
    state.items = (state.items || []).filter((item) => item.id !== "tempo");
    state.tempoNotice = false;
    state.tempoDeclined = true;
  }

  function activeOuterItems(state) {
    const items = state?.talents?.outerItems || [];
    if (window.XQ.RandomMode?.is?.(state)) return window.XQ.RandomMode.activeOuterItems(state, items);
    if (state?.mode === "quick") return [];
    if (state?.mode !== "rebel") return items;
    const selected = items.find((item) => item.uid === state.rebelOuterUid && item.id !== "tempo");
    return selected ? [selected] : [];
  }

  function redCaptured(state, piece) {
    if (!piece) return;
    window.XQ.Levels.reduceBase(state, window.XQ.Config.values[piece.type] || 0);
    const active = window.XQ.Late?.activeItems?.(state) || state.items || [];
    if (active.some((item) => item.id === "endure")) state.playerBonusMoves = 1;
    if (piece.type === "K" && !window.XQ.RandomMode?.is?.(state)) return;
    const list = state.capturedRed || (state.capturedRed = []);
    if (!list.some((entry) => entry.id === piece.id)) {
      list.push({ ...piece, capturedUid: `c${Date.now()}${Math.random().toString(16).slice(2)}` });
    }
  }

  function isRebel(state) {
    return state?.mode === "rebel";
  }

  return { REBEL_STORY, activeOuterItems, ensure, isRebel, normalizeName, redCaptured, stripTempo, updateRecord };
})();


/* rebel-loadout.js */
window.XQ = window.XQ || {};

window.XQ.RebelLoadout=(() => {
  function eligible(state) {
    return (state.talents?.outerItems || []).filter((item) => item.id !== "tempo");
  }

  async function choose(state, render) {
    if (state.mode !== "rebel" || window.XQ.Mode.activeOuterItems(state).length) return true;
    const items = eligible(state);
    if (!items.length) return true;
    return new Promise((resolve) => {
      const cards = items.map((item) => ({
        ...item,
        name: `带入 ${item.name}`,
        text: `${item.text} 本轮义军征程仅此一件局外道具生效。`,
      }));
      window.XQ.Render.showCards(
        "选择义军局外道具",
        "义军破敌每轮只能带入一件已拥有的局外道具，选定后本轮不可更换。",
        cards,
        async (card) => {
          state.rebelOuterUid = card.uid;
          window.XQ.Render.hideRewards();
          render();
          resolve(true);
        },
        "locked",
      );
    });
  }

  return { choose, eligible };
})();


/* itemmult.js */
window.XQ = window.XQ || {};

window.XQ.ItemMult=(() => {
  function value(item) {
    return typeof item?.value === "number" && Number.isFinite(item.value) ? item.value : 1;
  }

  function sync(state) {
    state.items = state.items || [];
    state.keepUids = state.keepUids || [];
    const mults = state.items.filter((item) => item.id === "mult");
    if (!mults.length) {
      state.scoreMult = 1;
      return null;
    }
    const best = mults.reduce((top, item) => value(item) > value(top) ? item : top, mults[0]);
    state.items = state.items.filter((item) => item.id !== "mult" || item.uid === best.uid);
    state.keepUids = state.keepUids.filter((id) => state.items.some((item) => item.uid === id));
    state.scoreMult = value(best);
    return best;
  }

  function apply(state, card, pushItem) {
    const current = sync(state);
    if (current && value(current) >= value(card)) return 0;
    if (current) {
      Object.assign(current, {
        name: card.name,
        rarity: card.rarity || "gold",
        text: card.text,
        value: card.value,
        level: state.level,
      });
    } else {
      pushItem(state, card);
    }
    sync(state);
    return 0;
  }

  return { apply, sync, value };
})();


/* outeritems.js */
window.XQ = window.XQ || {};

window.XQ.OuterItems=(() => {
  const blocked = ["supply", "revive", "pawnSpell", "donate", "shopFree", "kingGuard"];
  const prereqNames = {
    advisorFree: "局外仕出宫",
    kingFree: "局外将帅出宫",
    elephantRiver: "局外飞象渡河",
    horseStep: "局外马位移",
    horseLeap: "局外马腾跃",
    horseRun: "局外马驰骋",
    strongPawn: "局外强兵",
  };

  function count(state, id) {
    const local = (state.items || []).filter((item) => item.id === id).length;
    const outer = (state.talents?.outerItems || []).filter((item) => item.id === id).length;
    return local + outer;
  }

  function canList(state, item, canOffer) {
    if (blocked.includes(item.id)) return false;
    if (item.id === "advisorRiver") return count(state, item.id) === 0;
    return canOffer(state, item);
  }

  function textFor(item) {
    if (item.id === "banner") return "永久生效。每局过关基础积分 +12%，与其他破阵旗加算。";
    const prefix = item.requires ? `前置：需先购买${prereqNames[item.requires] || item.requires}。` : "";
    return `${prefix}永久生效。${item.text}`;
  }

  function cards(level, state, config, canOffer) {
    const special = specialCards(level, state);
    const normal = config.randomItems.filter((item) => canList(state, item, canOffer)).map((item, index) => ({
      ...item,
      id: `outer-${item.id}`,
      baseId: item.id,
      name: `局外${item.name}`,
      text: textFor(item),
      value: item.id === "banner" ? 1.12 : 1,
      cost: outerPrice(config, item.id),
    }));
    const cards = special.concat(normal);
    return window.XQ.RandomMode.is(state) ? cards.filter((card) => ["banner", "cannon"].includes(card.baseId)) : cards;
  }

  function specialCards(level, state) {
    const t = window.XQ.Progression.ensure(state);
    const cards = [];
    const hasTempo = (t.outerItems || []).some((item) => item.id === "tempo");
    if (state.mode === "normal" && level === 1 && t.outerTempoOffer && !hasTempo) {
      cards.push({ id: "outer-tempo", baseId: "tempo", name: "局外双步虎符", rarity: "red", text: "本轮无限制生效。每回合红方可走两步，战败后清空。", value: 1, cost: 0, stacks: false });
    }
    if (t.chessStage >= 1 && !t.chess.S) cards.push({ id: "unlock-S", name: "解锁主教改制", rarity: "purple", text: "局内商店开始出售改制主教令。", cost: 880 });
    if (t.chessStage >= 2 && !t.chess.Q) cards.push({ id: "unlock-Q", name: "解锁皇后改制", rarity: "gold", text: "局内商店开始出售改制皇后令。", cost: 1080 });
    return cards;
  }

  function outerPrice(config, id) {
    if (id === "rookPhoenix") return Math.round(outerCost(config, "elephantRiver") * 2);
    return outerCost(config, id);
  }

  function outerCost(config, id) {
    const index = config.randomItems.filter((item) => canListPrice(item)).findIndex((item) => item.id === id);
    return (180 + 5 * 25 + Math.max(0, index) * 60) * 10;
  }

  function canListPrice(item) {
    return !blocked.includes(item.id);
  }

  function buy(state, card, uid, canOffer, normalize) {
    if (state.score < card.cost) return "积分不足";
    if (card.baseId && !canOffer(state, { id: card.baseId, stacks: card.stacks, requires: card.requires })) return missingText(card);
    state.score -= card.cost;
    normalize(state);
    if (card.id === "retain") state.talents.retain += 1;
    if (card.id === "unlock-S") state.talents.chess.S = true;
    if (card.id === "unlock-Q") state.talents.chess.Q = true;
    if (card.baseId) state.talents.outerItems.push({ id: card.baseId, uid: uid(), name: card.name, rarity: card.rarity || "white", text: card.text, value: card.value || 1 });
    return true;
  }

  function missingText(card) {
    if (card.requires) return `需要先购买${prereqNames[card.requires] || card.requires}`;
    return "已拥有或条件不满足";
  }

  function clearRunTempo(state) {
    if (!state.talents?.outerItems) return;
    state.talents.outerItems = state.talents.outerItems.filter((item) => item.id !== "tempo");
  }

  return { buy, cards, clearRunTempo };
})();


/* itemcodex.js */
window.XQ = window.XQ || {};

window.XQ.ItemCodex=(() => {
  const C = window.XQ.Config;
  const modes = [
    { id: "initial", label: "首字母" },
    { id: "consumable", label: "消耗品" },
    { id: "rarity", label: "稀有度" },
  ];
  let sortMode = "initial";
  const directions = { initial: "asc", consumable: "asc", rarity: "asc" };
  const fixed = [
    { id: "mult", name: "积分倍率", rarity: "gold", text: "过关积分倍率提升；唯一道具，只保留最高倍率。" },
    { id: "tempo", name: "双步虎符", rarity: "red", text: "每回合红方可走两步。局内版本累计 25 道具后失效；局外版本本轮无限制生效，战败后清空。" },
    { id: "retain", name: "传承锦囊", rarity: "purple", text: "新征程可预选保留更多局内道具。" },
    { id: "morph", name: "改制令", rarity: "purple", text: "购买后选择一枚红方非帅棋子，改制为车、马、炮、主教或皇后；改制后令为红色稀有度。" },
    { id: "destroy", name: "破军令", rarity: "red", text: "全子关后可在局内商店购买，选择并消灭一个敌方棋子。" },
    { id: "donate", name: "献子筹饷", rarity: "green", text: "选择己方非帅棋子赠予敌军，按棋子价值获得积分。" },
    { id: "letMove", name: "让你一招", rarity: "gold", text: "立即获得积分，代价是黑方下次额外行动一回合。" },
    { id: "rabbitFoot", name: "兔脚", rarity: "gold", text: "己方棋子被吃时，若后方一格为空，则后跳避开吃子；触发后冷却 4 回合。" },
    { id: "turtleShell", name: "龟壳", rarity: "red", text: "红帅首次被吃时龟缩避险，进入 3 回合无敌，9 回合后重新生效。" },
    { id: "endure", name: "卧薪尝胆", rarity: "gold", text: "己方棋子被吃后，红方下一回合额外行动 1 次，最多累积 1 次。" },
  ];

  function isUnlocked(state) {
    return Boolean(state?.talents?.outerTempoOffer);
  }

  function open(state) {
    if (!isUnlocked(state)) {
      window.XQ.Render.banner("失败一次后解锁道具图鉴");
      return;
    }
    window.XQ.Render.showCards("道具图鉴", "失败一次后解锁。这里可在战局外查看道具来源与效果。", cards(state), () => {}, "save");
    installControls(state);
  }

  function cards(state, mode = sortMode, direction = directions[mode]) {
    const seen = new Set();
    const unique = fixed.concat(C.randomItems).filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
    return sort(unique, mode, direction).map((item) => ({
      ...item,
      name: `${item.name}${sourceText(item, state)}`,
      text: `${requiresText(item)}${item.text}`,
    }));
  }

  function sort(items, mode = sortMode, direction = directions[mode] || "asc") {
    const rarity = C.rarityOrder || [];
    const factor = direction === "desc" ? -1 : 1;
    return [...items].sort((left, right) => {
      if (mode === "consumable") {
        const priority = Number(isConsumable(right)) - Number(isConsumable(left));
        if (priority) return priority * factor;
      }
      if (mode === "rarity") {
        const rank = rarity.indexOf(right.rarity) - rarity.indexOf(left.rarity);
        if (rank) return rank * factor;
      }
      return left.name.localeCompare(right.name, "zh-CN") * factor;
    });
  }

  function installControls(state) {
    const cardsRoot = document.getElementById("rewardCards");
    document.getElementById("codexSortControls")?.remove();
    const controls = document.createElement("div");
    controls.id = "codexSortControls";
    controls.className = "item-sort-controls";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "图鉴排序");
    modes.forEach((mode) => controls.appendChild(sortButton(mode, state)));
    cardsRoot.prepend(controls);
  }

  function sortButton(mode, state) {
    const button = document.createElement("button");
    const active = mode.id === sortMode;
    button.type = "button";
    button.textContent = `${mode.label}${active ? directions[mode.id] === "asc" ? " ↑" : " ↓" : ""}`;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    button.addEventListener("click", () => {
      if (sortMode === mode.id) directions[mode.id] = directions[mode.id] === "asc" ? "desc" : "asc";
      else sortMode = mode.id;
      open(state);
    });
    return button;
  }

  function isConsumable(item) {
    return C.consumableIds.includes(item.id);
  }

  function sourceText(item, state) {
    if (item.id === "rabbitFoot" && !state.talents?.shopUnlocks?.rabbitFoot) return "（义军成就“破阵·兔阵”奖励）";
    if (item.id === "turtleShell" && !state.talents?.shopUnlocks?.turtleShell) return "（义军成就“破阵·龟缩”奖励）";
    if (item.id === "advisorStride" && !state.talents?.shopUnlocks?.advisorStride) return "（义军成就“破阵·宦潮”奖励）";
    if (item.id === "endure" && !state.talents?.shopUnlocks?.endure) return "（义军成就“破阵·盈不可久”奖励）";
    if (item.id === "charmMakeup" && !state.talents?.shopUnlocks?.charmMakeup) return "（义军成就“破阵·染心”奖励）";
    if (["destroy", "donate", "letMove", "morph", "shopFree", "supply", "pawnSpell", "meteor", "offboard", "riverFlood"].includes(item.id)) return "（局内商店）";
    if (item.id === "retain" || item.id === "tempo") return "（局外天赋）";
    return "";
  }

  function requiresText(item) {
    return item.requires ? `前置：需先拥有${nameOf(item.requires)}。` : "";
  }

  function nameOf(id) {
    return C.randomItems.find((item) => item.id === id)?.name || id;
  }

  return { cards, isConsumable, isUnlocked, open, sort };
})();


/* consumable-state.js */
window.XQ = window.XQ || {};

window.XQ.ConsumableState=(() => {
  const immediateIds = new Set([
    "supply", "letMove", "pawnSpell", "destroy", "donate",
    "morph", "revive", "meteor", "offboard", "riverFlood",
  ]);
  const conditional = {
    shopFree: { field: "freeRefreshes", size: 3 },
    charmMakeup: { field: "charmMakeupCharges", size: 1 },
  };

  function normalize(state) {
    state.items = (state.items || []).filter((item) => !immediateIds.has(item.id));
    Object.entries(conditional).forEach(([id, rule]) => sync(state, id, rule));
  }

  function sync(state, id, rule) {
    const stored = state.items.filter((item) => item.id === id)
      .reduce((sum, item) => sum + (Number(item.value) || rule.size), 0);
    let remaining = Math.max(0, Number(state[rule.field]) || 0, stored);
    state[rule.field] = remaining;
    const removed = new Set();
    state.items.filter((item) => item.id === id).forEach((item) => {
      if (remaining <= 0) return removed.add(item);
      item.value = Math.min(rule.size, remaining);
      remaining -= item.value;
    });
    if (removed.size) state.items = state.items.filter((item) => !removed.has(item));
    while (remaining > 0) {
      const value = Math.min(rule.size, remaining);
      state.items.push(makeItem(state, id, value));
      remaining -= value;
    }
  }

  function makeItem(state, id, value) {
    const item = window.XQ.Config.randomItems.find((entry) => entry.id === id);
    return {
      ...item,
      uid: `i${Date.now()}${Math.random().toString(16).slice(2)}`,
      value,
      level: state.level,
    };
  }

  function grant(state, card, addItem) {
    const rule = conditional[card.id];
    if (!rule) return false;
    state[rule.field] = (state[rule.field] || 0) + rule.size;
    addItem(state, { ...card, value: rule.size });
    return true;
  }

  function consume(state, id) {
    normalize(state);
    const rule = conditional[id];
    if (!rule || !(state[rule.field] > 0)) return false;
    const blocked = new Set(state.suppressedItemUids || []);
    const item = state.items.find((entry) => entry.id === id && !blocked.has(entry.uid));
    if (!item) return false;
    state[rule.field] -= 1;
    item.value = Math.max(0, (Number(item.value) || rule.size) - 1);
    if (item.value === 0) state.items = state.items.filter((entry) => entry.uid !== item.uid);
    const name = window.XQ.Config.randomItems.find((entry) => entry.id === id)?.name || id;
    window.XQ.MoveRecord?.event?.(state, `消耗${name}，剩余 ${state[rule.field]} 次`, "item");
    return true;
  }

  function hasActive(state, id) {
    normalize(state);
    const blocked = new Set(state.suppressedItemUids || []);
    return state.items.some((item) => item.id === id && !blocked.has(item.uid));
  }

  function onSell(state, item) {
    const rule = conditional[item.id];
    if (!rule) return;
    state[rule.field] = Math.max(0, (state[rule.field] || 0) - (Number(item.value) || rule.size));
  }

  function status(item) {
    if (item.id === "shopFree") return ` 本张剩余 ${Number(item.value) || 1} 次免费刷新。`;
    if (item.id === "charmMakeup") return " 等待下一枚红方棋子被吃后触发。";
    return "";
  }

  return { consume, grant, hasActive, isImmediate: (id) => immediateIds.has(id), normalize, onSell, status };
})();


/* items.js */
window.XQ = window.XQ || {};
window.XQ.Items=(() => {
  const C = window.XQ.Config;
  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function weightedRand(arr, state, source) {
    const typeByItem = { advisorRiver: "A", elephantRiver: "B" };
    return window.XQ.ItemRoll.pick(arr, (item) => (state?.board?.some((p) => p.side === "r" && p.type === typeByItem[item.id]) ? 3 : 1)
      * (source === "shop" ? window.XQ.ItemRoll.shopBonus(item) : 1));
  }
  function uid() { return `i${Date.now()}${Math.random().toString(16).slice(2)}`; }
  function normalize(state) {
    state.items = (state.items || []).map((item) => item.uid ? item : { ...item, uid: uid() }); window.XQ.ConsumableState?.normalize?.(state);
    state.talents = Object.assign({ retain: 0, outerItems: [] }, state.talents || {});
    state.talents.outerItems = state.talents.outerItems || [];
    window.XQ.Progression?.ensure?.(state);
    state.keepUids = state.keepUids || [];
    state.morphBought = Object.assign({ R: 0, N: 0, C: 0, S: 0, Q: 0 }, state.morphBought || {});
    window.XQ.ItemMult?.sync?.(state);
  }
  function scoreCard(level) {
    const values = [1.12, 1.18, 1.25, 1.35];
    const value = rand(values) + Math.min(0.25, level * 0.01);
    return { id: "mult", name: `积分倍率 x${value.toFixed(2)}`, rarity: "gold", text: "唯一道具。已持有时，只保留更高的过关积分倍率。", points: 80 + level * 12, value };
  }
  function randomCard(level, state, excludeIds, source = "reward") {
    const blocked = new Set((excludeIds || []).concat(source === "reward" ? ["supply", "shopFree", "kingGuard", "pawnSpell", "revive"] : []));
    const supply = C.randomItems.find((item) => item.id === "supply");
    if (!blocked.has("supply") && canOffer(state, supply, source) && Math.random() < 0.08) return makeCard(supply, level);
    const pool = C.randomItems.filter((item) => item.id !== "supply" && !blocked.has(item.id) && canOffer(state, item, source));
    const item = weightedRand(pool.length ? pool : C.randomItems.filter((i) => i.stacks !== false && !blocked.has(i.id) && canOffer(state, i, source)), state, source);
    return makeCard(item, level);
  }
  function makeCard(item, level) {
    const extra = item.id === "supply" ? 160 + level * 28 : 70 + level * 10;
    if (item.id === "banner") {
      const value = [1.08, 1.12, 1.16, 1.22][Math.floor(Math.random() * 4)];
      const percent = Math.round((value - 1) * 100);
      return { ...item, name: `破阵旗 +${percent}%`, text: `过关基础积分 +${percent}%；多面旗帜加算。`, points: extra, value };
    }
    if (item.id === "supply") return { ...item, text: `立即获得 ${extra} 积分。`, points: extra, value: 1 };
    if (item.id === "shopFree") return { ...item, value: 3 };
    return { ...item, points: extra, value: 1 };
  }
  function roll(level, state) {
    const picked = [], extraMult = level === 6 && count(state, "mult") === 0;
    if (level === 1 || extraMult) picked.push(scoreCard(level));
    while (picked.length < (extraMult ? 4 : 3)) {
      const card = randomCard(level, state, picked.map((item) => item.id).concat("revive"));
      picked.push(card);
    }
    return picked;
  }
  function morphTypes(state) {
    const chess = state.talents?.chess || {}; return ["R", "N", "C"].concat(chess.S ? ["S"] : [], chess.Q ? ["Q"] : []);
  }
  function morphCards(level, state) {
    const cards = morphTypes(state).map((type) => ({
        id: "morph",
        targetType: type,
        rarity: type === "Q" ? "red" : type === "R" ? "gold" : "purple",
        name: `改制${C.labels.r[type]}令`,
        text: `购买后选择一枚红方非帅棋子，立刻改为${C.labels.r[type]}。`,
        cost: type === "Q" ? (140 + level * 24) * 2 : ["S"].includes(type) ? 880 : 360 + (type === "R" ? 180 : 80),
      }));
    return window.XQ.ItemRoll.sample(cards, 2);
  }
  function destroyCard(state) {
    return window.XQ.Levels.isFullEnemy(state.level) && !state.enemySacrifice?.active ? [{ id: "destroy", name: "破军令", rarity: "red", text: "选择并消灭一个敌方棋子。", cost: 1000 }] : [];
  }
  function donateCard(state) {
    return state.board?.some((p) => p.side === "r" && p.type !== "K")
      ? { id: "donate", name: "献子筹饷", rarity: "green", text: "选择己方非帅棋子赠予敌军，按棋子价值获得积分。", cost: 0 }
      : null;
  }
  function letMoveCard(level) {
    const points = 240 + level * 40;
    return { id: "letMove", name: "让你一招", rarity: "gold", text: `立即获得 ${points} 积分，黑方下次额外行动一回合。`, cost: 0, points };
  }
  function reviveCard(level, state) {
    if (!["rebel", "random", "recruit"].includes(state.mode) || !(state.capturedRed || []).length) return null;
    const item = C.randomItems.find((entry) => entry.id === "revive");
    const card = makeCard(item, level);
    card.cost = 140 + level * 24 + 55;
    return card;
  }
  function tacticCard(level, state) {
    return [{ ...rand([donateCard(state), letMoveCard(level), reviveCard(level, state)].filter(Boolean)), sharedSlot: true }];
  }
  function shop(level, state) {
    const normal = [];
    while (normal.length < 3) {
      const excluded = normal.map((item) => item.id);
    if (["rebel", "random", "recruit"].includes(state.mode)) excluded.push("revive");
      normal.push(randomCard(level, state, excluded, "shop"));
    }
    normal.forEach((card, index) => {
      const cost = 140 + level * 24 + index * 55;
      const double = ["rookPhoenix", "rabbitFoot", "turtleShell", "advisorStride"].includes(card.id);
      card.cost = double ? Math.round(cost * 2) : card.id === "meteor" ? window.XQ.Meteor.cost(level) : card.id === "offboard" ? 620 + level * 30 : card.id === "kingGuard" ? 800 : card.id === "charmMakeup" ? 680 : card.id === "endure" ? 720 : card.id === "shopFree" ? 10 : card.id === "supply" ? Math.max(1, Math.floor((card.points || cost) / 2)) : cost;
      if (state.talents?.shopUnlocks?.horseSale && ["horseStep", "horseLeap", "horseRun", "horseFly"].includes(card.id)) card.cost = Math.max(1, Math.round(card.cost / 2));
    });
    const cards = normal.concat(morphCards(level, state), destroyCard(state), tacticCard(level, state)); return window.XQ.RandomMode?.is?.(state) ? window.XQ.RandomMode.shop(level, state, cards) : cards;
  }
  function pushItem(state, card) {
    state.items.push({ id: card.id, uid: uid(), name: card.name, rarity: card.rarity || "white", text: card.text, value: card.value, level: state.level });
  }
  function apply(state, card) {
    if (card.id === "supply") { state.score += card.points || 0; return card.points || 0; }
    if (card.id === "shopFree") { window.XQ.ConsumableState.grant(state, card, pushItem); return 0; }
    if (card.id === "pawnSpell") return 0;
    if (card.id === "mult") return window.XQ.ItemMult.apply(state, card, pushItem);
    pushItem(state, card);
    return 0;
  }
  function buy(state, card) {
    if (state.score < card.cost) return false;
    if (!canOffer(state, card, "shop")) return false;
    state.score -= card.cost;
    if (card.id === "supply") { state.score += card.points || 0; return true; }
    if (card.id === "shopFree") return window.XQ.ConsumableState.grant(state, card, pushItem);
    if (card.id === "letMove") { state.score += card.points || 0; state.playerFrozen = (state.playerFrozen || 0) + 1; return true; }
    if (card.id === "meteor") return window.XQ.Meteor.arm(state);
    if (card.id === "charmMakeup") return window.XQ.Corruption.armMakeup(state) && (pushItem(state, { ...card, value: 1 }), true);
    if (card.id === "offboard") return true;
    if (card.id === "riverFlood") { state.riverFlooded = true; return true; }
    if (window.XQ.ConsumableState.isImmediate(card.id)) return true;
    pushItem(state, card);
    return true;
  }
  function sell(state, uid) {
    normalize(state);
    const index = state.items.findIndex((item) => item.uid === uid);
    if (index < 0) return 0;
    if (state.suppressedItemUids?.includes(uid)) return 0;
    if (state.items[index].id.startsWith("morph-") || state.items[index].randomLocked) return 0;
    const [item] = state.items.splice(index, 1);
    window.XQ.ConsumableState.onSell(state, item);
    state.keepUids = state.keepUids.filter((id) => id !== uid);
    const value = sellValue(item);
    state.score += value;
    return value;
  }
  function sellValue(item) { return ({ white: 60, green: 100, purple: 170, gold: 260, red: 420 })[item.rarity || "white"] || 60; }
  function talent(state) {
    const next = (state.talents?.retain || 0) + 1;
    return { id: "retain", name: `传承锦囊 ${next}`, rarity: next >= 3 ? "gold" : "purple", text: `新征程最多保留 ${next} 个已获道具。`, cost: 420 + next * 260 };
  }
  function outerCards(level, state) {
    return window.XQ.OuterItems.cards(level, state, C, canOffer);
  }
  function buyTalent(state, card) {
    return window.XQ.OuterItems.buy(state, card, uid, canOffer, normalize);
  }
  function count(state, id) {
    normalize(state);
    return (window.XQ.Late?.activeItems?.(state) || state.items).filter((i) => i.id === id).length;
  }
  function ownedCount(state, id) {
    const local = state.items.filter((i) => i.id === id).length;
    const outer = state.talents.outerItems.filter((i) => i.id === id).length;
    return local + outer;
  }
  function canOffer(state, item, source = "reward") {
    const id = item.baseId || item.id;
    if (!state) return item.stacks !== false;
    if (item.shopOnly && source !== "shop") return false;
    if (item.unlock && !state.talents?.shopUnlocks?.[item.unlock]) return false;
    if (item.id === "revive" && !(state.capturedRed || []).length) return false;
    if (item.id === "pawnSpell" && state.phase !== "play") return false;
    if (item.id === "donate" && !state.board?.some((p) => p.side === "r" && p.type !== "K")) return false;
    if (item.id === "meteor" && !window.XQ.Meteor.canBuy(state)) return false;
    const shooterReady = state.phase === "play" && state.board?.some((piece) => piece.side === "r" && piece.type === "K")
      && state.board?.some((piece) => piece.side === "b");
    if (item.id === "offboard" && !shooterReady) return false;
    if (item.id === "riverFlood" && state.riverFlooded) return false;
    if (item.id === "destroy" && state.enemySacrifice?.active) return false;
    if (item.requires && ownedCount(state, item.requires) === 0) return false;
    return item.stacks !== false || ownedCount(state, id) === 0;
  }
  function captureScore(state, type) {
    normalize(state);
    const base = C.values[type] || 0;
    const tactical = ["R", "N", "C"].includes(type) ? count(state, "cannon") : 0;
    return Math.round(base * (1 + tactical * 0.12));
  }
  function addTempo(state) {
    normalize(state);
    if (state.mode !== "normal") return false;
    if (ownedCount(state, "tempo") > 0) return false;
    pushItem(state, { id: "tempo", name: "双步虎符", rarity: "red", text: "每回合红方可走两步，累计 25 道具后失效。", value: 1 });
    return true;
  }
  function hintCost(state) { return Math.max(5, Math.round((30 + Math.max(0, (state.level || 1) - 1) * 5) * Math.pow(0.8, count(state, "oracle")))); }
  return { addTempo, apply, buy, buyTalent, canOffer, captureScore, count, hintCost, makeCard, normalize, outerCards, roll, sell, shop, talent };
})();


/* mode-items.js */
window.XQ = window.XQ || {};

window.XQ.ModeItems=(() => {
  const EXCLUDED = new Set(["supply", "shopFree", "pawnSpell", "revive", "meteor", "riverFlood", "charmMakeup"]);
  const APPLICABLE = {
    K: ["kingFree", "kingRiver", "kingGuard", "turtleShell"],
    A: ["advisorFree", "advisorRiver", "advisorStride"],
    B: ["elephantRiver", "elephantStep"],
    N: ["horseStep", "horseLeap", "horseRun", "horseFly"],
    R: ["rookPhoenix"],
    C: ["cannon"],
    P: ["strongPawn", "elitePawn"],
  };

  function grant(state, amount, options = {}) {
    const added = [];
    const exclude = new Set(options.excludeIds || []);
    for (let i = 0; i < amount; i += 1) {
      const pool = candidates(state, options.allowLocked, exclude);
      const item = weightedPick(pool, options.pieceCounts);
      if (!item) break;
      const card = window.XQ.Items.makeCard(item, state.level || 1);
      const before = new Set(state.items);
      window.XQ.Items.apply(state, card);
      const next = state.items.find((entry) => !before.has(entry));
      if (!next) continue;
      if (options.randomLocked) next.randomLocked = true;
      added.push(next);
      if (item.stacks === false) exclude.add(item.id);
    }
    return added;
  }

  function grantIds(state, ids, randomLocked = false) {
    return ids.map((id) => {
      if (state.items.some((item) => item.id === id)) return null;
      const item = window.XQ.Config.randomItems.find((entry) => entry.id === id);
      if (!item) return null;
      const before = new Set(state.items);
      window.XQ.Items.apply(state, window.XQ.Items.makeCard(item, state.level || 1));
      const added = state.items.find((entry) => !before.has(entry)) || null;
      if (added && randomLocked) added.randomLocked = true;
      return added;
    }).filter(Boolean);
  }

  function candidates(state, allowLocked, exclude) {
    return window.XQ.Config.randomItems.filter((item) => {
      if (EXCLUDED.has(item.id) || exclude.has(item.id)) return false;
      if (!allowLocked) return window.XQ.Items.canOffer(state, item, "reward");
      if (item.stacks === false && owned(state, item.id)) return false;
      return !item.requires || owned(state, item.requires);
    });
  }

  function weightedPick(pool, counts = {}) {
    const weighted = pool.map((item) => ({ item, weight: itemWeight(item, counts) }));
    const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
    let roll = Math.random() * total;
    for (const entry of weighted) {
      roll -= entry.weight;
      if (roll <= 0) return entry.item;
    }
    return weighted.at(-1)?.item || null;
  }

  function itemWeight(item, counts) {
    const id = item.id;
    let weight = window.XQ.ItemRoll.rarityWeight(item);
    if (id === "advisorRiver" && Number(counts.A || 0) > 0) weight += 2;
    if (id === "elephantRiver" && Number(counts.B || 0) > 0) weight += 2;
    Object.entries(APPLICABLE).forEach(([type, ids]) => {
      if (ids.includes(id)) weight += Math.max(0, Number(counts[type] || 0) - 3) * 1.5;
    });
    return weight;
  }

  function owned(state, id) {
    return state.items.some((item) => item.id === id)
      || (state.talents?.outerItems || []).some((item) => item.id === id);
  }

  return { grant, grantIds };
})();


/* mode-opening.js */
window.XQ = window.XQ || {};

window.XQ.ModeOpening=(() => {
  function show(state, options) {
    if (!state?.[options.pendingKey]) return Promise.resolve(true);
    const wanted = new Set(state[options.uidKey] || []);
    const items = (state.items || []).filter((item) => wanted.has(item.uid));
    const names = items.length ? items.map((item) => item.name).join("、") : "暂无可用道具";
    return new Promise((resolve) => {
      window.XQ.Render.showCards(options.title, `${options.intro}${names}${options.suffix || ""}`, [{
        id: "continue",
        name: options.action,
        rarity: options.rarity || "gold",
        text: options.text,
      }], async () => {
        state[options.pendingKey] = false;
        window.XQ.Render.hideRewards();
        resolve(true);
      }, "locked");
    });
  }

  function random(state) {
    return show(state, {
      pendingKey: "randomOpeningNoticePending",
      uidKey: "randomOpeningItemUids",
      title: "随机棋初始道具",
      intro: "本轮获得 5 个随机道具，并额外获得将帅出宫、仕出宫：",
      action: "开始布阵",
      text: "确认初始道具后进入随机棋布阵。",
    });
  }

  function recruit(state) {
    return show(state, {
      pendingKey: "randomOpeningNoticePending",
      uidKey: "randomOpeningItemUids",
      title: "招兵买马初始道具",
      intro: "本轮获得 5 个随机道具，并额外获得将帅出宫、仕出宫：",
      action: "开始招募",
      rarity: "gold",
      text: "确认初始道具后进入自由选子与布阵。",
    });
  }

  function quick(state) {
    return show(state, {
      pendingKey: "quickOpeningNoticePending",
      uidKey: "quickOpeningItemUids",
      title: "快速模式初始道具",
      intro: "本局获得 5 个随机道具，包含尚未解锁的道具：",
      action: "开始挑战",
      rarity: "purple",
      text: "这些开局道具不会被本局关卡屏蔽。",
    });
  }

  return { quick, random, recruit, show };
})();


/* drop-morphs.js */
window.XQ = window.XQ || {};

window.XQ.DropMorphs=(() => {
  function apply(state, piece, targetType) {
    if (!window.XQ.RandomMode?.is?.(state) || piece?.side !== "r") return false;
    if (!piece.dropOriginalType) piece.dropOriginalType = piece.type;
    piece.type = targetType;
    return true;
  }

  function restore(pieces) {
    (pieces || []).forEach((piece) => {
      if (!piece.dropOriginalType) return;
      piece.type = piece.dropOriginalType;
      delete piece.dropOriginalType;
    });
  }

  function restoreState(state) {
    if (!window.XQ.RandomMode?.is?.(state)) return;
    restore(state.board);
    restore(state.capturedRed);
  }

  return { apply, restore, restoreState };
})();


/* quick-mode.js */
window.XQ = window.XQ || {};

window.XQ.QuickMode=(() => {
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
    const last = window.XQ.EnemyStages.lateBase(window.XQ.Config.blackAddOrder.length) + window.XQ.ComboOrder.offset("sacrifice");
    return first + Math.floor(Math.random() * (last - first + 1));
  }

  function settleWin(state) {
    if (state.phase === "quick-won") return { rewards: [], unlocked: [] };
    const points = 1000;
    state.score += points;
    window.XQ.Progression.grantSlotUse(state);
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

  function showEnd(state, won, leave, unlocked = []) {
    const title = won ? "快速模式胜利" : "快速模式结束";
    const result = won
      ? `固定胜利奖励 +1000 积分，私库搜寻次数 +1。当前积分 ${state.score}。`
      : `本局挑战结束。当前积分 ${state.score}。`;
    const intro = `${result}${unlocked.join("")}`;
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


/* random-mode.js */
window.XQ = window.XQ || {};

window.XQ.RandomMode=(() => {
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


/* recruit-controls.js */
window.XQ = window.XQ || {};

window.XQ.RecruitTools=(() => {
  const TYPES = ["K", "A", "B", "N", "R", "C", "P", "S", "Q"];
  const RECRUIT_VALUES = { K: 25, Q: 180 };

  function roster(state) {
    return state.board.filter((piece) => piece.side === "r").concat(state.randomReserve);
  }

  function totalCost(state) {
    return roster(state).reduce((sum, piece) => sum + value(piece.type), 0);
  }

  function value(type) {
    return RECRUIT_VALUES[type] ?? window.XQ.Config.values[type] ?? 0;
  }

  function renderControls(state, reserve, selectedType, counts, api) {
    TYPES.forEach((type) => {
      const row = document.createElement("div");
      row.className = "recruit-piece-control";
      const minus = document.createElement("button");
      minus.type = "button";
      minus.textContent = "-";
      minus.title = `减少${window.XQ.Config.labels.r[type]}`;
      minus.disabled = !state.randomReserve.some((piece) => piece.type === type);
      minus.onclick = () => {
        const index = state.randomReserve.findIndex((piece) => piece.type === type);
        if (index < 0) return;
        state.randomReserve.splice(index, 1);
        state.randomPlacementSelected = state.randomReserve[0]?.id || null;
        state.legal = state.randomReserve.length ? api.cells(state) : [];
        api.render();
        void api.save();
      };
      const pick = document.createElement("button");
      pick.type = "button";
      pick.className = selectedType === type ? "selected" : "";
      pick.textContent = `${window.XQ.Config.labels.r[type]} ×${counts.get(type) || 0}`;
      pick.onclick = () => {
        const piece = state.randomReserve.find((entry) => entry.type === type);
        if (piece && api.select(state, piece.id)) api.render();
      };
      const plus = document.createElement("button");
      plus.type = "button";
      plus.textContent = "+";
      plus.title = `增加${window.XQ.Config.labels.r[type]}`;
      plus.disabled = roster(state).length >= 16;
      plus.onclick = () => {
        const id = `rr${Date.now()}${Math.random().toString(16).slice(2)}`;
        state.randomReserve.push({ id, side: "r", type });
        api.select(state, id);
        api.render();
        void api.save();
      };
      row.append(minus, pick, plus);
      reserve.appendChild(row);
    });
  }

  return { renderControls, roster, totalCost };
})();


/* random-placement.js */
window.XQ = window.XQ || {};

window.XQ.RandomPlacement=(() => {
  let controls = null;

  function configure(next) {
    controls = next;
  }

  function active(state) {
    return window.XQ.RandomMode.is(state) && state.randomPlacement;
  }

  function recruit(state) {
    return state?.mode === "recruit";
  }

  function cells(state) {
    const occupied = new Set(state.board.map(key));
    return window.XQ.RandomMode.ownCells().filter((cell) => !occupied.has(key(cell)));
  }

  function select(state, id) {
    if (!active(state) || !state.randomReserve.some((piece) => piece.id === id)) return false;
    state.randomPlacementSelected = id;
    state.legal = cells(state);
    const piece = state.randomReserve.find((entry) => entry.id === id);
    state.message = `选择己方半场空位放置${label(piece)}`;
    return true;
  }

  function place(state, x, y) {
    if (!active(state) || !state.legal.some((cell) => cell.x === x && cell.y === y)) return false;
    const index = state.randomReserve.findIndex((piece) => piece.id === state.randomPlacementSelected);
    if (index < 0) return false;
    const [piece] = state.randomReserve.splice(index, 1);
    state.board.push({ ...piece, x, y });
    state.randomPlacementSelected = state.randomReserve[0]?.id || null;
    state.legal = state.randomReserve.length ? cells(state) : [];
    state.message = state.randomReserve.length ? `还需摆放 ${state.randomReserve.length} 枚棋子` : "布阵完成，可以开战";
    return true;
  }

  function remove(state, id) {
    if (!active(state)) return false;
    const index = state.board.findIndex((piece) => piece.id === id && piece.side === "r");
    if (index < 0) return false;
    const [piece] = state.board.splice(index, 1);
    state.randomReserve.unshift({ id: piece.id, side: "r", type: piece.type });
    select(state, piece.id);
    return true;
  }

  function auto(state) {
    if (!active(state)) return;
    const open = shuffle(cells(state));
    while (state.randomReserve.length && open.length) {
      state.board.push({ ...state.randomReserve.shift(), ...open.shift() });
    }
    state.randomPlacementSelected = null;
    state.legal = [];
    state.message = "已自动完成布阵，可以开战";
  }

  async function finish(state) {
    if (!active(state) || state.randomReserve.length || !controls) return;
    const total = window.XQ.RecruitTools.roster(state).length;
    if (!total) {
      window.XQ.Render.banner("至少选择一枚棋子才能开始");
      return;
    }
    const cost = window.XQ.RecruitTools.totalCost(state);
    if (recruit(state) && (state.score < 0 || state.score < cost)) {
      window.XQ.Render.banner(state.score < 0 ? "积分为负，不能开始招兵买马" : `积分不足，本轮需要 ${cost} 积分`);
      return;
    }
    if (recruit(state)) {
      state.score -= cost;
      state.recruitPaidCost = cost;
    }
    state.randomPlacement = false;
    state.phase = "play";
    state.selected = null;
    state.legal = [];
    state.message = recruit(state) ? `招兵买马开战：本轮出阵花费 ${cost} 积分` : "随机棋开战：全军覆没才会失败";
    state.randomLevelStartPieces = window.XQ.RandomMode.redPieces(state.board);
    window.XQ.Fish?.startLevel?.(state);
    window.XQ.Drops.start(state);
    window.XQ.Collapse?.startLevel?.(state);
    window.XQ.RoundEffects?.startLevel?.(state);
    controls.render();
    await controls.flush();
    window.XQ.Render.banner("布阵完成，开始战斗");
  }

  async function handlePiece(state, id) {
    if (!active(state)) return false;
    if (remove(state, id)) {
      controls.render();
      void controls.save();
    }
    return true;
  }

  async function handleMove(state, x, y) {
    if (!active(state)) return false;
    if (place(state, x, y)) {
      controls.render();
      void controls.save();
    }
    return true;
  }

  function render(state) {
    const panel = document.getElementById("randomPlacementPanel");
    if (!panel) return;
    const isActive = active(state);
    const isRecruit = isActive && recruit(state);
    document.querySelector(".game-shell")?.classList.toggle("recruit-placement-active", isRecruit);
    panel.classList.toggle("hidden", !isActive);
    window.XQ.BoardLayout?.fit?.();
    if (!isActive) return;
    const reserve = document.getElementById("randomReserve");
    reserve.classList.toggle("recruiting", recruit(state));
    document.getElementById("randomPlacementTitle").textContent = recruit(state) ? "招兵买马布阵" : "随机棋布阵";
    const selectedType = state.randomReserve.find((piece) => piece.id === state.randomPlacementSelected)?.type;
    const counts = new Map();
    state.randomReserve.forEach((piece) => counts.set(piece.type, (counts.get(piece.type) || 0) + 1));
    if (recruit(state)) {
      state.board.filter((piece) => piece.side === "r").forEach((piece) => counts.set(piece.type, (counts.get(piece.type) || 0) + 1));
    }
    reserve.innerHTML = "";
    if (recruit(state)) window.XQ.RecruitTools.renderControls(state, reserve, selectedType, counts, {
      cells, render: controls.render, save: controls.save, select,
    });
    else counts.forEach((count, type) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = selectedType === type ? "selected" : "";
        button.textContent = `${window.XQ.Config.labels.r[type]} ×${count}`;
        button.onclick = () => {
          const piece = state.randomReserve.find((entry) => entry.type === type);
          if (piece && select(state, piece.id)) controls.render();
        };
        reserve.appendChild(button);
      });
    document.getElementById("randomPlacementStatus").textContent = recruit(state)
      ? `已摆放 ${state.board.filter((piece) => piece.side === "r").length}/${window.XQ.RecruitTools.roster(state).length} · 费用 ${window.XQ.RecruitTools.totalCost(state)} 积分`
      : `已摆放 ${16 - state.randomReserve.length}/16`;
    const start = document.getElementById("randomStartBtn");
    start.disabled = state.randomReserve.length > 0 || !window.XQ.RecruitTools.roster(state).length;
    start.onclick = () => void finish(state);
    document.getElementById("randomAutoBtn").onclick = () => {
      auto(state);
      controls.render();
      void controls.save();
    };
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
  function label(piece) { return window.XQ.Config.labels.r[piece?.type] || "棋子"; }

  return { active, auto, cells, configure, finish, handleMove, handlePiece, place, remove, render, select };
})();


/* shopstate.js */
window.XQ = window.XQ || {};

window.XQ.ShopState=(() => {
  const I = window.XQ.Items;

  function prepare(state) {
    if (!state.shop || state.shop.level !== state.level || !Array.isArray(state.shop.cards)) reset(state);
    state.shop.cards = state.shop.cards.filter((card) => !(state.enemySacrifice?.active && card.id === "destroy")
      && (card.stacks !== false || I.count(state, card.baseId || card.id) === 0));
    state.shop.cards.forEach((card) => { card.shopUid = card.shopUid || uid(); });
    state.shop.refreshCount = state.shop.refreshCount || 0;
    return state.shop.cards;
  }

  function reset(state) {
    state.shop = { level: state.level, cards: tag(I.shop(state.level, state)), refreshCount: 0 };
  }

  function refresh(state) {
    prepare(state);
    const free = consumesFreeRefresh(state);
    const cost = free ? 0 : baseRefreshCost(state);
    if (state.score < cost) return false;
    if (free) window.XQ.ConsumableState.consume(state, "shopFree");
    else { state.score -= cost; state.shop.refreshCount += 1; }
    state.shop.cards = tag(I.shop(state.level, state));
    return true;
  }

  function refreshCost(state) {
    prepare(state);
    return consumesFreeRefresh(state) ? 0 : baseRefreshCost(state);
  }

  function consumesFreeRefresh(state) {
    prepare(state);
    return baseRefreshCost(state) > 0 && window.XQ.ConsumableState.hasActive(state, "shopFree");
  }

  function remove(state, card) {
    if (!card.shopUid) return;
    state.shop.cards = prepare(state).filter((item) => item.shopUid !== card.shopUid);
  }

  function buy(state, card) {
    const real = prepare(state).find((item) => item.shopUid && item.shopUid === card.shopUid);
    if (!real) return { ok: false, message: "商品已变化，请重新打开商店" };
    if (state.score < (real.cost || 0)) return { ok: false, message: "积分不足" };
    if (!I.buy(state, real)) return { ok: false, message: "当前无法购买该道具" };
    if (real.id === "pawnSpell") state.pendingWeaken = pending(real);
    if (real.id === "destroy") state.pendingDestroy = true;
    if (real.id === "donate") state.pendingDonate = true;
    if (real.id === "morph") state.pendingMorph = pending(real);
    if (real.id === "turtleShell") state.playerTurtle = state.playerTurtle || { active: true, shield: 0, cooldown: 0 };
    window.XQ.MoveRecord?.event?.(state, `购入${real.name}，消耗 ${real.cost || 0} 积分`, "item");
    remove(state, real);
    return { ok: true, card: real };
  }

  function pending(card) {
    return { targetType: card.targetType, cost: 0, shopUid: card.shopUid, name: card.name, rarity: card.rarity, text: card.text };
  }

  function tag(cards) {
    return cards.map((card) => ({ ...card, shopUid: card.shopUid || uid() }));
  }

  function baseRefreshCost(state) {
    if (I.count(state, "refreshLock") > 0) return 50;
    return fib(state.shop.refreshCount);
  }

  function fib(n) {
    if (n <= 0) return 0;
    let a = 0;
    let b = 1;
    for (let i = 1; i < n; i += 1) [a, b] = [b, a + b];
    return b;
  }

  function uid() { return `s${Date.now()}${Math.random().toString(16).slice(2)}`; }

  return { buy, consumesFreeRefresh, prepare, refresh, refreshCost, remove, reset };
})();


/* drops.js */
window.XQ = window.XQ || {};

window.XQ.Drops=(() => {
  const R = window.XQ.Rules;
  const TYPES = [
    { id: "freeze", name: "缚阵令", mark: "冻", text: "敌方接下来一到两次行动被冻结。" },
    { id: "rook", name: "车骑令", mark: "车", text: "拾取的红方棋子变为车；随机棋与招兵买马模式仅持续本局。" },
    { id: "pawn", name: "贬卒令", mark: "卒", text: "敌方优先随机非卒棋子变为卒。" },
  ];
  const QUEEN = { id: "queen", name: "升后令", mark: "后", text: "随机棋与招兵买马模式专属：拾取的红方棋子本局变为后。" };
  const HERBICIDE = { id: "herbicide", name: "除草剂", mark: "除", text: "随机清除最多 5 个草。" };

  function emptyCells(state) {
    const cells = [];
    for (let y = 0; y < 10; y += 1) {
      for (let x = 0; x < 9; x += 1) {
        if (!R.at(state.board, x, y) && !state.fieldItems.some((i) => i.x === x && i.y === y)
          && !state.collapseTiles?.some((i) => i.x === x && i.y === y)
          && !state.charmTiles?.some((i) => i.x === x && i.y === y)
          && !state.incenseTiles?.some((i) => i.x === x && i.y === y)) {
          cells.push({ x, y });
        }
      }
    }
    return cells;
  }

  function spawn(state, force) {
    if (state.dropRefreshLocked && !state.enemyMomentum?.active) return;
    state.fieldItems = state.fieldItems || [];
    if (!force && (state.fieldItems.length >= 2 || Math.random() > 0.34)) return;
    const cells = preferPlayerHalf(emptyCells(state));
    if (!cells.length) return;
    const cell = cells[Math.floor(Math.random() * cells.length)];
    const type = rollType(state);
    state.fieldItems.push({ ...type, ...cell, uid: `d${Date.now()}${Math.random()}` });
  }

  function rollType(state) {
    if (state.enemyFish?.active && Math.random() < 0.28) return HERBICIDE;
    const r = Math.random();
    if (window.XQ.RandomMode?.is?.(state)) return r < 0.16 ? TYPES[0] : r < 0.44 ? TYPES[1] : r < 0.72 ? QUEEN : TYPES[2];
    return r < 0.16 ? TYPES[0] : r < 0.58 ? TYPES[1] : TYPES[2];
  }

  function preferPlayerHalf(cells) {
    const own = cells.filter((cell) => cell.y >= 5);
    return own.length && Math.random() < 0.78 ? own : cells;
  }

  function start(state) {
    state.fieldItems = [];
    if (state.dropRefreshLocked && !state.enemyMomentum?.active) return;
    spawn(state, true);
  }

  async function collect(state, pieceId, side) {
    const piece = state.board.find((p) => p.id === pieceId);
    if (!piece) return "";
    const index = state.fieldItems.findIndex((i) => i.x === piece.x && i.y === piece.y);
    if (index < 0) return "";
    const item = state.fieldItems.splice(index, 1)[0];
    const targetSide = piece.side === "r" ? "b" : "r";
    let text = item.text;
    if (item.id === "freeze") {
      const turns = window.XQ.Items.count(state, "tempo") > 0 ? 1 : 2;
      if (targetSide === "b") state.enemyFrozen += turns;
      else state.playerFrozen += turns;
      text = `拾取${item.name}，${sideName(targetSide)}冻结 ${turns} 回合`;
    }
    if (["rook", "queen"].includes(item.id) && side === "r") text = morph(state, piece, item);
    if (item.id === "pawn") text = weakenSide(state, targetSide, item);
    if (item.id === "herbicide") text = clearGrass(state, 5);
    spawn(state, false);
    return text;
  }

  function morph(state, piece, item) {
    const targetType = item.id === "queen" ? "Q" : "R";
    if (window.XQ.DropMorphs.apply(state, piece, targetType)) {
      return `拾取${item.name}，该棋子本局变为${window.XQ.Config.labels.r[targetType]}，下一局恢复原兵种`;
    }
    if (piece.type !== "K") {
      piece.type = targetType;
      return `拾取${item.name}，该棋子变为${window.XQ.Config.labels.r[targetType]}`;
    }
    const points = item.id === "queen" ? 100 : 80;
    state.score += points;
    return `拾取${item.name}，帅不能变${window.XQ.Config.labels.r[targetType]}，改为获得 ${points} 积分`;
  }

  function clearGrass(state, amount) {
    if (state.enemyFish?.active) Object.assign(state.enemyFish, { skipNextGrass: true, turns: 0 });
    const grass = state.board.filter((p) => p.side === "n" && p.type === "G");
    const picked = grass.map((piece) => ({ piece, key: Math.random() })).sort((a, b) => a.key - b.key).slice(0, amount).map((entry) => entry.piece.id);
    state.board = state.board.filter((piece) => !picked.includes(piece.id));
    return picked.length ? `除草剂生效：随机清除了 ${picked.length} 个草。` : "除草剂没有找到可清除的草。";
  }

  function weakenSide(state, side, item) {
    const strongTargets = state.board.filter((p) => p.side === side && p.type !== "K" && p.type !== "P");
    const targets = strongTargets.length ? strongTargets : state.board.filter((p) => p.side === side && p.type !== "K");
    if (!targets.length) return `拾取${item.name}，${sideName(side)}没有可变卒棋子`;
    const target = targets[Math.floor(Math.random() * targets.length)];
    const label = window.XQ.Config.labels[side]?.[target.type] || target.type;
    const rank = (side === "b" && target.y === 0) || (side === "r" && target.y === 9) ? "底线" : "";
    target.type = "P";
    return `拾取${item.name}，${sideName(side)}${rank}${label}变卒`;
  }

  function sideName(side) { return side === "b" ? "黑方" : "红方"; }

  return { collect, spawn, start };
})();


/* stateops.js */
window.XQ = window.XQ || {};

window.XQ.StateOps=(() => {
  const R = window.XQ.Rules;
  const L = window.XQ.Levels;
  const D = window.XQ.Drops;

  function beginLevel(state) {
    window.XQ.RandomMode.beforeLevel(state);
    window.XQ.QuickMode.beforeLevel(state);
    state.levelStartCapturedRed = clonePieces(state.capturedRed);
    L.startLevel(state);
    if (window.XQ.RandomPlacement.active(state)) return;
    window.XQ.Fish?.startLevel?.(state);
    D.start(state);
    window.XQ.Collapse?.startLevel?.(state);
    const round = window.XQ.RoundEffects?.startLevel?.(state);
    window.XQ.MoveRecord?.event?.(state, round, "mechanism");
  }

  function restartLevel(state) {
    state.capturedRed = clonePieces(state.levelStartCapturedRed);
    window.XQ.RandomMode.restoreLevelStart(state);
    beginLevel(state);
  }

  function snapshot(state) {
    state.history.push({
      score: state.score,
      scoreMult: state.scoreMult,
      baseReward: state.baseReward,
      levelStartScore: state.levelStartScore,
      items: state.items.map((item) => ({ ...item })),
      board: R.clone(state.board),
      side: state.side,
      playerMovesLeft: state.playerMovesLeft,
      moveRecords: (state.moveRecords || []).map((record) => ({ ...record })),
      lastMove: state.lastMove,
      fieldItems: state.fieldItems.map((i) => ({ ...i })),
      capturedRed: state.capturedRed.map((i) => ({ ...i })),
      enemyFrozen: state.enemyFrozen,
      playerFrozen: state.playerFrozen,
      enemyTraits: { ...state.enemyTraits },
      enemyTurtle: state.enemyTurtle ? { ...state.enemyTurtle } : null,
      enemyRabbit: state.enemyRabbit ? { ...state.enemyRabbit } : null,
      enemyDivine: state.enemyDivine ? { ...state.enemyDivine } : null,
      enemyCollapse: state.enemyCollapse ? { ...state.enemyCollapse } : null,
      enemyFish: state.enemyFish ? { ...state.enemyFish } : null,
      enemyEunuch: Boolean(state.enemyEunuch),
      enemyHorse: state.enemyHorse || 0,
      enemyCharm: state.enemyCharm ? { ...state.enemyCharm } : null,
      enemyCorruption: state.enemyCorruption ? { ...state.enemyCorruption } : null,
      enemyMusic: state.enemyMusic ? { ...state.enemyMusic, controlledIds: [...(state.enemyMusic.controlledIds || [])] } : null,
      enemyReinforcement: state.enemyReinforcement ? { ...state.enemyReinforcement } : null,
      enemyIncense: state.enemyIncense ? { ...state.enemyIncense } : null,
      enemyKarma: state.enemyKarma ? { ...state.enemyKarma, pieces: JSON.parse(JSON.stringify(state.enemyKarma.pieces || {})) } : null,
      enemyLinkedBranches: state.enemyLinkedBranches ? { ...state.enemyLinkedBranches, pairs: JSON.parse(JSON.stringify(state.enemyLinkedBranches.pairs || [])) } : null,
      enemySacrifice: state.enemySacrifice ? { ...state.enemySacrifice } : null,
      enemyBonusMoves: state.enemyBonusMoves || 0,
      enemyMovesLeft: state.enemyMovesLeft || 0,
      playerBonusMoves: state.playerBonusMoves || 0,
      meteorPending: Boolean(state.meteorPending),
      meteorActive: Boolean(state.meteorActive),
      meteorPenaltyPending: Boolean(state.meteorPenaltyPending),
      enemyTurnSource: state.enemyTurnSource || null,
      riverFlooded: Boolean(state.riverFlooded),
      captureStorySeen: [...(state.captureStorySeen || [])],
      postRescueStorySeen: [...(state.postRescueStorySeen || [])],
      collapseTiles: (state.collapseTiles || []).map((i) => ({ ...i })),
      charmTiles: (state.charmTiles || []).map((i) => ({ ...i })),
      incenseTiles: (state.incenseTiles || []).map((i) => ({ ...i })),
      morphs: { ...(state.morphs || {}) },
      morphBought: { ...(state.morphBought || {}) },
      pendingRevive: state.pendingRevive,
      pendingDestroy: state.pendingDestroy,
      pendingWeaken: state.pendingWeaken,
      pendingMorph: state.pendingMorph,
      pendingDonate: state.pendingDonate,
      charmMakeupCharges: state.charmMakeupCharges || 0,
      message: state.message,
    });
    if (state.history.length > 3) state.history.shift();
  }

  function restore(state) {
    const old = state.history.pop();
    if (!old) return false;
    Object.assign(state, old);
    state.pendingRevive = null;
    state.selected = null;
    state.previewSelected = null;
    state.legal = [];
    state.phase = "play";
    return true;
  }

  function copyState(state) {
    return JSON.parse(JSON.stringify(state));
  }

  function restoreState(state, snapshot) {
    Object.keys(state).forEach((key) => delete state[key]);
    Object.assign(state, copyState(snapshot));
  }

  function actionError(error, fallback = "操作失败，已恢复到操作前状态，请重试") {
    return error?.userMessage || fallback;
  }

  async function transact(state, action) {
    const snapshot = copyState(state);
    try {
      return await action();
    } catch (error) {
      restoreState(state, snapshot);
      throw error;
    }
  }

  function retainedItems(items) {
    const result = [];
    let multIndex = -1;
    items.forEach((item) => {
      if (item.id !== "mult") result.push(item);
      else if (multIndex < 0) { multIndex = result.length; result.push(item); }
      else if (window.XQ.ItemMult.value(item) > window.XQ.ItemMult.value(result[multIndex])) result[multIndex] = item;
    });
    return result;
  }

  function newRun(current) {
    const limit = current.talents?.retain || 0;
    const picked = current.items.filter((i) => current.keepUids?.includes(i.uid));
    const keep = retainedItems(picked).slice(0, limit);
    const scoreMult = keep.filter((i) => i.id === "mult").reduce((m, i) => Math.max(m, window.XQ.ItemMult.value(i)), 1);
    window.XQ.Mode.updateRecord(current);
    const next = L.baseState({ mode: current.mode, score: current.score, scoreMult, items: keep, talents: current.talents, settings: current.settings, bestRecords: current.bestRecords, captureStorySeen: [], postRescueStorySeen: [] });
    if (current.mode !== "normal") window.XQ.Mode.stripTempo(next);
    next.morphBought = { R: 0, N: 0, C: 0, S: 0, Q: 0 };
    next.morphs = {};
    beginLevel(next);
    return { next, kept: keep.length };
  }

  function toggleKeep(state, uid) {
    const limit = state.talents?.retain || 0;
    if (!uid || limit <= 0 || !state.items.some((item) => item.uid === uid)) return "无法保留该道具";
    state.keepUids = state.keepUids || [];
    if (state.keepUids.includes(uid)) state.keepUids = state.keepUids.filter((id) => id !== uid);
    else if (state.keepUids.length < limit) state.keepUids.push(uid);
    else return "保留栏已满";
    return true;
  }

  function bestOf(best, state) {
    const current = { level: state.level || 1, score: state.score || 0 };
    const old = best || current;
    return current.level > old.level || (current.level === old.level && current.score > old.score) ? current : old;
  }

  function clonePieces(pieces) {
    return (pieces || []).map((piece) => ({ ...piece }));
  }

  return {
    actionError, beginLevel, copyState, newRun, restartLevel,
    restore, restoreState, snapshot, toggleKeep, transact,
  };
})();


/* fx.js */
window.XQ = window.XQ || {};

window.XQ.FX=(() => {
  let audioCtx = null;

  function loading(method, ...args) {
    try {
      window.dzmm?.loading?.[method]?.(...args);
    } catch (err) {
      console.warn("loading event failed:", err.message);
    }
  }

  function tone(freq, ms) {
    if (window.XQ.AudioManager?.effectTone) {
      window.XQ.AudioManager.effectTone(freq, ms);
      return;
    }
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.value = freq;
      gain.gain.value = 0.04;
      osc.connect(gain).connect(audioCtx.destination);
      osc.start();
      setTimeout(() => osc.stop(), ms);
    } catch (err) {
      console.warn("audio failed:", err.message);
    }
  }

  return { loading, tone, volumeAware: true };
})();


/* ai.js */
window.XQ = window.XQ || {};

window.XQ.AI=(() => {
  const C = window.XQ.Config;
  const R = window.XQ.Rules;

  function scoreMove(state, move) {
    const p = state.board.find((q) => q.id === move.id);
    const target = R.at(state.board, move.x, move.y);
    const guard = Boolean(state.enemyTraits?.guard);
    let score = Math.random() * 4;
    if (target) score += target.side === p.side ? 34 - C.values[target.type] * 0.28 : C.values[target.type] * (guard ? 0.78 : 1);
    const next = R.move(state.board, move.id, move.x, move.y).board;
    if (R.inCheck(next, "r", state)) score += 55;
    if (R.inCheck(next, "b", state)) score -= 180;
    if (p.type === "K") score -= 10;
    score += p.type === "R" || p.type === "C" ? 4 : 0;
    score -= Math.abs(4 - move.x) * 0.7;
    return score;
  }

  function choose(state) {
    const moves = R.sideMoves(state.board, "b", state);
    if (!moves.length) return null;
    return moves
      .map((m) => ({ ...m, score: scoreMove(state, m) }))
      .sort((a, b) => b.score - a.score)[0];
  }

  function hint(state) {
    const moves = R.sideMoves(state.board, "r", state);
    if (!moves.length) return null;
    const scout = window.XQ.Items.count(state, "scout");
    return moves
      .map((m) => {
        const target = R.at(state.board, m.x, m.y);
        const next = R.move(state.board, m.id, m.x, m.y).board;
        let score = target ? C.values[target.type] : 0;
        if (state.enemyCharm?.blade && state.charmTiles?.some((tile) => tile.x === m.x && tile.y === m.y)) score -= 1000;
        if (target?.side === "b" && state.enemyCorruption?.active && !(state.enemyCorruption.cooldown > 0)) score -= 1000;
        if (R.inCheck(next, "b", state)) score += scout ? 80 : 35;
        if (R.inCheck(next, "r", state)) score -= 80;
        return { ...m, score };
      })
      .sort((a, b) => b.score - a.score)[0];
  }

  return { choose, hint };
})();


/* storage-data.js */
window.XQ = window.XQ || {};

window.XQ.StorageData=(() => {
  function clone(value) {
    return JSON.parse(JSON.stringify(value ?? null));
  }

  function packMode(state) {
    window.XQ.Mode?.updateRecord?.(state);
    const data = clone(state);
    delete data.history;
    delete data.moveRecords;
    delete data.legal;
    delete data.selected;
    delete data.previewSelected;
    delete data.view;
    delete data.coreOffline;
    data.savedAt = Date.now();
    return data;
  }

  function packShared(state) {
    window.XQ.Mode?.updateRecord?.(state);
    return {
      score: Math.max(0, Number(state.score) || 0),
      talents: clone(state.talents || {}),
      settings: clone(state.settings || {}),
      bestRecords: clone(state.bestRecords || {}),
      activeMode: window.XQ.Mode.normalizeName(state.mode),
      savedAt: Date.now(),
    };
  }

  function merge(mode, saved, shared) {
    const savedScore = Number(saved?.score) || 0;
    const sharedScore = Number(shared?.score);
    const data = Object.assign({}, clone(saved) || {}, clone(shared) || {});
    data.mode = window.XQ.Mode.normalizeName(mode);
    if (saved && Number.isFinite(sharedScore)) {
      const delta = sharedScore - savedScore;
      data.levelStartScore = (Number(saved.levelStartScore) || savedScore) + delta;
      data.savedAt = saved.savedAt;
    }
    delete data.activeMode;
    return data;
  }

  function sharedFrom(data) {
    if (!data) return null;
    return {
      score: Math.max(0, Number(data.score) || 0),
      talents: clone(data.talents || {}),
      settings: clone(data.settings || {}),
      bestRecords: clone(data.bestRecords || {}),
      activeMode: window.XQ.Mode.normalizeName(data.mode),
      savedAt: Date.now(),
    };
  }

  return { merge, packMode, packShared, sharedFrom };
})();


/* storage-backend.js */
window.XQ = window.XQ || {};

window.XQ.StorageBackend=(() => {
  function create() {
    const cache = new Map();
    const readErrors = new Map();
    const inflightReads = new Map();
    let local;

    function copy(value) {
      return value == null ? value : JSON.parse(JSON.stringify(value));
    }

    function localStore() {
      if (local !== undefined) return local;
      try {
        local = window.localStorage;
        local.setItem("__xq_probe__", "1");
        local.removeItem("__xq_probe__");
      } catch (_) {
        local = null;
      }
      return local;
    }

    function readFailure(key, remoteError, localError) {
      const error = new Error("存档读取失败，请稍后重试");
      error.code = "SAVE_READ_FAILED";
      error.key = key;
      error.cause = remoteError || localError || null;
      readErrors.set(key, { code: error.code, message: error.message, at: Date.now() });
      return error;
    }

    async function readFresh(key) {
      let remoteError = null;
      if (window.dzmm?.kv) {
        try {
          const data = await window.dzmm.kv.get(key);
          const value = data?.value ?? null;
          cache.set(key, copy(value));
          readErrors.delete(key);
          return copy(value);
        } catch (err) {
          remoteError = err;
          console.warn("kv get failed:", err.message);
        }
      }
      const store = localStore();
      if (!store) throw readFailure(key, remoteError, null);
      let raw;
      try {
        raw = store.getItem(key);
      } catch (err) {
        console.warn("local save read failed:", err.message);
        throw readFailure(key, remoteError, err);
      }
      if (!raw && remoteError) throw readFailure(key, remoteError, null);
      try {
        const value = raw ? JSON.parse(raw) : null;
        cache.set(key, copy(value));
        readErrors.delete(key);
        return copy(value);
      } catch (err) {
        console.warn("local save parse failed:", err.message);
        throw readFailure(key, remoteError, err);
      }
    }

    async function read(key, force = false) {
      if (!force && cache.has(key)) return copy(cache.get(key));
      if (inflightReads.has(key)) return copy(await inflightReads.get(key));
      const task = readFresh(key);
      inflightReads.set(key, task);
      try {
        return copy(await task);
      } finally {
        inflightReads.delete(key);
      }
    }

    async function write(key, data) {
      let ok = false;
      try {
        if (window.dzmm?.kv) {
          await window.dzmm.kv.put(key, data);
          ok = true;
        }
      } catch (err) {
        console.warn("kv put failed:", err.message);
      }
      try {
        const store = localStore();
        if (store) {
          store.setItem(key, JSON.stringify(data));
          ok = true;
        }
      } catch (_) {}
      if (!ok) throw new Error("存档写入失败");
      cache.set(key, copy(data));
    }

    async function remove(key) {
      try {
        if (window.dzmm?.kv) await window.dzmm.kv.delete(key);
      } catch (err) {
        console.warn("kv delete failed:", err.message);
      }
      try {
        localStore()?.removeItem(key);
      } catch (_) {}
      cache.delete(key);
    }

    function reset(key) {
      local = undefined;
      if (key) {
        cache.delete(key);
        readErrors.delete(key);
        return;
      }
      cache.clear();
      readErrors.clear();
    }

    function status(key) {
      if (key) return readErrors.get(key) || { code: "OK", message: "", at: 0 };
      return {
        ok: readErrors.size === 0,
        errors: Array.from(readErrors.entries()).map(([entryKey, error]) => ({ key: entryKey, ...error })),
      };
    }

    return { read, remove, reset, status, write };
  }

  return { create };
})();


/* storage.js */
window.XQ = window.XQ || {};
window.XQ.Storage=(() => {
  const LEGACY_KEY = "xiangqi-rogue-save";
  const SHARED_KEY = "xiangqi-rogue-shared";
  const MODE_KEYS = {
    normal: "xiangqi-rogue-save-normal",
    rebel: "xiangqi-rogue-save-rebel",
    random: "xiangqi-rogue-save-random",
    recruit: "xiangqi-rogue-save-recruit",
    quick: "xiangqi-rogue-save-quick",
  };
  const MANUAL_PREFIX = "xiangqi-rogue-manual-";
  const Data = window.XQ.StorageData;
  const Backend = window.XQ.StorageBackend.create();
  let chain = Promise.resolve();
  let timer = null;
  let pending = null;
  let waiters = [];
  let failures = 0;
  let migrated = false, migrationTask = null;
  let pendingSince = 0, lastDrainAt = 0;
  const fingerprints = new Map();
  const QUEUE_DELAY = 1500;
  const MIN_WRITE_GAP = 6000;
  const MAX_WAIT = 10000;
  function modeName(mode) {
    return window.XQ.Mode.normalizeName(mode);
  }
  const read = Backend.read;
  const write = Backend.write;
  const remove = Backend.remove;
  async function migrate() {
    if (migrated) return;
    if (migrationTask) return migrationTask;
    migrationTask = (async () => {
      const [legacy, normal, rebel, random, recruit, quick, shared] = await Promise.all([
        read(LEGACY_KEY), read(MODE_KEYS.normal), read(MODE_KEYS.rebel), read(MODE_KEYS.random), read(MODE_KEYS.recruit), read(MODE_KEYS.quick), read(SHARED_KEY),
      ]);
      const legacyMode = modeName(legacy?.mode);
      if (legacy && !(legacyMode === "normal" ? normal : rebel)) {
        await write(MODE_KEYS[legacyMode], Data.packMode(legacy));
      }
      const source = [legacy, normal, rebel, random, recruit, quick].filter(Boolean).sort((a, b) => (a.savedAt || 0) - (b.savedAt || 0)).pop();
      if (!shared && source) await write(SHARED_KEY, Data.sharedFrom(source));
      if (legacy) await remove(LEGACY_KEY);
      migrated = true;
    })();
    try {
      await migrationTask;
    } finally {
      migrationTask = null;
    }
  }
  async function getShared() {
    await migrate();
    return read(SHARED_KEY);
  }
  async function getMode(mode) {
    await migrate();
    const name = modeName(mode);
    const [saved, shared] = await Promise.all([read(MODE_KEYS[name]), read(SHARED_KEY)]);
    return saved ? Data.merge(name, saved, shared) : null;
  }
  async function getInitial() {
    await migrate();
    const shared = await read(SHARED_KEY);
    const preferred = modeName(shared?.activeMode);
    const first = await getMode(preferred);
    if (first) return first;
    for (const mode of ["normal", "rebel", "random", "recruit", "quick"]) {
      if (mode !== preferred) {
        const fallback = await getMode(mode);
        if (fallback) return fallback;
      }
    }
    return Data.merge("normal", null, shared);
  }
  async function seed(mode) {
    return Data.merge(modeName(mode), null, await getShared());
  }
  async function getManual(slot) {
    return read(`${MANUAL_PREFIX}${slot}`);
  }
  async function withShared(data) {
    return data ? Data.merge(modeName(data.mode), data, await getShared()) : null;
  }
  function schedule(state, onError, immediate) {
    const mode = modeName(state.mode);
    if (pending && pending.mode !== mode) drain();
    if (!pending) pendingSince = Date.now();
    pending = {
      mode,
      modeData: Data.packMode(state),
      sharedData: Data.packShared(state),
      onError,
    };
    const promise = new Promise((resolve) => waiters.push(resolve));
    if (timer) clearTimeout(timer);
    if (immediate) drain();
    else {
      const now = Date.now();
      const runAt = Math.min(pendingSince + MAX_WAIT, Math.max(now + QUEUE_DELAY, lastDrainAt + MIN_WRITE_GAP));
      timer = setTimeout(drain, Math.max(0, runAt - now));
    }
    return promise;
  }
  function drain() {
    if (timer) clearTimeout(timer);
    timer = null;
    if (!pending) return chain;
    const job = pending;
    const batch = waiters;
    pending = null;
    pendingSince = 0;
    waiters = [];
    chain = chain.then(async () => {
      try {
        await writeChanged(MODE_KEYS[job.mode], job.modeData);
        await writeChanged(SHARED_KEY, job.sharedData);
        lastDrainAt = Date.now();
        failures = 0;
        batch.forEach((resolve) => resolve(true));
      } catch (err) {
        failures += 1;
        console.warn("save queue failed:", err.message);
        job.onError?.(failures >= 2 ? "自动存档连续失败，请稍后重试" : "存档写入失败，请稍后重试");
        batch.forEach((resolve) => resolve(false));
      }
    });
    return chain;
  }
  async function writeChanged(key, data) {
    const comparable = { ...data };
    delete comparable.savedAt;
    const fingerprint = JSON.stringify(comparable);
    if (fingerprints.get(key) === fingerprint) return;
    await write(key, data);
    fingerprints.set(key, fingerprint);
  }
  function queue(state, onError) {
    return schedule(state, onError, false);
  }
  function flush(state, onError) {
    return schedule(state, onError, true);
  }
  async function putManual(state, slot) {
    await drain();
    let ok = true;
    const task = chain.then(() => write(`${MANUAL_PREFIX}${slot}`, Data.packMode(state)));
    chain = task.catch((err) => {
      ok = false;
      console.warn("manual save failed:", err.message);
    });
    await chain;
    return ok;
  }
  function describe(data) {
    if (!data?.board?.length && !data?.coreSeal) return "空存档";
    const time = data.savedAt ? new Date(data.savedAt).toLocaleString("zh-CN", { hour12: false }) : "未知时间";
    return `保存时间 ${time} · 第 ${data.level || 1} 关 · ${data.score || 0} 积分`;
  }
  async function clearMode(mode) {
    await drain();
    await chain;
    const key = MODE_KEYS[modeName(mode)];
    await remove(key);
    fingerprints.delete(key);
  }
  async function retry(key) {
    Backend.reset(key);
    if (key) {
      return read(key, true);
    }
    migrated = false;
    return getInitial();
  }
  return {
    clearMode, describe, flush, getInitial, getManual, getMode, getShared,
    put: flush, putManual, queue, retry, seed, status: Backend.status, withShared,
  };
})();


/* render.js */
window.XQ = window.XQ || {};
window.XQ.Render=(() => {
  const C = window.XQ.Config; const $ = (id) => document.getElementById(id); const els = {}; let currentState = null; let currentHandlers = {};
  function init() {
    ["board", "gameTitle", "levelText", "scoreText", "multText", "itemText", "tempoText",
      "turnText", "tipText", "banner", "rewardModal", "rewardCards",
      "rewardIntro", "nextBtn", "hintBtn", "undoBtn", "shopBtn", "talentBtn",
      "itemsBtn", "moreBtn", "restartBtn", "saveBtn", "loadBtn", "settingsBtn", "moveRecordBtn", "leaveBtn", "giveUpBtn", "modalCloseBtn"].forEach((id) => { els[id] = $(id); });
    els.rewardMoveRecordBtn = $("rewardMoveRecordBtn"); els.modalCloseBtn.addEventListener("click", hideRewards); els.rewardMoveRecordBtn.addEventListener("click", () => window.XQ.MoveRecord.open(currentState));
    els.levelText.addEventListener("click", () => window.XQ.LevelDetail?.open?.(currentState)); els.levelText.title = "点击查看本关详情"; els.levelText.style.cursor = "pointer";
  }
  function pos(el, x, y) { el.style.left = `${5.5 + (x / 8) * 89}%`; el.style.top = `${5 + (y / 9) * 90}%`; }
  function drawBoard(state, handlers) {
    els.board.classList.toggle("river-flooded", Boolean(state.riverFlooded)); els.board.innerHTML = state.riverFlooded ? '<div class="river flooded"><span>楚河　　汉界</span><small>跨河先停线</small></div>' : '<div class="river"><span>楚河　　汉界</span></div>';
    window.XQ.BoardPreview.draw(state, els.board, pos);
    state.legal.forEach((m) => {
      const cell = document.createElement("button");
      cell.className = "cell hint";
      cell.disabled = Boolean(handlers.busy);
      pos(cell, m.x, m.y);
      cell.setAttribute("aria-label", `落子 ${m.x},${m.y}`);
      cell.addEventListener("click", () => handlers.move(m.x, m.y));
      els.board.appendChild(cell);
    });
    (state.fieldItems || []).forEach((item) => {
      const token = document.createElement("div");
      token.className = "pickup";
      token.textContent = item.mark;
      token.title = item.name;
      pos(token, item.x, item.y);
      els.board.appendChild(token);
    });
    (state.collapseTiles || []).forEach((tile) => {
      const mark = document.createElement("div");
      mark.className = "collapse-tile";
      mark.textContent = "崩";
      mark.title = "崩落位";
      pos(mark, tile.x, tile.y);
      els.board.appendChild(mark);
    });
    window.XQ.Charm?.draw?.(state, els.board, pos); window.XQ.Incense?.draw?.(state, els.board, pos);
    state.board.forEach((p) => {
      const cell = document.createElement("button");
      cell.className = "cell";
      cell.disabled = Boolean(handlers.busy);
      pos(cell, p.x, p.y);
      cell.addEventListener("click", () => handlers.piece(p.id));
      const piece = document.createElement("span");
      piece.className = `piece ${p.side === "b" ? "black" : p.side === "n" ? "neutral" : "red"}`;
      piece.dataset.pieceId = p.id; piece.classList.add(`piece-type-${p.type}`);
      const linked = window.XQ.LinkedBranches?.pairFor?.(state, p.id); if (linked) { piece.classList.add("linked-branch", `linked-branch-${linked.color}`); piece.dataset.linkedMarker = linked.marker; }
      if (state.selected === p.id) piece.classList.add("selected");
      if (window.XQ.BoardPreview.selected(state, p.id)) piece.classList.add("enemy-selected");
      if (state.lastMove && state.lastMove.id === p.id) piece.classList.add("last"); if (p.musicControlled) piece.classList.add("music-controlled"); if (window.XQ.Incense?.covers?.(state, p.x, p.y)) piece.classList.add("incense-covered");
      if (p.type === "K" && window.XQ.Rules.inCheck(state.board, p.side, state)) piece.classList.add("under-check");
      if ((p.type === "K" && hasKingGuard(state, p.side)) || p.id === state.enemyDivine?.targetId) piece.classList.add("guarded");
      const turtle = p.side === "b" ? state.enemyTurtle : p.side === "r" ? state.playerTurtle : null; if (p.type === "K" && turtle?.active) piece.classList.add("turtle-ready"); if (p.type === "K" && turtle?.shield > 0) piece.classList.add("turtle-shield");
      piece.textContent = C.labels[p.side]?.[p.type] || p.type;
      cell.appendChild(piece);
      els.board.appendChild(cell);
    });
  }
  function update(state, handlers) {
    currentState = state; currentHandlers = handlers; window.XQ.AudioManager?.bindState?.(state);
    const busy = Boolean(handlers.busy); const placing = window.XQ.RandomPlacement.active(state);
    document.querySelector(".command-panel").classList.toggle("placing", placing);
    drawBoard(state, handlers);
    els.gameTitle.textContent = `兴军讨曌-${({ normal: "常规模式", rebel: "义军破敌", random: "随机棋模式", recruit: "招兵买马模式", quick: "快速模式" })[state.mode] || "常规模式"}`;
    els.levelText.textContent = window.XQ.Levels.levelName(state);
    els.scoreText.textContent = String(state.score);
    const mult = state.view?.scoreMult || state.scoreMult || 1;
    els.multText.textContent = `x${mult.toFixed(2)}`;
    els.itemText.textContent = String(state.items.length);
    const max = Math.max((window.XQ.Levels.hasTempo(state) ? 2 : 1) + (state.playerBonusMoves || 0), state.playerMovesLeft || 1);
    els.tempoText.textContent = `${Math.min(state.playerMovesLeft || max, max)}/${max}`;
    els.turnText.textContent = state.message;
    els.tipText.textContent = makeTip(state);
    const canSkip = ["normal", "random", "recruit"].includes(state.mode) && state.phase === "play" && state.side === "r" && state.level <= 5;
    els.nextBtn.textContent = canSkip ? "跳过本关" : "下一关";
    els.nextBtn.classList.toggle("hidden", state.phase !== "rewarded" && !canSkip);
    els.nextBtn.disabled = busy || Boolean(state.pendingRevive);
    els.restartBtn.disabled = busy || placing;
    els.hintBtn.textContent = `提示(-${state.view?.hintCost || 0})`;
    els.hintBtn.disabled = busy || state.phase !== "play" || state.side !== "r";
    els.undoBtn.disabled = busy || !state.history.length || state.phase !== "play";
    els.shopBtn.disabled = busy || state.phase !== "play" || state.side !== "r";
    els.itemsBtn.disabled = busy;
    els.moreBtn.disabled = busy;
    els.talentBtn.disabled = busy;
    els.saveBtn.disabled = busy || state.side !== "r" || state.mode === "quick";
    els.loadBtn.disabled = busy;
    els.settingsBtn.disabled = busy; els.leaveBtn.disabled = busy || state.side !== "r";
    els.moveRecordBtn.disabled = busy;
    els.giveUpBtn.disabled = busy || state.phase !== "play";
    window.XQ.RandomPlacement.render(state);
  }
  function hasKingGuard(state, side) {
    return side === "b" ? Boolean(state.enemyTraits?.kingGuard) : (state.items || []).some((item) => item.id === "kingGuard");
  }
  function makeTip(state) {
    if (window.XQ.RandomPlacement.active(state)) return "选择待布置棋子，再点击己方半场空位；点击已摆棋子可撤回。";
    if (state.mode === "quick") return "击败黑将赢得本局，胜利固定奖励 1000 积分。";
    if (state.phase === "won") return "选择奖励后进入下一关。";
    if (state.meteorPenaltyPending) return "未吃子，飒沓流星失效，黑方即将行动三次。";
    if (state.meteorActive) return "飒沓流星生效：吃黑子可续行；首次未吃子将让黑方连续行动 3 步。";
    if (state.meteorPending) return "飒沓流星已购入，将在红方恢复行动时生效。";
    if (state.charmMakeupCharges > 0) return `媚妆已备：接下来 ${state.charmMakeupCharges} 枚被吃红子会令吃子者转投红方。`;
    if (state.riverFlooded) return "河界汛期：跨河前先停到河内线，从河内线出发不受限制。";
    if ((state.playerMovesLeft || 1) > (window.XQ.Levels.hasTempo(state) ? 2 : 1)) return `卧薪尝胆生效：本回合可行动 ${state.playerMovesLeft} 次。`;
    if (window.XQ.Levels.hasTempo(state)) return "双行动生效：走满两步后敌人才行动。";
    if (state.items.length >= 25) return "已累计 25 个道具，双步虎符效果取消。";
    return "击败黑将，继续积累道具和积分。";
  }
  function banner(text) {
    els.banner.textContent = text;
    els.banner.classList.remove("hidden");
    setTimeout(() => els.banner.classList.add("hidden"), 1300);
  }
  function rewards(cards, onPick, intro) { showCards("战斗胜利", intro || "选择一个奖励继续进军。", cards, onPick, "reward"); }
  function showCards(title, intro, cards, onPick, mode) {
    els.rewardModal.dataset.view = title === "道具图鉴" ? "codex" : "";
    document.querySelector(".reward-box h2").textContent = title;
    els.rewardIntro.textContent = intro;
    els.modalCloseBtn.classList.toggle("hidden", mode === "reward" || mode === "locked"); const recordView = mode === "reward"
      || ["战败结算", "快速模式胜利", "快速模式结束"].includes(title);
    els.rewardMoveRecordBtn.classList.toggle("hidden", !recordView);
    els.rewardCards.innerHTML = "";
    let busy = false;
    const runPick = async (card) => {
      if (busy) return;
      busy = true;
      els.rewardCards.setAttribute("aria-busy", "true");
      els.rewardCards.querySelectorAll("button").forEach((button) => { button.disabled = true; });
      try {
        if (currentState) await window.XQ.StateOps.transact(currentState, () => onPick(card));
        else await onPick(card);
      } catch (err) {
        if (currentState) update(currentState, currentHandlers);
        console.error("card action failed:", err?.code || "unknown", err?.message, err?.stack || "");
        els.rewardModal.classList.remove("hidden");
        banner(window.XQ.StateOps.actionError(err, "卡牌操作失败，已撤销本次修改，请重试"));
      } finally {
        busy = false;
        els.rewardCards.removeAttribute("aria-busy");
        els.rewardCards.querySelectorAll("button").forEach((button) => { button.disabled = false; });
      }
    };
    cards.forEach((card, index) => {
      const btn = document.createElement(card.actions?.length ? "div" : "button");
      if (btn.tagName === "BUTTON") { btn.type = "button"; btn.disabled = mode === "view"; }
      btn.className = `reward-card rarity-${card.rarity || "white"}`;
      if (btn.tagName === "DIV") {
        btn.tabIndex = 0;
        btn.setAttribute("role", "button");
        btn.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          runPick(card);
        });
      }
      const price = label(card, mode);
      const title = document.createElement("strong");
      title.className = "reward-title";
      const name = document.createElement("span");
      name.textContent = `${index + 1}. ${cardName(card, mode)}`;
      title.appendChild(name);
      (card.actions || []).forEach((action) => {
        const actionBtn = document.createElement("button");
        actionBtn.type = "button";
        actionBtn.className = "card-action";
        actionBtn.textContent = action.label;
        actionBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          runPick({ ...card, action: action.id });
        });
        title.appendChild(actionBtn);
      });
      const text = document.createElement("span");
      text.textContent = `${price}${card.text}`;
      btn.append(title, text);
      btn.addEventListener("click", () => runPick(card));
      els.rewardCards.appendChild(btn);
    });
    window.XQ.AudioManager?.showSettings?.(title === "设置"); els.rewardModal.classList.remove("hidden");
  }
  function label(card, mode) {
    if (mode === "reward") return "";
    if (mode === "shop") return `${card.cost} 积分 · `;
    if (mode === "save" || mode === "locked") return "";
    return card.cost ? `${card.cost} 积分 · ` : "";
  }
  function cardName(card, mode) {
    const tags = [];
    if (C.consumableIds.includes(card.id)) tags.push("消耗品");
    if (["cannon", "banner", "oracle"].includes(card.id)) tags.push("可叠加");
    return tags.length ? `${card.name}（${tags.join("，")}）` : card.name;
  }
  function hideRewards() { window.XQ.AudioManager?.showSettings?.(false); els.rewardModal.classList.add("hidden"); }
  return { banner, hideRewards, init, rewards, showCards, update };
})();


/* leveldetail.js */
window.XQ = window.XQ || {};

window.XQ.LevelDetail=(() => {
  const C = window.XQ.Config;
  const itemEffects = {
    guard: ["铁壁营", "黑方吃子评分降低，行棋更保守。"],
    elephantRiver: ["象过河", "黑象可过河，仍走田字且受象眼阻挡。"],
    elephantStep: ["象位移", "黑象除走田字外，可横竖移动一格。"],
    advisorFree: ["士出宫", "黑士可离开九宫，在黑方半场斜走一格。"],
    advisorRiver: ["士过河", "黑士可过河，并可横竖斜一格移动。"],
    advisorStride: ["仕途通达", "黑士可横竖斜移动两格，且可越过中间棋子。"],
    kingFree: ["将帅出宫", "黑将可离开九宫，在黑方半场横竖一格移动。"],
    kingGuard: ["护驾符", "黑将首次被吃时免疫，并反杀吃将的棋子。"],
    kingRiver: ["将帅过河", "黑将可过河，并在全盘横竖移动一格。"],
    turtleShell: ["龟壳", "黑将可触发龟缩避险。"],
    rookPhoenix: ["车化凤辇", "黑车可沿斜线移动最多 4 格，仍不能越子。"],
    strongPawn: ["强兵", "黑卒过河前也可横向移动。"],
    elitePawn: ["精兵", "黑卒可斜走一格。"],
    horseStep: ["马位移", "黑马除走日字外，可横竖移动一格。"],
    horseLeap: ["马腾跃", "黑马走日字时不再受蹩马腿限制。"],
    horseRun: ["马驰骋", "黑马可额外横竖移动两格。"],
    horseFly: ["马踏飞燕", "黑马可额外横竖移动三格。"],
    cannon: ["神机炮", "黑方已夺取红炮相关道具。"],
  };

  function open(state) {
    if (!state) return;
    window.XQ.Render.showCards("本关详情", window.XQ.Levels.levelName(state), cards(state), () => {}, "save");
  }

  function cards(state) {
    const list = mechanismCards(state).concat(enemyItemCards(state));
    return list.length ? list : [{ id: "normal", name: "普通关卡", rarity: "white", text: "本关无额外特殊机制，击败黑将即可过关。" }];
  }

  function mechanismCards(state) {
    const list = [];
    if (!window.XQ.Levels.isFullEnemy(state.level)) {
      const left = Math.max(0, C.blackAddOrder.length - Math.max(0, (state.level || 1) - 1));
      list.push(card("formation", "敌军残阵", "white", `黑方未满编，仍缺 ${left} 枚棋子。${["normal", "random", "recruit"].includes(state.mode) ? "前 5 关可直接跳过本关。" : "当前模式不可跳关。"}`));
    }
    if (state.hardNotice) list.push(card("notice", "本关特殊机制", "purple", state.hardNotice));
    if (state.dropRefreshLocked && !state.enemyMomentum?.active) list.push(card("drop-lock", "封锁补给", "purple", "本关不再刷新局内可拾取道具。"));
    if (state.suppressedItemUids?.length) list.push(card("suppress", "敌军压制", "red", suppressedText(state)));
    if (state.riverFlooded) list.push(card("river-flood", "河界汛期", "gold", "双方棋子跨河前必须先停到河内线；从河内线开始的行动不受限制。"));
    if (state.enemyTurtle) list.push(card("turtle", "组合技：龟缩", "red", turtleText(state)));
    if (state.enemyRabbit) list.push(card("rabbit", "组合技：兔阵", "gold", `黑方棋子被吃时，若后方一格为空，则后退避开吃子，触发后冷却 4 回合。当前状态：${cooldown(state.enemyRabbit.cooldown)}。`));
    if (state.enemyDivine) list.push(card("divine", "组合技：神选", "red", "黑方每回合随机一枚棋子获得护驾符，一回合内首次被吃时免疫并反杀。"));
    if (state.enemyCollapse) list.push(card("collapse", "组合技：崩盘", "purple", "开局和后续回合生成崩落位；红方棋子踏入会被吞没，崩落位持续 2 回合。"));
    if (state.enemyFish) list.push(card("fish", "组合技：鱼水", "green", `开局生成草；之后每 5 次红方行动追加生成，草会阻隔行棋且双方均可吃。距离下次生成：${periodic(state.enemyFish.turns, 5)} 回合。`));
    if (state.enemyEunuch) list.push(card("eunuch", "组合技：宦潮", "red", "五卒与两象化仕；黑方持有仕出宫、仕过河、仕途通达。"));
    if (state.enemyCharm?.blade) list.push(card("charm-blade", "组合技：媚骨蚀锋", "red", `媚阵生效；每个红方回合刷新 3 个持续一回合的魅惑格。红帅不能进入魅惑格；其他红子每次进入后倒戈，黑方仅夺取 1 个对应的非消耗品道具。当前魅惑格：${(state.charmTiles || []).length} 个。`));
    else if (state.enemyCharm?.formation) list.push(card("charm-formation", "组合技：媚阵", "red", "黑方吃掉红子后，在吃子棋子后方空位复制同兵种黑子，并获得对应棋子道具；红方保留原道具。"));
    if (state.enemyHorse) list.push(card("horse", `组合技：纵马${state.enemyHorse}`, "gold", `黑方马系列道具升级，并将 ${state.enemyHorse + 1} 个卒改为马。`));
    if (state.enemyCorruption?.active) list.push(card("corruption", "组合技：染心", "red", `红方吃子后会倒戈并交出对应道具，触发后冷却 3 回合。当前状态：${cooldown(state.enemyCorruption.cooldown)}。`));
    if (state.enemyMusic?.active) list.push(card("music", "组合技：迷音", "red", `每 3 回合随机控制红方非帅棋子一回合，受控棋子保留红方道具加成；第 6 回合起每次控制两枚。距离下次发动：${periodic(state.enemyMusic.turns, 3)} 回合。`));
    if (state.enemyReinforcement?.active) list.push(card("reinforcement", "组合技：增援", "red", `第 3 回合起每 2 回合随机增兵，数量从 1 枚逐步提升至 3 枚，兵种质量同步升级且皇后权重最低。当前第 ${state.enemyReinforcement.waves || 0} 波，距离下次增援：${reinforcementWait(state.enemyReinforcement.turns)} 回合。`));
    if (state.enemyIncense?.active) list.push(card("incense", "组合技：香阵", "red", `开局及每 2 回合生成逐步扩张的香阵，次回合保留一半；阵内红子不能移动，阵内黑子不能被吃。下回合：${(state.enemyIncense.turns || 0) % 2 === 0 ? "保留一半" : "扩张香阵"}。`));
    if (state.enemyMomentum) list.push(card("momentum", "盈不可久", "red", "红方每吃掉一枚黑方棋子，黑方下一次行动额外走 1 步，最多累计 2 步。"));
    if (state.enemyKarma?.active) list.push(card("karma", "组合技：业障", "red", karmaText(state)));
    if (state.enemyLinkedBranches?.active) list.push(card("linked-branches", state.enemyLinkedBranches.pairLimit ? "机制：连枝" : "组合技：连枝", "red", linkedText(state)));
    if (state.enemySacrifice?.active) list.push(card("sacrifice", "组合技：生祭", "red", `黑方每次吃子均获得随机道具，且黑子可以吃掉己方非将棋子；每 2 回合随机获得一枚棋子。距离下次增兵：${periodic(state.enemySacrifice.turns, 2)} 回合。`));
    return list;
  }

  function cooldown(value) {
    const turns = Math.max(0, Number(value) || 0);
    return turns > 0 ? `冷却 ${turns} 回合` : "就绪";
  }

  function periodic(value, interval) {
    const turns = Math.max(0, Number(value) || 0);
    return interval - (turns % interval);
  }

  function reinforcementWait(value) {
    const turns = Math.max(0, Number(value) || 0);
    if (turns < 3) return 3 - turns;
    return (turns - 3) % 2 === 0 ? 2 : 1;
  }

  function karmaText(state) {
    const records = Object.entries(state.enemyKarma.pieces || {}).filter(([, data]) => data.captures > 0);
    const detail = records.map(([id, data]) => {
      const piece = state.board.find((entry) => entry.id === id);
      const name = piece ? C.labels.r[piece.type] || piece.type : id;
      const blocked = data.blockedTurn === state.enemyKarma.turn ? "，本回合封锁" : "";
      return `${name} ${data.captures} 枚${blocked}`;
    }).join("；");
    return `同一红子累计吃 2 子后下一回合无法行动；累计吃 3 子随机失去一个非消耗品；累计吃 4 子按被黑方吃掉结算。${detail ? `当前：${detail}。` : "当前尚无红子吃子。"} `;
  }

  function linkedText(state) {
    const pairs = (state.enemyLinkedBranches.pairs || []).map((pair) => {
      const alive = (id) => state.board.some((piece) => piece.id === id);
      const status = pair.broken ? "俱断" : `${alive(pair.aId) ? "存" : "亡"}/${alive(pair.bId) ? "存" : "亡"}`;
      return `${pair.marker}（${colorName(pair.color)}）${status}`;
    }).join("；");
    const pairCount = Math.min(3, Math.max(1, Number(state.enemyLinkedBranches.pairLimit) || (state.enemyLinkedBranches.pairs || []).length || 3));
    return `黑方随机${pairCount}对棋子结为连枝；一子被吃后，另一子继承其移动范围；一对俱亡时黑方随机失去一个道具。${pairs ? `当前：${pairs}。` : ""}`;
  }

  function colorName(color) {
    return ({ cyan: "青", magenta: "绯", lime: "翠" })[color] || color;
  }

  function turtleText(state) {
    const turtle = state.enemyTurtle;
    const status = turtle.shield > 0
      ? `无敌剩余 ${turtle.shield} 回合；再次触发${cooldown(turtle.cooldown)}`
      : cooldown(turtle.cooldown);
    return `黑将被吃时取消本次吃将，进入 3 回合无敌，9 回合后可再次龟缩。当前状态：${status}。`;
  }

  function enemyItemCards(state) {
    const ids = Object.keys(state.enemyTraits || {}).filter((id) => state.enemyTraits[id] && itemEffects[id]);
    if (!ids.length) return [card("no-items", "黑方持有道具", "white", "本关黑方没有额外道具效果。")];
    return ids.map((id) => card(`enemy-${id}`, `黑方道具：${itemEffects[id][0]}`, rarity(id), itemEffects[id][1]));
  }

  function suppressedText(state) {
    const names = (state.items || []).filter((item) => state.suppressedItemUids.includes(item.uid)).map((item) => item.name);
    return names.length ? `本关屏蔽玩家道具：${names.join("、")}。` : `本关屏蔽 ${state.suppressedItemUids.length} 个玩家道具效果。`;
  }

  function rarity(id) {
    if (["kingGuard", "kingFree", "kingRiver", "turtleShell", "advisorStride", "horseRun", "horseFly", "rookPhoenix"].includes(id)) return "red";
    if (["elitePawn", "advisorRiver", "horseLeap"].includes(id)) return "gold";
    if (["elephantRiver", "strongPawn", "horseStep"].includes(id)) return "purple";
    return "green";
  }

  function card(id, name, rarityName, text) {
    return { id, name, rarity: rarityName, text };
  }

  return { open };
})();


/* revive.js */
window.XQ = window.XQ || {};

window.XQ.Revive=(() => {
  const C = window.XQ.Config;
  const UI = window.XQ.Render;

  async function start(state, render) {
    const dead = state.capturedRed || [];
    if (!dead.length) return UI.banner("暂无可取回的己方棋子");
    const cards = dead.map((piece) => ({
      id: piece.capturedUid,
      name: `${C.labels.r[piece.type]} 归阵`,
      rarity: piece.type === "R" || piece.type === "C" ? "gold" : "purple",
      text: "放在己方半场空格不消耗行动；若落在可拾取道具上会立即触发，并消耗一次红方行动。",
    }));
    UI.showCards("归阵令", "选择一个被吃掉的己方棋子。空格归阵不消耗行动，拾取道具时才消耗行动。", cards, async (card) => {
      state.pendingRevive = { capturedUid: card.id };
      state.selected = null;
      state.legal = cells(state);
      state.message = "选择己方半场空位放置";
      UI.hideRewards();
      render();
    }, "locked");
  }

  async function place(state, x, y) {
    if (!state.pendingRevive || !state.legal.some((cell) => cell.x === x && cell.y === y)) return false;
    const index = state.capturedRed.findIndex((piece) => piece.capturedUid === state.pendingRevive.capturedUid);
    if (index < 0) return false;
    const [piece] = state.capturedRed.splice(index, 1);
    const pickedUp = (state.fieldItems || []).some((item) => item.x === x && item.y === y);
    state.board.push({ ...piece, x, y });
    state.pendingRevive = null;
    state.legal = [];
    state.lastActionCaptured = false;
    const label = C.labels.r[piece.type];
    const pickupText = await window.XQ.Drops.collect(state, piece.id, "r");
    state.message = pickedUp ? `${label}归阵并拾取道具` : `${label}已归阵，行动次数不变`;
    return {
      consumesAction: pickedUp,
      text: pickedUp ? `${label}已归阵；${pickupText || "拾取道具"}` : state.message,
    };
  }

  function cells(state) {
    const spots = [];
    for (let y = 5; y < 10; y += 1) for (let x = 0; x < 9; x += 1) {
      if (!window.XQ.Rules.at(state.board, x, y)) spots.push({ x, y });
    }
    return spots;
  }

  return { place, start };
})();


/* actions.js */
window.XQ = window.XQ || {};

window.XQ.Actions=(() => {
  const UI = window.XQ.Render;
  const C = window.XQ.Config;
  const Ops = window.XQ.StateOps;
  const labels = C.labels.b;

  function tempoNotice(state, render, save, next) {
    if (state.mode !== "normal") {
      state.tempoNotice = false;
      window.XQ.Mode.stripTempo(state);
      return false;
    }
    if (!state.tempoNotice) return false;
    UI.showCards("双步虎符", "神秘人相助：能来到这里，勇气可嘉，且让我助你一臂之力", [{
      id: "ok",
      name: "知道了",
      rarity: "red",
      text: "每回合红方可走两步，累计 25 道具后失效。",
    }, { id: "no", name: "我不要", rarity: "white", text: "拒绝本次赠送的双步虎符。" }], async (card) => {
      if (card.id === "no") {
        state.items = state.items.filter((item) => item.id !== "tempo");
        state.tempoDeclined = true;
        state.tempoNotice = false;
      } else {
        state.tempoNotice = false;
      }
      UI.hideRewards();
      await save();
      render();
      next?.();
    }, "locked");
    return true;
  }

  function startDestroy(state, render, save) {
    state.pendingDestroy = state.pendingDestroy || true;
    state.selected = null;
    state.legal = [];
    state.message = "选择一个敌方棋子消灭";
    render();
    save();
  }

  function startWeaken(state, render, save, card) {
    state.pendingWeaken = state.pendingWeaken || (card ? pending(card) : true);
    state.selected = null;
    state.legal = [];
    state.message = "选择敌方一个非将帅棋子变为卒";
    render();
    save();
  }

  function startMorph(state, render, save, card) {
    state.pendingMorph = state.pendingMorph || pending(card);
    state.selected = null;
    state.legal = [];
    state.message = `选择一枚红方非帅棋子改为${C.labels.r[card.targetType]}`;
    render();
    save();
  }

  function startDonate(state, render, save) {
    state.pendingDonate = state.pendingDonate || true;
    state.selected = null;
    state.legal = [];
    state.message = "选择己方非帅棋子赠予敌军";
    render();
    save();
  }

  async function destroy(state, piece) {
    if (!state.pendingDestroy) return null;
    if (piece.side !== "b") {
      UI.banner("请选择敌方棋子");
      return { done: true };
    }
    Ops.snapshot(state);
    state.board = state.board.filter((item) => item.id !== piece.id);
    state.pendingDestroy = false;
    const linked = window.XQ.LinkedBranches?.onBlackCaptured?.(state, piece);
    state.message = [`已消灭${labels[piece.type]}`, linked].filter(Boolean).join("；");
    return { done: true, killed: true };
  }

  async function weaken(state, piece) {
    if (!state.pendingWeaken) return null;
    if (piece.side !== "b" || piece.type === "K" || piece.type === "P") {
      UI.banner("请选择敌方非将帅棋子");
      return { done: true };
    }
    const data = typeof state.pendingWeaken === "object" ? state.pendingWeaken : {};
    const cost = data.cost || 0;
    if (state.score < cost) {
      UI.banner("积分不足");
      return { done: true };
    }
    Ops.snapshot(state);
    state.score -= cost;
    piece.type = "P";
    state.pendingWeaken = false;
    state.message = "已将敌方棋子变为卒";
    return { done: true, changed: true };
  }

  async function morph(state, piece) {
    if (!state.pendingMorph) return null;
    const data = typeof state.pendingMorph === "string" ? { targetType: state.pendingMorph, cost: 0 } : state.pendingMorph;
    if (piece.side !== "r" || piece.type === "K") {
      UI.banner("请选择己方非帅棋子");
      return { done: true };
    }
    const cost = data.cost || 0;
    if (state.score < cost) {
      UI.banner("积分不足");
      return { done: true };
    }
    Ops.snapshot(state);
    state.score -= cost;
    piece.type = data.targetType;
    state.morphs[piece.id] = data.targetType;
    state.morphBought[data.targetType] = (state.morphBought[data.targetType] || 0) + 1;
    if (data.name) state.items.push({
      id: `morph-${data.targetType}`, uid: `m${Date.now()}${Math.random().toString(16).slice(2)}`,
      name: data.name, rarity: data.rarity, text: data.text, value: 1, level: state.level,
    });
    state.pendingMorph = null;
    state.message = `改制完成：${C.labels.r[data.targetType]}`;
    return { done: true, changed: true };
  }

  async function donate(state, piece) {
    if (!state.pendingDonate) return null;
    if (piece.side !== "r" || piece.type === "K") {
      UI.banner("请选择己方非帅棋子");
      return { done: true };
    }
    Ops.snapshot(state);
    const points = C.values[piece.type] || 0;
    piece.side = "b";
    state.score += points;
    state.pendingDonate = false;
    if (state.morphs) delete state.morphs[piece.id];
    state.message = `已赠予${C.labels.r[piece.type]}，积分 +${points}`;
    return { done: true, changed: true };
  }

  function pending(card) {
    return { targetType: card.targetType, cost: card.cost || 0, shopUid: card.shopUid, name: card.name, rarity: card.rarity, text: card.text };
  }

  function hardNotice(state, render, save, next, introShown = false) {
    if (!state.hardNotice) return false;
    if (!introShown && state.currentComboId && window.XQ.ComboIntro?.show(
      state.currentComboId,
      () => hardNotice(state, render, save, next, true),
    )) return true;
    UI.showCards("关卡机制", state.hardNotice, [{ id: "ok", name: "迎战", rarity: "purple", text: "已了解本关特殊规则。" }], async () => {
      state.hardNotice = "";
      UI.hideRewards();
      await save();
      render();
      next?.();
    }, "locked");
    return true;
  }

  function outerTempoNotice(state, render, save) {
    const t = state.talents || {};
    if (state.mode !== "normal") {
      t.outerTempoNotice = false;
      return false;
    }
    if (!t.outerTempoNotice) return false;
    UI.showCards("局外商店", "为降低难度，局外商店第一关时售卖双步道具，售价0积分", [{ id: "ok", name: "知道了", rarity: "red", text: "前往第一关局外天赋可购买。" }], async () => {
      t.outerTempoNotice = false;
      UI.hideRewards();
      await save();
      render();
    }, "locked");
    return true;
  }

  return { destroy, donate, hardNotice, morph, outerTempoNotice, startDestroy, startDonate, startMorph, startWeaken, tempoNotice, weaken };
})();


/* item-menu.js */
window.XQ = window.XQ || {};

window.XQ.ItemMenu=(() => {
  const modes = [
    { id: "acquired", label: "获得顺序" },
    { id: "consumable", label: "消耗品优先" },
    { id: "rarity", label: "稀有度" },
    { id: "blocked", label: "屏蔽优先" },
  ];
  let sortMode = "acquired";
  const directions = { acquired: "asc", consumable: "asc", rarity: "asc", blocked: "asc" };

  function sort(items, state, mode = sortMode, direction = directions[mode] || "asc") {
    const blocked = new Set(state.suppressedItemUids || []);
    const rarity = window.XQ.Config.rarityOrder || [];
    const factor = direction === "desc" ? -1 : 1;
    return items.map((item, index) => ({ item, index })).sort((left, right) => {
      if (mode === "rarity") {
        const rank = rarity.indexOf(right.item.rarity) - rarity.indexOf(left.item.rarity);
        if (rank) return rank * factor;
      }
      if (mode === "consumable") {
        const ids = window.XQ.Config.consumableIds || [];
        const priority = Number(ids.includes(right.item.id)) - Number(ids.includes(left.item.id));
        if (priority) return priority * factor;
      }
      if (mode === "blocked") {
        const priority = Number(blocked.has(right.item.uid)) - Number(blocked.has(left.item.uid));
        if (priority) return priority * factor;
      }
      return (left.index - right.index) * factor;
    }).map((entry) => entry.item);
  }

  function show(state, done, persist) {
    window.XQ.Items.normalize(state);
    const limit = state.talents?.retain || 0;
    const items = state.items.concat((state.talents.outerItems || []).map((item) => ({ ...item, outer: true })));
    const cards = items.length ? sort(items, state).map((item) => itemCard(state, item)) : [emptyCard()];
    const intro = limit ? `点击局内道具可预选保留，最多 ${limit} 个。` : "当前没有保留天赋。";
    window.XQ.Render.showCards("现有道具", intro, cards, (card) => pick(state, card, done, persist), "save");
    installControls(state, done, persist);
  }

  async function pick(state, card, done, persist) {
    if (card.action === "sell") return sell(state, card.uid, done, persist);
    if (!card.uid || card.outer) return;
    const toggled = window.XQ.StateOps.toggleKeep(state, card.uid);
    if (toggled !== true) return window.XQ.Render.banner(toggled);
    await persist(state);
    done();
    show(state, done, persist);
  }

  async function sell(state, uid, done, persist) {
    const gained = window.XQ.Items.sell(state, uid);
    if (!gained) return window.XQ.Render.banner("该道具当前无法出售");
    window.XQ.Render.banner(`出售成功，积分 +${gained}`);
    await persist(state);
    done();
    show(state, done, persist);
  }

  function itemCard(state, item) {
    const kept = state.keepUids?.includes(item.uid);
    const blocked = state.suppressedItemUids?.includes(item.uid);
    const activeOuter = state.mode === "rebel" && item.outer && item.uid === state.rebelOuterUid;
      const opening = window.XQ.RandomMode.is(state) && item.randomLocked;
      const randomOuter = window.XQ.RandomMode.is(state) && item.outer;
    const randomActive = randomOuter && ["banner", "cannon", "mult"].includes(item.id);
    const turtle = item.id === "turtleShell" && !blocked ? turtleStatus(state) : null;
    return {
      ...item,
      name: `${blocked ? "[屏蔽] " : ""}${turtle?.name || ""}${kept ? "[保留] " : ""}${opening ? "[初始] " : ""}${randomActive ? "[生效] " : randomOuter ? "[停用] " : activeOuter ? "[带入] " : item.outer ? "[局外] " : ""}${item.name}`,
      text: blocked ? `${item.text} 本关效果被屏蔽，暂不可出售。` : opening ? `${item.text} 本轮初始道具，不可出售。` : randomOuter && !randomActive ? `${item.text} 随机棋与招兵买马模式仅启用积分加成类局外道具。` : `${item.text}${turtle?.text || ""}${window.XQ.ConsumableState.status(item)}`,
      actions: blocked || opening || item.outer || item.id.startsWith("morph-") ? [] : [{ id: "sell", label: "出售" }],
    };
  }

  function turtleStatus(state) {
    const turtle = window.XQ.Turtle.sync(state);
    if (!turtle) return null;
    if (turtle.shield > 0) return { name: `[无敌 ${turtle.shield} / 冷却 ${turtle.cooldown}] `, text: ` 当前无敌剩余 ${turtle.shield} 回合，重新生效剩余 ${turtle.cooldown} 回合。` };
    if (turtle.cooldown > 0) return { name: `[冷却 ${turtle.cooldown}] `, text: ` 剩余冷却 ${turtle.cooldown} 回合。` };
    return { name: "[就绪] ", text: " 当前可触发。" };
  }

  function installControls(state, done, persist) {
    const cards = document.getElementById("rewardCards");
    const old = document.getElementById("itemSortControls");
    old?.remove();
    const controls = document.createElement("div");
    controls.id = "itemSortControls";
    controls.className = "item-sort-controls";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "道具排序");
    modes.forEach((mode) => {
      const button = document.createElement("button");
      const active = mode.id === sortMode;
      button.type = "button";
      button.textContent = `${mode.label}${active ? directions[mode.id] === "asc" ? " ↑" : " ↓" : ""}`;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
      button.addEventListener("click", () => {
        if (sortMode === mode.id) directions[mode.id] = directions[mode.id] === "asc" ? "desc" : "asc";
        else sortMode = mode.id;
        show(state, done, persist);
      });
      controls.appendChild(button);
    });
    cards.prepend(controls);
  }

  function emptyCard() {
    return { id: "empty", name: "暂无道具", rarity: "white", text: "继续过关或在商店购买道具。" };
  }

  return { show, sort };
})();


/* menus.js */
window.XQ = window.XQ || {};

window.XQ.Menus=(() => {
  const UI = window.XQ.Render;
  const Store = window.XQ.Storage;
  const Items = window.XQ.Items;
  const labels = window.XQ.Config.labels.r;

  async function persist(state) {
    const ok = await Store.flush(state, (message) => UI.banner(message));
    if (ok) return true;
    const error = new Error("关键进度写入失败");
    error.userMessage = "保存失败，已撤销本次卡牌操作，请稍后重试";
    throw error;
  }

  async function shop(state, done, activate) {
    window.XQ.ShopState.prepare(state);
    await persist(state);
    const pick = async (card) => {
        if (card.id === "refresh") {
          if (!window.XQ.ShopState.refresh(state)) return UI.banner("积分不足");
          await persist(state);
          done();
          draw();
          return;
        }
        if (card.id === "meteor" && !card.confirmed) {
          return window.XQ.Meteor.confirmPurchase(card, () => pick({ ...card, confirmed: true }), draw);
        }
        const purchase = window.XQ.ShopState.buy(state, card);
        if (!purchase.ok) return UI.banner(purchase.message);
        const bought = purchase.card;
        if (bought.id === "morph" || bought.id === "pawnSpell") {
          return prepareChange(state, bought, done, activate);
        }
        UI.hideRewards();
        UI.banner(`购入 ${bought.name}`);
        await persist(state);
        done();
        await activate?.(bought);
      };
    const draw = () => UI.showCards("局内商店", `当前积分 ${state.score}。可花积分刷新道具。`,
      (state.shop?.cards || []).concat(refreshCard(state)), pick, "shop");
    draw();
  }

  function refreshCard(state) {
    const free = state.freeRefreshes || 0;
    const cost = window.XQ.ShopState.refreshCost(state);
    return {
      id: "refresh",
      name: "刷新商店",
      rarity: "green",
      text: free > 0 && cost === 0 ? `本次 0 费刷新。免刷新券剩余 ${free} 次。` : "重新随机本次局内商店道具。",
      cost,
    };
  }

  async function prepareChange(state, card, done, activate) {
    if (state.score < card.cost) return UI.banner("积分不足");
    UI.hideRewards();
    UI.banner(card.id === "morph" ? `选择一枚红方棋子改为${labels[card.targetType]}` : "选择敌方非将帅棋子变为卒");
    await persist(state);
    done();
    await activate?.(card);
  }

  async function talent(state, done, options = {}) {
    const unfinished = options.mainMenu ? await unfinishedBattles() : [];
    const viewOnly = unfinished === null || unfinished.length > 0;
    const intro = viewOnly
      ? unfinished === null
        ? "未能确认是否存在未结束战局，当前仅可查看。请进入对应战局，点击“更多”→“局外天赋”购买；或等待存档恢复后重试。"
        : `检测到未结束战局：${unfinished.map(battleModeLabel).join("、")}。当前仅可查看。如需购买，请进入对应战局，点击“更多”→“局外天赋”；或等待所有战局结束。`
      : `当前积分 ${state.score}。局外道具按卡牌说明生效。`;
    const cards = [Items.talent(state)].concat(Items.outerCards(state.level, state));
    UI.showCards("局外天赋", intro, cards, viewOnly ? () => {} : async (card) => {
      const real = [Items.talent(state)].concat(Items.outerCards(state.level, state))
        .find((item) => item.id === card.id && item.name === card.name);
      if (!real) return UI.banner("天赋列表已变化，请重新打开");
      const bought = Items.buyTalent(state, real);
      if (bought !== true) return UI.banner(bought || "当前无法购买该天赋");
      UI.hideRewards();
      UI.banner(`解锁 ${real.name}`);
      await persist(state);
      await done?.();
    }, viewOnly ? "view" : "shop");
  }

  async function unfinishedBattles() {
    const modes = ["normal", "rebel", "random", "recruit", "quick"];
    try {
      const saves = await Promise.all(modes.map((mode) => Store.getMode(mode)));
      return modes.filter((_mode, index) => saves[index]?.battleInProgress);
    } catch (err) {
      console.error("unfinished battle check failed:", err?.code || "unknown", err?.message, err?.stack || "");
      return null;
    }
  }

  function showItems(state, done) {
    return window.XQ.ItemMenu.show(state, done, persist);
  }

  async function save(state) {
    const saves = await Promise.all([1, 2, 3].map((slot) => Store.getManual(slot)));
    const cards = [1, 2, 3].map((slot, index) => ({
      id: slot,
      name: `手动存档 ${slot}`,
      rarity: "green",
      text: `${Store.describe(saves[index])}。点击覆盖为第 ${state.level} 关、${state.score} 积分。`,
    }));
    UI.showCards("手动存档", "选择一个手动存档框写入。自动存档不会被覆盖。", cards, async (card) => {
      const ok = await Store.putManual(state, card.id);
      if (!ok) return UI.banner("手动存档本地备份失败，请稍后重试");
      UI.hideRewards();
      UI.banner(`已保存到手动存档 ${card.id}`);
    }, "save");
  }

  async function load(current, done) {
    const autos = await Promise.all([Store.getMode("normal"), Store.getMode("rebel"), Store.getMode("random"), Store.getMode("recruit")]);
    const saves = await Promise.all([1, 2, 3].map((slot) => Store.getManual(slot)));
    const cards = [
      { id: "normal", mode: "normal", name: "读取常规自动存档", rarity: "gold", text: Store.describe(autos[0]) },
      { id: "rebel", mode: "rebel", name: "读取义军自动存档", rarity: "red", text: Store.describe(autos[1]) },
      { id: "random", mode: "random", name: "读取随机棋自动存档", rarity: "purple", text: Store.describe(autos[2]) },
      { id: "recruit", mode: "recruit", name: "读取招兵买马自动存档", rarity: "gold", text: Store.describe(autos[3]) },
    ]
      .concat([1, 2, 3].map((slot, index) => ({ id: slot, name: `读取手动存档 ${slot}`, rarity: "green", text: Store.describe(saves[index]) })));
    UI.showCards("读取存档", "四种模式自动存档相互独立，手动存档仍可保存任一模式。", cards, async (card) => {
      if (card.mode) {
        const loaded = await Store.getMode(card.mode);
        if (!loaded) return UI.banner(`${modeLabel(card.mode)}自动存档为空`);
        replace(current, window.XQ.Levels.baseState(loaded));
      } else {
        const loaded = await Store.withShared(await Store.getManual(card.id));
        if (!loaded) return UI.banner(`手动存档 ${card.id} 为空`);
        replace(current, window.XQ.Levels.baseState(loaded));
      }
      UI.hideRewards();
      UI.banner(card.mode ? `已读取${modeLabel(card.mode)}自动存档` : `已读取手动存档 ${card.id}`);
      await done(current);
    }, "save");
  }

  function replace(target, source) {
    Object.keys(target).forEach((key) => delete target[key]);
    Object.assign(target, source);
  }

  function modeLabel(mode) {
    return mode === "rebel" ? "义军" : mode === "random" ? "随机棋" : mode === "recruit" ? "招兵买马" : mode === "quick" ? "快速" : "常规";
  }

  function battleModeLabel(mode) {
    return mode === "rebel" ? "义军破敌" : mode === "random" ? "随机棋模式" : mode === "recruit" ? "招兵买马模式" : mode === "quick" ? "快速模式" : "常规模式";
  }

  return { load, save, shop, showItems, talent };
})();


/* outcome.js */
window.XQ = window.XQ || {};

window.XQ.Outcome=(() => {
  function onlyKings(state) {
    const red = state.board.filter((p) => p.side === "r");
    return (state.board.length === 2 && state.board.every((p) => p.type === "K")) || (red.length === 1 && red[0].type === "K");
  }

  function redLocked(state) {
    const locked = !window.XQ.Rules.sideMoves(state.board, "r", state).length;
    if (locked && window.XQ.Defense.deferLockedKing(state, window.XQ.Rules)) return false;
    return locked;
  }

  function winText(state) {
    if (!state.board.some((piece) => piece.side === "b" && piece.type === "K")) return "斩将成功";
    if (!window.XQ.Rules.sideMoves(state.board, "b", state).length) return "黑方无合法走法";
    return "";
  }

  function settleWin(state, text) {
    const resultText = winText(state);
    if (!resultText) throw new Error("胜利条件未满足");
    if (window.XQ.QuickMode.is(state)) {
      state.message = text || resultText;
      return window.XQ.QuickMode.settleWin(state);
    }
    window.XQ.Levels.settle(state);
    state.phase = "won";
    state.message = text || resultText;
    let milestones = [];
    if (state.level === 15) {
      milestones = window.XQ.Progression.finishRun(state);
      milestones.push(...window.XQ.Progression.unlockStoryGalleries(state));
      if (["normal", "rebel", "random", "recruit"].includes(state.mode)) state.slotUsePending = true;
    }
    const unlocked = milestones.concat(window.XQ.Progression.unlockComboShop(state));
    const rewards = window.XQ.RandomMode?.is?.(state) ? window.XQ.RandomMode.reward(state) : window.XQ.Items.roll(state.level, state);
    state.pendingRewards = rewards;
    return { rewards, unlocked };
  }

  function applyReward(state, card) {
    const real = (state.pendingRewards || []).find((item) => item.id === card.id && item.name === card.name);
    if (!real) throw new Error("奖励卡校验失败");
    window.XQ.Items.apply(state, real);
    window.XQ.MoveRecord?.event?.(state, `获得过关奖励：${real.name}`, "item");
    state.phase = "rewarded";
    state.pendingRewards = [];
    const slotUse = state.slotUsePending;
    if (slotUse) {
      window.XQ.Progression.grantSlotUse(state);
      state.slotUsePending = false;
      window.XQ.MoveRecord?.event?.(state, "征程结算完成：私库搜寻次数 +1", "mechanism");
    }
    state.message = real.points ? `获得 ${real.name}，积分 +${real.points}` : `获得 ${real.name}`;
    if (slotUse) state.message += "；征程结算完成，私库搜寻次数 +1";
    return real;
  }

  return { applyReward, onlyKings, redLocked, settleWin, winText };
})();


/* runend.js */
window.XQ = window.XQ || {};

window.XQ.RunEnd=(() => {
  const UI = window.XQ.Render;
  const Store = window.XQ.Storage;

  async function persist(state, userMessage) {
    const ok = await Store.flush(state, (message) => UI.banner(message));
    if (ok) return true;
    const error = new Error("战败进度写入失败");
    error.userMessage = userMessage;
    throw error;
  }

  async function fail(state, restart) {
    const unlocked = window.XQ.Progression.failRun(state);
    await persist(state, "战败进度保存失败，已恢复到结算前状态，请稍后重试");
    if (shouldShowEarlyStory(state)) await window.XQ.CaptureStory.showRebelEarlyDefeat();
    else if (shouldShowRebelStory(state)) await window.XQ.CaptureStory.showRebelDefeat();
    draw(state, unlocked, restart);
  }

  function shouldShowEarlyStory(state) {
    return state.mode === "rebel" && state.level <= 15 && state.settings?.rebelEarlyDefeatStory !== false;
  }

  function shouldShowRebelStory(state) {
    return state.mode === "rebel" && state.level > 15 && state.settings?.rebelDefeatStory !== false;
  }

  function draw(state, unlocked, restart) {
    const limit = state.talents?.retain || 0;
    const cards = limit > 0 && state.items.length ? state.items.map((item) => itemCard(state, item)) : [emptyCard(limit)];
    UI.showCards("战败结算", intro(state, unlocked, limit), cards, async (card) => {
      if (!card.uid || limit <= 0) return;
      const toggled = window.XQ.StateOps.toggleKeep(state, card.uid);
      if (toggled !== true) return UI.banner(toggled);
      await persist(state, "保存失败，已撤销本次保留选择，请稍后重试");
      draw(state, unlocked, restart);
    }, "locked");
    addConfirm(state, restart);
  }

  function intro(state, unlocked, limit) {
    const unlockText = unlocked.length ? unlocked.join("") : "本轮未解锁新内容。";
    const keep = limit > 0 ? `可通过传承锦囊保留 ${limit} 个局内道具。` : "尚未购买传承锦囊，无法保留局内道具。";
    return `止步第 ${state.level} 关，当前积分 ${state.score}。${unlockText}${keep}`;
  }

  function itemCard(state, item) {
    const kept = state.keepUids.includes(item.uid);
    return { ...item, name: `${kept ? "[保留] " : ""}${item.name}`, text: item.text };
  }

  function emptyCard(limit) {
    return { id: "none", name: limit > 0 ? "暂无可保留道具" : "未解锁传承锦囊", rarity: "white", text: "确认后将带着积分和局外解锁重新开始。" };
  }

  function addConfirm(state, restart) {
    const confirm = document.createElement("button");
    confirm.className = "reward-card rarity-red";
    confirm.innerHTML = `<strong>确认重开</strong><span>已选择 ${state.keepUids.length} 个保留道具，积分保留。</span>`;
    confirm.addEventListener("click", async () => {
      if (confirm.disabled) return;
      confirm.disabled = true;
      try {
        UI.hideRewards();
        await window.XQ.StateOps.transact(state, restart);
      } catch (err) {
        console.error("restart failed:", err?.code || "unknown", err?.message, err?.stack || "");
        document.getElementById("rewardModal")?.classList.remove("hidden");
        UI.banner(window.XQ.StateOps.actionError(err, "重开失败，已恢复战败结算状态，请重试"));
        confirm.disabled = false;
      }
    });
    document.getElementById("rewardCards").appendChild(confirm);
  }

  return { fail };
})();


/* slot-symbols.js */
window.XQ = window.XQ || {};

window.XQ.SlotSymbols=(() => {
  const iconSheets = {
    a: "./assets/generated/slot-icon-sheet-a.8c063f5e.webp",
    b: "./assets/generated/slot-icon-sheet-b.55c5b812.webp",
  };
  const iconImages = {
    armor: "./assets/generated/slot-icon-rebel-armor-detailed.a983c642.webp",
    diamond: "./assets/generated/slot-icon-blood-diamond-detailed.b5f18c6e.webp",
    miner: "./assets/generated/slot-icon-mining-pickaxe-detailed.f12585f6.webp",
    owl: "./assets/generated/slot-icon-owl-helmet-detailed.f7bcc120.webp",
    dagger: "./assets/generated/slot-icon-rebel-dagger-detailed.715f1b3c.webp",
    lockedChest: "./assets/generated/slot-icon-locked-chest-detailed.caab79c7.webp",
    ore: "./assets/generated/slot-icon-imperial-ore-detailed.f7f9137b.webp",
    safe: "./assets/generated/slot-icon-imperial-safe-detailed.11eee6d8.webp",
    dressingCase: "./assets/generated/slot-icon-imperial-dressing-case-detailed.7aacb9df.webp",
  };
  const symbols = {
    coin: { id: "coin", name: "军饷", icon: ["a", 0, 0], mark: "饷", value: 10, rarity: "common", text: "稳定产出积分。" },
    grain: { id: "grain", name: "行军干粮", icon: ["a", 1, 0], categories: ["军需品"], mark: "粮", value: 8, rarity: "common", text: "每个相邻义军长弓额外 +4。" },
    beer: { id: "beer", name: "军医药酒", icon: ["a", 2, 0], mark: "酒", value: 8, rarity: "common", text: "无额外效果，稳定补给。" },
    archer: { id: "archer", name: "义军长弓", icon: ["a", 3, 0], categories: ["军需品"], mark: "弓", value: 8, rarity: "common", text: "每个相邻行军干粮额外 +3。" },
    crab: { id: "crab", name: "河防蟹", icon: ["a", 0, 1], categories: ["军需品"], mark: "蟹", value: 9, rarity: "common", text: "同一行每有另一只河防蟹，双方各得 +3。" },
    crow: { id: "crow", name: "玄铁乌鸦雕像", icon: ["a", 1, 1], mark: "鸦", value: 14, rarity: "common", text: "开始第 4、8 轮搜寻时，物品池每存在一座，额外 -3 分。" },
    key: { id: "key", name: "私库钥匙", icon: ["a", 2, 1], mark: "钥", value: 10, rarity: "common", text: "每个相邻锁金箱或曌帝妆匣额外 +12。" },
    magpie: { id: "magpie", name: "鎏金喜鹊雕像", icon: ["a", 3, 1], mark: "鹊", value: 0, rarity: "common", text: "开始第 4、8 轮搜寻时，物品池每存在一座，额外 +9 分。" },
    owl: { id: "owl", name: "夜枭铁盔", icon: iconImages.owl, categories: ["军需品"], mark: "盔", value: 6, rarity: "common", text: "开始第 3、6、9 轮搜寻时，物品池每存在一顶，额外 +10 分。" },
    miner: { id: "miner", name: "开山矿镐", icon: iconImages.miner, categories: ["军需品"], mark: "镐", value: 9, rarity: "common", text: "每个相邻曌帝矿石额外 +8。" },
    ore: { id: "ore", name: "曌帝矿石", icon: iconImages.ore, mark: "石", value: 12, rarity: "common", text: "与相邻开山矿镐形成发掘联动。" },
    lockedChest: { id: "lockedChest", name: "锁金箱", icon: iconImages.lockedChest, mark: "锁", value: 15, rarity: "uncommon", text: "基础价值较高，适合与私库钥匙相邻。" },
    general: { id: "general", name: "义军帅旗", icon: ["a", 0, 3], categories: ["军需品"], mark: "旗", value: 18, rarity: "uncommon", text: "每个相邻军需品额外 +6。" },
    armor: { id: "armor", name: "义军铁甲", icon: iconImages.armor, categories: ["军需品"], mark: "甲", value: 20, rarity: "uncommon", text: "每个相邻军需品额外 +6。" },
    dagger: { id: "dagger", name: "义军匕首", icon: iconImages.dagger, categories: ["军需品"], mark: "匕", value: 7, rarity: "uncommon", text: "每个相邻义军铁甲或义军长弓额外 +10。" },
    safe: { id: "safe", name: "曌帝保险箱", icon: iconImages.safe, mark: "柜", value: 30, rarity: "rare", text: "高额基础价值，不依赖联动。" },
    treasureChest: { id: "treasureChest", name: "曌帝妆匣", icon: iconImages.dressingCase, mark: "匣", value: 35, rarity: "rare", text: "每个相邻私库钥匙额外 +15。" },
    diamond: { id: "diamond", name: "血钻", icon: iconImages.diamond, mark: "钻", value: 40, rarity: "rare", text: "每有另一枚血钻在本轮被搜寻到，所有血钻额外 +5 分。" },
  };
  const choiceBag = [
    "coin", "coin", "grain", "grain", "beer", "archer", "archer", "crab", "crow",
    "key", "key", "magpie", "owl", "miner", "ore", "lockedChest", "general",
    "armor", "dagger", "safe", "treasureChest", "diamond",
  ];
  const scenes = [
    "第一轮完成，私库里静悄悄的。\n选择一件物品加入后续物品池。",
    "第二轮完成，尘埃从梁上落下，远处传来钥匙碰撞声。\n选择一件物品加入后续物品池。",
    "第三轮完成，药草与旧木的气味混在一起。\n选择一件物品加入后续物品池。",
    "第四轮完成，火把被风吹得摇晃，墙上的影子开始移动。\n选择一件物品加入后续物品池。",
    "第五轮完成，藏品架后传来一声轻响。\n选择一件物品加入后续物品池。",
    "第六轮完成，外库亮起了几盏不该亮起的灯。\n选择一件物品加入后续物品池。",
    "第七轮完成，近卫军似乎正在搜查外库。\n选择一件物品加入后续物品池。",
    "第八轮完成，铠甲碰撞声越来越近。\n选择一件物品加入后续物品池。",
    "第九轮完成，曌帝的近卫军正在赶来。\n选择一件物品加入后续物品池。",
    "第十轮完成，守卫赶过来了，该走了。\n选择一件物品加入物品池。",
  ];

  function starter() {
    return ["coin", "coin", "grain", "beer", "archer", "archer", "crab", "key", "miner", "armor", "dagger"];
  }

  function pick(pool, rng = Math.random) {
    return pool[Math.floor(rng() * pool.length)] || "coin";
  }

  function grid(pool, rng = Math.random) {
    return Array.from({ length: 9 }, () => pick(pool, rng));
  }

  function choices(rng = Math.random) {
    const result = [];
    let guard = 0;
    while (result.length < 3 && guard < 50) {
      const id = pick(choiceBag, rng);
      if (!result.includes(id)) result.push(id);
      guard += 1;
    }
    Object.keys(symbols).forEach((id) => {
      if (result.length < 3 && !result.includes(id)) result.push(id);
    });
    return result;
  }

  function neighbors(index) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const result = [];
    for (let y = Math.max(0, row - 1); y <= Math.min(2, row + 1); y += 1) {
      for (let x = Math.max(0, col - 1); x <= Math.min(2, col + 1); x += 1) {
        const next = y * 3 + x;
        if (next !== index) result.push(next);
      }
    }
    return result;
  }

  function isMilitary(id) {
    return symbols[id]?.categories?.includes("军需品");
  }

  function icon(id) {
    const source = (symbols[id] || symbols.coin).icon;
    if (typeof source === "string") {
      return { src: source, position: "center", size: "100% 100%" };
    }
    const [sheet, column, row] = source;
    return {
      src: iconSheets[sheet],
      position: `${(column / 3) * 100}% ${(row / 3) * 100}%`,
      size: "400% 400%",
    };
  }

  function score(gridIds, round = 1, poolIds = gridIds) {
    let total = 0;
    const bonuses = {};
    const add = (label, amount) => {
      if (!amount) return;
      total += amount;
      bonuses[label] = (bonuses[label] || 0) + amount;
    };
    gridIds.forEach((id, index) => {
      const symbol = symbols[id] || symbols.coin;
      total += symbol.value;
      const near = neighbors(index).map((next) => gridIds[next]);
      const row = gridIds.slice(Math.floor(index / 3) * 3, Math.floor(index / 3) * 3 + 3);
      if (id === "grain") add("干粮补给", near.filter((next) => next === "archer").length * 4);
      if (id === "archer") add("长弓配给", near.filter((next) => next === "grain").length * 3);
      if (id === "crab") add("河防蟹列阵", (row.filter((next) => next === "crab").length - 1) * 3);
      if (id === "key") add("钥匙开箱", near.filter((next) => ["lockedChest", "treasureChest"].includes(next)).length * 12);
      if (id === "miner") add("矿镐开石", near.filter((next) => next === "ore").length * 8);
      if (id === "general") add("帅旗号令", near.filter(isMilitary).length * 6);
      if (id === "armor") add("铁甲护运", near.filter(isMilitary).length * 6);
      if (id === "dagger") add("匕首突袭", near.filter((next) => ["armor", "archer"].includes(next)).length * 10);
      if (id === "treasureChest") add("宝箱开锁", near.filter((next) => next === "key").length * 15);
      if (id === "diamond") add("血钻叠加", (gridIds.filter((next) => next === "diamond").length - 1) * 5);
    });
    const countPool = (id) => poolIds.filter((next) => next === id).length;
    if ([4, 8].includes(round)) {
      add("乌鸦雕像凶兆", countPool("crow") * -3);
      add("喜鹊雕像报喜", countPool("magpie") * 9);
    }
    if ([3, 6, 9].includes(round)) add("夜枭铁盔巡夜", countPool("owl") * 10);
    return {
      total: Math.max(0, total),
      details: Object.entries(bonuses).map(([label, amount]) => `${label} ${amount > 0 ? "+" : ""}${amount}`),
    };
  }

  function scene(round) {
    return scenes[Math.max(0, Math.min(scenes.length - 1, round - 1))];
  }

  function riskChance(round, stored) {
    if (round < 10) return 0;
    if (round === 10) return 5;
    const value = Number(stored);
    return Number.isFinite(value)
      ? Math.min(60, Math.max(5, Math.floor(value)))
      : Math.min(60, 5 + (round - 10) * 5);
  }

  function nextRiskChance(current, rng = Math.random) {
    const value = Number(current);
    const base = Number.isFinite(value) ? Math.min(60, Math.max(5, Math.floor(value))) : 5;
    return Math.min(60, base + 1 + Math.floor(rng() * 10));
  }

  function riskScene(round, stored) {
    return `第${round}轮开始前，曌帝近卫军发现你的概率为 ${riskChance(round, stored)}%。\n留下继续搜寻，或直接撤退。`;
  }

  return {
    choices,
    get: (id) => symbols[id] || symbols.coin,
    grid,
    icon,
    riskChance,
    nextRiskChance,
    riskScene,
    scene,
    score,
    starter,
    symbols,
  };
})();


/* slot-view.js */
window.XQ = window.XQ || {};

window.XQ.SlotView=(() => {
  const Symbols = window.XQ.SlotSymbols;
  const $ = (id) => document.getElementById(id);
  const SAFE_ROUNDS = 9;
  const TOTAL_ROUNDS = 10;
  let textMode = false;
  let lastRender = null;

  function updateModeButton() {
    const button = $("slotModeBtn");
    button.textContent = textMode ? "图" : "字";
    button.title = textMode ? "切换为图片模式" : "切换为文字模式";
    button.setAttribute("aria-label", button.title);
    button.setAttribute("aria-pressed", String(textMode));
  }

  function icon(id) {
    const data = Symbols.icon(id);
    const element = document.createElement("span");
    element.className = "slot-icon";
    if (textMode) {
      const symbol = Symbols.get(id);
      element.classList.add("slot-icon-text");
      element.textContent = symbol.mark || symbol.name.slice(0, 2);
      element.setAttribute("aria-label", symbol.name);
      return element;
    }
    element.style.backgroundImage = `url("${data.src}")`;
    element.style.backgroundPosition = data.position;
    element.style.backgroundSize = data.size;
    element.setAttribute("aria-hidden", "true");
    return element;
  }

  function grid(ids, spinning = false) {
    $("slotGrid").innerHTML = "";
    const cells = ids.length ? ids : Array(9).fill(null);
    cells.forEach((id) => {
      const cell = document.createElement("div");
      cell.className = `slot-cell${spinning ? " spinning" : ""}${id ? ` rarity-${Symbols.get(id).rarity}` : " empty"}`;
      if (id) {
        const symbol = Symbols.get(id);
        const categories = symbol.categories || [];
        if (categories.includes("军需品")) cell.classList.add("category-military");
        const label = document.createElement("span");
        label.className = "slot-cell-label";
        label.textContent = `${symbol.name}${categories.length ? ` · ${categories.join(" · ")}` : ""}`;
        cell.append(icon(id), label);
      }
      $("slotGrid").appendChild(cell);
    });
  }

  function pool(ids) {
    const groups = {};
    ids.forEach((id) => {
      const symbol = Symbols.get(id);
      const category = symbol.categories?.[0] || "";
      groups[category] = groups[category] || {};
      groups[category][id] = (groups[category][id] || 0) + 1;
    });
    const target = $("slotPool");
    target.textContent = Object.entries(groups)
      .map(([category, counts]) => `${category ? `${category}：` : ""}${Object.entries(counts)
        .map(([id, count]) => `${Symbols.get(id).name}×${count}`).join("、")}`)
      .join(" · ");
    target.disabled = !ids.length;
    target.onclick = () => showPoolDetails(ids);
  }

  function showPoolDetails(ids) {
    const counts = {};
    ids.forEach((id) => { counts[id] = (counts[id] || 0) + 1; });
    const cards = Object.entries(counts).map(([id, count]) => {
      const symbol = Symbols.get(id);
      const value = `${symbol.value >= 0 ? "+" : ""}${symbol.value}`;
      const rarity = symbol.rarity === "rare" ? "gold" : symbol.rarity === "uncommon" ? "green" : "white";
      const categories = symbol.categories || [];
      return {
        id,
        name: `${symbol.name} ×${count}${categories.length ? ` · ${categories.join(" · ")}` : ""}`,
        rarity,
        text: `被搜寻到时 ${value} 分。\n${symbol.text}`,
      };
    });
    window.XQ.Render?.showCards?.(
      "当前物品效果",
      `当前物品池共 ${ids.length} 件物品。`,
      cards,
      () => {},
      "save",
    );
  }

  function choices(session, choose) {
    $("slotChoices").innerHTML = "";
    session.choices.forEach((id) => {
      const symbol = Symbols.get(id);
      const button = document.createElement("button");
      button.type = "button";
      const categories = symbol.categories || [];
      button.className = `slot-choice rarity-${symbol.rarity}`;
      if (categories.includes("军需品")) button.classList.add("category-military");
      const value = `${symbol.value >= 0 ? "+" : ""}${symbol.value}`;
      const title = document.createElement("strong");
      title.textContent = `${symbol.name}${categories.length ? ` · ${categories.join(" · ")}` : ""}`;
      const description = document.createElement("span");
      description.className = "slot-choice-text";
      description.textContent = `被搜寻到时 ${value} 分。\n${symbol.text}`;
      button.append(icon(id), title, description);
      button.onclick = () => void choose(id);
      $("slotChoices").appendChild(button);
    });
  }

  function base(state, session, claimed, busy) {
    const remaining = session ? Math.max(0, SAFE_ROUNDS - session.spin) : SAFE_ROUNDS;
    $("slotUsesText").textContent = `${remaining} 次`;
    $("slotSpinText").textContent = `${session?.spin || 0}/${TOTAL_ROUNDS}`;
    $("slotTotalText").textContent = session ? session.total : claimed;
    $("slotActionBtn").disabled = busy;
    $("slotRetreatBtn").classList.add("hidden");
    $("slotRetreatBtn").disabled = true;
    $("slotChoices").innerHTML = "";
  }

  function render(state, claimed, busy, error, handlers) {
    lastRender = { state, claimed, busy, error, handlers };
    updateModeButton();
    const session = state.talents.slotSession;
    base(state, session, claimed, busy);
    if (claimed) return renderClaimed(state, claimed, busy, error, handlers);
    if (!session) return renderIdle(state, busy, error, handlers);
    grid(session.grid);
    pool(session.pool);
    $("slotDetails").textContent = session.details.length ? `${session.details.join(" · ")} · 本轮 +${session.lastPoints}` : "等待搜寻";
    if (error) $("slotStatus").textContent = error;
    else if (session.phase === "choice") $("slotStatus").textContent = session.scene || Symbols.scene(session.spin);
    else if (session.phase === "escape") $("slotStatus").textContent = session.spin >= TOTAL_ROUNDS
      ? Symbols.riskScene(session.spin + 1, session.riskChance)
      : `${session.scene || Symbols.scene(session.spin)}\n选择继续搜寻，或直接撤离。`;
    else if (session.spin >= 9) $("slotStatus").textContent = Symbols.riskScene(session.spin + 1, session.riskChance);
    else $("slotStatus").textContent = `准备第 ${session.spin + 1} 轮，当前池中有 ${session.pool.length} 件物品。`;
    if (session.phase === "choice") {
      $("slotActionBtn").textContent = "先选择新物品";
      $("slotActionBtn").disabled = true;
      choices(session, handlers.choose);
    } else if (session.phase === "escape") {
      const chance = Symbols.riskChance(session.spin + 1, session.riskChance);
      $("slotActionBtn").textContent = busy ? "准备中…" : `继续搜寻第 ${session.spin + 1} 轮（风险 ${chance}%）`;
      $("slotActionBtn").onclick = handlers.spin;
      $("slotRetreatBtn").textContent = "直接撤离";
      $("slotRetreatBtn").classList.remove("hidden");
      $("slotRetreatBtn").disabled = busy;
      $("slotRetreatBtn").onclick = handlers.claim;
    } else {
      const dangerous = session.spin >= 9;
      const chance = Symbols.riskChance(session.spin + 1, session.riskChance);
      $("slotActionBtn").textContent = busy ? "搜寻中…" : dangerous
        ? `继续搜寻第 ${session.spin + 1} 轮（风险 ${chance}%）`
        : `搜寻第 ${session.spin + 1} 轮`;
      $("slotActionBtn").onclick = handlers.spin;
      if (dangerous) {
        $("slotRetreatBtn").textContent = "直接撤退";
        $("slotRetreatBtn").classList.remove("hidden");
        $("slotRetreatBtn").disabled = busy;
        $("slotRetreatBtn").onclick = handlers.claim;
      }
    }
  }

  function renderClaimed(state, claimed, busy, error, handlers) {
    grid([]);
    pool(Symbols.starter());
    $("slotStatus").textContent = error || `搜寻结算完成，共获得 ${claimed} 共享积分。`;
    $("slotDetails").textContent = `当前共享积分 ${state.score} · 历史最佳 ${state.talents.slotStats.best}`;
    $("slotActionBtn").textContent = "再开一局";
    $("slotActionBtn").disabled = busy;
    $("slotActionBtn").onclick = handlers.start;
    $("slotRetreatBtn").classList.add("hidden");
  }

  function renderIdle(state, busy, error, handlers) {
    grid([]);
    pool(Symbols.starter());
    $("slotStatus").textContent = error || "完成十轮搜寻；每轮结束从三件物品中选一件加入后续物品池。";
    $("slotDetails").textContent = state.talents.slotUses
      ? "每件物品提供基础积分，相邻与同行组合会追加联动积分。"
      : "当前没有免费搜寻次数，可花费 1500 积分从黑市购买线索。";
    $("slotActionBtn").textContent = state.talents.slotUses ? "开始搜寻" : "购买线索并开始";
    $("slotActionBtn").disabled = busy;
    $("slotActionBtn").onclick = handlers.start;
    $("slotRetreatBtn").classList.add("hidden");
  }

  return {
    grid,
    toggleMode() {
      textMode = !textMode;
      if (lastRender) render(
        lastRender.state,
        lastRender.claimed,
        lastRender.busy,
        lastRender.error,
        lastRender.handlers,
      );
    },
    hide() { $("slotModal").classList.add("hidden"); },
    render,
    show(close) {
      $("slotCloseBtn").onclick = close;
      textMode = false;
      $("slotModeBtn").onclick = () => {
        textMode = !textMode;
        if (lastRender) render(
          lastRender.state,
          lastRender.claimed,
          lastRender.busy,
          lastRender.error,
          lastRender.handlers,
        );
      };
      updateModeButton();
      $("slotModal").classList.remove("hidden");
      window.XQ.SlotLayout?.fit?.();
    },
  };
})();


/* slot-dialogs.js */
window.XQ = window.XQ || {};

window.XQ.SlotDialogs=(() => {
  function choose(title, intro, cards) {
    return new Promise((resolve) => {
      const Render = window.XQ.Render;
      if (!Render?.showCards) {
        console.error("slot dialog unavailable: Render.showCards is missing");
        resolve("cancel");
        return;
      }
      Render.showCards(title, intro, cards, (card) => {
        Render.hideRewards();
        resolve(card.id);
      }, "locked");
    });
  }

  async function purchase(score, cost) {
    const intro = "一个黑市商人神秘地凑过来搭话“想要探索曌帝的宝库？我倒是有门路，不过价格嘛…”是否支付1500积分购买宝库线索";
    if (score < cost) {
      await choose("黑市线索", intro, [{
        id: "cancel",
        name: "积分不足",
        rarity: "white",
        text: `当前持有 ${score} 积分，还差 ${cost - score} 积分。`,
      }]);
      return false;
    }
    return await choose("黑市线索", intro, [
      { id: "confirm", name: "支付1500积分", rarity: "gold", text: "购买线索并立即开始搜寻。" },
      { id: "cancel", name: "暂不购买", rarity: "white", text: "离开商人，不消耗积分。" },
    ]) === "confirm";
  }

  async function settlement() {
    return choose("选择物资去向", "曌帝近卫军正在赶来，立刻决定如何处理搜寻到的物资。", [
      { id: "slot-supply", name: "交给军需处", rarity: "green", text: "按物资价值直接兑换为共享积分。" },
      { id: "market", name: "送往黑市", rarity: "red", text: "50% 概率价值翻倍；失败则被近卫军截获，只获得 10%。" },
    ]);
  }

  async function notice(title, text, rarity = "gold") {
    await choose(title, text, [{ id: "close", name: "收下物资", rarity, text: "关闭提示，返回曌帝的私库。" }]);
  }

  return { notice, purchase, settlement };
})();


/* slot-machine.js */
window.XQ = window.XQ || {};

window.XQ.SlotMachine=(() => {
  const Symbols = window.XQ.SlotSymbols;
  const View = window.XQ.SlotView;
  const Dialogs = window.XQ.SlotDialogs;
  const ROUNDS = 10;
  const MARKET_CLUE_COST = 1500;
  const GUARANTEE_FLOOR = 1200;
  const GUARANTEE_NOTICE = "救醒你的胡茬大汉拦住了你，拿出一包黄金拍在你胸口，利落地把你转了个身，推出宝库“别找了，这些给你，拿去用”。（获得1200积分）";
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let state;
  let options;
  let open = false;
  let busy = false;
  let claimed = 0;
  let error = "";
  let guaranteed = false;
  let marketOutcome = "";

  function snapshot() {
    return JSON.parse(JSON.stringify(state));
  }

  function restore(saved) {
    Object.keys(state).forEach((key) => delete state[key]);
    Object.assign(state, saved);
  }

  async function commit(saved) {
    try {
      await options.save();
      options.onUpdate?.();
      error = "";
      return true;
    } catch (err) {
      restore(saved);
      error = "保存失败，本次操作已撤销，请稍后重试。";
      console.error("slot save failed:", err?.code || "unknown", err?.message, err?.stack || "");
      render();
      return false;
    }
  }

  function makeSession(purchased = false) {
    return {
      spin: 0,
      riskChance: 5,
      total: 0,
      entry: purchased ? "black-market" : "free",
      pool: Symbols.starter(),
      grid: [],
      choices: [],
      details: [],
      lastPoints: 0,
      phase: "ready",
    };
  }

  async function start() {
    if (busy || state.talents.slotSession) return;
    const uses = state.talents.slotUses || 0;
    const purchased = uses < 1;
    if (purchased) {
      busy = true;
      render();
      const confirmed = await Dialogs.purchase(state.score || 0, MARKET_CLUE_COST);
      busy = false;
      if (!confirmed) {
        if ((state.score || 0) < MARKET_CLUE_COST) {
          error = `当前没有搜寻次数，需要 ${MARKET_CLUE_COST} 积分购买黑市线索。`;
        }
        render();
        return;
      }
    }
    if (purchased && (state.score || 0) < MARKET_CLUE_COST) {
      error = `当前没有搜寻次数，需要 ${MARKET_CLUE_COST} 积分购买黑市线索。`;
      render();
      return;
    }
    busy = true;
    const saved = snapshot();
    if (purchased) state.score -= MARKET_CLUE_COST;
    else state.talents.slotUses -= 1;
    state.talents.slotSession = makeSession(purchased);
    claimed = 0;
    await commit(saved);
    busy = false;
    render();
  }

  async function spin() {
    const session = state.talents.slotSession;
    if (busy || !["ready", "escape"].includes(session?.phase)) return;
    busy = true;
    render();
    for (let step = 0; step < 6 && open; step += 1) {
      View.grid(Symbols.grid(session.pool), true);
      window.XQ.FX?.tone?.(280 + step * 35, 45);
      await wait(85);
    }
    if (!open) {
      busy = false;
      return;
    }
    const saved = snapshot();
    const finalGrid = Symbols.grid(session.pool);
    const nextRound = session.spin + 1;
    const risk = Symbols.riskChance(nextRound, session.riskChance);
    if (risk > 0 && Math.random() < risk / 100) {
      const confiscated = Math.floor(Math.max(0, session.total) * 0.1);
      session.spin = nextRound;
      session.grid = finalGrid;
      session.lastPoints = 0;
      session.details = [`近卫军截获（${risk}%）`];
      state.score += confiscated;
      state.talents.slotStats.plays += 1;
      state.talents.slotStats.best = Math.max(state.talents.slotStats.best, confiscated);
      state.talents.slotSession = null;
      const committed = await commit(saved);
      busy = false;
      if (committed) {
        claimed = confiscated;
        window.XQ.FX?.tone?.(180, 360);
      }
      render();
      if (committed) {
        await Dialogs.notice(
          "曌帝近卫军发现了你",
          `近卫军截获了大部分搜寻物资，你只能带走本局奖励的 10%，获得 ${confiscated} 积分。此次不触发保底。`,
          "red",
        );
      }
      return;
    }
    const result = Symbols.score(finalGrid, session.spin + 1, session.pool);
    session.spin += 1;
    session.grid = finalGrid;
    session.lastPoints = result.total;
    session.total += result.total;
    session.details = result.details;
    session.scene = Symbols.scene(session.spin);
    if (session.spin >= ROUNDS) session.riskChance = Symbols.nextRiskChance(risk);
    session.choices = Symbols.choices();
    session.phase = "choice";
    window.XQ.FX?.tone?.(session.spin < ROUNDS ? 520 : 720, 140);
    const committed = await commit(saved);
    busy = false;
    render();
  }

  async function choose(id) {
    const session = state.talents.slotSession;
    if (busy || session?.phase !== "choice" || !session.choices.includes(id)) return;
    busy = true;
    const saved = snapshot();
    session.pool.push(id);
    session.choices = [];
    session.phase = session.spin >= ROUNDS ? "escape" : "ready";
    await commit(saved);
    busy = false;
    render();
  }

  async function claim() {
    const session = state.talents.slotSession;
    if (busy || !["ready", "escape"].includes(session?.phase) || session.spin < ROUNDS - 1) return;
    busy = true;
    const saved = snapshot();
    const points = session.total;
    const guaranteedRound = points < GUARANTEE_FLOOR;
    const baseAwarded = Math.max(GUARANTEE_FLOOR, points);
    const blackMarket = !guaranteedRound && await Dialogs.settlement() === "market";
    const doubled = blackMarket && Math.random() < 0.5;
    const awarded = blackMarket ? Math.floor(baseAwarded * (doubled ? 2 : 0.1)) : baseAwarded;
    guaranteed = guaranteedRound;
    marketOutcome = guaranteedRound ? ""
      : blackMarket
      ? doubled ? `黑市兑换成功，物资翻倍，获得 ${awarded} 积分。` : `黑市失手，物资被曌帝近卫军截获，仅获得 ${awarded} 积分。`
      : `军需处清点物资后，兑换获得 ${awarded} 积分。`;
    state.score += awarded;
    state.talents.slotStats.plays += 1;
    state.talents.slotStats.best = Math.max(state.talents.slotStats.best, awarded);
    state.talents.slotSession = null;
    if (await commit(saved)) {
      claimed = awarded;
      window.XQ.FX?.tone?.(880, 300);
    } else {
      guaranteed = false;
      marketOutcome = "";
    }
    busy = false;
    render();
    if (guaranteed) await Dialogs.notice("胡茬大汉的保底", GUARANTEE_NOTICE, "gold");
    if (marketOutcome) await Dialogs.notice(blackMarket ? "黑市兑换结果" : "军需处结算", marketOutcome,
      blackMarket && !doubled ? "red" : "green");
  }

  function render() {
    View.render(state, claimed, busy, error, { start, spin, choose, claim });
    window.XQ.SlotLayout?.fit?.();
  }

  function close() {
    open = false;
    View.hide();
    options.onClose?.();
  }

  return {
    open(nextState, nextOptions) {
      state = nextState;
      options = nextOptions;
      window.XQ.Progression.ensure(state);
      open = true;
      busy = false;
      claimed = 0;
      guaranteed = false;
      marketOutcome = "";
      error = "";
      View.show(close);
      render();
      if (!state.talents.slotSession && state.talents.slotUses < 1) void start();
    },
  };
})();


/* prebattle.js */
window.XQ = window.XQ || {};

window.XQ.Prebattle=(() => {
  const TEST_CODE = "test";
  let actions = {};
  let testUnlocked = false;
  let testUnlocking = false;
  let titleClicks = 0;
  let slotRequest = 0;
  const $ = (id) => document.getElementById(id);

  function show(state, nextActions) {
    actions = nextActions || actions;
    bind();
    refresh(state);
    $("startScreen").classList.remove("hidden");
  }

  function bind() {
    $("startNormalBtn").onclick = () => actions.normal?.();
    $("startRebelBtn").onclick = () => actions.rebel?.();
    $("startRandomBtn").onclick = () => actions.random?.();
    $("startRecruitBtn").onclick = () => actions.recruit?.();
    $("startQuickBtn").onclick = () => actions.quick?.();
    $("startSlotBtn").onclick = () => actions.slot?.();
    $("startLoadBtn").onclick = () => actions.load?.();
    $("startTalentBtn").onclick = () => actions.talent?.();
    $("startAchievementsBtn").onclick = () => actions.achievements?.();
    $("startCodexBtn").onclick = () => actions.codex?.();
    $("startGalleryBtn").onclick = () => actions.gallery?.();
    $("startSettingsBtn").onclick = () => actions.settings?.();
    $("startTestBtn").onclick = () => {
      if (testUnlocked) actions.test?.();
    };
    $("startTitle").onclick = revealTest;
    $("gameTitle").onclick = revealTest;
    $("cheatCloseBtn").onclick = closeCheat;
    $("cheatModal").onclick = (event) => {
      if (event.target === $("cheatModal")) closeCheat();
    };
    $("cheatForm").onsubmit = (event) => {
      event.preventDefault();
      void unlockTest();
    };
    $("cheatSubmitBtn").onclick = () => void unlockTest();
    $("cheatInput").oninput = () => {
      $("cheatFeedback").textContent = "";
      if (codeValue() === TEST_CODE) void unlockTest();
    };
    $("cheatInput").onkeydown = (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      void unlockTest();
    };
  }

  function revealTest() {
    if (testUnlocked) return;
    titleClicks = Math.min(5, titleClicks + 1);
    if (titleClicks < 5) return;
    openCheat();
  }

  function openCheat() {
    $("cheatInput").value = "";
    $("cheatFeedback").textContent = "";
    $("cheatModal").classList.remove("hidden");
    requestAnimationFrame(() => $("cheatInput").focus());
  }

  function closeCheat() {
    $("cheatModal").classList.add("hidden");
  }

  function codeValue() {
    return $("cheatInput").value.trim().toLowerCase();
  }

  async function unlockTest() {
    if (testUnlocking) return;
    if (codeValue() !== TEST_CODE) {
      $("cheatFeedback").textContent = "作弊码错误";
      $("cheatInput").select();
      return;
    }
    if (typeof actions.test !== "function") {
      $("cheatFeedback").textContent = "测试入口加载失败，请刷新游戏后重试";
      console.error("test entry unavailable: missing prebattle action");
      return;
    }
    testUnlocking = true;
    $("cheatSubmitBtn").disabled = true;
    $("cheatFeedback").textContent = "正在打开测试入口…";
    testUnlocked = true;
    $("startTestBtn").textContent = "测试入口（已解锁）";
    $("startTestBtn").classList.remove("hidden");
    closeCheat();
    try {
      await actions.test();
    } catch (err) {
      testUnlocked = false;
      $("startTestBtn").classList.add("hidden");
      openCheat();
      $("cheatFeedback").textContent = "测试入口打开失败，请刷新游戏后重试";
      console.error("test entry failed:", err?.code || "unknown", err?.message, err?.stack || "");
    } finally {
      testUnlocking = false;
      $("cheatSubmitBtn").disabled = false;
    }
  }

  function hide() {
    $("startScreen").classList.add("hidden");
  }

  function refresh(state) {
    window.XQ.Mode.ensure(state);
    const normal = state.bestRecords.normal;
    const rebel = state.bestRecords.rebel;
    const random = state.bestRecords.random;
    const recruit = state.bestRecords.recruit;
    const achievement = window.XQ.Achievements.progress(state);
    $("startSummary").textContent = `共享积分 ${state.score || 0} · 四种征程独立保存，快速模式单局重开`;
    $("gameVersion").textContent = `v${window.XQ.Config.version}`;
    $("recordSummary").textContent = `常规 ${normal.level}关 · 义军 ${rebel.level}关 · 随机棋 ${random.level}关 · 招兵买马 ${recruit.level}关`;
    $("startRandomBtn").classList.toggle("hidden", !state.talents?.randomModeUnlocked);
    $("startRecruitBtn").classList.toggle("hidden", !state.talents?.recruitModeUnlocked);
    $("startCodexBtn").classList.toggle("hidden", !window.XQ.ItemCodex?.isUnlocked?.(state));
    $("startAchievementsBtn").textContent = `成就 ${achievement.done}/${achievement.total}`;
    const slotUses = state.talents?.slotUses || 0;
    const slotSession = state.talents?.slotSession;
    $("startSlotBtn").textContent = slotSession ? `继续曌帝的私库 · 第 ${slotSession.spin + 1} 轮` : `曌帝的私库 · ${slotUses} 次`;
    $("startSlotBtn").disabled = false;
    $("unlockedList").innerHTML = "";
    unlocked(state).forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      $("unlockedList").appendChild(li);
    });
    refreshSlots();
  }

  async function refreshSlots() {
    const request = ++slotRequest;
    try {
      const [normal, rebel, random, recruit] = await Promise.all([
        window.XQ.Storage.getMode("normal"),
        window.XQ.Storage.getMode("rebel"),
        window.XQ.Storage.getMode("random"),
        window.XQ.Storage.getMode("recruit"),
      ]);
      if (request !== slotRequest) return;
      setSlotButton("startNormalBtn", normal, "常规模式");
      setSlotButton("startRebelBtn", rebel, "义军破敌");
      setSlotButton("startRandomBtn", random, "随机棋模式");
      setSlotButton("startRecruitBtn", recruit, "招兵买马模式");
    } catch (err) {
      console.warn("save slot summary failed:", err.message);
    }
  }

  function setSlotButton(id, data, label) {
    const resumable = Boolean(data?.battleInProgress);
    const prefix = resumable ? "继续" : "开始";
    const suffix = resumable ? ` · 第 ${data.level || 1} 关` : "";
    $(id).textContent = `${prefix}${label}${suffix}`;
  }

  function unlocked(state) {
    const t = state.talents || {};
    const list = [];
    if (t.retain > 0) list.push(`传承锦囊 ${t.retain}：新征程可保留 ${t.retain} 个局内道具`);
    if (t.outerTempoOffer) list.push("第一关 0 积分局外双步虎符已开放");
    if (t.outerTempoOffer) list.push("道具图鉴已解锁");
    if (t.randomModeUnlocked) list.push("随机棋模式已解锁");
    if (t.recruitModeUnlocked) list.push("招兵买马模式已解锁");
    if (t.chess?.S) list.push("主教改制已解锁");
    if (t.chess?.Q) list.push("皇后改制已解锁");
    if (t.shopUnlocks?.turtleShell) list.push("局内随机商店已解锁龟壳");
    if (t.shopUnlocks?.rabbitFoot) list.push("局内随机商店已解锁兔脚");
    if (t.shopUnlocks?.advisorStride) list.push("局内随机商店已解锁仕途通达");
    if (t.shopUnlocks?.horseSale) list.push("马系列局内商店售价减半");
    if (t.shopUnlocks?.endure) list.push("局内随机商店已解锁卧薪尝胆");
    if (t.shopUnlocks?.charmMakeup) list.push("局内随机商店已解锁媚妆");
    if (t.captureGalleryUnlocked) list.push("棋子被俘剧情图鉴已解锁");
    if (t.prisonGalleryUnlocked && t.defeatGalleryUnlocked) list.push("关押剧情图鉴与义军兵败剧情图鉴已解锁");
    (t.outerItems || []).forEach((item) => list.push(item.name));
    return list.length ? list : ["暂无已解锁道具"];
  }

  return { hide, refresh, show };
})();


/* combo-nav.js */
window.XQ = window.XQ || {};

window.XQ.ComboNav=(() => {
  const base = () => window.XQ.EnemyStages.lateBase(window.XQ.Config.blackAddOrder.length);
  const details = {
    turtle: ["龟缩", "red", "黑将被吃后龟缩，进入短暂无敌并冷却。"],
    fish: ["鱼水", "green", "开局及每 5 次红方行动生成并逐步增加“草”。"],
    rabbit: ["兔阵", "gold", "黑方棋子被吃时可后退一格避开，冷却 4 回合。"],
    divine: ["神选", "red", "黑方每回合随机一枚棋子获得一回合护驾。"],
    collapse: ["崩盘", "purple", "回合计数和连续不吃子都会生成崩落位。"],
    eunuch: ["宦潮", "red", "五卒与两象化仕，黑方持有仕出宫、仕过河、仕途通达。"],
    charmFormation: ["媚阵", "red", "黑方吃红子后复制同兵种黑子并获得对应道具，红方保留原道具。"],
    horse1: ["纵马1", "gold", "黑方持有马位移，本关 2 卒化马。"],
    horse2: ["纵马2", "gold", "黑方增加马腾跃，本关 3 卒化马。"],
    reinforcement: ["增援", "red", "第 3 回合起每 2 回合增兵，数量和兵种质量逐步提升。"],
    charmBlade: ["媚骨蚀锋", "red", "媚阵生效；每回合生成 3 个令红子倒戈的魅惑格。"],
    horse3: ["纵马3", "red", "黑方增加马驰骋，本关 4 卒化马。"],
    corruption: ["染心", "red", "红方吃子后倒戈并交出对应道具，冷却 3 回合。"],
    horse4: ["纵马4", "red", "黑方持有全马道具，本关 5 卒化马。"],
    music: ["迷音", "red", "每 3 回合临时控制红方棋子，第 6 回合起每次控制两枚。"],
    incense: ["香阵", "red", "扩张香阵冻结红子并保护阵内黑子。"],
    momentum: ["盈不可久", "red", "红方每次吃子会使黑方下次多走一步，最多累计 2 步。"],
    karma: ["业障", "red", "同一红子累计吃子会依次遭到封锁、失去道具和阵亡惩罚。"],
    linkedBranches: ["连枝", "red", "黑方三对棋子相连，一子阵亡后另一子继承其移动范围。"],
    sacrifice: ["生祭", "red", "黑方每次吃子获得随机道具，且可以吃己方非将棋子；每 2 回合增兵。"],
  };

  function card(id, level) {
    const [name, rarity, text] = details[id];
    return { id: `${id}-${level}`, name: `直达${name}`, rarity, text, level };
  }

  function cards(state) {
    if (["rebel", "recruit"].includes(state.mode)) {
      return window.XQ.Late.rebelComboLevels(state).map((entry) => card(entry.id, entry.level));
    }
    if (state.mode === "random") return window.XQ.Late.randomComboLevels(state).map((entry) => card(entry.id, entry.level));
    const final = base();
    return window.XQ.ComboOrder.fixedIds()
      .map((id, index) => card(id, final + 8 + index));
  }

  function open(state, jump) {
    window.XQ.Render.showCards("组合技关卡直达", `当前第 ${state.level} 关。选择后会重置为对应关卡开局。`, cards(state), async (card) => {
      window.XQ.Render.hideRewards();
      await jump(card.level);
      window.XQ.Render.banner(`已直达第 ${card.level} 关`);
    }, "save");
  }

  function openTest(state, actions) {
    const testCards = [
      { id: "grant-score", name: "获得积分", rarity: "red", text: "测试用：立即获得 5000 积分。" },
      { id: "grant-slot", name: "获得私库搜寻次数", rarity: "gold", text: "测试用：立即获得 1 次私库搜寻次数。" },
    ].concat(cards(state));
    window.XQ.Render.showCards("测试入口", `当前第 ${state.level} 关。`, testCards, async (card) => {
      window.XQ.Render.hideRewards();
      if (card.id === "grant-score") {
        await actions.grant();
        window.XQ.Render.banner("测试积分 +5000");
        return;
      }
      if (card.id === "grant-slot") {
        await actions.grantSlot();
        window.XQ.Render.banner("测试私库搜寻次数 +1");
        return;
      }
      await actions.jump(card.level);
      window.XQ.Render.banner(`已直达第 ${card.level} 关`);
    }, "save");
  }

  return { open, openTest };
})();


/* runtime.js */
window.XQ = window.XQ || {};

window.XQ.Runtime={
  create(getState, render) {
    const locks = new Set();
    const UI = window.XQ.Render;
    const Store = window.XQ.Storage;
    const Ops = window.XQ.StateOps;
    const labels = {
      board: "行棋", enemy: "敌方行动", restart: "重开关卡", hint: "提示",
      restore: "悔棋", level: "进入下一关", shop: "打开商店", talent: "局外天赋",
      items: "道具操作", save: "手动存档", load: "读取存档", settings: "设置",
      leave: "返回主菜单", "give-up": "放弃本轮",
    };

    async function run(key, action) {
      if (locks.has(key)) return;
      const state = getState();
      locks.add(key);
      render();
      try {
        return await Ops.transact(state, action);
      } catch (err) {
        console.error(`${key} failed:`, err?.code || "unknown", err?.message, err?.stack || "");
        UI.banner(Ops.actionError(err, `${labels[key] || "操作"}失败，已恢复到操作前状态，请重试`));
      } finally {
        locks.delete(key);
        render();
      }
    }

    function queue() {
      return Store.queue(getState(), (message) => UI.banner(message));
    }

    async function flush() {
      const ok = await Store.flush(getState(), (message) => UI.banner(message));
      if (ok) return true;
      const error = new Error("关键进度写入失败");
      error.userMessage = "保存失败，已撤销本次操作，请稍后重试";
      throw error;
    }

    function bind(id, key, action) {
      document.getElementById(id).addEventListener("click", () => run(key, action));
    }

    return {
      bind,
      busy: () => locks.size > 0,
      flush,
      isLocked: (key) => locks.has(key),
      queue,
      run,
    };
  },
};


/* mode-session.js */
window.XQ = window.XQ || {};

window.XQ.ModeSession={
  create(options) {
    const Store = window.XQ.Storage;
    const Levels = window.XQ.Levels;
    const Ops = window.XQ.StateOps;

    async function select(mode) {
      const state = options.getState();
      const targetMode = window.XQ.Mode.normalizeName(mode);
      if (state.mode !== targetMode) {
        const currentSaved = await Store.getMode(state.mode);
        if (currentSaved && !(await options.saveNow())) return false;
        const loaded = await Store.getMode(targetMode);
        const next = Levels.baseState(loaded || await Store.seed(targetMode));
        if (!loaded?.board?.length) Ops.beginLevel(next);
        replace(state, next);
      } else if (!state.board?.length) {
        Ops.beginLevel(state);
      }
      options.render();
      if (!(await window.XQ.RebelLoadout.choose(state, options.render))) return false;
      if (!(await window.XQ.RandomMode.showOpening(state))) return false;
      state.battleInProgress = true;
      if (!(await options.saveNow())) return false;
      window.XQ.Prebattle.refresh(state);
      await options.enterBattle();
      return true;
    }

    async function startQuick() {
      const state = options.getState();
      if (!(await options.saveNow())) return false;
      await Store.clearMode("quick");
      const next = Levels.baseState(await Store.seed("quick"));
      Ops.beginLevel(next);
      replace(state, next);
      options.render();
      if (!(await window.XQ.QuickMode.showOpening(state))) return false;
      state.battleInProgress = true;
      if (!(await options.saveNow())) return false;
      window.XQ.Prebattle.refresh(state);
      await options.enterBattle();
      return true;
    }

    async function resetCurrent() {
      const state = options.getState();
      const mode = state.mode;
      await Store.clearMode(mode);
      const next = Levels.baseState(await Store.seed(mode));
      Ops.beginLevel(next);
      replace(state, next);
      options.render();
      if (!(await window.XQ.RandomMode.showOpening(state))) return false;
      if (!(await window.XQ.QuickMode.showOpening(state))) return false;
      await options.saveNow();
      window.XQ.Prebattle.refresh(state);
    }

    function replace(target, source) {
      Object.keys(target).forEach((key) => delete target[key]);
      Object.assign(target, source);
    }

    return { resetCurrent, select, startQuick };
  },
};


/* shooter-pickups.js */
window.XQ = window.XQ || {};

window.XQ.ShooterPickups=(() => {
  const FREEZE_SECONDS = 1;

  function init(world) {
    world.pickups = [];
    world.pickupTimer = 3;
    world.freezeTimer = 0;
  }

  function update(world, dt) {
    world.freezeTimer = Math.max(0, (world.freezeTimer || 0) - dt);
    world.pickupTimer = Math.max(0, (world.pickupTimer || 0) - dt);
    if (!world.pickups.length && world.pickupTimer <= 0) spawn(world);
    const leader = world.red[0];
    if (!leader?.alive) return false;
    const index = world.pickups.findIndex((pickup) => (
      Math.hypot(leader.x - pickup.x, leader.y - pickup.y) <= leader.radius + pickup.radius
    ));
    if (index < 0) return false;
    world.pickups.splice(index, 1);
    world.freezeTimer = FREEZE_SECONDS;
    world.pickupTimer = 5 + Math.random() * 2;
    return true;
  }

  function spawn(world) {
    world.pickups.push({
      id: `freeze-${world.elapsed.toFixed(2)}`,
      kind: "freeze",
      x: 330 + Math.random() * 240,
      y: 70 + Math.random() * (world.height - 140),
      radius: 15,
    });
  }

  return { init, update };
})();


/* shooter-contact.js */
window.XQ = window.XQ || {};

window.XQ.ShooterContact=(() => {
  function update(world, dt) {
    world.black.forEach((black) => {
      if (!black.alive) return;
      black.hitTimer = Math.max(0, black.hitTimer - dt);
      if (black.hitTimer > 0) return;
      const target = nearestContact(black, world.red);
      if (!target) return;
      target.hp -= Math.max(5, Math.round(Math.sqrt(black.maxHp) * 1.35));
      black.hitTimer = 0.38;
    });
  }

  function nearestContact(source, units) {
    return units.filter((unit) => unit.alive && (
      Math.hypot(unit.x - source.x, unit.y - source.y) <= unit.radius + source.radius + 5
    )).sort((left, right) => distance(source, left) - distance(source, right))[0] || null;
  }

  function distance(left, right) {
    return (left.x - right.x) ** 2 + (left.y - right.y) ** 2;
  }

  return { update };
})();


/* shooter-rules.js */
window.XQ = window.XQ || {};

window.XQ.ShooterRules=(() => {
  const WIDTH = 900;
  const HEIGHT = 560;
  const VALUES = () => window.XQ.Config.values;

  function create(board) {
    const redPieces = (board || []).filter((piece) => piece.side === "r").sort(redOrder);
    const blackPieces = (board || []).filter((piece) => piece.side === "b");
    const red = redPieces.map((piece, index) => unit(piece, 270 - index * 34, HEIGHT / 2, "r", index));
    const black = blackPieces.map((piece, index) => unit(
      piece,
      600 + (index % 4) * 54,
      100 + Math.floor(index / 4) * 88,
      "b",
      index,
    ));
    const leader = red[0];
    const trail = [];
    for (let i = 0; i < Math.max(30, red.length * 12); i += 1) {
      trail.push({ x: (leader?.x || 270) - i * 4, y: leader?.y || HEIGHT / 2 });
    }
    const world = { width: WIDTH, height: HEIGHT, red, black, bullets: [], trail, elapsed: 0, outcome: null };
    window.XQ.ShooterPickups.init(world);
    return world;
  }

  function unit(piece, x, y, side, index) {
    const maxHp = VALUES()[piece.type] || 1;
    return {
      id: piece.id,
      type: piece.type,
      side,
      x,
      y,
      hp: maxHp,
      maxHp,
      radius: piece.type === "K" ? 18 : 14,
      fireTimer: 0.12 + index * 0.04,
      hitTimer: 0,
      alive: true,
    };
  }

  function redOrder(a, b) {
    if (a.type === "K") return -1;
    if (b.type === "K") return 1;
    return (b.y - a.y) || (a.x - b.x);
  }

  function update(world, dt, input = {}) {
    if (world.outcome) return world.outcome;
    const step = Math.min(0.034, Math.max(0, dt));
    world.elapsed += step;
    moveLeader(world, step, input);
    followLeader(world, step);
    window.XQ.ShooterPickups.update(world, step);
    updateRedFire(world, step);
    if (world.freezeTimer <= 0) updateBlack(world, step);
    window.XQ.ShooterContact.update(world, step);
    updateBullets(world, step);
    removeDead(world);
    const leader = world.red[0];
    if (!leader?.alive) world.outcome = "black";
    else if (!world.black.some((unit) => unit.alive)) world.outcome = "red";
    return world.outcome;
  }

  function moveLeader(world, dt, input) {
    const leader = world.red[0];
    if (!leader?.alive) return;
    let dx = Number(input.dx) || 0;
    let dy = Number(input.dy) || 0;
    if (!dx && !dy && Number.isFinite(input.targetX) && Number.isFinite(input.targetY)) {
      dx = input.targetX - leader.x;
      dy = input.targetY - leader.y;
      if (Math.hypot(dx, dy) < 8) dx = dy = 0;
    }
    const length = Math.hypot(dx, dy) || 1;
    const speed = 220;
    leader.x = clamp(leader.x + (dx / length) * speed * dt, 28, world.width - 28);
    leader.y = clamp(leader.y + (dy / length) * speed * dt, 28, world.height - 28);
    const head = world.trail[0];
    if (!head || Math.hypot(leader.x - head.x, leader.y - head.y) >= 3) {
      world.trail.unshift({ x: leader.x, y: leader.y });
      world.trail.length = Math.min(world.trail.length, Math.max(40, world.red.length * 14));
    }
  }

  function followLeader(world, dt) {
    world.red.forEach((unit, index) => {
      if (!unit.alive || index === 0) return;
      const target = world.trail[Math.min(world.trail.length - 1, index * 10)];
      if (!target) return;
      const ease = Math.min(1, dt * 10);
      unit.x += (target.x - unit.x) * ease;
      unit.y += (target.y - unit.y) * ease;
    });
  }

  function updateRedFire(world, dt) {
    world.red.forEach((unit) => {
      if (!unit.alive) return;
      unit.fireTimer -= dt;
      if (unit.fireTimer > 0) return;
      const target = nearest(unit, world.black);
      if (!target) return;
      const dx = target.x - unit.x;
      const dy = target.y - unit.y;
      const length = Math.hypot(dx, dy) || 1;
      world.bullets.push({
        x: unit.x,
        y: unit.y,
        vx: (dx / length) * 520,
        vy: (dy / length) * 520,
        damage: Math.max(4, Math.round(Math.sqrt(unit.maxHp))),
      });
      unit.fireTimer = Math.max(0.45, 0.78 - Math.sqrt(unit.maxHp) / 120);
    });
  }

  function updateBlack(world, dt) {
    world.black.forEach((unit, index) => {
      if (!unit.alive) return;
      const target = tailTarget(world);
      if (!target) return;
      const dx = target.x - unit.x;
      const dy = target.y - unit.y;
      const length = Math.hypot(dx, dy) || 1;
      const sway = Math.sin(world.elapsed * 2.2 + index) * 18;
      const speed = 92 + Math.min(50, Math.sqrt(unit.maxHp));
      unit.x += ((dx / length) * speed + (-dy / length) * sway) * dt;
      unit.y += ((dy / length) * speed + (dx / length) * sway) * dt;
    });
  }

  function updateBullets(world, dt) {
    world.bullets.forEach((bullet) => {
      bullet.x += bullet.vx * dt;
      bullet.y += bullet.vy * dt;
      const hit = world.black.find((unit) => unit.alive && Math.hypot(unit.x - bullet.x, unit.y - bullet.y) <= unit.radius + 4);
      if (hit) {
        hit.hp -= bullet.damage;
        bullet.dead = true;
      }
      if (bullet.x < -10 || bullet.x > world.width + 10 || bullet.y < -10 || bullet.y > world.height + 10) bullet.dead = true;
    });
    world.bullets = world.bullets.filter((bullet) => !bullet.dead);
  }

  function removeDead(world) {
    world.red.forEach((unit) => { if (unit.hp <= 0) unit.alive = false; });
    world.black.forEach((unit) => { if (unit.hp <= 0) unit.alive = false; });
  }

  function tailTarget(world) {
    for (let i = world.red.length - 1; i >= 0; i -= 1) {
      if (world.red[i].alive) return world.red[i];
    }
    return null;
  }

  function nearest(source, units) {
    return units.filter((unit) => unit.alive).sort((a, b) => (
      distanceSquared(source, a) - distanceSquared(source, b)
    ))[0] || null;
  }

  function distanceSquared(a, b) {
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
  }

  function survivors(world) {
    return world.red.filter((unit) => unit.alive).map((unit) => unit.id);
  }

  function settlement(board, survivorIds, mode) {
    const ids = new Set(survivorIds);
    const red = (board || []).filter((piece) => piece.side === "r");
    return {
      board: red.filter((piece) => ids.has(piece.id)).map((piece) => ({ ...piece })),
      captured: mode === "rebel" ? red.filter((piece) => !ids.has(piece.id)).map((piece) => ({ ...piece })) : [],
      carries: mode === "rebel" || mode === "random" || mode === "recruit",
    };
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  return { create, settlement, survivors, tailTarget, update };
})();


/* shooter-render.js */
window.XQ = window.XQ || {};

window.XQ.ShooterRender=(() => {
  const labels = () => window.XQ.Config.labels;
  let canvas;
  let ctx;

  function init(element) {
    canvas = element;
    ctx = canvas.getContext("2d");
    resize();
  }

  function resize() {
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
  }

  function draw(world) {
    if (!ctx || !canvas) return;
    const sx = canvas.width / world.width;
    const sy = canvas.height / world.height;
    ctx.setTransform(sx, 0, 0, sy, 0, 0);
    background(world);
    world.pickups.forEach(drawPickup);
    world.bullets.forEach(drawBullet);
    world.black.filter((unit) => unit.alive).forEach((unit) => drawUnit(unit, world.freezeTimer > 0));
    world.red.filter((unit) => unit.alive).forEach(drawUnit);
    drawFormation(world);
  }

  function background(world) {
    ctx.clearRect(0, 0, world.width, world.height);
    ctx.fillStyle = "#101619";
    ctx.fillRect(0, 0, world.width, world.height);
    ctx.strokeStyle = "rgba(217, 190, 124, 0.12)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= world.width; x += 45) line(x, 0, x, world.height);
    for (let y = 0; y <= world.height; y += 40) line(0, y, world.width, y);
    ctx.fillStyle = "rgba(204, 53, 45, 0.08)";
    ctx.fillRect(0, 0, world.width / 2, world.height);
  }

  function drawFormation(world) {
    const living = world.red.filter((unit) => unit.alive);
    if (living.length < 2) return;
    ctx.strokeStyle = "rgba(238, 194, 111, 0.22)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    living.forEach((unit, index) => {
      if (index === 0) ctx.moveTo(unit.x, unit.y);
      else ctx.lineTo(unit.x, unit.y);
    });
    ctx.stroke();
  }

  function drawBullet(bullet) {
    ctx.fillStyle = "#f6d37a";
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawPickup(pickup) {
    ctx.save();
    ctx.translate(pickup.x, pickup.y);
    ctx.fillStyle = "#bfeaf2";
    ctx.strokeStyle = "#3195b0";
    ctx.lineWidth = 3;
    ctx.shadowBlur = 14;
    ctx.shadowColor = "#72d8ee";
    ctx.beginPath();
    ctx.arc(0, 0, pickup.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#15536a";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("冻", 0, 1);
    ctx.restore();
  }

  function drawUnit(unit, frozen = false) {
    const red = unit.side === "r";
    ctx.save();
    ctx.translate(unit.x, unit.y);
    ctx.shadowBlur = unit.type === "K" ? 14 : 6;
    ctx.shadowColor = frozen ? "#73d9ec" : red ? "#e94d43" : "#bec8c5";
    ctx.fillStyle = red ? "#8f211e" : "#20292b";
    ctx.strokeStyle = frozen ? "#8ee8f4" : red ? "#f0b05f" : "#aeb9b6";
    ctx.lineWidth = unit.type === "K" ? 4 : 2;
    ctx.beginPath();
    ctx.arc(0, 0, unit.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = red ? "#ffe0a0" : "#f2f4ef";
    ctx.font = `bold ${unit.type === "K" ? 18 : 15}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(labels()[unit.side][unit.type] || unit.type, 0, 1);
    health(unit);
    ctx.restore();
  }

  function health(unit) {
    const width = 34;
    const ratio = Math.max(0, unit.hp / unit.maxHp);
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(-width / 2, unit.radius + 7, width, 4);
    ctx.fillStyle = unit.side === "r" ? "#ef6b5d" : "#d7dfdc";
    ctx.fillRect(-width / 2, unit.radius + 7, width * ratio, 4);
  }

  function line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  return { draw, init, resize };
})();


/* shooter.js */
window.XQ = window.XQ || {};

window.XQ.Shooter=(() => {
  const $ = (id) => document.getElementById(id);
  const Rules = () => window.XQ.ShooterRules;
  const View = () => window.XQ.ShooterRender;
  const keys = new Set();
  let options;
  let world;
  let active = false;
  let ending = false;
  let frame = 0;
  let lastTime = 0;
  let pointer = null;
  let resizeFrame = 0;

  function configure(nextOptions) {
    options = nextOptions;
    const canvas = $("shooterCanvas");
    View().init(canvas);
    canvas.addEventListener("pointerdown", onPointer);
    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("pointerup", clearPointer);
    canvas.addEventListener("pointercancel", clearPointer);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    $("shooterSurrenderBtn").addEventListener("click", surrender);
    const resize = () => {
      cancelAnimationFrame(resizeFrame);
      resizeFrame = requestAnimationFrame(View().resize);
    };
    window.addEventListener("resize", resize, { passive: true });
    window.visualViewport?.addEventListener("resize", resize, { passive: true });
  }

  async function start() {
    if (active || !options) return;
    const state = options.getState();
    if (!canStart(state)) {
      window.XQ.Render.banner("盘外招需要双方仍有棋子且红帅在场");
      return;
    }
    world = Rules().create(state.board);
    active = true;
    ending = false;
    pointer = null;
    state.phase = "shooter";
    $("shooterModal").classList.remove("hidden");
    updateHud();
    View().resize();
    lastTime = performance.now();
    frame = requestAnimationFrame(loop);
  }

  function canStart(state) {
    return state?.phase === "play"
      && state.board?.some((piece) => piece.side === "r" && piece.type === "K")
      && state.board?.some((piece) => piece.side === "b");
  }

  function loop(time) {
    if (!active) return;
    const dt = (time - lastTime) / 1000;
    lastTime = time;
    const outcome = Rules().update(world, dt, input());
    View().draw(world);
    updateHud();
    if (outcome) {
      void finish(outcome);
      return;
    }
    frame = requestAnimationFrame(loop);
  }

  function input() {
    let dx = 0;
    let dy = 0;
    if (keys.has("ArrowLeft") || keys.has("a")) dx -= 1;
    if (keys.has("ArrowRight") || keys.has("d")) dx += 1;
    if (keys.has("ArrowUp") || keys.has("w")) dy -= 1;
    if (keys.has("ArrowDown") || keys.has("s")) dy += 1;
    return pointer ? { dx, dy, targetX: pointer.x, targetY: pointer.y } : { dx, dy };
  }

  function onPointer(event) {
    if (!active || (event.type === "pointermove" && event.buttons === 0)) return;
    event.preventDefault();
    const rect = $("shooterCanvas").getBoundingClientRect();
    pointer = {
      x: ((event.clientX - rect.left) / rect.width) * world.width,
      y: ((event.clientY - rect.top) / rect.height) * world.height,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function clearPointer() {
    pointer = null;
  }

  function onKeyDown(event) {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (!active || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "w", "a", "s", "d"].includes(key)) return;
    event.preventDefault();
    keys.add(key);
  }

  function onKeyUp(event) {
    keys.delete(event.key.length === 1 ? event.key.toLowerCase() : event.key);
  }

  function updateHud() {
    if (!world) return;
    const red = world.red.filter((unit) => unit.alive);
    const black = world.black.filter((unit) => unit.alive);
    const leader = world.red[0];
    $("shooterUnits").textContent = `红 ${red.length} / 黑 ${black.length}`;
    $("shooterLeaderHp").textContent = `帅 ${Math.max(0, Math.ceil(leader?.hp || 0))}/${leader?.maxHp || 0}`;
    $("shooterEffect").textContent = world.freezeTimer > 0
      ? `冻结 ${world.freezeTimer.toFixed(1)}s`
      : world.pickups.length ? "冻符已出现" : "冻符刷新中";
  }

  async function finish(outcome) {
    if (ending) return;
    ending = true;
    stop();
    const state = options.getState();
    state.phase = "play";
    if (outcome === "red") {
      applySurvivors(state);
      options.render();
      await options.win("盘外招破阵成功");
    } else {
      state.board = state.board.filter((piece) => !(piece.side === "r" && piece.type === "K"));
      options.render();
      await options.lose("盘外招失利：红帅阵亡");
    }
  }

  function applySurvivors(state) {
    const result = Rules().settlement(state.board, Rules().survivors(world), state.mode);
    result.captured.forEach((piece) => window.XQ.Mode.redCaptured(state, piece));
    state.board = result.board;
  }

  function surrender() {
    if (!active || !window.confirm("确认认输？盘外招将按红帅阵亡结算。")) return;
    void finish("black");
  }

  function stop() {
    active = false;
    cancelAnimationFrame(frame);
    cancelAnimationFrame(resizeFrame);
    keys.clear();
    pointer = null;
    $("shooterModal").classList.add("hidden");
  }

  return { configure, start };
})();


/* app-support.js */
window.XQ = window.XQ || {};

window.XQ.AppSupport={
  create(options) {
    const UI = window.XQ.Render;
    const Menus = window.XQ.Menus;
    const Pre = window.XQ.Prebattle;

    function state() { return options.getState(); }

    function activateCard(card) {
      const s = state();
      const Act = window.XQ.Actions;
      if (card.id === "revive") return window.XQ.Revive.start(s, options.render);
      if (card.id === "destroy") Act.startDestroy(s, options.render, options.saveSoon);
      if (card.id === "morph") Act.startMorph(s, options.render, options.saveSoon, card);
      if (card.id === "pawnSpell") Act.startWeaken(s, options.render, options.saveSoon, card);
      if (card.id === "donate") Act.startDonate(s, options.render, options.saveSoon);
      if (card.id === "offboard") return window.XQ.Shooter.start();
    }

    function showNotices() {
      const s = state();
      const Act = window.XQ.Actions;
      return Act.tempoNotice(s, options.render, options.saveNow, showNotices)
        || Act.hardNotice(s, options.render, options.saveNow, showNotices)
        || Act.outerTempoNotice(s, options.render, options.saveNow);
    }

    function openRebel() {
      UI.showCards("义军破敌（正式版）", `${window.XQ.Mode.REBEL_STORY}\n\n规则：红方棋子阵亡后，后续关卡不再自动补足，只能通过归阵令取回。本模式不发放、出售或启用双步道具；每轮开局只能选择一件已拥有的局外道具带入；通关记录单独计算。`, [{
        id: "start",
        name: "进入义军征程",
        rarity: "red",
        text: "确认后读取义军破敌的独立自动存档。",
      }], async () => {
        UI.hideRewards();
        await options.selectMode("rebel");
      }, "story");
    }

    async function openNormal() {
      await options.selectMode("normal");
    }

    async function canResume(mode) {
      try {
        const saved = await window.XQ.Storage.getMode(mode);
        return Boolean(saved?.battleInProgress);
      } catch (err) {
        console.warn(`${mode} resume check failed:`, err.message);
        return false;
      }
    }

    async function openRandom() {
      const resume = await canResume("random");
      UI.showCards("随机棋模式", "开局逐枚随机获得 16 枚棋子，每种棋子都可能出现 0–16 枚，不固定发放帅。某类棋子超过 3 枚时，对应棋子道具的出现率提高。另免费发放“将帅出宫”和“仕出宫”，不计入 5 个开局随机道具，进入布阵前会展示本轮初始道具。每局结束后，留在敌方半场的存活棋子会随机撤回己方半场，己方半场棋子保持原位。拾取的变车、变后效果仅持续本局，帅也可变形。前 5 关可直接跳过；全军覆没才会失败。本模式不播放剧情。", [{
        id: "start",
        name: resume ? "继续随机棋模式" : "进入随机棋征程",
        rarity: "gold",
        text: resume ? "读取上次暂离的随机棋战局，不重新生成开局棋子和道具。" : "局内商店只出售积分加成与消耗品，完整敌军关刷新时有概率出现破军令；局外道具仅积分加成类生效。",
      }], async () => {
        UI.hideRewards();
        await options.selectMode("random");
      }, "story");
    }

    async function openRecruit() {
      const resume = await canResume("recruit");
      UI.showCards("招兵买马模式", "每轮开始前自由选择红方棋子并自由布阵，按棋子价值从当前积分中扣除出阵费用；积分不足或为负时不能开始。另免费发放“将帅出宫”和“仕出宫”，不计入 5 个开局随机道具，进入布阵前会展示本轮初始道具。每局结束后，留在敌方半场的存活棋子会随机撤回己方半场，己方半场棋子保持原位。拾取的变车、变后效果仅持续本局，帅也可变形。前 5 关可直接跳过；红方棋子全部被吃才会失败。本模式不播放剧情。", [{
        id: "start",
        name: resume ? "继续招兵买马模式" : "进入招兵买马征程",
        rarity: "gold",
        text: resume ? "读取上次暂离的招兵买马战局，保留当前棋子选择和布阵。" : "默认提供标准 16 子阵容，可在布阵阶段增删棋子；最多 16 枚，开始战斗时一次性结算费用。",
      }], async () => {
        UI.hideRewards();
        await options.selectMode("recruit");
      }, "story");
    }

    function openQuick() {
      UI.showCards("快速模式", "无需解锁，只进行一局。红方以全子开局并获得 5 个随机道具，抽取池包含尚未解锁的道具，进入战斗前会展示本局道具，且不会被关卡屏蔽；黑方必为全子，并从现有完整关卡中随机抽取，可能出现组合技。胜利固定奖励 1000 积分。本模式不播放剧情。", [{
        id: "start",
        name: "开始快速挑战",
        rarity: "purple",
        text: "每次进入都会重新随机关卡与开局道具，现有局外道具不生效。",
      }], async () => {
        UI.hideRewards();
        await options.selectQuick();
      }, "story");
    }

    function preActions() {
      const jump = async (level) => {
        const s = state();
        s.level = level;
        window.XQ.StateOps.beginLevel(s);
        options.render();
        await options.saveNow();
        Pre.refresh(s);
      };
      const grant = async () => {
        const s = state();
        s.score += 5000;
        options.render();
        await options.saveNow();
        Pre.refresh(s);
      };
      const grantSlot = async () => {
        const s = state();
        window.XQ.Progression.grantSlotUse(s);
        options.render();
        await options.saveNow();
        Pre.refresh(s);
      };
      return {
        normal: openNormal, rebel: openRebel, random: openRandom, recruit: openRecruit, quick: openQuick, slot: options.slot, load: options.manualLoad,
        talent: () => Menus.talent(state(), () => Pre.refresh(state()), { mainMenu: true }),
        achievements: () => window.XQ.Achievements.open(state()),
        codex: () => window.XQ.ItemCodex.open(state()),
        gallery: () => window.XQ.StoryGallery.open(state()),
        settings: options.settings,
        test: () => window.XQ.ComboNav.openTest(state(), { jump, grant, grantSlot }),
      };
    }

    return { activateCard, preActions, showNotices };
  },
};


/* story-defeats.js */
window.XQ = window.XQ || {};

window.XQ.DefeatStories={
  early: {
    title: "红帅关押记录",
    text: `义军兵败，折戟沉沙。身为义军指挥官的你被女兵们活捉，她们褪去你的战甲，将你赤裸的身躯捆绑在帅案之上。为首的女兵缓缓脱下战靴，露出包裹在黑色丝袜中的纤足。
「这就是号称战无不胜的指挥官？瞧瞧你现在的样子。」她的脚尖轻佻地点着你的胸口，每一次触碰都带来电流般的刺激。
其余女兵纷纷效仿，十几只形态各异的玉足在你身上游走。有穿着军靴的，有裹在棉袜里的，也有赤裸着的。每一种质地都给你带来不同的体验。
「听说你喜欢女人的脚？今日我们就让你一次尝个够。」为首女兵褪下半边丝袜，露出白皙的足背。她跨坐在桌沿，将脚伸向你的下身，「不知道指挥官喜欢哪种味道的？」
湿润的足趾隔着薄如蝉翼的丝袜轻轻摩挲着你的要害。另一名女兵则用她那双总是穿着绣花鞋的嫩足踩在你的胸膛上，鞋底的花纹清晰地印在皮肤上。
「啊，你硬了呢。」她咯咯笑着，故意用鞋尖挑逗你的乳首，「想不到指挥官这么变态，被女人的脚踩也会有感觉。」
越来越多的女兵加入进来。有的穿着过膝长靴，用坚硬的皮革摩擦你的大腿；有的只穿短袜，柔软的棉絮蹭过每一寸肌肤；还有几个调皮的，将沾满尘土的战靴直接按在你的脸上。
「乖乖听话，说不定我们会轻些对你。」为首女兵的丝袜脚已经覆上你的昂扬，时而用足弓环绕，时而用脚趾夹弄，「否则…」
她话未说完，旁边的女兵便用力踩了一下你的腹部。即便隔着一层丝袜，也能感受到那种独特的触感。你忍不住呻吟出声，换来更多嘲讽的笑声。
「看他爽的，口水都要流出来了。」
「这种变态就该好好教训。」
女兵们的言语如刀割般刺痛你的自尊，身体却诚实地对她们的服务做出反应。为首女兵的技巧相当娴熟，她时而用整只脚掌包裹住你的分身上下套弄，时而用灵巧的脚趾单独刺激敏感的前端。
其他女兵也不甘寂寞。她们用各种材质的足部包围着你，有的赤足直接接触皮肤，带来最纯粹的触感；有的穿着渔网袜，网格的纹路由上到下剐蹭着每一处神经；还有的特意换上了高跟鞋，用鞋跟轻轻戳弄你的会阴处。
「想要我们放过你也不是不可以。」为首女兵放缓了动作，似笑非笑地看着你，「只要你答应从此做个乖巧的小宠物，任我们玩弄。」
你还没来得及回答，另一只丝袜脚便强行挤进了你的口中。柔滑的触感充满了整个口腔，你不得不舔舐着这只脚的每一寸，包括那些因为长时间行走而留下的盐粒。
「既然说不出话，那就当你同意了。」为首的女兵加大了力度，两只丝袜包裹的脚形成一个完美的通道，快速套弄着你的勃发，「从今往后，你就算是我们的玩物了。」
女兵们爆发出欢呼声，她们交换着眼神，显然对接下来的游戏早有计划。而你只能躺在那里，任由这群胜利者用她们的脚肆意玩弄着你的身体，每一次触碰都可能带来全新的羞辱和快感…`,
    image: "./assets/generated/prison-piece-red-king.573e5002.webp",
    voice: "defeat-early",
  },
  late: {
    title: "义军兵败",
    text: `义军兵败，作为指挥官的你被女兵们反复羞辱后，终于被送往帝国都城。曌帝在金銮殿上设宴，表面上是犒赏三军，实际上是等着亲自处置你这个阶下囚。「朕久闻义军指挥官英勇善战，不想今日竟能亲眼目睹。」曌帝端坐在龙椅上，手中把玩着象牙镶金的玉笏，「来人，把他吊起来。」
两名宦官将你赤裸的身躯吊在半空中，双臂平展开来，恰好呈一个大字。曌帝慢悠悠地走上前来，仔细打量着你的身体。
「啧啧，果然是一表人才。不过…」他举起玉笏，在你结实的胸肌上轻轻拍了一下，立刻浮现出一道红痕，「朕最喜欢驯服桀骜不驯的野马了。」
玉笏再次落下，这次是对准了你的大腿内侧。每一下都不重，却刚好能让你感受到疼痛。你咬紧牙关，不让自己发出求饶声。
「不叫？很好，朕欣赏有骨气的人。」曌帝绕着你走了一圈，「听说你擅长打仗？那想必体力应该不错。让我们来测试一下。」
他示意左右退下，偌大的金殿上只剩下你们二人。曌帝缓缓解开外袍，露出一身锦绣蟒袍，手中玉笏依旧不曾放下。
「朕知道你心里不服，觉得女人天生就该臣服于男人。可你现在是什么样子？还不是像个祭品一样挂在这里？」
说着，玉笏重重拍在你的臀部。清脆的响声回荡在整个大殿，你咬破了嘴唇也不肯出声。曌帝见状，嘴角勾起一抹危险的笑容。
「嘴硬是吧？朕倒要看看你能撑多久。」
玉笏开始有节奏地落下，时而轻柔如羽毛拂过，时而重如泰山压顶。曌帝显然是此道高手，每一击都精准命中最敏感的部位，却偏偏避开了要害。
「疼吗？朕的手艺还不错吧？比起你以前见过的那些刑罚，这简直是小儿科。」
渐渐地，你的身体开始不受控制地发热。那些看似无关痛痒的击打，实则蕴含着特殊的韵律。曌帝每一次出手都恰到好处，让你在疼痛与快感的边缘徘徊。
「朕知道你在想什么。」他又拍了一下，正好打在你最敏感的地方，「你觉得朕这是在侮辱你？恰恰相反，这是朕给予的特殊待遇。」
玉笏的节奏越来越快，力量也逐渐加重。你的身体不由自主地扭动，却因为被吊着而无法躲避。汗水顺着肌肉线条流淌，在金色的光芒下闪着莹润的光泽。
「看看你自己，都已经兴奋起来了。」曌帝凑近你的耳边低语，温热的呼吸吹得你耳朵发痒，「你骨子里其实很喜欢这样被支配，不是吗？」
玉笏最后一次落下，这一次是对准了你的后腰。剧烈的疼痛让你忍不住叫出声来，同时也达到了某种奇特的解脱。你的意识开始模糊，只听见曌帝最后的话语：
「从今天起，你就是朕的玩物了。好好享受你的新身份吧。」`,
    image: "./assets/generated/rebel-defeat-cage.3d86d415.png",
    voice: "defeat-late",
  },
};


/* prison-story.js */
window.XQ = window.XQ || {};
window.XQ.PrisonStory=(() => {
  const IMAGES = {
    P: "./assets/generated/prison-piece-pawn.aa1290fb.webp",
    A: "./assets/generated/prison-piece-advisor.a1071e3f.webp",
    B: "./assets/generated/prison-piece-elephant.89a89e23.webp",
    N: "./assets/generated/prison-piece-rider.7118c3ac.webp",
    R: "./assets/generated/prison-piece-rook.8569d0ae.webp",
    C: "./assets/generated/prison-piece-cannon.a189b13b.webp",
    K: "./assets/generated/prison-piece-king.be788770.webp?v=20260722-1",
    S: "./assets/generated/prison-piece-bishop.df7d2cc0.webp?v=20260722-1",
    Q: "./assets/generated/prison-piece-queen.8c7f39b6.webp?v=20260722-1",
  };
  const BOX_IMAGE = "./assets/generated/prison-chess-box-base.8f1899b5.webp";
  const STORIES = {
    P: item("女兵·青禾关押记录", `
青禾跪在地上，纤细的手腕被粗绳紧缚在身后。她倔强地仰起头，试图用愤怒掩盖内心涌起的屈辱。
「放开我！你们这些卑鄙的叛贼！」
一名士兵冷笑：「卑鄙？昨日你搜刮民宅的时候，怎么不说这话？」
说着，他扯开青禾的衣领，露出里面雪白的肌肤。另一名士兵立即会意，粗暴地揉捏起她胸前的软肉。
「啊…不要…」青禾咬紧牙关，却被士兵撬开贝齿，腥臭的舌头立刻侵入她的口腔。
她的双腿无力地挣扎着，却被更多的人压制住。士兵们贪婪的目光在她身上游移，有人已经开始解开裤腰带。
「听说你们经常这样凌虐百姓？今天让你尝尝这滋味！」
粗糙的手掌探向她的腿心，对着秘处大力揉搓。青禾的身体不由自主地颤栗，羞耻的爱液顺着腿根流下。
「唔…嗯…」堵住的嘴发出含糊的呜咽声，曾经嚣张跋扈的女兵此刻如同待宰羔羊，任人摆布。
士兵们的笑声越来越放肆，更多的咸猪手覆上了她的身子。青禾紧闭双眼，不愿看见自己即将遭受的命运…
「带下去吧，好好「伺候」这位大小姐。」
几名壮汉架起浑身瘫软的青禾向外走去。她的衣物早已凌乱不堪，露出大片春光。身后传来她绝望的哭泣声，却很快被捂住了嘴。
「今晚有的是时间，慢慢品尝。」
黑暗中，更多的身影蠢蠢欲动。`, IMAGES.P, "prison-p"),
    A: item("书记官·砚秋关押记录", `砚秋软倒在地，华贵的裙装沾满泥污。她瑟缩着护住胸口，原本保养得宜的面容此刻满是惶恐。
「大人…我真的什么都不知道！是他们逼我，都是他们强迫我的！」
指挥官居高临下地看着她：「逼迫？伪造文书诬陷忠良，你可是亲手所书。」
砚秋的瞳孔猛然收缩。传闻中这位年轻将领手段狠辣，没想到会亲自处置她。
「求大人开恩…我可以做牛做马报答您…」
话音未落，指挥官已压了上来。他的手掌粗暴地揉捏着她的胸口，感受那份未经人世的柔软。
「做牛做马？我看你更适合做的是这个。」粗糙的布料摩擦着娇嫩的肌肤，砚秋不由得闷哼出声。她想要挣扎，却发现自己的身体竟起了反应。
指挥官一把掀起她的裙摆，露出里面洁白的胴体。他毫不客气地拨开布料，火热的肉刃抵在了湿润的穴口。
「啊！大人，请轻些…」没有任何预警，坚硬如铁的阳具便狠狠贯穿到底。砚秋惊呼一声，眼角渗出生理性的眼泪。
指挥官抓起她的右腿抬高，开始猛烈的抽送。每一次撞击都精准地碾过敏感之处，带出噗呲噗呲的水声。
「不愧是在朝廷历练过的，下面倒是够会吸的。」
砚秋羞耻地偏过头，却又忍不住偷瞄两人连接处的景象。指挥官的尺寸远超她以往经历过的，每一次进出都带来强烈的快感。
「看看这是什么？」他故意抽出一半，再重重插入，「你的身体可是诚实得很。」
浓郁的麝香味在空气中弥漫。砚秋闻到那混合着雄性荷尔蒙的气味，不由得咽了咽口水。她的身体背叛了理智，蜜穴不受控制地绞紧入侵者。
「大人…太大了…会坏掉的…」然而她身下的水声，却背叛了她口是心非，述说着她的意乱情迷。指挥官更加卖力地耕耘。囊袋拍打臀瓣的声音充斥整个空间，砚秋的意识渐渐模糊，只剩下本能的迎合。
「啊…要去了…大人…」汹涌的热流浇灌在他的分身上，指挥官却没有停下。反而趁着她最脆弱的时刻发起新一轮攻势。
「这才刚开始呢，我们有的是时间。」夜还很长，而砚秋注定要在这种极致的快乐与痛苦中度过…`, IMAGES.A, "prison-a"),
    B: item("骑象舞女·云岚关押记录", `云岚赤足踩在潮湿的土地上，七层薄纱缠绕的身躯狼狈地蜷缩。昔日歌舞升平的艳舞姬，此刻如同折翼的蝴蝶。
「大人饶命…我、我愿意献上所有财宝…」
指挥官缓步走近，目光落在她叮当作响的银铃上：「这就是你说的毒针？」云岚慌忙点头，却不料这个动作牵动了身上的束缚，让轻纱散落开来。雪白的肌肤若隐若现，她连忙想要遮掩，却被牢牢按住。
「看来我们的舞姬很懂得如何取悦男人呢。」
粗糙的手掌握住她纤细的脚踝，迫使她抬起右脚。云岚惊恐地发现，指挥官的视线正紧紧盯着她裸露的玉足。
「不…不要碰那里…」可话音刚落，她的足心便触及一片滚烫。原来指挥官已经解开了裤链，将灼热的欲望递到了她的面前。
「用你的脚，让我见识见识传说中能让男人神魂颠倒的本事。」
云岚羞耻难当，却不敢违抗。她小心翼翼地用足尖触碰那炽热的硬物，感受到它在自己碰触下一跳一跳地搏动。
「哦？这就让你这么激动了吗？」她故作镇定地说着，实则心跳如擂鼓。
玉足缓缓覆上，随时准备抚慰那坚挺炽物。云岚试探性地活动着脚掌，柔软的足底摩挲过每一寸轮廓。
指挥官发出一声满意的叹息：「继续。」
得到肯定，云岚胆子稍大了些。她模仿着过往服务过的贵族们的喜好，用脚趾轻轻刮挠敏感的头部，又用足弓有节奏地上下套弄。
「嘶…你的技术确实不错。」
鼓励的话语给了她信心。云岚不再拘谨，开始施展浑身解数。她的双足交替着动作，一只专注照料顶端，另一只则沿着茎身画圈揉捏。
粘稠的液体很快就沾湿了她的脚掌，在月光下泛着淫靡的光泽。云岚能感觉到手中的硬物变得更加炙热，搏动也愈发剧烈。
「看来我们的舞姬很享受呢。」指挥官注意到她微微扬起的嘴角。
云岚羞得满脸通红，却无法否认内心的躁动。她加快了脚上的动作，甚至大胆地用脚心去研磨那个不断冒出液体的小孔。
「真是天赋异禀。」指挥官低喘着说，「准备好接受赏赐了吗？」
还没等她回答，一股滚烫的液体便激射而出，溅满了她的娇躯。云岚惊讶地看着这一幕，下身竟然不由自主的湿润起来。
指挥官俯身在她耳边轻声道：「既然如此擅长，以后就在义军营中好好发挥你的才能吧。」
云岚的身体轻颤，不知是因为羞辱还是期待。她低头看着还在往下滴落的白浊，两腿间蜜穴一开一合，倏然情动。她第一次对自己的技艺感到既骄傲又迷茫…`, IMAGES.B, "prison-b"),
    N: item("女骑手·照夜关押记录", `照夜赤裸的身躯匍匐在地，月光照耀下如同一匹受伤的白鹿。曾经引以为傲的乌骓马早已随大军而去，只留下她在夜色中独自承受羞辱。
灰布蒙着眼，剥夺了她的视觉，却让其他感官愈发敏锐。粗糙的手掌撕扯着她的衣衫，一件件剥离，直到她彻底袒露在这群陌生人眼前。
冰凉的夜风掠过肌肤，激起遍体鳞毛。她本能地蜷缩身体，却被强行拉开四肢。温暖的血液涌向下腹，双腿间的秘处开始泛起湿润。
大地的震动越来越近。那熟悉而富有节奏的步伐，让她想起了无数个与马相伴的日子。当温热的鼻息扑在她的脸颊时，照夜的身体明显一颤。
「踏雪的气息…不，这不是踏雪…」记忆中的温度与现实中截然不同。这匹马的体温更高，气息也更为粗犷。当它的舌头舔舐她的肌肤时，照夜竟然感到一阵战栗的快感。
「指挥官驾到！」
伴随着通报声，马蹄停下了步伐。照夜茫然摸索着，却摸到了另一个方向——那是一个人形的轮廓，而非马匹。
指挥官翻身下马，冷漠地注视着这荒唐的一幕。他的战马仍在照夜身边徘徊，偶尔用鼻子拱拱她的手臂。
照夜跪立起身，本能地贴近那匹马。当柔软的唇瓣印上马儿湿润的鼻梁时，她自己都愣住了。
然而下一刻，更深的欲望占据了她的大脑。她的双手环抱住马颈，舌头探入马匹的口腔，忘情地纠缠。唾液混合着马匹特有的气息涌入她的口腔，她贪婪地吞咽着，仿佛这是世间最美妙的味道。
指挥官皱眉：「看来传闻不假，你果真与畜生有染。」
这句话点燃了照夜心中最深层的渴望。她跪爬到指挥官脚下，疯狂地撕扯他的靴子：「求您…谁都可以…给我…」
她的手指颤抖着探向下身，却发现那里的洪水已经泛滥。透明的爱液顺着大腿内侧流淌，在地上汇成小小的水洼。每当她的指尖划过充血的蕊珠，就会引起一阵痉挛般的快感。
「我不管是谁……快来占有我…」
照夜抬起泪眼朦胧的脸庞，即使看不见也能感受到那种赤裸裸的渴求。她的身体背叛了理智，只想被填满、被征服。
「您说过可以随意处置我，那就让我成为您的玩物吧！」
她转而亲吻马鞍的金属扣件，留下一串晶莹的痕迹。当粗糙的皮革摩擦过她的唇瓣时，她发出了猫一般满足的呜咽声。
指挥官沉默地观察着这一切，直到确认眼前的女子真的陷入癫狂。照夜趴伏在地，撅起丰盈的臀部，手指持续不断地刺激着自己：「求求您…我已经什么都顾不上了…只要能满足我就好…」`, IMAGES.N, "prison-n"),
    R: item("战车驾驶员·重霄关押记录", `重霄被押至战场边缘，她曾驾驶战车冲撞之处，如今只剩两道深深的车辙痕。泥土中隐约可见些许血迹——那是她曾折磨过的俘虏留下的。
「看看这些印记，你造成的伤害。」指挥官指向凹陷的土路，「每一道，都是无辜之人的悲鸣。」
重霄被推倒在车辙边，泥土透过破损的裙裾刺痛膝盖。当绳索捆上手腕时，她才真正明白处境的危险。
「你们不能这样对我——」
两名士兵打断了她的抗议。粗糙的麻绳在她身上绕了三圈，她的双手被反剪，直教她动弹不得。重霄不得不倚靠在车轮上，身体蜷缩着。
士兵们迅速褪去她剩余的衣物。初春的夜风凛冽，裸露的皮肤立刻泛起鸡皮疙瘩。重霄下意识地弓起背脊，却让麻绳收得更紧。
「记住这些伤痕。」一名士兵指着车辙中的淤泥，「都是你造成的。现在，让我们教你什么是真正的屈辱。」
冰冷粗糙的大手握住她的脚踝，迫使双腿大大分开。潮湿的泥土沾染上大腿内侧，她却无力拭去。更糟的是，士兵们开始在她的私处涂抹一种清凉的膏药。
「这是什么？别…啊！」
药效迅速发作。一阵阵酥麻感从小腹扩散开来，双腿之间变得湿润滑腻。重霄咬紧下唇，企图压抑体内升起的异样感觉。
「知道吗？这些俘虏就是在这条路上被你的战车碾过。」指挥官慢条斯理地说着，手中把玩着一个小巧的铜制物件。
他蹲下身，不顾重霄的挣扎，将那铜制物体塞入她湿润的花径。冰凉的触感激起一阵痉挛，重霄呜咽出声。
「这是刑具的一部分。接下来，我们会让你体验什么叫真正的煎熬。」
指挥官站起身，打了个手势。两个士兵立即上前，一人握住铜制把手的一端，开始缓慢转动。金属表面摩擦着内壁，每一次旋转都带来新的刺激。
「不…停下来！」重霄摇晃着脑袋，试图摆脱这诡异的快感。可麻绳限制了她的动作幅度，反而加剧了颈部的压迫感。
药膏的作用越来越明显。原本的不适转化成了强烈的渴求，蜜液不受控制地流出，在地上形成一小滩水渍。重霄恨透了自己的身体背叛了意志。
「看看你现在的样子，多么狼狈。」
指挥官取出一支蜡烛，火焰在夜风中跳跃。当他将融化的蜡油滴落在她赤裸的胴体上时，重霄忍不住尖叫起来。疼痛过后，却是另一种奇异的舒适感。
「求你…求求你结束这一切…」
她从未想过自己会说出这样的话。堂堂战车统领，如今却跪在这里乞求怜悯。可药物和刑具的双重作用下，她的理智正在崩溃。
「结束？不，这才刚刚开始。」
更多的蜡油落下，每一滴都在肌肤上绽放成一朵红色花朵。与此同时，铜制刑具的转速也在增加。重霄的呜咽变成了断断续续的呻吟，夹杂着快感的羞耻几乎将她吞噬。
夜还很长，而重霄的折磨才刚刚开始…`, IMAGES.R, "prison-r"),
    C: item("女控炮手·鸣砂关押记录", `鸣砂被推搡至那门曾经轰杀无数百姓的火炮旁。铁锈斑驳的炮身上还残留着硝烟的味道，提醒着她犯下的罪孽。
「站好了，不要动。」
冰冷的镣铐锁住她的脚踝，将她固定在炮管两端。铁质镣铐的重量迫使她踮起脚尖，重心不稳地保持着平衡。春寒料峭的夜里，单薄的衣物根本抵挡不了寒冷。
士兵们粗暴地撕开她的衣裙，露出因常年操炮而晒成小麦色的肌肤。铁质镣铐在她白皙的脚踝上勒出道道红痕，更显凄美。
「这就是你用来瞄准的炮口？」指挥官扶着她赤裸的肩膀，另一只手按在她头顶，迫使她低头看向黝黑的炮筒，「可惜了，你现在看不到它是如何对着你了。」
鸣砂咬紧牙关，倔强地扭开头。然而下一刻，冰冷的铁钩勾住了她的下巴，迫使她直视那黑洞洞的炮口。
「看清了吗？这才是你该面对的东西。」
炮口对准的角度正好对着她的下身，她能清楚看到自己是如何站在死亡武器之上。这个认知让她浑身发抖。
士兵们拿出特制的器具——几个铜制的圆环，上面连接着细绳。他们将这些圆环分别扣在她挺立的乳尖和私处的肉核上，细绳的另一端系在炮架上。
「这是为了让你记牢，炮火无情。」
轻轻一拉细绳，铜环便勒紧了脆弱的敏感处。鸣砂惊叫出声，身体不由自主地向前倾。然而镣铐限制了她的活动范围，每一次挣扎都只会让那些铜环收得更紧。
「不要！放开——啊！」
更多的机关被启动。炮架底部的装置开始运作，带动着那些铜环轻轻振动。每一下震动都让圆环变换角度，刺激着各个方向的嫩肉。
「这是模拟炮弹发射的震动。你应该很熟悉这种感觉吧？」
药膏被涂在她的乳尖和下腹。清凉的感觉很快变成灼热，体内的瘙痒越发难以忍受。她想要用手去缓解，却被牢牢禁锢住双手。
「求你们…不要再…啊～」
话未说完，炮口的方向被调整，一个更粗大的圆筒延伸出来，正好顶在她的双腿之间。士兵启动机关，那圆筒开始缓慢旋转。
「这是让你体会一下，被炮口顶着是什么感觉。」
光滑的金属表面摩擦着湿润的花瓣，每一次转动都带起一片水泽。鸣砂的腿开始发软，却因为镣铐的缘故无法逃避。
「记得你说过，炮击村镇只是玩乐对吧？现在玩玩这个如何？」
炮筒的转速越来越快，同时机关带动细绳忽紧忽松。多重刺激下，鸣砂的呻吟声越来越高亢。
「不…太快了…要去了！」
就在她即将到达顶点时，机关停止了运转。鸣砂虚弱地喘息着，身体却更加空虚。
「求求你们…让我去吧…」
羞耻的话语脱口而出，她恨不得咬断自己的舌头。然而身体的渴望战胜了一切理智，她开始扭动腰肢，试图重新获得快感。
「想要的话，就要付出代价。」指挥官掏出一叠文书，「这是你的供词，承认你的一切罪行。」
鸣砂犹豫了。然而新一轮的机关运转打断了她的思考。这次不只是圆环振动，炮筒也开始前后推进。
「我签！我全都招！求求你让我解脱…」
在极致的快感和痛苦交织中，鸣砂签下了自己的名字。当她再次达到高潮时，整个人虚脱地挂在镣铐上，只有炮架底部传来的嗡嗡声还在提醒着她刚才发生的一切…`, IMAGES.C, "prison-c"),
    K: item("女将·昭冥关押记录", `昭冥跌坐在帐中的虎皮毯上，曾经不可一世的女将此刻狼狈如丧家之犬。
「当初签发军令的时候，可曾想过会有今天？」指挥官手持一沓文书，在她面前摊开，「屠杀妇孺三千口，这字迹可是出自你手？」
昭冥面色铁青，死死盯着那些血淋淋的记录。她下意识地伸手想要夺取，却被一脚踹翻在地。
指挥官掏出一根细绳，不由分说将她的双手缚在背后，「既然你如此享受签署死刑，那我们也让你尝尝被人判决的滋味。」
绳索越收越紧，昭冥被迫挺起胸膛。她咬着下唇不肯开口，然而当指挥官拿出一罐药膏时，她的脸色变了。
「这是「蚀骨销魂」，专门惩治贪官污吏的。」药膏涂抹在她的胸口和小腹，立刻带来一阵麻痹感。紧接着，更可怕的事发生了。指挥官取来一套木枷，咔嚓一声锁住了她的脖子和双手。沉重的木枷迫使她弯下腰，却因双手被缚在身后而无法直起身体。药力渐起，昭冥感到一阵阵热流在体内游走。她想要挣脱，却被木枷死死钳制。最可怕的是，指挥官居然在她的额头上写下了一个大大的「斩」字！
「不！我没有做过那些事！是他们的主意，我只是执行命令！」
然而没有人相信她的辩解。在众人眼里，她就是那个签署屠村令的刽子手。药效越来越烈，她的意识开始模糊，只知道拼命扭动身体。
「求求你们…不要杀我…我愿意赎罪…」
堂堂女将跪在地上苦苦哀求，额头上的「斩」字随着她的动作而摇晃。没人理会她的话语，只当她是垂死挣扎。木枷的重量压得她几乎窒息，而药膏的作用则让她浑身燥热难当…`, IMAGES.K, "prison-k"),
    S: item("女主教·弦月关押记录", `弦月被剥去教袍后，瘦削的身体暴露在所有人面前。那副虔诚诵经的面孔此刻满是惶恐，十字架项链也被摘下扔在一旁。
「用神的名义欺骗他人，你可知罪？」
「我…我是真心信仰…」
「真心？那为何你的住处搜出这么多春药和淫具？」指挥官冷笑，「堂而皇之地在教堂里贩卖人口，你还敢说自己是神职人员？」
银色的项圈锁住她的脖颈，铁链另一端连着圣坛的十字架。她想要站起来，却因铁链长度不足而被迫保持跪姿。
「告诉我，你是如何用神谕诱骗那些无知妇孺的？」
药草制成的熏香在四周燃起，辛辣的气味呛得她咳嗽不止。更糟的是，这香气中混杂着一种特殊的成分——那是能撩拨情欲的异域香料。
「我说…我都说…」她开始供述自己的罪行，如何伪造神启，如何用药迷奸信徒，如何将无辜少女送往权贵之家。每一句话都说得声泪俱下，却换来更多的羞辱。
士兵们轮流将各种道具在她面前展示，那是她从前用来胁迫受害者的工具。每一项物品的出现都让她羞愧难当。
弦月的下身湿透，香料的效果太过猛烈，她再也无法掩饰内心的躁动。她想要遮掩双腿之间的狼藉，却被打得更开。
「看来神职人员也需要好好管教。」
冰冷的圣水泼在她脸上，短暂的清醒后是更加强烈的欲望。她跪伏在圣坛前，向着自己曾经崇拜的神明坦白一切罪行，而身体却违背意愿地渴求着…`, IMAGES.S, "prison-s"),
    Q: item("皇妃·绯宸关押记录", `绯宸华服尽褪，露出养尊处优的娇躯。作为曌帝宠妃，她的肌肤白皙如雪，却挡不住众人嫌恶的目光。
「贵妃娘娘好兴致，战场上还要戴满珠宝？」
「这些东西碍着你们什么事了？本宫要如何打扮是我的自由。」即便是此时，她依然不忘皇室威仪。
「自由？你可知道有多少人家妻离子散，只为供你一夜欢愉？」
铁链哗啦作响，将她吊在树上。双手被高举过头，迫使她踮起脚尖。每动一下，链子就会发出刺耳的声响。
「不要碰我的首饰！」当有人想要夺走她耳上的珍珠时，她尖叫出声。
「这些首饰，哪一件不是沾着血泪？」指挥官取出一个锦盒，里面是她从前收藏的账本，「这里记载着你的所有产业，还有那些被你设计陷害的官员名单。」
赤裸的双足悬空摇晃，她试图找到可以借力的地方。然而树下的士兵并不给她机会，而是不断将她轻轻往上推，让她永远处在半悬状态。
「这些都是你们栽赃！我可是曌帝的人！」
「曌帝？」指挥官啐了一口，「你以为他会来救你吗？」
月光洒在她裸露的身体上，映出一身细密的汗珠。即便处境凄惨，依然能看出昔日荣华的影子。她下意识地理了理头发，却发现连发簪都被拔去。
「求你们…至少留一件首饰给我…」这个要求让所有人哄笑。他们开始一件件地在她面前毁掉那些珠宝，每一声碎裂都敲在她心上。
「不要！那是我最喜欢的一对镯子！」
可悲的是，即使在这种时刻，她在意的依然是那些财物而非自身的处境。赤身裸体的她挂在那里，如同被剥皮的祭品，等待着未知的命运…`, IMAGES.Q, "prison-q"),
 };
  const RESCUE_NOTICE = item(
    "义军要员全部获救",
    "做得好，义军要员已全部救出，此后俘虏交由你自行处置。但要小心，你的活跃表现已经引起了曌帝注意…",
    BOX_IMAGE,
    "rescue-notice",
  );
  const EARLY_DEFEAT = window.XQ.DefeatStories.early;

  function item(title, text, image, voice) {
    return { title, text, image, voice };
  }

  return {
    earlyDefeat: EARLY_DEFEAT,
    get: (type) => STORIES[type],
    list: () => Object.values(STORIES),
    rescueNotice: RESCUE_NOTICE,
  };
})();


/* story-settings.js */
window.XQ = window.XQ || {};

window.XQ.StorySettings=(() => {
  function open(state, render, save, reset, resetOuter) {
    const mode = state.settings?.captureStoryMode || "story";
    const late = state.settings?.rebelDefeatStory !== false;
    const early = state.settings?.rebelEarlyDefeatStory !== false;
    const cards = [
      {
        id: "capture-mode",
        name: `俘获剧情：${mode === "story" ? "剧情弹窗" : "简洁提示"}`,
        rarity: mode === "story" ? "gold" : "green",
        text: mode === "story" ? "点击切换为简洁提示；首次俘获不再播放图文弹窗。" : "点击切换为剧情弹窗；首次俘获依次播放俘获与关押剧情。",
      },
      { id: "rebel-early-defeat", name: `${early ? "[开启] " : "[关闭] "}前期兵败剧情`, rarity: "purple", text: "义军第 15 关及以前兵败时，播放红帅关押剧情。" },
      { id: "rebel-defeat", name: `${late ? "[开启] " : "[关闭] "}后期兵败剧情`, rarity: "red", text: "义军通过第 15 关后兵败时，播放指挥官被俘剧情。" },
      { id: "reset-outer", name: "重置已解锁局外道具", rarity: "red", text: "清空传承锦囊、已购局外道具、双步虎符和改制解锁；积分、模式、图鉴与战绩保留。" },
      { id: "reset", name: "重置当前模式存档", rarity: "red", text: "仅重置当前模式进度；另一模式、共享积分与三个手动存档不受影响。" },
    ];
    window.XQ.Render.showCards("设置", "调整音量、剧情显示方式与存档选项。", cards, async (card) => {
      if (card.id === "reset") return confirmReset(reset);
      if (card.id === "reset-outer") return confirmOuterReset(resetOuter);
      if (card.id === "rebel-early-defeat") return toggle(state, "rebelEarlyDefeatStory", !early, "前期兵败剧情", render, save, reset, resetOuter);
      if (card.id === "rebel-defeat") return toggle(state, "rebelDefeatStory", !late, "后期兵败剧情", render, save, reset, resetOuter);
      if (card.id !== "capture-mode") return;
      state.settings = state.settings || {};
      state.settings.captureStoryMode = mode === "story" ? "brief" : "story";
      await save();
      render();
      window.XQ.Render.banner(state.settings.captureStoryMode === "story" ? "已启用剧情弹窗" : "已启用简洁提示");
      open(state, render, save, reset, resetOuter);
    }, "save");
  }

  async function toggle(state, key, value, label, render, save, reset, resetOuter) {
    state.settings[key] = value;
    await save();
    render();
    window.XQ.Render.banner(value ? `已开启${label}` : `已关闭${label}`);
    open(state, render, save, reset, resetOuter);
  }

  function confirmReset(reset) {
    window.XQ.Render.showCards("重置当前模式存档", "请先使用手动存档保存需要保留的进度。重置不会影响另一模式、共享积分或手动存档。", [{
      id: "confirm", name: "确认重置", rarity: "red", text: "清空当前模式的关卡、棋局和局内道具，并返回第一关。",
    }], async () => {
      await reset();
      window.XQ.Render.hideRewards();
      window.XQ.Render.banner("当前模式自动存档已重置");
    }, "save");
  }

  function confirmOuterReset(resetOuter) {
    window.XQ.Render.showCards("重置已解锁局外道具", "此操作不会返还已花费积分，也不会影响模式解锁、剧情图鉴、战绩或手动存档。", [{
      id: "confirm-outer",
      name: "再次确认并重置",
      rarity: "red",
      text: "清空所有已购局外道具、传承栏、局外双步虎符与主教/皇后改制解锁。",
    }], async () => {
      await resetOuter();
      window.XQ.Render.hideRewards();
      window.XQ.Render.banner("已重置局外道具");
    }, "save");
  }

  return { open };
})();


/* story-gallery.js */
window.XQ = window.XQ || {};

window.XQ.StoryGallery=(() => {
  function open(state) {
    const t = state.talents || {};
    const cards = [
      galleryCard(
        "capture",
        "棋子被俘剧情图鉴",
        t.captureGalleryUnlocked,
        "首次战败后解锁。",
        "浏览全部兵种的俘获剧情与插图。",
      ),
      galleryCard(
        "prison",
        "关押剧情图鉴",
        t.prisonGalleryUnlocked,
        "义军通关第 15 关后解锁。",
        "浏览全部兵种的关押记录与棋盒插图。",
      ),
      galleryCard(
        "defeat",
        "义军兵败剧情图鉴",
        t.defeatGalleryUnlocked,
        "义军通关第 15 关后解锁。",
        "浏览前期红帅关押与后期指挥官被俘两则剧情。",
      ),
    ];
    window.XQ.Render.showCards("剧情画廊", "浏览已解锁的剧情图鉴。", cards, (card) => {
      if (!card.unlocked) return window.XQ.Render.banner(card.lockedText);
      window.XQ.Render.hideRewards();
      return window.XQ.CaptureStory.openGallery(card.gallery, state, { returnToGallery: true });
    }, "story");
  }

  function galleryCard(gallery, name, unlocked, lockedText, text) {
    return {
      id: `${gallery}-gallery`,
      gallery,
      name,
      rarity: "purple",
      unlocked: Boolean(unlocked),
      lockedText,
      text: unlocked ? text : lockedText,
    };
  }

  return { open };
})();


/* story-voice.js */
window.XQ = window.XQ || {};

window.XQ.StoryVoice=(() => {
  const BASE_PATH = "./assets/audio/story/";
  const ASSET_VERSION = "20260722-1";
  const audio = new Audio();
  let currentId = "";
  let requestId = 0;
  let initialized = false;
  let unlocked = false;
  let voiceVolume = 1;

  audio.preload = "none";

  function init() {
    if (initialized) return;
    initialized = true;
    document.getElementById("captureVoiceBtn")?.addEventListener("click", toggle);
    document.addEventListener("pointerdown", unlock, { capture: true, once: true });
    audio.addEventListener("playing", () => update("pause"));
    audio.addEventListener("pause", () => {
      if (!audio.ended && currentId) update("play");
    });
    audio.addEventListener("ended", () => update("play"));
    audio.addEventListener("error", () => update("error"));
    update("hidden");
  }

  function prepare(id) {
    stop();
    currentId = validId(id) ? id : "";
    update(currentId ? "play" : "hidden");
  }

  async function playCurrent(automatic = false) {
    if (!currentId) return false;
    const playId = ++requestId;
    const src = `${BASE_PATH}${currentId}.mp3?v=${ASSET_VERSION}`;
    if (audio.dataset.voiceId !== currentId) {
      audio.src = src;
      audio.dataset.voiceId = currentId;
    }
    update("loading");
    try {
      audio.muted = false;
      audio.volume = Math.min(1, voiceVolume);
      await audio.play();
      if (playId !== requestId) return false;
      update("pause");
      return true;
    } catch (err) {
      if (playId !== requestId) return false;
      console.warn("story voice failed:", err?.name || "unknown", err?.message || "");
      update(automatic ? "play" : "error");
      return false;
    }
  }

  function toggle() {
    if (!currentId) return;
    if (!audio.paused) {
      audio.pause();
      return;
    }
    playCurrent(false);
  }

  function stop() {
    requestId += 1;
    audio.pause();
    try {
      audio.currentTime = 0;
    } catch (err) {
      console.warn("story voice reset failed:", err.message);
    }
  }

  async function unlock(event) {
    if (unlocked) return;
    unlocked = true;
    if (event.target?.closest?.("#captureVoiceBtn")) return;
    try {
      audio.muted = true;
      audio.src = `${BASE_PATH}capture-p.mp3`;
      audio.dataset.voiceId = "";
      await audio.play();
      audio.pause();
      audio.currentTime = 0;
      audio.removeAttribute("src");
      audio.load();
    } catch (err) {
      console.warn("story voice unlock failed:", err?.name || "unknown", err?.message || "");
    } finally {
      audio.muted = false;
    }
  }

  function update(state) {
    const button = document.getElementById("captureVoiceBtn");
    const status = document.getElementById("captureVoiceStatus");
    if (!button || !status) return;
    button.classList.toggle("hidden", state === "hidden");
    button.disabled = state === "loading";
    button.setAttribute("aria-pressed", String(state === "pause"));
    const labels = {
      play: ["▶ 朗读", "离线语音"],
      pause: ["Ⅱ 暂停", "正在朗读"],
      loading: ["… 加载", "正在准备语音"],
      error: ["↻ 重试", "语音加载失败"],
      hidden: ["▶ 朗读", ""],
    };
    [button.textContent, status.textContent] = labels[state] || labels.play;
  }

  function validId(id) {
    return typeof id === "string" && /^[a-z0-9-]+$/.test(id);
  }

  function setVolume(value) {
    voiceVolume = Math.min(2.25, Math.max(0, Number(value) || 0));
    audio.volume = Math.min(1, voiceVolume);
  }

  return { init, playCurrent, prepare, setVolume, stop, volumeAware: true };
})();


/* capture-story.js */
window.XQ = window.XQ || {};

window.XQ.CaptureStory=(() => {
  const STORIES = {
    P: story("女兵·青禾", "曾陪同青禾入城搜捕抢掠的小队，此刻均逃作鸟兽散，只留她一人负隅顽抗。“你们不过是人多欺负人少！”堵嘴也止不住的怒骂，却在你一句“那些被抢掠的百姓，也是仗着人多欺负你吗”过后戛然无声。", "./assets/generated/capture-pawn.a544a2d4.webp", "capture-p"),
    A: story("书记官·砚秋", "砚秋替曌帝伪造罪名，编撰处决名册有功，被遣来前线镀金。遭俘时她正与主将耳鬓厮磨，以图上位。她双手护胸，柔媚的声线此刻颤抖不止。遭她残害者的死状让她急于否认罪证，却只能徒劳地重复“我是被逼的”。", "./assets/generated/capture-advisor.0d331202.webp", "capture-a"),
    B: story("骑象舞女·云岚", "云岚的裙下之臣多遭其暗害，七重纱艳舞之下无数风流亡魂，男人不过是其股间玩物。战象力竭后，她穿着缀铃轻纱战衣从象背跃下，被围后仍摆出妩媚舞姿拖延时间，直到藏在铃中的毒针被搜出。", "./assets/generated/capture-elephant.e83b0680.webp", "capture-b"),
    N: story("女骑手·照夜", "照夜以追猎逃民为乐。曾言“男人不如马”。然而照夜落逃时，马鞭都抽断了，只落得个摔马被俘的下场。遭擒的打击，远不如朝夕共寝的爱马弃她而去的打击大，在她眼中，男人又算什么呢？", "./assets/generated/capture-rider.0a64a20d.webp", "capture-n"),
    R: story("战车驾驶员·重霄", "当战车撞上铁壁，重霄只想起那些褴褛佝偻的俘虏男丁们，被捆缚、被车轮拖曳的时惨叫。异地处之，重霄被推倒在车辙旁时，她万念俱灰，泫然欲泣。", "./assets/generated/capture-rook.3408da1c.webp", "capture-r"),
    C: story("女控炮手·鸣砂", "鸣砂曾炮击拒绝纳贡的村镇。彼时她自认为不过是玩乐。辙乱旗靡、军阵大乱的当下，她面对义军调转的炮口，眼中只剩贪生的泪水。", "./assets/generated/capture-cannon.06a5a6df.webp", "capture-c"),
    K: story("女将·昭冥", "昭冥曾亲自签发多道屠村军令。在她眼中，百姓还不如投怀送抱的美人一根手指重要。营帐被围时她尚在颠鸾倒凤，匆忙之下找不到铠甲，手边仅余一顶证明身份的缨盔。", "./assets/generated/capture-king.e20faa22.webp", "capture-k"),
    S: story("女主教·弦月", "弦月用伪造神谕骗走无数家庭的男婴用作娈童。舶来教的教义被她肆意扭曲，只为一己私欲。虚伪的布道连同教袍一起被撕开时，露出了她方便性事而真空的胴体。", "./assets/generated/capture-bishop.b230e385.webp", "capture-s"),
    Q: story("皇妃·绯宸", "绯宸正是多次清洗行动的献策者。自恃曌帝之威无人能敌，疆场上仍贪图金银玉石。酒色淫乐深入骨髓的她，被俘时紧盯的不是长剑，而是幻想在持剑者裆下承欢。", "./assets/generated/capture-queen.cb601c30.webp", "capture-q"),
  };
  const REBEL_STORIES = Object.fromEntries(Object.entries(STORIES).map(([type, item]) => [type, {
    ...item,
    voice: type === "P" ? item.voice : `rebel-capture-${type.toLowerCase()}`,
    text: type === "P"
      ? item.text
      : `${item.text} 她面对为男丁复仇的义军并无悔意；义军没有回应她的败犬吠鸣，只记录罪证并将她严密看押，用以交换义军要员。`,
  }]));
  const REBEL_DEFEAT = window.XQ.DefeatStories.late;
  const $ = (id) => document.getElementById(id);
  let resolveStory = null;
  let galleryIndex = 0;
  let galleryItems = [];
  let galleryTitle = "";
  let currentImage = "";
  let galleryReturnState = null;

  function story(title, text, image, voice) {
    return { title, text, image, voice };
  }

  function init() {
    window.XQ.StoryVoice.init();
    $("captureCloseBtn").addEventListener("click", close);
    $("captureModal").addEventListener("click", (event) => {
      if (event.target === $("captureModal")) close();
    });
    $("capturePrevBtn").addEventListener("click", () => showGallery(galleryIndex - 1));
    $("captureNextBtn").addEventListener("click", () => showGallery(galleryIndex + 1));
    $("captureRetryBtn").addEventListener("click", () => loadImage(currentImage, true));
  }

  async function show(state, type) {
    if (["random", "recruit", "quick"].includes(state?.mode)) return;
    const item = collection(state)[type];
    if (!item) return;
    if (state.settings?.captureStoryMode === "brief") {
      window.XQ.Render.banner(`首次俘获：${item.title}`);
      return;
    }
    fill(type, "本轮首次俘获", state);
    $("captureNav").classList.add("hidden");
    $("captureModal").classList.remove("hidden");
    window.XQ.StoryVoice.playCurrent(true);
    await new Promise((resolve) => { resolveStory = resolve; });
    if (isPostRescue(state)) await showItem(window.XQ.PrisonStory.get(type), "关押记录", true);
  }

  async function showRescueNotice() {
    await showItem(window.XQ.PrisonStory.rescueNotice, "义军战报");
  }

  async function showItem(item, eyebrow, autoPlay = false) {
    if (!item) return;
    fillItem(item, eyebrow);
    $("captureNav").classList.add("hidden");
    $("captureModal").classList.remove("hidden");
    if (autoPlay) window.XQ.StoryVoice.playCurrent(true);
    await new Promise((resolve) => { resolveStory = resolve; });
  }

  async function showRebelDefeat() {
    fillItem(REBEL_DEFEAT, "义军败局");
    $("captureNav").classList.add("hidden");
    $("captureModal").classList.remove("hidden");
    window.XQ.StoryVoice.playCurrent(true);
    await new Promise((resolve) => { resolveStory = resolve; });
  }

  async function showRebelEarlyDefeat() {
    await showItem(window.XQ.PrisonStory.earlyDefeat, "义军败局", true);
  }

  function openSettings(state, render, save, reset, resetOuter) {
    return window.XQ.StorySettings.open(state, render, save, reset, resetOuter);
  }

  function openGallery(kind, state, options = {}) {
    const galleries = {
      capture: [state.talents?.captureGalleryUnlocked, Object.values(STORIES), "棋子被俘剧情图鉴", "首次战败后解锁俘获图鉴"],
      prison: [state.talents?.prisonGalleryUnlocked, window.XQ.PrisonStory.list(), "关押剧情图鉴", "义军通关第 15 关后解锁关押图鉴"],
      defeat: [state.talents?.defeatGalleryUnlocked, [window.XQ.PrisonStory.earlyDefeat, REBEL_DEFEAT], "义军兵败剧情图鉴", "义军通关第 15 关后解锁兵败图鉴"],
    };
    const [unlocked, items, title, lockedText] = galleries[kind] || [];
    if (!unlocked) return window.XQ.Render.banner(lockedText || "图鉴尚未解锁");
    galleryReturnState = options.returnToGallery ? state : null;
    galleryItems = items;
    galleryTitle = title;
    showGallery(0);
    $("captureNav").classList.remove("hidden");
    $("captureModal").classList.remove("hidden");
  }

  function showGallery(index) {
    if (!galleryItems.length) return;
    galleryIndex = (index + galleryItems.length) % galleryItems.length;
    fillItem(galleryItems[galleryIndex], galleryTitle);
    $("captureIndex").textContent = `${galleryIndex + 1} / ${galleryItems.length}`;
  }

  function fill(type, eyebrow, state) {
    const item = collection(state)[type];
    fillItem(item, eyebrow);
  }

  function fillItem(item, eyebrow) {
    $("captureEyebrow").textContent = eyebrow;
    $("captureTitle").textContent = item.title;
    $("captureText").textContent = item.text;
    $("captureImage").alt = `${item.title}被俘剧情插图`;
    currentImage = item.image;
    window.XQ.StoryVoice.prepare(item.voice);
    loadImage(item.image);
  }

  function loadImage(src, retry = false) {
    const image = $("captureImage");
    const error = $("captureImageError");
    image.classList.remove("hidden");
    error.classList.add("hidden");
    image.onload = () => error.classList.add("hidden");
    image.onerror = () => {
      image.classList.add("hidden");
      error.classList.remove("hidden");
    };
    const suffix = retry ? `${src.includes("?") ? "&" : "?"}retry=${Date.now()}` : "";
    image.src = `${src}${suffix}`;
  }

  function collection(state) {
    return state?.mode === "rebel" && !isPostRescue(state) ? REBEL_STORIES : STORIES;
  }

  function isPostRescue(state) {
    return state?.mode === "rebel" && state.level > 15;
  }

  function close() {
    window.XQ.StoryVoice.stop();
    $("captureModal").classList.add("hidden");
    const returnState = galleryReturnState;
    galleryReturnState = null;
    const resolve = resolveStory;
    resolveStory = null;
    resolve?.();
    if (returnState) window.XQ.StoryGallery.open(returnState);
  }

  return { init, openGallery, openSettings, show, showRebelDefeat, showRebelEarlyDefeat, showRescueNotice };
})();


/* combat-feedback.js */
window.XQ = window.XQ || {};

window.XQ.CombatFeedback=(() => {
  const C = window.XQ.Config;
  const R = window.XQ.Rules;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function pieceLabel(piece) {
    if (!piece) return "棋子";
    const side = piece.side === "b" ? "黑方" : piece.side === "r" ? "红方" : "";
    return `${side}${C.labels[piece.side]?.[piece.type] || piece.type}`;
  }

  function pieceElement(id) {
    return [...document.querySelectorAll(".piece")].find((piece) => piece.dataset.pieceId === id);
  }

  function point(board, x, y) {
    return {
      x: board.clientWidth * (0.055 + (x / 8) * 0.89),
      y: board.clientHeight * (0.05 + (y / 9) * 0.9),
    };
  }

  function addTrace(move) {
    const board = document.getElementById("board");
    if (!board || !move?.from) return;
    const start = point(board, move.from.x, move.from.y);
    const end = point(board, move.x, move.y);
    const trace = document.createElement("div");
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    trace.className = "combat-trace";
    trace.style.left = `${start.x}px`;
    trace.style.top = `${start.y}px`;
    trace.style.width = `${Math.hypot(dx, dy)}px`;
    trace.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
    board.appendChild(trace);
  }

  function addMarker(move, text) {
    const board = document.getElementById("board");
    if (!board || !move) return;
    const marker = document.createElement("div");
    marker.className = "combat-marker";
    marker.textContent = text;
    marker.style.left = `${5.5 + (move.x / 8) * 89}%`;
    marker.style.top = `${5 + (move.y / 9) * 90}%`;
    board.appendChild(marker);
  }

  function showAlert(kind, title, detail) {
    document.querySelectorAll(".combat-alert").forEach((node) => node.remove());
    const wrap = document.querySelector(".board-wrap");
    if (!wrap) return null;
    const alert = document.createElement("div");
    alert.className = `combat-alert combat-${kind}`;
    alert.setAttribute("role", "status");
    alert.innerHTML = `<strong>${title}</strong><span>${detail}</span>`;
    wrap.appendChild(alert);
    return alert;
  }

  function checkedKing(state, side) {
    const king = state.board.find((piece) => piece.side === side && piece.type === "K");
    return king && R.inCheck(state.board, side, state) ? king : null;
  }

  async function present(state) {
    const move = state.lastMove;
    if (!move) return;
    const attacker = state.board.find((piece) => piece.id === move.id);
    const checkedSide = move.side === "b" ? "r" : "b";
    const king = checkedKing(state, checkedSide);
    if (!move.captured && !king) return;
    addTrace(move);
    pieceElement(move.id)?.classList.add("impact");
    if (move.captured) addMarker(move, "吃");
    if (king) pieceElement(king.id)?.classList.add("under-check");
    const captureText = move.captured ? `${pieceLabel(attacker)}吃掉${pieceLabel(move.captured)}` : "";
    const checkText = king ? `${pieceLabel(attacker)}正在威胁${pieceLabel(king)}` : "";
    const title = king ? "将军" : "吃子";
    const detail = [captureText, checkText].filter(Boolean).join("，");
    const alert = showAlert(king ? "check" : "capture", title, detail);
    window.XQ.FX.tone(king ? 430 : move.side === "b" ? 250 : 500, king ? 150 : 90);
    await sleep(move.side === "b" ? (king ? 950 : 760) : (king ? 720 : 480));
    alert?.remove();
  }

  function lossDetail(state, fallback) {
    const move = state.lastMove;
    const attacker = state.board.find((piece) => piece.id === move?.id);
    const king = state.board.find((piece) => piece.side === "r" && piece.type === "K");
    if (!king && move?.captured?.type === "K") {
      return `${pieceLabel(attacker)}沿标出的路线落到帅位，红帅被擒。`;
    }
    if (king && R.inCheck(state.board, "r", state)) {
      return `${pieceLabel(attacker)}形成将军，红帅已没有合法解围走法。`;
    }
    if (move?.captured) {
      return `${pieceLabel(attacker)}沿标出的路线吃掉${pieceLabel(move.captured)}。${fallback || "红方已无合法走法。"}`;
    }
    return fallback || "红方已无合法走法，本局在这里结束。";
  }

  async function beforeLoss(state, fallback) {
    if (state.lastMove?.side !== "b" || state.phase !== "play") return;
    document.querySelectorAll(".combat-trace, .combat-marker").forEach((node) => node.remove());
    addTrace(state.lastMove);
    addMarker(state.lastMove, "终");
    pieceElement(state.lastMove.id)?.classList.add("impact");
    const alert = showAlert("defeat", "局势已定", lossDetail(state, fallback));
    window.XQ.FX.tone(190, 220);
    await sleep(1900);
    alert?.remove();
  }

  return { beforeLoss, present };
})();


/* battle.js */
window.XQ = window.XQ || {};
window.XQ.Battle={
  create(options) {
    const R = window.XQ.Rules, L = window.XQ.Levels, UI = window.XQ.Render;
    const FX = window.XQ.FX, Ops = window.XQ.StateOps, D = window.XQ.Drops;
    const Story = window.XQ.CaptureStory, Feedback = window.XQ.CombatFeedback, runtime = options.runtime;
    function state() { return options.getState(); }
    async function onPiece(id) {
      const s = state();
      if (runtime.busy() || await window.XQ.RandomPlacement.handlePiece(s, id)) return;
      if (s.phase !== "play" || s.side !== "r") return;
      await runtime.run("board", async () => {
        const piece = s.board.find((item) => item.id === id);
        if (!piece || await special(s, piece)) return;
        if (piece.side !== "r") {
          return window.XQ.BoardPreview.handlePiece(s, piece, moveTo, options.render);
        }
        window.XQ.BoardPreview.clear(s);
        s.selected = id;
        s.legal = R.legalMoves(s.board, id, s);
        s.message = s.legal.length ? "选择落点" : R.inCheck(s.board, "r", s) ? "红帅正被将军；这枚棋子当前没有合法解围走法" : "这枚棋子当前无合法走法";
        options.render();
      });
    }
    async function special(s, piece) {
      const Act = window.XQ.Actions;
      for (const handler of [Act.destroy, Act.weaken, Act.donate, Act.morph]) {
        const result = await handler(s, piece);
        if (!result) continue;
        if (result.changed || result.killed) {
          window.XQ.MoveRecord?.event?.(s, s.message, "item");
          options.render();
          await options.saveNow();
          await checkOutcome();
        }
        return true;
      }
      return false;
    }
    async function onMove(x, y) {
      const s = state();
      if (runtime.busy() || (s.phase !== "play" && !s.pendingRevive && !window.XQ.RandomPlacement.active(s))) return;
      await runtime.run("board", () => moveTo(x, y));
    }
    async function moveTo(x, y) {
      const s = state();
      if (await window.XQ.RandomPlacement.handleMove(s, x, y)) return;
      if (s.pendingRevive) {
        if (!s.legal.some((move) => move.x === x && move.y === y)) return;
        Ops.snapshot(s);
        const result = await window.XQ.Revive.place(s, x, y);
        if (!result) return;
        if (result.text) UI.banner(result.text);
        if (!await checkOutcome() && s.side === "r") {
          if (result.consumesAction) finishRed();
          else options.render();
        }
        return saveAndContinue();
      }
      if (!s.selected || !s.legal.some((move) => move.x === x && move.y === y)) return;
      window.XQ.BoardPreview.clear(s); Ops.snapshot(s);
      const event = await applyMove(s.selected, x, y, "r");
      if (event.text) UI.banner(event.text);
      options.render();
      await Feedback.present(s);
      if (event.story) await Story.show(s, event.story);
      if (!await checkOutcome() && s.side === "r") finishRed();
      return saveAndContinue();
    }
    async function applyMove(id, x, y, side) {
      const s = state();
      const result = R.move(s.board, id, x, y);
      const mover = s.board.find((piece) => piece.id === id);
      s.board = result.board;
      s.lastMove = { id, x, y, from: result.from, side, piece: mover ? { side: mover.side, type: mover.type } : null, captured: null };
      s.lastActionCaptured = false;
      let text = "", story = "", charmText = "";
      if (result.captured) {
        if (side === "r" && result.captured.side === "n" && result.captured.type === "G" && s.enemyFish?.active) Object.assign(s.enemyFish, { skipNextGrass: true, turns: 0 });
        text = window.XQ.Turtle.trigger(s, result, id) || window.XQ.KingGuard.trigger(s, result, id) || window.XQ.Rabbit.trigger(s, result, id);
        if (!text) {
          s.lastActionCaptured = true;
          if (side === "r" && result.captured.side === "b") {
            s.score += window.XQ.Items.captureScore(s, result.captured.type); const seen = s.mode === "rebel" && s.level > 15 ? s.postRescueStorySeen : s.captureStorySeen;
            if (!["random", "recruit", "quick"].includes(s.mode) && !seen.includes(result.captured.type)) {
              seen.push(result.captured.type);
              story = result.captured.type;
            }
            if (s.enemyMomentum?.active) s.enemyBonusMoves = Math.min(2, (s.enemyBonusMoves || 0) + 1);
            charmText = [window.XQ.LinkedBranches?.onBlackCaptured?.(s, result.captured), window.XQ.Karma?.onRedCapture?.(s, id), window.XQ.Corruption?.onRedCapture?.(s, id)].filter(Boolean).join("\n");
          } else if (side === "b" && result.captured.side === "r") {
            window.XQ.Mode.redCaptured(s, result.captured);
            charmText = [window.XQ.Charm?.onBlackCapture?.(s, result, id), window.XQ.Corruption?.onBlackCapture?.(s, id), window.XQ.Sacrifice?.onCapture?.(s, side, result.captured)].filter(Boolean).join("\n");
          } else if (side === "b" && result.captured.side === "b") charmText = [window.XQ.LinkedBranches?.onBlackCaptured?.(s, result.captured), window.XQ.Sacrifice?.onCapture?.(s, side, result.captured)].filter(Boolean).join("\n");
        }
        FX.tone(side === "r" ? 520 : 220, 80);
      } else FX.tone(side === "r" ? 360 : 180, 45);
      s.lastMove.captured = s.lastActionCaptured ? { ...result.captured } : null;
      window.XQ.MoveRecord.add(s, s.lastMove);
      const moverAlive = s.board.some((piece) => piece.id === id);
      const tileText = text || !moverAlive ? "" : (window.XQ.Charm?.onRedMove?.(s, id) || window.XQ.Collapse?.enter?.(s, id, side) || "");
      const dropText = text || tileText || !moverAlive ? "" : await D.collect(s, id, side); const mechanismText = [text, charmText, tileText].filter(Boolean).join("\n");
      window.XQ.MoveRecord?.effect?.(s, mechanismText, "mechanism"); window.XQ.MoveRecord?.effect?.(s, dropText, "item");
      text = [mechanismText, dropText].filter(Boolean).join("\n");
      return { text, story };
    }
    function finishRed() {
      const s = state();
      const flow = window.XQ.TurnFlow.afterRedAction(s);
      window.XQ.BoardPreview.clear(s); s.selected = null; s.legal = [];
      if (s.playerMovesLeft > 0) s.message = flow.reason === "meteor-warning"
        ? "未吃子，飒沓流星失效，黑方即将行动三次"
        : `红方继续行动，还剩 ${s.playerMovesLeft} 步`;
      else {
        s.side = "b";
        s.message = flow.reason === "meteor" ? `飒沓流星反噬：黑方将连续行动 ${s.enemyMovesLeft} 步`
          : s.enemyMovesLeft > 1 ? `盈不可久：黑方将连续行动 ${s.enemyMovesLeft} 步` : "黑方思考中";
      }
      if (flow.notice) { window.XQ.MoveRecord?.effect?.(s, flow.notice, "mechanism"); UI.banner(flow.notice); }
      options.render();
    }
    async function enemyTurn() {
      const s = state();
      if (runtime.isLocked("enemy") || s.phase !== "play" || s.side !== "b") return;
      await runtime.run("enemy", async () => {
        if (s.enemyFrozen > 0) skipEnemy(s);
        else {
          const move = window.XQ.AI.choose(s);
          if (!move) return options.win("黑方无路可走，破阵成功");
          const event = await applyMove(move.id, move.x, move.y, "b");
          if (event.text) UI.banner(event.text);
          options.render();
          await Feedback.present(s);
          if (await checkOutcome()) return;
          window.XQ.Turtle.afterEnemyAction(s); window.XQ.Rabbit.afterEnemyAction(s);
          finishEnemy(s);
          if (s.side === "r" && window.XQ.Outcome.redLocked(s) && await checkOutcome()) return;
        }
        options.render();
        void options.saveSoon();
        if (s.phase === "play" && s.side === "b") setTimeout(enemyTurn, 420);
      });
    }
    function skipEnemy(s) {
      s.enemyFrozen -= 1;
      s.enemyMovesLeft = 0; window.XQ.MoveRecord?.event?.(s, "冻结生效，黑方跳过行动", "item");
      startPlayer(s, "冻结生效，黑方跳过行动");
    }
    function finishEnemy(s) {
      if ((s.enemyMovesLeft || 1) > 1) {
        s.enemyMovesLeft -= 1;
        s.message = s.enemyTurnSource === "meteor"
          ? `飒沓流星反噬：黑方继续行动，还剩 ${s.enemyMovesLeft} 步`
          : `盈不可久：黑方继续行动，还剩 ${s.enemyMovesLeft} 步`;
      } else if (s.playerFrozen > 0) {
        s.playerFrozen -= 1;
        s.enemyMovesLeft = 0;
        s.message = ["冻结生效，红方跳过行动", window.XQ.RoundEffects?.skipPlayerTurn?.(s)].filter(Boolean).join("\n");
        window.XQ.MoveRecord?.event?.(s, s.message, "mechanism");
        D.spawn(s, false);
      } else {
        startPlayer(s, R.inCheck(s.board, "r", s) ? "红帅被将军，先解围" : "红方行动");
        window.XQ.RandomMode.passLocked(s, R);
      }
    }
    function startPlayer(s, message) {
      s.side = "r";
      s.playerMovesLeft = (L.hasTempo(s) ? 2 : 1) + (s.playerBonusMoves || 0);
      s.playerBonusMoves = 0; s.enemyMovesLeft = 0; s.enemyTurnSource = null;
      const note = window.XQ.KingGuard.refreshDivine(s);
      const meteor = window.XQ.Meteor.startTurn(s);
      D.spawn(s, false);
      const round = window.XQ.RoundEffects?.startTurn?.(s);
      s.message = [message, note, meteor, round].filter(Boolean).join("\n"); window.XQ.MoveRecord?.event?.(s, [note, meteor, round].filter(Boolean).join("\n"), meteor ? "item" : "mechanism");
    }
    async function checkOutcome() {
      const s = state();
      if (window.XQ.RandomPlacement.active(s)) return false;
      const randomResult = await window.XQ.RandomMode.checkOutcome(s, options, R);
      if (randomResult !== null) return randomResult;
      let result = null;
      if (window.XQ.Outcome.onlyKings(s)) result = options.lose("红方只剩红帅，按挑战规则本局结束");
      else if (!s.board.some((piece) => piece.side === "r" && piece.type === "K")) result = options.lose();
      else if (!s.board.some((piece) => piece.side === "b" && piece.type === "K")) result = options.win("斩将成功");
      else if (!R.sideMoves(s.board, "b", s).length) result = options.win("黑方无合法走法");
      else if (s.side === "r" && window.XQ.Outcome.redLocked(s)) result = options.lose("红方无合法走法，挑战失败");
      if (result) {
        await result;
        return true;
      }
      return false;
    }
    async function saveAndContinue() {
      options.render();
      void options.saveSoon();
      if (state().phase === "play" && state().side === "b") setTimeout(enemyTurn, 420);
    }
    return { checkOutcome, enemyTurn, onMove, onPiece };
  },
};


/* move-record.js */
window.XQ = window.XQ || {};

window.XQ.MoveRecord=(() => {
  const NUMBERS = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const $ = (id) => document.getElementById(id);
  let getState = () => null;

  function file(side, x) {
    return NUMBERS[side === "r" ? 8 - x : x] || String(x + 1);
  }

  function direction(move) {
    const delta = move.y - move.from.y;
    if (!delta) return "";
    const forward = move.side === "r" ? delta < 0 : delta > 0;
    return forward ? "进" : "退";
  }

  function steps(move) {
    return NUMBERS[Math.max(0, Math.abs(move.y - move.from.y) - 1)] || String(Math.abs(move.y - move.from.y));
  }

  function notation(move) {
    if (!move?.from || !move.piece) return "";
    const label = window.XQ.Config.labels[move.side]?.[move.piece.type] || move.piece.type;
    const start = file(move.side, move.from.x);
    const end = file(move.side, move.x);
    const dx = move.x - move.from.x;
    const dy = move.y - move.from.y;
    if (dx && dy && move.piece.type === "N") return `${label}${start}${direction(move)}${end}`;
    if (dx && dy && move.piece.type !== "N") return `${label}${start}平${end}${direction(move)}${steps(move)}`;
    if (dx) return `${label}${start}平${end}`;
    return `${label}${start}${direction(move)}${steps(move)}`;
  }

  function add(state, move) {
    const text = notation(move);
    if (!text) return;
    state.moveRecords = state.moveRecords || [];
    state.moveRecords.push({ kind: "move", side: move.side, text, effects: [] });
  }

  function lines(text) {
    return String(text || "").split("\n").map((line) => line.trim().replace(/[。；]+$/, "")).filter(Boolean);
  }

  function effect(state, text, eventKind = "mechanism") {
    if (!state || !text) return;
    const records = state.moveRecords || [];
    const move = [...records].reverse().find((record) => record.kind !== "event");
    if (!move) return event(state, text, eventKind);
    move.effects = move.effects || [];
    lines(text).forEach((line) => { if (!move.effects.includes(line)) move.effects.push(line); });
  }

  function event(state, text, eventKind = "mechanism") {
    if (!state || !text) return;
    state.moveRecords = state.moveRecords || [];
    lines(text).forEach((line) => {
      const previous = state.moveRecords[state.moveRecords.length - 1];
      if (previous?.kind === "event" && previous.text === line) return;
      state.moveRecords.push({ kind: "event", eventKind, text: line });
    });
  }

  function format(record) {
    const effects = record.effects?.length ? `（${record.effects.join("；")}）` : "";
    return `${record.side === "r" ? "红" : "黑"}：${record.text}${effects}`;
  }

  function render(state) {
    const list = $("moveRecordList");
    const empty = $("moveRecordEmpty");
    const count = $("moveRecordCount");
    if (!list || !empty || !count) return;
    const records = state?.moveRecords || [];
    list.innerHTML = "";
    const moves = records.filter((record) => record.kind !== "event").length;
    const events = records.length - moves;
    count.textContent = events ? `${moves} 手 · ${events} 条战报` : `${moves} 手`;
    empty.classList.toggle("hidden", records.length > 0);
    let turn = 0;
    records.forEach((record) => {
      if (record.kind === "event") {
        const report = document.createElement("div");
        report.className = `move-record-event ${record.eventKind || "mechanism"}`;
        const badge = document.createElement("strong");
        badge.textContent = ({ item: "道具", result: "战况" })[record.eventKind] || "机制";
        const text = document.createElement("span");
        text.textContent = record.text;
        report.append(badge, text);
        list.appendChild(report);
        return;
      }
      turn += 1;
      const row = document.createElement("div");
      row.className = `move-record-row ${record.side === "r" ? "red" : "black"}`;
      const number = document.createElement("span");
      number.className = "move-record-number";
      number.textContent = `${turn}.`;
      const entry = document.createElement("span");
      entry.className = `move-record-entry ${record.side === "r" ? "red" : "black"}`;
      entry.textContent = format(record);
      row.append(number, entry);
      list.appendChild(row);
    });
  }

  function open(state = getState()) {
    render(state);
    $("moveRecordModal")?.classList.remove("hidden");
  }

  function close() {
    $("moveRecordModal")?.classList.add("hidden");
  }

  function configure(nextGetState) {
    getState = nextGetState;
    $("moveRecordCloseBtn")?.addEventListener("click", close);
    $("moveRecordModal")?.addEventListener("click", (event) => {
      if (event.target.id === "moveRecordModal") close();
    });
  }

  return { add, close, configure, effect, event, format, notation, open, render };
})();


/* app.js */
window.XQ = window.XQ || {};
(() => {
  const UI = window.XQ.Render;
  const Store = window.XQ.Storage;
  const FX = window.XQ.FX;
  const Menus = window.XQ.Menus;
  const Ops = window.XQ.StateOps;
  const Pre = window.XQ.Prebattle;
  let state;
  let runtime;
  let battle;
  let support;
  let modeSession;
  function render() { state.view = {
      hintCost: window.XQ.Items.hintCost(state),
      maxMoves: window.XQ.Levels.hasTempo(state) ? 2 : 1,
      scoreMult: window.XQ.Late.scoreMult(state),
      levelName: window.XQ.Levels.levelName(state),
    };
    UI.update(state, { piece: battle?.onPiece, move: battle?.onMove, busy: runtime?.busy() });
  }
  function announceScoreAchievements() { const unlocked = window.XQ.Achievements.checkScore(state); if (unlocked.length) UI.banner(unlocked.join(" ")); }
  function saveSoon() {
    announceScoreAchievements(); window.XQ.Mode.updateRecord(state);
    return runtime.queue();
  }
  function saveNow() {
    announceScoreAchievements(); window.XQ.Mode.updateRecord(state);
    return runtime.flush();
  }
  async function win(text) {
    const result = window.XQ.Outcome.settleWin(state, text);
    UI.banner(text || "破阵成功");
    if (window.XQ.QuickMode.is(state)) {
      state.battleInProgress = false; render();
      await saveNow();
      return window.XQ.QuickMode.showEnd(state, true, leaveToMenu);
    }
    if (state.mode === "rebel" && state.level === 15) await window.XQ.CaptureStory.showRescueNotice();
    const unlocked = (result.unlocked || []).join(" ");
    const rewardText = window.XQ.RandomMode.is(state) ? "获得本关随机道具后继续进军。" : "选择一个奖励继续进军。";
    UI.rewards(result.rewards || [], pickReward, `${unlocked}${state.lastSettlement.formula}。${rewardText}`);
    render();
    await saveNow();
  }
  async function pickReward(card) {
    window.XQ.Outcome.applyReward(state, card);
    UI.hideRewards();
    render();
    await saveNow();
    if (card.id === "revive") await window.XQ.Revive.start(state, render);
  }
  async function nextLevel() {
    if (state.phase !== "rewarded" && !(["normal", "random", "recruit"].includes(state.mode) && state.phase === "play" && state.level <= 5)) return;
    state.level += 1;
    Ops.beginLevel(state);
    render();
    await saveNow();
    if (!support.showNotices()) UI.banner(window.XQ.Levels.hasTempo(state) ? "双行动继续生效" : "敌军整备完成");
  }
  async function lose(text) {
    if (state.phase === "lost") return;
    await window.XQ.CombatFeedback.beforeLoss(state, text);
    state.phase = "lost";
    UI.banner(text || "红帅被擒，积分保留");
    if (window.XQ.QuickMode.is(state)) {
      const unlocked = window.XQ.Achievements.complete(state, "firstDefeat");
      state.battleInProgress = false; render();
      await saveNow();
      return window.XQ.QuickMode.showEnd(state, false, leaveToMenu, unlocked);
    }
    await window.XQ.RunEnd.fail(state, async () => {
      const result = Ops.newRun(state);
      replace(state, result.next);
      render();
      await saveNow();
      Pre.show(state, support.preActions());
    });
  }
  async function restore() {
    if (!Ops.restore(state)) return UI.banner("没有可悔棋的记录");
    render();
    await saveNow();
  }
  async function showHint() {
    const cost = window.XQ.Items.hintCost(state);
    if (state.score < cost) return UI.banner("积分不足，无法提示");
    const best = window.XQ.AI.hint(state);
    if (!best) return UI.banner("当前没有可用提示");
    state.score -= cost;
    state.selected = best.id;
    state.legal = window.XQ.Rules.legalMoves(state.board, best.id, state).filter((move) => move.x === best.x && move.y === best.y);
    state.message = "提示已高亮一个推荐落点";
    render();
    await saveNow();
  }
  async function restartLevel() {
    state.score = Math.min(state.score, state.levelStartScore ?? state.score);
    Ops.restartLevel(state);
    render();
    await saveNow();
    if (!support.showNotices()) UI.banner("已重开本关卡");
  }
  async function manualLoad() {
    await Menus.load(state, async () => {
      render();
      await saveNow();
      Pre.refresh(state);
    });
  }
  function openSettings() {
    window.XQ.CaptureStory.openSettings(state, render, saveNow, resetCurrent, resetOuterUnlocks);
  }
  async function resetCurrent() {
    await modeSession.resetCurrent();
  }
  async function resetOuterUnlocks() {
    window.XQ.Progression.resetOuterUnlocks(state);
    render();
    await saveNow();
    Pre.refresh(state);
  }
  async function leaveToMenu() {
    closeMore();
    if (!(await saveNow())) return;
    Pre.show(state, support.preActions());
  }
  function openSlot() {
    Pre.hide();
    window.XQ.SlotMachine.open(state, {
      save: saveNow,
      onUpdate: () => { render(); Pre.refresh(state); },
      onClose: () => Pre.show(state, support.preActions()),
    });
  }
  async function enterBattle() {
    Pre.hide();
    render();
    if (await battle.checkOutcome()) return;
    support.showNotices();
    if (state.side === "b" && state.phase === "play") setTimeout(battle.enemyTurn, 420);
  }
  async function boot() {
    FX.loading("progress", { phase: "start", message: "Preparing Xiangqi Rogue" });
    UI.init();
    window.XQ.CaptureStory.init();
    window.XQ.MoveRecord.configure(() => state);
    FX.loading("progress", { phase: "runtime_initializing", message: "Loading save data" });
    state = window.XQ.Levels.baseState(await Store.getInitial());
    runtime = window.XQ.Runtime.create(() => state, render);
    battle = window.XQ.Battle.create({ getState: () => state, runtime, render, saveNow, saveSoon, win, lose });
    modeSession = window.XQ.ModeSession.create({
      getState: () => state, render, saveNow, enterBattle,
    });
    support = window.XQ.AppSupport.create({
      getState: () => state, render, saveNow, saveSoon, manualLoad,
      enterBattle, selectMode: modeSession.select, selectQuick: modeSession.startQuick, settings: openSettings, slot: openSlot,
    });
    window.XQ.RandomPlacement.configure({ getState: () => state, render, save: saveSoon, flush: saveNow });
    window.XQ.Shooter.configure({ getState: () => state, render, saveNow, win, lose });
    if (!state.board?.length) Ops.beginLevel(state);
    bind();
    render();
    Pre.show(state, support.preActions());
    requestAnimationFrame(() => FX.loading("ready"));
  }
  function bind() {
    runtime.bind("restartBtn", "restart", restartLevel);
    runtime.bind("hintBtn", "hint", showHint);
    runtime.bind("undoBtn", "restore", restore);
    runtime.bind("nextBtn", "level", nextLevel);
    runtime.bind("shopBtn", "shop", () => { closeMore(); return Menus.shop(state, render, support.activateCard); });
    document.getElementById("moreBtn").addEventListener("click", toggleMore);
    runtime.bind("talentBtn", "talent", () => { closeMore(); return Menus.talent(state, render); });
    runtime.bind("itemsBtn", "items", () => { closeMore(); return Menus.showItems(state, render); });
    runtime.bind("saveBtn", "save", () => { closeMore(); return Menus.save(state); });
    runtime.bind("loadBtn", "load", () => { closeMore(); return manualLoad(); });
    runtime.bind("settingsBtn", "settings", () => { closeMore(); return openSettings(); });
    runtime.bind("moveRecordBtn", "move-record", () => { closeMore(); window.XQ.MoveRecord.open(state); });
    runtime.bind("leaveBtn", "leave", leaveToMenu);
    runtime.bind("giveUpBtn", "give-up", () => { closeMore(); return state.phase === "play" && lose(); }); window.XQ.UiHints?.bind?.();
  }
  function toggleMore() {
    const panel = document.getElementById("morePanel");
    const open = panel.classList.toggle("hidden") === false;
    document.getElementById("moreBtn").setAttribute("aria-expanded", String(open));
  }
  function closeMore() {
    document.getElementById("morePanel").classList.add("hidden");
    document.getElementById("moreBtn").setAttribute("aria-expanded", "false");
  }
  function replace(target, source) {
    Object.keys(target).forEach((key) => delete target[key]); Object.assign(target, source);
  }
  boot().catch((err) => {
    console.error("boot failed:", err?.code || "unknown", err.message, err.stack);
    FX.loading("error", "BOOT_FAILED", err.message);
    document.body.innerHTML = '<main class="game-shell"><h1>加载失败，请刷新重试</h1></main>';
  });
})();

