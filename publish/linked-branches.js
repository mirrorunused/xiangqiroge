window.XQ = window.XQ || {};

window.XQ.LinkedBranches = (() => {
  const STYLES = [
    { color: "cyan", marker: "I" },
    { color: "magenta", marker: "II" },
    { color: "lime", marker: "III" },
  ];

  function startLevel(state) {
    if (!state.enemyLinkedBranches?.active) return "";
    const shuffled = shuffle(state.board.filter((piece) => piece.side === "b" && piece.type !== "K"));
    const candidates = prioritizeHorseQueen(shuffled);
    const limit = Math.min(3, Math.max(1, Number(state.enemyLinkedBranches.pairLimit) || 3));
    const pairCount = Math.min(limit, Math.floor(candidates.length / 2));
    state.enemyLinkedBranches.pairs = Array.from({ length: pairCount }, (_, index) => {
      const a = candidates[index * 2];
      const b = candidates[index * 2 + 1];
      return {
        id: `linked-${index + 1}`,
        index: index + 1,
        color: STYLES[index].color,
        marker: STYLES[index].marker,
        aId: a.id,
        bId: b.id,
        aType: a.type,
        bType: b.type,
        fallen: {},
        broken: false,
      };
    });
    return pairCount ? `连枝：黑方已指定 ${pairCount} 对连枝棋子` : "";
  }

  function prioritizeHorseQueen(candidates) {
    const horse = candidates.find((piece) => piece.type === "N");
    const queen = candidates.find((piece) => piece.type === "Q");
    if (!horse || !queen) return candidates;
    return [horse, queen].concat(candidates.filter((piece) => piece.id !== horse.id && piece.id !== queen.id));
  }

  function onBlackCaptured(state, captured) {
    if (!state.enemyLinkedBranches?.active || captured?.side !== "b") return "";
    const pair = pairFor(state, captured.id);
    if (!pair || pair.broken) return "";
    pair.fallen = pair.fallen || {};
    pair.fallen[captured.id] = captured.type;
    const partnerId = pair.aId === captured.id ? pair.bId : pair.aId;
    const partner = state.board.find((piece) => piece.id === partnerId);
    if (partner) {
      pair.inherited = pair.inherited || {};
      pair.inherited[partnerId] = captured.type;
      return `连枝${pair.marker}：${blackLabel(partner)}继承${typeLabel(captured.type)}的移动范围`;
    }
    pair.broken = true;
    const lost = window.XQ.EnemyItems.loseRandom(state);
    return lost
      ? `连枝${pair.marker}俱断：黑方失去${lost}`
      : `连枝${pair.marker}俱断：黑方没有可失去的道具`;
  }

  function extraTypes(state, piece) {
    if (!state.enemyLinkedBranches?.active || piece?.side !== "b") return [];
    const pair = pairFor(state, piece.id);
    if (!pair || pair.broken) return [];
    const partnerId = pair.aId === piece.id ? pair.bId : pair.aId;
    const inherited = pair.inherited?.[piece.id] || pair.fallen?.[partnerId];
    return inherited && inherited !== piece.type ? [inherited] : [];
  }

  function pairFor(state, pieceId) {
    return (state.enemyLinkedBranches?.pairs || [])
      .find((pair) => pair.aId === pieceId || pair.bId === pieceId);
  }

  function shuffle(items) {
    const result = [...items];
    for (let index = result.length - 1; index > 0; index -= 1) {
      const pick = Math.floor(Math.random() * (index + 1));
      [result[index], result[pick]] = [result[pick], result[index]];
    }
    return result;
  }

  function blackLabel(piece) {
    return `黑方${typeLabel(piece.type)}`;
  }

  function typeLabel(type) {
    return window.XQ.Config.labels.b[type] || type;
  }

  return { extraTypes, onBlackCaptured, pairFor, startLevel };
})();
