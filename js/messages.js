/* ===== round 4: messages from Top, away diary, check-in, rare visitors ===== */
const esc = s =>
  String(s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const ymd = () => {
  const d = new Date(),
    p = n => String(n).padStart(2, '0');
  return `${d.getFullYear()}-${p(d.getMonth() + 1)}-${p(d.getDate())}`;
};
const PQ = [];
const enqueue = fn => PQ.push(fn);
setInterval(() => {
  if (PQ.length && !paneKind && S.name && !CG) PQ.shift()();
}, 1200);

/* --- messages from Top (edit messages.json on GitHub) --- */
let TM = [];
const tmNew = () => TM.filter(m => !S.tm.read.includes(m.id));
function loadTM() {
  fetch('messages.json?t=' + Date.now(), { cache: 'no-store' })
    .then(r => (r.ok ? r.json() : []))
    .then(j => {
      const list = Array.isArray(j) ? j : (j && j.messages) || [];
      const ok = m => m && m.id != null && m.text && (!m.date || String(m.date) <= ymd());
      TM = list.filter(m => ok(m) && !m.bottle).map(m => Object.assign({}, m, { id: String(m.id) }));
      BTJ = list.filter(m => ok(m) && m.bottle).map(m => Object.assign({}, m, { id: 'm' + m.id }));
      drawTM();
      const n = tmNew();
      if (n.length && S.name && S.tm.ann !== n[0].id) {
        S.tm.ann = n[0].id;
        save();
        setTimeout(() => {
          if (!S.sleep) say("Ploy! A paper plane just flew in. I think it's from Top!", 4500);
          sfx('letter');
        }, 3500);
      }
    })
    .catch(() => {});
}
function drawTM() {
  const on = S.name && tmNew().length > 0;
  $('#topmsg').innerHTML = on
    ? `<g transform="translate(244 92) rotate(-8)"><g class="notebob"><circle r="22" fill="transparent"/><path d="M-17 3L17-11L3 13L-1 5Z" fill="#fff8e1" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><path d="M-1 5L17-11" stroke="${INK}" stroke-width="1.6"/><path d="M-1 5L-4 11L3 13" fill="#efe2bf" stroke="${INK}" stroke-width="1.6" stroke-linejoin="round"/><path d="M12 11s-3.2-1.7-3.2-3.8a1.7 1.7 0 0 1 3.2-.8 1.7 1.7 0 0 1 3.2.8c0 2.1-3.2 3.8-3.2 3.8z" fill="#d8344a"/></g></g>`
    : '';
}
function readTM(id) {
  const m = TM.find(x => x.id === id);
  if (!m) return;
  const first = !S.tm.read.includes(id);
  if (first) {
    S.tm.read.push(id);
    gain(3);
  }
  drawTM();
  sfx('letter');
  save();
  locked = false;
  const body = T(String(m.text))
    .split(/\n+/)
    .map(x => `<p>${esc(x)}</p>`)
    .join('');
  open(
    `<div class="paper">${m.title ? `<p><b>${esc(T(String(m.title)))}</b></p>` : '<p>Dear Ploy,</p>'}${body}<p class="sig">— ${esc(m.from || 'Top')}</p></div><div class="row"><button class="btn ghost" data-a="letters">All letters</button><button class="btn" data-a="close">Close</button></div>`,
    'letter',
    true
  );
  if (first)
    setTimeout(() => {
      if (!S.sleep) {
        hearts(3);
        joy(1500);
      }
    }, 400);
}
function tmListHTML() {
  const r = TM.filter(m => S.tm.read.includes(m.id)).reverse();
  if (!r.length) return '';
  return `<p style="font:600 15px Fredoka,sans-serif;margin:16px 0 8px">From Top</p><div class="list">${r.map(m => `<div class="env">${ico('envOpen')}<div><b>${esc(T(String(m.title || 'Paper plane')))}</b><small>${esc(T(String(m.text)).slice(0, 38))}…</small></div><button class="btn sm" data-a="tm" data-id="${esc(m.id)}">Open</button></div>`).join('')}</div>`;
}

/* --- away diary --- */
const DIARY = {
  gen: [
    "Chased my tail for ten minutes. Didn't catch it. Will try again.",
    'Barked at a pigeon on the window. It did not leave. Rude.',
    "Hid one of your socks under the sofa. You'll never find it.",
    'Napped in the sunny spot by the window. Ten out of ten.',
    'Practiced my Samoyed smile in the mirror. Still perfect.',
    'Tried to open the fridge. Almost did it.',
    'Sat by the door listening for your footsteps.',
    'Rolled on the rug until I was 30% fluffier.',
    'Watched the planes in the sky and waved at every single one.',
    'Counted the lights on the string. Lost count at four.',
    'Sniffed your pillow. Still smells like you.',
    'Dreamed about a burger as big as a sofa.',
    'Shed enough fur to make a whole new puppy. Sorry.',
    'Guarded the house from a very suspicious leaf.'
  ],
  trip: [
    'Top came by to feed me. He talks about you a lot.',
    'Looked for your plane in the sky. Every plane might be you!',
    'Top asked me if you landed safely yet. I said probably.'
  ],
  night: [
    'Heard a noise at night. Bravely hid behind the sofa.',
    "Slept on your side of the bed. It's warmer."
  ],
  hungry: ['My tummy started growling. I ate a crumb I found. Still hungry.'],
  dirty: ['Found a puddle. We are now friends. Bath soon?'],
  toy: ['Played with Sunny the duck. Sunny won again.']
};
function diaryPane(gap, wasTrip) {
  const k = Math.min(5, 1 + Math.floor(gap / (3 * 36e5))),
    now = Date.now(),
    start = now - gap,
    pool = [...DIARY.gen];
  if (wasTrip) pool.push(...DIARY.trip, ...DIARY.trip);
  if (gap > 8 * 36e5) pool.push(...DIARY.night);
  if (S.st.hunger < 30) pool.push(...DIARY.hungry);
  if (S.st.clean < 35) pool.push(...DIARY.dirty);
  pool.push(...DIARY.toy);
  if (S.baby && S.lv >= MAXL)
    pool.push(
      `${S.baby} and I had a fluff fight. I let ${S.baby} win.`,
      `Taught ${S.baby} how to sit. ${S.baby} sat on me.`
    );
  const lines = [];
  while (lines.length < k && pool.length) {
    const x = pool.splice(Math.floor(Math.random() * pool.length), 1)[0];
    lines.push(x);
  }
  const ts = lines.map(() => start + Math.random() * gap).sort((a, b) => a - b),
    td = new Date().toDateString();
  const fmt = v => {
    const d = new Date(v),
      tm = d.toLocaleTimeString('en-US', { hour: 'numeric', minute: '2-digit' });
    return d.toDateString() === td ? tm : d.toLocaleDateString('en-US', { weekday: 'short' }) + ' ' + tm;
  };
  const hrs = Math.round(gap / 36e5);
  open(
    `<h2>While you were away</h2><p class="sub">${T('{n}')}'s diary · ${hrs < 48 ? hrs + ' hours' : Math.round(hrs / 24) + ' days'} without you</p><div class="paper diary">${lines.map((x, i) => `<p><b>${fmt(ts[i])}</b>${T(x)}</p>`).join('')}<p class="sig">— ${T('{n}')}</p></div><div class="row"><button class="btn" data-a="close">Aww, thank you</button></div>`,
    'diary',
    true
  );
  sfx('letter');
}

/* --- check-in calendar --- */
function checkIn() {
  if (!S.name) return;
  const d = ymd();
  if (S.ck.days.includes(d)) return;
  S.ck.days.push(d);
  const n = S.ck.days.length;
  save();
  if (n % 7 === 0) setTimeout(() => enqueue(() => ckReward(n)), 3200);
  else setTimeout(() => toast(`Paw stamp ${n % 7} of 7. ${7 - (n % 7)} more for a surprise!`), 2000);
}
function ckReward(n) {
  S.fur += 30;
  const it = ITEMS.find(i => i.ck === n);
  window._pxp = 25;
  sfx('level');
  save();
  render();
  open(
    `${ico('star', 'big')}<h2 style="text-align:center">${n} days together!</h2><p style="text-align:center">Thank you for coming back, Ploy. Here's a little gift from ${T('{n}')}: <b>+30 fur</b> and <b>+25 XP</b>.</p>${it ? `<p style="text-align:center">New in the closet: <b>${it.name}</b></p>` : ''}<div class="row" style="justify-content:center"><button class="btn" data-a="close">Yay!</button></div>`,
    'ck',
    true
  );
}
function ckHTML() {
  const n = S.ck.days.length,
    w = n % 7 === 0 && n ? 7 : n % 7;
  return `<h2>Check-in</h2><p class="sub">A paw stamp for every day you visit. Every 7 stamps opens a surprise. Total: ${n} day${n === 1 ? '' : 's'}.</p><div class="dots" style="margin:0 0 18px">${Array.from({ length: 7 }, (_, k) => `<i class="${k < w ? 'on' : ''}"></i>`).join('')}</div>`;
}

/* --- visitors book --- */
function visitorsHTML() {
  const FRIENDS_ = FRIENDS;
  {
    const FRIENDS = [...FRIENDS_, ...LOCALS];
    const met = FRIENDS.filter(d => S.met[d.name]).length;
    return `<p style="font:600 15px Fredoka,sans-serif;margin:16px 0 8px">Visitors · ${met}/${FRIENDS.length}</p><div class="list">${FRIENDS.map(
      d => {
        const m = S.met[d.name];
        return `<div class="env"><svg viewBox="-62 -78 124 82" width="44" height="30" aria-hidden="true"${m ? '' : ' style="filter:brightness(0);opacity:.18"'}>${friendSVG(d.b)}</svg><div><b>${m ? d.name + ' the ' + d.breed : '???'}</b><small>${m ? (d.at ? 'Met at ' + PLACES[d.at].name + ' ×' + m : 'Visited ×' + m) : d.at ? 'Lives somewhere you walk…' : d.rare ? 'A rare visitor. Keep checking in!' : 'Not met yet'}${d.rare && m ? ' · rare' : ''}</small></div><span></span></div>`;
      }
    ).join('')}</div>`;
  }
}
