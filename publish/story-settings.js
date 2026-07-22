window.XQ = window.XQ || {};

window.XQ.StorySettings = (() => {
  function open(state, render, save, reset, resetOuter) {
    const mode = state.settings?.captureStoryMode || "story";
    const late = state.settings?.rebelDefeatStory !== false;
    const early = state.settings?.rebelEarlyDefeatStory !== false;
    const cards = [
      {
        id: "capture-mode",
        name: `俘获剧情：${mode === "story" ? "剧情弹窗" : "简洁提示"}`,
        rarity: mode === "story" ? "gold" : "green",
        text: mode === "story" ? "点击切换为简洁提示；首次俘获不再播放图文弹窗。" : "点击切换为剧情弹窗；首次俘获依次播放俘获与关押剧情。",
      },
      { id: "rebel-early-defeat", name: `${early ? "[开启] " : "[关闭] "}前期兵败剧情`, rarity: "purple", text: "义军第 15 关及以前兵败时，播放红帅关押剧情。" },
      { id: "rebel-defeat", name: `${late ? "[开启] " : "[关闭] "}后期兵败剧情`, rarity: "red", text: "义军通过第 15 关后兵败时，播放指挥官被俘剧情。" },
      { id: "reset-outer", name: "重置已解锁局外道具", rarity: "red", text: "清空传承锦囊、已购局外道具、双步虎符和改制解锁；积分、模式、图鉴与战绩保留。" },
      { id: "reset", name: "重置当前模式存档", rarity: "red", text: "仅重置当前模式进度；另一模式、共享积分与三个手动存档不受影响。" },
    ];
    window.XQ.Render.showCards("设置", "调整音量、剧情显示方式与存档选项。", cards, async (card) => {
      if (card.id === "reset") return confirmReset(reset);
      if (card.id === "reset-outer") return confirmOuterReset(resetOuter);
      if (card.id === "rebel-early-defeat") return toggle(state, "rebelEarlyDefeatStory", !early, "前期兵败剧情", render, save, reset, resetOuter);
      if (card.id === "rebel-defeat") return toggle(state, "rebelDefeatStory", !late, "后期兵败剧情", render, save, reset, resetOuter);
      if (card.id !== "capture-mode") return;
      state.settings = state.settings || {};
      state.settings.captureStoryMode = mode === "story" ? "brief" : "story";
      await save();
      render();
      window.XQ.Render.banner(state.settings.captureStoryMode === "story" ? "已启用剧情弹窗" : "已启用简洁提示");
      open(state, render, save, reset, resetOuter);
    }, "save");
  }

  async function toggle(state, key, value, label, render, save, reset, resetOuter) {
    state.settings[key] = value;
    await save();
    render();
    window.XQ.Render.banner(value ? `已开启${label}` : `已关闭${label}`);
    open(state, render, save, reset, resetOuter);
  }

  function confirmReset(reset) {
    window.XQ.Render.showCards("重置当前模式存档", "请先使用手动存档保存需要保留的进度。重置不会影响另一模式、共享积分或手动存档。", [{
      id: "confirm", name: "确认重置", rarity: "red", text: "清空当前模式的关卡、棋局和局内道具，并返回第一关。",
    }], async () => {
      await reset();
      window.XQ.Render.hideRewards();
      window.XQ.Render.banner("当前模式自动存档已重置");
    }, "save");
  }

  function confirmOuterReset(resetOuter) {
    window.XQ.Render.showCards("重置已解锁局外道具", "此操作不会返还已花费积分，也不会影响模式解锁、剧情图鉴、战绩或手动存档。", [{
      id: "confirm-outer",
      name: "再次确认并重置",
      rarity: "red",
      text: "清空所有已购局外道具、传承栏、局外双步虎符与主教/皇后改制解锁。",
    }], async () => {
      await resetOuter();
      window.XQ.Render.hideRewards();
      window.XQ.Render.banner("已重置局外道具");
    }, "save");
  }

  return { open };
})();
