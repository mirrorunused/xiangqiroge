window.XQ = window.XQ || {};

window.XQ.Core = (() => {
  const latest = new Map();
  const active = new Set();
  let chain = Promise.resolve();

  async function invoke(method, state, args, operation) {
    if (!window.dzmm?.fn?.invoke) throw new Error("服务端函数不可用");
    const key = operation || method;
    const id = (latest.get(key) || 0) + 1;
    latest.set(key, id);
    const result = await window.dzmm.fn.invoke(
      "core",
      { method, state: clone(state), args: args || {} },
      { timeout: 60000 },
    );
    if (id !== latest.get(key)) {
      const err = new Error("请求结果已过期");
      err.code = "STALE_RESPONSE";
      throw err;
    }
    if (result?.state) applyState(state, result.state);
    return result || {};
  }

  async function init(state) {
    if (!window.dzmm?.fn?.invoke) {
      state.coreOffline = true;
      return false;
    }
    try {
      await window.dzmm.fn.invoke(
        "core",
        { method: "init", state: clone(state), args: {} },
        { timeout: 60000 },
      );
      return true;
    } catch (err) {
      handleError(err, "服务端核心初始化失败");
      state.coreOffline = true;
      return false;
    }
  }

  async function call(method, state, args, label, operation) {
    const key = operation || method;
    if (active.has(key)) return { ignored: true };
    active.add(key);
    const task = chain.then(async () => {
      try {
        return await invoke(method, state, args, key);
      } catch (err) {
        handleError(err, label || "服务端校验失败");
        throw err;
      }
    });
    chain = task.catch(() => {});
    try {
      return await task;
    } finally {
      active.delete(key);
    }
  }

  async function sync(state) {
    try {
      const result = await window.dzmm.fn.invoke("core", { method: "sync" }, { timeout: 60000 });
      if (result?.state) applyState(state, result.state);
      return true;
    } catch (err) {
      console.error("state sync failed:", err?.code || "unknown", err?.message, err?.stack || "");
      return false;
    }
  }

  function isBusy(operation) {
    return active.has(operation);
  }

  function applyState(target, source) {
    Object.keys(target).forEach((key) => { if (!(key in source)) delete target[key]; });
    Object.assign(target, source);
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value || {}));
  }

  function handleError(err, prefix) {
    const code = err?.code || "unknown";
    const detail = code === "function_not_published"
      ? "请先保存游戏，让服务端函数上线。"
      : err?.message || "未知错误";
    console.error(`${prefix}:`, code, detail, err?.userStack || err?.stack || "");
    window.XQ.Render?.banner?.(`${prefix}：${detail}`);
  }

  return { call, init, isBusy, sync };
})();
