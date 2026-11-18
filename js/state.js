/* state */
const fresh = () => ({
  v: 1,
  mess: 0,
  name: '',
  last: Date.now(),
  st: { hunger: 80, happy: 80, clean: 90, energy: 85 },
  xp: 0,
  lv: 1,
  sleep: false,
  fur: 0,
  pats: 0,
  eq: { hat: null, neck: 'scarf' },
  sfx: true,
  music: true,
  read: [],
  fluff: 0,
  strokes: 0,
  snacks: 0,
  tr: {},
  trip: null,
  stamps: {},
  spent: 0,
  owned: [],
  deco: [],
  notes: { i: 0, day: '', ann: '', read: [] },
  cg: { day: '', n: 0 },
  bx: { day: '', n: 0 },
  fc: { day: '', t: '', n: 0 },
  baby: '',
  visited: {},
  wk: { day: '', n: 0 },
  lastP: [],
  gift: { day: '', ready: false, opened: false },
  toys: [],
  giftLog: [],
  pc: {},
  ended: false,
  q: { day: today(), p: {}, done: [] },
  tm: { read: [], ann: '' },
  ck: { days: [] },
  met: {},
  duck: null
});
function load() {
  try {
    const r = localStorage.getItem(KEY);
    if (r) {
      const o = JSON.parse(r),
        b = fresh();
      return Object.assign(b, o, {
        st: Object.assign(b.st, o.st),
        eq: Object.assign(b.eq, o.eq),
        q: Object.assign(b.q, o.q),
        notes: Object.assign(b.notes, o.notes || {})
      });
    }
  } catch (e) {}
  return null;
}
let canStore = false;
try {
  localStorage.setItem(KEY + '-t', '1');
  canStore = localStorage.getItem(KEY + '-t') === '1';
  localStorage.removeItem(KEY + '-t');
} catch (e) {}
let resetting = false;
function save() {
  if (resetting) return;
  S.last = Date.now();
  try {
    localStorage.setItem(KEY, JSON.stringify(S));
  } catch (e) {}
}
let S = load();
const first = !S;
if (first) S = fresh();
const T = s => s.replace(/\{n\}/g, S.name || 'your pup');

function decay(h) {
  const s = S.st;
  if (h <= 0) return;
  S.fluff = clamp((S.fluff || 0) - (h * 15) / 24, 0);
  if (S.trip) {
    h *= 0.35;
    setTimeout(() => {
      if (S.trip) {
        S.st.hunger = Math.max(S.st.hunger, 55);
        S.st.clean = Math.max(S.st.clean, 45);
        S.st.happy = Math.max(S.st.happy, 50);
      }
    }, 0);
  }
  S.mess = clamp((S.mess || 0) + (h * 100) / 30);
  if (S.sleep) {
    s.energy = clamp(s.energy + 150 * h);
    s.hunger = clamp(s.hunger - 4 * h, 5);
    s.clean = clamp(s.clean - 1 * h, 5);
    if (s.energy >= 100) S.sleep = false;
  } else {
    s.hunger = clamp(s.hunger - 8 * h, 5);
    s.happy = clamp(s.happy - (s.hunger < 25 ? 8 : 5) * h, 10);
    s.clean = clamp(s.clean - 4 * h, 5);
    s.energy = clamp(s.energy - 3 * h, 5);
  }
}
let joyUntil = 0;
function mood() {
  const s = S.st;
  if (S.sleep) return 'sleep';
  if (Date.now() < joyUntil) return 'happy';
  if (s.hunger < 30) return 'hungry';
  if (s.clean < 30) return 'dirty';
  if (s.energy < 25) return 'tired';
  if (s.happy < 35) return 'sad';
  return s.happy >= 70 ? 'happy' : 'ok';
}
