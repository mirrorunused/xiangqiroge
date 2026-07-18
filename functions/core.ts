const KEY = "xq-core-state-v1";
const SECRET_KEY = "xq-core-secret-v1";
const VALUES: any = { K: 900, Q: 120, R: 90, S: 55, C: 45, N: 40, B: 20, A: 20, P: 12, G: 0 };
const LABELS: any = { K: "帅", A: "仕", B: "相", N: "马", R: "车", C: "炮", P: "兵", S: "主", Q: "后" };
const MAX_GRASS = 30;
const RED = [["R", 0, 9], ["N", 1, 9], ["B", 2, 9], ["A", 3, 9], ["K", 4, 9], ["A", 5, 9], ["B", 6, 9], ["N", 7, 9], ["R", 8, 9], ["C", 1, 7], ["C", 7, 7], ["P", 0, 6], ["P", 2, 6], ["P", 4, 6], ["P", 6, 6], ["P", 8, 6]];
const BLACK_CORE = [["A", 3, 0], ["K", 4, 0], ["A", 5, 0]];
const BLACK_ADD = [["P", 4, 3], ["B", 2, 0], ["C", 1, 2], ["N", 1, 0], ["R", 0, 0], ["P", 2, 3], ["B", 6, 0], ["C", 7, 2], ["N", 7, 0], ["R", 8, 0], ["P", 6, 3], ["P", 0, 3], ["P", 8, 3]];
const ENEMY_STAGES: any[] = [
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
const REBEL_COMBO_START = 16;
const COMBO_BLOCKS = [["turtle"], ["fish"], ["rabbit"], ["divine"], ["collapse"], ["eunuch", "horse1", "horse2", "horse3", "horse4"], ["momentum"]];
const COMBO_IDS = COMBO_BLOCKS.flat();
const ITEMS: any[] = [
  { id: "guard", name: "铁壁营", rarity: "white", text: "敌方吃子评分降低，AI 更保守。", stacks: false },
  { id: "cannon", name: "神机炮", rarity: "green", text: "每件使击破车约 +11、马约 +5、炮约 +5 即时积分。", stacks: true },
  { id: "scout", name: "斥候图", rarity: "purple", text: "提示会标出一个高价值走法。", stacks: false },
  { id: "oracle", name: "问策签", rarity: "green", text: "每件使提示消耗积分降低 20%。", stacks: true },
  { id: "supply", name: "粮草车", rarity: "gold", text: "立即获得额外积分。", stacks: true },
  { id: "shopFree", name: "免刷新券", rarity: "purple", text: "接下来三次可付费商店刷新免费。", stacks: true },
  { id: "kingGuard", name: "护驾符", rarity: "red", text: "将帅首次被吃时免疫，并反杀吃将帅的棋子。", stacks: true },
  { id: "pawnSpell", name: "贬卒符", rarity: "purple", text: "选择敌方一个非将帅棋子变为卒。", stacks: true },
  { id: "banner", name: "破阵旗", rarity: "red", text: "每面提高过关基础积分，多面旗帜加算。", stacks: true },
  { id: "revive", name: "归阵令", rarity: "gold", text: "取回一个被吃掉的己方棋子放在己方半场；若放在可拾取道具上立即触发，并消耗一次红方行动。", stacks: true },
  { id: "rabbitFoot", name: "兔脚", rarity: "gold", text: "己方棋子被吃时，若后方一格为空，则后跳避开吃子；触发后冷却 4 回合。", stacks: false, shopOnly: true, unlock: "rabbitFoot" },
  { id: "turtleShell", name: "龟壳", rarity: "red", text: "红帅首次被吃时龟缩避险，进入 3 回合无敌，9 回合后重新生效。", stacks: false, shopOnly: true, unlock: "turtleShell" },
  { id: "endure", name: "卧薪尝胆", rarity: "gold", text: "己方棋子被吃后，红方下一回合额外行动 1 次，最多累积 1 次。", stacks: false, shopOnly: true, unlock: "endure" },
  { id: "elephantRiver", name: "飞象渡河", rarity: "purple", text: "象可过河，仍走田字。", stacks: false },
  { id: "rookPhoenix", name: "车化凤辇", rarity: "gold", text: "车可沿斜线移动最多 4 格，仍不能越子。", stacks: false },
  { id: "elephantStep", name: "象位移", rarity: "gold", text: "象除走田字外，可选横竖移动一格。", stacks: false },
  { id: "horseStep", name: "马位移", rarity: "purple", text: "马除走日字外，可选横竖移动一格。", stacks: false },
  { id: "horseLeap", name: "马腾跃", rarity: "gold", text: "马走日字时不再受蹩马腿限制。", stacks: false, requires: "horseStep" },
  { id: "horseRun", name: "马驰骋", rarity: "red", text: "马可额外横竖移动两格。", stacks: false, requires: "horseLeap" },
  { id: "horseFly", name: "马踏飞燕", rarity: "red", text: "马可额外横竖移动三格。", stacks: false, requires: "horseRun" },
  { id: "advisorRiver", name: "仕过河", rarity: "gold", text: "仕可过河，可走横竖斜一格。", stacks: false, requires: "advisorFree" },
  { id: "advisorStride", name: "仕途通达", rarity: "red", text: "仕可横竖斜移动两格，且可越子。", stacks: false, shopOnly: true, unlock: "advisorStride", requires: "advisorRiver" },
  { id: "advisorFree", name: "仕出宫", rarity: "green", text: "仕可出宫，在己方半场斜走一格。", stacks: false },
  { id: "strongPawn", name: "强兵", rarity: "purple", text: "兵卒过河前也可横向移动。", stacks: false },
  { id: "elitePawn", name: "精兵", rarity: "gold", text: "兵卒可斜走一格。", stacks: false, requires: "strongPawn" },
  { id: "kingFree", name: "将帅出宫", rarity: "red", text: "帅可出宫，在己方半场横竖一格。", stacks: false },
];

export default async function (request: any, ctx: any) {
  const body = request.body || {};
  const method = String(body.method || "");
  if (method === "sync") {
    const stored = (await ctx.kv.get(KEY))?.value?.state;
    if (!stored) throw new Error("服务端存档为空");
    return { state: normalize(stored) };
  }
  const secret = await getSecret(ctx);
  if (method === "init") {
    const stored = (await ctx.kv.get(KEY))?.value?.state;
    return { state: await commit(ctx, normalize(body.state || stored || {}), secret) };
  }
  if (method === "loadManual") {
    const stored = (await ctx.kv.get(manualKey(body.args?.slot)))?.value?.state;
    if (!stored) throw new Error("手动存档为空");
    return { state: await commit(ctx, normalize(stored), secret) };
  }
  const state = normalize(body.state || {});
  switch (method) {
    case "saveManual": await ctx.kv.put(manualKey(body.args?.slot), { state, savedAt: Date.now() }); break;
    case "startLevel": if (body.args?.level) state.level = clampInt(body.args.level, 1, 999); startLevel(state); break;
    case "hint": return await hint(ctx, state, secret);
    case "selectPiece": selectPiece(state, body.args?.pieceId); break;
    case "outcome": return { state: await commit(ctx, state, secret), outcome: outcome(state) };
    case "movePiece": return await movePiece(ctx, state, body.args || {}, secret);
    case "enemyMove": return await enemyMove(ctx, state, secret);
    case "restore": restore(state); break;
    case "startRevive": startRevive(state, body.args?.capturedUid); break;
    case "placeRevive": return await placeRevive(ctx, state, body.args || {}, secret);
    case "newRun": newRun(state); break;
    case "declineTempo": declineTempo(state); break;
    case "ackTempoNotice": state.tempoNotice = false; break;
    case "ackHardNotice": state.hardNotice = ""; break;
    case "ackOuterTempoNotice": if (state.talents) state.talents.outerTempoNotice = false; break;
    case "setCaptureStoryMode": setCaptureStoryMode(state, body.args?.mode); break;
    case "restartLevel": state.score = Math.min(score(state), typeof state.levelStartScore === "number" ? state.levelStartScore : score(state)); startLevel(state); break;
    case "resetCurrent": resetCurrent(state); break;
    default: throw new Error(`unknown core method: ${method}`);
  }
  return { state: await commit(ctx, state, secret) };
}

function manualKey(slot: any) { return `${KEY}-manual-${clampInt(slot, 1, 3)}`; }

async function getSecret(ctx: any) {
  const old = (await ctx.kv.get(SECRET_KEY))?.value;
  if (old) return String(old);
  const next = `${Date.now()}-${Math.random()}-${ctx.gameId || ""}-${ctx.user?.id || ""}`;
  await ctx.kv.put(SECRET_KEY, next);
  return next;
}

async function commit(ctx: any, state: any, secret: string) {
  delete state.coreSeal;
  decorate(state);
  state.coreRevision = clampInt(state.coreRevision, 0, 2147483646) + 1;
  state.coreSeal = seal(state, secret);
  await ctx.kv.put(KEY, { state, savedAt: Date.now() });
  return state;
}

function seal(state: any, secret: string) { return hash(`${stable(protectedView(state))}|${secret}`); }
function protectedView(state: any) {
  return {
    coreRevision: state.coreRevision,
    level: state.level,
    score: state.score,
    levelStartScore: state.levelStartScore,
    scoreMult: state.scoreMult,
    items: state.items,
    talents: state.talents,
    shop: state.shop,
    freeRefreshes: state.freeRefreshes,
    baseReward: state.baseReward,
    lastSettlement: state.lastSettlement,
    bestRecord: state.bestRecord,
    keepUids: state.keepUids,
    morphBought: state.morphBought,
    morphs: state.morphs,
    pendingMorph: state.pendingMorph,
    pendingDestroy: state.pendingDestroy,
    pendingWeaken: state.pendingWeaken,
    pendingDonate: state.pendingDonate,
    pendingRevive: state.pendingRevive,
    pendingRewards: state.pendingRewards,
    tempoDeclined: state.tempoDeclined,
    captureStorySeen: state.captureStorySeen,
    postRescueStorySeen: state.postRescueStorySeen,
    rebelComboOrder: state.rebelComboOrder,
  };
}
function hash(text: string) {
  let h1 = 0xdeadbeef, h2 = 0x41c6ce57;
  for (let i = 0; i < text.length; i += 1) {
    const ch = text.charCodeAt(i);
    h1 = Math.imul(h1 ^ ch, 2654435761);
    h2 = Math.imul(h2 ^ ch, 1597334677);
  }
  h1 = Math.imul(h1 ^ (h1 >>> 16), 2246822507) ^ Math.imul(h2 ^ (h2 >>> 13), 3266489909);
  h2 = Math.imul(h2 ^ (h2 >>> 16), 2246822507) ^ Math.imul(h1 ^ (h1 >>> 13), 3266489909);
  return `${(h2 >>> 0).toString(16)}${(h1 >>> 0).toString(16)}`;
}
function stable(v: any): string {
  if (v === null || typeof v !== "object") return JSON.stringify(v);
  if (Array.isArray(v)) return `[${v.map(stable).join(",")}]`;
  return `{${Object.keys(v).filter((k) => k !== "coreSeal" && k !== "savedAt").sort().map((k) => `${JSON.stringify(k)}:${stable(v[k])}`).join(",")}}`;
}

function normalize(raw: any) {
  const s = raw && typeof raw === "object" ? raw : {};
  s.level = clampInt(s.level, 1, 999); s.score = clampInt(s.score, 0, 9999999);
  s.mode = s.mode === "rebel" ? "rebel" : "normal";
  s.items = Array.isArray(s.items) ? s.items : []; s.talents = Object.assign({ retain: 0, outerItems: [] }, s.talents || {});
  s.talents.outerItems = Array.isArray(s.talents.outerItems) ? s.talents.outerItems : [];
  s.talents.shopUnlocks = Object.assign({ rabbitFoot: false, turtleShell: false, advisorStride: false, horseSale: false, endure: false }, s.talents.shopUnlocks || {});
  s.board = Array.isArray(s.board) ? s.board : []; s.fieldItems = Array.isArray(s.fieldItems) ? s.fieldItems : [];
  s.capturedRed = Array.isArray(s.capturedRed) ? s.capturedRed : []; s.keepUids = Array.isArray(s.keepUids) ? s.keepUids : [];
  s.morphBought = Object.assign({ R: 0, N: 0, C: 0, S: 0, Q: 0 }, s.morphBought || {});
  s.morphs = Object.assign({}, s.morphs || {}); s.bestRecord = s.bestRecord || { level: s.level, score: s.score };
  s.bestRecords = Object.assign({ normal: s.bestRecord, rebel: { level: 1, score: 0 } }, s.bestRecords || {});
  if (Math.max(s.mode === "rebel" ? s.level : 1, s.bestRecords.rebel?.level || 1) > 15) unlockStoryGalleries(s);
  s.pendingRewards = Array.isArray(s.pendingRewards) ? s.pendingRewards : [];
  s.history = Array.isArray(s.history) ? s.history : [];
  s.collapseTiles = Array.isArray(s.collapseTiles) ? s.collapseTiles : [];
  s.suppressedItemUids = Array.isArray(s.suppressedItemUids) ? s.suppressedItemUids : [];
  s.enemyDivine = s.enemyDivine || null;
  s.enemyEunuch = Boolean(s.enemyEunuch);
  s.playerTurtle = s.playerTurtle || null; s.rabbitFootCooldown = clampInt(s.rabbitFootCooldown, 0, 99);
  s.freeRefreshes = clampInt(s.freeRefreshes, 0, 999); s.baseReward = clampInt(s.baseReward, 0, 10000);
  s.scoreMult = Number.isFinite(Number(s.scoreMult)) ? Number(s.scoreMult) : 1;
  s.coreRevision = clampInt(s.coreRevision, 0, 2147483646);
  s.settings = Object.assign({ captureStoryMode: "story", rebelDefeatStory: true, rebelEarlyDefeatStory: true }, s.settings || {});
  if (!["story", "brief"].includes(s.settings.captureStoryMode)) s.settings.captureStoryMode = "story";
  s.captureStorySeen = Array.isArray(s.captureStorySeen) ? s.captureStorySeen : [];
  s.postRescueStorySeen = Array.isArray(s.postRescueStorySeen) ? s.postRescueStorySeen : [];
  s.rebelComboOrder = Array.isArray(s.rebelComboOrder) ? s.rebelComboOrder : [];
  s.enemyBonusMoves = clampInt(s.enemyBonusMoves, 0, 2);
  s.enemyMovesLeft = clampInt(s.enemyMovesLeft, 0, 3);
  s.playerBonusMoves = clampInt(s.playerBonusMoves, 0, 1);
  s.enemyMomentum = s.enemyMomentum || null;
  if (s.mode === "rebel") {
    s.items = s.items.filter((item: any) => item.id !== "tempo");
    s.talents.outerItems = s.talents.outerItems.filter((item: any) => item.id !== "tempo");
    s.tempoNotice = false;
  }
  return s;
}
function decorate(state: any) {
  const maxMoves = hasTempo(state) ? 2 : 1;
  state.view = {
    hintCost: hintCost(state),
    maxMoves,
    scoreMult: scoreMult(state),
    levelName: levelName(state),
  };
  if (state.shop) state.shop.refreshCost = effectiveRefreshCost(state);
  return state;
}
function clampInt(v: any, min: number, max: number) { const n = Math.floor(Number(v)); return Number.isFinite(n) ? Math.max(min, Math.min(max, n)) : min; }
function score(state: any) { return clampInt(state.score, 0, 9999999); }
function uid(prefix: string) { return `${prefix}${Date.now()}${Math.random().toString(16).slice(2)}`; }
function rand(arr: any[]) { return arr[Math.floor(Math.random() * arr.length)]; }
function activeItems(state: any) { const blocked = new Set(state.suppressedItemUids || []); return (state.items || []).filter((i: any) => !blocked.has(i.uid)); }
function count(state: any, id: string) { return activeItems(state).filter((i: any) => i.id === id).length + (state.talents?.outerItems || []).filter((i: any) => i.id === id).length; }
function hasActiveItem(state: any, id: string) { return activeItems(state).some((i: any) => i.id === id); }
function ownedCount(state: any, id: string) { return (state.items || []).filter((i: any) => i.id === id).length + (state.talents?.outerItems || []).filter((i: any) => i.id === id).length; }
function canOffer(state: any, item: any, source = "reward") {
  const id = item.baseId || item.id;
  if (item.shopOnly && source !== "shop") return false;
  if (item.unlock && !state.talents?.shopUnlocks?.[item.unlock]) return false;
  if (item.id === "revive" && !(state.capturedRed || []).length) return false;
  if (item.requires && ownedCount(state, item.requires) === 0) return false;
  return item.stacks !== false || ownedCount(state, id) === 0;
}
function hintCost(state: any) {
  return Math.max(5, Math.round((30 + Math.max(0, (state.level || 1) - 1) * 5) * Math.pow(0.8, count(state, "oracle"))));
}
function levelName(state: any) {
  const combo = state.enemyTurtle ? " · 组合技：龟缩" : state.enemyRabbit ? " · 组合技：兔阵"
    : state.enemyDivine ? " · 组合技：神选" : state.enemyCollapse ? " · 组合技：崩盘"
      : state.enemyEunuch ? " · 组合技：宦潮" : state.enemyHorse ? ` · 组合技：纵马${state.enemyHorse}` : state.enemyFish ? " · 组合技：鱼水"
        : state.enemyMomentum ? " · 盈不可久" : "";
  const traits: any = { elephantRiver: "象过河", advisorFree: "士出宫", advisorRiver: "士过河", advisorStride: "仕途通达", kingFree: "将帅出宫", kingGuard: "护驾符", rookPhoenix: "车化凤辇", strongPawn: "强兵", elitePawn: "精兵", horseStep: "马位移", horseLeap: "马腾跃", horseRun: "马驰骋", horseFly: "马踏飞燕" };
  const traitText = Object.keys(state.enemyTraits || {}).filter((id) => state.enemyTraits[id] && traits[id]).map((id) => traits[id]).join("/");
  if (isFullEnemy(state.level)) return `第 ${state.level} 关${combo} · ${enemyStage(state.level).name}${traitText ? ` · ${traitText}` : ""}`;
  return `第 ${state.level} 关${combo} · ${isHard(state.level) ? "强敌" : "普通"} · 敌军缺 ${BLACK_ADD.length - enemyCount(state.level)} 子`;
}

function piece(side: string, type: any, x: any, y: any, index: number) { return { id: `${side}${type}${index}`, side, type, x, y }; }
function enemyCount(level: number) { return Math.min(BLACK_ADD.length, Math.max(0, level - 1)); }
function isFullEnemy(level: number) { return enemyCount(level) >= BLACK_ADD.length; }
function isHard(level: number) { return level > 0 && level % 3 === 0; }
function enemyStage(level: number) { return ENEMY_STAGES[Math.min(Math.max(0, level - BLACK_ADD.length - 1), ENEMY_STAGES.length - 1)]; }
function applyEnemyStage(board: any[], level: number) {
  const current = enemyStage(level);
  const pawns = board.filter((p) => p.side === "b" && p.type === "P");
  const advisors = board.filter((p) => p.side === "b" && p.type === "A");
  const used = new Set();
  current.mix.forEach(([type, count]: any[]) => {
    const candidates = pawns.filter((p) => !used.has(p.id) && (type !== "C" || p.x !== 4));
    candidates.slice(0, count).forEach((p) => { p.type = type; used.add(p.id); });
  });
  advisors.slice(0, current.advisors || 0).forEach((p) => { p.type = "S"; });
}
function applyFishBoard(board: any[]) {
  [[0, 3], [8, 3]].forEach(([x, y]) => {
    const p = board.find((q) => q.side === "b" && q.x === x && q.y === y);
    if (p && p.type !== "K") p.type = "C";
  });
}
function startLevel(state: any) {
  state.enemyTraits = rollEnemyTraits(state); state.enemyTurtle = null; state.enemyRabbit = null; state.enemyDivine = null; state.enemyCollapse = null; state.enemyFish = null; state.enemyEunuch = false; state.enemyHorse = 0; state.enemyMomentum = null;
  state.collapseTiles = []; state.suppressedItemUids = []; lateStart(state);
  let index = 0; const board: any[] = [];
  RED.forEach((p) => board.push(piece("r", p[0], p[1], p[2], index++)));
  BLACK_CORE.forEach((p) => board.push(piece("b", p[0], p[1], p[2], index++)));
  BLACK_ADD.slice(0, enemyCount(state.level)).forEach((p) => board.push(piece("b", p[0], p[1], p[2], index++)));
  if (isFullEnemy(state.level)) applyEnemyStage(board, state.level);
  if (state.enemyEunuch) board.filter((p) => p.side === "b" && (p.id.startsWith("bP") || p.id.startsWith("bB"))).forEach((p) => { p.type = "A"; });
  if (state.enemyHorse) board.filter((p) => p.side === "b" && p.id.startsWith("bP")).slice(0, state.enemyHorse + 1).forEach((p) => { p.type = "N"; });
  if (state.enemyFish?.active) applyFishBoard(board);
  Object.keys(state.morphs || {}).forEach((id) => { const p = board.find((q) => q.id === id); if (p && p.side === "r" && p.type !== "K") p.type = state.morphs[id]; });
  const capturedRed = state.mode === "rebel" ? state.capturedRed : [];
  const lost = new Set(capturedRed.map((p: any) => p.id));
  const filteredBoard = state.mode === "rebel" ? board.filter((p: any) => p.side !== "r" || !lost.has(p.id)) : board;
  Object.assign(state, { board: filteredBoard, side: "r", selected: null, legal: [], phase: "play", lastMove: null, history: [], fieldItems: [], capturedRed, shop: null, enemyFrozen: 0, playerFrozen: 0, enemyBonusMoves: 0, enemyMovesLeft: 0, playerBonusMoves: 0, baseReward: 100, levelStartScore: score(state), lastSettlement: null });
  refreshDivine(state);
  if (state.mode !== "rebel" && state.level >= 15 && !state.tempoDeclined && addTempo(state)) state.tempoNotice = true;
  state.playerMovesLeft = hasTempo(state) ? 2 : 1; state.message = hasTempo(state) ? "双步虎符：红方可连续走两步" : "红方行动";
  if (state.enemyMomentum) state.message = "盈不可久：红方每次吃子，都会强化黑方下一次行动";
  if (state.enemyFish?.active) spawnGrassWave(state, 1);
  if (state.enemyCollapse?.active) spawnCollapse(state);
  state.rabbitFootCooldown = 0; state.playerTurtle = null;
  syncPlayerTurtle(state);
  spawnDrop(state, true);
}
function rollEnemyTraits(state: any) {
  const level = state.level || 1;
  const traits: any = {};
  const fullHorseChain = horseSeriesComplete(state, level);
  if (isFullEnemy(level)) {
    traits.elephantRiver = Math.random() < 0.45; traits.advisorFree = Math.random() < 0.45; traits.kingGuard = Math.random() < 0.25;
    traits.strongPawn = Math.random() < 0.35; traits.elitePawn = traits.strongPawn && Math.random() < 0.2;
    traits.horseLeap = Math.random() < 0.25;
    traits.horseRun = traits.horseLeap && Math.random() < 0.18;
    traits.horseFly = fullHorseChain && traits.horseRun && Math.random() < 0.12;
  }
  if (isHard(level)) Object.assign(traits, hardTraits(level, fullHorseChain));
  normalizeEnemyTraits(traits);
  if (level > 14 && traits.kingFree && Object.keys(traits).filter((key) => traits[key]).length === 1) traits.advisorFree = true;
  return traits;
}
function hardTraits(level: number, fullHorseChain: boolean) {
  const sets: any[] = [{ advisorFree: true }, { elephantRiver: true }, { rookPhoenix: true }, { strongPawn: true }, { strongPawn: true, elitePawn: true }, { advisorFree: true, advisorRiver: true }, { kingFree: true }, { kingGuard: true }, { elephantRiver: true, advisorFree: true }, { horseStep: true, horseLeap: true }, { horseStep: true, horseLeap: true, horseRun: true }];
  if (fullHorseChain) sets.push({ horseStep: true, horseLeap: true, horseRun: true, horseFly: true });
  return sets[Math.floor(level / 3) % sets.length];
}
function normalizeEnemyTraits(traits: any) {
  if (traits.horseFly) traits.horseRun = true;
  if (traits.horseRun) traits.horseLeap = true;
  if (traits.horseLeap) traits.horseStep = true;
  if (traits.advisorStride) traits.advisorRiver = true;
  if (traits.advisorRiver) traits.advisorFree = true;
  if (traits.elitePawn) traits.strongPawn = true;
  return traits;
}
function inside(x: number, y: number) { return x >= 0 && x < 9 && y >= 0 && y < 10; }
function at(board: any[], x: number, y: number) { return board.find((p) => p.x === x && p.y === y); }
function ownHalf(side: string, y: number) { return side === "r" ? y >= 5 : y <= 4; }
function palace(side: string, x: number, y: number) { return x >= 3 && x <= 5 && (side === "r" ? y >= 7 && y <= 9 : y >= 0 && y <= 2); }
function crossed(p: any) { return p.side === "r" ? p.y <= 4 : p.y >= 5; }
function hasRule(state: any, side: string, id: string) { return side === "r" ? count(state, id) > 0 : Boolean(state.enemyTraits?.[id]); }
function clearLine(board: any[], x1: number, y1: number, x2: number, y2: number) {
  const dx = Math.sign(x2 - x1), dy = Math.sign(y2 - y1); let x = x1 + dx, y = y1 + dy, n = 0;
  while (x !== x2 || y !== y2) { if (at(board, x, y)) n += 1; x += dx; y += dy; }
  return n;
}
function rayMoves(board: any[], p: any, cannon: boolean, dirs?: number[][]) {
  const moves: any[] = [];
  (dirs || [[1, 0], [-1, 0], [0, 1], [0, -1]]).forEach(([dx, dy]) => {
    let x = p.x + dx, y = p.y + dy, screen = false;
    while (inside(x, y)) {
      const t = at(board, x, y);
      if (!cannon) { if (!t) moves.push({ x, y }); else { if (t.side !== p.side) moves.push({ x, y }); break; } }
      else if (!screen) { if (t) screen = true; else moves.push({ x, y }); }
      else if (t) { if (t.side !== p.side) moves.push({ x, y }); break; }
      x += dx; y += dy;
    }
  });
  return moves;
}
function rookPhoenixMoves(board: any[], p: any) {
  return rayMoves(board, p, false).concat(rayMoves(board, p, false, [[1, 1], [1, -1], [-1, 1], [-1, -1]]).filter((m) => Math.abs(m.x - p.x) <= 4));
}
function pseudo(board: any[], p: any, state: any) {
  const own = (x: number, y: number) => at(board, x, y)?.side === p.side;
  const add = (arr: any[], x: number, y: number) => inside(x, y) && !own(x, y) && arr.push({ x, y });
  const moves: any[] = [];
  if (p.type === "R") return hasRule(state, p.side, "rookPhoenix") ? rookPhoenixMoves(board, p) : rayMoves(board, p, false);
  if (p.type === "S") return rayMoves(board, p, false, [[1, 1], [1, -1], [-1, 1], [-1, -1]]);
  if (p.type === "Q") return rayMoves(board, p, false, [[1, 0], [-1, 0], [0, 1], [0, -1], [1, 1], [1, -1], [-1, 1], [-1, -1]]);
  if (p.type === "C") return rayMoves(board, p, true);
  if (p.type === "K") {
    [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => {
      const x = p.x + dx, y = p.y + dy, open = hasRule(state, p.side, "kingFree") ? inside(x, y) && ownHalf(p.side, y) : palace(p.side, x, y);
      if (open && !own(x, y)) moves.push({ x, y });
    });
    const other = board.find((q) => q.type === "K" && q.side !== p.side);
    if (other && other.x === p.x && clearLine(board, p.x, p.y, other.x, other.y) === 0) moves.push({ x: other.x, y: other.y });
  }
  if (p.type === "A") {
    const free = hasRule(state, p.side, "advisorFree"), river = hasRule(state, p.side, "advisorRiver");
    const steps = river ? [[1, 1], [1, -1], [-1, 1], [-1, -1], [1, 0], [-1, 0], [0, 1], [0, -1]] : [[1, 1], [1, -1], [-1, 1], [-1, -1]];
    steps.forEach(([dx, dy]) => {
      const x = p.x + dx, y = p.y + dy;
      const area = free && river ? inside(x, y) : free ? inside(x, y) && ownHalf(p.side, y) : palace(p.side, x, y);
      if (area && !own(x, y)) moves.push({ x, y });
    });
    if (free && river && hasRule(state, p.side, "advisorStride")) [[2, 2], [2, -2], [-2, 2], [-2, -2], [2, 0], [-2, 0], [0, 2], [0, -2]].forEach(([dx, dy]) => add(moves, p.x + dx, p.y + dy));
  }
  if (p.type === "B") {
    [[2, 2], [2, -2], [-2, 2], [-2, -2]].forEach(([dx, dy]) => {
      const x = p.x + dx, y = p.y + dy, open = hasRule(state, p.side, "elephantRiver") || (p.side === "r" ? y >= 5 : y <= 4);
      if (inside(x, y) && open && !at(board, p.x + dx / 2, p.y + dy / 2) && !own(x, y)) moves.push({ x, y });
    });
    if (hasRule(state, p.side, "elephantStep")) [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => add(moves, p.x + dx, p.y + dy));
  }
  if (p.type === "N") {
    const ignoresLeg = hasRule(state, p.side, "horseLeap");
    [[2, 1, 1, 0], [2, -1, 1, 0], [-2, 1, -1, 0], [-2, -1, -1, 0], [1, 2, 0, 1], [-1, 2, 0, 1], [1, -2, 0, -1], [-1, -2, 0, -1]].forEach(([dx, dy, lx, ly]) => (ignoresLeg || !at(board, p.x + lx, p.y + ly)) && add(moves, p.x + dx, p.y + dy));
    if (hasRule(state, p.side, "horseStep")) [[1, 0], [-1, 0], [0, 1], [0, -1]].forEach(([dx, dy]) => add(moves, p.x + dx, p.y + dy));
    if (hasRule(state, p.side, "horseRun")) [[2, 0], [-2, 0], [0, 2], [0, -2]].forEach(([dx, dy]) => add(moves, p.x + dx, p.y + dy));
    if (hasRule(state, p.side, "horseFly")) [[3, 0], [-3, 0], [0, 3], [0, -3]].forEach(([dx, dy]) => add(moves, p.x + dx, p.y + dy));
  }
  if (p.type === "P") {
    const dir = p.side === "r" ? -1 : 1; add(moves, p.x, p.y + dir);
    if (crossed(p) || hasRule(state, p.side, "strongPawn")) { add(moves, p.x - 1, p.y); add(moves, p.x + 1, p.y); }
    if (hasRule(state, p.side, "elitePawn")) [[1, 1], [1, -1], [-1, 1], [-1, -1]].forEach(([dx, dy]) => add(moves, p.x + dx, p.y + dy));
  }
  return moves;
}
function boardMove(board: any[], id: string, x: number, y: number) {
  const next = board.map((p) => ({ ...p })), p = next.find((q) => q.id === id);
  if (!p) throw new Error("棋子不存在");
  const from = { x: p.x, y: p.y }, captured = next.find((q) => q.x === x && q.y === y);
  const filtered = next.filter((q) => q.id !== captured?.id), moved = filtered.find((q) => q.id === id);
  moved.x = x; moved.y = y;
  return { board: filtered, captured, from };
}
function kingsFace(board: any[]) {
  const r = board.find((p) => p.side === "r" && p.type === "K"), b = board.find((p) => p.side === "b" && p.type === "K");
  return r && b && r.x === b.x && clearLine(board, r.x, r.y, b.x, b.y) === 0;
}
function inCheck(board: any[], side: string, state: any) {
  const k = board.find((p) => p.side === side && p.type === "K");
  return !k || kingsFace(board) || board.some((p) => p.side !== side && pseudo(board, p, state).some((m) => m.x === k.x && m.y === k.y));
}
function legalMoves(board: any[], id: string, state: any) {
  const p = board.find((q) => q.id === id);
  if (!p) return [];
  return pseudo(board, p, state).filter((m) => !blocksDivineKingCapture(board, m, p, state) && !turtleBlocks(board, m, p.side, state) && !inCheck(boardMove(board, id, m.x, m.y).board, p.side, state));
}
function blocksDivineKingCapture(board: any[], m: any, p: any, state: any) {
  const target = at(board, m.x, m.y);
  return p.side === "r" && p.type === "K" && target?.side === "b" && state?.enemyDivine?.targetId === target.id;
}
function sideMoves(board: any[], side: string, state: any) {
  return board.filter((p) => p.side === side).flatMap((p) => legalMoves(board, p.id, state).map((m) => ({ ...m, id: p.id })));
}
function selectPiece(state: any, pieceId: any) {
  const id = String(pieceId || ""), piece = state.board.find((p: any) => p.id === id);
  if (state.phase !== "play" || state.side !== "r") throw new Error("当前不可选择棋子");
  if (!piece || piece.side !== "r") throw new Error("请选择红方棋子");
  state.selected = id;
  state.legal = legalMoves(state.board, id, state);
  state.message = state.legal.length ? "选择落点" : "这枚棋子当前无合法走法";
}
function outcome(state: any) {
  const red = (state.board || []).filter((p: any) => p.side === "r");
  const onlyKings = ((state.board || []).length === 2 && (state.board || []).every((p: any) => p.type === "K")) || (red.length === 1 && red[0].type === "K");
  if (onlyKings) return { status: "lose", text: "双方只剩将帅，按挑战失败处理" };
  if (!(state.board || []).some((p: any) => p.side === "r" && p.type === "K")) return { status: "lose", text: "红帅被擒，积分保留" };
  if (!(state.board || []).some((p: any) => p.side === "b" && p.type === "K")) return { status: "win", text: "斩将成功" };
  if (!sideMoves(state.board, "b", state).length) return { status: "win", text: "黑方无合法走法" };
  if (state.side === "r" && !sideMoves(state.board, "r", state).length) return { status: "lose", text: "红方无合法走法，挑战失败" };
  return { status: "none", text: "" };
}
function pushHistory(state: any) {
  state.history = state.history || [];
  state.history.push(JSON.parse(JSON.stringify({
    score: state.score,
    scoreMult: state.scoreMult,
    baseReward: state.baseReward,
    levelStartScore: state.levelStartScore,
    items: state.items,
    board: state.board,
    side: state.side,
    playerMovesLeft: state.playerMovesLeft,
    lastMove: state.lastMove,
    fieldItems: state.fieldItems,
    capturedRed: state.capturedRed,
    enemyFrozen: state.enemyFrozen,
    playerFrozen: state.playerFrozen,
    enemyTraits: state.enemyTraits,
    enemyTurtle: state.enemyTurtle,
    enemyRabbit: state.enemyRabbit,
    enemyDivine: state.enemyDivine,
    enemyCollapse: state.enemyCollapse,
    enemyFish: state.enemyFish,
    enemyEunuch: Boolean(state.enemyEunuch),
    enemyHorse: state.enemyHorse || 0,
    playerTurtle: state.playerTurtle,
    rabbitFootCooldown: state.rabbitFootCooldown,
    collapseTiles: state.collapseTiles,
    morphs: state.morphs,
    morphBought: state.morphBought,
    pendingRevive: state.pendingRevive,
    pendingDestroy: state.pendingDestroy,
    pendingWeaken: state.pendingWeaken,
    pendingMorph: state.pendingMorph,
    pendingDonate: state.pendingDonate,
    captureStorySeen: state.captureStorySeen,
    postRescueStorySeen: state.postRescueStorySeen,
    enemyBonusMoves: state.enemyBonusMoves,
    enemyMovesLeft: state.enemyMovesLeft,
    playerBonusMoves: state.playerBonusMoves,
    message: state.message,
  })));
  if (state.history.length > 3) state.history.shift();
}
function restore(state: any) {
  const old = (state.history || []).pop();
  if (!old) throw new Error("没有可悔棋的记录");
  Object.assign(state, old, { selected: null, legal: [], phase: "play" });
}
function finalQueenLevel() {
  return BLACK_ADD.length + ENEMY_STAGES.findIndex((stage) => stage.mix.some(([type]: any[]) => type === "Q"));
}
function lateStart(state: any) {
  const n = finalQueenLevel();
  state.dropRefreshLocked = false;
  if (state.level === n + 1) addLateTrait(state);
  if (state.level >= n + 2) state.suppressedItemUids = (state.items || []).slice(0, Math.min(state.items.length, 1 + Math.floor((state.level - n - 2) / 2))).map((i: any) => i.uid);
  if (state.mode === "rebel") {
    const index = state.level - REBEL_COMBO_START;
    if (index >= 0) applyCombo(state, ensureRebelComboOrder(state)[index]);
  } else {
    const fixed: any = { 8: "turtle", 9: "fish", 10: "rabbit", 11: "divine", 12: "collapse", 13: "eunuch", 14: "horse1", 15: "horse2", 16: "horse3", 17: "horse4", 18: "momentum" };
    applyCombo(state, fixed[state.level - n]);
  }
  if (state.level >= n + 4 && !state.enemyMomentum?.active) state.dropRefreshLocked = Math.random() < Math.min(0.85, 0.18 + Math.floor((state.level - n - 4) / 2) * 0.1);
}
function ensureRebelComboOrder(state: any) {
  const current = Array.isArray(state.rebelComboOrder) ? state.rebelComboOrder : [];
  if (current.length === COMBO_IDS.length && COMBO_IDS.every((id) => current.includes(id))) return current;
  if (current.length === COMBO_IDS.length - 1 && COMBO_IDS.filter((id) => id !== "eunuch").every((id) => current.includes(id))) {
    const migrated = [...current];
    migrated.splice(Math.max(0, migrated.indexOf("horse1")), 0, "eunuch");
    state.rebelComboOrder = migrated;
    return migrated;
  }
  const blocks = COMBO_BLOCKS.map((block) => [...block]);
  for (let i = blocks.length - 1; i > 0; i -= 1) {
    const pick = Math.floor(Math.random() * (i + 1));
    [blocks[i], blocks[pick]] = [blocks[pick], blocks[i]];
  }
  state.rebelComboOrder = blocks.flat();
  return state.rebelComboOrder;
}
function applyCombo(state: any, id: string) {
  if (id === "turtle") state.enemyTurtle = { active: true, shield: 0, cooldown: 0 };
  if (id === "fish") state.enemyFish = { active: true, turns: 0 };
  if (id === "rabbit") state.enemyRabbit = { cooldown: 0 };
  if (id === "divine") state.enemyDivine = { active: true, targetId: null };
  if (id === "collapse") state.enemyCollapse = { active: true, quiet: 0, turns: 0 };
  if (id === "eunuch") {
    state.enemyEunuch = true;
    Object.assign(state.enemyTraits, { advisorFree: true, advisorRiver: true, advisorStride: true });
  }
  if (id?.startsWith("horse")) {
    const stage = Number(id.slice(5));
    Object.assign(state.enemyTraits, { horseStep: true, horseLeap: stage >= 2, horseRun: stage >= 3, horseFly: stage >= 4 });
    state.enemyHorse = stage;
  }
  if (id === "momentum") state.enemyMomentum = { active: true };
}
function horseSeriesComplete(state: any, level = state.level) {
  const horse4 = state.mode === "rebel"
    ? REBEL_COMBO_START + ensureRebelComboOrder(state).indexOf("horse4")
    : finalQueenLevel() + 17;
  return level > horse4;
}
function addLateTrait(state: any) {
  const pool = ["advisorFree", "elephantRiver", "horseStep", "horseLeap", "horseRun", "horseFly", "strongPawn", "kingGuard"]
    .filter((id) => !state.enemyTraits[id] && (id !== "horseFly" || horseSeriesComplete(state)));
  state.enemyTraits[rand(pool) || "advisorFree"] = true;
  normalizeEnemyTraits(state.enemyTraits);
}

function capture(state: any, args: any) {
  const type = String(args.type || "");
  let storyType = "";
  if (args.side === "r") {
    const tactical = ["R", "N", "C"].includes(type) ? count(state, "cannon") : 0;
    state.score = score(state) + Math.round((VALUES[type] || 0) * (1 + tactical * 0.12));
    if (args.captured?.side === "b") {
      const seen = state.mode === "rebel" && state.level > 15 ? state.postRescueStorySeen : state.captureStorySeen;
      if (!seen.includes(type)) {
        seen.push(type);
        storyType = type;
      }
      if (state.enemyMomentum?.active) state.enemyBonusMoves = Math.min(2, (state.enemyBonusMoves || 0) + 1);
    }
  } else {
    if (args.captured?.side === "r") recordRedPieceCaptured(state, args.captured);
  }
  return storyType;
}
function recordRedPieceCaptured(state: any, piece: any, keepForRevive = true) {
  state.baseReward = Math.max(0, Math.round((state.baseReward || 100) - (VALUES[piece.type] || 0)));
  if (keepForRevive && piece.type !== "K") state.capturedRed.push({ ...piece, capturedUid: uid("c") });
  onRedPieceCaptured(state);
}
function bannerMult(state: any) { return (state.items || []).concat(state.talents?.outerItems || []).filter((i: any) => i.id === "banner").reduce((total: number, item: any) => total + bannerBonus(item), 1); }
function bannerBonus(item: any) { const value = Number(item?.value); return Number.isFinite(value) ? Math.min(0.25, Math.max(0, value - 1)) : 0.08; }
function scoreMult(state: any) { return (state.items || []).filter((i: any) => i.id === "mult").reduce((m: number, i: any) => Math.max(m, Number(i.value) || 1), state.scoreMult || 1); }
async function settleWin(ctx: any, state: any, args: any, secret: string) {
  if (outcome(state).status !== "win") throw new Error("win condition not satisfied");
  const base = state.baseReward || 0, banner = bannerMult(state), mult = scoreMult(state), points = Math.round(base * banner * mult);
  state.score = score(state) + points; state.phase = "won"; state.message = String(args.text || "破阵成功");
  state.lastSettlement = { base, banner, scoreMult: mult, points, formula: `${base}（基础）*${banner.toFixed(2)}（破阵旗加算）*${mult.toFixed(2)}（积分倍率）=${points}` };
  if (state.level === 14) unlockTempo(state);
  let storyGallery = "";
  if (state.level === 15) { finishRun(state); storyGallery = unlockStoryGalleries(state); }
  const unlocked = unlockComboShop(state);
  if (storyGallery) unlocked.unshift(storyGallery);
  const rewards = rollRewards(state.level, state);
  state.pendingRewards = rewards;
  return { state: await commit(ctx, state, secret), rewards, unlocked };
}
async function failRun(ctx: any, state: any, secret: string) {
  const beforeStage = state.talents?.chessStage || 0, hadTempo = Boolean(state.talents?.outerTempoOffer);
  const galleryLocked = !state.talents?.captureGalleryUnlocked;
  finishRun(state);
  state.talents.captureGalleryUnlocked = true;
  if (state.talents?.outerItems) state.talents.outerItems = state.talents.outerItems.filter((i: any) => i.id !== "tempo");
  state.keepUids = state.keepUids || [];
  const unlocked: string[] = [];
  if (state.mode !== "rebel" && !hadTempo && state.talents?.outerTempoOffer) unlocked.push("第一关局外商店开放 0 积分双步虎符。");
  if ((state.talents?.chessStage || 0) > beforeStage) unlocked.push(state.talents.chessStage === 1 ? "局外商店开放主教改制解锁。" : "局外商店开放皇后改制解锁。");
  if (galleryLocked) unlocked.push("已解锁棋子被俘剧情图鉴与剧情显示设置。");
  return { state: await commit(ctx, state, secret), unlocked };
}
function spendHint(state: any) {
  const cost = hintCost(state);
  if (score(state) < cost) throw new Error("积分不足，无法提示");
  state.score = score(state) - cost;
}
async function hint(ctx: any, state: any, secret: string) {
  const move = chooseHintMove(state);
  if (!move) return { hint: null };
  spendHint(state);
  if (move) {
    state.selected = move.id;
    state.legal = legalMoves(state.board, move.id, state).filter((m: any) => m.x === move.x && m.y === move.y);
    state.message = "提示已高亮一个推荐落点";
  }
  return { state: await commit(ctx, state, secret), hint: move ? { id: move.id, x: move.x, y: move.y } : null };
}
function chooseHintMove(state: any) {
  const moves = sideMoves(state.board, "r", state);
  if (!moves.length) return null;
  const scout = count(state, "scout");
  return moves.map((m: any) => {
    const target = at(state.board, m.x, m.y), next = boardMove(state.board, m.id, m.x, m.y).board;
    let value = target ? VALUES[target.type] || 0 : 0;
    if (inCheck(next, "b", state)) value += scout ? 80 : 35;
    if (inCheck(next, "r", state)) value -= 80;
    return { ...m, score: value };
  }).sort((a: any, b: any) => b.score - a.score)[0];
}
function applyReward(state: any, card: any) {
  const real = (state.pendingRewards || []).find((c: any) => c.id === card.id && c.name === card.name);
  if (!real) throw new Error("奖励卡校验失败");
  card = real;
  if (card.id === "supply") state.score = score(state) + (card.points || 0);
  else if (card.id === "shopFree") state.freeRefreshes = (state.freeRefreshes || 0) + 3;
  else if (card.id === "mult") pushMult(state, card);
  else if (card.id !== "pawnSpell") pushItem(state, card);
  state.phase = "rewarded";
  state.pendingRewards = [];
  state.message = card.points ? `获得 ${card.name}，积分 +${card.points}` : `获得 ${card.name}`;
}
function pushItem(state: any, card: any) { state.items.push({ id: card.id, uid: uid("i"), name: card.name, rarity: card.rarity || "white", text: card.text, value: card.value, level: state.level }); }
function pushMult(state: any, card: any) {
  const old = (state.items || []).find((i: any) => i.id === "mult");
  if (!old || Number(card.value) > Number(old.value)) { state.items = (state.items || []).filter((i: any) => i.id !== "mult"); pushItem(state, card); state.scoreMult = Number(card.value) || state.scoreMult || 1; }
}
function addTempo(state: any) { if (state.mode === "rebel" || ownedCount(state, "tempo") > 0) return false; pushItem(state, { id: "tempo", name: "双步虎符", rarity: "red", text: "每回合红方可走两步，累计 25 道具后失效。", value: 1 }); return true; }
function hasTempo(state: any) { return state.mode !== "rebel" && ((state.talents?.outerItems || []).some((i: any) => i.id === "tempo") || (isFullEnemy(state.level) && activeItems(state).some((i: any) => i.id === "tempo") && state.items.length < 25)); }

function rollRewards(level: number, state: any) {
  const picked: any[] = [], extraMult = level === 6 && count(state, "mult") === 0;
  if (level === 1 || extraMult) picked.push(scoreCard(level));
  while (picked.length < (extraMult ? 4 : 3)) picked.push(randomCard(level, state, picked.map((i) => i.id).concat("revive")));
  return picked;
}
function scoreCard(level: number) { const value = rand([1.12, 1.18, 1.25, 1.35]) + Math.min(0.25, level * 0.01); return { id: "mult", name: `积分倍率 x${value.toFixed(2)}`, rarity: "gold", text: "唯一道具。已持有时，只保留更高的过关积分倍率。", points: 80 + level * 12, value }; }
function randomCard(level: number, state: any, excludeIds: string[], source = "reward") {
  const blocked = new Set((excludeIds || []).concat(source === "reward" ? ["supply", "shopFree", "kingGuard", "pawnSpell", "revive"] : [])), supply = ITEMS.find((i) => i.id === "supply");
  if (!blocked.has("supply") && canOffer(state, supply, source) && Math.random() < 0.08) return makeCard(supply, level);
  const pool = ITEMS.filter((i) => i.id !== "supply" && !blocked.has(i.id) && canOffer(state, i, source));
  return makeCard(rand(pool.length ? pool : ITEMS.filter((i) => i.stacks !== false && !blocked.has(i.id) && canOffer(state, i, source))), level);
}
function makeCard(item: any, level: number) {
  const extra = item.id === "supply" ? 160 + level * 28 : 70 + level * 10;
  if (item.id === "banner") { const value = rand([1.08, 1.12, 1.16, 1.22]), percent = Math.round((value - 1) * 100); return { ...item, name: `破阵旗 +${percent}%`, text: `过关基础积分 +${percent}%；多面旗帜加算。`, points: extra, value }; }
  if (item.id === "supply") return { ...item, text: `立即获得 ${extra} 积分。`, points: extra, value: 1 };
  if (item.id === "shopFree") return { ...item, value: 3 };
  return { ...item, points: extra, value: 1 };
}

function prepareShop(state: any) { if (!state.shop || state.shop.level !== state.level || !Array.isArray(state.shop.cards)) resetShop(state); state.shop.cards = state.shop.cards.filter((c: any) => c.stacks !== false || count(state, c.baseId || c.id) === 0); return state.shop.cards; }
function resetShop(state: any) { state.shop = { level: state.level, cards: tag(shopCards(state.level, state)), refreshCount: 0 }; }
function refreshShop(state: any) {
  prepareShop(state); const cost = consumesFreeRefresh(state) ? 0 : refreshCost(state);
  if (score(state) < cost) throw new Error("积分不足");
  if (cost === 0 && (state.freeRefreshes || 0) > 0) state.freeRefreshes -= 1; else { state.score = score(state) - cost; state.shop.refreshCount += 1; }
  state.shop.cards = tag(shopCards(state.level, state));
}
function refreshCost(state: any) { return count(state, "refreshLock") > 0 ? 50 : fib(state.shop?.refreshCount || 0); }
function consumesFreeRefresh(state: any) { return refreshCost(state) > 0 && (state.freeRefreshes || 0) > 0; }
function effectiveRefreshCost(state: any) { return consumesFreeRefresh(state) ? 0 : refreshCost(state); }
function tag(cards: any[]) { return cards.map((c) => ({ ...c, shopUid: c.shopUid || uid("s") })); }
function fib(n: number) { let a = 0, b = 1; for (let i = 1; i < n; i += 1) [a, b] = [b, a + b]; return n <= 0 ? 0 : b; }
function shopCards(level: number, state: any) {
  const normal: any[] = []; while (normal.length < 3) normal.push(randomCard(level, state, normal.map((i) => i.id), "shop"));
  normal.forEach((card, index) => { card.cost = shopPrice(card, 140 + level * 24 + index * 55, state); });
  return normal.concat(morphCards(level, state), destroyCard(state), tacticCard(level, state));
}
function shopPrice(card: any, base: number, state: any) {
  if (["rookPhoenix", "rabbitFoot", "turtleShell", "advisorStride"].includes(card.id)) return Math.round(base * 2);
  if (card.id === "kingGuard") return 800;
  if (card.id === "endure") return 720;
  if (card.id === "shopFree") return 10;
  if (card.id === "supply") return Math.max(1, Math.floor((card.points || base) / 2));
  if (state.talents?.shopUnlocks?.horseSale && ["horseStep", "horseLeap", "horseRun", "horseFly"].includes(card.id)) return Math.max(1, Math.round(base / 2));
  return base;
}
function morphCards(level: number, state: any) {
  const chess = state.talents?.chess || {}; return ["R", "N", "C"].concat(chess.S ? ["S"] : [], chess.Q ? ["Q"] : []).sort(() => Math.random() - 0.5).slice(0, 2).map((type) => ({ id: "morph", targetType: type, rarity: type === "R" || type === "Q" ? "gold" : "purple", name: `改制${LABELS[type]}令`, text: `购买后选择一枚红方非帅棋子，立刻改为${LABELS[type]}。`, cost: type === "Q" ? (140 + level * 24) * 2 : ["S"].includes(type) ? 880 : 360 + (type === "R" ? 180 : 80) }));
}
function destroyCard(state: any) { return isFullEnemy(state.level) ? [{ id: "destroy", name: "破军令", rarity: "red", text: "选择并消灭一个敌方棋子。", cost: 1000 }] : []; }
function tacticCard(level: number, state: any) { const cards: any[] = [{ id: "letMove", name: "让你一招", rarity: "gold", text: `立即获得 ${240 + level * 40} 积分，黑方下次额外行动一回合。`, cost: 0, points: 240 + level * 40 }]; if (state.board?.some((p: any) => p.side === "r" && p.type !== "K")) cards.push({ id: "donate", name: "献子筹饷", rarity: "green", text: "选择己方非帅棋子赠予敌军，按棋子价值获得积分。", cost: 0 }); return [rand(cards)]; }
function buyShop(state: any, card: any) {
  const real = prepareShop(state).find((c: any) => c.shopUid && c.shopUid === card.shopUid);
  if (!real) throw new Error("商店卡校验失败");
  card = real;
  if (score(state) < (card.cost || 0)) throw new Error("积分不足");
  if (!canOffer(state, card, "shop")) throw new Error("无法购买");
  state.score = score(state) - (card.cost || 0);
  if (card.id === "supply") state.score = score(state) + (card.points || 0);
  else if (card.id === "shopFree") state.freeRefreshes = (state.freeRefreshes || 0) + 3;
  else if (card.id === "letMove") { state.score = score(state) + (card.points || 0); state.playerFrozen = (state.playerFrozen || 0) + 1; }
  else if (card.id === "pawnSpell") state.pendingWeaken = { cost: 0, shopUid: card.shopUid };
  else if (card.id === "destroy") state.pendingDestroy = true;
  else if (card.id === "donate") state.pendingDonate = true;
  else if (card.id === "morph") state.pendingMorph = { targetType: card.targetType, cost: 0, shopUid: card.shopUid, name: card.name, rarity: card.rarity, text: card.text };
  else { pushItem(state, card); if (card.id === "turtleShell") syncPlayerTurtle(state); }
  if (card.shopUid && state.shop?.cards) state.shop.cards = prepareShop(state).filter((i: any) => i.shopUid !== card.shopUid);
}
function buyTalent(state: any, card: any) {
  const real = talentCards(state).find((c: any) => c.id === card.id);
  if (!real) throw new Error("天赋卡校验失败");
  card = real;
  if (score(state) < (card.cost || 0)) throw new Error("积分不足");
  state.score = score(state) - (card.cost || 0); state.talents = Object.assign({ retain: 0, outerItems: [] }, state.talents || {});
  if (card.id === "retain") state.talents.retain += 1;
  if (card.id === "unlock-S") state.talents.chess = Object.assign({}, state.talents.chess, { S: true });
  if (card.id === "unlock-Q") state.talents.chess = Object.assign({}, state.talents.chess, { Q: true });
  if (card.baseId) state.talents.outerItems.push({ id: card.baseId, uid: uid("i"), name: card.name, rarity: card.rarity || "white", text: card.text, value: card.value || 1 });
}
function talentCards(state: any) {
  const next = (state.talents?.retain || 0) + 1;
  return [{ id: "retain", name: `传承锦囊 ${next}`, rarity: next >= 3 ? "gold" : "purple", text: `新征程最多保留 ${next} 个已获道具。`, cost: 420 + next * 260 }].concat(outerCards(state));
}
function outerCards(state: any) {
  const blocked = ["supply", "revive", "pawnSpell", "donate", "shopFree", "kingGuard"], t = state.talents || {};
  const special: any[] = [], hasTempo = (t.outerItems || []).some((i: any) => i.id === "tempo");
  if (state.mode !== "rebel" && state.level === 1 && t.outerTempoOffer && !hasTempo) special.push({ id: "outer-tempo", baseId: "tempo", name: "局外双步虎符", rarity: "red", text: "本轮无限制生效。每回合红方可走两步，战败后清空。", value: 1, cost: 0, stacks: false });
  if ((t.chessStage || 0) >= 1 && !t.chess?.S) special.push({ id: "unlock-S", name: "解锁主教改制", rarity: "purple", text: "局内商店开始出售改制主教令。", cost: 880 });
  if ((t.chessStage || 0) >= 2 && !t.chess?.Q) special.push({ id: "unlock-Q", name: "解锁皇后改制", rarity: "gold", text: "局内商店开始出售改制皇后令。", cost: 1080 });
  return special.concat(ITEMS.filter((i) => !blocked.includes(i.id) && canOffer(state, i)).map((item) => ({ ...item, id: `outer-${item.id}`, baseId: item.id, name: `局外${item.name}`, text: item.id === "banner" ? "永久生效。每局过关基础积分 +12%，与其他破阵旗加算。" : `永久生效。${item.text}`, value: item.id === "banner" ? 1.12 : 1, cost: outerPrice(item.id) })));
}
function outerPrice(id: string) {
  const ids = ITEMS.filter((i) => !["supply", "revive", "pawnSpell", "donate", "shopFree", "kingGuard"].includes(i.id)).map((i) => i.id);
  const index = Math.max(0, ids.indexOf(id === "rookPhoenix" ? "elephantRiver" : id));
  const cost = (180 + 5 * 25 + index * 60) * 10;
  return id === "rookPhoenix" ? Math.round(cost * 2) : cost;
}
function sellItem(state: any, uidArg: any) {
  const index = (state.items || []).findIndex((i: any) => i.uid === uidArg);
  if (index < 0 || state.suppressedItemUids?.includes(uidArg) || state.items[index].id.startsWith("morph-")) throw new Error("无法出售");
  const [item] = state.items.splice(index, 1);
  state.keepUids = (state.keepUids || []).filter((id: any) => id !== uidArg);
  state.score = score(state) + (({ white: 60, green: 100, purple: 170, gold: 260, red: 420 } as any)[item.rarity || "white"] || 60);
  if (item.id === "turtleShell") syncPlayerTurtle(state);
}
function toggleKeep(state: any, uidArg: any) {
  const limit = state.talents?.retain || 0;
  if (!uidArg || limit <= 0 || !(state.items || []).some((i: any) => i.uid === uidArg)) throw new Error("无法保留该道具");
  state.keepUids = state.keepUids || [];
  if (state.keepUids.includes(uidArg)) state.keepUids = state.keepUids.filter((id: any) => id !== uidArg);
  else if (state.keepUids.length < limit) state.keepUids.push(uidArg);
  else throw new Error("保留栏已满");
}
function newRun(state: any) {
  const current = JSON.parse(JSON.stringify(state || {}));
  const limit = state.talents?.retain || 0;
  const picked = (state.items || []).filter((i: any) => state.keepUids?.includes(i.uid));
  const keep = retainedItems(picked).slice(0, limit);
  const mult = keep.filter((i: any) => i.id === "mult").reduce((m: number, i: any) => Math.max(m, Number(i.value) || 1), 1);
  const talents = state.talents, settings = state.settings, mode = state.mode, bestRecords = state.bestRecords;
  Object.keys(state).forEach((key) => delete state[key]);
  Object.assign(state, normalize({ mode, level: 1, score: score(current), scoreMult: mult, items: keep, talents, settings, captureStorySeen: [], postRescueStorySeen: [], bestRecord: bestOf(current.bestRecord, current), bestRecords }));
  state.morphBought = { R: 0, N: 0, C: 0, S: 0, Q: 0 }; state.morphs = {};
  startLevel(state);
}
function resetCurrent(state: any) {
  Object.keys(state).forEach((key) => delete state[key]);
  Object.assign(state, normalize({ mode: "normal" }));
  startLevel(state);
}
function retainedItems(items: any[]) {
  const result: any[] = []; let multIndex = -1;
  items.forEach((item) => { if (item.id !== "mult") result.push(item); else if (multIndex < 0) { multIndex = result.length; result.push(item); } else if ((Number(item.value) || 1) > (Number(result[multIndex].value) || 1)) result[multIndex] = item; });
  return result;
}
function bestOf(best: any, state: any) {
  const current = { level: state.level || 1, score: state.score || 0 }, old = best || current;
  return current.level > old.level || (current.level === old.level && current.score > old.score) ? current : old;
}
function destroyPiece(state: any, pieceId: any) {
  if (!state.pendingDestroy) throw new Error("破军令未激活");
  const piece = state.board.find((p: any) => p.id === pieceId);
  if (!piece || piece.side !== "b") throw new Error("请选择敌方棋子");
  pushHistory(state);
  state.board = state.board.filter((p: any) => p.id !== pieceId);
  state.pendingDestroy = false;
  state.message = `已消灭${piece.type}`;
}
function weakenPiece(state: any, pieceId: any) {
  const data = state.pendingWeaken;
  if (!data) throw new Error("贬卒符未激活");
  const piece = state.board.find((p: any) => p.id === pieceId);
  if (!piece || piece.side !== "b" || piece.type === "K" || piece.type === "P") throw new Error("请选择敌方非将帅棋子");
  const cost = typeof data === "object" ? data.cost || 0 : 0;
  if (score(state) < cost) throw new Error("积分不足");
  pushHistory(state);
  state.score = score(state) - cost; piece.type = "P"; state.pendingWeaken = false;
  if (data.shopUid && state.shop?.cards) state.shop.cards = prepareShop(state).filter((i: any) => i.shopUid !== data.shopUid);
  state.message = "已将敌方棋子变为卒";
}
function morphPiece(state: any, pieceId: any) {
  const data = typeof state.pendingMorph === "string" ? { targetType: state.pendingMorph, cost: 0 } : state.pendingMorph;
  if (!data) throw new Error("改制令未激活");
  const piece = state.board.find((p: any) => p.id === pieceId);
  if (!piece || piece.side !== "r" || piece.type === "K") throw new Error("请选择己方非帅棋子");
  const cost = data.cost || 0;
  if (score(state) < cost) throw new Error("积分不足");
  pushHistory(state);
  state.score = score(state) - cost; piece.type = data.targetType; state.morphs[piece.id] = data.targetType;
  state.morphBought[data.targetType] = (state.morphBought[data.targetType] || 0) + 1;
  if (data.name) state.items.push({ id: `morph-${data.targetType}`, uid: uid("m"), name: data.name, rarity: data.rarity, text: data.text, value: 1, level: state.level });
  if (data.shopUid && state.shop?.cards) state.shop.cards = prepareShop(state).filter((i: any) => i.shopUid !== data.shopUid);
  state.pendingMorph = null; state.message = `改制完成：${LABELS[data.targetType]}`;
}
function donatePiece(state: any, pieceId: any) {
  if (!state.pendingDonate) throw new Error("献子筹饷未激活");
  const piece = state.board.find((p: any) => p.id === pieceId);
  if (!piece || piece.side !== "r" || piece.type === "K") throw new Error("请选择己方非帅棋子");
  pushHistory(state);
  piece.side = "b"; state.score = score(state) + (VALUES[piece.type] || 0); state.pendingDonate = false;
  if (state.morphs) delete state.morphs[piece.id];
  state.message = `已赠予${LABELS[piece.type]}，积分 +${VALUES[piece.type] || 0}`;
}
function declineTempo(state: any) {
  state.items = (state.items || []).filter((item: any) => item.id !== "tempo");
  state.tempoDeclined = true;
  state.tempoNotice = false;
  state.playerMovesLeft = hasTempo(state) ? 2 : 1;
  state.message = "红方行动";
}
function grantScore(state: any, args: any) {
  const amount = args.amount == null ? 5000 : clampInt(args.amount, 1, 99999);
  state.score = Math.min(9999999, score(state) + amount);
  state.message = `测试入口：积分 +${amount}`;
}
function unlockComboShop(state: any) {
  const t = state.talents || (state.talents = {});
  t.shopUnlocks = Object.assign({ rabbitFoot: false, turtleShell: false, advisorStride: false, horseSale: false, endure: false }, t.shopUnlocks || {});
  const unlocked: string[] = [];
  if (state.enemyRabbit && !t.shopUnlocks.rabbitFoot) {
    t.shopUnlocks.rabbitFoot = true;
    unlocked.push("已解锁局内随机商店道具“兔脚”：己方棋子被吃时可后跳避开。");
  }
  if (state.enemyTurtle && !t.shopUnlocks.turtleShell) {
    t.shopUnlocks.turtleShell = true;
    unlocked.push("已解锁局内随机商店道具“龟壳”：红帅可触发龟缩无敌。");
  }
  if (state.enemyEunuch && !t.shopUnlocks.advisorStride) {
    t.shopUnlocks.advisorStride = true;
    unlocked.push("已解锁局内随机商店道具“仕途通达”：仕可移动两格并越子。");
  }
  if (state.enemyHorse === 4 && !t.shopUnlocks.horseSale) {
    t.shopUnlocks.horseSale = true;
    unlocked.push("马系列局内商店售价已减半。");
  }
  if (state.enemyMomentum?.active && !t.shopUnlocks.endure) {
    t.shopUnlocks.endure = true;
    unlocked.push("已解锁局内随机商店道具“卧薪尝胆”：己方棋子被吃后，红方下一回合额外行动 1 次。");
  }
  return unlocked;
}
function momentumLevel() { return finalQueenLevel() + 18; }
function setCaptureStoryMode(state: any, modeArg: any) {
  if (!state.talents?.captureGalleryUnlocked) throw new Error("首次战败后才能调整剧情显示");
  const mode = String(modeArg || "");
  if (!["story", "brief"].includes(mode)) throw new Error("无效的剧情显示模式");
  state.settings = Object.assign({}, state.settings, { captureStoryMode: mode });
}
function onRedPieceCaptured(state: any) {
  if (hasActiveItem(state, "endure")) state.playerBonusMoves = 1;
}
function unlockTempo(state: any) { if (state.mode === "rebel") return; const t = state.talents || (state.talents = {}); if (!t.outerTempoOffer) { t.outerTempoOffer = true; t.outerTempoNotice = true; } }
function unlockStoryGalleries(state: any) { const t = state.talents || (state.talents = {}); if (state.mode !== "rebel" && (state.bestRecords?.rebel?.level || 1) <= 15) return ""; const locked = !t.prisonGalleryUnlocked || !t.defeatGalleryUnlocked; t.prisonGalleryUnlocked = true; t.defeatGalleryUnlocked = true; return locked ? "已解锁关押剧情图鉴与义军兵败剧情图鉴。" : ""; }
function finishRun(state: any) { unlockTempo(state); const t = state.talents; t.chessStage = t.chessStage || 0; t.chess = Object.assign({ S: false, Q: false }, t.chess || {}); if (t.chessStage < 2) t.chessStage += 1; }
function spawnDrop(state: any, force: boolean) {
  if (state.dropRefreshLocked) return; state.fieldItems = state.fieldItems || [];
  if (!force && (state.fieldItems.length >= 2 || Math.random() > 0.34)) return;
  const cells: any[] = [];
  for (let y = 0; y < 10; y += 1) for (let x = 0; x < 9; x += 1) if (!state.board.some((p: any) => p.x === x && p.y === y) && !state.fieldItems.some((i: any) => i.x === x && i.y === y) && !state.collapseTiles?.some((i: any) => i.x === x && i.y === y)) cells.push({ x, y });
  const own = cells.filter((c) => c.y >= 5), pool = own.length && Math.random() < 0.78 ? own : cells, cell = rand(pool);
  const type = rollDropType(state);
  if (cell) state.fieldItems.push({ ...type, ...cell, uid: uid("d") });
}
function rollDropType(state: any) {
  if (state.enemyFish?.active && Math.random() < 0.28) return { id: "herbicide", name: "除草剂", mark: "除", text: "随机清除最多 5 个草。" };
  const r = Math.random();
  return r < 0.16 ? { id: "freeze", name: "缚阵令", mark: "冻", text: "敌方接下来一到两次行动被冻结。" } : r < 0.58 ? { id: "rook", name: "车骑令", mark: "车", text: "拾取的红方棋子变为车。" } : { id: "pawn", name: "贬卒令", mark: "卒", text: "敌方优先随机非卒棋子变为卒。" };
}

async function movePiece(ctx: any, state: any, args: any, secret: string) {
  const pieceId = String(args.pieceId || args.id || ""), x = clampInt(args.x, 0, 8), y = clampInt(args.y, 0, 9), side = "r";
  const piece = state.board.find((p: any) => p.id === pieceId);
  if (!piece || piece.side !== side) throw new Error("棋子与行动方不匹配");
  if (state.phase !== "play" || state.side !== side) throw new Error("当前不是该方行动");
  if (!legalMoves(state.board, pieceId, state).some((m) => m.x === x && m.y === y)) throw new Error("非法走子");
  if (side === "r") pushHistory(state);
  const result = boardMove(state.board, pieceId, x, y);
  state.board = result.board; state.lastMove = { id: pieceId, x, y }; state.lastActionCaptured = false;
  let message = "", storyType = "";
  if (result.captured) {
    if (side === "r" && result.captured.side === "n" && result.captured.type === "G" && state.enemyFish?.active) Object.assign(state.enemyFish, { skipNextGrass: true, turns: 0 });
    message = kingGuardTrigger(state, result, pieceId) || turtleTrigger(state, result, pieceId) || rabbitTrigger(state, result);
    if (!message) {
      storyType = capture(state, { side, type: result.captured.type, captured: result.captured });
      state.lastActionCaptured = true;
    }
  }
  message = message || collapseEnter(state, pieceId, side) || collectDrop(state, pieceId, side) || "";
  let resultOutcome = outcome(state);
  if (resultOutcome.status === "none") {
    afterRedAction(state);
    resultOutcome = outcome(state);
  }
  return { state: await commit(ctx, state, secret), event: { captured: Boolean(result.captured), message, storyType }, outcome: resultOutcome };
}

async function enemyMove(ctx: any, state: any, secret: string) {
  if (state.phase !== "play" || state.side !== "b") throw new Error("当前不是黑方行动");
  if (state.enemyFrozen > 0) {
    skipEnemy(state);
    return { state: await commit(ctx, state, secret), event: { message: state.message }, outcome: outcome(state) };
  }
  const move = chooseEnemyMove(state);
  if (!move) return { state: await commit(ctx, state, secret), outcome: { status: "win", text: "黑方无路可走，破阵成功" } };
  const result = boardMove(state.board, move.id, move.x, move.y);
  state.board = result.board; state.lastMove = { id: move.id, x: move.x, y: move.y }; state.lastActionCaptured = false;
  let message = "";
  if (result.captured) {
    message = kingGuardTrigger(state, result, move.id) || turtleTrigger(state, result, move.id) || rabbitTrigger(state, result);
    if (!message) {
      capture(state, { side: "b", type: result.captured.type, captured: result.captured });
      state.lastActionCaptured = true;
    }
  }
  message = message || collapseEnter(state, move.id, "b") || collectDrop(state, move.id, "b") || "";
  let resultOutcome = outcome(state);
  if (resultOutcome.status === "none") {
    playerTurtleAfterEnemy(state);
    playerRabbitAfterEnemy(state);
    if ((state.enemyMovesLeft || 1) > 1) {
      state.enemyMovesLeft -= 1;
      state.side = "b";
      state.message = `盈不可久：黑方继续行动，还剩 ${state.enemyMovesLeft} 步`;
    } else if (state.playerFrozen > 0) {
      state.enemyMovesLeft = 0;
      skipPlayer(state);
    }
    else finishEnemyTurn(state);
    resultOutcome = outcome(state);
  }
  return { state: await commit(ctx, state, secret), event: { captured: Boolean(result.captured), message }, outcome: resultOutcome };
}

function chooseEnemyMove(state: any) {
  const moves = sideMoves(state.board, "b", state);
  if (!moves.length) return null;
  return moves.map((m: any) => ({ ...m, score: enemyMoveScore(state, m) })).sort((a: any, b: any) => b.score - a.score)[0];
}
function enemyMoveScore(state: any, move: any) {
  const p = state.board.find((q: any) => q.id === move.id), target = at(state.board, move.x, move.y);
  let value = Math.random() * 4;
  if (target) value += (VALUES[target.type] || 0) * (count(state, "guard") ? 0.78 : 1);
  const next = boardMove(state.board, move.id, move.x, move.y).board;
  if (inCheck(next, "r", state)) value += 55;
  if (inCheck(next, "b", state)) value -= 180;
  if (p?.type === "K") value -= 10;
  if (p?.type === "R" || p?.type === "C") value += 4;
  value -= Math.abs(4 - move.x) * 0.7;
  return value;
}

async function placeRevive(ctx: any, state: any, args: any, secret: string) {
  const x = clampInt(args.x, 0, 8), y = clampInt(args.y, 5, 9);
  if (!state.pendingRevive) throw new Error("归阵令未激活");
  if (at(state.board, x, y)) throw new Error("请选择己方半场空位");
  const index = (state.capturedRed || []).findIndex((p: any) => p.capturedUid === state.pendingRevive.capturedUid);
  if (index < 0) throw new Error("归阵棋子不存在");
  pushHistory(state);
  const [piece] = state.capturedRed.splice(index, 1);
  state.board.push({ id: piece.id, side: "r", type: piece.type, x, y });
  state.pendingRevive = null; state.legal = [];
  state.message = `${LABELS[piece.type]}已归阵`;
  const pickup = collectDrop(state, piece.id, "r");
  let resultOutcome = outcome(state);
  if (state.phase === "play" && resultOutcome.status === "none") {
    afterRedAction(state);
    resultOutcome = outcome(state);
  }
  return { state: await commit(ctx, state, secret), event: { message: pickup || state.message }, outcome: resultOutcome };
}

function startRevive(state: any, capturedUid: any) {
  if (!(state.capturedRed || []).some((p: any) => p.capturedUid === capturedUid)) throw new Error("归阵棋子不存在");
  state.pendingRevive = { capturedUid };
  state.selected = null; state.legal = reviveCells(state); state.message = "选择己方半场空位放置";
}
function reviveCells(state: any) {
  const spots: any[] = [];
  for (let y = 5; y < 10; y += 1) for (let x = 0; x < 9; x += 1) if (!at(state.board, x, y)) spots.push({ x, y });
  return spots;
}

function afterRedAction(state: any) {
  const texts: string[] = [], collapse = collapseAfterRed(state, state.lastActionCaptured), fish = fishAfterRed(state);
  turtleAfterRed(state); rabbitAfterRed(state);
  if (collapse) texts.push(collapse); if (fish) texts.push(fish);
  const maxMoves = (hasTempo(state) ? 2 : 1) + (hasActiveItem(state, "endure") ? 1 : 0);
  state.playerMovesLeft = Math.min(state.playerMovesLeft || 1, maxMoves);
  state.playerMovesLeft = Math.max(0, (state.playerMovesLeft || 1) - 1);
  if (state.playerMovesLeft > 0) state.message = `红方继续行动，还剩 ${state.playerMovesLeft} 步`;
  else {
    const bonus = Math.min(2, state.enemyBonusMoves || 0);
    state.enemyMovesLeft = 1 + bonus;
    state.enemyBonusMoves = 0;
    state.side = "b";
    state.message = bonus ? `盈不可久：黑方将连续行动 ${state.enemyMovesLeft} 步` : "黑方思考中";
  }
  if (texts.length) state.message = texts.join("\n");
}

function skipEnemy(state: any) {
  if (!(state.enemyFrozen > 0)) throw new Error("黑方未被冻结");
  state.enemyFrozen -= 1; state.enemyMovesLeft = 0; state.side = "r"; state.playerMovesLeft = (hasTempo(state) ? 2 : 1) + (state.playerBonusMoves || 0); state.playerBonusMoves = 0;
  state.message = appendDivineNotice(state, "冻结生效，黑方跳过行动"); spawnDrop(state, false);
}
function skipPlayer(state: any) {
  if (!(state.playerFrozen > 0)) throw new Error("红方未被冻结");
  state.playerFrozen -= 1; state.side = "b"; state.message = "冻结生效，红方跳过行动"; spawnDrop(state, false);
}
function finishEnemyTurn(state: any) {
  state.enemyMovesLeft = 0; state.side = "r"; state.playerMovesLeft = (hasTempo(state) ? 2 : 1) + (state.playerBonusMoves || 0); state.playerBonusMoves = 0;
  state.message = appendDivineNotice(state, inCheck(state.board, "r", state) ? "红帅被将军，先解围" : "红方行动");
  spawnDrop(state, false);
}

function kingGuardTrigger(state: any, result: any, attackerId: string) {
  if (isDivineTarget(state, result.captured)) return divineTrigger(state, result, attackerId);
  if (result.captured?.type !== "K" || !hasKingGuard(state, result.captured.side)) return "";
  consumeKingGuard(state, result.captured.side);
  const attacker = state.board.find((piece: any) => piece.id === attackerId);
  if (attacker?.side === "r") recordRedPieceCaptured(state, attacker);
  state.board = state.board.filter((piece: any) => piece.id !== attackerId);
  state.board.push({ ...result.captured });
  return `护驾符触发：${result.captured.side === "r" ? "帅" : "将"}免于被吃，并反杀来犯棋子`;
}
function appendDivineNotice(state: any, text: string) {
  const note = refreshDivine(state);
  return note ? `${text}\n${note}` : text;
}
function refreshDivine(state: any) {
  if (!state.enemyDivine?.active) return "";
  const targets = (state.board || []).filter((p: any) => p.side === "b");
  const target = rand(targets);
  state.enemyDivine.targetId = target?.id || null;
  return target ? `神选：黑方${LABELS[target.type] || target.type}获得一回合护驾符。` : "";
}
function isDivineTarget(state: any, captured: any) {
  return captured?.side === "b" && state.enemyDivine?.active && state.enemyDivine.targetId === captured.id;
}
function divineTrigger(state: any, result: any, attackerId: string) {
  state.enemyDivine.targetId = null;
  const attacker = state.board.find((piece: any) => piece.id === attackerId);
  if (attacker?.side === "r") recordRedPieceCaptured(state, attacker);
  state.board = state.board.filter((piece: any) => piece.id !== attackerId);
  state.board.push({ ...result.captured });
  return `神选护驾触发：黑方${LABELS[result.captured.type] || result.captured.type}免于被吃，并反杀来犯棋子`;
}
function hasKingGuard(state: any, side: string) { return side === "b" ? Boolean(state.enemyTraits?.kingGuard) : (state.items || []).some((i: any) => i.id === "kingGuard"); }
function consumeKingGuard(state: any, side: string) {
  if (side === "b") state.enemyTraits.kingGuard = false;
  else { const item = (state.items || []).find((i: any) => i.id === "kingGuard"); if (item) state.items = state.items.filter((i: any) => i.uid !== item.uid); }
}
function turtleTrigger(state: any, result: any, attackerId: string) {
  const turtle = result.captured?.side === "b" ? state.enemyTurtle : state.playerTurtle;
  if (!["b", "r"].includes(result.captured?.side) || result.captured.type !== "K" || !turtle?.active) return "";
  const attacker = state.board.find((piece: any) => piece.id === attackerId);
  if (attacker && result.from) Object.assign(attacker, result.from);
  state.board.push({ ...result.captured });
  Object.assign(turtle, { active: false, shield: 3, cooldown: 9, justTriggered: true });
  return result.captured.side === "b" ? "黑将龟缩：本次吃将无效，黑将进入 3 回合无敌，9 回合后可再次龟缩。" : "龟壳触发：红帅龟缩避险，进入 3 回合无敌，9 回合后可再次生效。";
}
function turtleBlocks(board: any[], move: any, side: string, state: any) {
  if (side === "r" && !(state.enemyTurtle?.shield > 0)) return false;
  if (side === "b" && !(state.playerTurtle?.shield > 0)) return false;
  if (side !== "r" && side !== "b") return false;
  const target = board.find((piece) => piece.x === move.x && piece.y === move.y);
  return Boolean(target && target.side !== side && target.type === "K");
}
function rabbitTrigger(state: any, result: any) {
  const isEnemy = result.captured?.side === "b", isPlayer = result.captured?.side === "r";
  const ready = isEnemy ? state.enemyRabbit && state.enemyRabbit.cooldown <= 0 : isPlayer && hasActiveItem(state, "rabbitFoot") && !(state.rabbitFootCooldown > 0);
  if (!ready) return "";
  const back = { x: result.captured.x, y: result.captured.y + (isEnemy ? -1 : 1) };
  if (!inside(back.x, back.y) || state.board.some((piece: any) => piece.x === back.x && piece.y === back.y)) return "";
  state.board.push({ ...result.captured, x: back.x, y: back.y });
  if (isEnemy) Object.assign(state.enemyRabbit, { cooldown: 4, justTriggered: true });
  else state.rabbitFootCooldown = 4;
  return isEnemy ? "兔阵触发：黑方被吃棋子后退一格避开吃子，4 回合后可再次触发。" : "兔脚触发：己方被吃棋子后跳避开吃子，4 回合后可再次触发。";
}
function collapseEnter(state: any, id: string, side: string) {
  if (side !== "r" || !state.enemyCollapse?.active) return "";
  const piece = state.board.find((p: any) => p.id === id), index = (state.collapseTiles || []).findIndex((t: any) => piece && t.x === piece.x && t.y === piece.y);
  if (!piece || index < 0) return "";
  state.collapseTiles.splice(index, 1); state.board = state.board.filter((p: any) => p.id !== id);
  recordRedPieceCaptured(state, piece);
  return `崩落位吞没了${LABELS[piece.type]}，视作被黑方吃子。`;
}
function collectDrop(state: any, pieceId: string, side: string) {
  const piece = state.board.find((p: any) => p.id === pieceId);
  if (!piece) return "";
  const index = (state.fieldItems || []).findIndex((i: any) => i.x === piece.x && i.y === piece.y);
  if (index < 0) return "";
  const item = state.fieldItems.splice(index, 1)[0], targetSide = piece.side === "r" ? "b" : "r";
  let text = item.text;
  if (item.id === "freeze") { const turns = count(state, "tempo") > 0 ? 1 : 2; if (targetSide === "b") state.enemyFrozen += turns; else state.playerFrozen += turns; }
  if (item.id === "rook" && side === "r" && piece.type !== "K") piece.type = "R";
  if (item.id === "rook" && side === "r" && piece.type === "K") { state.score = score(state) + 80; text = "帅不能变车，改为获得 80 积分。"; }
  if (item.id === "pawn") weakenSide(state, targetSide);
  if (item.id === "herbicide") text = clearGrass(state, 5);
  spawnDrop(state, false);
  return text;
}
function clearGrass(state: any, amount: number) {
  if (state.enemyFish?.active) Object.assign(state.enemyFish, { skipNextGrass: true, turns: 0 });
  const picked = state.board.filter((p: any) => p.side === "n" && p.type === "G").map((p: any) => ({ piece: p, key: Math.random() })).sort((a: any, b: any) => a.key - b.key).slice(0, amount).map((entry: any) => entry.piece.id);
  state.board = state.board.filter((p: any) => !picked.includes(p.id));
  return picked.length ? `除草剂生效：随机清除了 ${picked.length} 个草。` : "除草剂没有找到可清除的草。";
}
function weakenSide(state: any, side: string) {
  const strong = state.board.filter((p: any) => p.side === side && p.type !== "K" && p.type !== "P");
  const targets = strong.length ? strong : state.board.filter((p: any) => p.side === side && p.type !== "K");
  if (targets.length) targets[Math.floor(Math.random() * targets.length)].type = "P";
}
function collapseAfterRed(state: any, captured: boolean) {
  if (!state.enemyCollapse?.active) return "";
  state.collapseTiles = (state.collapseTiles || []).map((tile: any) => ({ ...tile, ttl: tile.ttl - 1 })).filter((tile: any) => tile.ttl > 0);
  state.enemyCollapse.turns = (state.enemyCollapse.turns || 0) + 1;
  state.enemyCollapse.quiet = captured ? 0 : (state.enemyCollapse.quiet || 0) + 1;
  const target = Math.min(5, 1 + Math.floor(state.enemyCollapse.turns / 4));
  let changed = state.enemyCollapse.turns % 4 === 0 && fillCollapse(state, target);
  if (state.enemyCollapse.quiet >= 4) { state.enemyCollapse.quiet = 0; changed = fillCollapse(state, target) || changed; }
  return changed ? `崩盘发动：当前崩落位 ${state.collapseTiles.length} 个，单个持续 2 回合。` : "";
}
function fillCollapse(state: any, target: number) { let changed = false; while ((state.collapseTiles || []).length < target && spawnCollapse(state)) changed = true; return changed; }
function spawnCollapse(state: any) {
  const occupied = new Set(state.board.map((p: any) => `${p.x},${p.y}`));
  (state.fieldItems || []).forEach((i: any) => occupied.add(`${i.x},${i.y}`)); (state.collapseTiles || []).forEach((i: any) => occupied.add(`${i.x},${i.y}`));
  const cells: any[] = [];
  for (let y = 0; y < 10; y += 1) for (let x = 0; x < 9; x += 1) if (!occupied.has(`${x},${y}`)) cells.push({ x, y });
  const cell = cells.length ? rand(cells) : null; if (!cell) return false;
  state.collapseTiles = (state.collapseTiles || []).concat({ ...cell, ttl: 2, uid: uid("x") }); return true;
}
function fishAfterRed(state: any) {
  if (!state.enemyFish?.active) return "";
  if (state.enemyFish.skipNextGrass) { state.enemyFish.skipNextGrass = false; state.enemyFish.turns = 0; return ""; }
  state.enemyFish.turns = (state.enemyFish.turns || 0) + 1;
  if (state.enemyFish.turns % 5 !== 0) return "";
  const amount = Math.min(5, 1 + Math.floor(state.enemyFish.turns / 5));
  const added = spawnGrassWave(state, amount);
  return added ? `鱼水发动：新生成 ${added} 个“草”，当前 ${grassCount(state)} 个，仅阻隔行棋，双方均可吃。` : "";
}
function grassCount(state: any) { return state.board.filter((p: any) => p.side === "n" && p.type === "G").length; }
function spawnGrassWave(state: any, amount: number) { let added = 0; while (added < amount && grassCount(state) < MAX_GRASS && spawnGrass(state)) added += 1; return added; }
function spawnGrass(state: any) {
  const blocked = new Set(state.board.map((p: any) => `${p.x},${p.y}`));
  (state.fieldItems || []).forEach((i: any) => blocked.add(`${i.x},${i.y}`)); (state.collapseTiles || []).forEach((i: any) => blocked.add(`${i.x},${i.y}`));
  const cells: any[] = [];
  for (let y = 0; y < 10; y += 1) for (let x = 0; x < 9; x += 1) if (!blocked.has(`${x},${y}`)) cells.push({ x, y });
  const cell = cells.length ? rand(cells) : null; if (!cell) return false;
  state.board.push({ id: uid("nG"), side: "n", type: "G", x: cell.x, y: cell.y }); return true;
}
function turtleAfterRed(state: any) {
  const turtle = state.enemyTurtle; if (!turtle) return;
  if (turtle.justTriggered) { turtle.justTriggered = false; return; }
  if (turtle.shield > 0) turtle.shield -= 1;
  if (!turtle.active && turtle.cooldown > 0) turtle.cooldown -= 1;
  if (!turtle.active && turtle.cooldown <= 0) turtle.active = true;
}
function playerTurtleAfterEnemy(state: any) {
  const turtle = state.playerTurtle; if (!turtle) return;
  if (turtle.justTriggered) { turtle.justTriggered = false; return; }
  if (turtle.shield > 0) turtle.shield -= 1;
  if (!turtle.active && turtle.cooldown > 0) turtle.cooldown -= 1;
  if (!turtle.active && turtle.cooldown <= 0) turtle.active = true;
}
function rabbitAfterRed(state: any) {
  const rabbit = state.enemyRabbit; if (!rabbit) return;
  if (rabbit.justTriggered) { rabbit.justTriggered = false; return; }
  if (rabbit.cooldown > 0) rabbit.cooldown -= 1;
}
function playerRabbitAfterEnemy(state: any) { if (state.rabbitFootCooldown > 0) state.rabbitFootCooldown -= 1; }
function syncPlayerTurtle(state: any) {
  if (hasActiveItem(state, "turtleShell")) state.playerTurtle = state.playerTurtle || { active: true, shield: 0, cooldown: 0 };
  else state.playerTurtle = null;
}
