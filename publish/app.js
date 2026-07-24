window.XQ = window.XQ || {};
(() => {
  const UI = window.XQ.Render;
  const Store = window.XQ.Storage;
  const FX = window.XQ.FX;
  const Menus = window.XQ.Menus;
  const Ops = window.XQ.StateOps;
  const Pre = window.XQ.Prebattle;
  let state;
  let runtime;
  let battle;
  let support;
  let modeSession;
  function render() { state.view = {
      hintCost: window.XQ.Items.hintCost(state),
      maxMoves: window.XQ.Levels.hasTempo(state) ? 2 : 1,
      scoreMult: window.XQ.Late.scoreMult(state),
      levelName: window.XQ.Levels.levelName(state),
    };
    UI.update(state, { piece: battle?.onPiece, move: battle?.onMove, busy: runtime?.busy() });
  }
  function announceScoreAchievements() { const unlocked = window.XQ.Achievements.checkScore(state); if (unlocked.length) UI.banner(unlocked.join(" ")); }
  function saveSoon() {
    announceScoreAchievements(); window.XQ.Mode.updateRecord(state);
    return runtime.queue();
  }
  function saveNow() {
    announceScoreAchievements(); window.XQ.Mode.updateRecord(state);
    return runtime.flush();
  }
  async function win(text) {
    const result = window.XQ.Outcome.settleWin(state, text);
    UI.banner(text || "破阵成功");
    if (window.XQ.QuickMode.is(state)) {
      state.battleInProgress = false; render();
      await saveNow();
      return window.XQ.QuickMode.showEnd(state, true, leaveToMenu);
    }
    if (state.mode === "rebel" && state.level === 15) await window.XQ.CaptureStory.showRescueNotice();
    const unlocked = (result.unlocked || []).join(" ");
    const rewardText = window.XQ.RandomMode.is(state) ? "获得本关随机道具后继续进军。" : "选择一个奖励继续进军。";
    UI.rewards(result.rewards || [], pickReward, `${unlocked}${state.lastSettlement.formula}。${rewardText}`);
    render();
    await saveNow();
  }
  async function pickReward(card) {
    window.XQ.Outcome.applyReward(state, card);
    UI.hideRewards();
    render();
    await saveNow();
    if (card.id === "revive") await window.XQ.Revive.start(state, render);
  }
  async function nextLevel() {
    if (state.phase !== "rewarded" && !(["normal", "random", "recruit"].includes(state.mode) && state.phase === "play" && state.level <= 5)) return;
    state.level += 1;
    Ops.beginLevel(state);
    render();
    await saveNow();
    if (!support.showNotices()) UI.banner(window.XQ.Levels.hasTempo(state) ? "双行动继续生效" : "敌军整备完成");
  }
  async function lose(text) {
    if (state.phase === "lost") return;
    await window.XQ.CombatFeedback.beforeLoss(state, text);
    state.phase = "lost";
    UI.banner(text || "红帅被擒，积分保留");
    if (window.XQ.QuickMode.is(state)) {
      const unlocked = window.XQ.Achievements.complete(state, "firstDefeat");
      state.battleInProgress = false; render();
      await saveNow();
      return window.XQ.QuickMode.showEnd(state, false, leaveToMenu, unlocked);
    }
    await window.XQ.RunEnd.fail(state, async () => {
      const result = Ops.newRun(state);
      replace(state, result.next);
      render();
      await saveNow();
      Pre.show(state, support.preActions());
    });
  }
  async function restore() {
    if (!Ops.restore(state)) return UI.banner("没有可悔棋的记录");
    render();
    await saveNow();
  }
  async function showHint() {
    const cost = window.XQ.Items.hintCost(state);
    if (state.score < cost) return UI.banner("积分不足，无法提示");
    const best = window.XQ.AI.hint(state);
    if (!best) return UI.banner("当前没有可用提示");
    state.score -= cost;
    state.selected = best.id;
    state.legal = window.XQ.Rules.legalMoves(state.board, best.id, state).filter((move) => move.x === best.x && move.y === best.y);
    state.message = "提示已高亮一个推荐落点";
    render();
    await saveNow();
  }
  async function restartLevel() {
    state.score = Math.min(state.score, state.levelStartScore ?? state.score);
    Ops.restartLevel(state);
    render();
    await saveNow();
    if (!support.showNotices()) UI.banner("已重开本关卡");
  }
  async function manualLoad() {
    await Menus.load(state, async () => {
      render();
      await saveNow();
      Pre.refresh(state);
    });
  }
  function openSettings() {
    window.XQ.CaptureStory.openSettings(state, render, saveNow, resetCurrent, resetOuterUnlocks);
  }
  async function resetCurrent() {
    await modeSession.resetCurrent();
  }
  async function resetOuterUnlocks() {
    window.XQ.Progression.resetOuterUnlocks(state);
    render();
    await saveNow();
    Pre.refresh(state);
  }
  async function leaveToMenu() {
    closeMore();
    if (!(await saveNow())) return;
    Pre.show(state, support.preActions());
  }
  function openSlot() {
    Pre.hide();
    window.XQ.SlotMachine.open(state, {
      save: saveNow,
      onUpdate: () => { render(); Pre.refresh(state); },
      onClose: () => Pre.show(state, support.preActions()),
    });
  }
  async function enterBattle() {
    Pre.hide();
    render();
    if (await battle.checkOutcome()) return;
    support.showNotices();
    if (state.side === "b" && state.phase === "play") setTimeout(battle.enemyTurn, 420);
  }
  async function boot() {
    FX.loading("progress", { phase: "start", message: "Preparing Xiangqi Rogue" });
    UI.init();
    window.XQ.CaptureStory.init();
    window.XQ.MoveRecord.configure(() => state);
    FX.loading("progress", { phase: "runtime_initializing", message: "Loading save data" });
    state = window.XQ.Levels.baseState(await Store.getInitial());
    runtime = window.XQ.Runtime.create(() => state, render);
    battle = window.XQ.Battle.create({ getState: () => state, runtime, render, saveNow, saveSoon, win, lose });
    modeSession = window.XQ.ModeSession.create({
      getState: () => state, render, saveNow, enterBattle,
    });
    support = window.XQ.AppSupport.create({
      getState: () => state, render, saveNow, saveSoon, manualLoad,
      enterBattle, selectMode: modeSession.select, selectQuick: modeSession.startQuick, settings: openSettings, slot: openSlot,
    });
    window.XQ.RandomPlacement.configure({ getState: () => state, render, save: saveSoon, flush: saveNow });
    window.XQ.Shooter.configure({ getState: () => state, render, saveNow, win, lose });
    if (!state.board?.length) Ops.beginLevel(state);
    bind();
    render();
    Pre.show(state, support.preActions());
    requestAnimationFrame(() => FX.loading("ready"));
  }
  function bind() {
    runtime.bind("restartBtn", "restart", restartLevel);
    runtime.bind("hintBtn", "hint", showHint);
    runtime.bind("undoBtn", "restore", restore);
    runtime.bind("nextBtn", "level", nextLevel);
    runtime.bind("shopBtn", "shop", () => { closeMore(); return Menus.shop(state, render, support.activateCard); });
    document.getElementById("moreBtn").addEventListener("click", toggleMore);
    runtime.bind("talentBtn", "talent", () => { closeMore(); return Menus.talent(state, render); });
    runtime.bind("itemsBtn", "items", () => { closeMore(); return Menus.showItems(state, render); });
    runtime.bind("saveBtn", "save", () => { closeMore(); return Menus.save(state); });
    runtime.bind("loadBtn", "load", () => { closeMore(); return manualLoad(); });
    runtime.bind("settingsBtn", "settings", () => { closeMore(); return openSettings(); });
    runtime.bind("moveRecordBtn", "move-record", () => { closeMore(); window.XQ.MoveRecord.open(state); });
    runtime.bind("leaveBtn", "leave", leaveToMenu);
    runtime.bind("giveUpBtn", "give-up", () => { closeMore(); return state.phase === "play" && lose(); }); window.XQ.UiHints?.bind?.();
  }
  function toggleMore() {
    const panel = document.getElementById("morePanel");
    const open = panel.classList.toggle("hidden") === false;
    document.getElementById("moreBtn").setAttribute("aria-expanded", String(open));
  }
  function closeMore() {
    document.getElementById("morePanel").classList.add("hidden");
    document.getElementById("moreBtn").setAttribute("aria-expanded", "false");
  }
  function replace(target, source) {
    Object.keys(target).forEach((key) => delete target[key]); Object.assign(target, source);
  }
  boot().catch((err) => {
    console.error("boot failed:", err?.code || "unknown", err.message, err.stack);
    FX.loading("error", "BOOT_FAILED", err.message);
    document.body.innerHTML = '<main class="game-shell"><h1>加载失败，请刷新重试</h1></main>';
  });
})();
