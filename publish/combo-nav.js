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
    horse1: ["纵马1", "gold", "黑方持有马位移，本关 2 卒化马。"],
    horse2: ["纵马2", "gold", "黑方增加马腾跃，本关 3 卒化马。"],
    horse3: ["纵马3", "red", "黑方增加马驰骋，本关 4 卒化马。"],
    horse4: ["纵马4", "red", "黑方持有全马道具，本关 5 卒化马。"],
    momentum: ["盈不可久", "red", "红方每次吃子会使黑方下次多走一步，最多累计 2 步。"],
  };

  function card(id, level) {
    const [name, rarity, text] = details[id];
    return { id: `${id}-${level}`, name: `直达${name}`, rarity, text, level };
  }

  function cards(state) {
    if (state.mode === "rebel") {
      return window.XQ.Late.rebelComboLevels(state).map((entry) => card(entry.id, entry.level));
    }
    const final = base();
    return ["turtle", "fish", "rabbit", "divine", "collapse", "eunuch", "horse1", "horse2", "horse3", "horse4", "momentum"]
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
    const testCards = [{ id: "grant-score", name: "获得积分", rarity: "red", text: "测试用：立即获得 5000 积分。" }].concat(cards(state));
    window.XQ.Render.showCards("测试入口", `当前第 ${state.level} 关。`, testCards, async (card) => {
      window.XQ.Render.hideRewards();
      if (card.id === "grant-score") {
        await actions.grant();
        window.XQ.Render.banner("测试积分 +5000");
        return;
      }
      await actions.jump(card.level);
      window.XQ.Render.banner(`已直达第 ${card.level} 关`);
    }, "save");
  }

  return { open, openTest };
})();
