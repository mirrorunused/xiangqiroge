window.XQ = window.XQ || {};

window.XQ.LevelDetail = (() => {
  const C = window.XQ.Config;
  const itemEffects = {
    guard: ["铁壁营", "黑方吃子评分降低，行棋更保守。"],
    elephantRiver: ["象过河", "黑象可过河，仍走田字且受象眼阻挡。"],
    elephantStep: ["象位移", "黑象除走田字外，可横竖移动一格。"],
    advisorFree: ["士出宫", "黑士可离开九宫，在黑方半场斜走一格。"],
    advisorRiver: ["士过河", "黑士可过河，并可横竖斜一格移动。"],
    advisorStride: ["仕途通达", "黑士可横竖斜移动两格，且可越过中间棋子。"],
    kingFree: ["将帅出宫", "黑将可离开九宫，在黑方半场横竖一格移动。"],
    kingGuard: ["护驾符", "黑将首次被吃时免疫，并反杀吃将的棋子。"],
    rookPhoenix: ["车化凤辇", "黑车可沿斜线移动最多 4 格，仍不能越子。"],
    strongPawn: ["强兵", "黑卒过河前也可横向移动。"],
    elitePawn: ["精兵", "黑卒可斜走一格。"],
    horseStep: ["马位移", "黑马除走日字外，可横竖移动一格。"],
    horseLeap: ["马腾跃", "黑马走日字时不再受蹩马腿限制。"],
    horseRun: ["马驰骋", "黑马可额外横竖移动两格。"],
    horseFly: ["马踏飞燕", "黑马可额外横竖移动三格。"],
  };

  function open(state) {
    if (!state) return;
    window.XQ.Render.showCards("本关详情", window.XQ.Levels.levelName(state), cards(state), () => {}, "save");
  }

  function cards(state) {
    const list = mechanismCards(state).concat(enemyItemCards(state));
    return list.length ? list : [{ id: "normal", name: "普通关卡", rarity: "white", text: "本关无额外特殊机制，击败黑将即可过关。" }];
  }

  function mechanismCards(state) {
    const list = [];
    if (!window.XQ.Levels.isFullEnemy(state.level)) {
      const left = Math.max(0, C.blackAddOrder.length - Math.max(0, (state.level || 1) - 1));
      list.push(card("formation", "敌军残阵", "white", `黑方未满编，仍缺 ${left} 枚棋子。${state.mode === "normal" ? "前 5 关可直接跳过本关。" : "当前模式不可跳关。"}`));
    }
    if (state.hardNotice) list.push(card("notice", "本关特殊机制", "purple", state.hardNotice));
    if (state.dropRefreshLocked && !state.enemyMomentum?.active) list.push(card("drop-lock", "封锁补给", "purple", "本关不再刷新局内可拾取道具。"));
    if (state.suppressedItemUids?.length) list.push(card("suppress", "敌军压制", "red", suppressedText(state)));
    if (state.enemyTurtle) list.push(card("turtle", "组合技：龟缩", "red", "黑将被吃时取消本次吃将，进入 3 回合无敌，9 回合后可再次龟缩。"));
    if (state.enemyRabbit) list.push(card("rabbit", "组合技：兔阵", "gold", "黑方棋子被吃时，若后方一格为空，则后退避开吃子，触发后冷却 4 回合。"));
    if (state.enemyDivine) list.push(card("divine", "组合技：神选", "red", "黑方每回合随机一枚棋子获得护驾符，一回合内首次被吃时免疫并反杀。"));
    if (state.enemyCollapse) list.push(card("collapse", "组合技：崩盘", "purple", "开局和后续回合生成崩落位；红方棋子踏入会被吞没，崩落位持续 2 回合。"));
    if (state.enemyFish) list.push(card("fish", "组合技：鱼水", "green", "开局生成草；之后每 5 次红方行动追加生成，草会阻隔行棋且双方均可吃。"));
    if (state.enemyEunuch) list.push(card("eunuch", "组合技：宦潮", "red", "五卒与两象化仕；黑方持有仕出宫、仕过河、仕途通达。"));
    if (state.enemyHorse) list.push(card("horse", `组合技：纵马${state.enemyHorse}`, "gold", `黑方马系列道具升级，并将 ${state.enemyHorse + 1} 个卒改为马。`));
    if (state.enemyMomentum) list.push(card("momentum", "盈不可久", "red", "红方每吃掉一枚黑方棋子，黑方下一次行动额外走 1 步，最多累计 2 步。"));
    return list;
  }

  function enemyItemCards(state) {
    const ids = Object.keys(state.enemyTraits || {}).filter((id) => state.enemyTraits[id] && itemEffects[id]);
    if (!ids.length) return [card("no-items", "黑方持有道具", "white", "本关黑方没有额外道具效果。")];
    return ids.map((id) => card(`enemy-${id}`, `黑方道具：${itemEffects[id][0]}`, rarity(id), itemEffects[id][1]));
  }

  function suppressedText(state) {
    const names = (state.items || []).filter((item) => state.suppressedItemUids.includes(item.uid)).map((item) => item.name);
    return names.length ? `本关屏蔽玩家道具：${names.join("、")}。` : `本关屏蔽 ${state.suppressedItemUids.length} 个玩家道具效果。`;
  }

  function rarity(id) {
    if (["kingGuard", "kingFree", "advisorStride", "horseRun", "horseFly"].includes(id)) return "red";
    if (["rookPhoenix", "elitePawn", "advisorRiver", "horseLeap"].includes(id)) return "gold";
    if (["elephantRiver", "strongPawn", "horseStep"].includes(id)) return "purple";
    return "green";
  }

  function card(id, name, rarityName, text) {
    return { id, name, rarity: rarityName, text };
  }

  return { open };
})();
