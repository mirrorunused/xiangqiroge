window.XQ = window.XQ || {};

window.XQ.EnemyStages = (() => {
  const stages = [
    { name: "全子", mix: [] },
    { name: "1卒化马", mix: [["N", 1]] },
    { name: "2卒化马", mix: [["N", 2]] },
    { name: "3卒化马", mix: [["N", 3]] },
    { name: "4卒化马", mix: [["N", 4]] },
    { name: "5卒化马", mix: [["N", 5]] },
    { name: "1炮4马", mix: [["C", 1], ["N", 4]] },
    { name: "2炮3马", mix: [["C", 2], ["N", 3]] },
    { name: "3炮2马", mix: [["C", 3], ["N", 2]] },
    { name: "4炮1马", mix: [["C", 4], ["N", 1]] },
    { name: "1车3炮1马", mix: [["N", 1], ["C", 3], ["R", 1]] },
    { name: "2车2炮1马", mix: [["N", 1], ["C", 2], ["R", 2]] },
    { name: "3车1炮1马", mix: [["N", 1], ["C", 1], ["R", 3]] },
    { name: "4车1马", mix: [["N", 1], ["R", 4]] },
    { name: "5卒化车", mix: [["R", 5]] },
    { name: "2卒化主教", mix: [["S", 2]] },
    { name: "5卒化主教", mix: [["S", 5]] },
    { name: "1士化主教", mix: [], advisors: 1 },
    { name: "2士化主教", mix: [], advisors: 2 },
    { name: "1卒化皇后", mix: [["Q", 1]], advisors: 2 },
    { name: "1后2主", mix: [["Q", 1], ["S", 2]], advisors: 2 },
    { name: "2后3主", mix: [["Q", 2], ["S", 3]], advisors: 2 },
    { name: "2后3炮", mix: [["Q", 2], ["C", 3]], advisors: 2 },
    { name: "2后3车", mix: [["Q", 2], ["R", 3]], advisors: 2 },
  ];

  function stage(level, fullAt) {
    return stages[Math.min(Math.max(0, level - fullAt - 1), stages.length - 1)];
  }

  function apply(board, level, fullAt) {
    const pawns = board.filter((p) => p.side === "b" && p.type === "P");
    const advisors = board.filter((p) => p.side === "b" && p.type === "A");
    const used = new Set();
    const current = stage(level, fullAt);
    current.mix.forEach(([type, count]) => {
      const candidates = pawns.filter((pawn) => !used.has(pawn.id) && (type !== "C" || pawn.x !== 4));
      candidates.slice(0, count).forEach((pawn) => {
        pawn.type = type;
        used.add(pawn.id);
      });
    });
    advisors.slice(0, current.advisors || 0).forEach((p) => { p.type = "S"; });
  }

  function name(level, fullAt) { return stage(level, fullAt).name; }
  function lateBase(fullAt) { return fullAt + stages.findIndex((item) => item.mix.some(([type]) => type === "Q")); }

  return { apply, lateBase, name };
})();
