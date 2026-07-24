window.XQ = window.XQ || {};

window.XQ.AppSupport = {
  create(options) {
    const UI = window.XQ.Render;
    const Menus = window.XQ.Menus;
    const Pre = window.XQ.Prebattle;

    function state() { return options.getState(); }

    function activateCard(card) {
      const s = state();
      const Act = window.XQ.Actions;
      if (card.id === "revive") return window.XQ.Revive.start(s, options.render);
      if (card.id === "destroy") Act.startDestroy(s, options.render, options.saveSoon);
      if (card.id === "morph") Act.startMorph(s, options.render, options.saveSoon, card);
      if (card.id === "pawnSpell") Act.startWeaken(s, options.render, options.saveSoon, card);
      if (card.id === "donate") Act.startDonate(s, options.render, options.saveSoon);
      if (card.id === "offboard") return window.XQ.Shooter.start();
    }

    function showNotices() {
      const s = state();
      const Act = window.XQ.Actions;
      return Act.tempoNotice(s, options.render, options.saveNow, showNotices)
        || Act.hardNotice(s, options.render, options.saveNow, showNotices)
        || Act.outerTempoNotice(s, options.render, options.saveNow);
    }

    function openRebel() {
      UI.showCards("义军破敌（正式版）", `${window.XQ.Mode.REBEL_STORY}\n\n规则：红方棋子阵亡后，后续关卡不再自动补足，只能通过归阵令取回。本模式不发放、出售或启用双步道具；每轮开局只能选择一件已拥有的局外道具带入；通关记录单独计算。`, [{
        id: "start",
        name: "进入义军征程",
        rarity: "red",
        text: "确认后读取义军破敌的独立自动存档。",
      }], async () => {
        UI.hideRewards();
        await options.selectMode("rebel");
      }, "story");
    }

    async function openNormal() {
      await options.selectMode("normal");
    }

    async function canResume(mode) {
      try {
        const saved = await window.XQ.Storage.getMode(mode);
        return Boolean(saved?.battleInProgress);
      } catch (err) {
        console.warn(`${mode} resume check failed:`, err.message);
        return false;
      }
    }

    async function openRandom() {
      const resume = await canResume("random");
      UI.showCards("随机棋模式", "开局逐枚随机获得 16 枚棋子，每种棋子都可能出现 0–16 枚，不固定发放帅。某类棋子超过 3 枚时，对应棋子道具的出现率提高。另免费发放“将帅出宫”和“仕出宫”，不计入 5 个开局随机道具，进入布阵前会展示本轮初始道具。每局结束后，留在敌方半场的存活棋子会随机撤回己方半场，己方半场棋子保持原位。拾取的变车、变后效果仅持续本局，帅也可变形。前 5 关可直接跳过；全军覆没才会失败。本模式不播放剧情。", [{
        id: "start",
        name: resume ? "继续随机棋模式" : "进入随机棋征程",
        rarity: "gold",
        text: resume ? "读取上次暂离的随机棋战局，不重新生成开局棋子和道具。" : "局内商店只出售积分加成与消耗品，完整敌军关刷新时有概率出现破军令；局外道具仅积分加成类生效。",
      }], async () => {
        UI.hideRewards();
        await options.selectMode("random");
      }, "story");
    }

    async function openRecruit() {
      const resume = await canResume("recruit");
      UI.showCards("招兵买马模式", "每轮开始前自由选择红方棋子并自由布阵，按棋子价值从当前积分中扣除出阵费用；积分不足或为负时不能开始。另免费发放“将帅出宫”和“仕出宫”，不计入 5 个开局随机道具，进入布阵前会展示本轮初始道具。每局结束后，留在敌方半场的存活棋子会随机撤回己方半场，己方半场棋子保持原位。拾取的变车、变后效果仅持续本局，帅也可变形。前 5 关可直接跳过；红方棋子全部被吃才会失败。本模式不播放剧情。", [{
        id: "start",
        name: resume ? "继续招兵买马模式" : "进入招兵买马征程",
        rarity: "gold",
        text: resume ? "读取上次暂离的招兵买马战局，保留当前棋子选择和布阵。" : "默认提供标准 16 子阵容，可在布阵阶段增删棋子；最多 16 枚，开始战斗时一次性结算费用。",
      }], async () => {
        UI.hideRewards();
        await options.selectMode("recruit");
      }, "story");
    }

    function openQuick() {
      UI.showCards("快速模式", "无需解锁，只进行一局。红方以全子开局并获得 5 个随机道具，抽取池包含尚未解锁的道具，进入战斗前会展示本局道具，且不会被关卡屏蔽；黑方必为全子，并从现有完整关卡中随机抽取，可能出现组合技。胜利固定奖励 1000 积分。本模式不播放剧情。", [{
        id: "start",
        name: "开始快速挑战",
        rarity: "purple",
        text: "每次进入都会重新随机关卡与开局道具，现有局外道具不生效。",
      }], async () => {
        UI.hideRewards();
        await options.selectQuick();
      }, "story");
    }

    function preActions() {
      const jump = async (level) => {
        const s = state();
        s.level = level;
        window.XQ.StateOps.beginLevel(s);
        options.render();
        await options.saveNow();
        Pre.refresh(s);
      };
      const grant = async () => {
        const s = state();
        s.score += 5000;
        options.render();
        await options.saveNow();
        Pre.refresh(s);
      };
      const grantSlot = async () => {
        const s = state();
        window.XQ.Progression.grantSlotUse(s);
        options.render();
        await options.saveNow();
        Pre.refresh(s);
      };
      return {
        normal: openNormal, rebel: openRebel, random: openRandom, recruit: openRecruit, quick: openQuick, slot: options.slot, load: options.manualLoad,
        talent: () => Menus.talent(state(), () => Pre.refresh(state()), { mainMenu: true }),
        achievements: () => window.XQ.Achievements.open(state()),
        codex: () => window.XQ.ItemCodex.open(state()),
        gallery: () => window.XQ.StoryGallery.open(state()),
        settings: options.settings,
        test: () => window.XQ.ComboNav.openTest(state(), { jump, grant, grantSlot }),
      };
    }

    return { activateCard, preActions, showNotices };
  },
};
