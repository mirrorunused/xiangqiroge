window.XQ = window.XQ || {};

window.XQ.SlotSymbols = (() => {
  const iconSheets = {
    a: "./assets/generated/slot-icon-sheet-a.8c063f5e.webp",
    b: "./assets/generated/slot-icon-sheet-b.55c5b812.webp",
  };
  const iconImages = {
    armor: "./assets/generated/slot-icon-rebel-armor-detailed.a983c642.webp",
    diamond: "./assets/generated/slot-icon-blood-diamond-detailed.b5f18c6e.webp",
    miner: "./assets/generated/slot-icon-mining-pickaxe-detailed.f12585f6.webp",
    owl: "./assets/generated/slot-icon-owl-helmet-detailed.f7bcc120.webp",
    dagger: "./assets/generated/slot-icon-rebel-dagger-detailed.715f1b3c.webp",
    lockedChest: "./assets/generated/slot-icon-locked-chest-detailed.caab79c7.webp",
    ore: "./assets/generated/slot-icon-imperial-ore-detailed.f7f9137b.webp",
    safe: "./assets/generated/slot-icon-imperial-safe-detailed.11eee6d8.webp",
    dressingCase: "./assets/generated/slot-icon-imperial-dressing-case-detailed.7aacb9df.webp",
  };
  const symbols = {
    coin: { id: "coin", name: "军饷", icon: ["a", 0, 0], mark: "饷", value: 10, rarity: "common", text: "稳定产出积分。" },
    grain: { id: "grain", name: "行军干粮", icon: ["a", 1, 0], categories: ["军需品"], mark: "粮", value: 8, rarity: "common", text: "每个相邻义军长弓额外 +4。" },
    beer: { id: "beer", name: "军医药酒", icon: ["a", 2, 0], mark: "酒", value: 8, rarity: "common", text: "无额外效果，稳定补给。" },
    archer: { id: "archer", name: "义军长弓", icon: ["a", 3, 0], categories: ["军需品"], mark: "弓", value: 8, rarity: "common", text: "每个相邻行军干粮额外 +3。" },
    crab: { id: "crab", name: "河防蟹", icon: ["a", 0, 1], categories: ["军需品"], mark: "蟹", value: 9, rarity: "common", text: "同一行每有另一只河防蟹，双方各得 +3。" },
    crow: { id: "crow", name: "玄铁乌鸦雕像", icon: ["a", 1, 1], mark: "鸦", value: 14, rarity: "common", text: "开始第 4、8 轮搜寻时，物品池每存在一座，额外 -3 分。" },
    key: { id: "key", name: "私库钥匙", icon: ["a", 2, 1], mark: "钥", value: 10, rarity: "common", text: "每个相邻锁金箱或曌帝妆匣额外 +12。" },
    magpie: { id: "magpie", name: "鎏金喜鹊雕像", icon: ["a", 3, 1], mark: "鹊", value: 0, rarity: "common", text: "开始第 4、8 轮搜寻时，物品池每存在一座，额外 +9 分。" },
    owl: { id: "owl", name: "夜枭铁盔", icon: iconImages.owl, categories: ["军需品"], mark: "盔", value: 6, rarity: "common", text: "开始第 3、6、9 轮搜寻时，物品池每存在一顶，额外 +10 分。" },
    miner: { id: "miner", name: "开山矿镐", icon: iconImages.miner, categories: ["军需品"], mark: "镐", value: 9, rarity: "common", text: "每个相邻曌帝矿石额外 +8。" },
    ore: { id: "ore", name: "曌帝矿石", icon: iconImages.ore, mark: "石", value: 12, rarity: "common", text: "与相邻开山矿镐形成发掘联动。" },
    lockedChest: { id: "lockedChest", name: "锁金箱", icon: iconImages.lockedChest, mark: "锁", value: 15, rarity: "uncommon", text: "基础价值较高，适合与私库钥匙相邻。" },
    general: { id: "general", name: "义军帅旗", icon: ["a", 0, 3], categories: ["军需品"], mark: "旗", value: 18, rarity: "uncommon", text: "每个相邻军需品额外 +6。" },
    armor: { id: "armor", name: "义军铁甲", icon: iconImages.armor, categories: ["军需品"], mark: "甲", value: 20, rarity: "uncommon", text: "每个相邻军需品额外 +6。" },
    dagger: { id: "dagger", name: "义军匕首", icon: iconImages.dagger, categories: ["军需品"], mark: "匕", value: 7, rarity: "uncommon", text: "每个相邻义军铁甲或义军长弓额外 +10。" },
    safe: { id: "safe", name: "曌帝保险箱", icon: iconImages.safe, mark: "柜", value: 30, rarity: "rare", text: "高额基础价值，不依赖联动。" },
    treasureChest: { id: "treasureChest", name: "曌帝妆匣", icon: iconImages.dressingCase, mark: "匣", value: 35, rarity: "rare", text: "每个相邻私库钥匙额外 +15。" },
    diamond: { id: "diamond", name: "血钻", icon: iconImages.diamond, mark: "钻", value: 40, rarity: "rare", text: "每有另一枚血钻在本轮被搜寻到，所有血钻额外 +5 分。" },
  };
  const choiceBag = [
    "coin", "coin", "grain", "grain", "beer", "archer", "archer", "crab", "crow",
    "key", "key", "magpie", "owl", "miner", "ore", "lockedChest", "general",
    "armor", "dagger", "safe", "treasureChest", "diamond",
  ];
  const scenes = [
    "第一轮完成，私库里静悄悄的。\n选择一件物品加入后续物品池。",
    "第二轮完成，尘埃从梁上落下，远处传来钥匙碰撞声。\n选择一件物品加入后续物品池。",
    "第三轮完成，药草与旧木的气味混在一起。\n选择一件物品加入后续物品池。",
    "第四轮完成，火把被风吹得摇晃，墙上的影子开始移动。\n选择一件物品加入后续物品池。",
    "第五轮完成，藏品架后传来一声轻响。\n选择一件物品加入后续物品池。",
    "第六轮完成，外库亮起了几盏不该亮起的灯。\n选择一件物品加入后续物品池。",
    "第七轮完成，近卫军似乎正在搜查外库。\n选择一件物品加入后续物品池。",
    "第八轮完成，铠甲碰撞声越来越近。\n选择一件物品加入后续物品池。",
    "第九轮完成，曌帝的近卫军正在赶来。\n选择一件物品加入后续物品池。",
    "第十轮完成，守卫赶过来了，该走了。\n选择一件物品加入物品池。",
  ];

  function starter() {
    return ["coin", "coin", "grain", "beer", "archer", "archer", "crab", "key", "miner", "armor", "dagger"];
  }

  function pick(pool, rng = Math.random) {
    return pool[Math.floor(rng() * pool.length)] || "coin";
  }

  function grid(pool, rng = Math.random) {
    return Array.from({ length: 9 }, () => pick(pool, rng));
  }

  function choices(rng = Math.random) {
    const result = [];
    let guard = 0;
    while (result.length < 3 && guard < 50) {
      const id = pick(choiceBag, rng);
      if (!result.includes(id)) result.push(id);
      guard += 1;
    }
    Object.keys(symbols).forEach((id) => {
      if (result.length < 3 && !result.includes(id)) result.push(id);
    });
    return result;
  }

  function neighbors(index) {
    const row = Math.floor(index / 3);
    const col = index % 3;
    const result = [];
    for (let y = Math.max(0, row - 1); y <= Math.min(2, row + 1); y += 1) {
      for (let x = Math.max(0, col - 1); x <= Math.min(2, col + 1); x += 1) {
        const next = y * 3 + x;
        if (next !== index) result.push(next);
      }
    }
    return result;
  }

  function isMilitary(id) {
    return symbols[id]?.categories?.includes("军需品");
  }

  function icon(id) {
    const source = (symbols[id] || symbols.coin).icon;
    if (typeof source === "string") {
      return { src: source, position: "center", size: "100% 100%" };
    }
    const [sheet, column, row] = source;
    return {
      src: iconSheets[sheet],
      position: `${(column / 3) * 100}% ${(row / 3) * 100}%`,
      size: "400% 400%",
    };
  }

  function score(gridIds, round = 1, poolIds = gridIds) {
    let total = 0;
    const bonuses = {};
    const add = (label, amount) => {
      if (!amount) return;
      total += amount;
      bonuses[label] = (bonuses[label] || 0) + amount;
    };
    gridIds.forEach((id, index) => {
      const symbol = symbols[id] || symbols.coin;
      total += symbol.value;
      const near = neighbors(index).map((next) => gridIds[next]);
      const row = gridIds.slice(Math.floor(index / 3) * 3, Math.floor(index / 3) * 3 + 3);
      if (id === "grain") add("干粮补给", near.filter((next) => next === "archer").length * 4);
      if (id === "archer") add("长弓配给", near.filter((next) => next === "grain").length * 3);
      if (id === "crab") add("河防蟹列阵", (row.filter((next) => next === "crab").length - 1) * 3);
      if (id === "key") add("钥匙开箱", near.filter((next) => ["lockedChest", "treasureChest"].includes(next)).length * 12);
      if (id === "miner") add("矿镐开石", near.filter((next) => next === "ore").length * 8);
      if (id === "general") add("帅旗号令", near.filter(isMilitary).length * 6);
      if (id === "armor") add("铁甲护运", near.filter(isMilitary).length * 6);
      if (id === "dagger") add("匕首突袭", near.filter((next) => ["armor", "archer"].includes(next)).length * 10);
      if (id === "treasureChest") add("宝箱开锁", near.filter((next) => next === "key").length * 15);
      if (id === "diamond") add("血钻叠加", (gridIds.filter((next) => next === "diamond").length - 1) * 5);
    });
    const countPool = (id) => poolIds.filter((next) => next === id).length;
    if ([4, 8].includes(round)) {
      add("乌鸦雕像凶兆", countPool("crow") * -3);
      add("喜鹊雕像报喜", countPool("magpie") * 9);
    }
    if ([3, 6, 9].includes(round)) add("夜枭铁盔巡夜", countPool("owl") * 10);
    return {
      total: Math.max(0, total),
      details: Object.entries(bonuses).map(([label, amount]) => `${label} ${amount > 0 ? "+" : ""}${amount}`),
    };
  }

  function scene(round) {
    return scenes[Math.max(0, Math.min(scenes.length - 1, round - 1))];
  }

  function riskChance(round, stored) {
    if (round < 10) return 0;
    if (round === 10) return 5;
    const value = Number(stored);
    return Number.isFinite(value)
      ? Math.min(60, Math.max(5, Math.floor(value)))
      : Math.min(60, 5 + (round - 10) * 5);
  }

  function nextRiskChance(current, rng = Math.random) {
    const value = Number(current);
    const base = Number.isFinite(value) ? Math.min(60, Math.max(5, Math.floor(value))) : 5;
    return Math.min(60, base + 1 + Math.floor(rng() * 10));
  }

  function riskScene(round, stored) {
    return `第${round}轮开始前，曌帝近卫军发现你的概率为 ${riskChance(round, stored)}%。\n留下继续搜寻，或直接撤退。`;
  }

  return {
    choices,
    get: (id) => symbols[id] || symbols.coin,
    grid,
    icon,
    riskChance,
    nextRiskChance,
    riskScene,
    scene,
    score,
    starter,
    symbols,
  };
})();
