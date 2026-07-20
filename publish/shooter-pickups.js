window.XQ = window.XQ || {};

window.XQ.ShooterPickups = (() => {
  const FREEZE_SECONDS = 1;

  function init(world) {
    world.pickups = [];
    world.pickupTimer = 3;
    world.freezeTimer = 0;
  }

  function update(world, dt) {
    world.freezeTimer = Math.max(0, (world.freezeTimer || 0) - dt);
    world.pickupTimer = Math.max(0, (world.pickupTimer || 0) - dt);
    if (!world.pickups.length && world.pickupTimer <= 0) spawn(world);
    const leader = world.red[0];
    if (!leader?.alive) return false;
    const index = world.pickups.findIndex((pickup) => (
      Math.hypot(leader.x - pickup.x, leader.y - pickup.y) <= leader.radius + pickup.radius
    ));
    if (index < 0) return false;
    world.pickups.splice(index, 1);
    world.freezeTimer = FREEZE_SECONDS;
    world.pickupTimer = 5 + Math.random() * 2;
    return true;
  }

  function spawn(world) {
    world.pickups.push({
      id: `freeze-${world.elapsed.toFixed(2)}`,
      kind: "freeze",
      x: 330 + Math.random() * 240,
      y: 70 + Math.random() * (world.height - 140),
      radius: 15,
    });
  }

  return { init, update };
})();
