window.XQ = window.XQ || {};

window.XQ.CombatFeedback = (() => {
  const C = window.XQ.Config;
  const R = window.XQ.Rules;
  const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  function pieceLabel(piece) {
    if (!piece) return "棋子";
    const side = piece.side === "b" ? "黑方" : piece.side === "r" ? "红方" : "";
    return `${side}${C.labels[piece.side]?.[piece.type] || piece.type}`;
  }

  function pieceElement(id) {
    return [...document.querySelectorAll(".piece")].find((piece) => piece.dataset.pieceId === id);
  }

  function point(board, x, y) {
    return {
      x: board.clientWidth * (0.055 + (x / 8) * 0.89),
      y: board.clientHeight * (0.05 + (y / 9) * 0.9),
    };
  }

  function addTrace(move) {
    const board = document.getElementById("board");
    if (!board || !move?.from) return;
    const start = point(board, move.from.x, move.from.y);
    const end = point(board, move.x, move.y);
    const trace = document.createElement("div");
    const dx = end.x - start.x;
    const dy = end.y - start.y;
    trace.className = "combat-trace";
    trace.style.left = `${start.x}px`;
    trace.style.top = `${start.y}px`;
    trace.style.width = `${Math.hypot(dx, dy)}px`;
    trace.style.transform = `rotate(${Math.atan2(dy, dx)}rad)`;
    board.appendChild(trace);
  }

  function addMarker(move, text) {
    const board = document.getElementById("board");
    if (!board || !move) return;
    const marker = document.createElement("div");
    marker.className = "combat-marker";
    marker.textContent = text;
    marker.style.left = `${5.5 + (move.x / 8) * 89}%`;
    marker.style.top = `${5 + (move.y / 9) * 90}%`;
    board.appendChild(marker);
  }

  function showAlert(kind, title, detail) {
    document.querySelectorAll(".combat-alert").forEach((node) => node.remove());
    const wrap = document.querySelector(".board-wrap");
    if (!wrap) return null;
    const alert = document.createElement("div");
    alert.className = `combat-alert combat-${kind}`;
    alert.setAttribute("role", "status");
    alert.innerHTML = `<strong>${title}</strong><span>${detail}</span>`;
    wrap.appendChild(alert);
    return alert;
  }

  function checkedKing(state, side) {
    const king = state.board.find((piece) => piece.side === side && piece.type === "K");
    return king && R.inCheck(state.board, side, state) ? king : null;
  }

  async function present(state) {
    const move = state.lastMove;
    if (!move) return;
    const attacker = state.board.find((piece) => piece.id === move.id);
    const checkedSide = move.side === "b" ? "r" : "b";
    const king = checkedKing(state, checkedSide);
    if (!move.captured && !king) return;
    addTrace(move);
    pieceElement(move.id)?.classList.add("impact");
    if (move.captured) addMarker(move, "吃");
    if (king) pieceElement(king.id)?.classList.add("under-check");
    const captureText = move.captured ? `${pieceLabel(attacker)}吃掉${pieceLabel(move.captured)}` : "";
    const checkText = king ? `${pieceLabel(attacker)}正在威胁${pieceLabel(king)}` : "";
    const title = king ? "将军" : "吃子";
    const detail = [captureText, checkText].filter(Boolean).join("，");
    const alert = showAlert(king ? "check" : "capture", title, detail);
    window.XQ.FX.tone(king ? 430 : move.side === "b" ? 250 : 500, king ? 150 : 90);
    await sleep(move.side === "b" ? (king ? 950 : 760) : (king ? 720 : 480));
    alert?.remove();
  }

  function lossDetail(state, fallback) {
    const move = state.lastMove;
    const attacker = state.board.find((piece) => piece.id === move?.id);
    const king = state.board.find((piece) => piece.side === "r" && piece.type === "K");
    if (!king && move?.captured?.type === "K") {
      return `${pieceLabel(attacker)}沿标出的路线落到帅位，红帅被擒。`;
    }
    if (king && R.inCheck(state.board, "r", state)) {
      return `${pieceLabel(attacker)}形成将军，红帅已没有合法解围走法。`;
    }
    if (move?.captured) {
      return `${pieceLabel(attacker)}沿标出的路线吃掉${pieceLabel(move.captured)}。${fallback || "红方已无合法走法。"}`;
    }
    return fallback || "红方已无合法走法，本局在这里结束。";
  }

  async function beforeLoss(state, fallback) {
    if (state.lastMove?.side !== "b" || state.phase !== "play") return;
    document.querySelectorAll(".combat-trace, .combat-marker").forEach((node) => node.remove());
    addTrace(state.lastMove);
    addMarker(state.lastMove, "终");
    pieceElement(state.lastMove.id)?.classList.add("impact");
    const alert = showAlert("defeat", "局势已定", lossDetail(state, fallback));
    window.XQ.FX.tone(190, 220);
    await sleep(1900);
    alert?.remove();
  }

  return { beforeLoss, present };
})();
