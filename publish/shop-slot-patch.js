window.XQ = window.XQ || {};

(() => {
  const SHARED_IDS = new Set(["revive", "letMove", "donate"]);
  let items;

  function sharedCards(value, level, state) {
    const cards = [];
    if (state.board?.some((piece) => piece.side === "r" && piece.type !== "K")) {
      cards.push({
        id: "donate",
        name: "献子筹饷",
        rarity: "green",
        text: "选择己方非帅棋子赠予敌军，按棋子价值获得积分。",
        cost: 0,
      });
    }
    const points = 240 + level * 40;
    cards.push({
      id: "letMove",
      name: "让你一招",
      rarity: "gold",
      text: `立即获得 ${points} 积分，黑方下次额外行动一回合。`,
      cost: 0,
      points,
    });
    const revive = window.XQ.Config?.randomItems?.find((item) => item.id === "revive");
    if (revive && (state.capturedRed || []).length && value.canOffer(state, revive, "shop")) {
      const card = value.makeCard(revive, level);
      card.cost = 140 + level * 24 + 55;
      cards.push(card);
    }
    return cards.map((card) => ({ ...card, sharedSlot: true }));
  }

  function install(value) {
    if (!value?.shop || value.shop.sharedReviveSlot) return;
    const original = value.shop;
    const wrapped = function wrappedShop(level, state) {
      if (!["rebel", "random"].includes(state?.mode)) return original.call(this, level, state);
      const captured = state.capturedRed;
      let cards;
      try {
        state.capturedRed = [];
        cards = original.call(this, level, state);
      } finally {
        state.capturedRed = captured;
      }
      const candidates = sharedCards(value, level, state);
      const chosen = candidates[Math.floor(Math.random() * candidates.length)];
      return (cards || []).filter((card) => !SHARED_IDS.has(card.id)).concat(chosen);
    };
    wrapped.sharedReviveSlot = true;
    value.shop = wrapped;
  }

  Object.defineProperty(window.XQ, "Items", {
    configurable: true,
    enumerable: true,
    get() { return items; },
    set(value) {
      items = value;
      install(value);
    },
  });
})();
