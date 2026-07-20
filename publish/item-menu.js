window.XQ = window.XQ || {};

window.XQ.ItemMenu = (() => {
  const modes = [
    { id: "acquired", label: "获得顺序" },
    { id: "rarity", label: "稀有度" },
    { id: "blocked", label: "屏蔽优先" },
  ];
  let sortMode = "acquired";
  const directions = { acquired: "asc", rarity: "asc", blocked: "asc" };

  function sort(items, state, mode = sortMode, direction = directions[mode] || "asc") {
    const blocked = new Set(state.suppressedItemUids || []);
    const rarity = window.XQ.Config.rarityOrder || [];
    const factor = direction === "desc" ? -1 : 1;
    return items.map((item, index) => ({ item, index })).sort((left, right) => {
      if (mode === "rarity") {
        const rank = rarity.indexOf(right.item.rarity) - rarity.indexOf(left.item.rarity);
        if (rank) return rank * factor;
      }
      if (mode === "blocked") {
        const priority = Number(blocked.has(right.item.uid)) - Number(blocked.has(left.item.uid));
        if (priority) return priority * factor;
      }
      return (left.index - right.index) * factor;
    }).map((entry) => entry.item);
  }

  function show(state, done, persist) {
    const limit = state.talents?.retain || 0;
    const items = state.items.concat((state.talents.outerItems || []).map((item) => ({ ...item, outer: true })));
    const cards = items.length ? sort(items, state).map((item) => itemCard(state, item)) : [emptyCard()];
    const intro = limit ? `点击局内道具可预选保留，最多 ${limit} 个。` : "当前没有保留天赋。";
    window.XQ.Render.showCards("现有道具", intro, cards, (card) => pick(state, card, done, persist), "save");
    installControls(state, done, persist);
  }

  async function pick(state, card, done, persist) {
    if (card.action === "sell") return sell(state, card.uid, done, persist);
    if (!card.uid || card.outer) return;
    const toggled = window.XQ.StateOps.toggleKeep(state, card.uid);
    if (toggled !== true) return window.XQ.Render.banner(toggled);
    await persist(state);
    done();
    show(state, done, persist);
  }

  async function sell(state, uid, done, persist) {
    const gained = window.XQ.Items.sell(state, uid);
    if (!gained) return window.XQ.Render.banner("该道具当前无法出售");
    window.XQ.Render.banner(`出售成功，积分 +${gained}`);
    await persist(state);
    done();
    show(state, done, persist);
  }

  function itemCard(state, item) {
    const kept = state.keepUids?.includes(item.uid);
    const blocked = state.suppressedItemUids?.includes(item.uid);
    const activeOuter = state.mode === "rebel" && item.outer && item.uid === state.rebelOuterUid;
    const opening = state.mode === "random" && item.randomLocked;
    const randomOuter = state.mode === "random" && item.outer;
    const randomActive = randomOuter && ["banner", "cannon", "mult"].includes(item.id);
    const turtle = item.id === "turtleShell" && !blocked ? turtleStatus(state) : null;
    return {
      ...item,
      name: `${blocked ? "[屏蔽] " : ""}${turtle?.name || ""}${kept ? "[保留] " : ""}${opening ? "[初始] " : ""}${randomActive ? "[生效] " : randomOuter ? "[停用] " : activeOuter ? "[带入] " : item.outer ? "[局外] " : ""}${item.name}`,
      text: blocked ? `${item.text} 本关效果被屏蔽，暂不可出售。` : opening ? `${item.text} 本轮初始道具，不可出售。` : randomOuter && !randomActive ? `${item.text} 随机棋模式仅启用积分加成类局外道具。` : `${item.text}${turtle?.text || ""}`,
      actions: blocked || opening || item.outer || item.id.startsWith("morph-") ? [] : [{ id: "sell", label: "出售" }],
    };
  }

  function turtleStatus(state) {
    const turtle = window.XQ.Turtle.sync(state);
    if (!turtle) return null;
    if (turtle.shield > 0) return { name: `[无敌 ${turtle.shield} / 冷却 ${turtle.cooldown}] `, text: ` 当前无敌剩余 ${turtle.shield} 回合，重新生效剩余 ${turtle.cooldown} 回合。` };
    if (turtle.cooldown > 0) return { name: `[冷却 ${turtle.cooldown}] `, text: ` 剩余冷却 ${turtle.cooldown} 回合。` };
    return { name: "[就绪] ", text: " 当前可触发。" };
  }

  function installControls(state, done, persist) {
    const cards = document.getElementById("rewardCards");
    const old = document.getElementById("itemSortControls");
    old?.remove();
    const controls = document.createElement("div");
    controls.id = "itemSortControls";
    controls.className = "item-sort-controls";
    controls.setAttribute("role", "group");
    controls.setAttribute("aria-label", "道具排序");
    modes.forEach((mode) => {
      const button = document.createElement("button");
      const active = mode.id === sortMode;
      button.type = "button";
      button.textContent = `${mode.label}${active ? directions[mode.id] === "asc" ? " ↑" : " ↓" : ""}`;
      button.classList.toggle("active", active);
      button.setAttribute("aria-pressed", String(active));
      button.addEventListener("click", () => {
        if (sortMode === mode.id) directions[mode.id] = directions[mode.id] === "asc" ? "desc" : "asc";
        else sortMode = mode.id;
        show(state, done, persist);
      });
      controls.appendChild(button);
    });
    cards.prepend(controls);
  }

  function emptyCard() {
    return { id: "empty", name: "暂无道具", rarity: "white", text: "继续过关或在商店购买道具。" };
  }

  return { show, sort };
})();
