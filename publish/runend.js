window.XQ = window.XQ || {};

window.XQ.RunEnd = (() => {
  const UI = window.XQ.Render;
  const Store = window.XQ.Storage;

  async function fail(state, restart) {
    const unlocked = window.XQ.Progression.failRun(state);
    const ok = await Store.flush(state, (message) => UI.banner(message));
    if (!ok) UI.banner("战败进度本地备份失败，请稍后重试");
    if (shouldShowEarlyStory(state)) await window.XQ.CaptureStory.showRebelEarlyDefeat();
    else if (shouldShowRebelStory(state)) await window.XQ.CaptureStory.showRebelDefeat();
    draw(state, unlocked, restart);
  }

  function shouldShowEarlyStory(state) {
    return state.mode === "rebel" && state.level <= 15 && state.settings?.rebelEarlyDefeatStory !== false;
  }

  function shouldShowRebelStory(state) {
    return state.mode === "rebel" && state.level > 15 && state.settings?.rebelDefeatStory !== false;
  }

  function draw(state, unlocked, restart) {
    const limit = state.talents?.retain || 0;
    const cards = limit > 0 && state.items.length ? state.items.map((item) => itemCard(state, item)) : [emptyCard(limit)];
    UI.showCards("战败结算", intro(state, unlocked, limit), cards, async (card) => {
      if (!card.uid || limit <= 0) return;
      const toggled = window.XQ.StateOps.toggleKeep(state, card.uid);
      if (toggled !== true) return UI.banner(toggled);
      await Store.flush(state, (message) => UI.banner(message));
      draw(state, unlocked, restart);
    }, "locked");
    addConfirm(state, restart);
  }

  function intro(state, unlocked, limit) {
    const unlockText = unlocked.length ? unlocked.join("") : "本轮未解锁新内容。";
    const keep = limit > 0 ? `可通过传承锦囊保留 ${limit} 个局内道具。` : "尚未购买传承锦囊，无法保留局内道具。";
    return `止步第 ${state.level} 关，当前积分 ${state.score}。${unlockText}${keep}`;
  }

  function itemCard(state, item) {
    const kept = state.keepUids.includes(item.uid);
    return { ...item, name: `${kept ? "[保留] " : ""}${item.name}`, text: item.text };
  }

  function emptyCard(limit) {
    return { id: "none", name: limit > 0 ? "暂无可保留道具" : "未解锁传承锦囊", rarity: "white", text: "确认后将带着积分和局外解锁重新开始。" };
  }

  function addConfirm(state, restart) {
    const confirm = document.createElement("button");
    confirm.className = "reward-card rarity-red";
    confirm.innerHTML = `<strong>确认重开</strong><span>已选择 ${state.keepUids.length} 个保留道具，积分保留。</span>`;
    confirm.addEventListener("click", async () => {
      if (confirm.disabled) return;
      confirm.disabled = true;
      try {
        UI.hideRewards();
        await restart();
      } catch (err) {
        console.error("restart failed:", err?.code || "unknown", err?.message, err?.stack || "");
        confirm.disabled = false;
      }
    });
    document.getElementById("rewardCards").appendChild(confirm);
  }

  return { fail };
})();
