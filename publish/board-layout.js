window.XQ = window.XQ || {};

window.XQ.BoardLayout = (() => {
  const RATIO = 9 / 10;
  const MAX_WIDTH = 468;
  const MAX_SHELL_WIDTH = 560;
  const MIN_SIZE = 40;
  let frame = 0;
  let observer = null;

  function number(value) {
    const parsed = Number.parseFloat(value);
    return Number.isFinite(parsed) ? parsed : 0;
  }

  function fit() {
    cancelAnimationFrame(frame);
    frame = requestAnimationFrame(() => {
      const shell = document.querySelector(".game-shell");
      const wrap = document.querySelector(".board-wrap");
      const board = document.getElementById("board");
      if (!shell || !wrap || !board) return;
      const bodyStyle = getComputedStyle(document.body);
      const bodyPadding = number(bodyStyle.paddingLeft) + number(bodyStyle.paddingRight);
      const viewportWidth = document.documentElement.clientWidth;
      const shellWidth = Math.floor(Math.min(MAX_SHELL_WIDTH, viewportWidth - bodyPadding));
      if (shellWidth >= MIN_SIZE && shell.style.width !== `${shellWidth}px`) {
        shell.style.width = `${shellWidth}px`;
      }
      const style = getComputedStyle(wrap);
      const horizontal = number(style.paddingLeft) + number(style.paddingRight);
      const vertical = number(style.paddingTop) + number(style.paddingBottom);
      const wrapLeft = Math.max(0, wrap.getBoundingClientRect().left);
      const visibleWidth = Math.max(0, viewportWidth - wrapLeft - horizontal);
      const availableWidth = Math.max(0, Math.min(wrap.clientWidth - horizontal, visibleWidth));
      const availableHeight = Math.max(0, wrap.clientHeight - vertical);
      if (availableWidth < MIN_SIZE || availableHeight < MIN_SIZE) return;
      const width = Math.floor(Math.min(MAX_WIDTH, availableWidth, availableHeight * RATIO));
      const height = Math.floor(width / RATIO);
      if (width < MIN_SIZE || height < MIN_SIZE) return;
      if (board.style.width !== `${width}px`) board.style.width = `${width}px`;
      if (board.style.height !== `${height}px`) board.style.height = `${height}px`;
    });
  }

  function init() {
    const wrap = document.querySelector(".board-wrap");
    if (!wrap) return;
    if (typeof ResizeObserver === "function") {
      observer = new ResizeObserver(fit);
      observer.observe(wrap);
      observer.observe(document.body);
    }
    window.addEventListener("resize", fit, { passive: true });
    document.addEventListener("visibilitychange", fit);
    fit();
  }

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init, { once: true });
  } else {
    init();
  }

  return { fit };
})();
