window.XQ = window.XQ || {};

window.XQ.Prebattle = (() => {
  const TEST_CODE = "test";
  let actions = {};
  let testUnlocked = false;
  let testUnlocking = false;
  let titleClicks = 0;
  let slotRequest = 0;
  const $ = (id) => document.getElementById(id);

  function show(state, nextActions) {
    actions = nextActions || actions;
    bind();
    refresh(state);
    $("startScreen").classList.remove("hidden");
  }

  function bind() {
    $("startNormalBtn").onclick = () => actions.normal?.();
    $("startRebelBtn").onclick = () => actions.rebel?.();
    $("startRandomBtn").onclick = () => actions.random?.();
    $("startRecruitBtn").onclick = () => actions.recruit?.();
    $("startQuickBtn").onclick = () => actions.quick?.();
    $("startSlotBtn").onclick = () => actions.slot?.();
    $("startLoadBtn").onclick = () => actions.load?.();
    $("startTalentBtn").onclick = () => actions.talent?.();
    $("startAchievementsBtn").onclick = () => actions.achievements?.();
    $("startCodexBtn").onclick = () => actions.codex?.();
    $("startGalleryBtn").onclick = () => actions.gallery?.();
    $("startSettingsBtn").onclick = () => actions.settings?.();
    $("startTestBtn").onclick = () => {
      if (testUnlocked) actions.test?.();
    };
    $("startTitle").onclick = revealTest;
    $("gameTitle").onclick = revealTest;
    $("cheatCloseBtn").onclick = closeCheat;
    $("cheatModal").onclick = (event) => {
      if (event.target === $("cheatModal")) closeCheat();
    };
    $("cheatForm").onsubmit = (event) => {
      event.preventDefault();
      void unlockTest();
    };
    $("cheatSubmitBtn").onclick = () => void unlockTest();
    $("cheatInput").oninput = () => {
      $("cheatFeedback").textContent = "";
      if (codeValue() === TEST_CODE) void unlockTest();
    };
    $("cheatInput").onkeydown = (event) => {
      if (event.key !== "Enter") return;
      event.preventDefault();
      void unlockTest();
    };
  }

  function revealTest() {
    if (testUnlocked) return;
    titleClicks = Math.min(5, titleClicks + 1);
    if (titleClicks < 5) return;
    openCheat();
  }

  function openCheat() {
    $("cheatInput").value = "";
    $("cheatFeedback").textContent = "";
    $("cheatModal").classList.remove("hidden");
    requestAnimationFrame(() => $("cheatInput").focus());
  }

  function closeCheat() {
    $("cheatModal").classList.add("hidden");
  }

  function codeValue() {
    return $("cheatInput").value.trim().toLowerCase();
  }

  async function unlockTest() {
    if (testUnlocking) return;
    if (codeValue() !== TEST_CODE) {
      $("cheatFeedback").textContent = "作弊码错误";
      $("cheatInput").select();
      return;
    }
    if (typeof actions.test !== "function") {
      $("cheatFeedback").textContent = "测试入口加载失败，请刷新游戏后重试";
      console.error("test entry unavailable: missing prebattle action");
      return;
    }
    testUnlocking = true;
    $("cheatSubmitBtn").disabled = true;
    $("cheatFeedback").textContent = "正在打开测试入口…";
    testUnlocked = true;
    $("startTestBtn").textContent = "测试入口（已解锁）";
    $("startTestBtn").classList.remove("hidden");
    closeCheat();
    try {
      await actions.test();
    } catch (err) {
      testUnlocked = false;
      $("startTestBtn").classList.add("hidden");
      openCheat();
      $("cheatFeedback").textContent = "测试入口打开失败，请刷新游戏后重试";
      console.error("test entry failed:", err?.code || "unknown", err?.message, err?.stack || "");
    } finally {
      testUnlocking = false;
      $("cheatSubmitBtn").disabled = false;
    }
  }

  function hide() {
    $("startScreen").classList.add("hidden");
  }

  function refresh(state) {
    window.XQ.Mode.ensure(state);
    const normal = state.bestRecords.normal;
    const rebel = state.bestRecords.rebel;
    const random = state.bestRecords.random;
    const recruit = state.bestRecords.recruit;
    const achievement = window.XQ.Achievements.progress(state);
    $("startSummary").textContent = `共享积分 ${state.score || 0} · 四种征程独立保存，快速模式单局重开`;
    $("gameVersion").textContent = `v${window.XQ.Config.version}`;
    $("recordSummary").textContent = `常规 ${normal.level}关 · 义军 ${rebel.level}关 · 随机棋 ${random.level}关 · 招兵买马 ${recruit.level}关`;
    $("startRandomBtn").classList.toggle("hidden", !state.talents?.randomModeUnlocked);
    $("startRecruitBtn").classList.toggle("hidden", !state.talents?.recruitModeUnlocked);
    $("startCodexBtn").classList.toggle("hidden", !window.XQ.ItemCodex?.isUnlocked?.(state));
    $("startAchievementsBtn").textContent = `成就 ${achievement.done}/${achievement.total}`;
    const slotUses = state.talents?.slotUses || 0;
    const slotSession = state.talents?.slotSession;
    $("startSlotBtn").textContent = slotSession ? `继续曌帝的私库 · 第 ${slotSession.spin + 1} 轮` : `曌帝的私库 · ${slotUses} 次`;
    $("startSlotBtn").disabled = false;
    $("unlockedList").innerHTML = "";
    unlocked(state).forEach((text) => {
      const li = document.createElement("li");
      li.textContent = text;
      $("unlockedList").appendChild(li);
    });
    refreshSlots();
  }

  async function refreshSlots() {
    const request = ++slotRequest;
    try {
      const [normal, rebel, random, recruit] = await Promise.all([
        window.XQ.Storage.getMode("normal"),
        window.XQ.Storage.getMode("rebel"),
        window.XQ.Storage.getMode("random"),
        window.XQ.Storage.getMode("recruit"),
      ]);
      if (request !== slotRequest) return;
      setSlotButton("startNormalBtn", normal, "常规模式");
      setSlotButton("startRebelBtn", rebel, "义军破敌");
      setSlotButton("startRandomBtn", random, "随机棋模式");
      setSlotButton("startRecruitBtn", recruit, "招兵买马模式");
    } catch (err) {
      console.warn("save slot summary failed:", err.message);
    }
  }

  function setSlotButton(id, data, label) {
    const resumable = Boolean(data?.battleInProgress);
    const prefix = resumable ? "继续" : "开始";
    const suffix = resumable ? ` · 第 ${data.level || 1} 关` : "";
    $(id).textContent = `${prefix}${label}${suffix}`;
  }

  function unlocked(state) {
    const t = state.talents || {};
    const list = [];
    if (t.retain > 0) list.push(`传承锦囊 ${t.retain}：新征程可保留 ${t.retain} 个局内道具`);
    if (t.outerTempoOffer) list.push("第一关 0 积分局外双步虎符已开放");
    if (t.outerTempoOffer) list.push("道具图鉴已解锁");
    if (t.randomModeUnlocked) list.push("随机棋模式已解锁");
    if (t.recruitModeUnlocked) list.push("招兵买马模式已解锁");
    if (t.chess?.S) list.push("主教改制已解锁");
    if (t.chess?.Q) list.push("皇后改制已解锁");
    if (t.shopUnlocks?.turtleShell) list.push("局内随机商店已解锁龟壳");
    if (t.shopUnlocks?.rabbitFoot) list.push("局内随机商店已解锁兔脚");
    if (t.shopUnlocks?.advisorStride) list.push("局内随机商店已解锁仕途通达");
    if (t.shopUnlocks?.horseSale) list.push("马系列局内商店售价减半");
    if (t.shopUnlocks?.endure) list.push("局内随机商店已解锁卧薪尝胆");
    if (t.shopUnlocks?.charmMakeup) list.push("局内随机商店已解锁媚妆");
    if (t.captureGalleryUnlocked) list.push("棋子被俘剧情图鉴已解锁");
    if (t.prisonGalleryUnlocked && t.defeatGalleryUnlocked) list.push("关押剧情图鉴与义军兵败剧情图鉴已解锁");
    (t.outerItems || []).forEach((item) => list.push(item.name));
    return list.length ? list : ["暂无已解锁道具"];
  }

  return { hide, refresh, show };
})();
