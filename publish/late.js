window.XQ = window.XQ || {};

window.XQ.Late = (() => {
  const traitPool = ["guard", "elephantRiver", "horseStep", "horseLeap", "horseRun", "horseFly", "advisorFree", "kingFree", "kingGuard"];
  const traitNames = { guard: "铁壁营", elephantRiver: "象过河", horseStep: "马位移", horseLeap: "马腾跃", horseRun: "马驰骋", horseFly: "马踏飞燕", advisorFree: "士出宫", kingFree: "将帅出宫", kingGuard: "护驾符" };
  const weights = { banner: 0.25, mult: 0.25, cannon: 0.35, tempo: 0.05 };
  const rebelComboStart = 16;
  const comboBlocks = [["turtle"], ["fish"], ["rabbit"], ["divine"], ["collapse"], ["eunuch", "horse1", "horse2", "horse3", "horse4"], ["momentum"]];
  const comboIds = comboBlocks.flat();

  function finalQueenLevel() {
    return window.XQ.EnemyStages.lateBase(window.XQ.Config.blackAddOrder.length);
  }

  function startLevel(state) {
    state.dropRefreshLocked = false;
    if (state.level === finalQueenLevel() + 1) addEnemyTrait(state);
    if (state.mode !== "quick" && state.level >= finalQueenLevel() + 2) suppressItems(state);
    if (state.mode === "rebel") startRebelCombo(state);
    else startFixedCombo(state);
    if (state.level >= finalQueenLevel() + 4) lockDrops(state);
  }

  function startFixedCombo(state) {
    const offset = state.level - finalQueenLevel();
    const fixed = {
      8: "turtle", 9: "fish", 10: "rabbit", 11: "divine", 12: "collapse",
      13: "eunuch", 14: "horse1", 15: "horse2", 16: "horse3", 17: "horse4", 18: "momentum",
    };
    applyCombo(state, fixed[offset]);
  }

  function startRebelCombo(state) {
    const index = state.level - rebelComboStart;
    if (index < 0) return;
    ensureRebelComboOrder(state);
    applyCombo(state, state.rebelComboOrder[index]);
  }

  function ensureRebelComboOrder(state) {
    const current = Array.isArray(state.rebelComboOrder) ? state.rebelComboOrder : [];
    if (current.length === comboIds.length && comboIds.every((id) => current.includes(id))) return current;
    if (current.length === comboIds.length - 1 && comboIds.filter((id) => id !== "eunuch").every((id) => current.includes(id))) {
      const migrated = [...current];
      migrated.splice(Math.max(0, migrated.indexOf("horse1")), 0, "eunuch");
      state.rebelComboOrder = migrated;
      return migrated;
    }
    const blocks = comboBlocks.map((block) => [...block]);
    for (let i = blocks.length - 1; i > 0; i -= 1) {
      const pick = Math.floor(Math.random() * (i + 1));
      [blocks[i], blocks[pick]] = [blocks[pick], blocks[i]];
    }
    state.rebelComboOrder = blocks.flat();
    return state.rebelComboOrder;
  }

  function rebelComboLevels(state) {
    return ensureRebelComboOrder(state).map((id, index) => ({ id, level: rebelComboStart + index }));
  }

  function applyCombo(state, id) {
    if (id === "turtle") turtleCombo(state);
    if (id === "fish") fishCombo(state);
    if (id === "rabbit") rabbitCombo(state);
    if (id === "divine") divineCombo(state);
    if (id === "collapse") collapseCombo(state);
    if (id === "eunuch") eunuchCombo(state);
    if (id?.startsWith("horse")) horseCombo(state, Number(id.slice(5)));
    if (id === "momentum") momentumCombo(state);
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
    const horse4 = state.mode === "rebel"
      ? rebelComboLevels(state).find((entry) => entry.id === "horse4")?.level
      : finalQueenLevel() + 17;
    return level > horse4;
  }

  return { activeItems, ensureRebelComboOrder, horseSeriesComplete, rebelComboLevels, scoreMult, startLevel };
})();
