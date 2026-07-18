window.XQ = window.XQ || {};

window.XQ.Runtime = {
  create(getState, render) {
    const locks = new Set();
    const UI = window.XQ.Render;
    const Store = window.XQ.Storage;

    async function run(key, action) {
      if (locks.has(key)) return;
      locks.add(key);
      render();
      try {
        return await action();
      } catch (err) {
        console.error(`${key} failed:`, err?.code || "unknown", err?.message, err?.stack || "");
      } finally {
        locks.delete(key);
        render();
      }
    }

    function queue() {
      return Store.queue(getState(), (message) => UI.banner(message));
    }

    async function flush() {
      const ok = await Store.flush(getState(), (message) => UI.banner(message));
      if (!ok) UI.banner("关键进度未能写入本地备份，请稍后重试");
      return ok;
    }

    function bind(id, key, action) {
      document.getElementById(id).addEventListener("click", () => run(key, action));
    }

    return {
      bind,
      busy: () => locks.size > 0,
      flush,
      isLocked: (key) => locks.has(key),
      queue,
      run,
    };
  },
};
