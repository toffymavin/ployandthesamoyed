/* ===== round 5: walk treasures, place activities, local friends, message in a bottle ===== */
/* treasures: two common + one rare per place */
const WF = {
  market: [
    ['ginger', 'a gingerbread cookie'],
    ['ornament', 'a shiny ornament'],
    ['goldbell', 'a tiny golden bell', 1]
  ],
  bangkok: [
    ['mooping', 'a grilled pork stick'],
    ['garland', 'a jasmine garland'],
    ['tuktuk', 'a toy tuk-tuk', 1]
  ],
  beach: [
    ['shell', 'a pretty seashell'],
    ['starfish', 'a little starfish'],
    ['pearl', 'a real pearl', 1]
  ],
  sakura: [
    ['petal', 'a perfect sakura petal'],
    ['dango', 'a dango stick'],
    ['omamori', 'a lucky charm', 1]
  ],
  paris: [
    ['croissant', 'a tiny croissant'],
    ['macaron', 'a pink macaron'],
    ['eiffel', 'a mini Eiffel Tower', 1]
  ],
  chalet: [
    ['snowball', 'a perfect snowball'],
    ['pinecone', 'a pinecone'],
    ['edelweiss', 'an edelweiss flower', 1]
  ],
  meadow: [
    ['daisy', 'a little daisy'],
    ['ladybug', 'a ladybug friend'],
    ['clover', 'a four-leaf clover', 1]
  ]
};
const WF_ALL = Object.values(WF).flat();
const wfName = w => {
  const s = w[1].replace(/^(a|an) /, '');
  return s[0].toUpperCase() + s.slice(1);
};
const WFS = () => S.wf || (S.wf = {});
function wfArt(id) {
  const O = INK,
    sw = `stroke="${O}" stroke-width="2.4" stroke-linejoin="round"`;
  return (
    {
      ginger: `<g fill="#c8803e" ${sw}><path d="M17 22h14l7 4-2 4-6-3 2 14h-6l-2-7-2 7h-6l2-14-6 3-2-4z"/><circle cx="24" cy="13" r="7.5"/></g><circle cx="21.5" cy="12" r="1.3" fill="${O}"/><circle cx="26.5" cy="12" r="1.3" fill="${O}"/><path d="M21 16q3 2 6 0" stroke="#fff" stroke-width="1.6" fill="none" stroke-linecap="round"/><circle cx="24" cy="27" r="1.6" fill="#d8344a"/><circle cx="24" cy="32" r="1.6" fill="#7fbf3a"/>`,
      ornament: `<circle cx="24" cy="7" r="2.6" fill="none" stroke="${O}" stroke-width="1.8"/><rect x="19" y="10" width="10" height="7" rx="1.5" fill="#f1c232" ${sw}/><circle cx="24" cy="29" r="13" fill="#d8344a" ${sw}/><path d="M11.5 27q12.5 6 25 0" stroke="#fff8e1" stroke-width="3" fill="none"/><circle cx="19" cy="23" r="2.4" fill="#fff" opacity=".7"/>`,
      goldbell: `<path d="M24 7v4" stroke="${O}" stroke-width="2.4"/><path d="M11 34c3-2 4-6 4-12a9 9 0 0 1 18 0c0 6 1 10 4 12z" fill="#ffd23f" ${sw}/><circle cx="24" cy="37" r="3.6" fill="#e9b400" stroke="${O}" stroke-width="2"/><path d="M14 30h20" stroke="#e9b400" stroke-width="2.4"/><path d="M19 18q2-4 5-4" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>`,
      mooping: `<g transform="rotate(-45 24 24)"><path d="M1 24h46" stroke="#b07a3e" stroke-width="3" stroke-linecap="round"/>${[11, 20, 29].map(x => `<rect x="${x}" y="17" width="8" height="14" rx="3" fill="#a0442e" stroke="${O}" stroke-width="2"/><path d="M${x + 2} 20h4" stroke="#e98f5a" stroke-width="1.6" stroke-linecap="round"/>`).join('')}</g>`,
      garland: `${Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return `<circle cx="${f(24 + Math.cos(a) * 12)}" cy="${f(19 + Math.sin(a) * 12)}" r="4" fill="#fff" stroke="${O}" stroke-width="1.6"/>`;
      }).join(
        ''
      )}<path d="M24 31v10" stroke="#d8344a" stroke-width="3"/><circle cx="24" cy="31" r="3.4" fill="#d8344a" stroke="${O}" stroke-width="1.6"/><path d="M20 42h8" stroke="#7fbf3a" stroke-width="3" stroke-linecap="round"/>`,
      tuktuk: `<path d="M11 15v8M31 15v6" stroke="${O}" stroke-width="2"/><rect x="7" y="10" width="28" height="6" rx="3" fill="#ffd23f" ${sw}/><path d="M7 33V24q0-3 3-3h22l6 6h2q2 0 2 2v4z" fill="#3aa0c8" ${sw}/><rect x="12" y="23" width="9" height="5" rx="1.5" fill="#cfeefb" stroke="${O}" stroke-width="1.4"/><circle cx="13" cy="35" r="4.5" fill="${O}"/><circle cx="35" cy="35" r="4.5" fill="${O}"/><circle cx="13" cy="35" r="1.6" fill="#fff8e1"/><circle cx="35" cy="35" r="1.6" fill="#fff8e1"/>`,
      shell: `<path d="M24 38L8 22a16 16 0 0 1 32 0z" fill="#ffc2b0" ${sw}/><path d="M24 38L14 10M24 38V7M24 38l10-28M24 38L9 17M24 38l15-21" stroke="#e98f7a" stroke-width="1.8"/><path d="M19 37h10l-2 5h-6z" fill="#ffc2b0" stroke="${O}" stroke-width="2" stroke-linejoin="round"/>`,
      starfish: `<path d="M24 5l5.5 12.5 13.5 1-10.5 8.5 4 13-12.5-7.5-12.5 7.5 4-13L5 18.5l13.5-1z" fill="#ff9a5c" ${sw}/><circle cx="24" cy="15" r="1.4" fill="#fff3d6"/><circle cx="24" cy="24" r="1.6" fill="#fff3d6"/><circle cx="17" cy="21" r="1.2" fill="#fff3d6"/><circle cx="31" cy="21" r="1.2" fill="#fff3d6"/>`,
      pearl: `<path d="M8 27Q24 3 40 27z" fill="#e4d7f5" ${sw}/><path d="M6 28h36q-4 12-18 12T6 28z" fill="#c9b6e8" ${sw}/><circle cx="24" cy="27" r="6.5" fill="#fff" stroke="${O}" stroke-width="2"/><circle cx="22" cy="25" r="2" fill="#f3eefc"/>`,
      petal: `<path d="M24 41C12 33 10 19 16 10q4 4 8 3 4 1 8-3c6 9 4 23-8 31z" fill="#ffc2d4" stroke="#b84d74" stroke-width="2.2" stroke-linejoin="round"/><path d="M24 37V20" stroke="#e8708e" stroke-width="1.6" stroke-linecap="round"/>`,
      dango: `<path d="M24 45V4" stroke="#b07a3e" stroke-width="3" stroke-linecap="round"/><circle cx="24" cy="12" r="7" fill="#ff9fb6" stroke="${O}" stroke-width="2.2"/><circle cx="24" cy="24" r="7" fill="#fff8e1" stroke="${O}" stroke-width="2.2"/><circle cx="24" cy="36" r="7" fill="#9ccc65" stroke="${O}" stroke-width="2.2"/>`,
      omamori: `<circle cx="24" cy="6" r="2.6" fill="none" stroke="#e9b400" stroke-width="1.8"/><path d="M24 8v5" stroke="#e9b400" stroke-width="2"/><path d="M14 15q10-5 20 0v23q0 4-4 4H18q-4 0-4-4z" fill="#d8344a" ${sw}/><path d="M18 15l6 4 6-4" stroke="#f1c232" stroke-width="2" fill="none"/><rect x="19" y="23" width="10" height="13" rx="1" fill="#fff8e1" stroke="#f1c232" stroke-width="1.6"/><path d="M22 27h4M22 31h4" stroke="#d8344a" stroke-width="1.6"/>`,
      croissant: `<path d="M5 31Q7 13 24 11Q41 13 43 31Q37 25 33 27Q29 20 24 21Q19 20 15 27Q11 25 5 31z" fill="#e9a640" ${sw}/><path d="M15 26q-1-5 3-8M24 20v-7M33 26q1-5-3-8" stroke="#b8743c" stroke-width="1.8" fill="none" stroke-linecap="round"/>`,
      macaron: `<path d="M8 22a16 9 0 0 1 32 0z" fill="#ff9fb6" ${sw}/><rect x="9" y="22" width="30" height="5" rx="2.5" fill="#fff8e1" stroke="${O}" stroke-width="2"/><path d="M8 27h32a16 9 0 0 1-32 0z" fill="#ff9fb6" ${sw}/><path d="M14 18q4-4 9-4" stroke="#fff" stroke-width="2" fill="none" stroke-linecap="round"/>`,
      eiffel: `<path d="M24 3L21 14h6zM20.5 14h7l2.5 10h-12zM17.5 24h13l8 20h-7q-3-8-7.5-8t-7.5 8h-7z" fill="#a8774a" stroke="${O}" stroke-width="2" stroke-linejoin="round"/><path d="M15 24h18M18.5 14h11" stroke="${O}" stroke-width="2.6" stroke-linecap="round"/>`,
      snowball: `<circle cx="24" cy="26" r="14" fill="#f4f8fb" ${sw}/><path d="M15 22a10 10 0 0 1 8-7" stroke="#fff" stroke-width="3" fill="none" stroke-linecap="round"/><circle cx="30" cy="31" r="2" fill="#cfdae4"/><circle cx="20" cy="33" r="1.5" fill="#cfdae4"/>`,
      pinecone: `<path d="M24 12V5" stroke="#5a3320" stroke-width="3" stroke-linecap="round"/><ellipse cx="24" cy="27" rx="11" ry="15" fill="#8a5530" ${sw}/><path d="M14 20q10 6 20 0M13 27q11 6 22 0M15 34q9 5 18 0M18 14q6 4 12 0" stroke="#5a3320" stroke-width="2" fill="none"/>`,
      edelweiss: `${[0, 60, 120, 180, 240, 300].map(r => `<ellipse cx="24" cy="13" rx="4.5" ry="9" fill="#fff" stroke="${O}" stroke-width="1.8" transform="rotate(${r} 24 24)"/>`).join('')}<circle cx="24" cy="24" r="5.5" fill="#ffd23f" stroke="${O}" stroke-width="1.8"/><circle cx="22.5" cy="23" r="1" fill="#c99a00"/><circle cx="25.5" cy="25" r="1" fill="#c99a00"/>`,
      daisy: `<path d="M24 44V30" stroke="#5f9a2c" stroke-width="3" stroke-linecap="round"/>${[0, 40, 80, 120, 160, 200, 240, 280, 320].map(r => `<ellipse cx="24" cy="10" rx="4" ry="8" fill="#fff" stroke="${O}" stroke-width="1.6" transform="rotate(${r} 24 20)"/>`).join('')}<circle cx="24" cy="20" r="5.5" fill="#ffd23f" stroke="${O}" stroke-width="1.8"/>`,
      ladybug: `<path d="M24 9v4M18 12l-3-4M30 12l3-4" stroke="${O}" stroke-width="2" stroke-linecap="round"/><circle cx="24" cy="15" r="6" fill="${O}"/><ellipse cx="24" cy="28" rx="14" ry="13" fill="#d8344a" ${sw}/><path d="M24 15v26" stroke="${O}" stroke-width="2"/><circle cx="17" cy="24" r="2.6" fill="${O}"/><circle cx="31" cy="24" r="2.6" fill="${O}"/><circle cx="18" cy="33" r="2.2" fill="${O}"/><circle cx="30" cy="33" r="2.2" fill="${O}"/><circle cx="21.5" cy="14" r="1.4" fill="#fff"/><circle cx="26.5" cy="14" r="1.4" fill="#fff"/>`,
      clover: `<path d="M24 26q2 10 8 17" stroke="#3f7a22" stroke-width="3" fill="none" stroke-linecap="round"/>${[0, 90, 180, 270].map(r => `<path d="M24 25C17 22 13 15 17 11c3-3 7-1 7 3 0-4 4-6 7-3 4 4 0 11-7 14z" fill="#6ab04c" stroke="${O}" stroke-width="1.8" stroke-linejoin="round" transform="rotate(${r + 45} 24 25)"/>`).join('')}<circle cx="24" cy="25" r="2" fill="#3f7a22"/>`
    }[id] || ''
  );
}
const wfSvg = (id, w, dim) =>
  `<svg viewBox="0 0 48 48" width="${w}" height="${w}" aria-hidden="true"${dim ? ' style="filter:brightness(0);opacity:.16"' : ''}>${wfArt(id)}</svg>`;

/* sparkles to dig */
let wsp = [];
function drawSpots() {
  $('#wspot').innerHTML = wsp
    .map((p, i) =>
      p.done
        ? ''
        : `<g class="wsp" data-a="spark" data-i="${i}" transform="translate(${p.x} ${p.y}) scale(1.3)"><circle r="18" fill="transparent"/><circle r="13" fill="#fff6c2" opacity=".28"/><ellipse cy="7" rx="9" ry="2.6" fill="#000" opacity=".14"/><g class="twk"><path d="M0-11L2.6-2.6L11 0L2.6 2.6L0 11L-2.6 2.6L-11 0L-2.6-2.6Z" fill="#fff6c2" stroke="#e9b400" stroke-width="1.5" stroke-linejoin="round"/></g><circle class="twk2" cx="10" cy="-9" r="2" fill="#fff6c2" stroke="#e9b400" stroke-width="1"/><circle class="twk2" cx="-9" cy="-6" r="1.4" fill="#fff6c2" style="animation-delay:-.7s"/></g>`
    )
    .join('');
}
function makeSpots() {
  let xs = [];
  for (let t = 0; t < 40 && xs.length < 3; t++) {
    const C = [42, 92, 140, 224, 272, 318].sort(() => Math.random() - 0.5);
    xs = [];
    for (const x of C) {
      if (xs.length < 3 && xs.every(v => Math.abs(v - x) > 60)) xs.push(x);
    }
  }
  wsp = xs.map(x => ({ x: Math.round(x + rnd(-6, 6)), y: Math.round(rnd(250, 262)), done: false }));
  drawSpots();
}
const NOTHING = {
  beach: ['Just sand. Lots and lots of sand.', 'Hmm… only a very old flip-flop. Next one!'],
  chalet: ['Just more snow! Not complaining.'],
  sakura: ['Only a worm. Hello, worm!'],
  bangkok: ['Just a bottle cap. Next one!'],
  paris: ['Only a pigeon feather. Très chic, but no.'],
  market: ['Just pine needles. Smells nice though.'],
  meadow: ['Only a sleepy bee. Sorry, bee!']
};
function walkKeep() {
  if (!walk) return;
  clearTimeout(walkT);
  walkT = setTimeout(() => {
    if (PLACES[scene]) {
      say("That was fun! Let's go home.", 3000);
      setTimeout(goHome, 2500);
    }
  }, 150000);
}
function digSpark(i) {
  const p = wsp[i];
  if (!p || p.done || !walk || walk.busy || blockedAsleep()) return;
  walk.busy = true;
  walkKeep();
  setTimeout(() => {
    if (walk) walk.busy = false;
  }, 9000);
  const d = p.x >= dogX ? 1 : -1,
    stand = Math.max(30, Math.min(330, p.x - d * 44 * dims.s));
  const dig = () => {
    dir = d;
    place();
    stopWalk(3200);
    anim('paw', 1800);
    sfx('fur');
    setTimeout(() => sfx('fur'), 400);
    setTimeout(() => sfx('fur'), 800);
    for (let k = 0; k < 6; k++)
      setTimeout(
        () =>
          fxAt(
            `<svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5" fill="${scene === 'chalet' || scene === 'market' ? '#eef3f7' : '#c9a46a'}" opacity=".85"/></svg>`,
            p.x / 3.6 + rnd(-3, 3),
            (p.y - 6) / 3,
            'bub',
            1200,
            rnd(-30, 30)
          ),
        k * 150
      );
    setTimeout(() => {
      p.done = true;
      drawSpots();
      if (!walk) return; // went home before the dig finished
      walk.busy = false;
      digResult(p);
    }, 1500);
  };
  if (Math.abs(dogX - stand) < 6 && dogZ < 0.05) dig();
  else runTo(stand, dogX, dig, true);
}
function digResult(p) {
  const L = WF[scene];
  if (!L) {
    return;
  }
  const left = wsp.filter(x => !x.done).length;
  walk.dug = (walk.dug || 0) + 1;
  if (!walk.got && left > 0 && Math.random() < 0.22) {
    sfx('no');
    say(pick(NOTHING[scene] || ['Hmm… nothing here. Next one!']), 3200);
    return;
  }
  walk.got = (walk.got || 0) + 1;
  const own = WFS(),
    rare = Math.random() < (own[L[2][0]] ? 0.1 : 0.16),
    w = rare ? L[2] : pick(L.slice(0, 2)),
    first = !own[w[0]];
  own[w[0]] = (own[w[0]] || 0) + 1;
  S.fur += rare ? 6 : 2;
  sfx('coin');
  hearts(rare ? 5 : 2);
  joy(1400);
  fxAt(wfSvg(w[0], 46), p.x / 3.6, (p.y - 34) / 3, 'pop', 1500);
  say(
    rare ? `Ploy!! Look what I found… ${w[1]}! I've never seen one before!` : `Look, Ploy! I found ${w[1]}!`,
    4200
  );
  if (first) {
    const n = WF_ALL.filter(x => own[x[0]]).length;
    setTimeout(
      () =>
        toast(`${rare ? 'Rare find! ' : 'New treasure: '}${wfName(w)} · ${n}/${WF_ALL.length} in the album`),
      900
    );
    gain(rare ? 8 : 3);
  }
  render();
  save();
}

/* one special thing to do at each place */
const WACT = {
  beach: {
    l: 'Dig a hole',
    go: () => {
      const x = dogX < 180 ? 250 : 110;
      runTo(
        x,
        dogX,
        () => {
          stopWalk(4500);
          anim('paw', 1800);
          setTimeout(() => anim('paw', 1800), 1800);
          for (let k = 0; k < 12; k++)
            setTimeout(() => {
              sfx('fur');
              fxAt(
                `<svg width="14" height="14" viewBox="0 0 14 14"><circle cx="7" cy="7" r="5" fill="#c9a46a"/></svg>`,
                dogPX() + rnd(-6, 6),
                mouthY() + 6,
                'bub',
                1200,
                rnd(-40, 40)
              );
            }, k * 280);
          setTimeout(() => {
            walk && (walk.dirt = (walk.dirt || 0) + 8);
            S.st.happy = clamp(S.st.happy + 12);
            S.st.clean = clamp(S.st.clean - 6, 5);
            drawDog(true);
            if (Math.random() < 0.45) {
              const w = pick(WF.beach.slice(0, 2)),
                own = WFS(),
                first = !own[w[0]];
              own[w[0]] = (own[w[0]] || 0) + 1;
              S.fur += 2;
              sfx('coin');
              fxAt(wfSvg(w[0], 46), dogPX(), headY() - 6, 'pop', 1500);
              say(`I dug so deep I found ${w[1]}!`, 4000);
              if (first) toast(`New treasure: ${wfName(w)}`);
            } else
              say(
                pick([
                  'I dug all the way to… more sand.',
                  'Biggest hole on the whole beach! Do you like it?'
                ]),
                4000
              );
            hearts(3);
            render();
            save();
          }, 3700);
        },
        true
      );
    }
  },
  sakura: { l: 'Catch petals', go: petalGame },
  chalet: {
    l: 'Roll in the snow',
    go: () => {
      stopWalk(4000);
      anim('shake', 1600);
      sfx('fur');
      for (let k = 0; k < 10; k++)
        setTimeout(
          () =>
            fxAt(
              `<svg width="16" height="16" viewBox="0 0 16 16"><circle cx="8" cy="8" r="6" fill="#fff"/></svg>`,
              dogPX() + rnd(-10, 10),
              mouthY() + rnd(0, 10),
              'bub',
              1400,
              rnd(-50, 50)
            ),
          k * 120
        );
      setTimeout(() => {
        walk && ((walk.dirt = (walk.dirt || 0) + 6), (walk.tangle = (walk.tangle || 0) + 12));
        S.st.happy = clamp(S.st.happy + 14);
        S.mess = clamp((S.mess || 0) + 8);
        drawDog(true);
        hearts(3);
        joy(1500);
        say(
          pick(['Snow bath! Wait… is that the opposite of a bath?', 'I am now 50% snow. Best day ever.']),
          4200
        );
        render();
        save();
      }, 1700);
    }
  },
  bangkok: {
    l: 'Beg for snacks',
    go: () => {
      stopWalk(9000);
      anim('sit', 1800);
      say('*puppy eyes* The grilled pork smells SO good, Ploy…', 3000);
      setTimeout(
        () =>
          open(
            `<div class="gicons">${wfSvg('mooping', 84)}</div><h2 style="text-align:center">Share a grilled pork stick?</h2><p style="text-align:center">${T('{n}')} is sitting extra nicely and doing the sad eyes.</p><div class="row" style="justify-content:center"><button class="btn ghost" data-a="wbeg" data-y="">Not today</button><button class="btn" data-a="wbeg" data-y="1">Just one</button></div>`,
            'wbeg',
            true
          ),
        1600
      );
    }
  },
  paris: {
    l: 'Order a pup-cup',
    go: () => {
      stopWalk(4000);
      anim('chomp', 1000);
      sfx('chomp');
      setTimeout(() => sfx('chomp'), 500);
      S.st.hunger = clamp(S.st.hunger + 8);
      S.st.happy = clamp(S.st.happy + 10);
      hearts(3);
      fxAt(
        `<svg width="40" height="40" viewBox="0 0 48 48"><path d="M14 20h20l-3 20H17z" fill="#fff8e1" stroke="${INK}" stroke-width="2.4" stroke-linejoin="round"/><path d="M12 20q2-10 12-10t12 10z" fill="#fff" stroke="${INK}" stroke-width="2.4"/><circle cx="24" cy="9" r="3" fill="#d8344a" stroke="${INK}" stroke-width="1.6"/></svg>`,
        dogPX(),
        headY() - 6,
        'pop',
        1500
      );
      setTimeout(
        () =>
          say(
            pick([
              'Whipped cream! Do I have a mustache now? Be honest.',
              'Merci, Ploy! That was très délicieux.'
            ]),
            4200
          ),
        900
      );
      render();
      save();
    }
  },
  market: {
    l: 'Sniff the stalls',
    go: () => {
      const a = dogX < 180 ? 290 : 70,
        b = dogX < 180 ? 80 : 290;
      runTo(
        a,
        dogX,
        () => {
          stopWalk(1600);
          anim('huh', 1000);
          say('Cinnamon… sugar… is that sausage?', 2600);
          setTimeout(
            () =>
              runTo(
                b,
                dogX,
                () => {
                  stopWalk(3000);
                  anim('sit', 1800);
                  S.snacks = (S.snacks || 0) + 1;
                  S.st.happy = clamp(S.st.happy + 8);
                  sfx('coin');
                  hearts(3);
                  fxAt(sz('treat', 40), dogPX(), headY() - 6, 'pop', 1500);
                  say('The cookie lady gave me a treat for later! It’s in your Feed menu.', 4500);
                  render();
                  save();
                },
                true
              ),
            2000
          );
        },
        true
      );
    }
  },
  meadow: {
    l: 'Chase butterflies',
    go: () => {
      const bf = c =>
        `<svg width="26" height="22" viewBox="-13 -11 26 22"><ellipse cx="-5" cy="-2" rx="5.5" ry="7" fill="${c}" stroke="${INK}" stroke-width="1.4" transform="rotate(-25 -5 -2)"/><ellipse cx="5" cy="-2" rx="5.5" ry="7" fill="${c}" stroke="${INK}" stroke-width="1.4" transform="rotate(25 5 -2)"/><path d="M0-6v10" stroke="${INK}" stroke-width="2" stroke-linecap="round"/></svg>`;
      for (let k = 0; k < 6; k++)
        setTimeout(
          () =>
            fxAt(
              bf(pick(['#ff8fa3', '#ffd23f', '#c3a6ff', '#7cc4ee'])),
              rnd(15, 85),
              rnd(55, 75),
              'bub',
              1700,
              rnd(-60, 60)
            ),
          k * 450
        );
      say('Butterflies!! Come back, I just want to be friends!', 3000);
      runTo(
        300,
        dogX,
        () =>
          runTo(
            60,
            dogX,
            () =>
              runTo(
                180,
                dogX,
                () => {
                  stopWalk(3500);
                  anim('jump', 900);
                  S.st.happy = clamp(S.st.happy + 14);
                  S.st.energy = clamp(S.st.energy - 5, 5);
                  hearts(4);
                  joy(1500);
                  say(
                    pick(['I almost caught one! Almost.', 'One landed on my nose! Did you see, Ploy?!']),
                    4200
                  );
                  render();
                  save();
                },
                true
              ),
            true
          ),
        true
      );
    }
  }
};
function drawWact() {
  const b = $('#wact'),
    a = walk && !walk.act && WACT[scene];
  b.classList.toggle('on', !!a);
  if (a) b.textContent = a.l;
}
function doWact() {
  const a = WACT[scene];
  if (!a || !walk || walk.act || walk.busy || blockedAsleep()) return;
  walk.act = true;
  drawWact();
  walkKeep();
  a.go();
}
function wbeg(yes) {
  locked = false;
  close();
  if (yes) {
    anim('chomp', 1000);
    sfx('chomp');
    setTimeout(() => sfx('chomp'), 500);
    S.st.hunger = clamp(S.st.hunger + 15);
    S.st.happy = clamp(S.st.happy + 10);
    S.st.clean = clamp(S.st.clean - 4, 5);
    hearts(4);
    joy(1500);
    say(
      pick(['Best. Pork stick. EVER. Thank you, Ploy!', "Mmm! There's sauce on my nose, isn't there?"]),
      4200
    );
  } else {
    gain(2);
    say(
      pick(["Okay… I'm a good boy. A very, very good boy.", "Fine. But I'll remember this smell forever."]),
      4200
    );
  }
  drawDog(true);
  render();
  save();
}

/* sakura: tap the falling petals */
let PG = null;
function petalGame() {
  stopWalk(9000);
  PG = { n: 0, left: 9, id: 0 };
  say('Help me catch the petals, Ploy! Tap them!', 3000);
  const spawn = () => {
    if (!PG || scene !== 'sakura') return;
    if (PG.left-- <= 0) {
      setTimeout(petalEnd, 3400);
      return;
    }
    const e = document.createElement('span');
    e.className = 'petal';
    e.dataset.a = 'petal';
    e.dataset.id = ++PG.id;
    e.style.left = rnd(12, 88) + '%';
    e.style.setProperty('--dx', rnd(-40, 40) + 'px');
    e.style.animationDuration = rnd(3, 4) + 's';
    e.innerHTML = `<svg viewBox="0 0 48 48" width="22" height="22">${wfArt('petal')}</svg>`;
    $('#fx').appendChild(e);
    setTimeout(() => e.remove(), 4200);
    setTimeout(spawn, rnd(450, 700));
  };
  spawn();
}
function catchPetal(id) {
  const e = $(`.petal[data-id="${id}"]`);
  if (!e || !PG) return;
  e.remove();
  PG.n++;
  stopWalk(4000);
  sfx('chomp');
  anim('jump', 900);
  if (PG.n % 3 === 0) hearts(1);
}
function petalEnd() {
  if (!PG) return;
  const n = PG.n;
  PG = null;
  if (scene !== 'sakura') return;
  S.st.happy = clamp(S.st.happy + Math.min(20, 4 + n * 2));
  walk && (walk.tangle = (walk.tangle || 0) + 4);
  if (n >= 5) {
    const own = WFS(),
      first = !own.petal;
    own.petal = (own.petal || 0) + 1;
    if (first) toast('New treasure: Perfect sakura petal');
  }
  say(
    n
      ? `We caught ${n} petal${n > 1 ? 's' : ''}!${n >= 5 ? " I'm keeping the prettiest one for the album." : ' …I may have eaten one.'}`
      : 'They were too fast! Next time, Ploy.',
    4500
  );
  hearts(Math.min(5, n));
  render();
  save();
}

/* local friends who live at each place */
const LOCALS = [
  {
    b: 'crab',
    name: 'Pinchy',
    breed: 'Beach Crab',
    at: 'beach',
    sz: 0.75,
    hi: [
      'Ploy, meet Pinchy! He walks sideways. Is that allowed?',
      'Pinchy says hi! Very carefully. With his claws.'
    ]
  },
  {
    b: 'cat',
    name: 'Mimi',
    breed: 'Parisian Cat',
    at: 'paris',
    sz: 0.85,
    hi: ['Bonjour, Mimi! She only speaks French, Ploy.', 'Mimi is judging my croissant crumbs.']
  },
  {
    b: 'samo',
    name: 'Yuki',
    breed: 'Samoyed',
    at: 'chalet',
    hi: [
      'Ploy!! Another Samoyed! We are the same cloud!',
      'Yuki lives up here. She says the snow is extra fluffy today.'
    ]
  },
  {
    b: 'tabby',
    name: 'Moo Ping',
    breed: 'Street Cat',
    at: 'bangkok',
    sz: 0.85,
    hi: ['This is Moo Ping, boss of all the food stalls.', 'Moo Ping wants my snacks. Absolutely not.']
  },
  {
    b: 'shiba',
    name: 'Hana',
    breed: 'Shiba',
    at: 'sakura',
    hi: ['Hana comes here every spring for the petals!', 'Hana says the sakura looks best with Ploy here.']
  },
  {
    b: 'pom',
    name: 'Noel',
    breed: 'Pomeranian',
    at: 'market',
    sz: 0.68,
    hi: ['Noel is wearing a scarf too! We match!', 'Noel says the gingerbread stall is the best one.']
  },
  {
    b: 'bunny',
    name: 'Mochi',
    breed: 'Meadow Bunny',
    at: 'meadow',
    sz: 0.8,
    hi: [
      'Ploy, look! Mochi the bunny! She hops SO high.',
      'Mochi is eating all the clover. Save some for me!'
    ]
  }
];
function startLocal(d) {
  const fromRight = dogX < 180,
    tx = Math.max(80, Math.min(290, dogX + (fromRight ? 110 : -110)));
  fr = { d, x: fromRight ? 410 : -50, tx, dir: fromRight ? -1 : 1, state: 'in', until: 0 };
  if (dogZ > 0.1) runTo(dogX, dogX, null, false);
  $('#friend').innerHTML = `<g id="frB">${friendSVG(d.b)}</g>`;
}
function catSVG(b) {
  const k = b === 'cat',
    c = k ? '#55555f' : '#f0a040',
    d = k ? '#3e3e47' : '#d88828',
    w = k ? '#fff' : '#ffe9c8',
    col = k ? '#d8344a' : '#3aa0c8',
    by = -22,
    hx = 24,
    hy = by - 14;
  const lg = (x, cl) =>
    `<g class="fl ${cl}"><rect x="${x - 4}" y="${by + 2}" width="8" height="${-by - 2}" rx="4" fill="${d}" stroke="${OL}" stroke-width="2"/></g>`;
  let s = lg(-14, 'fa') + lg(12, 'fb');
  s += `<path d="M-22 ${by}q-14-4-11-24q1-5 5-3" fill="none" stroke="${OL}" stroke-width="8" stroke-linecap="round"/><path d="M-22 ${by}q-14-4-11-24q1-5 5-3" fill="none" stroke="${c}" stroke-width="4" stroke-linecap="round"/>`;
  s += `<ellipse cx="0" cy="${by}" rx="25" ry="12" fill="${c}" stroke="${OL}" stroke-width="2.4"/><ellipse cx="6" cy="${by + 6}" rx="14" ry="4.5" fill="${w}"/>`;
  if (!k)
    s += `<path d="M-14 ${by - 10}v7M-6 ${by - 12}v8M2 ${by - 12}v7" stroke="${d}" stroke-width="3" stroke-linecap="round"/>`;
  s += lg(-6, 'fb') + lg(6, 'fa');
  s += `<path d="M${hx - 12} ${hy - 5}L${hx - 10} ${hy - 21}L${hx - 2} ${hy - 11}ZM${hx + 2} ${hy - 11}L${hx + 10} ${hy - 21}L${hx + 12} ${hy - 5}Z" fill="${c}" stroke="${OL}" stroke-width="2" stroke-linejoin="round"/><path d="M${hx - 9} ${hy - 9}L${hx - 9} ${hy - 16}L${hx - 4} ${hy - 11}ZM${hx + 4} ${hy - 11}L${hx + 9} ${hy - 16}L${hx + 9} ${hy - 9}Z" fill="#f6b5ad"/>`;
  s += `<rect x="${hx - 12}" y="${hy + 9}" width="13" height="5" rx="2.5" fill="${col}" stroke="${OL}" stroke-width="1.5"/>`;
  s += `<circle cx="${hx}" cy="${hy}" r="13" fill="${c}" stroke="${OL}" stroke-width="2.4"/><ellipse cx="${hx + 5}" cy="${hy + 5}" rx="7" ry="5" fill="${w}"/><circle cx="${hx + 1}" cy="${hy - 2}" r="2.2" fill="${OL}"/><circle cx="${hx + 8}" cy="${hy - 2}" r="2.2" fill="${OL}"/><path d="M${hx + 3.5} ${hy + 2}h3l-1.5 2z" fill="#e8708e"/><path d="M${hx + 12} ${hy + 3}h7M${hx + 12} ${hy + 6}l6 2" stroke="${OL}" stroke-width="1" stroke-linecap="round"/>`;
  return s;
}
function bunnySVG() {
  const c = '#f3ece6',
    d = '#d9cfc6';
  let s = '';
  s += `<g class="fl fa"><ellipse cx="-12" cy="-4" rx="9" ry="4.5" fill="${d}" stroke="${OL}" stroke-width="2"/></g><g class="fl fb"><ellipse cx="10" cy="-4" rx="6" ry="4" fill="${d}" stroke="${OL}" stroke-width="2"/></g>`;
  s += `<circle cx="-20" cy="-18" r="6" fill="#fff" stroke="${OL}" stroke-width="2"/><ellipse cx="-2" cy="-16" rx="19" ry="14" fill="${c}" stroke="${OL}" stroke-width="2.4"/>`;
  s += `<g transform="rotate(-12 16 -34)"><ellipse cx="12" cy="-48" rx="5" ry="14" fill="${c}" stroke="${OL}" stroke-width="2.2"/><ellipse cx="12" cy="-47" rx="2.4" ry="9" fill="#f6b5ad"/></g><g transform="rotate(14 20 -34)"><ellipse cx="22" cy="-48" rx="5" ry="14" fill="${c}" stroke="${OL}" stroke-width="2.2"/><ellipse cx="22" cy="-47" rx="2.4" ry="9" fill="#f6b5ad"/></g>`;
  s += `<circle cx="16" cy="-28" r="12" fill="${c}" stroke="${OL}" stroke-width="2.4"/><circle cx="20" cy="-31" r="2.2" fill="${OL}"/><path d="M26.5 -27.5l2 1.5-2 1.5z" fill="#e8708e"/><circle cx="18" cy="-24" r="2.4" fill="#ffb3c1" opacity=".7"/>`;
  return s;
}
function crabSVG() {
  const c = '#e8553e',
    d = '#b83a28';
  let s = '';
  s += `<g stroke="${OL}" stroke-width="3" stroke-linecap="round" fill="none"><g class="fl fa"><path d="M-12-10l-9 6v6M-8-8l-6 6v4"/></g><g class="fl fb"><path d="M12-10l9 6v6M8-8l6 6v4"/></g></g>`;
  s += `<g fill="${c}" stroke="${OL}" stroke-width="2" stroke-linejoin="round"><path d="M-16-18q-10-2-12-10l6-2q-2 5 4 6z"/><path d="M-27-28l-4-6 7 0z"/><path d="M16-18q10-2 12-10l-6-2q2 5-4 6z"/><path d="M27-28l4-6-7 0z"/></g>`;
  s += `<path d="M-6-24v-8M6-24v-8" stroke="${OL}" stroke-width="2.4"/><circle cx="-6" cy="-33" r="3.6" fill="#fff" stroke="${OL}" stroke-width="1.8"/><circle cx="6" cy="-33" r="3.6" fill="#fff" stroke="${OL}" stroke-width="1.8"/><circle cx="-5" cy="-33" r="1.6" fill="${OL}"/><circle cx="7" cy="-33" r="1.6" fill="${OL}"/>`;
  s += `<ellipse cx="0" cy="-16" rx="17" ry="11" fill="${c}" stroke="${OL}" stroke-width="2.4"/><path d="M-10-20q3-3 6-2" stroke="#ff9a85" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M-4-13q4 3 8 0" stroke="${OL}" stroke-width="1.8" fill="none" stroke-linecap="round"/><circle cx="-10" cy="-13" r="2" fill="${d}" opacity=".5"/><circle cx="10" cy="-13" r="2" fill="${d}" opacity=".5"/>`;
  return s;
}

/* message in a bottle (beach). Add your own to messages.json with "bottle": true */
const BOTTLE = [
  { id: 'd1', text: 'If this bottle found you, the ocean has very good taste.' },
  {
    id: 'd2',
    text: "Whatever sea you're flying over today, I hope the view is pretty and the passengers are nice."
  },
  { id: 'd3', text: '{n} made me write this. Okay, fine. I wanted to.' },
  { id: 'd4', text: "Hope you're drinking enough water up there. And eating. Som tam counts." }
];
let BTJ = [];
const BTS = () => S.bt || (S.bt = { read: [], day: '' });
const btPool = () => [...BTJ, ...BOTTLE];
const btUnread = () => btPool().filter(m => !BTS().read.includes(m.id));
let bottleAt = null;
function maybeBottle() {
  if (scene !== 'beach') return;
  const u = btUnread(),
    ch = u.length ? 0.8 : 0.15;
  if (Math.random() >= ch) return;
  bottleAt = [Math.round(rnd(250, 318)), 246];
  $('#bottle').innerHTML =
    `<g data-a="bottle" transform="translate(${bottleAt[0]} ${bottleAt[1]})"><g class="notebob"><circle r="22" fill="transparent"/>${bottleArt()}</g></g>`;
  setTimeout(
    () => {
      if (scene === 'beach' && bottleAt && !S.sleep)
        say('Ploy, what is that shiny thing by the water?', 3500);
    },
    rnd(5000, 9000)
  );
}
const bottleArt = () =>
  `<ellipse cy="9" rx="16" ry="3" fill="#000" opacity=".12"/><g transform="rotate(-18)"><path d="M-16-7h17q4 0 7 3h6v8h-6q-3 3-7 3h-17q-4 0-4-4v-6q0-4 4-4z" fill="#9fd8c4" fill-opacity=".9" stroke="${INK}" stroke-width="2" stroke-linejoin="round"/><rect x="-12" y="-3.6" width="17" height="7.2" rx="3.6" fill="#fff8e1" stroke="#c9b88a" stroke-width="1.2"/><path d="M-4-3.6v7.2" stroke="#d8344a" stroke-width="1.6"/><rect x="14" y="-4" width="5" height="8" rx="1.5" fill="#b8743c" stroke="${INK}" stroke-width="1.6"/><path d="M-14-4h14" stroke="#fff" stroke-width="1.6" stroke-linecap="round" opacity=".8"/></g>`;
function getBottle() {
  if (!bottleAt || !walk || walk.busy || blockedAsleep()) return;
  walk.busy = true;
  walkKeep();
  setTimeout(() => {
    if (walk) walk.busy = false;
  }, 9000);
  const [x] = bottleAt,
    d = x >= dogX ? 1 : -1,
    stand = Math.max(30, Math.min(330, x - d * 40 * dims.s));
  runTo(
    stand,
    dogX,
    () => {
      dir = d;
      place();
      stopWalk(4000);
      anim('chomp', 1000);
      sfx('squeak');
      bottleAt = null;
      $('#bottle').innerHTML = '';
      hearts(3);
      say("Ploy! A message in a bottle! I think it's for you!", 3500);
      setTimeout(() => {
        walk && (walk.busy = false);
        const u = btUnread(),
          m = u.length ? u[0] : pick(btPool());
        readBottle(m.id);
      }, 1700);
    },
    true
  );
}
function readBottle(id) {
  const m = btPool().find(x => x.id === id);
  if (!m) return;
  const R = BTS().read,
    first = !R.includes(id);
  if (first) {
    R.push(id);
    gain(3);
  }
  BTS().day = ymd();
  sfx('letter');
  save();
  locked = false;
  open(
    `<div class="gicons"><svg viewBox="-26 -18 52 36" style="width:110px;height:76px" aria-hidden="true">${bottleArt()}</svg></div><h2 style="text-align:center">Message in a bottle</h2><div class="hand">${esc(T(String(m.text))).replace(/\n/g, '<br>')}<br><span>— ${esc(m.from || 'Top')}</span></div><div class="row" style="justify-content:center"><button class="btn ghost" data-a="letters">All letters</button><button class="btn" data-a="close">Keep it</button></div>`,
    'bottle',
    true
  );
}
function btListHTML() {
  const r = btPool().filter(m => BTS().read.includes(m.id));
  if (!r.length) return '';
  return `<p style="font:600 15px Fredoka,sans-serif;margin:16px 0 8px">Bottles from the beach</p><div class="list">${r.map(m => `<div class="env"><svg viewBox="-26 -18 52 36" style="width:44px;height:44px" aria-hidden="true">${bottleArt()}</svg><div><b>Message in a bottle</b><small>${esc(T(String(m.text)).slice(0, 38))}…</small></div><button class="btn sm" data-a="btread" data-id="${esc(m.id)}">Open</button></div>`).join('')}</div>`;
}

/* treasures in the album */
function treasureHTML() {
  const own = WFS(),
    n = WF_ALL.filter(x => own[x[0]]).length;
  return `<p style="font:600 17px Fredoka,sans-serif;margin:22px 0 2px">Walk treasures · ${n}/${WF_ALL.length}</p><p class="sub">Tap the sparkles on walks and ${T('{n}')} will dig them up. Each place hides one rare one.</p>${Object.keys(
    WF
  )
    .map(
      p =>
        `<p style="font:600 14px Fredoka,sans-serif;margin:12px 0 6px;color:var(--soft)">${PLACES[p].name}</p><div class="tbox">${WF[
          p
        ]
          .map(w => {
            const c = own[w[0]];
            return `<div class="item" style="min-height:0;padding:10px 6px;cursor:default">${w[2] ? '<span class="tag">Rare</span>' : ''}${wfSvg(w[0], 40, !c)}<small>${c ? wfName(w) + (c > 1 ? ' ×' + c : '') : '???'}</small></div>`;
          })
          .join('')}</div>`
    )
    .join('')}`;
}

/* hooks: arriving, leaving, coming home */
function walkScene(id) {
  const on = !!PLACES[id];
  $('.screen').classList.toggle('onwalk', on);
  wsp = [];
  drawSpots();
  bottleAt = null;
  $('#bottle').innerHTML = '';
  PG = null;
  document.querySelectorAll('.petal').forEach(e => e.remove());
  if (fr && fr.d.at) {
    fr = null;
    $('#friend').innerHTML = '';
  }
  drawWact();
}
function walkArrive(id) {
  if (scene !== id) return;
  makeSpots();
  drawWact();
  maybeBottle();
  const L = LOCALS.find(d => d.at === id);
  if (L && Math.random() < 0.75)
    setTimeout(
      () => {
        if (scene === id && !fr && !S.sleep && !paneKind && !CG) startLocal(L);
      },
      rnd(6000, 11000)
    );
}
const HOMELINE = {
  beach: 'I brought half the beach home with me… bath, Ploy?',
  chalet: 'My fur is all frosty and tangled. Brush me?',
  sakura: 'There are still petals stuck in my fur.',
  bangkok: 'I smell like grilled pork now. Not sorry.',
  paris: 'Home sweet home. Paris was très bien.',
  market: 'I still smell like cinnamon!',
  meadow: 'I smell like flowers now. Very fancy.'
};
function walkEffects(was, w) {
  if (!w) return;
  const s = S.st,
    mins = (Date.now() - (w.t || Date.now())) / 6e4;
  s.energy = clamp(s.energy - Math.min(12, 2 + mins * 3), 5);
  const base = { beach: 10, chalet: 6, bangkok: 4, sakura: 2, market: 3, paris: 2, meadow: 3 }[was] || 3;
  s.clean = clamp(s.clean - base - (w.dirt || 0), 5);
  S.mess = clamp((S.mess || 0) + (was === 'chalet' ? 8 : was === 'sakura' ? 4 : 2) + (w.tangle || 0));
  return s.energy < 25
    ? 'Best walk ever… *yawn* nap time?'
    : HOMELINE[was] || pick(['Home sweet home.', 'That was the best walk ever!']);
}
