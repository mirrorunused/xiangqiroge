window.XQ = window.XQ || {};

window.XQ.FX = (() => {
  let audioCtx = null;

  function loading(method, ...args) {
    try {
      window.dzmm?.loading?.[method]?.(...args);
    } catch (err) {
      console.warn("loading event failed:", err.message);
    }
  }

  function tone(freq, ms) {
    try {
      audioCtx = audioCtx || new (window.AudioContext || window.webkitAudioContext)();
      const osc = audioCtx.createOscillator();
      const gain = audioCtx.createGain();
      osc.frequency.value = freq;
      gain.gain.value = 0.04;
      osc.connect(gain).connect(audioCtx.destination);
      osc.start();
      setTimeout(() => osc.stop(), ms);
    } catch (err) {
      console.warn("audio failed:", err.message);
    }
  }

  return { loading, tone };
})();
