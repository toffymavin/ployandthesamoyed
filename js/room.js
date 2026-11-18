/* --- day / night --- */
let tod = '';
function applyTime() {
  const h = new Date().getHours(),
    m = h >= 7 && h < 17 ? 'day' : (h >= 17 && h < 19) || h === 6 ? 'dusk' : 'night';
  if (m === tod) return;
  tod = m;
  const P = {
    day: ['#7cc6ef', '#d8f0fb', '#8fbcaa', 0, 0.18, 0.55],
    dusk: ['#4b3f7c', '#f4a77a', '#3f4a62', 0.35, 0.35, 0.85],
    night: ['#0b2219', '#1f4d3c', '#163a2e', 1, 0.5, 1]
  }[m];
  $('#sk1').setAttribute('stop-color', P[0]);
  $('#sk2').setAttribute('stop-color', P[1]);
  if ($('#roofs')) {
    $('#roofs').setAttribute('fill', P[2]);
    $('#stars').setAttribute('opacity', P[3]);
    $('#glowE').setAttribute('opacity', P[4] / 0.5);
  }
  if ($('#wn1')) {
    const W = { day: ['#7cc6ef', '#d8f0fb'], dusk: ['#4b3f7c', '#f4a77a'], night: ['#1b2a4a', '#3d3a6b'] }[m];
    $('#wn1').setAttribute('stop-color', W[0]);
    $('#wn2').setAttribute('stop-color', W[1]);
    $('#moon').setAttribute('opacity', m === 'night' ? 1 : 0);
  }
  $('#scene').style.setProperty('--bulb', P[5]);
  $('#scene').dataset.tod = m;
}

/* --- decorations --- */
function decoSVG(id) {
  if (id === 'snowman')
    return `<g transform="translate(40 266)"><ellipse cx="0" cy="0" rx="20" ry="4" fill="#0b2a20" opacity=".15"/><circle cx="0" cy="-16" r="17" fill="#fff" stroke="${OL}" stroke-width="2.5"/><circle cx="0" cy="-42" r="12" fill="#fff" stroke="${OL}" stroke-width="2.5"/><rect x="-10" y="-60" width="20" height="5" fill="#2a2420"/><rect x="-6" y="-72" width="12" height="13" fill="#2a2420"/><rect x="-6" y="-63" width="12" height="3" fill="#d8344a"/><circle cx="-4" cy="-45" r="1.8" fill="${OL}"/><circle cx="4" cy="-45" r="1.8" fill="${OL}"/><path d="M0-41l9 2-9 2z" fill="#f08a2c"/><path d="M-10-34q10 6 20 0" stroke="#ffc21a" stroke-width="5" fill="none" stroke-linecap="round"/><path d="M-16-22l-14-10M16-22l14-10" stroke="#6b3f22" stroke-width="2.5" stroke-linecap="round"/><circle cx="0" cy="-20" r="1.8" fill="${OL}"/><circle cx="0" cy="-12" r="1.8" fill="${OL}"/></g>`;
  if (id === 'cushion')
    return `<g transform="translate(270 270)"><ellipse cx="0" cy="0" rx="58" ry="12" fill="#e9b400" stroke="${OL}" stroke-width="2.5"/><ellipse cx="0" cy="-4" rx="52" ry="9" fill="#ffd23f"/><path d="M-30-3q30 6 60 0" stroke="#e9b400" stroke-width="2" fill="none"/></g>`;
  if (id === 'gifts')
    return `<g transform="translate(96 266)"><rect x="-22" y="-22" width="24" height="22" rx="2" fill="#d8344a" stroke="${OL}" stroke-width="2"/><rect x="-12" y="-22" width="4" height="22" fill="#ffd23f"/><rect x="-4" y="-16" width="22" height="16" rx="2" fill="#ffd23f" stroke="${OL}" stroke-width="2"/><rect x="5" y="-16" width="4" height="16" fill="#3aa0c8"/><path d="M-10-22q-6-8 0-8q4 0 0 8q4-8 8-6q2 4-8 6" fill="none" stroke="#ffd23f" stroke-width="2"/></g>`;
  if (id === 'lamp')
    return `<g transform="translate(336 266)"><rect x="-2.5" y="-110" width="5" height="110" fill="#2a2420"/><rect x="-8" y="-4" width="16" height="4" fill="#2a2420"/><circle cx="0" cy="-118" r="16" fill="#ffd23f" opacity=".25" class="bulb"/><path d="M-9-108h18l-3-16H-6z" fill="#fff3c4" stroke="#2a2420" stroke-width="2"/><path d="M-10-124h20l-10-8z" fill="#2a2420"/></g>`;
  return '';
}
function drawDeco() {
  $('#deco').innerHTML = DECOS.filter(d => S.deco.includes(d.id))
    .map(d => decoSVG(d.id))
    .join('');
}

/* --- friends --- */
function friendSVG(b) {
  if (b === 'crab') return crabSVG();
  if (b === 'bunny') return bunnySVG();
  if (b === 'cat' || b === 'tabby') return catSVG(b);
  const C = {
    samo: { c: '#fdf6f3', d: '#e6ecf0', w: '#fff', ear: 'pt', tail: 'curl', leg: 15, col: '#7cc4ee' },
    shiba: { c: '#e39a52', d: '#c97c35', w: '#fff6ea', ear: 'pt', tail: 'curl', leg: 15, col: '#d8344a' },
    corgi: { c: '#ee9d48', d: '#d27f2c', w: '#fff6ea', ear: 'big', tail: '', leg: 8, col: '#3aa0c8' },
    golden: { c: '#e8b766', d: '#c9953f', w: '#f6dcaa', ear: 'flop', tail: 'long', leg: 17, col: '#5f9a2c' },
    husky: { c: '#6f7a87', d: '#56606c', w: '#fff', ear: 'pt', tail: 'curl', leg: 16, col: '#d8344a' },
    pom: { c: '#f0a040', d: '#d88828', w: '#ffe9c8', ear: 'pt', tail: 'curl', leg: 9, col: '#ff8fa3' }
  }[b];
  const L = C.leg,
    by = -(L + 13),
    hx = 28,
    hy = by - 15;
  let s = '';
  const lg = (x, c, fill) =>
    `<g class="fl ${c}"><rect x="${x - 5}" y="${by + 4}" width="10" height="${-by - 4}" rx="4" fill="${fill}" stroke="${OL}" stroke-width="2.2"/></g>`;
  s += lg(-16, 'fa', C.d) + lg(14, 'fb', C.d);
  if (C.tail === 'curl')
    s += `<path d="M-26 ${by - 4}q-14-4-10-16q6-8 14-2q4 6-4 8" fill="none" stroke="${OL}" stroke-width="10" stroke-linecap="round"/><path d="M-26 ${by - 4}q-14-4-10-16q6-8 14-2q4 6-4 8" fill="none" stroke="${C.c}" stroke-width="5.5" stroke-linecap="round"/>`;
  if (C.tail === 'long')
    s += `<path d="M-27 ${by - 3}q-16 2-24 16" fill="none" stroke="${OL}" stroke-width="10" stroke-linecap="round"/><path d="M-27 ${by - 3}q-16 2-24 16" fill="none" stroke="${C.c}" stroke-width="5.5" stroke-linecap="round"/>`;
  s += `<ellipse cx="0" cy="${by}" rx="30" ry="15" fill="${C.c}" stroke="${OL}" stroke-width="2.5"/><ellipse cx="8" cy="${by + 7}" rx="17" ry="5.5" fill="${C.w}"/>`;
  s += lg(-22, 'fb', C.c) + lg(8, 'fa', C.c);
  if (C.ear === 'pt' || C.ear === 'big') {
    const e = C.ear === 'big' ? 30 : 24;
    s += `<path d="M${hx - 9} ${hy - 8}L${hx - 5} ${hy - e}L${hx + 4} ${hy - 11}Z" fill="${C.c}" stroke="${OL}" stroke-width="2.2" stroke-linejoin="round"/><path d="M${hx - 6} ${hy - 10}L${hx - 4.5} ${hy - e + 7}L${hx + 1} ${hy - 11}Z" fill="#f6b5ad"/>`;
  }
  s += `<rect x="${hx - 14}" y="${hy + 8}" width="14" height="6" rx="3" fill="${C.col}" stroke="${OL}" stroke-width="1.5"/>`;
  s += `<circle cx="${hx}" cy="${hy}" r="15" fill="${C.c}" stroke="${OL}" stroke-width="2.5"/><ellipse cx="${hx + 4}" cy="${hy + 6}" rx="9" ry="5.5" fill="${C.w}"/><ellipse cx="${hx + 12}" cy="${hy + 4}" rx="9" ry="6.5" fill="${C.w}" stroke="${OL}" stroke-width="2"/><ellipse cx="${hx + 20}" cy="${hy + 2}" rx="3" ry="2.3" fill="${OL}"/><circle cx="${hx + 5}" cy="${hy - 3}" r="2.3" fill="${OL}"/><path d="M${hx + 13} ${hy + 8}q3 2 6 0" stroke="${OL}" stroke-width="1.6" fill="none" stroke-linecap="round"/>`;
  if (C.ear === 'flop')
    s += `<ellipse cx="${hx - 7}" cy="${hy + 1}" rx="6" ry="11" fill="${C.d}" stroke="${OL}" stroke-width="2.2" transform="rotate(14 ${hx - 7} ${hy + 1})"/>`;
  return s;
}
let fr = null,
  nextFriend = Date.now() + rnd(90e3, 180e3);
function startFriend() {
  const rare = Math.random() < 0.08,
    d = pick(FRIENDS.filter(x => !!x.rare === rare)),
    fromRight = dogX < 180,
    tx = Math.max(40, Math.min(320, dogX + (fromRight ? 125 : -125)));
  fr = { d, x: fromRight ? 410 : -50, tx, dir: fromRight ? -1 : 1, state: 'in', until: 0 };
  if (dogZ > 0.1) runTo(dogX, dogX, null, false);
  $('#friend').innerHTML = `<g id="frB">${friendSVG(d.b)}</g>`;
}
function friendTick(dt, now) {
  if (!fr) {
    if (now > nextFriend) {
      nextFriend = now + rnd(150e3, 320e3);
      if (!S.sleep && !paneKind && S.name && !CG) startFriend();
    }
    return;
  }
  const g = $('#friend');
  if (fr.state === 'in') {
    const sp = 40 * dt;
    if (Math.abs(fr.tx - fr.x) <= sp) {
      fr.x = fr.tx;
      fr.state = 'stay';
      fr.until = now + 6500;
      stopWalk(7000);
      dir = fr.x > dogX ? 1 : -1;
      const n = fr.d.name,
        firstMeet = !S.met[n];
      S.met[n] = (S.met[n] || 0) + 1;
      if (fr.d.hi) {
        if (firstMeet) {
          toast(`New friend: ${n} the ${fr.d.breed}`);
          gain(5);
        }
        say(pick(fr.d.hi), 5000);
      } else if (fr.d.rare) {
        if (firstMeet) {
          toast(`Rare visitor! ${n} the ${fr.d.breed}`);
          gain(10);
        }
        hearts(4);
        say(
          pick([
            `Ploy, look!! ${n} the ${fr.d.breed} came all this way!`,
            `${n} hardly ever visits! Quick, say hi, Ploy!`
          ]),
          5000
        );
      } else
        say(
          pick([
            `Ploy, this is my friend ${n} the ${fr.d.breed}!`,
            `${n} came to say hi!`,
            `Look, Ploy! ${n} is visiting!`
          ]),
          4500
        );
      sfx('yip');
      hearts(3);
      S.st.happy = clamp(S.st.happy + 10);
      gain(3);
      fxAt(sz('heart', 20), fr.x / 3.6, (266 - 60) / 3, 'heart', 1200, 0);
    } else fr.x += Math.sign(fr.tx - fr.x) * sp;
  } else if (fr.state === 'stay') {
    if (now > fr.until) {
      fr.state = 'out';
      fr.dir = -fr.dir;
      say(`Bye, ${fr.d.name}! Come back soon!`);
    }
  } else {
    fr.x += fr.dir * 46 * dt;
    if (fr.x < -70 || fr.x > 430) {
      fr = null;
      g.innerHTML = '';
      return;
    }
  }
  g.classList.toggle('walk', fr.state !== 'stay');
  g.setAttribute(
    'transform',
    `translate(${f(fr.x)} 266) scale(${fr.dir * (fr.d.sz || 0.9)} ${fr.d.sz || 0.9})`
  );
}

/* --- welcome sign, plane, note --- */
let signT;
function showSign() {
  const x = Math.max(46, Math.min(314, dogX + (dogX <= 230 ? 112 : -112)));
  $('#sign').innerHTML =
    `<g transform="translate(${f(x)} 268)"><rect x="-2" y="-44" width="4" height="44" fill="#8a5530" stroke="${OL}" stroke-width="1.2"/><rect x="-40" y="-74" width="80" height="32" rx="5" fill="#ffd23f" stroke="${INK}" stroke-width="2.2"/><text x="0" y="-61" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="600" font-size="10" fill="${INK}">Welcome home,</text><text x="0" y="-49" text-anchor="middle" font-family="Fredoka,sans-serif" font-weight="700" font-size="11" fill="${INK}">Ploy!</text></g>`;
  clearTimeout(signT);
  signT = setTimeout(() => ($('#sign').innerHTML = ''), 30000);
}
function flyBy() {
  const g = document.createElementNS('http://www.w3.org/2000/svg', 'g');
  g.setAttribute('class', 'plane');
  g.innerHTML = `<g transform="scale(1.15)"><path d="M-30 4h8l-10-16h-6l3 16z" fill="#5b2a86" stroke="#2a1840" stroke-width="1"/><path d="M-35-10h6l5 9" stroke="#e3b23c" stroke-width="2.4" fill="none"/><path d="M-36 4h11l-4-5h-6z" fill="#5b2a86"/><rect x="-36" y="1" width="74" height="10" rx="5" fill="#fff" stroke="#2a1840" stroke-width="1"/><path d="M38 6q4 0 6 3l-8 2h-4z" fill="#fff" stroke="#2a1840" stroke-width="1"/><path d="M34 3l4 0 2 3h-6z" fill="#2a3a6b"/><path d="M-34 9h70" stroke="#5b2a86" stroke-width="2"/><path d="M-34 10.5h68" stroke="#e3b23c" stroke-width="1"/><circle cx="-26" cy="5" r=".9" fill="#2a3a6b"/><circle cx="-22" cy="5" r=".9" fill="#2a3a6b"/><circle cx="-18" cy="5" r=".9" fill="#2a3a6b"/><circle cx="-14" cy="5" r=".9" fill="#2a3a6b"/><circle cx="-10" cy="5" r=".9" fill="#2a3a6b"/><circle cx="-6" cy="5" r=".9" fill="#2a3a6b"/><circle cx="-2" cy="5" r=".9" fill="#2a3a6b"/><circle cx="2" cy="5" r=".9" fill="#2a3a6b"/><circle cx="6" cy="5" r=".9" fill="#2a3a6b"/><circle cx="10" cy="5" r=".9" fill="#2a3a6b"/><circle cx="14" cy="5" r=".9" fill="#2a3a6b"/><circle cx="18" cy="5" r=".9" fill="#2a3a6b"/><circle cx="22" cy="5" r=".9" fill="#2a3a6b"/><circle cx="26" cy="5" r=".9" fill="#2a3a6b"/><circle cx="30" cy="5" r=".9" fill="#2a3a6b"/><path d="M-4 8l-10 10h5l14-10z" fill="#d9d2e6" stroke="#2a1840" stroke-width="1"/><rect x="-10" y="12" width="9" height="4" rx="2" fill="#5b2a86" stroke="#2a1840" stroke-width=".8"/><path d="M-2 4l-8-6h4l10 6z" fill="#d9d2e6" stroke="#2a1840" stroke-width=".8"/></g>`;
  $('#skyfx').appendChild(g);
  setTimeout(() => g.remove(), 5600);
}
const noteReady = () => S.name && S.notes.day !== today() && S.notes.i < DAILY.length;
function drawNote() {
  const on = noteReady();
  $('#note').innerHTML = on
    ? `<g transform="translate(46 242)"><g class="notebob"><circle r="20" fill="transparent"/><rect x="-13" y="-9" width="26" height="18" rx="2.5" fill="#fff8e1" stroke="${INK}" stroke-width="2"/><path d="M-12-8l12 9 12-9" fill="none" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><path d="M0 4s-4-2-4-5a2 2 0 0 1 4-1 2 2 0 0 1 4 1c0 3-4 5-4 5z" fill="#d8344a"/></g></g>`
    : '';
  if (on && S.notes.ann !== today()) {
    S.notes.ann = today();
    setTimeout(
      () => say('Ploy! I found a note for you!'),
      Date.now() - (window._wel || 0) < 20000 ? 16000 : 2500
    );
  }
}
function readNote(i) {
  const idx = i == null ? S.notes.i : i;
  if (i == null) {
    if (!noteReady()) return;
    S.notes.read.push(idx);
    S.notes.i++;
    S.notes.day = today();
    drawNote();
    gain(2);
  }
  sfx('letter');
  save();
  open(
    `<div class="paper"><p>Today's note</p><p>${DAILY[idx]}</p><p class="sig">— note #${idx + 1}</p></div><div class="row"><button class="btn ghost" data-a="letters">All letters</button><button class="btn" data-a="close">Close</button></div>`,
    'note',
    true
  );
}
