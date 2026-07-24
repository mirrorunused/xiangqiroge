window.XQ = window.XQ || {};
window.XQ.Storage = (() => {
  const LEGACY_KEY = "xiangqi-rogue-save";
  const SHARED_KEY = "xiangqi-rogue-shared";
  const MODE_KEYS = {
    normal: "xiangqi-rogue-save-normal",
    rebel: "xiangqi-rogue-save-rebel",
    random: "xiangqi-rogue-save-random",
    recruit: "xiangqi-rogue-save-recruit",
    quick: "xiangqi-rogue-save-quick",
  };
  const MANUAL_PREFIX = "xiangqi-rogue-manual-";
  const Data = window.XQ.StorageData;
  const Backend = window.XQ.StorageBackend.create();
  let chain = Promise.resolve();
  let timer = null;
  let pending = null;
  let waiters = [];
  let failures = 0;
  let migrated = false, migrationTask = null;
  let pendingSince = 0, lastDrainAt = 0;
  const fingerprints = new Map();
  const QUEUE_DELAY = 1500;
  const MIN_WRITE_GAP = 6000;
  const MAX_WAIT = 10000;
  function modeName(mode) {
    return window.XQ.Mode.normalizeName(mode);
  }
  const read = Backend.read;
  const write = Backend.write;
  const remove = Backend.remove;
  async function migrate() {
    if (migrated) return;
    if (migrationTask) return migrationTask;
    migrationTask = (async () => {
      const [legacy, normal, rebel, random, recruit, quick, shared] = await Promise.all([
        read(LEGACY_KEY), read(MODE_KEYS.normal), read(MODE_KEYS.rebel), read(MODE_KEYS.random), read(MODE_KEYS.recruit), read(MODE_KEYS.quick), read(SHARED_KEY),
      ]);
      const legacyMode = modeName(legacy?.mode);
      if (legacy && !(legacyMode === "normal" ? normal : rebel)) {
        await write(MODE_KEYS[legacyMode], Data.packMode(legacy));
      }
      const source = [legacy, normal, rebel, random, recruit, quick].filter(Boolean).sort((a, b) => (a.savedAt || 0) - (b.savedAt || 0)).pop();
      if (!shared && source) await write(SHARED_KEY, Data.sharedFrom(source));
      if (legacy) await remove(LEGACY_KEY);
      migrated = true;
    })();
    try {
      await migrationTask;
    } finally {
      migrationTask = null;
    }
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
    for (const mode of ["normal", "rebel", "random", "recruit", "quick"]) {
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
    if (!pending) pendingSince = Date.now();
    pending = {
      mode,
      modeData: Data.packMode(state),
      sharedData: Data.packShared(state),
      onError,
    };
    const promise = new Promise((resolve) => waiters.push(resolve));
    if (timer) clearTimeout(timer);
    if (immediate) drain();
    else {
      const now = Date.now();
      const runAt = Math.min(pendingSince + MAX_WAIT, Math.max(now + QUEUE_DELAY, lastDrainAt + MIN_WRITE_GAP));
      timer = setTimeout(drain, Math.max(0, runAt - now));
    }
    return promise;
  }
  function drain() {
    if (timer) clearTimeout(timer);
    timer = null;
    if (!pending) return chain;
    const job = pending;
    const batch = waiters;
    pending = null;
    pendingSince = 0;
    waiters = [];
    chain = chain.then(async () => {
      try {
        await writeChanged(MODE_KEYS[job.mode], job.modeData);
        await writeChanged(SHARED_KEY, job.sharedData);
        lastDrainAt = Date.now();
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
  async function writeChanged(key, data) {
    const comparable = { ...data };
    delete comparable.savedAt;
    const fingerprint = JSON.stringify(comparable);
    if (fingerprints.get(key) === fingerprint) return;
    await write(key, data);
    fingerprints.set(key, fingerprint);
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
    const key = MODE_KEYS[modeName(mode)];
    await remove(key);
    fingerprints.delete(key);
  }
  async function retry(key) {
    Backend.reset(key);
    if (key) {
      return read(key, true);
    }
    migrated = false;
    return getInitial();
  }
  return {
    clearMode, describe, flush, getInitial, getManual, getMode, getShared,
    put: flush, putManual, queue, retry, seed, status: Backend.status, withShared,
  };
})();
