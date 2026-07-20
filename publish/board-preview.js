window.XQ = window.XQ || {};

window.XQ.BoardPreview = (() => {
  function toggle(state, pieceId) {
    state.previewSelected = state.previewSelected === pieceId ? null : pieceId;
  }

  function clear(state) {
    state.previewSelected = null;
  }

  function moves(state) {
    const piece = state.board.find((entry) => entry.id === state.previewSelected);
    if (!piece || piece.side !== "b") return [];
    return window.XQ.Rules.legalMoves(state.board, piece.id, state);
  }

  async function handlePiece(state, piece, moveTo, render) {
    const target = state.legal.find((move) => move.x === piece.x && move.y === piece.y);
    if (target) await moveTo(target.x, target.y);
    else if (piece.side === "b") {
      toggle(state, piece.id);
      render();
    }
  }

  function draw(state, board, position) {
    moves(state).forEach((move) => {
      const marker = document.createElement("div");
      marker.className = "cell enemy-hint";
      marker.setAttribute("aria-hidden", "true");
      position(marker, move.x, move.y);
      board.appendChild(marker);
    });
  }

  function selected(state, pieceId) {
    return state.previewSelected === pieceId;
  }

  return { clear, draw, handlePiece, moves, selected, toggle };
})();
