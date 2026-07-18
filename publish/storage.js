window.XQ = window.XQ || {};
window.XQ.Storage = (() => {
  const LEGACY_KEY = "xiangqi-rogue-save";
  const SHARED_KEY = "xiangqi-rogue-shared";
  const MODE_KEYS = {
    normal: "xiangqi-rogue-save-normal",
    rebel: "xiangqi-rogue-save-rebel",
    random: "xiangqi-rogue-save-random",
    quick: "xiangqi-rogue-save-quick",
  };
  const MANUAL_PREFIX = "xiangqi-rogue-manual-";
  const Data = window.XQ.StorageData, cache = new Map();
  let chain = Promise.resolve();
  let timer = null;
  let pending = null;
  let waiters = [];
  let failures = 0;
  let migrated = false, local;
  function localStore() {
    if (local !== undefined) return local;
    try {
      local = window.localStorage;
      local.setItem("__xq_probe__", "1"); local.removeItem("__xq_probe__");
    } catch (_) { local = null; }
    return local;
  }
  function modeName(mode) {
    return window.XQ.Mode.normalizeName(mode);
  }
  function copy(value) { return value == null ? value : JSON.parse(JSON.stringify(value)); }
  async function read(key) {
    if (cache.has(key)) return copy(cache.get(key));
    if (window.dzmm?.kv) {
      try {
        const data = await window.dzmm.kv.get(key);
        const value = data?.value ?? null; cache.set(key, value); return copy(value);
      } catch (err) {
        console.warn("kv get failed:", err.message);
      }
    }
    try {
      const raw = localStore()?.getItem(key);
      const value = raw ? JSON.parse(raw) : null; cache.set(key, value); return copy(value);
    } catch (_) {
      return null;
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
      if (store) { store.setItem(key, JSON.stringify(data)); ok = true; }
    } catch (_) {}
    if (!ok) throw new Error("存档写入失败"); cache.set(key, copy(data));
  }
  async function remove(key) {
    try {
      if (window.dzmm?.kv) await window.dzmm.kv.delete(key);
    } catch (err) {
      console.warn("kv delete failed:", err.message);
    }
    try {
      localStore()?.removeItem(key);
    } catch (_) {} cache.delete(key);
  }
  async function migrate() {
    if (migrated) return;
    migrated = true;
    const [legacy, normal, rebel, random, quick, shared] = await Promise.all([
      read(LEGACY_KEY), read(MODE_KEYS.normal), read(MODE_KEYS.rebel), read(MODE_KEYS.random), read(MODE_KEYS.quick), read(SHARED_KEY),
    ]);
    const legacyMode = modeName(legacy?.mode);
    if (legacy && !(legacyMode === "normal" ? normal : rebel)) {
      await write(MODE_KEYS[legacyMode], Data.packMode(legacy));
    }
    const source = [legacy, normal, rebel, random, quick].filter(Boolean).sort((a, b) => (a.savedAt || 0) - (b.savedAt || 0)).pop();
    if (!shared && source) await write(SHARED_KEY, Data.sharedFrom(source));
    if (legacy) await remove(LEGACY_KEY);
  }
  async function getShared() {
    await migrate();
    return read(SHARED_KEY);
  }
  async function getMode(mode) {
    await migrate();
    const name = modeName(mode);
    const [saved, shared] = await Promise.all([read(MODE_KEYS[name]), read(SHARED_KEY)]);
    return saved ? Data.merge(name, saved, shared) : null;
  }
  async function getInitial() {
    await migrate();
    const shared = await read(SHARED_KEY);
    const preferred = modeName(shared?.activeMode);
    const first = await getMode(preferred);
    if (first) return first;
    for (const mode of ["normal", "rebel", "random", "quick"]) {
      if (mode !== preferred) {
        const fallback = await getMode(mode);
        if (fallback) return fallback;
      }
    }
    return Data.merge("normal", null, shared);
  }
  async function seed(mode) {
    return Data.merge(modeName(mode), null, await getShared());
  }
  async function getManual(slot) {
    return read(`${MANUAL_PREFIX}${slot}`);
  }
  async function withShared(data) {
    return data ? Data.merge(modeName(data.mode), data, await getShared()) : null;
  }
  function schedule(state, onError, immediate) {
    const mode = modeName(state.mode);
    if (pending && pending.mode !== mode) drain();
    pending = {
      mode,
      modeData: Data.packMode(state),
      sharedData: Data.packShared(state),
      onError,
    };
    const promise = new Promise((resolve) => waiters.push(resolve));
    if (timer) clearTimeout(timer);
    if (immediate) drain();
    else timer = setTimeout(drain, 220);
    return promise;
  }
  function drain() {
    if (timer) clearTimeout(timer);
    timer = null;
    if (!pending) return chain;
    const job = pending;
    const batch = waiters;
    pending = null;
    waiters = [];
    chain = chain.then(async () => {
      try {
        await write(MODE_KEYS[job.mode], job.modeData);
        await write(SHARED_KEY, job.sharedData);
        failures = 0;
        batch.forEach((resolve) => resolve(true));
      } catch (err) {
        failures += 1;
        console.warn("save queue failed:", err.message);
        job.onError?.(failures >= 2 ? "自动存档连续失败，请稍后重试" : "存档写入失败，请稍后重试");
        batch.forEach((resolve) => resolve(false));
      }
    });
    return chain;
  }
  function queue(state, onError) {
    return schedule(state, onError, false);
  }
  function flush(state, onError) {
    return schedule(state, onError, true);
  }
  async function putManual(state, slot) {
    await drain();
    let ok = true;
    const task = chain.then(() => write(`${MANUAL_PREFIX}${slot}`, Data.packMode(state)));
    chain = task.catch((err) => {
      ok = false;
      console.warn("manual save failed:", err.message);
    });
    await chain;
    return ok;
  }
  function describe(data) {
    if (!data?.board?.length && !data?.coreSeal) return "空存档";
    const time = data.savedAt ? new Date(data.savedAt).toLocaleString("zh-CN", { hour12: false }) : "未知时间";
    return `保存时间 ${time} · 第 ${data.level || 1} 关 · ${data.score || 0} 积分`;
  }
  async function clearMode(mode) {
    await drain();
    await chain;
    await remove(MODE_KEYS[modeName(mode)]);
  }
  return {
    clearMode, describe, flush, getInitial, getManual, getMode, getShared,
    put: flush, putManual, queue, seed, withShared,
  };
})();
