window.XQ = window.XQ || {};

window.XQ.ModeItems = (() => {
  const EXCLUDED = new Set(["supply", "shopFree", "pawnSpell", "revive", "meteor", "riverFlood", "charmMakeup"]);
  const APPLICABLE = {
    K: ["kingFree", "kingRiver", "kingGuard", "turtleShell"],
    A: ["advisorFree", "advisorRiver", "advisorStride"],
    B: ["elephantRiver", "elephantStep"],
    N: ["horseStep", "horseLeap", "horseRun", "horseFly"],
    R: ["rookPhoenix"],
    C: ["cannon"],
    P: ["strongPawn", "elitePawn"],
  };

  function grant(state, amount, options = {}) {
    const added = [];
    const exclude = new Set(options.excludeIds || []);
    for (let i = 0; i < amount; i += 1) {
      const pool = candidates(state, options.allowLocked, exclude);
      const item = weightedPick(pool, options.pieceCounts);
      if (!item) break;
      const card = window.XQ.Items.makeCard(item, state.level || 1);
      const before = new Set(state.items);
      window.XQ.Items.apply(state, card);
      const next = state.items.find((entry) => !before.has(entry));
      if (!next) continue;
      if (options.randomLocked) next.randomLocked = true;
      added.push(next);
      if (item.stacks === false) exclude.add(item.id);
    }
    return added;
  }

  function grantIds(state, ids, randomLocked = false) {
    return ids.map((id) => {
      if (state.items.some((item) => item.id === id)) return null;
      const item = window.XQ.Config.randomItems.find((entry) => entry.id === id);
      if (!item) return null;
      const before = new Set(state.items);
      window.XQ.Items.apply(state, window.XQ.Items.makeCard(item, state.level || 1));
      const added = state.items.find((entry) => !before.has(entry)) || null;
      if (added && randomLocked) added.randomLocked = true;
      return added;
    }).filter(Boolean);
  }

  function candidates(state, allowLocked, exclude) {
    return window.XQ.Config.randomItems.filter((item) => {
      if (EXCLUDED.has(item.id) || exclude.has(item.id)) return false;
      if (!allowLocked) return window.XQ.Items.canOffer(state, item, "reward");
      if (item.stacks === false && owned(state, item.id)) return false;
      return !item.requires || owned(state, item.requires);
    });
  }

  function weightedPick(pool, counts = {}) {
    const weighted = pool.map((item) => ({ item, weight: itemWeight(item, counts) }));
    const total = weighted.reduce((sum, entry) => sum + entry.weight, 0);
    let roll = Math.random() * total;
    for (const entry of weighted) {
      roll -= entry.weight;
      if (roll <= 0) return entry.item;
    }
    return weighted.at(-1)?.item || null;
  }

  function itemWeight(item, counts) {
    const id = item.id;
    let weight = window.XQ.ItemRoll.rarityWeight(item);
    if (id === "advisorRiver" && Number(counts.A || 0) > 0) weight += 2;
    if (id === "elephantRiver" && Number(counts.B || 0) > 0) weight += 2;
    Object.entries(APPLICABLE).forEach(([type, ids]) => {
      if (ids.includes(id)) weight += Math.max(0, Number(counts[type] || 0) - 3) * 1.5;
    });
    return weight;
  }

  function owned(state, id) {
    return state.items.some((item) => item.id === id)
      || (state.talents?.outerItems || []).some((item) => item.id === id);
  }

  return { grant, grantIds };
})();
