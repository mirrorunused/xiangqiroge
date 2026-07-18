window.XQ = window.XQ || {};

window.XQ.Menus = (() => {
  const UI = window.XQ.Render;
  const Store = window.XQ.Storage;
  const Core = window.XQ.Core;
  const Items = window.XQ.Items;
  const Ops = window.XQ.StateOps;
  const labels = window.XQ.Config.labels.r;

  async function persist(state) {
    const ok = await Store.flush(state, (message) => UI.banner(message));
    if (!ok) UI.banner("关键进度未能写入本地备份，请稍后重试");
    return ok;
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

  async function talent(state, done) {
    const cards = [Items.talent(state)].concat(Items.outerCards(state.level, state));
    UI.showCards("局外天赋", `当前积分 ${state.score}。局外道具按卡牌说明生效。`, cards, async (card) => {
      const real = [Items.talent(state)].concat(Items.outerCards(state.level, state))
        .find((item) => item.id === card.id && item.name === card.name);
      if (!real) return UI.banner("天赋列表已变化，请重新打开");
      const bought = Items.buyTalent(state, real);
      if (bought !== true) return UI.banner(bought || "当前无法购买该天赋");
      UI.hideRewards();
      UI.banner(`解锁 ${real.name}`);
      await persist(state);
      await done?.();
    }, "shop");
  }

  function showItems(state, done) {
    const limit = state.talents?.retain || 0;
    const items = state.items.concat((state.talents.outerItems || []).map((i) => ({ ...i, outer: true })));
    const base = items.length ? items.map((item) => itemCard(state, item, limit)) : [emptyCard()];
    UI.showCards("现有道具", limit ? `点击局内道具可预选保留，最多 ${limit} 个。` : "当前没有保留天赋。", base, async (card) => {
      if (card.action === "sell") return sellItem(state, card.uid, done);
      if (!card.uid || card.outer) return;
      const toggled = Ops.toggleKeep(state, card.uid);
      if (toggled !== true) return UI.banner(toggled);
      await persist(state);
      done();
      showItems(state, done);
    }, "save");
  }

  function itemCard(state, item, limit) {
    const kept = state.keepUids?.includes(item.uid);
    const blocked = state.suppressedItemUids?.includes(item.uid);
    const activeOuter = state.mode === "rebel" && item.outer && item.uid === state.rebelOuterUid;
    const opening = state.mode === "random" && item.randomLocked;
    const randomOuter = state.mode === "random" && item.outer;
    const randomActive = randomOuter && ["banner", "cannon", "mult"].includes(item.id);
    return {
      ...item,
      name: `${blocked ? "[屏蔽] " : ""}${kept ? "[保留] " : ""}${opening ? "[初始] " : ""}${randomActive ? "[生效] " : randomOuter ? "[停用] " : activeOuter ? "[带入] " : item.outer ? "[局外] " : ""}${item.name}`,
      text: blocked ? `${item.text} 本关效果被屏蔽，暂不可出售。` : opening ? `${item.text} 本轮初始道具，不可出售。` : randomOuter && !randomActive ? `${item.text} 随机棋模式仅启用积分加成类局外道具。` : item.text,
      actions: blocked || opening || item.outer || item.id.startsWith("morph-") ? [] : [{ id: "sell", label: "出售" }],
    };
  }

  async function sellItem(state, uid, done) {
    const gained = Items.sell(state, uid);
    if (!gained) return UI.banner("该道具当前无法出售");
    UI.banner(`出售成功，积分 +${gained}`);
    await persist(state);
    done();
    showItems(state, done);
  }

  function emptyCard() {
    return { id: "empty", name: "暂无道具", rarity: "white", text: "继续过关或在商店购买道具。" };
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
      if (!state.coreOffline) await Core.call("saveManual", state, { slot: card.id }, "手动存档失败", "manual-save");
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

  return { load, save, shop, showItems, talent };
})();
