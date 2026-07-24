window.XQ = window.XQ || {};

window.XQ.SlotLayout = (() => {
  const MAX_SHELL_WIDTH = 920;
  const MAX_GRID_SIZE = 440;
  const MAX_STACKED_GRID_SIZE = 320;
  const MIN_GRID_SIZE = 120;
  const STACK_BREAKPOINT = 520;
  let frame = 0;

  function number(value) {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function reset(layout, grid) {
    layout.style.gridTemplateColumns = "";
    grid.style.width = "";
    grid.style.height = "";
  }

  function fitStacked(shell, layout, grid, side, viewportHeight) {
    layout.style.gridTemplateColumns = "";
    const shellStyle = getComputedStyle(shell);
    const shellRect = shell.getBoundingClientRect();
    const layoutRect = layout.getBoundingClientRect();
    const bottomPadding = number(shellStyle.paddingBottom);
    const layoutStyle = getComputedStyle(layout);
    const gap = number(layoutStyle.rowGap);
    const reservedSideHeight = Math.min(side.scrollHeight, viewportHeight <= 620 ? 190 : 220);
    const availableHeight = shell.clientHeight
      - Math.max(0, layoutRect.top - shellRect.top)
      - bottomPadding
      - gap
      - reservedSideHeight;
    const size = Math.floor(Math.min(
      MAX_STACKED_GRID_SIZE,
      layout.clientWidth,
      Math.max(MIN_GRID_SIZE, availableHeight),
    ));
    grid.style.width = `${size}px`;
    grid.style.height = `${size}px`;
  }

  function fit() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const modal = document.getElementById("slotModal");
      const shell = modal?.querySelector?.(".slot-shell");
      const layout = modal?.querySelector?.(".slot-layout");
      const side = modal?.querySelector?.(".slot-side");
      const grid = document.getElementById("slotGrid");
      if (!modal || !shell || !layout || !side || !grid || modal.classList.contains("hidden")) return;

      const viewportWidth = document.documentElement.clientWidth;
      const viewportHeight = document.documentElement.clientHeight;
      const modalStyle = getComputedStyle(modal);
      const horizontalPadding = number(modalStyle.paddingLeft) + number(modalStyle.paddingRight);
      const shellWidth = Math.floor(Math.min(MAX_SHELL_WIDTH, viewportWidth - horizontalPadding));
      if (shellWidth >= MIN_GRID_SIZE && shell.style.width !== `${shellWidth}px`) {
        shell.style.width = `${shellWidth}px`;
      }

      if (viewportWidth <= STACK_BREAKPOINT) {
        fitStacked(shell, layout, grid, side, viewportHeight);
        return;
      }

      const layoutStyle = getComputedStyle(layout);
      const gap = number(layoutStyle.columnGap);
      const sideMin = viewportWidth <= 700 || viewportHeight <= 620 ? 220 : 250;
      const availableWidth = Math.max(0, layout.clientWidth - gap - sideMin);
      const availableHeight = Math.max(0, layout.clientHeight);
      const size = Math.floor(Math.min(MAX_GRID_SIZE, availableWidth, availableHeight));
      if (size < MIN_GRID_SIZE) {
        reset(layout, grid);
        return;
      }

      layout.style.gridTemplateColumns = `${size}px minmax(${sideMin}px, 1fr)`;
      grid.style.width = `${size}px`;
      grid.style.height = `${size}px`;
    });
  }

  function init() {
    const modal = document.getElementById("slotModal");
    if (!modal) return;
    window.addEventListener("resize", fit, { passive: true });
    window.visualViewport?.addEventListener("resize", fit, { passive: true });
    document.addEventListener("visibilitychange", fit);
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

  return { fit };
})();
