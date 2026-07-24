window.XQ = window.XQ || {};

window.XQ.SlotView = (() => {
  const Symbols = window.XQ.SlotSymbols;
  const $ = (id) => document.getElementById(id);
  const SAFE_ROUNDS = 9;
  const TOTAL_ROUNDS = 10;
  let textMode = false;
  let lastRender = null;

  function updateModeButton() {
    const button = $("slotModeBtn");
    button.textContent = textMode ? "图" : "字";
    button.title = textMode ? "切换为图片模式" : "切换为文字模式";
    button.setAttribute("aria-label", button.title);
    button.setAttribute("aria-pressed", String(textMode));
  }

  function icon(id) {
    const data = Symbols.icon(id);
    const element = document.createElement("span");
    element.className = "slot-icon";
    if (textMode) {
      const symbol = Symbols.get(id);
      element.classList.add("slot-icon-text");
      element.textContent = symbol.mark || symbol.name.slice(0, 2);
      element.setAttribute("aria-label", symbol.name);
      return element;
    }
    element.style.backgroundImage = `url("${data.src}")`;
    element.style.backgroundPosition = data.position;
    element.style.backgroundSize = data.size;
    element.setAttribute("aria-hidden", "true");
    return element;
  }

  function grid(ids, spinning = false) {
    $("slotGrid").innerHTML = "";
    const cells = ids.length ? ids : Array(9).fill(null);
    cells.forEach((id) => {
      const cell = document.createElement("div");
      cell.className = `slot-cell${spinning ? " spinning" : ""}${id ? ` rarity-${Symbols.get(id).rarity}` : " empty"}`;
      if (id) {
        const symbol = Symbols.get(id);
        const categories = symbol.categories || [];
        if (categories.includes("军需品")) cell.classList.add("category-military");
        const label = document.createElement("span");
        label.className = "slot-cell-label";
        label.textContent = `${symbol.name}${categories.length ? ` · ${categories.join(" · ")}` : ""}`;
        cell.append(icon(id), label);
      }
      $("slotGrid").appendChild(cell);
    });
  }

  function pool(ids) {
    const groups = {};
    ids.forEach((id) => {
      const symbol = Symbols.get(id);
      const category = symbol.categories?.[0] || "";
      groups[category] = groups[category] || {};
      groups[category][id] = (groups[category][id] || 0) + 1;
    });
    const target = $("slotPool");
    target.textContent = Object.entries(groups)
      .map(([category, counts]) => `${category ? `${category}：` : ""}${Object.entries(counts)
        .map(([id, count]) => `${Symbols.get(id).name}×${count}`).join("、")}`)
      .join(" · ");
    target.disabled = !ids.length;
    target.onclick = () => showPoolDetails(ids);
  }

  function showPoolDetails(ids) {
    const counts = {};
    ids.forEach((id) => { counts[id] = (counts[id] || 0) + 1; });
    const cards = Object.entries(counts).map(([id, count]) => {
      const symbol = Symbols.get(id);
      const value = `${symbol.value >= 0 ? "+" : ""}${symbol.value}`;
      const rarity = symbol.rarity === "rare" ? "gold" : symbol.rarity === "uncommon" ? "green" : "white";
      const categories = symbol.categories || [];
      return {
        id,
        name: `${symbol.name} ×${count}${categories.length ? ` · ${categories.join(" · ")}` : ""}`,
        rarity,
        text: `被搜寻到时 ${value} 分。\n${symbol.text}`,
      };
    });
    window.XQ.Render?.showCards?.(
      "当前物品效果",
      `当前物品池共 ${ids.length} 件物品。`,
      cards,
      () => {},
      "save",
    );
  }

  function choices(session, choose) {
    $("slotChoices").innerHTML = "";
    session.choices.forEach((id) => {
      const symbol = Symbols.get(id);
      const button = document.createElement("button");
      button.type = "button";
      const categories = symbol.categories || [];
      button.className = `slot-choice rarity-${symbol.rarity}`;
      if (categories.includes("军需品")) button.classList.add("category-military");
      const value = `${symbol.value >= 0 ? "+" : ""}${symbol.value}`;
      const title = document.createElement("strong");
      title.textContent = `${symbol.name}${categories.length ? ` · ${categories.join(" · ")}` : ""}`;
      const description = document.createElement("span");
      description.className = "slot-choice-text";
      description.textContent = `被搜寻到时 ${value} 分。\n${symbol.text}`;
      button.append(icon(id), title, description);
      button.onclick = () => void choose(id);
      $("slotChoices").appendChild(button);
    });
  }

  function base(state, session, claimed, busy) {
    const remaining = session ? Math.max(0, SAFE_ROUNDS - session.spin) : SAFE_ROUNDS;
    $("slotUsesText").textContent = `${remaining} 次`;
    $("slotSpinText").textContent = `${session?.spin || 0}/${TOTAL_ROUNDS}`;
    $("slotTotalText").textContent = session ? session.total : claimed;
    $("slotActionBtn").disabled = busy;
    $("slotRetreatBtn").classList.add("hidden");
    $("slotRetreatBtn").disabled = true;
    $("slotChoices").innerHTML = "";
  }

  function render(state, claimed, busy, error, handlers) {
    lastRender = { state, claimed, busy, error, handlers };
    updateModeButton();
    const session = state.talents.slotSession;
    base(state, session, claimed, busy);
    if (claimed) return renderClaimed(state, claimed, busy, error, handlers);
    if (!session) return renderIdle(state, busy, error, handlers);
    grid(session.grid);
    pool(session.pool);
    $("slotDetails").textContent = session.details.length ? `${session.details.join(" · ")} · 本轮 +${session.lastPoints}` : "等待搜寻";
    if (error) $("slotStatus").textContent = error;
    else if (session.phase === "choice") $("slotStatus").textContent = session.scene || Symbols.scene(session.spin);
    else if (session.phase === "escape") $("slotStatus").textContent = session.spin >= TOTAL_ROUNDS
      ? Symbols.riskScene(session.spin + 1, session.riskChance)
      : `${session.scene || Symbols.scene(session.spin)}\n选择继续搜寻，或直接撤离。`;
    else if (session.spin >= 9) $("slotStatus").textContent = Symbols.riskScene(session.spin + 1, session.riskChance);
    else $("slotStatus").textContent = `准备第 ${session.spin + 1} 轮，当前池中有 ${session.pool.length} 件物品。`;
    if (session.phase === "choice") {
      $("slotActionBtn").textContent = "先选择新物品";
      $("slotActionBtn").disabled = true;
      choices(session, handlers.choose);
    } else if (session.phase === "escape") {
      const chance = Symbols.riskChance(session.spin + 1, session.riskChance);
      $("slotActionBtn").textContent = busy ? "准备中…" : `继续搜寻第 ${session.spin + 1} 轮（风险 ${chance}%）`;
      $("slotActionBtn").onclick = handlers.spin;
      $("slotRetreatBtn").textContent = "直接撤离";
      $("slotRetreatBtn").classList.remove("hidden");
      $("slotRetreatBtn").disabled = busy;
      $("slotRetreatBtn").onclick = handlers.claim;
    } else {
      const dangerous = session.spin >= 9;
      const chance = Symbols.riskChance(session.spin + 1, session.riskChance);
      $("slotActionBtn").textContent = busy ? "搜寻中…" : dangerous
        ? `继续搜寻第 ${session.spin + 1} 轮（风险 ${chance}%）`
        : `搜寻第 ${session.spin + 1} 轮`;
      $("slotActionBtn").onclick = handlers.spin;
      if (dangerous) {
        $("slotRetreatBtn").textContent = "直接撤退";
        $("slotRetreatBtn").classList.remove("hidden");
        $("slotRetreatBtn").disabled = busy;
        $("slotRetreatBtn").onclick = handlers.claim;
      }
    }
  }

  function renderClaimed(state, claimed, busy, error, handlers) {
    grid([]);
    pool(Symbols.starter());
    $("slotStatus").textContent = error || `搜寻结算完成，共获得 ${claimed} 共享积分。`;
    $("slotDetails").textContent = `当前共享积分 ${state.score} · 历史最佳 ${state.talents.slotStats.best}`;
    $("slotActionBtn").textContent = "再开一局";
    $("slotActionBtn").disabled = busy;
    $("slotActionBtn").onclick = handlers.start;
    $("slotRetreatBtn").classList.add("hidden");
  }

  function renderIdle(state, busy, error, handlers) {
    grid([]);
    pool(Symbols.starter());
    $("slotStatus").textContent = error || "完成十轮搜寻；每轮结束从三件物品中选一件加入后续物品池。";
    $("slotDetails").textContent = state.talents.slotUses
      ? "每件物品提供基础积分，相邻与同行组合会追加联动积分。"
      : "当前没有免费搜寻次数，可花费 1500 积分从黑市购买线索。";
    $("slotActionBtn").textContent = state.talents.slotUses ? "开始搜寻" : "购买线索并开始";
    $("slotActionBtn").disabled = busy;
    $("slotActionBtn").onclick = handlers.start;
    $("slotRetreatBtn").classList.add("hidden");
  }

  return {
    grid,
    toggleMode() {
      textMode = !textMode;
      if (lastRender) render(
        lastRender.state,
        lastRender.claimed,
        lastRender.busy,
        lastRender.error,
        lastRender.handlers,
      );
    },
    hide() { $("slotModal").classList.add("hidden"); },
    render,
    show(close) {
      $("slotCloseBtn").onclick = close;
      textMode = false;
      $("slotModeBtn").onclick = () => {
        textMode = !textMode;
        if (lastRender) render(
          lastRender.state,
          lastRender.claimed,
          lastRender.busy,
          lastRender.error,
          lastRender.handlers,
        );
      };
      updateModeButton();
      $("slotModal").classList.remove("hidden");
      window.XQ.SlotLayout?.fit?.();
    },
  };
})();
