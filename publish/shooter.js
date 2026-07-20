window.XQ = window.XQ || {};

window.XQ.Shooter = (() => {
  const $ = (id) => document.getElementById(id);
  const Rules = () => window.XQ.ShooterRules;
  const View = () => window.XQ.ShooterRender;
  const keys = new Set();
  let options;
  let world;
  let active = false;
  let ending = false;
  let frame = 0;
  let lastTime = 0;
  let pointer = null;
  let resizeObserver;

  function configure(nextOptions) {
    options = nextOptions;
    const canvas = $("shooterCanvas");
    View().init(canvas);
    canvas.addEventListener("pointerdown", onPointer);
    canvas.addEventListener("pointermove", onPointer);
    canvas.addEventListener("pointerup", clearPointer);
    canvas.addEventListener("pointercancel", clearPointer);
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    $("shooterSurrenderBtn").addEventListener("click", surrender);
    if (typeof ResizeObserver === "function") {
      resizeObserver = new ResizeObserver(View().resize);
      resizeObserver.observe(canvas);
    } else window.addEventListener("resize", View().resize);
  }

  async function start() {
    if (active || !options) return;
    const state = options.getState();
    if (!canStart(state)) {
      window.XQ.Render.banner("盘外招需要双方仍有棋子且红帅在场");
      return;
    }
    world = Rules().create(state.board);
    active = true;
    ending = false;
    pointer = null;
    state.phase = "shooter";
    $("shooterModal").classList.remove("hidden");
    updateHud();
    View().resize();
    lastTime = performance.now();
    frame = requestAnimationFrame(loop);
  }

  function canStart(state) {
    return state?.phase === "play"
      && state.board?.some((piece) => piece.side === "r" && piece.type === "K")
      && state.board?.some((piece) => piece.side === "b");
  }

  function loop(time) {
    if (!active) return;
    const dt = (time - lastTime) / 1000;
    lastTime = time;
    const outcome = Rules().update(world, dt, input());
    View().draw(world);
    updateHud();
    if (outcome) {
      void finish(outcome);
      return;
    }
    frame = requestAnimationFrame(loop);
  }

  function input() {
    let dx = 0;
    let dy = 0;
    if (keys.has("ArrowLeft") || keys.has("a")) dx -= 1;
    if (keys.has("ArrowRight") || keys.has("d")) dx += 1;
    if (keys.has("ArrowUp") || keys.has("w")) dy -= 1;
    if (keys.has("ArrowDown") || keys.has("s")) dy += 1;
    return pointer ? { dx, dy, targetX: pointer.x, targetY: pointer.y } : { dx, dy };
  }

  function onPointer(event) {
    if (!active || (event.type === "pointermove" && event.buttons === 0)) return;
    event.preventDefault();
    const rect = $("shooterCanvas").getBoundingClientRect();
    pointer = {
      x: ((event.clientX - rect.left) / rect.width) * world.width,
      y: ((event.clientY - rect.top) / rect.height) * world.height,
    };
    event.currentTarget.setPointerCapture?.(event.pointerId);
  }

  function clearPointer() {
    pointer = null;
  }

  function onKeyDown(event) {
    const key = event.key.length === 1 ? event.key.toLowerCase() : event.key;
    if (!active || !["ArrowLeft", "ArrowRight", "ArrowUp", "ArrowDown", "w", "a", "s", "d"].includes(key)) return;
    event.preventDefault();
    keys.add(key);
  }

  function onKeyUp(event) {
    keys.delete(event.key.length === 1 ? event.key.toLowerCase() : event.key);
  }

  function updateHud() {
    if (!world) return;
    const red = world.red.filter((unit) => unit.alive);
    const black = world.black.filter((unit) => unit.alive);
    const leader = world.red[0];
    $("shooterUnits").textContent = `红 ${red.length} / 黑 ${black.length}`;
    $("shooterLeaderHp").textContent = `帅 ${Math.max(0, Math.ceil(leader?.hp || 0))}/${leader?.maxHp || 0}`;
    $("shooterEffect").textContent = world.freezeTimer > 0
      ? `冻结 ${world.freezeTimer.toFixed(1)}s`
      : world.pickups.length ? "冻符已出现" : "冻符刷新中";
  }

  async function finish(outcome) {
    if (ending) return;
    ending = true;
    stop();
    const state = options.getState();
    state.phase = "play";
    if (outcome === "red") {
      applySurvivors(state);
      options.render();
      await options.win("盘外招破阵成功");
    } else {
      state.board = state.board.filter((piece) => !(piece.side === "r" && piece.type === "K"));
      options.render();
      await options.lose("盘外招失利：红帅阵亡");
    }
  }

  function applySurvivors(state) {
    const result = Rules().settlement(state.board, Rules().survivors(world), state.mode);
    result.captured.forEach((piece) => window.XQ.Mode.redCaptured(state, piece));
    state.board = result.board;
  }

  function surrender() {
    if (!active || !window.confirm("确认认输？盘外招将按红帅阵亡结算。")) return;
    void finish("black");
  }

  function stop() {
    active = false;
    cancelAnimationFrame(frame);
    keys.clear();
    pointer = null;
    $("shooterModal").classList.add("hidden");
  }

  return { configure, start };
})();
