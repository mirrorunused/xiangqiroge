window.XQ = window.XQ || {};

window.XQ.Runtime = {
  create(getState, render) {
    const locks = new Set();
    const UI = window.XQ.Render;
    const Store = window.XQ.Storage;
    const Ops = window.XQ.StateOps;
    const labels = {
      board: "行棋", enemy: "敌方行动", restart: "重开关卡", hint: "提示",
      restore: "悔棋", level: "进入下一关", shop: "打开商店", talent: "局外天赋",
      items: "道具操作", save: "手动存档", load: "读取存档", settings: "设置",
      leave: "返回主菜单", "give-up": "放弃本轮",
    };

    async function run(key, action) {
      if (locks.has(key)) return;
      const state = getState();
      locks.add(key);
      render();
      try {
        return await Ops.transact(state, action);
      } catch (err) {
        console.error(`${key} failed:`, err?.code || "unknown", err?.message, err?.stack || "");
        UI.banner(Ops.actionError(err, `${labels[key] || "操作"}失败，已恢复到操作前状态，请重试`));
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
      if (ok) return true;
      const error = new Error("关键进度写入失败");
      error.userMessage = "保存失败，已撤销本次操作，请稍后重试";
      throw error;
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
