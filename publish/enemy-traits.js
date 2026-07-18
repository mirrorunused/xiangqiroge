window.XQ = window.XQ || {};

window.XQ.EnemyTraits = (() => {
  function roll(state) {
    const level = state.level || 1;
    const traits = {};
    const full = level > window.XQ.Config.blackAddOrder.length;
    const fullHorseChain = window.XQ.Late.horseSeriesComplete(state, level);
    if (full) {
      traits.elephantRiver = Math.random() < 0.45;
      traits.advisorFree = Math.random() < 0.45;
      traits.kingGuard = Math.random() < 0.25;
      traits.strongPawn = Math.random() < 0.35;
      traits.elitePawn = traits.strongPawn && Math.random() < 0.2;
      traits.horseLeap = Math.random() < 0.25;
      traits.horseRun = traits.horseLeap && Math.random() < 0.18;
      traits.horseFly = fullHorseChain && traits.horseRun && Math.random() < 0.12;
    }
    if (level > 0 && level % 3 === 0) Object.assign(traits, hard(level, fullHorseChain));
    normalize(traits);
    if (level > 14 && traits.kingFree && Object.keys(traits).filter((key) => traits[key]).length === 1) traits.advisorFree = true;
    return traits;
  }

  function hard(level, fullHorseChain) {
    const sets = [
      { advisorFree: true }, { elephantRiver: true }, { rookPhoenix: true },
      { strongPawn: true }, { strongPawn: true, elitePawn: true },
      { advisorFree: true, advisorRiver: true }, { kingFree: true },
      { kingGuard: true }, { elephantRiver: true, advisorFree: true },
      { horseStep: true, horseLeap: true },
      { horseStep: true, horseLeap: true, horseRun: true },
    ];
    if (fullHorseChain) sets.push({ horseStep: true, horseLeap: true, horseRun: true, horseFly: true });
    return sets[Math.floor(level / 3) % sets.length];
  }

  function normalize(traits) {
    if (traits.horseFly) traits.horseRun = true;
    if (traits.horseRun) traits.horseLeap = true;
    if (traits.horseLeap) traits.horseStep = true;
    if (traits.advisorStride) traits.advisorRiver = true;
    if (traits.advisorRiver) traits.advisorFree = true;
    if (traits.elitePawn) traits.strongPawn = true;
    return traits;
  }

  function text(traits) {
    const names = [];
    if (traits?.guard) names.push("铁壁营");
    if (traits?.elephantRiver) names.push("象过河");
    if (traits?.advisorFree) names.push("士出宫");
    if (traits?.advisorRiver) names.push("士过河");
    if (traits?.advisorStride) names.push("仕途通达");
    if (traits?.kingFree) names.push("将帅出宫");
    if (traits?.kingGuard) names.push("护驾符");
    if (traits?.rookPhoenix) names.push("车化凤辇");
    if (traits?.strongPawn) names.push("强兵");
    if (traits?.elitePawn) names.push("精兵");
    if (traits?.horseStep) names.push("马位移");
    if (traits?.horseLeap) names.push("马腾跃");
    if (traits?.horseRun) names.push("马驰骋");
    if (traits?.horseFly) names.push("马踏飞燕");
    return names.length ? ` · ${names.join("/")}` : "";
  }

  return { normalize, roll, text };
})();
