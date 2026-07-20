window.XQ = window.XQ || {};

window.XQ.StorageBackend = (() => {
  function create() {
    const cache = new Map();
    const readErrors = new Map();
    const inflightReads = new Map();
    let local;

    function copy(value) {
      return value == null ? value : JSON.parse(JSON.stringify(value));
    }

    function localStore() {
      if (local !== undefined) return local;
      try {
        local = window.localStorage;
        local.setItem("__xq_probe__", "1");
        local.removeItem("__xq_probe__");
      } catch (_) {
        local = null;
      }
      return local;
    }

    function readFailure(key, remoteError, localError) {
      const error = new Error("存档读取失败，请稍后重试");
      error.code = "SAVE_READ_FAILED";
      error.key = key;
      error.cause = remoteError || localError || null;
      readErrors.set(key, { code: error.code, message: error.message, at: Date.now() });
      return error;
    }

    async function readFresh(key) {
      let remoteError = null;
      if (window.dzmm?.kv) {
        try {
          const data = await window.dzmm.kv.get(key);
          const value = data?.value ?? null;
          cache.set(key, copy(value));
          readErrors.delete(key);
          return copy(value);
        } catch (err) {
          remoteError = err;
          console.warn("kv get failed:", err.message);
        }
      }
      const store = localStore();
      if (!store) throw readFailure(key, remoteError, null);
      let raw;
      try {
        raw = store.getItem(key);
      } catch (err) {
        console.warn("local save read failed:", err.message);
        throw readFailure(key, remoteError, err);
      }
      if (!raw && remoteError) throw readFailure(key, remoteError, null);
      try {
        const value = raw ? JSON.parse(raw) : null;
        cache.set(key, copy(value));
        readErrors.delete(key);
        return copy(value);
      } catch (err) {
        console.warn("local save parse failed:", err.message);
        throw readFailure(key, remoteError, err);
      }
    }

    async function read(key, force = false) {
      if (!force && cache.has(key)) return copy(cache.get(key));
      if (inflightReads.has(key)) return copy(await inflightReads.get(key));
      const task = readFresh(key);
      inflightReads.set(key, task);
      try {
        return copy(await task);
      } finally {
        inflightReads.delete(key);
      }
    }

    async function write(key, data) {
      let ok = false;
      try {
        if (window.dzmm?.kv) {
          await window.dzmm.kv.put(key, data);
          ok = true;
        }
      } catch (err) {
        console.warn("kv put failed:", err.message);
      }
      try {
        const store = localStore();
        if (store) {
          store.setItem(key, JSON.stringify(data));
          ok = true;
        }
      } catch (_) {}
      if (!ok) throw new Error("存档写入失败");
      cache.set(key, copy(data));
    }

    async function remove(key) {
      try {
        if (window.dzmm?.kv) await window.dzmm.kv.delete(key);
      } catch (err) {
        console.warn("kv delete failed:", err.message);
      }
      try {
        localStore()?.removeItem(key);
      } catch (_) {}
      cache.delete(key);
    }

    function reset(key) {
      local = undefined;
      if (key) {
        cache.delete(key);
        readErrors.delete(key);
        return;
      }
      cache.clear();
      readErrors.clear();
    }

    function status(key) {
      if (key) return readErrors.get(key) || { code: "OK", message: "", at: 0 };
      return {
        ok: readErrors.size === 0,
        errors: Array.from(readErrors.entries()).map(([entryKey, error]) => ({ key: entryKey, ...error })),
      };
    }

    return { read, remove, reset, status, write };
  }

  return { create };
})();
