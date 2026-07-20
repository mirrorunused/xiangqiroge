window.XQ = window.XQ || {};

window.XQ.ShooterRules = (() => {
  const WIDTH = 900;
  const HEIGHT = 560;
  const VALUES = () => window.XQ.Config.values;

  function create(board) {
    const redPieces = (board || []).filter((piece) => piece.side === "r").sort(redOrder);
    const blackPieces = (board || []).filter((piece) => piece.side === "b");
    const red = redPieces.map((piece, index) => unit(piece, 270 - index * 34, HEIGHT / 2, "r", index));
    const black = blackPieces.map((piece, index) => unit(
      piece,
      600 + (index % 4) * 54,
      100 + Math.floor(index / 4) * 88,
      "b",
      index,
    ));
    const leader = red[0];
    const trail = [];
    for (let i = 0; i < Math.max(30, red.length * 12); i += 1) {
      trail.push({ x: (leader?.x || 270) - i * 4, y: leader?.y || HEIGHT / 2 });
    }
    const world = { width: WIDTH, height: HEIGHT, red, black, bullets: [], trail, elapsed: 0, outcome: null };
    window.XQ.ShooterPickups.init(world);
    return world;
  }

  function unit(piece, x, y, side, index) {
    const maxHp = VALUES()[piece.type] || 1;
    return {
      id: piece.id,
      type: piece.type,
      side,
      x,
      y,
      hp: maxHp,
      maxHp,
      radius: piece.type === "K" ? 18 : 14,
      fireTimer: 0.12 + index * 0.04,
      hitTimer: 0,
      alive: true,
    };
  }

  function redOrder(a, b) {
    if (a.type === "K") return -1;
    if (b.type === "K") return 1;
    return (b.y - a.y) || (a.x - b.x);
  }

  function update(world, dt, input = {}) {
    if (world.outcome) return world.outcome;
    const step = Math.min(0.034, Math.max(0, dt));
    world.elapsed += step;
    moveLeader(world, step, input);
    followLeader(world, step);
    window.XQ.ShooterPickups.update(world, step);
    updateRedFire(world, step);
    if (world.freezeTimer <= 0) updateBlack(world, step);
    window.XQ.ShooterContact.update(world, step);
    updateBullets(world, step);
    removeDead(world);
    const leader = world.red[0];
    if (!leader?.alive) world.outcome = "black";
    else if (!world.black.some((unit) => unit.alive)) world.outcome = "red";
    return world.outcome;
  }

  function moveLeader(world, dt, input) {
    const leader = world.red[0];
    if (!leader?.alive) return;
    let dx = Number(input.dx) || 0;
    let dy = Number(input.dy) || 0;
    if (!dx && !dy && Number.isFinite(input.targetX) && Number.isFinite(input.targetY)) {
      dx = input.targetX - leader.x;
      dy = input.targetY - leader.y;
      if (Math.hypot(dx, dy) < 8) dx = dy = 0;
    }
    const length = Math.hypot(dx, dy) || 1;
    const speed = 220;
    leader.x = clamp(leader.x + (dx / length) * speed * dt, 28, world.width - 28);
    leader.y = clamp(leader.y + (dy / length) * speed * dt, 28, world.height - 28);
    const head = world.trail[0];
    if (!head || Math.hypot(leader.x - head.x, leader.y - head.y) >= 3) {
      world.trail.unshift({ x: leader.x, y: leader.y });
      world.trail.length = Math.min(world.trail.length, Math.max(40, world.red.length * 14));
    }
  }

  function followLeader(world, dt) {
    world.red.forEach((unit, index) => {
      if (!unit.alive || index === 0) return;
      const target = world.trail[Math.min(world.trail.length - 1, index * 10)];
      if (!target) return;
      const ease = Math.min(1, dt * 10);
      unit.x += (target.x - unit.x) * ease;
      unit.y += (target.y - unit.y) * ease;
    });
  }

  function updateRedFire(world, dt) {
    world.red.forEach((unit) => {
      if (!unit.alive) return;
      unit.fireTimer -= dt;
      if (unit.fireTimer > 0) return;
      const target = nearest(unit, world.black);
      if (!target) return;
      const dx = target.x - unit.x;
      const dy = target.y - unit.y;
      const length = Math.hypot(dx, dy) || 1;
      world.bullets.push({
        x: unit.x,
        y: unit.y,
        vx: (dx / length) * 520,
        vy: (dy / length) * 520,
        damage: Math.max(4, Math.round(Math.sqrt(unit.maxHp))),
      });
      unit.fireTimer = Math.max(0.45, 0.78 - Math.sqrt(unit.maxHp) / 120);
    });
  }

  function updateBlack(world, dt) {
    world.black.forEach((unit, index) => {
      if (!unit.alive) return;
      const target = tailTarget(world);
      if (!target) return;
      const dx = target.x - unit.x;
      const dy = target.y - unit.y;
      const length = Math.hypot(dx, dy) || 1;
      const sway = Math.sin(world.elapsed * 2.2 + index) * 18;
      const speed = 92 + Math.min(50, Math.sqrt(unit.maxHp));
      unit.x += ((dx / length) * speed + (-dy / length) * sway) * dt;
      unit.y += ((dy / length) * speed + (dx / length) * sway) * dt;
    });
  }

  function updateBullets(world, dt) {
    world.bullets.forEach((bullet) => {
      bullet.x += bullet.vx * dt;
      bullet.y += bullet.vy * dt;
      const hit = world.black.find((unit) => unit.alive && Math.hypot(unit.x - bullet.x, unit.y - bullet.y) <= unit.radius + 4);
      if (hit) {
        hit.hp -= bullet.damage;
        bullet.dead = true;
      }
      if (bullet.x < -10 || bullet.x > world.width + 10 || bullet.y < -10 || bullet.y > world.height + 10) bullet.dead = true;
    });
    world.bullets = world.bullets.filter((bullet) => !bullet.dead);
  }

  function removeDead(world) {
    world.red.forEach((unit) => { if (unit.hp <= 0) unit.alive = false; });
    world.black.forEach((unit) => { if (unit.hp <= 0) unit.alive = false; });
  }

  function tailTarget(world) {
    for (let i = world.red.length - 1; i >= 0; i -= 1) {
      if (world.red[i].alive) return world.red[i];
    }
    return null;
  }

  function nearest(source, units) {
    return units.filter((unit) => unit.alive).sort((a, b) => (
      distanceSquared(source, a) - distanceSquared(source, b)
    ))[0] || null;
  }

  function distanceSquared(a, b) {
    return (a.x - b.x) ** 2 + (a.y - b.y) ** 2;
  }

  function survivors(world) {
    return world.red.filter((unit) => unit.alive).map((unit) => unit.id);
  }

  function settlement(board, survivorIds, mode) {
    const ids = new Set(survivorIds);
    const red = (board || []).filter((piece) => piece.side === "r");
    return {
      board: red.filter((piece) => ids.has(piece.id)).map((piece) => ({ ...piece })),
      captured: mode === "rebel" ? red.filter((piece) => !ids.has(piece.id)).map((piece) => ({ ...piece })) : [],
      carries: mode === "rebel" || mode === "random",
    };
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  return { create, settlement, survivors, tailTarget, update };
})();
