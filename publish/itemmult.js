window.XQ = window.XQ || {};

window.XQ.ItemMult = (() => {
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
