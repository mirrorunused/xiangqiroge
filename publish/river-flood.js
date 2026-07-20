window.XQ = window.XQ || {};

window.XQ.RiverFlood = (() => {
  function blocks(piece, target, state) {
    if (!state?.riverFlooded || !piece || !target) return false;
    const towardBlack = piece.y >= 5 && target.y <= 4;
    const towardRed = piece.y <= 4 && target.y >= 5;
    return (towardBlack && piece.y !== 5) || (towardRed && piece.y !== 4);
  }

  return { blocks };
})();
