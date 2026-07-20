window.XQ = window.XQ || {};

window.XQ.RoundEffects = (() => {
  function startLevel(state) {
    return [
      window.XQ.Charm?.startLevel?.(state),
      window.XQ.MusicCharm?.startLevel?.(state),
      window.XQ.Reinforcement?.startLevel?.(state),
      window.XQ.Incense?.startLevel?.(state),
      window.XQ.Sacrifice?.startLevel?.(state),
    ].filter(Boolean).join("\n");
  }

  function startTurn(state) {
    return [
      window.XQ.Charm?.startTurn?.(state),
      window.XQ.MusicCharm?.startTurn?.(state),
      window.XQ.Reinforcement?.startTurn?.(state),
      window.XQ.Incense?.startTurn?.(state),
      window.XQ.Sacrifice?.startTurn?.(state),
    ].filter(Boolean).join("\n");
  }

  function skipPlayerTurn(state) {
    return [window.XQ.Corruption?.skipTurn?.(state), window.XQ.MusicCharm?.startTurn?.(state),
      window.XQ.Reinforcement?.startTurn?.(state), window.XQ.Incense?.startTurn?.(state),
      window.XQ.Sacrifice?.startTurn?.(state)]
      .filter(Boolean).join("\n");
  }

  return { skipPlayerTurn, startLevel, startTurn };
})();
