window.XQ = window.XQ || {};

window.XQ.ComboNav = (() => {
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
