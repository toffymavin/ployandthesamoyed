/* ---------- Snack Cart ---------- */
G.juice = `<path d="M14 14h20l-3 28H17z" fill="#fff8e1" stroke="${INK}" stroke-width="2.6" stroke-linejoin="round"/><path d="M15.5 22h17l-2 18H18z" fill="#ffb347"/><path d="M28 14l6-10" stroke="#d8344a" stroke-width="3" stroke-linecap="round"/><circle cx="17" cy="14" r="5" fill="#ffd23f" stroke="${INK}" stroke-width="2"/>`;
const CART_FOOD = [
  ['somtam', 'Som tam'],
  ['steak', 'Steak'],
  ['burger', 'Burger'],
  ['treat', 'Cookie'],
  ['juice', 'Juice']
];
const SEATS = ['1A', '1B', '1C', '1D', '2A', '2B', '2C', '2D'];
function cartStart() {
  const g = (MG = {
    id: 'cart',
    run: true,
    round: 0,
    lives: 3,
    score: 0,
    pax: [],
    phase: '',
    cur: -1,
    timer: null
  });
  g.end = () => {
    clearTimeout(g.timer);
    cartOver();
  };
  cartRound();
}
function cartRound() {
  const g = MG;
  if (!g || g.id !== 'cart') return;
  g.round++;
  const k = Math.min(8, 1 + g.round),
    seats = [...SEATS]
      .sort(() => Math.random() - 0.5)
      .slice(0, k)
      .sort((a, b) => SEATS.indexOf(a) - SEATS.indexOf(b));
  g.pax = seats.map(s => ({ seat: s, k: pick(PUPS), o: pick(CART_FOOD)[0], st: '' }));
  g.phase = 'memo';
  g.cur = -1;
  const ms = 900 + k * 1100;
  cartDraw(
    g.round === 1
      ? 'Ladies and gentle-pups, the snack cart is coming! Remember every order.'
      : `Round ${g.round}: ${k} hungry passengers. Remember their orders!`,
    ms
  );
  sfx('letter');
  clearTimeout(g.timer);
  g.timer = setTimeout(() => {
    if (MG !== g) return;
    g.phase = 'serve';
    g.cur = 0;
    cartDraw('Now serve them! What did this passenger order?');
  }, ms);
}
function cartDraw(msg, bar) {
  const g = MG;
  if (!g || g.id !== 'cart') return;
  const seat = s => {
    const p = g.pax.find(x => x.seat === s),
      i = g.pax.indexOf(p);
    if (!p) return `<div class="seat"><span class="sl">${s}</span></div>`;
    const show = g.phase === 'memo' || p.st,
      cur = g.phase === 'serve' && i === g.cur;
    return `<div class="seat full${cur ? ' cur' : ''}${p.st === 'ok' ? ' ok' : p.st === 'no' ? ' no' : ''}"><span class="sl">${s}</span><span class="obub">${show ? `<svg viewBox="0 0 48 48">${G[p.o]}</svg>` : cur ? '?' : '…'}</span><svg class="pf" viewBox="-60 -72 120 128">${pupFace(p.k)}</svg></div>`;
  };
  const row = r =>
    `<div class="srow">${seat(r + 'A')}${seat(r + 'B')}<div class="aisle"></div>${seat(r + 'C')}${seat(r + 'D')}</div>`;
  const html = `<h2>Snack Cart</h2><p class="sub" id="ctmsg">${msg || ''}</p><div class="ctop"><b>Round ${g.round}</b><span>Score ${g.score}</span><span>${'♥'.repeat(g.lives)}<i style="opacity:.25">${'♥'.repeat(3 - g.lives)}</i></span></div>
 <div class="cabin">${row(1)}${row(2)}</div>${bar ? `<div class="ctbar"><i style="animation-duration:${bar}ms"></i></div>` : ''}
 <div class="foods">${CART_FOOD.map(([id, n]) => `<button class="food" data-a="ctpick" data-f="${id}"${g.phase !== 'serve' ? ' disabled' : ''}>${ico(id)}<small>${n}</small></button>`).join('')}</div>
 <div class="row"><button class="btn ghost" data-a="mgstop">Stop</button></div>`;
  if (paneKind === 'game' && $('.cabin')) {
    $('#pane').innerHTML = html;
  } else open(html, 'game', true, true);
}
function cartPick(f) {
  const g = MG;
  if (!g || g.id !== 'cart' || g.phase !== 'serve') return;
  const p = g.pax[g.cur];
  if (!p) return;
  if (p.o === f) {
    p.st = 'ok';
    g.score += 10 + g.round * 2;
    sfx('coin');
  } else {
    p.st = 'no';
    g.lives--;
    sfx('no');
  }
  g.cur++;
  const done = g.cur >= g.pax.length;
  if (g.lives <= 0) {
    g.phase = '';
    cartDraw(
      `Oops! ${p.seat} wanted ${CART_FOOD.find(x => x[0] === p.o)[1].toLowerCase()}. The flight is over!`
    );
    g.timer = setTimeout(cartOver, 1600);
    return;
  }
  if (done) {
    g.phase = '';
    const all = g.pax.every(x => x.st === 'ok');
    if (all) g.score += g.round * 5;
    cartDraw(all ? `Perfect service! +${g.round * 5} bonus` : 'Round done!');
    g.timer = setTimeout(cartRound, 1500);
    return;
  }
  cartDraw(
    p.st === 'ok'
      ? pick(['Yum! Next passenger…', 'Thank you, crew! Next…', "Perfect! Who's next?"])
      : `Oops, ${p.seat} wanted ${CART_FOOD.find(x => x[0] === p.o)[1].toLowerCase()}. Next…`
  );
}
function cartOver() {
  const g = MG;
  if (!g || g.id !== 'cart') return;
  clearTimeout(g.timer);
  mgEnd('cart', g.score, g.score / 6, `Served passengers for ${g.round} round${g.round > 1 ? 's' : ''}.`);
}
