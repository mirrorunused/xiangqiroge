window.XQ = window.XQ || {};

window.XQ.ModeOpening = (() => {
  function show(state, options) {
    if (!state?.[options.pendingKey]) return Promise.resolve(true);
    const wanted = new Set(state[options.uidKey] || []);
    const items = (state.items || []).filter((item) => wanted.has(item.uid));
    const names = items.length ? items.map((item) => item.name).join("、") : "暂无可用道具";
    return new Promise((resolve) => {
      window.XQ.Render.showCards(options.title, `${options.intro}${names}${options.suffix || ""}`, [{
        id: "continue",
        name: options.action,
        rarity: options.rarity || "gold",
        text: options.text,
      }], async () => {
        state[options.pendingKey] = false;
        window.XQ.Render.hideRewards();
        resolve(true);
      }, "locked");
    });
  }

  function random(state) {
    return show(state, {
      pendingKey: "randomOpeningNoticePending",
      uidKey: "randomOpeningItemUids",
      title: "随机棋初始道具",
      intro: "本轮获得 5 个随机道具，并额外获得将帅出宫、仕出宫：",
      action: "开始布阵",
      text: "确认初始道具后进入随机棋布阵。",
    });
  }

  function recruit(state) {
    return show(state, {
      pendingKey: "randomOpeningNoticePending",
      uidKey: "randomOpeningItemUids",
      title: "招兵买马初始道具",
      intro: "本轮获得 5 个随机道具，并额外获得将帅出宫、仕出宫：",
      action: "开始招募",
      rarity: "gold",
      text: "确认初始道具后进入自由选子与布阵。",
    });
  }

  function quick(state) {
    return show(state, {
      pendingKey: "quickOpeningNoticePending",
      uidKey: "quickOpeningItemUids",
      title: "快速模式初始道具",
      intro: "本局获得 5 个随机道具，包含尚未解锁的道具：",
      action: "开始挑战",
      rarity: "purple",
      text: "这些开局道具不会被本局关卡屏蔽。",
    });
  }

  return { quick, random, recruit, show };
})();
