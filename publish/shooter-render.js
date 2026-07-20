window.XQ = window.XQ || {};

window.XQ.ShooterRender = (() => {
  const labels = () => window.XQ.Config.labels;
  let canvas;
  let ctx;

  function init(element) {
    canvas = element;
    ctx = canvas.getContext("2d");
    resize();
  }

  function resize() {
    if (!canvas || !ctx) return;
    const dpr = window.devicePixelRatio || 1;
    const rect = canvas.getBoundingClientRect();
    canvas.width = Math.max(1, Math.round(rect.width * dpr));
    canvas.height = Math.max(1, Math.round(rect.height * dpr));
  }

  function draw(world) {
    if (!ctx || !canvas) return;
    const sx = canvas.width / world.width;
    const sy = canvas.height / world.height;
    ctx.setTransform(sx, 0, 0, sy, 0, 0);
    background(world);
    world.pickups.forEach(drawPickup);
    world.bullets.forEach(drawBullet);
    world.black.filter((unit) => unit.alive).forEach((unit) => drawUnit(unit, world.freezeTimer > 0));
    world.red.filter((unit) => unit.alive).forEach(drawUnit);
    drawFormation(world);
  }

  function background(world) {
    ctx.clearRect(0, 0, world.width, world.height);
    ctx.fillStyle = "#101619";
    ctx.fillRect(0, 0, world.width, world.height);
    ctx.strokeStyle = "rgba(217, 190, 124, 0.12)";
    ctx.lineWidth = 1;
    for (let x = 0; x <= world.width; x += 45) line(x, 0, x, world.height);
    for (let y = 0; y <= world.height; y += 40) line(0, y, world.width, y);
    ctx.fillStyle = "rgba(204, 53, 45, 0.08)";
    ctx.fillRect(0, 0, world.width / 2, world.height);
  }

  function drawFormation(world) {
    const living = world.red.filter((unit) => unit.alive);
    if (living.length < 2) return;
    ctx.strokeStyle = "rgba(238, 194, 111, 0.22)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    living.forEach((unit, index) => {
      if (index === 0) ctx.moveTo(unit.x, unit.y);
      else ctx.lineTo(unit.x, unit.y);
    });
    ctx.stroke();
  }

  function drawBullet(bullet) {
    ctx.fillStyle = "#f6d37a";
    ctx.beginPath();
    ctx.arc(bullet.x, bullet.y, 4, 0, Math.PI * 2);
    ctx.fill();
  }

  function drawPickup(pickup) {
    ctx.save();
    ctx.translate(pickup.x, pickup.y);
    ctx.fillStyle = "#bfeaf2";
    ctx.strokeStyle = "#3195b0";
    ctx.lineWidth = 3;
    ctx.shadowBlur = 14;
    ctx.shadowColor = "#72d8ee";
    ctx.beginPath();
    ctx.arc(0, 0, pickup.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = "#15536a";
    ctx.font = "bold 16px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("冻", 0, 1);
    ctx.restore();
  }

  function drawUnit(unit, frozen = false) {
    const red = unit.side === "r";
    ctx.save();
    ctx.translate(unit.x, unit.y);
    ctx.shadowBlur = unit.type === "K" ? 14 : 6;
    ctx.shadowColor = frozen ? "#73d9ec" : red ? "#e94d43" : "#bec8c5";
    ctx.fillStyle = red ? "#8f211e" : "#20292b";
    ctx.strokeStyle = frozen ? "#8ee8f4" : red ? "#f0b05f" : "#aeb9b6";
    ctx.lineWidth = unit.type === "K" ? 4 : 2;
    ctx.beginPath();
    ctx.arc(0, 0, unit.radius, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();
    ctx.shadowBlur = 0;
    ctx.fillStyle = red ? "#ffe0a0" : "#f2f4ef";
    ctx.font = `bold ${unit.type === "K" ? 18 : 15}px serif`;
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText(labels()[unit.side][unit.type] || unit.type, 0, 1);
    health(unit);
    ctx.restore();
  }

  function health(unit) {
    const width = 34;
    const ratio = Math.max(0, unit.hp / unit.maxHp);
    ctx.fillStyle = "rgba(0, 0, 0, 0.7)";
    ctx.fillRect(-width / 2, unit.radius + 7, width, 4);
    ctx.fillStyle = unit.side === "r" ? "#ef6b5d" : "#d7dfdc";
    ctx.fillRect(-width / 2, unit.radius + 7, width * ratio, 4);
  }

  function line(x1, y1, x2, y2) {
    ctx.beginPath();
    ctx.moveTo(x1, y1);
    ctx.lineTo(x2, y2);
    ctx.stroke();
  }

  return { draw, init, resize };
})();
