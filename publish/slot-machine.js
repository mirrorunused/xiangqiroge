window.XQ = window.XQ || {};

window.XQ.SlotMachine = (() => {
  const Symbols = window.XQ.SlotSymbols;
  const View = window.XQ.SlotView;
  const Dialogs = window.XQ.SlotDialogs;
  const ROUNDS = 10;
  const MARKET_CLUE_COST = 1500;
  const GUARANTEE_FLOOR = 1200;
  const GUARANTEE_NOTICE = "救醒你的胡茬大汉拦住了你，拿出一包黄金拍在你胸口，利落地把你转了个身，推出宝库“别找了，这些给你，拿去用”。（获得1200积分）";
  const wait = (ms) => new Promise((resolve) => setTimeout(resolve, ms));
  let state;
  let options;
  let open = false;
  let busy = false;
  let claimed = 0;
  let error = "";
  let guaranteed = false;
  let marketOutcome = "";

  function snapshot() {
    return JSON.parse(JSON.stringify(state));
  }

  function restore(saved) {
    Object.keys(state).forEach((key) => delete state[key]);
    Object.assign(state, saved);
  }

  async function commit(saved) {
    try {
      await options.save();
      options.onUpdate?.();
      error = "";
      return true;
    } catch (err) {
      restore(saved);
      error = "保存失败，本次操作已撤销，请稍后重试。";
      console.error("slot save failed:", err?.code || "unknown", err?.message, err?.stack || "");
      render();
      return false;
    }
  }

  function makeSession(purchased = false) {
    return {
      spin: 0,
      riskChance: 5,
      total: 0,
      entry: purchased ? "black-market" : "free",
      pool: Symbols.starter(),
      grid: [],
      choices: [],
      details: [],
      lastPoints: 0,
      phase: "ready",
    };
  }

  async function start() {
    if (busy || state.talents.slotSession) return;
    const uses = state.talents.slotUses || 0;
    const purchased = uses < 1;
    if (purchased) {
      busy = true;
      render();
      const confirmed = await Dialogs.purchase(state.score || 0, MARKET_CLUE_COST);
      busy = false;
      if (!confirmed) {
        if ((state.score || 0) < MARKET_CLUE_COST) {
          error = `当前没有搜寻次数，需要 ${MARKET_CLUE_COST} 积分购买黑市线索。`;
        }
        render();
        return;
      }
    }
    if (purchased && (state.score || 0) < MARKET_CLUE_COST) {
      error = `当前没有搜寻次数，需要 ${MARKET_CLUE_COST} 积分购买黑市线索。`;
      render();
      return;
    }
    busy = true;
    const saved = snapshot();
    if (purchased) state.score -= MARKET_CLUE_COST;
    else state.talents.slotUses -= 1;
    state.talents.slotSession = makeSession(purchased);
    claimed = 0;
    await commit(saved);
    busy = false;
    render();
  }

  async function spin() {
    const session = state.talents.slotSession;
    if (busy || !["ready", "escape"].includes(session?.phase)) return;
    busy = true;
    render();
    for (let step = 0; step < 6 && open; step += 1) {
      View.grid(Symbols.grid(session.pool), true);
      window.XQ.FX?.tone?.(280 + step * 35, 45);
      await wait(85);
    }
    if (!open) {
      busy = false;
      return;
    }
    const saved = snapshot();
    const finalGrid = Symbols.grid(session.pool);
    const nextRound = session.spin + 1;
    const risk = Symbols.riskChance(nextRound, session.riskChance);
    if (risk > 0 && Math.random() < risk / 100) {
      const confiscated = Math.floor(Math.max(0, session.total) * 0.1);
      session.spin = nextRound;
      session.grid = finalGrid;
      session.lastPoints = 0;
      session.details = [`近卫军截获（${risk}%）`];
      state.score += confiscated;
      state.talents.slotStats.plays += 1;
      state.talents.slotStats.best = Math.max(state.talents.slotStats.best, confiscated);
      state.talents.slotSession = null;
      const committed = await commit(saved);
      busy = false;
      if (committed) {
        claimed = confiscated;
        window.XQ.FX?.tone?.(180, 360);
      }
      render();
      if (committed) {
        await Dialogs.notice(
          "曌帝近卫军发现了你",
          `近卫军截获了大部分搜寻物资，你只能带走本局奖励的 10%，获得 ${confiscated} 积分。此次不触发保底。`,
          "red",
        );
      }
      return;
    }
    const result = Symbols.score(finalGrid, session.spin + 1, session.pool);
    session.spin += 1;
    session.grid = finalGrid;
    session.lastPoints = result.total;
    session.total += result.total;
    session.details = result.details;
    session.scene = Symbols.scene(session.spin);
    if (session.spin >= ROUNDS) session.riskChance = Symbols.nextRiskChance(risk);
    session.choices = Symbols.choices();
    session.phase = "choice";
    window.XQ.FX?.tone?.(session.spin < ROUNDS ? 520 : 720, 140);
    const committed = await commit(saved);
    busy = false;
    render();
  }

  async function choose(id) {
    const session = state.talents.slotSession;
    if (busy || session?.phase !== "choice" || !session.choices.includes(id)) return;
    busy = true;
    const saved = snapshot();
    session.pool.push(id);
    session.choices = [];
    session.phase = session.spin >= ROUNDS ? "escape" : "ready";
    await commit(saved);
    busy = false;
    render();
  }

  async function claim() {
    const session = state.talents.slotSession;
    if (busy || !["ready", "escape"].includes(session?.phase) || session.spin < ROUNDS - 1) return;
    busy = true;
    const saved = snapshot();
    const points = session.total;
    const guaranteedRound = points < GUARANTEE_FLOOR;
    const baseAwarded = Math.max(GUARANTEE_FLOOR, points);
    const blackMarket = !guaranteedRound && await Dialogs.settlement() === "market";
    const doubled = blackMarket && Math.random() < 0.5;
    const awarded = blackMarket ? Math.floor(baseAwarded * (doubled ? 2 : 0.1)) : baseAwarded;
    guaranteed = guaranteedRound;
    marketOutcome = guaranteedRound ? ""
      : blackMarket
      ? doubled ? `黑市兑换成功，物资翻倍，获得 ${awarded} 积分。` : `黑市失手，物资被曌帝近卫军截获，仅获得 ${awarded} 积分。`
      : `军需处清点物资后，兑换获得 ${awarded} 积分。`;
    state.score += awarded;
    state.talents.slotStats.plays += 1;
    state.talents.slotStats.best = Math.max(state.talents.slotStats.best, awarded);
    state.talents.slotSession = null;
    if (await commit(saved)) {
      claimed = awarded;
      window.XQ.FX?.tone?.(880, 300);
    } else {
      guaranteed = false;
      marketOutcome = "";
    }
    busy = false;
    render();
    if (guaranteed) await Dialogs.notice("胡茬大汉的保底", GUARANTEE_NOTICE, "gold");
    if (marketOutcome) await Dialogs.notice(blackMarket ? "黑市兑换结果" : "军需处结算", marketOutcome,
      blackMarket && !doubled ? "red" : "green");
  }

  function render() {
    View.render(state, claimed, busy, error, { start, spin, choose, claim });
    window.XQ.SlotLayout?.fit?.();
  }

  function close() {
    open = false;
    View.hide();
    options.onClose?.();
  }

  return {
    open(nextState, nextOptions) {
      state = nextState;
      options = nextOptions;
      window.XQ.Progression.ensure(state);
      open = true;
      busy = false;
      claimed = 0;
      guaranteed = false;
      marketOutcome = "";
      error = "";
      View.show(close);
      render();
      if (!state.talents.slotSession && state.talents.slotUses < 1) void start();
    },
  };
})();
