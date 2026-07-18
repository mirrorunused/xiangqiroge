window.XQ = window.XQ || {};

window.XQ.OuterItems = (() => {
  const blocked = ["supply", "revive", "pawnSpell", "donate", "shopFree", "kingGuard"];
  const prereqNames = {
    advisorFree: "局外仕出宫",
    kingFree: "局外将帅出宫",
    elephantRiver: "局外飞象渡河",
    horseStep: "局外马位移",
    horseLeap: "局外马腾跃",
    horseRun: "局外马驰骋",
    strongPawn: "局外强兵",
  };

  function count(state, id) {
    const local = (state.items || []).filter((item) => item.id === id).length;
    const outer = (state.talents?.outerItems || []).filter((item) => item.id === id).length;
    return local + outer;
  }

  function canList(state, item, canOffer) {
    if (blocked.includes(item.id)) return false;
    if (item.id === "advisorRiver") return count(state, item.id) === 0;
    return canOffer(state, item);
  }

  function textFor(item) {
    if (item.id === "banner") return "永久生效。每局过关基础积分 +12%，与其他破阵旗加算。";
    const prefix = item.requires ? `前置：需先购买${prereqNames[item.requires] || item.requires}。` : "";
    return `${prefix}永久生效。${item.text}`;
  }

  function cards(level, state, config, canOffer) {
    const special = specialCards(level, state);
    const normal = config.randomItems.filter((item) => canList(state, item, canOffer)).map((item, index) => ({
      ...item,
      id: `outer-${item.id}`,
      baseId: item.id,
      name: `局外${item.name}`,
      text: textFor(item),
      value: item.id === "banner" ? 1.12 : 1,
      cost: outerPrice(config, item.id),
    }));
    const cards = special.concat(normal);
    return state.mode === "random" ? cards.filter((card) => ["banner", "cannon"].includes(card.baseId)) : cards;
  }

  function specialCards(level, state) {
    const t = window.XQ.Progression.ensure(state);
    const cards = [];
    const hasTempo = (t.outerItems || []).some((item) => item.id === "tempo");
    if (state.mode === "normal" && level === 1 && t.outerTempoOffer && !hasTempo) {
      cards.push({ id: "outer-tempo", baseId: "tempo", name: "局外双步虎符", rarity: "red", text: "本轮无限制生效。每回合红方可走两步，战败后清空。", value: 1, cost: 0, stacks: false });
    }
    if (t.chessStage >= 1 && !t.chess.S) cards.push({ id: "unlock-S", name: "解锁主教改制", rarity: "purple", text: "局内商店开始出售改制主教令。", cost: 880 });
    if (t.chessStage >= 2 && !t.chess.Q) cards.push({ id: "unlock-Q", name: "解锁皇后改制", rarity: "gold", text: "局内商店开始出售改制皇后令。", cost: 1080 });
    return cards;
  }

  function outerPrice(config, id) {
    if (id === "rookPhoenix") return Math.round(outerCost(config, "elephantRiver") * 2);
    return outerCost(config, id);
  }

  function outerCost(config, id) {
    const index = config.randomItems.filter((item) => canListPrice(item)).findIndex((item) => item.id === id);
    return (180 + 5 * 25 + Math.max(0, index) * 60) * 10;
  }

  function canListPrice(item) {
    return !blocked.includes(item.id);
  }

  function buy(state, card, uid, canOffer, normalize) {
    if (state.score < card.cost) return "积分不足";
    if (card.baseId && !canOffer(state, { id: card.baseId, stacks: card.stacks, requires: card.requires })) return missingText(card);
    state.score -= card.cost;
    normalize(state);
    if (card.id === "retain") state.talents.retain += 1;
    if (card.id === "unlock-S") state.talents.chess.S = true;
    if (card.id === "unlock-Q") state.talents.chess.Q = true;
    if (card.baseId) state.talents.outerItems.push({ id: card.baseId, uid: uid(), name: card.name, rarity: card.rarity || "white", text: card.text, value: card.value || 1 });
    return true;
  }

  function missingText(card) {
    if (card.requires) return `需要先购买${prereqNames[card.requires] || card.requires}`;
    return "已拥有或条件不满足";
  }

  function clearRunTempo(state) {
    if (!state.talents?.outerItems) return;
    state.talents.outerItems = state.talents.outerItems.filter((item) => item.id !== "tempo");
  }

  return { buy, cards, clearRunTempo };
})();
