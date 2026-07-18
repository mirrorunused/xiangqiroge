window.XQ = window.XQ || {};
window.XQ.Render = (() => {
  const C = window.XQ.Config;
  const $ = (id) => document.getElementById(id);
  const els = {};
  let currentState = null;
  function init() {
    ["board", "gameTitle", "levelText", "scoreText", "multText", "itemText", "tempoText",
      "turnText", "tipText", "banner", "rewardModal", "rewardCards",
      "rewardIntro", "nextBtn", "hintBtn", "undoBtn", "shopBtn", "talentBtn",
      "itemsBtn", "moreBtn", "restartBtn", "saveBtn", "loadBtn", "settingsBtn", "leaveBtn", "giveUpBtn", "modalCloseBtn"].forEach((id) => { els[id] = $(id); });
    els.modalCloseBtn.addEventListener("click", hideRewards);
    els.levelText.addEventListener("click", () => window.XQ.LevelDetail?.open?.(currentState));
    els.levelText.title = "点击查看本关详情"; els.levelText.style.cursor = "pointer";
  }
  function pos(el, x, y) {
    el.style.left = `${5.5 + (x / 8) * 89}%`;
    el.style.top = `${5 + (y / 9) * 90}%`;
  }
  function drawBoard(state, handlers) {
    els.board.innerHTML = '<div class="river">楚河　　汉界</div>';
    state.legal.forEach((m) => {
      const cell = document.createElement("button");
      cell.className = "cell hint";
      cell.disabled = Boolean(handlers.busy);
      pos(cell, m.x, m.y);
      cell.setAttribute("aria-label", `落子 ${m.x},${m.y}`);
      cell.addEventListener("click", () => handlers.move(m.x, m.y));
      els.board.appendChild(cell);
    });
    (state.fieldItems || []).forEach((item) => {
      const token = document.createElement("div");
      token.className = "pickup";
      token.textContent = item.mark;
      token.title = item.name;
      pos(token, item.x, item.y);
      els.board.appendChild(token);
    });
    (state.collapseTiles || []).forEach((tile) => {
      const mark = document.createElement("div");
      mark.className = "collapse-tile";
      mark.textContent = "崩";
      mark.title = "崩落位";
      pos(mark, tile.x, tile.y);
      els.board.appendChild(mark);
    });
    state.board.forEach((p) => {
      const cell = document.createElement("button");
      cell.className = "cell";
      cell.disabled = Boolean(handlers.busy);
      pos(cell, p.x, p.y);
      cell.addEventListener("click", () => handlers.piece(p.id));
      const piece = document.createElement("span");
      piece.className = `piece ${p.side === "b" ? "black" : p.side === "n" ? "neutral" : "red"}`;
      piece.dataset.pieceId = p.id;
      piece.classList.add(`piece-type-${p.type}`);
      if (state.selected === p.id) piece.classList.add("selected");
      if (state.lastMove && state.lastMove.id === p.id) piece.classList.add("last");
      if (p.type === "K" && window.XQ.Rules.inCheck(state.board, p.side, state)) piece.classList.add("under-check");
      if ((p.type === "K" && hasKingGuard(state, p.side)) || p.id === state.enemyDivine?.targetId) piece.classList.add("guarded");
      const turtle = p.side === "b" ? state.enemyTurtle : p.side === "r" ? state.playerTurtle : null; if (p.type === "K" && turtle?.active) piece.classList.add("turtle-ready"); if (p.type === "K" && turtle?.shield > 0) piece.classList.add("turtle-shield");
      piece.textContent = C.labels[p.side]?.[p.type] || p.type;
      cell.appendChild(piece);
      els.board.appendChild(cell);
    });
  }
  function update(state, handlers) {
    currentState = state;
    const busy = Boolean(handlers.busy); const placing = window.XQ.RandomPlacement.active(state);
    document.querySelector(".command-panel").classList.toggle("placing", placing);
    drawBoard(state, handlers);
    els.gameTitle.textContent = `兴军讨曌-${({ normal: "常规模式", rebel: "义军破敌", random: "随机棋模式", quick: "快速模式" })[state.mode] || "常规模式"}`;
    els.levelText.textContent = window.XQ.Levels.levelName(state);
    els.scoreText.textContent = String(state.score);
    const mult = state.view?.scoreMult || state.scoreMult || 1;
    els.multText.textContent = `x${mult.toFixed(2)}`;
    els.itemText.textContent = String(state.items.length);
    const max = Math.max((window.XQ.Levels.hasTempo(state) ? 2 : 1) + (state.playerBonusMoves || 0), state.playerMovesLeft || 1);
    els.tempoText.textContent = `${Math.min(state.playerMovesLeft || max, max)}/${max}`;
    els.turnText.textContent = state.message;
    els.tipText.textContent = makeTip(state);
    const canSkip = ["normal", "random"].includes(state.mode) && state.phase === "play" && state.side === "r" && state.level <= 5;
    els.nextBtn.textContent = canSkip ? "跳过本关" : "下一关";
    els.nextBtn.classList.toggle("hidden", state.phase !== "rewarded" && !canSkip);
    els.nextBtn.disabled = busy || Boolean(state.pendingRevive);
    els.restartBtn.disabled = busy || placing;
    els.hintBtn.textContent = `提示(-${state.view?.hintCost || 0})`;
    els.hintBtn.disabled = busy || state.phase !== "play" || state.side !== "r";
    els.undoBtn.disabled = busy || !state.history.length || state.phase !== "play";
    els.shopBtn.disabled = busy || state.phase !== "play" || state.side !== "r";
    els.itemsBtn.disabled = busy;
    els.moreBtn.disabled = busy;
    els.talentBtn.disabled = busy;
    els.saveBtn.disabled = busy || state.side !== "r" || state.mode === "quick";
    els.loadBtn.disabled = busy;
    els.settingsBtn.disabled = busy; els.leaveBtn.disabled = busy || state.side !== "r";
    els.giveUpBtn.disabled = busy || state.phase !== "play";
    window.XQ.RandomPlacement.render(state);
  }
  function hasKingGuard(state, side) {
    if (side === "b") return Boolean(state.enemyTraits?.kingGuard);
    return (state.items || []).some((item) => item.id === "kingGuard");
  }
  function makeTip(state) {
    if (window.XQ.RandomPlacement.active(state)) return "选择待布置棋子，再点击己方半场空位；点击已摆棋子可撤回。";
    if (state.mode === "quick") return "击败黑将赢得本局，胜利固定奖励 1000 积分。";
    if (state.phase === "won") return "选择奖励后进入下一关。";
    if (state.meteorPenaltyPending) return "未吃子，飒沓流星失效，黑方即将行动三次。";
    if (state.meteorActive) return "飒沓流星生效：吃黑子可续行；首次未吃子将让黑方连续行动 3 步。";
    if (state.meteorPending) return "飒沓流星已购入，将在红方恢复行动时生效。";
    if ((state.playerMovesLeft || 1) > (window.XQ.Levels.hasTempo(state) ? 2 : 1)) return `卧薪尝胆生效：本回合可行动 ${state.playerMovesLeft} 次。`;
    if (window.XQ.Levels.hasTempo(state)) return "双行动生效：走满两步后敌人才行动。";
    if (state.items.length >= 25) return "已累计 25 个道具，双步虎符效果取消。";
    return "击败黑将，继续积累道具和积分。";
  }
  function banner(text) {
    els.banner.textContent = text;
    els.banner.classList.remove("hidden");
    setTimeout(() => els.banner.classList.add("hidden"), 1300);
  }
  function rewards(cards, onPick, intro) {
    showCards("战斗胜利", intro || "选择一个奖励继续进军。", cards, onPick, "reward");
  }
  function showCards(title, intro, cards, onPick, mode) {
    document.querySelector(".reward-box h2").textContent = title;
    els.rewardIntro.textContent = intro;
    els.modalCloseBtn.classList.toggle("hidden", mode === "reward" || mode === "locked");
    els.rewardCards.innerHTML = "";
    let busy = false;
    const runPick = async (card) => {
      if (busy) return;
      busy = true;
      els.rewardCards.setAttribute("aria-busy", "true");
      els.rewardCards.querySelectorAll("button").forEach((button) => { button.disabled = true; });
      try {
        await onPick(card);
      } catch (err) {
        console.error("card action failed:", err?.code || "unknown", err?.message, err?.stack || "");
      } finally {
        busy = false;
        els.rewardCards.removeAttribute("aria-busy");
        els.rewardCards.querySelectorAll("button").forEach((button) => { button.disabled = false; });
      }
    };
    cards.forEach((card, index) => {
      const btn = document.createElement(card.actions?.length ? "div" : "button");
      if (btn.tagName === "BUTTON") btn.type = "button";
      btn.className = `reward-card rarity-${card.rarity || "white"}`;
      if (btn.tagName === "DIV") {
        btn.tabIndex = 0;
        btn.setAttribute("role", "button");
        btn.addEventListener("keydown", (event) => {
          if (event.key !== "Enter" && event.key !== " ") return;
          event.preventDefault();
          runPick(card);
        });
      }
      const price = label(card, mode);
      const title = document.createElement("strong");
      title.className = "reward-title";
      const name = document.createElement("span");
      name.textContent = `${index + 1}. ${cardName(card, mode)}`;
      title.appendChild(name);
      (card.actions || []).forEach((action) => {
        const actionBtn = document.createElement("button");
        actionBtn.type = "button";
        actionBtn.className = "card-action";
        actionBtn.textContent = action.label;
        actionBtn.addEventListener("click", (event) => {
          event.stopPropagation();
          runPick({ ...card, action: action.id });
        });
        title.appendChild(actionBtn);
      });
      const text = document.createElement("span");
      text.textContent = `${price}${card.text}`;
      btn.append(title, text);
      btn.addEventListener("click", () => runPick(card));
      els.rewardCards.appendChild(btn);
    });
    els.rewardModal.classList.remove("hidden");
  }
  function label(card, mode) {
    if (mode === "reward") return "";
    if (mode === "shop") return `${card.cost} 积分 · `;
    if (mode === "save" || mode === "locked") return "";
    return card.cost ? `${card.cost} 积分 · ` : "";
  }
  function cardName(card, mode) {
    const tags = [];
    if (["supply", "shopFree", "letMove", "pawnSpell", "destroy", "donate", "kingGuard", "revive", "meteor"].includes(card.id)) tags.push("消耗品");
    if (["cannon", "banner", "oracle"].includes(card.id)) tags.push("可叠加");
    return tags.length ? `${card.name}（${tags.join("，")}）` : card.name;
  }
  function hideRewards() {
    els.rewardModal.classList.add("hidden");
  }
  return { banner, hideRewards, init, rewards, showCards, update };
})();
