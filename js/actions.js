/* actions */
const blockedAsleep = () => {
  if (S.sleep) {
    sfx('no');
    say(pick(['Zzz… (soft snoring)', '*sleepy tail wag*', 'Shh… dreaming about burgers…']));
    return true;
  }
  return false;
};
function pat() {
  if (blockedAsleep()) return;
  stopWalk(2500);
  sfx('pat');
  if (Math.random() < 0.25) setTimeout(() => sfx('yip'), 180);
  S.st.happy = clamp(S.st.happy + 3);
  S.pats++;
  if (S.pats % 3 === 0) gain(1);
  prog('pat');
  hearts(2);
  joy(1300);
  if (Math.random() < 0.3) say(pick(LINES.pat));
  render();
}
function eat(id) {
  close();
  if (blockedAsleep()) return;
  const fd = FOODS.find(x => x.id === id),
    s = S.st;
  if (s.hunger >= 95) {
    sfx('no');
    say("I'm so full… maybe later?");
    return;
  }
  stopWalk(3000);
  if (fd.snack) {
    if (S.snacks < 1) return;
    S.snacks--;
  }
  s.hunger = clamp(s.hunger + fd.h);
  s.happy = clamp(s.happy + fd.j);
  s.clean = clamp(s.clean + fd.c, 5);
  fxAt(sz(fd.ic, 54), dogPX(), mouthY(), 'pop', 1300);
  anim('chomp', 1000);
  sfx('chomp');
  setTimeout(() => joy(1500), 900);
  gain(4);
  prog('feed');
  if (fd.fav) prog('fav');
  say(pick(fd.say));
  render();
}
function play() {
  if (blockedAsleep()) return;
  const s = S.st;
  if (s.energy < 15) {
    say('Too sleepy to play… nap first?');
    return;
  }
  if (s.hunger < 15) {
    say('Too hungry to play… snack first?');
    return;
  }
  stopWalk(3000);
  s.happy = clamp(s.happy + 18);
  s.energy = clamp(s.energy - 7, 5);
  s.hunger = clamp(s.hunger - 5, 5);
  s.clean = clamp(s.clean - 4, 5);
  fxAt(sz('ball', 34), dogPX(), mouthY(), 'ball', 1000);
  sfx('ball');
  setTimeout(() => sfx('yip'), 750);
  setTimeout(() => {
    anim('jump', 900);
    hearts(3);
  }, 700);
  joy(2200);
  setTimeout(() => spawnFur(1 + Math.floor(Math.random() * 3)), 1300);
  gain(6);
  prog('play');
  say(pick(LINES.play));
  render();
}
function bath() {
  if (blockedAsleep()) return;
  const s = S.st;
  if (s.clean >= 95) {
    say("I'm already sparkly clean!");
    return;
  }
  stopWalk(3000);
  sfx('bubble');
  s.clean = clamp(s.clean + 45);
  s.happy = clamp(s.happy + 3);
  for (let i = 0; i < 10; i++)
    setTimeout(
      () =>
        fxAt(
          `<svg width="22" height="22" viewBox="0 0 22 22"><circle cx="11" cy="11" r="${f(rnd(5, 9))}" fill="#e3f4ff" fill-opacity=".7" stroke="#9fd3f2" stroke-width="1.5"/></svg>`,
          dogX / 3.6 + rnd(-16, 16),
          rnd(headY(), 88),
          'bub',
          1600,
          rnd(-20, 20)
        ),
      i * 90
    );
  setTimeout(() => joy(1800), 900);
  gain(5);
  prog('bath');
  say(pick(LINES.bath));
  render();
}
function sleep() {
  const s = S.st;
  if (S.sleep) {
    S.sleep = false;
    sfx('wake');
    say('*big stretch* Good morning… is it morning?');
  } else {
    if (s.energy >= 90) {
      say("I'm not sleepy yet! Let's play!");
      return;
    }
    S.sleep = true;
    dir = 1;
    targetX = null;
    if (S.deco.includes('cushion')) {
      dogX = 270;
      dogZ = 0;
      place();
    }
    sfx('sleep');
    say('Goodnight, Ploy. Wake me if you need cuddles.');
  }
  drawDog(true);
  render();
  musicLevel();
  save();
}

function fetchGame() {
  if (blockedAsleep()) return;
  const s = S.st;
  if (fetching) return;
  if (s.energy < 15) {
    say('Too sleepy to play… nap first?');
    return;
  }
  if (s.hunger < 15) {
    say('Too hungry to play… snack first?');
    return;
  }
  fetching = true;
  const sc = dims.s,
    mo = 42 * sc,
    mg = 210 * sc,
    sx = dogX < 180 ? Math.max(mg, 85) : Math.min(360 - mg, 275);
  say(pick(['Throw it! Throw it!', 'Ready, Ploy!', 'Ball! Ball! Ball!']), 1300);
  if (Math.abs(dogX - sx) > 15 || dogZ > 0.05) runTo(sx, dogX, () => throwBall(sx), false);
  else {
    stopWalk(4000);
    throwBall(sx);
  }
}
function throwBall(sx) {
  const s = S.st,
    sc = dims.s,
    mo = 42 * sc,
    bx = sx < 180 ? rnd(292, 318) : rnd(42, 68),
    d = bx > dogX ? 1 : -1;
  dir = d;
  place();
  stopWalk(5000);
  anim('joy', 900);
  const el = $('#fball'),
    x0 = sx < 180 ? 150 : 210,
    y0 = 320,
    dur = 1500,
    t0 = performance.now() + 500;
  sfx('tap');
  const step = now => {
    const t = (now - t0) / dur;
    if (t < 0) {
      requestAnimationFrame(step);
      return;
    }
    let x, y, k;
    if (t < 0.55) {
      const u = t / 0.55;
      x = x0 + (bx - 20 * d - x0) * u;
      y = y0 + (262 - y0) * u - 250 * 4 * u * (1 - u);
      k = 1.8 - 0.8 * u;
    } else {
      const u = (t - 0.55) / 0.45;
      x = bx - 20 * d + 20 * d * Math.min(1, u * 1.2);
      const b = u < 0.5 ? u / 0.5 : (u - 0.5) / 0.5,
        h = u < 0.5 ? 22 : 7;
      y = 262 - h * 4 * b * (1 - b);
      k = 1;
    }
    el.innerHTML = `<ellipse cx="${f(x)}" cy="268" rx="${f(6 * k)}" ry="2" fill="#0b2a20" opacity=".2"/><g transform="translate(${f(x)} ${f(y)}) scale(${f(0.62 * k)}) rotate(${f((now / 3) % 360)})">${toyArt('ball')}</g>`;
    if (t < 1) requestAnimationFrame(step);
    else
      el.innerHTML = `<ellipse cx="${f(bx)}" cy="268" rx="6" ry="2" fill="#0b2a20" opacity=".2"/><g transform="translate(${f(bx)} 262) scale(.62)">${toyArt('ball')}</g>`;
  };
  requestAnimationFrame(step);
  setTimeout(() => sfx('ball'), 500 + dur * 0.55);
  setTimeout(
    () => {
      sfx('yip');
      runTo(
        bx - d * mo,
        dogX,
        () => {
          el.innerHTML = '';
          carryBall = true;
          drawDog(true);
          sfx('chomp');
          stopWalk(1200);
          setTimeout(() => {
            const hx = dogX < 180 ? Math.min(250, dogX + 120) : Math.max(110, dogX - 120);
            runTo(
              hx,
              dogX,
              () => {
                dir = 1;
                place();
                stopWalk(2500);
                carryBall = false;
                drawDog(true);
                el.innerHTML = `<g transform="translate(${f(dogX + mo)} 262) scale(.62)">${toyArt('ball')}</g>`;
                setTimeout(() => {
                  el.innerHTML = '';
                  fetching = false;
                }, 1800);
                sfx('yip');
                anim('jump', 900);
                hearts(3);
                joy(2000);
                say(pick(LINES.play));
                s.happy = clamp(s.happy + 18);
                s.energy = clamp(s.energy - 7, 5);
                s.hunger = clamp(s.hunger - 5, 5);
                s.clean = clamp(s.clean - 4, 5);
                S.mess = clamp((S.mess || 0) + 4);
                setTimeout(() => spawnFur(1 + Math.floor(Math.random() * 3)), 900);
                gain(6);
                prog('play');
                render();
                save();
              },
              true
            );
          }, 700);
        },
        true
      );
    },
    500 + dur * 0.3
  );
  setTimeout(() => {
    if (fetching && !carryBall && targetX === null && !$('#fball').innerHTML) {
      fetching = false;
    }
  }, 15000);
}
function playToy(id) {
  close();
  if (blockedAsleep()) return;
  if (fetching) return;
  if (scene !== 'room') {
    say("Let's play with it when we get home!");
    return;
  }
  if (id !== 'duck' && !S.toys.includes(id)) return;
  const s = S.st;
  if (s.energy < 10) {
    say('Too sleepy to play… nap first?');
    return;
  }
  fetching = true;
  const sc = dims.s,
    mo = 42 * sc,
    mg = 210 * sc,
    [tx, ty] = toyPos(id),
    nm = toyName(id);
  const d = tx >= dogX ? 1 : -1,
    stop = Math.max(mg, Math.min(360 - mg, tx - d * mo));
  sfx('yip');
  say(pick([id === 'duck' ? 'Sunny!!' : `My ${nm}!`, 'Toy time!', 'Ooh, that one!']), 1500);
  const pickUp = () => {
    dir = tx >= dogX ? 1 : -1;
    place();
    toyOut = id;
    drawHome();
    carryToy = id;
    drawDog(true);
    sfx('squeak');
    stopWalk(6000);
    setTimeout(() => {
      anim('shake', 1300);
      sfx('squeak');
      setTimeout(() => sfx('squeak'), 420);
      setTimeout(() => sfx('squeak'), 840);
    }, 350);
    setTimeout(() => {
      carryToy = null;
      drawDog(true);
      const el = $('#fball'),
        mx = dogX + dir * mo,
        my = 266 - 240 * sc,
        t0 = performance.now(),
        D = 900;
      const st = now => {
        const u = Math.min(1, (now - t0) / D),
          y = my - 110 * 4 * u * (1 - u);
        el.innerHTML = `<g transform="translate(${f(mx)} ${f(y)}) scale(.6) rotate(${f(u * 540)})">${toyArt(id)}</g>`;
        if (u < 1) requestAnimationFrame(st);
        else {
          el.innerHTML = '';
          carryToy = id;
          drawDog(true);
          sfx('squeak');
          hearts(3);
          joy(1800);
        }
      };
      requestAnimationFrame(st);
      sfx('yip');
    }, 1900);
    setTimeout(() => {
      carryToy = null;
      toyOut = null;
      drawDog(true);
      drawHome();
      fetching = false;
      stopWalk(1500);
      say(
        pick(
          id === 'duck'
            ? [
                'Sunny is my best friend!',
                '*squeak* Sunny says hi, Ploy!',
                'I will never share Sunny. Except with you.'
              ]
            : [`I love my ${nm}!`, '*squeak squeak*', `Best ${nm} ever!`, 'Thank you for my toy!']
        )
      );
      s.happy = clamp(s.happy + 12);
      s.energy = clamp(s.energy - 5, 5);
      if (!S.ty || S.ty.day !== today()) S.ty = { day: today(), n: 0 };
      if (S.ty.n < 5) {
        S.ty.n++;
        gain(3);
      }
      prog('play');
      render();
      save();
    }, 3700);
  };
  if (Math.abs(dogX - stop) < 4 && dogZ < 0.05) {
    stopWalk(500);
    pickUp();
  } else runTo(stop, dogX, pickUp, true);
  setTimeout(() => {
    if (fetching && !carryToy && toyOut === null && targetX === null) fetching = false;
  }, 12000);
}
function toyBox() {
  if (blockedAsleep()) return;
  const all = ['duck', ...S.toys];
  open(
    `<h2>Toy box</h2><p class="sub">Pick a toy for ${T('{n}')}. You can also tap a toy on the floor.</p><div class="tbox">${all.map(t => `<button class="item" data-a="toy" data-t="${t}"><svg viewBox="-17 -17 34 34">${toyArt(t)}</svg>${t === 'duck' ? 'Sunny' : toyName(t).replace(/^./, c => c.toUpperCase())}</button>`).join('')}</div>${S.toys.length ? '' : `<p class="sub" style="margin-top:12px!important">More toys show up in mystery gifts by the door.</p>`}<div class="row"><button class="btn ghost" data-a="play">Back</button><button class="btn ghost" data-a="close">Close</button></div>`,
    'toybox'
  );
}
function playPane() {
  if (blockedAsleep()) return;
  open(
    `<h2>Play time</h2><p class="sub">Tip: drag your finger over ${T('{n}')} to brush the fluff.</p><div class="list">
 <button class="opt" data-a="arcade"><svg viewBox="-60 -72 120 128">${pupFace('samo')}</svg><span><b>Arcade</b><small>Fluffy Pop, Snack Cart, Fluffy Jump and Pack the Suitcase.</small></span></button>
 <button class="opt" data-a="fetch">${ico('ball')}<span><b>Fetch</b><small>Throw the ball. Quick and happy.</small></span></button>
 <button class="opt" data-a="catch">${ico('burger')}<span><b>Treat catch</b><small>Catch som tam, steak and burgers. Dodge the chilies!</small></span></button>
 <button class="opt" data-a="toybox"><svg viewBox="-17 -17 34 34">${toyArt('duck')}</svg><span><b>Toys</b><small>Play with Sunny and the toys from the mystery gifts.</small></span></button>
 <button class="opt" data-a="tricks">${ico('star')}<span><b>Tricks</b><small>Teach sit, paw, spin and the Samoyed smile.</small></span></button>
 </div><div class="row"><button class="btn ghost" data-a="close">Close</button></div>`,
    'play'
  );
}
/* panes */
let paneKind = '',
  locked = false;
function open(html, kind, mid, lock) {
  paneKind = kind;
  locked = !!lock;
  $('#pane').innerHTML = html;
  const o = $('#ov');
  o.classList.add('on');
  o.classList.toggle('mid', !!mid);
  const b = $('#pane').querySelector('input,button');
  if (b) setTimeout(() => b.focus(), 50);
}
function close() {
  if (locked) return;
  $('#ov').classList.remove('on');
  paneKind = '';
}
function foodPane() {
  open(
    `<h2>What's for dinner?</h2><p class="sub">Ploy's favorites make ${T('{n}')} extra happy.</p><div class="grid2">${FOODS.filter(
      x => !x.snack || S.snacks > 0
    )
      .map(
        x =>
          `<button class="food" data-a="eat" data-id="${x.id}">${x.fav ? '<span class="tag">Ploy\'s fav</span>' : ''}${ico(x.ic)}${x.name}<small>${x.snack ? '×' + S.snacks + ' saved from Treat catch' : (x.h >= 30 ? 'Very filling' : x.h >= 25 ? 'Filling' : 'Light') + (x.c < 0 ? ' · a bit messy' : '')}</small></button>`
      )
      .join('')}</div><div class="row"><button class="btn ghost" data-a="close">Not now</button></div>`,
    'food'
  );
}
function questPane() {
  resetQuests();
  open(
    `${ckHTML()}<h2>Today's quests</h2><p class="sub">New quests every day. ${S.lv < MAXL ? `${need(S.lv) - S.xp} XP to level ${S.lv + 1}.` : 'Top level reached.'}</p><div class="list">${QUESTS.map(
      q => {
        const v = S.q.p[q.id] || 0,
          done = S.q.done.includes(q.id);
        return `<div class="q"><div><b>${T(q.t)}</b><div class="bar"><i style="width:${(v / q.g) * 100}%"></i></div><small>${v} / ${q.g} · +${q.xp} XP</small></div>${done ? '<span class="ok">Done</span>' : `<button class="btn sm" data-a="claim" data-id="${q.id}" ${v >= q.g ? '' : 'disabled'}>Claim</button>`}</div>`;
      }
    ).join(
      ''
    )}</div><div class="row"><button class="btn ghost" data-a="help">How to play</button><button class="btn ghost" data-a="close">Close</button></div>`,
    'quests'
  );
}
function closetPane() {
  const sec = (slot, lab) =>
    `<p style="font:600 15px Fredoka,sans-serif;margin:14px 0 8px">${lab}</p><div class="grid2">${ITEMS.filter(
      i => i.slot === slot && !(i.id.startsWith('ch_') && !unlocked(i))
    )
      .map(i => {
        const u = unlocked(i),
          on = S.eq[slot] === i.id;
        return `<button class="item${on ? ' on' : ''}" data-a="wear" data-id="${i.id}" ${u ? '' : 'disabled'}>${i.name}<small>${!u ? (i.ck ? `Check in on ${i.ck} days (${S.ck.days.length}/${i.ck})` : i.lv ? 'Unlocks at level ' + i.lv : i.fur ? `Collect ${i.fur} fur tufts (${S.fur}/${i.fur})` : i.city ? 'Souvenir from ' + cityName(i.city) : 'In the shop · ' + i.shop + ' fur') : on ? 'Wearing · tap to remove' : i.note || 'Tap to wear'}</small></button>`;
      })
      .join('')}</div>`;
  open(
    `<h2>Closet</h2><p class="sub">Dress up ${T('{n}')}. Fur tufts collected: ${S.fur}</p>${sec('hat', 'Hats')}${sec('neck', 'Neck')}${(() => {
      const k = ITEMS.filter(i => i.id.startsWith('ch_') && !unlocked(i)).length;
      return k
        ? `<p class="sub" style="margin-top:12px!important">${k} more city charms to collect. Fly somewhere new to bring one home.</p>`
        : '';
    })()}<div class="row"><button class="btn ghost" data-a="close">Close</button></div>`,
    'closet'
  );
}
function lettersPane() {
  open(
    `<h2>Letters</h2><p class="sub">New letters arrive as ${T('{n}')} grows up.</p><div class="list">${LETTERS.map(
      (l, i) => {
        const u = S.lv >= l.lv,
          r = S.read.includes(i);
        return `<div class="env">${ico(u ? (r ? 'envOpen' : 'env') : 'lock')}<div><b>${u ? l.title : 'Sealed letter'}</b><small>${u ? (r ? 'Read' : 'New!') : 'Arrives at level ' + l.lv}</small></div>${u ? `<button class="btn sm" data-a="read" data-i="${i}">Open</button>` : ''}</div>`;
      }
    ).join(
      ''
    )}</div>${S.notes.read.length ? `<p style="font:600 15px Fredoka,sans-serif;margin:16px 0 8px">Daily notes</p><div class="list">${S.notes.read.map(i => `<div class="env">${ico('envOpen')}<div><b>Note #${i + 1}</b><small>${DAILY[i].slice(0, 38)}…</small></div><button class="btn sm" data-a="note" data-i="${i}">Open</button></div>`).join('')}</div>` : ''}${tmListHTML()}${btListHTML()}<div class="row"><button class="btn ghost" data-a="close">Close</button></div>`,
    'letters'
  );
}
function readLetter(i) {
  const l = LETTERS[i];
  if (!l || S.lv < l.lv) return;
  if (l.lv === MAXL) return endLetter();
  if (!S.read.includes(i)) S.read.push(i);
  sfx('letter');
  save();
  locked = false;
  open(
    `<div class="paper"><p>Dear Ploy,</p>${l.p.map(x => `<p>${T(x)}</p>`).join('')}<p class="sig">${T('— ' + l.from)}</p></div><div class="row"><button class="btn ghost" data-a="letters">All letters</button><button class="btn" data-a="close">Close</button></div>`,
    'letter',
    true
  );
  render();
}
function namePane(firstTime) {
  open(
    `<h2>${firstTime ? 'Welcome home, Ploy!' : 'Rename your pup'}</h2><p>${firstTime ? 'Welcome home from Germany, Ploy! A little Samoyed followed the Christmas market lights all the way home with you. What will you name them?' : 'Pick a new name.'}</p><form id="nf"><input class="nm" id="nmI" maxlength="14" autocomplete="off" value="${firstTime ? 'Mochi' : S.name}" aria-label="Pup's name"><div class="row">${firstTime ? '' : '<button type="button" class="btn ghost" data-a="close">Cancel</button>'}<button class="btn" type="submit">${firstTime ? "That's the name!" : 'Save'}</button></div>${firstTime ? '<button type="button" class="lnk" data-a="backup">I have a backup code</button>' : ''}</form>`,
    'name',
    true,
    firstTime
  );
}
