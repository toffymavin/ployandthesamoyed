/* ===== round 6: arcade — Fluffy Pop, Snack Cart, Fluffy Jump, Pack the Suitcase ===== */
const MG_LIST = [
  {
    id: 'pop',
    name: 'Fluffy Pop',
    d: 'Swipe 3 or more of the same pup to pop them. Fill the fluff meter for a Fluffy Burst!'
  },
  { id: 'cart', name: 'Snack Cart', d: 'Remember what every passenger ordered, then serve them.' },
  {
    id: 'jump',
    name: 'Fluffy Jump',
    d: 'Tap to jump over suitcases and grab the stars. Tap again in the air to double jump.'
  },
  {
    id: 'pack',
    name: 'Pack the Suitcase',
    d: 'Fit everything in before boarding closes. Tap a piece to turn it.'
  }
];
const MGS = () => S.mg || (S.mg = {});
let MG = null;
const svgImg = (inner, vb, w = 200, h = 200) => {
  const i = new Image();
  i.src =
    'data:image/svg+xml;charset=utf-8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${vb}" width="${w}" height="${h}">${inner}</svg>`
    );
  return i;
};
/* round pup faces, used by Fluffy Pop and as passengers in Snack Cart */
const PUPS = ['samo', 'shiba', 'cat', 'bunny', 'duck'];
function pupFace(k) {
  const O = OL,
    eye = (x, y) =>
      `<circle cx="${x}" cy="${y}" r="4.6" fill="${O}"/><circle cx="${x + 1.6}" cy="${y - 1.6}" r="1.5" fill="#fff"/>`,
    blush = `<ellipse cx="-24" cy="16" rx="7" ry="4.5" fill="#ff9fb6" opacity=".55"/><ellipse cx="24" cy="16" rx="7" ry="4.5" fill="#ff9fb6" opacity=".55"/>`;
  if (k === 'duck')
    return `<path d="M-40 18q-8-6 0-12" stroke="${O}" stroke-width="3" fill="#ffd23f"/><circle cx="0" cy="6" r="42" fill="#ffd23f" stroke="${O}" stroke-width="3.5"/><path d="M-6-36q4-12 12-8q-6 2-6 8" fill="#ffd23f" stroke="${O}" stroke-width="3" stroke-linejoin="round"/>${eye(-15, 0)}${eye(15, 0)}<path d="M-12 12q12-8 24 0q-12 12-24 0z" fill="#f08a2c" stroke="${O}" stroke-width="2.6" stroke-linejoin="round"/>${blush}<path d="M22-24q8 2 10 10" stroke="#fff" stroke-width="4" fill="none" stroke-linecap="round" opacity=".7"/>`;
  const C = {
      samo: ['#fdf6f3', '#fff', '#f6b5ad'],
      shiba: ['#e39a52', '#fff6ea', '#f6b5ad'],
      cat: ['#55555f', '#ffffff', '#f6b5ad'],
      bunny: ['#ffd3de', '#fff3f6', '#ff8fa3']
    }[k],
    [c, w, ear] = C;
  let s = '';
  if (k === 'bunny')
    s += `<g stroke="${O}" stroke-width="3"><ellipse cx="-16" cy="-44" rx="10" ry="22" fill="${c}" transform="rotate(-10 -16 -44)"/><ellipse cx="16" cy="-44" rx="10" ry="22" fill="${c}" transform="rotate(10 16 -44)"/></g><ellipse cx="-16" cy="-42" rx="4.5" ry="14" fill="${ear}" transform="rotate(-10 -16 -42)"/><ellipse cx="16" cy="-42" rx="4.5" ry="14" fill="${ear}" transform="rotate(10 16 -42)"/>`;
  else
    s += `<path d="M-38-14L-30-46L-8-34ZM38-14L30-46L8-34Z" fill="${c}" stroke="${O}" stroke-width="3" stroke-linejoin="round"/><path d="M-31-22L-28-38L-16-31ZM31-22L28-38L16-31Z" fill="${ear}"/>`;
  if (k === 'samo')
    s += `<g fill="${c}" stroke="${O}" stroke-width="3">${[
      [-40, 10],
      [-34, 30],
      [40, 10],
      [34, 30]
    ]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="9"/>`)
      .join('')}</g>`;
  s += `<circle cx="0" cy="6" r="42" fill="${c}" stroke="${O}" stroke-width="3.5"/>`;
  if (k === 'samo')
    s += `<g fill="${c}">${[
      [-40, 10],
      [-34, 30],
      [40, 10],
      [34, 30]
    ]
      .map(([x, y]) => `<circle cx="${x}" cy="${y}" r="7"/>`)
      .join('')}</g>`;
  if (k === 'shiba' || k === 'cat')
    s += `<path d="M-30 14q0 26 30 26q30 0 30-26q-10 4-18 0q-6-8-12-8q-6 0-12 8q-8 4-18 0z" fill="${w}"/>`;
  if (k === 'shiba')
    s += `<circle cx="-14" cy="-12" r="3.4" fill="${w}"/><circle cx="14" cy="-12" r="3.4" fill="${w}"/>`;
  s +=
    eye(-15, 0) +
    eye(15, 0) +
    `<path d="M-5 9h10l-5 5z" fill="${k === 'cat' || k === 'bunny' ? '#e8708e' : O}" stroke="${O}" stroke-width="2" stroke-linejoin="round"/>`;
  s +=
    k === 'cat' || k === 'bunny'
      ? `<path d="M-8 18q4 4 8 0q4 4 8 0" stroke="${O}" stroke-width="2.6" fill="none" stroke-linecap="round"/>`
      : `<path d="M-10 17q10 12 20 0" fill="#e8708e" stroke="${O}" stroke-width="2.6" stroke-linejoin="round"/>`;
  if (k === 'cat')
    s += `<path d="M-24 14h-14M-24 20l-12 4M24 14h14M24 20l12 4" stroke="#ddd" stroke-width="2" stroke-linecap="round"/>`;
  return s + blush;
}
let PUPI = null;
const pupImgs = () =>
  PUPI ||
  (PUPI = Object.fromEntries(
    [...PUPS, 'star'].map(k => [
      k,
      svgImg(k === 'star' ? starFace() : pupFace(k), '-60 -72 120 128', 240, 256)
    ])
  ));
function starFace() {
  return `<circle cx="0" cy="6" r="42" fill="#fff6c2" stroke="#e9b400" stroke-width="3.5"/><path d="M0-26L9-6L30-4L14 10L19 31L0 20L-19 31L-14 10L-30-4L-9-6Z" fill="#ffd23f" stroke="${OL}" stroke-width="3" stroke-linejoin="round"/><circle cx="-6" cy="4" r="2.6" fill="${OL}"/><circle cx="6" cy="4" r="2.6" fill="${OL}"/>`;
}
const mgPt = (cv, e) => {
  const r = cv.getBoundingClientRect();
  return [((e.clientX - r.left) / r.width) * cv.width, ((e.clientY - r.top) / r.height) * cv.height];
};
function rr(c, x, y, w, h, r) {
  c.beginPath();
  if (c.roundRect) c.roundRect(x, y, w, h, r);
  else c.rect(x, y, w, h);
}
function hud(c, score, secs, W = 640) {
  c.fillStyle = 'rgba(255,248,225,.94)';
  rr(c, 14, 14, W - 28, 58, 29);
  c.fill();
  c.fillStyle = INK;
  c.font = '600 30px Fredoka, sans-serif';
  c.textBaseline = 'middle';
  c.textAlign = 'left';
  c.fillText(`Score ${score}`, 36, 44);
  if (secs != null) {
    c.textAlign = 'center';
    c.fillText(`${Math.max(0, Math.ceil(secs))}s`, W / 2, 44);
  }
  c.textAlign = 'left';
}
function banner(c, t, sub, W = 640, H = 720) {
  c.fillStyle = 'rgba(255,248,225,.95)';
  rr(c, W / 2 - 230, H / 2 - 70, 460, sub ? 140 : 100, 30);
  c.fill();
  c.strokeStyle = INK;
  c.lineWidth = 4;
  c.stroke();
  c.fillStyle = INK;
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.font = '700 44px Fredoka, sans-serif';
  c.fillText(t, W / 2, H / 2 - (sub ? 22 : 20));
  if (sub) {
    c.font = '600 24px Fredoka, sans-serif';
    c.fillStyle = '#8a6a2c';
    c.fillText(sub, W / 2, H / 2 + 30);
  }
  c.textAlign = 'left';
}

/* arcade menu */
function arcadePane() {
  if (blockedAsleep()) return;
  const R = MGS();
  open(
    `<h2>Arcade</h2><p class="sub">Mini games for ${T('{n}')} and Ploy. The first 3 games of each kind every day give XP.</p><div class="list">${MG_LIST.map(g => `<button class="opt" data-a="mg" data-id="${g.id}"><svg viewBox="-60 -72 120 128" aria-hidden="true">${g.id === 'pop' ? pupFace('samo') : g.id === 'cart' ? pupFace('cat') : g.id === 'jump' ? pupFace('shiba') : pupFace('bunny')}</svg><span><b>${g.name}</b><small>${g.d}${R[g.id] && R[g.id].best ? ` · Best ${R[g.id].best}` : ''}</small></span></button>`).join('')}</div><div class="row"><button class="btn ghost" data-a="play">Back</button></div>`,
    'play'
  );
}
function mgStart(id) {
  if (blockedAsleep()) return;
  if (S.st.energy < 15) {
    locked = false;
    close();
    return say('Too sleepy to play… nap first?');
  }
  locked = false;
  stopWalk(4000);
  CG = { mini: id };
  ({ pop: popStart, cart: cartStart, jump: jumpStart, pack: packStart })[id]();
}
function mgStop() {
  if (!MG) return;
  MG.end ? MG.end() : null;
}
function mgEnd(id, score, xpRaw, lines) {
  if (MG) {
    MG.run = false;
    MG.cleanup && MG.cleanup();
  }
  MG = null;
  CG = null;
  const R = MGS(),
    r = R[id] || (R[id] = { best: 0, day: '', n: 0 });
  if (r.day !== today()) {
    r.day = today();
    r.n = 0;
  }
  const xp = r.n < 3 ? Math.max(2, Math.min(30, Math.round(xpRaw))) : 0;
  r.n++;
  const best = score > r.best;
  if (best) r.best = score;
  const fur = Math.min(8, Math.floor(xpRaw / 4));
  S.fur += fur;
  S.st.energy = clamp(S.st.energy - 6, 5);
  S.st.happy = clamp(S.st.happy + 15);
  S.st.hunger = clamp(S.st.hunger - 4, 5);
  prog('play');
  const g = MG_LIST.find(x => x.id === id);
  locked = false;
  open(
    `${ico('star', 'big')}<h2 style="text-align:center">${g.name}: ${score}</h2><p style="text-align:center">${lines || ''}${best && score ? ' <b>New best!</b>' : ` Best: ${r.best}.`}</p><p style="text-align:center" class="sub">${xp ? `+${xp} XP` : 'XP is for the first 3 games each day.'}${fur ? ` · +${fur} fur` : ''}</p><div class="row" style="justify-content:center"><button class="btn ghost" data-a="arcade">Arcade</button>${S.st.energy >= 15 ? `<button class="btn" data-a="mg" data-id="${id}">Play again</button>` : ''}</div>`,
    'cgend',
    true
  );
  if (xp) gain(xp);
  render();
  save();
  setTimeout(
    () =>
      say(
        best && score
          ? 'New record! Ploy is the best!'
          : pick(['Again! Again!', 'That was fun!', 'One more game?'])
      ),
    400
  );
}
