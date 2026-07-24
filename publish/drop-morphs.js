window.XQ = window.XQ || {};

window.XQ.DropMorphs = (() => {
  function apply(state, piece, targetType) {
    if (!window.XQ.RandomMode?.is?.(state) || piece?.side !== "r") return false;
    if (!piece.dropOriginalType) piece.dropOriginalType = piece.type;
    piece.type = targetType;
    return true;
  }

  function restore(pieces) {
    (pieces || []).forEach((piece) => {
      if (!piece.dropOriginalType) return;
      piece.type = piece.dropOriginalType;
      delete piece.dropOriginalType;
    });
  }

  function restoreState(state) {
    if (!window.XQ.RandomMode?.is?.(state)) return;
    restore(state.board);
    restore(state.capturedRed);
  }

  return { apply, restore, restoreState };
})();
