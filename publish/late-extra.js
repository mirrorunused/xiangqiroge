window.XQ = window.XQ || {};

window.XQ.LateExtra = (() => {
  function apply(state, id, notice) {
    if (id === "corruption") {
      state.enemyCorruption = { active: true, cooldown: 0, justTriggered: false };
      notice(state, "组合技关卡：染心。红方吃子后会倒戈并使黑方夺取对应道具，触发后冷却 3 回合。");
      return true;
    }
    if (id === "music") {
      state.enemyMusic = { active: true, turns: 0, controlledIds: [] };
      notice(state, "组合技关卡：迷音。每 3 回合随机魅惑一枚红方非帅棋子，由黑方控制一回合且保留红方道具加成；第 6 回合起每次魅惑两枚。");
      return true;
    }
    if (id === "reinforcement") {
      state.enemyReinforcement = { active: true, turns: 0, waves: 0 };
      notice(state, "组合技关卡：增援。从第 3 回合起每 2 回合在随机空位增兵；数量由 1 枚逐步升至 3 枚，兵种质量逐步提高，皇后权重最低。");
      return true;
    }
    if (id === "incense") {
      state.enemyIncense = { active: true, turns: 0, stage: 0 };
      notice(state, "组合技关卡：香阵。开局及每 2 回合生成扩张香阵，次回合保留一半；阵内红子禁行，黑子不可被吃。");
      return true;
    }
    if (id === "sacrifice") {
      state.enemySacrifice = { active: true, turns: 0 };
      notice(state, "组合技关卡：生祭。黑方可吃己方非将棋子并获得随机道具，每 2 回合随机增援一枚棋子。");
      return true;
    }
    return false;
  }

  function name(state) {
    if (state.enemyCorruption?.active) return "染心";
    if (state.enemyMusic?.active) return "迷音";
    if (state.enemyReinforcement?.active) return "增援";
    if (state.enemyIncense?.active) return "香阵";
    if (state.enemySacrifice?.active) return "生祭";
    return "";
  }

  return { apply, name };
})();
