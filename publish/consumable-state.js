window.XQ = window.XQ || {};

window.XQ.ConsumableState = (() => {
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
