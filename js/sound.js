/* sound: everything synthesized with Web Audio */
let AC = null,
  sfxG,
  musG,
  audioOn = false;
function ac() {
  if (!AC) {
    try {
      AC = new (window.AudioContext || window.webkitAudioContext)();
      const m = AC.createGain();
      m.gain.value = 0.9;
      m.connect(AC.destination);
      sfxG = AC.createGain();
      sfxG.connect(m);
      musG = AC.createGain();
      musG.gain.value = 0;
      musG.connect(m);
    } catch (e) {
      AC = null;
      return null;
    }
  }
  if (AC.state === 'suspended') AC.resume().catch(() => {});
  return AC;
}
function tone(fq, t, d, o = {}) {
  const { type = 'sine', v = 0.2, to = 0, dest = sfxG, a = 0.006 } = o,
    os = AC.createOscillator(),
    g = AC.createGain();
  os.type = type;
  os.frequency.setValueAtTime(fq, t);
  if (to) os.frequency.exponentialRampToValueAtTime(to, t + d);
  g.gain.setValueAtTime(0, t);
  g.gain.linearRampToValueAtTime(v, t + a);
  g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  os.connect(g);
  g.connect(dest);
  os.start(t);
  os.stop(t + d + 0.05);
}
let NB = null;
function noise(t, d, o = {}) {
  const { v = 0.2, fq = 1200, q = 1, type = 'bandpass', dest = sfxG } = o;
  if (!NB) {
    NB = AC.createBuffer(1, AC.sampleRate, AC.sampleRate);
    const x = NB.getChannelData(0);
    for (let i = 0; i < x.length; i++) x[i] = Math.random() * 2 - 1;
  }
  const s = AC.createBufferSource(),
    fl = AC.createBiquadFilter(),
    g = AC.createGain();
  s.buffer = NB;
  fl.type = type;
  fl.frequency.value = fq;
  fl.Q.value = q;
  g.gain.setValueAtTime(v, t);
  g.gain.exponentialRampToValueAtTime(0.0001, t + d);
  s.connect(fl);
  fl.connect(g);
  g.connect(dest);
  s.start(t, rnd(0, 0.5));
  s.stop(t + d);
}
const SFX = {
  pat: t => {
    tone(620, t, 0.14, { to: 940, v: 0.12 });
    tone(1240, t + 0.02, 0.1, { v: 0.03 });
  },
  yip: t => {
    tone(720, t, 0.09, { type: 'triangle', to: 1150, v: 0.16 });
    tone(860, t + 0.12, 0.11, { type: 'triangle', to: 1350, v: 0.14 });
  },
  voice: (t, n) => {
    for (let i = 0; i < n; i++) {
      const fq = rnd(540, 860);
      tone(fq, t + i * 0.08, 0.065, { type: 'square', v: 0.028, to: fq * rnd(1.05, 1.25) });
    }
  },
  chomp: t => {
    for (let i = 0; i < 3; i++) {
      noise(t + i * 0.17, 0.07, { v: 0.32, fq: 1700, q: 0.7 });
      tone(180, t + i * 0.17, 0.06, { v: 0.08 });
    }
  },
  ball: t => {
    [0, 0.3, 0.52, 0.68].forEach((d, i) => tone(320 - i * 30, t + d, 0.13, { to: 150, v: 0.17 - i * 0.035 }));
  },
  bubble: t => {
    for (let i = 0; i < 9; i++)
      tone(rnd(450, 1000), t + i * 0.085 + rnd(0, 0.04), 0.08, { to: rnd(1200, 1900), v: 0.07 });
  },
  sleep: t => {
    [784, 659, 523, 392].forEach((fq, i) => tone(fq, t + i * 0.24, 0.6, { v: 0.09 }));
  },
  wake: t => {
    [392, 523, 659, 784].forEach((fq, i) => tone(fq, t + i * 0.11, 0.4, { v: 0.09 }));
  },
  level: t => {
    [523, 659, 784, 1047, 784, 1047].forEach((fq, i) => {
      tone(fq, t + i * 0.11, 0.4, { type: 'triangle', v: 0.13 });
      tone(fq * 2, t + i * 0.11, 0.25, { v: 0.03 });
    });
  },
  coin: t => {
    tone(988, t, 0.08, { type: 'square', v: 0.05 });
    tone(1319, t + 0.08, 0.35, { type: 'square', v: 0.05 });
  },
  fur: t => {
    tone(900, t, 0.09, { to: 1500, v: 0.09 });
  },
  letter: t => {
    [1047, 1319, 1568, 2093].forEach((fq, i) => tone(fq, t + i * 0.09, 0.9, { v: 0.06 }));
  },
  tap: t => {
    tone(560, t, 0.05, { v: 0.05 });
  },
  step: t => {
    noise(t, 0.07, { v: 0.045, fq: 700, q: 0.5, type: 'lowpass' });
  },
  brush: t => {
    noise(t, 0.14, { v: 0.07, fq: 3200, q: 0.9 });
  },
  shutter: t => {
    noise(t, 0.05, { v: 0.25, fq: 2500, q: 0.6 });
    noise(t + 0.07, 0.08, { v: 0.18, fq: 1800, q: 0.6 });
  },
  squeak: t => {
    tone(1100, t, 0.09, { type: 'triangle', to: 1700, v: 0.12 });
    tone(1500, t + 0.1, 0.12, { type: 'triangle', to: 1000, v: 0.1 });
  },
  no: t => {
    tone(330, t, 0.12, { type: 'triangle', v: 0.09 });
    tone(262, t + 0.13, 0.18, { type: 'triangle', v: 0.09 });
  }
};
function sfx(n, x) {
  if (!S.sfx || !AC || AC.state !== 'running') return;
  try {
    SFX[n](AC.currentTime + 0.01, x);
  } catch (e) {}
}
/* music: an original music-box waltz, 96 bpm */
const NT = {
  C3: 131,
  D3: 147,
  E3: 165,
  F3: 175,
  G3: 196,
  A3: 220,
  B3: 247,
  C4: 262,
  D4: 294,
  E4: 330,
  F4: 349,
  G4: 392,
  A4: 440,
  B4: 494,
  C5: 523,
  D5: 587,
  E5: 659,
  F5: 698,
  G5: 784,
  A5: 880,
  B5: 988,
  C6: 1047,
  D6: 1175,
  E6: 1319
};
const MEL =
  'E5 G5 C6|B5 A5 G5|A5 G5 E5|D5 - -|F5 A5 D6|C6 B5 A5|G5 E5 C5|D5 - -|E5 G5 C6|B5 A5 G5|A5 C6 E6|D6 - -|C6 A5 F5|G5 E5 D5|C5 - -|- - -'
    .split('|')
    .map(b => b.split(' '));
const CH = [
  ['C3', 'E4', 'G4'],
  ['G3', 'D4', 'B4'],
  ['A3', 'E4', 'C5'],
  ['G3', 'D4', 'B4'],
  ['F3', 'C4', 'A4'],
  ['D3', 'F4', 'A4'],
  ['C3', 'E4', 'G4'],
  ['G3', 'D4', 'B4'],
  ['C3', 'E4', 'G4'],
  ['G3', 'D4', 'B4'],
  ['A3', 'E4', 'C5'],
  ['G3', 'D4', 'B4'],
  ['F3', 'C4', 'A4'],
  ['G3', 'D4', 'B4'],
  ['C3', 'E4', 'G4'],
  ['C3', 'G3', 'E4']
];
let mNext = 0,
  mStep = 0,
  mOn = false;
function musicTick() {
  if (!mOn || !AC || AC.state !== 'running') return;
  const beat = 60 / 96;
  if (mNext < AC.currentTime) mNext = AC.currentTime + 0.1;
  while (mNext < AC.currentTime + 0.4) {
    const bar = Math.floor(mStep / 3) % 16,
      b = mStep % 3,
      n = MEL[bar][b],
      c = CH[bar];
    if (n !== '-') {
      tone(NT[n], mNext, 1.3, { v: 0.06, dest: musG });
      tone(NT[n] * 2, mNext, 0.35, { v: 0.012, dest: musG });
    }
    if (b === 0) tone(NT[c[0]], mNext, 1.6, { type: 'triangle', v: 0.05, dest: musG });
    else {
      tone(NT[c[1]], mNext, 0.7, { v: 0.022, dest: musG });
      tone(NT[c[2]], mNext, 0.7, { v: 0.022, dest: musG });
    }
    noise(mNext, 0.05, { v: b === 0 ? 0.02 : 0.012, fq: 7000, q: 0.8, type: 'highpass', dest: musG });
    mNext += beat;
    mStep++;
  }
}
setInterval(musicTick, 120);
function musicLevel() {
  if (!AC) return;
  const t = AC.currentTime,
    v = S.music ? (S.sleep ? 0.45 : 1) : 0;
  musG.gain.cancelScheduledValues(t);
  musG.gain.setTargetAtTime(v, t, 0.4);
  mOn = S.music;
}
let silentEl = null;
function silentWav() {
  const n = 8000,
    b = new ArrayBuffer(44 + n * 2),
    d = new DataView(b),
    w = (o, s) => {
      for (let i = 0; i < s.length; i++) d.setUint8(o + i, s.charCodeAt(i));
    };
  w(0, 'RIFF');
  d.setUint32(4, 36 + n * 2, true);
  w(8, 'WAVE');
  w(12, 'fmt ');
  d.setUint32(16, 16, true);
  d.setUint16(20, 1, true);
  d.setUint16(22, 1, true);
  d.setUint32(24, 8000, true);
  d.setUint32(28, 16000, true);
  d.setUint16(32, 2, true);
  d.setUint16(34, 16, true);
  w(36, 'data');
  d.setUint32(40, n * 2, true);
  return URL.createObjectURL(new Blob([b], { type: 'audio/wav' }));
}
function unlock() {
  const c = ac();
  if (!c) return;
  try {
    if (navigator.audioSession && navigator.audioSession.type !== 'playback')
      navigator.audioSession.type = 'playback';
  } catch (e) {}
  if (!audioOn) {
    audioOn = true;
    try {
      const b = c.createBuffer(1, 1, 22050),
        s = c.createBufferSource();
      s.buffer = b;
      s.connect(c.destination);
      s.start(0);
    } catch (e) {}
    try {
      silentEl = new Audio(silentWav());
      silentEl.loop = true;
      silentEl.setAttribute('playsinline', '');
      silentEl.volume = 0.01;
      const p = silentEl.play();
      if (p) p.catch(() => {});
    } catch (e) {}
  }
  if (c.state !== 'running')
    c.resume()
      .then(musicLevel)
      .catch(() => {});
  else if (!mSet) {
    mSet = true;
    musicLevel();
  }
}
let mSet = false;
['touchend', 'pointerup', 'click', 'keydown'].forEach(ev =>
  document.addEventListener(ev, unlock, { capture: true, passive: true })
);
document.addEventListener('visibilitychange', () => {
  if (!AC) return;
  if (document.hidden) {
    AC.suspend().catch(() => {});
    if (silentEl) silentEl.pause();
  } else if (audioOn) {
    AC.resume().catch(() => {});
    if (silentEl) {
      const p = silentEl.play();
      if (p) p.catch(() => {});
    }
  }
});
function drawSound() {
  const on = (k, b) => {
    b.classList.toggle('off', !S[k]);
    b.setAttribute('aria-pressed', S[k] ? 'true' : 'false');
  };
  on('sfx', $('#sndS'));
  on('music', $('#sndM'));
}
