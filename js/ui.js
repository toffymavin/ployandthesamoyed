/* ui helpers */
let sayT,
  lastSay = 0;
function say(t, ms = 3800) {
  const e = $('#say');
  e.textContent = T(t);
  sfx('voice', Math.min(6, 2 + Math.floor(T(t).split(' ').length / 3)));
  e.classList.add('on');
  placeSay();
  lastSay = Date.now();
  clearTimeout(sayT);
  sayT = setTimeout(() => e.classList.remove('on'), ms);
}
let toT;
function toast(t) {
  const e = $('#toast');
  e.textContent = t;
  e.classList.add('on');
  clearTimeout(toT);
  toT = setTimeout(() => e.classList.remove('on'), 2600);
}
function fxAt(html, x, y, cls, ms, dx) {
  const e = document.createElement('span');
  e.className = cls;
  e.innerHTML = html;
  e.style.left = x + '%';
  e.style.top = y + '%';
  if (dx != null) e.style.setProperty('--dx', dx + 'px');
  $('#fx').appendChild(e);
  setTimeout(() => e.remove(), ms);
}
const sz = (k, w) => `<svg viewBox="0 0 48 48" width="${w}" height="${w}">${G[k]}</svg>`;
function hearts(n) {
  for (let i = 0; i < n; i++)
    setTimeout(
      () => fxAt(sz('heart', 22), dogPX() + rnd(-8, 8), headY() + rnd(-4, 6), 'heart', 1200, rnd(-30, 30)),
      i * 140
    );
}
function anim(c, ms) {
  const a = $('#dogA');
  a.classList.remove(c);
  void a.getBoundingClientRect();
  a.classList.add(c);
  setTimeout(() => a.classList.remove(c), ms);
}
function joy(ms) {
  joyUntil = Date.now() + ms;
  drawDog();
  anim('joy', ms);
  setTimeout(() => drawDog(), ms + 50);
}

/* progress */
function resetQuests() {
  if (S.q.day !== today()) S.q = { day: today(), p: {}, done: [] };
}
function prog(id, n = 1) {
  resetQuests();
  const q = QUESTS.find(x => x.id === id);
  if (!q) return;
  const before = S.q.p[id] || 0;
  S.q.p[id] = Math.min(q.g, before + n);
  if (before < q.g && S.q.p[id] >= q.g && !S.q.done.includes(id)) toast('Quest ready to claim: ' + T(q.t));
}
function gain(x) {
  S.xp += x;
  const ups = [];
  while (S.lv < MAXL && S.xp >= need(S.lv)) {
    S.xp -= need(S.lv);
    S.lv++;
    ups.push(S.lv);
  }
  if (ups.length) {
    save();
    levelUp(ups);
  }
  render();
}
function levelUp(ups) {
  const to = ups[ups.length - 1],
    from = ups[0] - 1,
    grew = stageOf(from) !== stageOf(to),
    items = ITEMS.filter(i => i.lv && ups.includes(i.lv)),
    li = LETTERS.findIndex(l => ups.includes(l.lv));
  sfx('level');
  setTimeout(() => sfx('yip'), 700);
  stopWalk(2500);
  drawDog(true);
  if (grew) {
    anim('jump', 900);
    setTimeout(
      () => say(stageOf(to) === 2 ? 'Look at me, Ploy! All grown up!' : 'I got bigger! Did you notice?'),
      300
    );
  }
  open(
    `${ico('star', 'big')}<h2 style="text-align:center">Level ${to}!</h2>
 ${grew ? `<p style="text-align:center"><b>${T('{n}')} grew into a ${STAGE[stageOf(to)].toLowerCase()} Samoyed!</b> ${stageOf(to) === 2 ? 'Look at all that floof.' : 'Bigger paws, same smile.'}</p>` : ''}
 ${items.length ? `<p style="text-align:center">New in the closet: ${items.map(i => i.name).join(', ')}</p>` : ''}
 ${li >= 0 && ups[ups.length - 1] !== MAXL ? `<p style="text-align:center">A letter arrived for you, Ploy.</p>` : ''}
 ${to === MAXL ? `<p style="text-align:center">${T('{n}')} is all grown up. Thank you for taking such good care of ${T('{n}')}.</p>` : ''}
 <div class="row" style="justify-content:center">${to === MAXL && !S.ended ? '<button class="btn" data-a="ending">Yay!</button>' : li >= 0 ? `<button class="btn ghost" data-a="close">Later</button><button class="btn" data-a="read" data-i="${li}">Read letter</button>` : '<button class="btn" data-a="close">Yay!</button>'}</div>`,
    'lvup',
    true
  );
}
const unlocked = i =>
  i.ck
    ? S.ck.days.length >= i.ck
    : i.lv
      ? S.lv >= i.lv
      : i.fur
        ? S.fur >= i.fur
        : i.city
          ? !!S.stamps[i.city]
          : i.shop
            ? S.owned.includes(i.id)
            : false;
