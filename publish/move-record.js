window.XQ = window.XQ || {};

window.XQ.MoveRecord = (() => {
  const NUMBERS = ["一", "二", "三", "四", "五", "六", "七", "八", "九"];
  const $ = (id) => document.getElementById(id);
  let getState = () => null;

  function file(side, x) {
    return NUMBERS[side === "r" ? 8 - x : x] || String(x + 1);
  }

  function direction(move) {
    const delta = move.y - move.from.y;
    if (!delta) return "";
    const forward = move.side === "r" ? delta < 0 : delta > 0;
    return forward ? "进" : "退";
  }

  function steps(move) {
    return NUMBERS[Math.max(0, Math.abs(move.y - move.from.y) - 1)] || String(Math.abs(move.y - move.from.y));
  }

  function notation(move) {
    if (!move?.from || !move.piece) return "";
    const label = window.XQ.Config.labels[move.side]?.[move.piece.type] || move.piece.type;
    const start = file(move.side, move.from.x);
    const end = file(move.side, move.x);
    const dx = move.x - move.from.x;
    const dy = move.y - move.from.y;
    if (dx && dy && move.piece.type === "N") return `${label}${start}${direction(move)}${end}`;
    if (dx && dy && move.piece.type !== "N") return `${label}${start}平${end}${direction(move)}${steps(move)}`;
    if (dx) return `${label}${start}平${end}`;
    return `${label}${start}${direction(move)}${steps(move)}`;
  }

  function add(state, move) {
    const text = notation(move);
    if (!text) return;
    state.moveRecords = state.moveRecords || [];
    state.moveRecords.push({ kind: "move", side: move.side, text, effects: [] });
  }

  function lines(text) {
    return String(text || "").split("\n").map((line) => line.trim().replace(/[。；]+$/, "")).filter(Boolean);
  }

  function effect(state, text, eventKind = "mechanism") {
    if (!state || !text) return;
    const records = state.moveRecords || [];
    const move = [...records].reverse().find((record) => record.kind !== "event");
    if (!move) return event(state, text, eventKind);
    move.effects = move.effects || [];
    lines(text).forEach((line) => { if (!move.effects.includes(line)) move.effects.push(line); });
  }

  function event(state, text, eventKind = "mechanism") {
    if (!state || !text) return;
    state.moveRecords = state.moveRecords || [];
    lines(text).forEach((line) => {
      const previous = state.moveRecords[state.moveRecords.length - 1];
      if (previous?.kind === "event" && previous.text === line) return;
      state.moveRecords.push({ kind: "event", eventKind, text: line });
    });
  }

  function format(record) {
    const effects = record.effects?.length ? `（${record.effects.join("；")}）` : "";
    return `${record.side === "r" ? "红" : "黑"}：${record.text}${effects}`;
  }

  function render(state) {
    const list = $("moveRecordList");
    const empty = $("moveRecordEmpty");
    const count = $("moveRecordCount");
    if (!list || !empty || !count) return;
    const records = state?.moveRecords || [];
    list.innerHTML = "";
    const moves = records.filter((record) => record.kind !== "event").length;
    const events = records.length - moves;
    count.textContent = events ? `${moves} 手 · ${events} 条战报` : `${moves} 手`;
    empty.classList.toggle("hidden", records.length > 0);
    let turn = 0;
    records.forEach((record) => {
      if (record.kind === "event") {
        const report = document.createElement("div");
        report.className = `move-record-event ${record.eventKind || "mechanism"}`;
        const badge = document.createElement("strong");
        badge.textContent = ({ item: "道具", result: "战况" })[record.eventKind] || "机制";
        const text = document.createElement("span");
        text.textContent = record.text;
        report.append(badge, text);
        list.appendChild(report);
        return;
      }
      turn += 1;
      const row = document.createElement("div");
      row.className = `move-record-row ${record.side === "r" ? "red" : "black"}`;
      const number = document.createElement("span");
      number.className = "move-record-number";
      number.textContent = `${turn}.`;
      const entry = document.createElement("span");
      entry.className = `move-record-entry ${record.side === "r" ? "red" : "black"}`;
      entry.textContent = format(record);
      row.append(number, entry);
      list.appendChild(row);
    });
  }

  function open(state = getState()) {
    render(state);
    $("moveRecordModal")?.classList.remove("hidden");
  }

  function close() {
    $("moveRecordModal")?.classList.add("hidden");
  }

  function configure(nextGetState) {
    getState = nextGetState;
    $("moveRecordCloseBtn")?.addEventListener("click", close);
    $("moveRecordModal")?.addEventListener("click", (event) => {
      if (event.target.id === "moveRecordModal") close();
    });
  }

  return { add, close, configure, effect, event, format, notation, open, render };
})();
