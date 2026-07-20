window.XQ = window.XQ || {};
window.XQ.Battle = {
  create(options) {
    const R = window.XQ.Rules, L = window.XQ.Levels, UI = window.XQ.Render;
    const FX = window.XQ.FX, Ops = window.XQ.StateOps, D = window.XQ.Drops;
    const Story = window.XQ.CaptureStory, Feedback = window.XQ.CombatFeedback, runtime = options.runtime;
    function state() { return options.getState(); }
    async function onPiece(id) {
      const s = state();
      if (runtime.busy() || await window.XQ.RandomPlacement.handlePiece(s, id)) return;
      if (s.phase !== "play" || s.side !== "r") return;
      await runtime.run("board", async () => {
        const piece = s.board.find((item) => item.id === id);
        if (!piece || await special(s, piece)) return;
        if (piece.side !== "r") {
          return window.XQ.BoardPreview.handlePiece(s, piece, moveTo, options.render);
        }
        window.XQ.BoardPreview.clear(s);
        s.selected = id;
        s.legal = R.legalMoves(s.board, id, s);
        s.message = s.legal.length ? "选择落点" : "这枚棋子当前无合法走法";
        options.render();
      });
    }
    async function special(s, piece) {
      const Act = window.XQ.Actions;
      for (const handler of [Act.destroy, Act.weaken, Act.donate, Act.morph]) {
        const result = await handler(s, piece);
        if (!result) continue;
        if (result.changed || result.killed) {
          options.render();
          await options.saveNow();
          await checkOutcome();
        }
        return true;
      }
      return false;
    }
    async function onMove(x, y) {
      const s = state();
      if (runtime.busy() || (s.phase !== "play" && !s.pendingRevive && !window.XQ.RandomPlacement.active(s))) return;
      await runtime.run("board", () => moveTo(x, y));
    }
    async function moveTo(x, y) {
      const s = state();
      if (await window.XQ.RandomPlacement.handleMove(s, x, y)) return;
      if (s.pendingRevive) {
        if (!s.legal.some((move) => move.x === x && move.y === y)) return;
        Ops.snapshot(s);
        const result = await window.XQ.Revive.place(s, x, y);
        if (!result) return;
        if (result.text) UI.banner(result.text);
        if (!await checkOutcome() && s.side === "r") {
          if (result.consumesAction) finishRed();
          else options.render();
        }
        return saveAndContinue();
      }
      if (!s.selected || !s.legal.some((move) => move.x === x && move.y === y)) return;
      window.XQ.BoardPreview.clear(s); Ops.snapshot(s);
      const event = await applyMove(s.selected, x, y, "r");
      if (event.text) UI.banner(event.text);
      options.render();
      await Feedback.present(s);
      if (event.story) await Story.show(s, event.story);
      if (!await checkOutcome() && s.side === "r") finishRed();
      return saveAndContinue();
    }
    async function applyMove(id, x, y, side) {
      const s = state();
      const result = R.move(s.board, id, x, y);
      s.board = result.board;
      s.lastMove = { id, x, y, from: result.from, side, captured: null };
      s.lastActionCaptured = false;
      let text = "", story = "", charmText = "";
      if (result.captured) {
        if (side === "r" && result.captured.side === "n" && result.captured.type === "G" && s.enemyFish?.active) Object.assign(s.enemyFish, { skipNextGrass: true, turns: 0 });
        text = window.XQ.Turtle.trigger(s, result, id) || window.XQ.KingGuard.trigger(s, result, id) || window.XQ.Rabbit.trigger(s, result, id);
        if (!text) {
          s.lastActionCaptured = true;
          if (side === "r" && result.captured.side === "b") {
            s.score += window.XQ.Items.captureScore(s, result.captured.type); const seen = s.mode === "rebel" && s.level > 15 ? s.postRescueStorySeen : s.captureStorySeen;
            if (!["random", "quick"].includes(s.mode) && !seen.includes(result.captured.type)) {
              seen.push(result.captured.type);
              story = result.captured.type;
            }
            if (s.enemyMomentum?.active) s.enemyBonusMoves = Math.min(2, (s.enemyBonusMoves || 0) + 1);
            charmText = window.XQ.Corruption?.onRedCapture?.(s, id) || "";
          } else if (side === "b" && result.captured.side === "r") {
            window.XQ.Mode.redCaptured(s, result.captured);
            charmText = [window.XQ.Charm?.onBlackCapture?.(s, result, id), window.XQ.Corruption?.onBlackCapture?.(s, id)].filter(Boolean).join("\n");
          } else if (side === "b" && result.captured.side === "b") charmText = window.XQ.Sacrifice?.onOwnCapture?.(s, result.captured) || "";
        }
        FX.tone(side === "r" ? 520 : 220, 80);
      } else FX.tone(side === "r" ? 360 : 180, 45);
      s.lastMove.captured = s.lastActionCaptured ? { ...result.captured } : null;
      const tileText = text ? "" : (window.XQ.Charm?.onRedMove?.(s, id) || window.XQ.Collapse?.enter?.(s, id, side) || "");
      const dropText = text || tileText ? "" : await D.collect(s, id, side);
      text = [text, charmText, tileText, dropText].filter(Boolean).join("\n");
      return { text, story };
    }
    function finishRed() {
      const s = state();
      const flow = window.XQ.TurnFlow.afterRedAction(s);
      window.XQ.BoardPreview.clear(s); s.selected = null; s.legal = [];
      if (s.playerMovesLeft > 0) s.message = flow.reason === "meteor-warning"
        ? "未吃子，飒沓流星失效，黑方即将行动三次"
        : `红方继续行动，还剩 ${s.playerMovesLeft} 步`;
      else {
        s.side = "b";
        s.message = flow.reason === "meteor" ? `飒沓流星反噬：黑方将连续行动 ${s.enemyMovesLeft} 步`
          : s.enemyMovesLeft > 1 ? `盈不可久：黑方将连续行动 ${s.enemyMovesLeft} 步` : "黑方思考中";
      }
      if (flow.notice) UI.banner(flow.notice);
      options.render();
    }
    async function enemyTurn() {
      const s = state();
      if (runtime.isLocked("enemy") || s.phase !== "play" || s.side !== "b") return;
      await runtime.run("enemy", async () => {
        if (s.enemyFrozen > 0) skipEnemy(s);
        else {
          const move = window.XQ.AI.choose(s);
          if (!move) return options.win("黑方无路可走，破阵成功");
          const event = await applyMove(move.id, move.x, move.y, "b");
          if (event.text) UI.banner(event.text);
          options.render();
          await Feedback.present(s);
          if (await checkOutcome()) return;
          window.XQ.Turtle.afterEnemyAction(s); window.XQ.Rabbit.afterEnemyAction(s);
          finishEnemy(s);
          if (s.side === "r" && window.XQ.Outcome.redLocked(s) && await checkOutcome()) return;
        }
        options.render();
        void options.saveSoon();
        if (s.phase === "play" && s.side === "b") setTimeout(enemyTurn, 420);
      });
    }
    function skipEnemy(s) {
      s.enemyFrozen -= 1;
      s.enemyMovesLeft = 0;
      startPlayer(s, "冻结生效，黑方跳过行动");
    }
    function finishEnemy(s) {
      if ((s.enemyMovesLeft || 1) > 1) {
        s.enemyMovesLeft -= 1;
        s.message = s.enemyTurnSource === "meteor"
          ? `飒沓流星反噬：黑方继续行动，还剩 ${s.enemyMovesLeft} 步`
          : `盈不可久：黑方继续行动，还剩 ${s.enemyMovesLeft} 步`;
      } else if (s.playerFrozen > 0) {
        s.playerFrozen -= 1;
        s.enemyMovesLeft = 0;
        s.message = ["冻结生效，红方跳过行动", window.XQ.RoundEffects?.skipPlayerTurn?.(s)].filter(Boolean).join("\n");
        D.spawn(s, false);
      } else {
        startPlayer(s, R.inCheck(s.board, "r", s) ? "红帅被将军，先解围" : "红方行动");
        window.XQ.RandomMode.passLocked(s, R);
      }
    }
    function startPlayer(s, message) {
      s.side = "r";
      s.playerMovesLeft = (L.hasTempo(s) ? 2 : 1) + (s.playerBonusMoves || 0);
      s.playerBonusMoves = 0; s.enemyMovesLeft = 0; s.enemyTurnSource = null;
      const note = window.XQ.KingGuard.refreshDivine(s);
      const meteor = window.XQ.Meteor.startTurn(s);
      D.spawn(s, false);
      const round = window.XQ.RoundEffects?.startTurn?.(s);
      s.message = [message, note, meteor, round].filter(Boolean).join("\n");
    }
    async function checkOutcome() {
      const s = state();
      if (window.XQ.RandomPlacement.active(s)) return false;
      const randomResult = await window.XQ.RandomMode.checkOutcome(s, options, R);
      if (randomResult !== null) return randomResult;
      let result = null;
      if (window.XQ.Outcome.onlyKings(s)) result = options.lose("红方只剩红帅，按挑战规则本局结束");
      else if (!s.board.some((piece) => piece.side === "r" && piece.type === "K")) result = options.lose();
      else if (!s.board.some((piece) => piece.side === "b" && piece.type === "K")) result = options.win("斩将成功");
      else if (!R.sideMoves(s.board, "b", s).length) result = options.win("黑方无合法走法");
      else if (s.side === "r" && window.XQ.Outcome.redLocked(s)) result = options.lose("红方无合法走法，挑战失败");
      if (result) {
        await result;
        return true;
      }
      return false;
    }
    async function saveAndContinue() {
      options.render();
      void options.saveSoon();
      if (state().phase === "play" && state().side === "b") setTimeout(enemyTurn, 420);
    }
    return { checkOutcome, enemyTurn, onMove, onPiece };
  },
};
