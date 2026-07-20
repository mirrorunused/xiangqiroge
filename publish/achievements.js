window.XQ = window.XQ || {};

window.XQ.Achievements = (() => {
  const COMBOS = {
    turtle: "龟缩", fish: "鱼水", rabbit: "兔阵", divine: "神选", collapse: "崩盘",
    eunuch: "宦潮", charmFormation: "媚阵", horse1: "纵马1", horse2: "纵马2",
    reinforcement: "增援", charmBlade: "媚骨蚀锋", horse3: "纵马3", corruption: "染心",
    horse4: "纵马4", music: "迷音", incense: "香阵", momentum: "盈不可久", sacrifice: "生祭",
  };
  const REWARDS = {
    turtle: ["turtleShell", "龟壳"],
    rabbit: ["rabbitFoot", "兔脚"],
    eunuch: ["advisorStride", "仕途通达"],
    horse4: ["horseSale", "马系列商店半价"],
    corruption: ["charmMakeup", "媚妆"],
    momentum: ["endure", "卧薪尝胆"],
  };
  const EXTRA = [
    ["firstDefeat", "败而知进", "首次战败", "解锁局外双步虎符、道具图鉴与随机棋模式"],
    ["bishop", "异制初启", "完成首次征程结算", "开放主教改制购买"],
    ["queen", "后仪临阵", "完成第二次征程结算", "开放皇后改制购买"],
    ["rebelRescue", "破狱救援", "义军破敌推进至组合技阶段", "解锁关押剧情与义军兵败剧情图鉴"],
  ];

  function ensure(state) {
    const talents = state.talents || (state.talents = {});
    talents.shopUnlocks = talents.shopUnlocks || {};
    const data = talents.achievements || (talents.achievements = { completed: {} });
    data.completed = data.completed || {};
    migrate(state, data.completed);
    return data;
  }

  function completeCombo(state) {
    if (state.mode !== "rebel") return [];
    const id = comboId(state);
    if (!COMBOS[id]) return [];
    const messages = mark(state, `combo-${id}`, `义军成就“破阵·${COMBOS[id]}”`);
    const reward = REWARDS[id];
    if (reward && !state.talents.shopUnlocks[reward[0]]) {
      state.talents.shopUnlocks[reward[0]] = true;
      messages.push(`成就奖励：已解锁${reward[1]}。`);
    }
    return messages;
  }

  function complete(state, id) {
    ensure(state);
    const messages = mark(state, id, title(id));
    if (!messages.length) return messages;
    const t = state.talents;
    if (id === "firstDefeat") {
      t.outerTempoOffer = true;
      t.outerTempoNotice = true;
      t.captureGalleryUnlocked = true;
      t.randomModeUnlocked = true;
    }
    if (id === "bishop") t.chessStage = Math.max(1, t.chessStage || 0);
    if (id === "queen") t.chessStage = Math.max(2, t.chessStage || 0);
    if (id === "rebelRescue") {
      t.prisonGalleryUnlocked = true;
      t.defeatGalleryUnlocked = true;
    }
    messages.push(`成就奖励：${rewardText(id)}。`);
    return messages;
  }

  function cards(state) {
    const completed = ensure(state).completed;
    return EXTRA.map(([id, name, condition, reward]) => card(id, name, condition, reward, completed[id]))
      .concat(window.XQ.ComboOrder.fixedIds().map((id) => card(
        `combo-${id}`, `破阵·${COMBOS[id]}`, `义军破敌通关组合技“${COMBOS[id]}”`,
        REWARDS[id] ? `解锁${REWARDS[id][1]}` : "记录组合技通关",
        completed[`combo-${id}`],
      )));
  }

  function open(state) {
    const list = cards(state);
    const done = list.filter((entry) => entry.done).length;
    window.XQ.Render.showCards("成就", `已完成 ${done}/${list.length}。成就奖励达成时自动发放。`, list, () => {}, "save");
  }

  function progress(state) {
    const list = cards(state);
    return { done: list.filter((entry) => entry.done).length, total: list.length };
  }

  function mark(state, id, name) {
    const completed = ensure(state).completed;
    if (completed[id]) return [];
    completed[id] = Date.now();
    return [`成就完成：${name}。`];
  }

  function migrate(state, completed) {
    const t = state.talents || {};
    if (t.outerTempoOffer) completed.firstDefeat ||= 1;
    if ((t.chessStage || 0) >= 1) completed.bishop ||= 1;
    if ((t.chessStage || 0) >= 2) completed.queen ||= 1;
    if (t.prisonGalleryUnlocked && t.defeatGalleryUnlocked) completed.rebelRescue ||= 1;
    const best = state.bestRecords?.rebel?.level || 1;
    if (best > 15 && state.rebelComboOrder?.length) {
      window.XQ.ComboOrder.legacyRebelLevels(state).forEach((entry) => {
        if (entry.level < best) completed[`combo-${entry.id}`] ||= 1;
      });
    }
    Object.entries(REWARDS).forEach(([id, reward]) => {
      if (t.shopUnlocks?.[reward[0]]) completed[`combo-${id}`] ||= 1;
      if (completed[`combo-${id}`]) t.shopUnlocks[reward[0]] = true;
    });
  }

  function comboId(state) {
    return state.currentComboId || window.XQ.ComboOrder.levels().find((entry) => entry.level === state.level)?.id;
  }

  function title(id) {
    return EXTRA.find((entry) => entry[0] === id)?.[1] || id;
  }

  function rewardText(id) {
    return EXTRA.find((entry) => entry[0] === id)?.[3] || "成就记录";
  }

  function card(id, name, condition, reward, done) {
    return {
      id, name: `${done ? "[已完成]" : "[未完成]"} ${name}`, rarity: done ? "gold" : "white",
      text: `${condition}。奖励：${reward}。`, done: Boolean(done),
    };
  }

  return { cards, complete, completeCombo, ensure, open, progress };
})();
