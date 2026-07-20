window.XQ = window.XQ || {};

window.XQ.ItemRoll = (() => {
  function rarityWeight(item) {
    return window.XQ.Config.rarityWeights?.[item?.rarity] || 1;
  }

  function shopBonus(item) {
    return window.XQ.Config.shopWeightBonuses?.[item?.id] || 1;
  }

  function pick(items, bonus = () => 1) {
    if (!items.length) return null;
    const weighted = items.map((item) => ({
      item,
      weight: Math.max(0, rarityWeight(item) * Number(bonus(item) || 0)),
    }));
    const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
    if (total <= 0) return items[Math.floor(Math.random() * items.length)];
    let roll = Math.random() * total;
    return weighted.find((entry) => (roll -= entry.weight) <= 0)?.item || weighted.at(-1).item;
  }

  function sample(items, count, bonus) {
    const pool = [...items];
    const result = [];
    while (result.length < count && pool.length) {
      const item = pick(pool, bonus);
      result.push(item);
      pool.splice(pool.indexOf(item), 1);
    }
    return result;
  }

  return { pick, rarityWeight, sample, shopBonus };
})();
