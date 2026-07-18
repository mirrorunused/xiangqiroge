window.XQ = window.XQ || {};

window.XQ.ModeSession = {
  create(options) {
    const Store = window.XQ.Storage;
    const Levels = window.XQ.Levels;
    const Ops = window.XQ.StateOps;

    async function select(mode) {
      const state = options.getState();
      const targetMode = window.XQ.Mode.normalizeName(mode);
      if (state.mode !== targetMode) {
        const currentSaved = await Store.getMode(state.mode);
        if (currentSaved && !(await options.saveNow())) return false;
        const loaded = await Store.getMode(targetMode);
        const next = Levels.baseState(loaded || await Store.seed(targetMode));
        if (!loaded?.board?.length) Ops.beginLevel(next);
        replace(state, next);
      } else if (!state.board?.length) {
        Ops.beginLevel(state);
      }
      options.render();
      if (!(await window.XQ.RebelLoadout.choose(state, options.render))) return false;
      if (!(await window.XQ.RandomMode.showOpening(state))) return false;
      if (!(await options.saveNow())) return false;
      window.XQ.Prebattle.refresh(state);
      await options.enterBattle();
      return true;
    }

    async function startQuick() {
      const state = options.getState();
      if (!(await options.saveNow())) return false;
      await Store.clearMode("quick");
      const next = Levels.baseState(await Store.seed("quick"));
      Ops.beginLevel(next);
      replace(state, next);
      options.render();
      if (!(await window.XQ.QuickMode.showOpening(state))) return false;
      if (!(await options.saveNow())) return false;
      window.XQ.Prebattle.refresh(state);
      await options.enterBattle();
      return true;
    }

    async function resetCurrent() {
      const state = options.getState();
      const mode = state.mode;
      await Store.clearMode(mode);
      const next = Levels.baseState(await Store.seed(mode));
      Ops.beginLevel(next);
      replace(state, next);
      options.render();
      if (!(await window.XQ.RandomMode.showOpening(state))) return false;
      if (!(await window.XQ.QuickMode.showOpening(state))) return false;
      await options.saveNow();
      window.XQ.Prebattle.refresh(state);
    }

    function replace(target, source) {
      Object.keys(target).forEach((key) => delete target[key]);
      Object.assign(target, source);
    }

    return { resetCurrent, select, startQuick };
  },
};
