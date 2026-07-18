window.XQ = window.XQ || {};

window.XQ.ShopState = (() => {
  const I = window.XQ.Items;

  function prepare(state) {
    if (!state.shop || state.shop.level !== state.level || !Array.isArray(state.shop.cards)) reset(state);
    state.shop.cards = state.shop.cards.filter((card) => card.stacks !== false || I.count(state, card.baseId || card.id) === 0);
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
    if (free) state.freeRefreshes -= 1;
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
    return baseRefreshCost(state) > 0 && (state.freeRefreshes || 0) > 0;
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
