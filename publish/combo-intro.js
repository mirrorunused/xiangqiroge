window.XQ = window.XQ || {};

window.XQ.ComboIntro = (() => {
  const DURATION = 1000;
  let active = null;
  let timer = null;

  function show(id, done) {
    if (!id) return false;
    if (active) return true;
    document.querySelector?.(".game-shell")?.classList.add("combo-active");
    const overlay = document.createElement("button");
    const kicker = document.createElement("span");
    const title = document.createElement("strong");
    overlay.type = "button";
    overlay.className = "combo-intro";
    overlay.setAttribute("aria-label", "跳过组合技关卡标题");
    kicker.textContent = "组合技关卡";
    title.textContent = window.XQ.ComboOrder?.name?.(id) || id;
    overlay.append(kicker, title);
    const finish = () => {
      if (active !== overlay) return;
      clearTimeout(timer);
      timer = null;
      active = null;
      overlay.remove();
      done?.();
    };
    overlay.addEventListener("click", finish);
    document.body.appendChild(overlay);
    active = overlay;
    requestAnimationFrame(() => overlay.classList.add("combo-intro-visible"));
    timer = setTimeout(finish, DURATION);
    return true;
  }

  return { show };
})();
