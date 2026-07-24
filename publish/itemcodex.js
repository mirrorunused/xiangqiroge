window.XQ = window.XQ || {};

window.XQ.ItemCodex = (() => {
  const C = window.XQ.Config;
  const modes = [
    { id: "initial", label: "首字母" },
    { id: "consumable", label: "消耗品" },
    { id: "rarity", label: "稀有度" },
  ];
  let sortMode = "initial";
  const directions = { initial: "asc", consumable: "asc", rarity: "asc" };
  const fixed = [
    { id: "mult", name: "积分倍率", rarity: "gold", text: "过关积分倍率提升；唯一道具，只保留最高倍率。" },
    { id: "tempo", name: "双步虎符", rarity: "red", text: "每回合红方可走两步。局内版本累计 25 道具后失效；局外版本本轮无限制生效，战败后清空。" },
    { id: "retain", name: "传承锦囊", rarity: "purple", text: "新征程可预选保留更多局内道具。" },
    { id: "morph", name: "改制令", rarity: "purple", text: "购买后选择一枚红方非帅棋子，改制为车、马、炮、主教或皇后；改制后令为红色稀有度。" },
    { id: "destroy", name: "破军令", rarity: "red", text: "全子关后可在局内商店购买，选择并消灭一个敌方棋子。" },
    { id: "donate", name: "献子筹饷", rarity: "green", text: "选择己方非帅棋子赠予敌军，按棋子价值获得积分。" },
    { id: "letMove", name: "让你一招", rarity: "gold", text: "立即获得积分，代价是黑方下次额外行动一回合。" },
    { id: "rabbitFoot", name: "兔脚", rarity: "gold", text: "己方棋子被吃时，若后方一格为空，则后跳避开吃子；触发后冷却 4 回合。" },
    { id: "turtleShell", name: "龟壳", rarity: "red", text: "红帅首次被吃时龟缩避险，进入 3 回合无敌，9 回合后重新生效。" },
    { id: "endure", name: "卧薪尝胆", rarity: "gold", text: "己方棋子被吃后，红方下一回合额外行动 1 次，最多累积 1 次。" },
  ];

  function isUnlocked(state) {
    return Boolean(state?.talents?.outerTempoOffer);
  }

  function open(state) {
    if (!isUnlocked(state)) {
      window.XQ.Render.banner("失败一次后解锁道具图鉴");
      return;
    }
    window.XQ.Render.showCards("道具图鉴", "失败一次后解锁。这里可在战局外查看道具来源与效果。", cards(state), () => {}, "save");
    installControls(state);
  }

  function cards(state, mode = sortMode, direction = directions[mode]) {
    const seen = new Set();
    const unique = fixed.concat(C.randomItems).filter((item) => {
      if (seen.has(item.id)) return false;
      seen.add(item.id);
      return true;
    });
    return sort(unique, mode, direction).map((item) => ({
      ...item,
      name: `${item.name}${sourceText(item, state)}`,
      text: `${requiresText(item)}${item.text}`,
    }));
  }

  function sort(items, mode = sortMode, direction = directions[mode] || "asc") {
    const rarity = C.rarityOrder || [];
    const factor = direction === "desc" ? -1 : 1;
    return [...items].sort((left, right) => {
      if (mode === "consumable") {
        const priority = Number(isConsumable(right)) - Number(isConsumable(left));
        if (priority) return priority * factor;
      }
      if (mode === "rarity") {
        const rank = rarity.indexOf(right.rarity) - rarity.indexOf(left.rarity);
        if (rank) return rank * factor;
      }
      return left.name.localeCompare(right.name, "zh-CN") * factor;
    });
  }

  function installControls(state) {
    const cardsRoot = document.getElementById("rewardCards");
    document.getElementById("codexSortControls")?.remove();
    const controls = document.createElement("div");
    controls.id = "codexSortControls";
    controls.className = "item-sort-controls";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "图鉴排序");
    modes.forEach((mode) => controls.appendChild(sortButton(mode, state)));
    cardsRoot.prepend(controls);
  }

  function sortButton(mode, state) {
    const button = document.createElement("button");
    const active = mode.id === sortMode;
    button.type = "button";
    button.textContent = `${mode.label}${active ? directions[mode.id] === "asc" ? " ↑" : " ↓" : ""}`;
    button.classList.toggle("active", active);
    button.setAttribute("aria-pressed", String(active));
    button.addEventListener("click", () => {
      if (sortMode === mode.id) directions[mode.id] = directions[mode.id] === "asc" ? "desc" : "asc";
      else sortMode = mode.id;
      open(state);
    });
    return button;
  }

  function isConsumable(item) {
    return C.consumableIds.includes(item.id);
  }

  function sourceText(item, state) {
    if (item.id === "rabbitFoot" && !state.talents?.shopUnlocks?.rabbitFoot) return "（义军成就“破阵·兔阵”奖励）";
    if (item.id === "turtleShell" && !state.talents?.shopUnlocks?.turtleShell) return "（义军成就“破阵·龟缩”奖励）";
    if (item.id === "advisorStride" && !state.talents?.shopUnlocks?.advisorStride) return "（义军成就“破阵·宦潮”奖励）";
    if (item.id === "endure" && !state.talents?.shopUnlocks?.endure) return "（义军成就“破阵·盈不可久”奖励）";
    if (item.id === "charmMakeup" && !state.talents?.shopUnlocks?.charmMakeup) return "（义军成就“破阵·染心”奖励）";
    if (["destroy", "donate", "letMove", "morph", "shopFree", "supply", "pawnSpell", "meteor", "offboard", "riverFlood"].includes(item.id)) return "（局内商店）";
    if (item.id === "retain" || item.id === "tempo") return "（局外天赋）";
    return "";
  }

  function requiresText(item) {
    return item.requires ? `前置：需先拥有${nameOf(item.requires)}。` : "";
  }

  function nameOf(id) {
    return C.randomItems.find((item) => item.id === id)?.name || id;
  }

  return { cards, isConsumable, isUnlocked, open, sort };
})();
