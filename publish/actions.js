window.XQ = window.XQ || {};

window.XQ.Actions = (() => {
  const UI = window.XQ.Render;
  const C = window.XQ.Config;
  const Ops = window.XQ.StateOps;
  const labels = C.labels.b;

  function tempoNotice(state, render, save) {
    if (state.mode !== "normal") {
      state.tempoNotice = false;
      window.XQ.Mode.stripTempo(state);
      return false;
    }
    if (!state.tempoNotice) return false;
    UI.showCards("双步虎符", "神秘人相助：能来到这里，勇气可嘉，且让我助你一臂之力", [{
      id: "ok",
      name: "知道了",
      rarity: "red",
      text: "每回合红方可走两步，累计 25 道具后失效。",
    }, { id: "no", name: "我不要", rarity: "white", text: "拒绝本次赠送的双步虎符。" }], async (card) => {
      if (card.id === "no") {
        state.items = state.items.filter((item) => item.id !== "tempo");
        state.tempoDeclined = true;
        state.tempoNotice = false;
      } else {
        state.tempoNotice = false;
      }
      UI.hideRewards();
      await save();
      render();
    }, "locked");
    return true;
  }

  function startDestroy(state, render, save) {
    state.pendingDestroy = state.pendingDestroy || true;
    state.selected = null;
    state.legal = [];
    state.message = "选择一个敌方棋子消灭";
    render();
    save();
  }

  function startWeaken(state, render, save, card) {
    state.pendingWeaken = state.pendingWeaken || (card ? pending(card) : true);
    state.selected = null;
    state.legal = [];
    state.message = "选择敌方一个非将帅棋子变为卒";
    render();
    save();
  }

  function startMorph(state, render, save, card) {
    state.pendingMorph = state.pendingMorph || pending(card);
    state.selected = null;
    state.legal = [];
    state.message = `选择一枚红方非帅棋子改为${C.labels.r[card.targetType]}`;
    render();
    save();
  }

  function startDonate(state, render, save) {
    state.pendingDonate = state.pendingDonate || true;
    state.selected = null;
    state.legal = [];
    state.message = "选择己方非帅棋子赠予敌军";
    render();
    save();
  }

  async function destroy(state, piece) {
    if (!state.pendingDestroy) return null;
    if (piece.side !== "b") {
      UI.banner("请选择敌方棋子");
      return { done: true };
    }
    Ops.snapshot(state);
    state.board = state.board.filter((item) => item.id !== piece.id);
    state.pendingDestroy = false;
    state.message = `已消灭${labels[piece.type]}`;
    return { done: true, killed: true };
  }

  async function weaken(state, piece) {
    if (!state.pendingWeaken) return null;
    if (piece.side !== "b" || piece.type === "K" || piece.type === "P") {
      UI.banner("请选择敌方非将帅棋子");
      return { done: true };
    }
    const data = typeof state.pendingWeaken === "object" ? state.pendingWeaken : {};
    const cost = data.cost || 0;
    if (state.score < cost) {
      UI.banner("积分不足");
      return { done: true };
    }
    Ops.snapshot(state);
    state.score -= cost;
    piece.type = "P";
    state.pendingWeaken = false;
    state.message = "已将敌方棋子变为卒";
    return { done: true, changed: true };
  }

  async function morph(state, piece) {
    if (!state.pendingMorph) return null;
    const data = typeof state.pendingMorph === "string" ? { targetType: state.pendingMorph, cost: 0 } : state.pendingMorph;
    if (piece.side !== "r" || piece.type === "K") {
      UI.banner("请选择己方非帅棋子");
      return { done: true };
    }
    const cost = data.cost || 0;
    if (state.score < cost) {
      UI.banner("积分不足");
      return { done: true };
    }
    Ops.snapshot(state);
    state.score -= cost;
    piece.type = data.targetType;
    state.morphs[piece.id] = data.targetType;
    state.morphBought[data.targetType] = (state.morphBought[data.targetType] || 0) + 1;
    if (data.name) state.items.push({
      id: `morph-${data.targetType}`, uid: `m${Date.now()}${Math.random().toString(16).slice(2)}`,
      name: data.name, rarity: data.rarity, text: data.text, value: 1, level: state.level,
    });
    state.pendingMorph = null;
    state.message = `改制完成：${C.labels.r[data.targetType]}`;
    return { done: true, changed: true };
  }

  async function donate(state, piece) {
    if (!state.pendingDonate) return null;
    if (piece.side !== "r" || piece.type === "K") {
      UI.banner("请选择己方非帅棋子");
      return { done: true };
    }
    Ops.snapshot(state);
    const points = C.values[piece.type] || 0;
    piece.side = "b";
    state.score += points;
    state.pendingDonate = false;
    if (state.morphs) delete state.morphs[piece.id];
    state.message = `已赠予${C.labels.r[piece.type]}，积分 +${points}`;
    return { done: true, changed: true };
  }

  function pending(card) {
    return { targetType: card.targetType, cost: card.cost || 0, shopUid: card.shopUid, name: card.name, rarity: card.rarity, text: card.text };
  }

  function hardNotice(state, render, save) {
    if (!state.hardNotice) return false;
    UI.showCards("敌军奇阵", state.hardNotice, [{ id: "ok", name: "迎战", rarity: "purple", text: "本关黑方开局携带额外道具。" }], async () => {
      state.hardNotice = "";
      UI.hideRewards();
      await save();
      render();
    }, "locked");
    return true;
  }

  function outerTempoNotice(state, render, save) {
    const t = state.talents || {};
    if (state.mode !== "normal") {
      t.outerTempoNotice = false;
      return false;
    }
    if (!t.outerTempoNotice) return false;
    UI.showCards("局外商店", "为降低难度，局外商店第一关时售卖双步道具，售价0积分", [{ id: "ok", name: "知道了", rarity: "red", text: "前往第一关局外天赋可购买。" }], async () => {
      t.outerTempoNotice = false;
      UI.hideRewards();
      await save();
      render();
    }, "locked");
    return true;
  }

  return { destroy, donate, hardNotice, morph, outerTempoNotice, startDestroy, startDonate, startMorph, startWeaken, tempoNotice, weaken };
})();
