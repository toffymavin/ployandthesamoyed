/* --- tricks --- */
function trickPane() {
  open(
    `<h2>Tricks</h2><p class="sub">Practice once a day. Each trick takes a few days to learn.</p><div class="list">${TRICKS.map(
      (t, i) => {
        const n = trickN(t.id),
          ok = n >= t.days,
          avail = i === 0 || learned(TRICKS[i - 1]),
          done = (S.tr[t.id] || {}).last === today();
        return `<div class="q"><div><b>${t.name}</b><div class="dots">${Array.from({ length: t.days }, (_, k) => `<i class="${k < n ? 'on' : ''}"></i>`).join('')}</div><small>${!avail ? 'Learn ' + TRICKS[i - 1].name.toLowerCase() + ' first' : ok ? 'Learned!' : done ? 'Practiced today. Come back tomorrow' : `Day ${n + 1} of ${t.days}`}</small></div>${!avail ? '' : ok ? `<button class="btn sm" data-a="trick" data-id="${t.id}">Do it!</button>` : `<button class="btn sm" data-a="trick" data-id="${t.id}">Practice</button>`}</div>`;
      }
    ).join('')}</div><div class="row"><button class="btn ghost" data-a="close">Close</button></div>`,
    'tricks'
  );
}
function doTrick(id) {
  const t = TRICKS.find(x => x.id === id);
  if (!t || blockedAsleep()) return;
  close();
  stopWalk(4000);
  const was = learned(t),
    r = S.tr[id] || (S.tr[id] = { n: 0, last: '' });
  let ok = was;
  if (!was && r.last !== today()) {
    r.n++;
    r.last = today();
    gain(5);
    if (r.n >= t.days) {
      ok = true;
      setTimeout(() => {
        toast(`${T('{n}')} learned ${t.name}!`);
        sfx('level');
      }, 1900);
      gain(20);
    }
  }
  if (ok) {
    dir = 1;
    if (id === 'sit') anim('sit', 1800);
    if (id === 'paw') anim('paw', 1800);
    if (id === 'smile') {
      joy(3000);
      for (let i = 0; i < 6; i++)
        setTimeout(
          () =>
            fxAt(sz('star', 18), dogPX() + rnd(-14, 14), headY() + rnd(-6, 8), 'heart', 1200, rnd(-20, 20)),
          i * 150
        );
    }
    if (id === 'spin') {
      let k = 0;
      const iv = setInterval(() => {
        dir = -dir;
        place();
        if (++k >= 8) {
          clearInterval(iv);
          dir = 1;
          anim('jump', 900);
        }
      }, 110);
    }
    sfx('yip');
    hearts(2);
    S.st.happy = clamp(S.st.happy + 5);
    prog('play');
    setTimeout(() => say(t.ok), 300);
  } else {
    anim('huh', 1000);
    say(
      pick([
        'Hmm? Like this?',
        'Almost! Again tomorrow?',
        'I think I got it… maybe?',
        'My paws are confused. One more day!'
      ])
    );
  }
  render();
  save();
}

/* --- brushing --- */
let br = null,
  noClick = false;
function scenePt(e) {
  const sv = $('#scene'),
    p = sv.createSVGPoint();
  p.x = e.clientX;
  p.y = e.clientY;
  return p.matrixTransform(sv.getScreenCTM().inverse());
}
function brushStroke(e) {
  if (S.sleep) return;
  S.strokes = (S.strokes || 0) + 1;
  const wasM = S.mess || 0;
  S.mess = clamp(wasM - 5);
  if (wasM >= 25 && S.mess < 25)
    setTimeout(() => {
      say(pick(['So smooth and fluffy now! Thank you, Ploy!', 'No more tangles! I feel like a cloud.']));
      hearts(3);
    }, 200);
  drawDog();
  S.fluff = clamp((S.fluff || 0) + 2);
  S.st.happy = clamp(S.st.happy + 1);
  S.st.clean = clamp(S.st.clean + 0.5);
  sfx('brush');
  place();
  const p = scenePt(e);
  if (S.strokes % 4 === 0) {
    fxAt(sz('tuft', 22), p.x / 3.6, p.y / 3, 'drop', 700);
    setTimeout(() => spawnFurAt(p.x), 650);
  }
  if (S.strokes % 10 === 0) {
    if (S.bx.day !== today()) S.bx = { day: today(), n: 0 };
    if (S.bx.n < 10) {
      S.bx.n++;
      gain(1);
    }
  }
  if (S.strokes % 12 === 0 && (S.mess || 0) >= 25)
    say(pick(['Ouch… tangles… keep going!', 'Almost untangled!', 'My fur is getting better!']));
  else if (S.strokes % 12 === 0)
    say(pick(['Ahh, right there.', 'Fluffier… fluffier…', 'Look at all that fluff!', 'Am I a cloud now?']));
  render();
}
function spawnFurAt(x) {
  if (tufts.length >= 8) tufts.shift();
  tufts.push({ id: ++tid, x: Math.max(20, Math.min(340, x + rnd(-14, 14))), y: rnd(250, 288) });
  drawFur();
}
function brushInit() {
  const sv = $('#scene');
  sv.addEventListener('pointerdown', e => {
    if (!e.target.closest('#dogW')) return;
    br = { x: e.clientX, y: e.clientY, d: 0, m: false, acc: 0 };
  });
  window.addEventListener('pointermove', e => {
    if (!br) return;
    const dx = e.clientX - br.x,
      dy = e.clientY - br.y,
      d = Math.hypot(dx, dy);
    br.x = e.clientX;
    br.y = e.clientY;
    br.d += d;
    if (!br.m && br.d > 14) {
      if (S.sleep) {
        br = null;
        return blockedAsleep();
      }
      br.m = true;
      stopWalk(5000);
      $('#brushc').classList.add('on');
    }
    if (br.m) {
      stopWalk(3000);
      br.acc += d;
      const r = $('.screen').getBoundingClientRect(),
        c = $('#brushc');
      c.style.left = e.clientX - r.left + 'px';
      c.style.top = e.clientY - r.top + 'px';
      if (br.acc > 40) {
        br.acc = 0;
        brushStroke(e);
      }
    }
  });
  const end = () => {
    if (br && br.m) {
      noClick = true;
      setTimeout(() => (noClick = false), 350);
      $('#brushc').classList.remove('on');
      save();
    }
    br = null;
  };
  window.addEventListener('pointerup', end);
  window.addEventListener('pointercancel', end);
}
