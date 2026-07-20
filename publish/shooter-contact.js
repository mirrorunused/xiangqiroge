window.XQ = window.XQ || {};

window.XQ.ShooterContact = (() => {
  function update(world, dt) {
    world.black.forEach((black) => {
      if (!black.alive) return;
      black.hitTimer = Math.max(0, black.hitTimer - dt);
      if (black.hitTimer > 0) return;
      const target = nearestContact(black, world.red);
      if (!target) return;
      target.hp -= Math.max(5, Math.round(Math.sqrt(black.maxHp) * 1.35));
      black.hitTimer = 0.38;
    });
  }

  function nearestContact(source, units) {
    return units.filter((unit) => unit.alive && (
      Math.hypot(unit.x - source.x, unit.y - source.y) <= unit.radius + source.radius + 5
    )).sort((left, right) => distance(source, left) - distance(source, right))[0] || null;
  }

  function distance(left, right) {
    return (left.x - right.x) ** 2 + (left.y - right.y) ** 2;
  }

  return { update };
})();
