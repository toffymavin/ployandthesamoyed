/* --- home objects: note, cookie, gift, Sunny, toys --- */
const TOYS = [
  { id: 'ball', name: 'Yellow tennis ball' },
  { id: 'star', name: 'Star plush' },
  { id: 'banana', name: 'Squeaky banana' },
  { id: 'sunflower', name: 'Sunflower chew' },
  { id: 'bee', name: 'Bumblebee plush' },
  { id: 'lemon', name: 'Squeaky lemon' },
  { id: 'chick', name: 'Rubber chick' }
];
const GIFTNOTE = [
  'Something yellow for {n}.',
  'For the fluffiest guard dog in town.',
  '{n}, take good care of Ploy for me.',
  'Saw this and thought of you two.',
  'A little toy for a big floof.',
  'For long days while Ploy is flying.'
];
function toyArt(id) {
  const O = INK;
  return (
    {
      duck: `<ellipse cx="0" cy="4" rx="13" ry="10" fill="#ffd23f" stroke="${O}" stroke-width="2"/><circle cx="8" cy="-8" r="8" fill="#ffd23f" stroke="${O}" stroke-width="2"/><path d="M14-8l7 2-7 3z" fill="#f08a2c" stroke="${O}" stroke-width="1.5" stroke-linejoin="round"/><circle cx="10" cy="-10" r="1.5" fill="${O}"/><path d="M-6 2q5 5 10 0" stroke="#e9b400" stroke-width="2" fill="none"/>`,
      ball: `<circle r="11" fill="#d7e84a" stroke="${O}" stroke-width="2"/><path d="M-8-7c5 3 5 11 0 14M8-7c-5 3-5 11 0 14" stroke="#fff" stroke-width="2.2" fill="none"/>`,
      star: `<path d="M0-13l3.8 8 8.6 1.2-6.2 6 1.5 8.6L0 6.7l-7.7 4.1 1.5-8.6-6.2-6 8.6-1.2z" fill="#ffd23f" stroke="${O}" stroke-width="2" stroke-linejoin="round"/><circle cx="-3" cy="-1" r="1.2" fill="${O}"/><circle cx="3" cy="-1" r="1.2" fill="${O}"/>`,
      banana: `<path d="M-13-4q6 16 26 8q-4 6-12 7-10 0-14-15z" fill="#ffd23f" stroke="${O}" stroke-width="2" stroke-linejoin="round"/><path d="M-13-4l-2-3" stroke="#6b3f22" stroke-width="2.5" stroke-linecap="round"/>`,
      sunflower: `${[0, 45, 90, 135, 180, 225, 270, 315].map(r => `<ellipse cx="0" cy="-8" rx="3.6" ry="6" fill="#ffd23f" stroke="${O}" stroke-width="1.2" transform="rotate(${r})"/>`).join('')}<circle r="5.5" fill="#8a5530" stroke="${O}" stroke-width="1.5"/>`,
      bee: `<ellipse cx="0" cy="0" rx="12" ry="9" fill="#ffd23f" stroke="${O}" stroke-width="2"/><path d="M-3-8.6v17.2M4-8v16" stroke="${O}" stroke-width="3"/><ellipse cx="-3" cy="-12" rx="5" ry="4" fill="#e3f4ff" stroke="${O}" stroke-width="1.5"/><ellipse cx="5" cy="-12" rx="5" ry="4" fill="#e3f4ff" stroke="${O}" stroke-width="1.5"/>`,
      lemon: `<ellipse cx="0" cy="0" rx="12" ry="9" fill="#fff06a" stroke="${O}" stroke-width="2"/><path d="M11-2l4-1M-11 1l-4 1" stroke="${O}" stroke-width="2" stroke-linecap="round"/><path d="M2-9q4-5 8-3" fill="#7fbf3a" stroke="${O}" stroke-width="1.5"/>`,
      chick: `<ellipse cx="0" cy="3" rx="10" ry="9" fill="#ffe14d" stroke="${O}" stroke-width="2"/><circle cx="3" cy="-7" r="6.5" fill="#ffe14d" stroke="${O}" stroke-width="2"/><path d="M9-8l5 1-5 3z" fill="#f08a2c"/><circle cx="4" cy="-8" r="1.3" fill="${O}"/>`
    }[id] || ''
  );
}
const giftReady = () => S.name && S.gift.day === today() && S.gift.ready && !S.gift.opened;
function rollGift() {
  if (!S.name || S.gift.day === today()) return;
  const firstDay = !S.gift.day;
  S.gift = {
    day: today(),
    ready: !firstDay && Math.random() < 0.4 && S.toys.length < TOYS.length,
    opened: false
  };
  save();
}
function drawWall() {
  const got = CITIES.filter(c => S.stamps[c.id]);
  $('#stampwall').innerHTML = got
    .slice(0, 12)
    .map((c, i) => {
      const x = 210 + (i % 6) * 22,
        y = 86 + Math.floor(i / 6) * 27,
        r = ((i * 37) % 7) - 3;
      return `<g transform="rotate(${r} ${x + 9.5} ${y + 11.5})"><rect x="${x + 8}" y="${y - 2}" width="4" height="4" rx="1" fill="#d8344a" opacity=".85"/>${stampSVG(c, 1).replace('<svg viewBox="0 0 100 124" class="stp" aria-hidden="true">', `<svg x="${x}" y="${y}" width="19" height="23.5" viewBox="0 0 100 124">`)}</g>`;
    })
    .join('');
}
function drawHome() {
  rollGift();
  drawWall();
  $('#gift').innerHTML = giftReady()
    ? `<g transform="translate(124 252)"><g class="notebob"><circle r="20" fill="transparent"/><rect x="-15" y="-10" width="30" height="22" rx="2" fill="#ffd23f" stroke="${INK}" stroke-width="2"/><rect x="-17" y="-16" width="34" height="8" rx="2" fill="#ffe36e" stroke="${INK}" stroke-width="2"/><rect x="-3" y="-16" width="6" height="28" fill="#d8344a"/><path d="M0-16q-10-10-12-2q2 4 12 2q10-10 12-2q-2 4-12 2" fill="#d8344a" stroke="${INK}" stroke-width="1.5"/></g></g>`
    : '';
  $('#sunny').innerHTML =
    toyOut === 'duck'
      ? ''
      : `<g id="duckG" transform="translate(${duckPos().join(' ')}) scale(1.05)"><ellipse cx="0" cy="12" rx="13" ry="3" fill="#000" opacity=".12"/><circle r="22" fill="transparent"/>${toyArt('duck')}</g>`;
  const spots = [
    [300, 286],
    [330, 272],
    [262, 290],
    [226, 292],
    [344, 290],
    [150, 292],
    [56, 292]
  ];
  $('#toys').innerHTML = S.toys
    .slice(0, 7)
    .map((t, i) =>
      t === toyOut
        ? ''
        : `<g class="toy" data-t="${t}" transform="translate(${spots[i][0]} ${spots[i][1]}) scale(.8)"><circle r="20" fill="transparent"/>${toyArt(t)}</g>`
    )
    .join('');
}
const TSPOT = [
  [300, 286],
  [330, 272],
  [262, 290],
  [226, 292],
  [344, 290],
  [150, 292],
  [56, 292]
];
const duckPos = () => S.duck || [86, 266];
const toyPos = id => (id === 'duck' ? duckPos() : TSPOT[Math.max(0, S.toys.indexOf(id))]);
const toyName = id =>
  id === 'duck' ? 'Sunny' : (TOYS.find(t => t.id === id) || { name: 'toy' }).name.toLowerCase();
function openGift() {
  if (!giftReady()) return;
  const left = TOYS.filter(t => !S.toys.includes(t.id)),
    toy = pick(left.length ? left : TOYS),
    note = T(pick(GIFTNOTE));
  S.gift.opened = true;
  if (!S.toys.includes(toy.id)) S.toys.push(toy.id);
  S.giftLog.push({ t: toy.id, note });
  sfx('level');
  save();
  drawHome();
  open(
    `<div class="giftbox"><svg viewBox="-40 -40 80 80" class="gb"><g class="lid"><rect x="-22" y="-14" width="44" height="10" rx="2" fill="#ffe36e" stroke="${INK}" stroke-width="2"/><rect x="-3" y="-14" width="6" height="10" fill="#d8344a"/></g><g class="toyup">${toyArt(toy.id)}</g><rect x="-20" y="-4" width="40" height="30" rx="2" fill="#ffd23f" stroke="${INK}" stroke-width="2"/><rect x="-3" y="-4" width="6" height="30" fill="#d8344a"/></svg></div><h2 style="text-align:center">A mystery gift!</h2><p style="text-align:center">Someone left a box by the door. Inside: <b>${toy.name}</b>!</p><div class="hand">${note}<br><span>— Top</span></div><div class="row" style="justify-content:center"><button class="btn" data-a="close">Thank you, Top!</button></div>`,
    'gift',
    true
  );
  setTimeout(
    () => say(pick(['A present! Is it for me?!', 'New toy! New toy!', 'Top is the best pet-sitter!'])),
    600
  );
}
function sunnyPane() {
  sfx('fur');
  setTimeout(() => sfx('fur'), 140);
  open(
    `<div class="gicons"><svg viewBox="-30 -30 60 60" style="width:96px;height:96px">${toyArt('duck')}</svg></div><h2 style="text-align:center">Sunny the duck</h2><p style="text-align:center">${T('{n}')}'s favorite toy. ${T('{n}')} takes Sunny everywhere and never lets anyone else chew him.</p><p style="text-align:center" class="sub">Given by</p><div class="hand c">Top 💛<span>Squeeze gently, he quacks.</span></div><div class="row" style="justify-content:center"><button class="btn" data-a="close">Aww</button><button class="btn" data-a="toy" data-t="duck">Play with Sunny</button></div>`,
    'sunny'
  );
}

/* --- trips: gate send-off, pet-sitter, postcards, welcome home --- */
const PCNOTE = [
  'Safe flight, see you when you land.',
  'Hope {c} was kind to you.',
  'Did you eat something good in {c}?',
  'Rest well today. You earned it.',
  'Missed you around here.',
  'Tell me everything about {c}.'
];
function departSeq(id) {
  fadeTo(() => {
    setScene('gate');
    dogX = 170;
    dogZ = 0;
    dir = 1;
    place();
    setTimeout(flyBy, 900);
    say(`Fly safe, Ploy! I'll guard the sofa until you're back from ${cityName(id)}.`, 5000);
  });
  setTimeout(
    () =>
      fadeTo(() => {
        setScene('room');
        drawHome();
        say("Top said he'd drop by to feed me. See you soon, Ploy!", 4500);
      }),
    7500
  );
}
function landSeq(c, hrs, firstTime) {
  const visits = Math.max(1, Math.round(hrs / 8)),
    bowls = visits * 2,
    pats = 20 + visits * 17;
  const go = () => {
    setScene('room');
    drawHome();
    drawWall();
    runTo(180, 420, () => {
      anim('jump', 900);
      hearts(6);
      sfx('yip');
      joy(3000);
      showSign();
      const b = $('#banner');
      b.innerHTML = 'Welcome home!<small>Rest well today 💛</small>';
      b.classList.add('on');
      setTimeout(() => b.classList.remove('on'), 4200);
      setTimeout(
        () =>
          open(
            `<h2 style="text-align:center">While you were away</h2><p style="text-align:center">Top dropped by ${visits === 1 ? 'once' : visits + ' times'} to look after ${T('{n}')} while you were in ${c.name}.</p><div class="hand">${T('{n}')} ate ${bowls} bowls of kibble and got about ${pats} head pats. Very good boy.<br><span>— Top</span></div><div class="row" style="justify-content:center"><button class="btn" data-a="postcard" data-id="${c.id}" data-new="${firstTime ? 1 : ''}">Next</button></div>`,
            'sitter',
            true
          ),
        4600
      );
    });
  };
  PLACES[scene] || scene !== 'room' ? fadeTo(go) : go();
}
function postcardHTML(c, isNew) {
  const pc = S.pc[c.id] || {},
    it = ITEMS.find(i => i.id === c.item);
  return `<div class="pcard"><div class="pcl"><b>${c.name}</b>${pc.note ? `<div class="hand">${pc.note.replace('{c}', c.name)}<br><span>— Top</span></div>` : '<p class="sub" style="margin:8px 0 0!important">Greetings from ' + c.name + '!</p>'}</div><div class="pcr">${stampSVG(c, 1)}</div></div>${isNew ? `<p style="text-align:center">You brought ${T('{n}')} a souvenir: <b>${it.name}</b>.</p>` : ''}`;
}
function postcardPane(id, isNew) {
  const c = CITIES.find(x => x.id === id);
  if (!c) return;
  open(
    `<h2 style="text-align:center">${isNew ? 'A postcard from ' + c.name : 'Postcard'}</h2>${postcardHTML(c, isNew)}<div class="row" style="justify-content:center">${isNew ? `<button class="btn ghost" data-a="close">Later</button><button class="btn" data-a="wear" data-id="${c.item}">Try it on</button>` : `<button class="btn ghost" data-a="stamps">Back</button>`}</div>`,
    'stamp',
    true
  );
}

/* --- ending at max level --- */
const ENDLETTER = [
  'Look at him now, all grown up and fluffy! 🐾',
  'He made it this far because you never forgot about him, even between all those flights.',
  "I made this little guy so you'd always have something waiting for you, wherever you land.",
  'Something to make you smile on long layovers, and to keep you company on quiet nights in a hotel far from home.',
  'And if you ever want someone real waiting for you when you land…',
  "I'd really like that to be me.",
  'So, dinner after your next flight? Your pick: som tam, steak, or burgers 🍔'
];
let carry = false;
function ending() {
  locked = false;
  close();
  carry = true;
  drawDog(true);
  if (PLACES[scene]) setScene('room');
  runTo(180, dogX < 180 ? -60 : 420, () => {
    say('Ploy… I have something for you.', 4000);
    sfx('yip');
    setTimeout(
      () =>
        open(
          `<div class="gicons">${ico('envOpen')}</div><h2 style="text-align:center">${T('{n}')} brought you a letter</h2><div class="row" style="justify-content:center"><button class="btn" data-a="endletter">Open it</button></div>`,
          'end',
          true,
          true
        ),
      3200
    );
  });
}
function endLetter() {
  carry = false;
  drawDog(true);
  S.ended = true;
  const i = LETTERS.findIndex(l => l.lv === MAXL);
  if (i >= 0 && !S.read.includes(i)) S.read.push(i);
  sfx('letter');
  save();
  open(
    `<div class="paper hw">${ENDLETTER.map(x => `<p>${x}</p>`).join('')}<p class="sig">— Top 💛</p></div><div class="row" style="justify-content:center"><button class="btn" data-a="credits">Close</button></div>`,
    'endl',
    true,
    true
  );
}
function credits() {
  open(
    `<div class="credits"><p class="cs">Starring</p><p class="cn">${T('{n}')}</p><p class="cs">Best owner in the sky</p><p class="cn">Ploy</p><p class="cs">Pet-sitter, toy delivery &amp; game maker</p><p class="cn">Top</p><p class="madeby">Made for Ploy, by Top 💛</p></div><div class="row" style="justify-content:center"><button class="btn" data-a="close">The end… for now</button></div>`,
    'credits',
    true,
    true
  );
}
