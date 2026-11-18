const KEY = 'ploy-samoyed-v1',
  $ = s => document.querySelector(s);
const clamp = (v, a = 0, b = 100) => Math.max(a, Math.min(b, v));
const f = n => Math.round(n * 10) / 10;
const pick = a => a[Math.floor(Math.random() * a.length)];
const rnd = (a, b) => a + Math.random() * (b - a);
const today = () => {
  const d = new Date();
  return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate();
};
const need = l => 20 + l * 10,
  MAXL = 10;
const stageOf = l => (l >= 7 ? 2 : l >= 4 ? 1 : 0);
const STAGE = ['Puppy', 'Junior', 'Grown-up'];
const P = [
  { k: 1, leg: 19, brx: 36, bry: 28, hr: 35, tl: 15 },
  { k: 1.05, leg: 25, brx: 42, bry: 32, hr: 34, tl: 18 },
  { k: 1.1, leg: 30, brx: 49, bry: 36, hr: 33, tl: 21 }
];
const INK = '#3a2a12',
  K = '#221c18',
  LN = '#2a2420',
  OL = '#2a2420',
  FUR = '#fdf3f1',
  SH = '#e3ecf0';
