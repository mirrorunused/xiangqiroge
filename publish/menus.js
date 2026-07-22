window.XQ = window.XQ || {};

window.XQ.Menus = (() => {
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
    const modes = ["normal", "rebel", "random", "quick"];
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
    const autos = await Promise.all([Store.getMode("normal"), Store.getMode("rebel"), Store.getMode("random")]);
    const saves = await Promise.all([1, 2, 3].map((slot) => Store.getManual(slot)));
    const cards = [
      { id: "normal", mode: "normal", name: "读取常规自动存档", rarity: "gold", text: Store.describe(autos[0]) },
      { id: "rebel", mode: "rebel", name: "读取义军自动存档", rarity: "red", text: Store.describe(autos[1]) },
      { id: "random", mode: "random", name: "读取随机棋自动存档", rarity: "purple", text: Store.describe(autos[2]) },
    ]
      .concat([1, 2, 3].map((slot, index) => ({ id: slot, name: `读取手动存档 ${slot}`, rarity: "green", text: Store.describe(saves[index]) })));
    UI.showCards("读取存档", "三种模式自动存档相互独立，手动存档仍可保存任一模式。", cards, async (card) => {
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
    return mode === "rebel" ? "义军" : mode === "random" ? "随机棋" : mode === "quick" ? "快速" : "常规";
  }

  function battleModeLabel(mode) {
    return mode === "rebel" ? "义军破敌" : mode === "random" ? "随机棋模式" : mode === "quick" ? "快速模式" : "常规模式";
  }

  return { load, save, shop, showItems, talent };
})();
