window.XQ = window.XQ || {};
window.XQ.Items = (() => {
  const C = window.XQ.Config;
  function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }
  function weightedRand(arr, state, source) {
    const typeByItem = { advisorRiver: "A", elephantRiver: "B" };
    return window.XQ.ItemRoll.pick(arr, (item) => (state?.board?.some((p) => p.side === "r" && p.type === typeByItem[item.id]) ? 3 : 1)
      * (source === "shop" ? window.XQ.ItemRoll.shopBonus(item) : 1));
  }
  function uid() { return `i${Date.now()}${Math.random().toString(16).slice(2)}`; }
  function normalize(state) {
    state.items = (state.items || []).map((item) => item.uid ? item : { ...item, uid: uid() }); window.XQ.ConsumableState.normalize(state);
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
    if (!["rebel", "random"].includes(state.mode) || !(state.capturedRed || []).length) return null;
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
      if (["rebel", "random"].includes(state.mode)) excluded.push("revive");
      normal.push(randomCard(level, state, excluded, "shop"));
    }
    normal.forEach((card, index) => {
      const cost = 140 + level * 24 + index * 55;
      const double = ["rookPhoenix", "rabbitFoot", "turtleShell", "advisorStride"].includes(card.id);
      card.cost = double ? Math.round(cost * 2) : card.id === "meteor" ? window.XQ.Meteor.cost(level) : card.id === "offboard" ? 620 + level * 30 : card.id === "kingGuard" ? 800 : card.id === "charmMakeup" ? 680 : card.id === "endure" ? 720 : card.id === "shopFree" ? 10 : card.id === "supply" ? Math.max(1, Math.floor((card.points || cost) / 2)) : cost;
      if (state.talents?.shopUnlocks?.horseSale && ["horseStep", "horseLeap", "horseRun", "horseFly"].includes(card.id)) card.cost = Math.max(1, Math.round(card.cost / 2));
    });
    const cards = normal.concat(morphCards(level, state), destroyCard(state), tacticCard(level, state)); return state.mode === "random" ? window.XQ.RandomMode.shop(level, state, cards) : cards;
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
