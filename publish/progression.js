window.XQ = window.XQ || {};

window.XQ.Progression = (() => {
  function ensure(state) {
    const t = state.talents || (state.talents = {});
    t.chessStage = t.chessStage || 0;
    t.chess = Object.assign({ S: false, Q: false }, t.chess || {});
    t.outerTempoOffer = Boolean(t.outerTempoOffer);
    t.outerTempoNotice = Boolean(t.outerTempoNotice);
    t.randomModeUnlocked = Boolean(t.randomModeUnlocked || t.captureGalleryUnlocked);
    t.shopUnlocks = Object.assign({ rabbitFoot: false, turtleShell: false, advisorStride: false, horseSale: false, endure: false }, t.shopUnlocks || {});
    const rebelLevel = Math.max(state.mode === "rebel" ? state.level || 1 : 1, state.bestRecords?.rebel?.level || 1);
    if (rebelLevel > 15) unlockStoryGalleries(state);
    return t;
  }

  function finishRun(state) {
    const t = ensure(state);
    const unlocked = [];
    const tempo = state.mode === "normal" ? unlockTempo(state) : "";
    if (tempo) unlocked.push(tempo);
    if (t.chessStage < 2) {
      t.chessStage += 1;
      unlocked.push(t.chessStage === 1 ? "局外商店开放主教改制解锁。" : "局外商店开放皇后改制解锁。");
    }
    return unlocked;
  }

  function unlockTempo(state) {
    if (state.mode !== "normal") return "";
    const t = ensure(state);
    if (t.outerTempoOffer) return "";
    t.outerTempoOffer = true;
    t.outerTempoNotice = true;
    return "第一关局外商店开放 0 积分双步虎符。";
  }

  function unlockStoryGalleries(state) {
    const t = state.talents || (state.talents = {});
    if (state.mode !== "rebel" && (state.bestRecords?.rebel?.level || 1) <= 15) return "";
    const locked = !t.prisonGalleryUnlocked || !t.defeatGalleryUnlocked;
    t.prisonGalleryUnlocked = true;
    t.defeatGalleryUnlocked = true;
    return locked ? "已解锁关押剧情图鉴与义军兵败剧情图鉴。" : "";
  }

  function unlockComboShop(state) {
    const t = ensure(state);
    const unlocked = [];
    if (state.enemyRabbit && !t.shopUnlocks.rabbitFoot) {
      t.shopUnlocks.rabbitFoot = true;
      unlocked.push("已解锁局内随机商店道具“兔脚”：己方棋子被吃时可后跳避开。");
    }
    if (state.enemyTurtle && !t.shopUnlocks.turtleShell) {
      t.shopUnlocks.turtleShell = true;
      unlocked.push("已解锁局内随机商店道具“龟壳”：红帅可触发龟缩无敌。");
    }
    if (state.enemyEunuch && !t.shopUnlocks.advisorStride) {
      t.shopUnlocks.advisorStride = true;
      unlocked.push("已解锁局内随机商店道具“仕途通达”：仕可移动两格并越子。");
    }
    if (state.enemyHorse === 4 && !t.shopUnlocks.horseSale) {
      t.shopUnlocks.horseSale = true;
      unlocked.push("马系列局内商店售价已减半。");
    }
    if (state.enemyMomentum?.active && !t.shopUnlocks.endure) {
      t.shopUnlocks.endure = true;
      unlocked.push("已解锁局内随机商店道具“卧薪尝胆”：己方棋子被吃后，红方下一回合额外行动 1 次。");
    }
    return unlocked;
  }

  function failRun(state) {
    const t = ensure(state);
    const beforeStage = t.chessStage;
    const hadTempo = t.outerTempoOffer;
    const galleryLocked = !t.captureGalleryUnlocked;
    const randomLocked = !t.randomModeUnlocked;
    finishRun(state);
    t.captureGalleryUnlocked = true;
    if (state.mode !== "random") t.randomModeUnlocked = true;
    if (state.mode !== "random") window.XQ.OuterItems.clearRunTempo(state);
    state.keepUids = state.keepUids || [];
    const unlocked = [];
    if (state.mode === "normal" && !hadTempo && t.outerTempoOffer) unlocked.push("第一关局外商店开放 0 积分双步虎符。");
    if (t.chessStage > beforeStage) unlocked.push(t.chessStage === 1 ? "局外商店开放主教改制解锁。" : "局外商店开放皇后改制解锁。");
    if (galleryLocked) unlocked.push("已解锁棋子被俘剧情图鉴。");
    if (randomLocked && t.randomModeUnlocked) unlocked.push("已解锁随机棋模式。");
    return unlocked;
  }

  return { ensure, failRun, finishRun, unlockComboShop, unlockStoryGalleries, unlockTempo };
})();
