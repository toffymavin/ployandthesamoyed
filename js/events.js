/* events */
$('#i-feed').innerHTML = ico('bowl');
$('#i-play').innerHTML = ico('ball');
$('#i-bath').innerHTML = ico('bubbles');
$('#i-q').innerHTML = ico('quest');
$('#i-c').innerHTML = ico('hanger');
$('#i-l').innerHTML = ico('env');
$('#i-s').innerHTML = ico('bag');
$('#i-st').innerHTML = ico('stampI');
$('#i-a').innerHTML = ico('camera');
$('#i-fly').innerHTML = ico('fly');
$('#i-walk').innerHTML = ico('walk');
$('#brushc').innerHTML = sz('brush', 34);
const ACT = {
  backup: backupPane,
  bkcopy: bkCopy,
  bkshare: () => {
    const t = $('#bkOut');
    if (t) navigator.share({ text: t.value }).catch(() => {});
  },
  bkrestore: bkRestore,
  bkback: () => {
    locked = false;
    namePane(true);
  },
  homeskip: () => {
    locked = false;
    namePane(true);
  },
  homehow: () => {
    const was = !S.name;
    locked = false;
    open(
      `<h2>Add to Home Screen</h2>${howToHTML()}<div class="row"><button class="btn ghost" data-a="${was ? 'bkback' : 'backup'}">Back</button></div>`,
      'home',
      true,
      was
    );
  },
  tm: d => readTM(d.id),
  arcade: arcadePane,
  mg: d => mgStart(d.id),
  mgstop: mgStop,
  ctpick: d => cartPick(d.f),
  walk: startWalk,
  spark: d => digSpark(+d.i),
  wact: doWact,
  wbeg: d => wbeg(!!d.y),
  petal: d => catchPetal(d.id),
  bottle: getBottle,
  btread: d => readBottle(d.id),
  postcard: d => postcardPane(d.id, !!d.new),
  ending,
  endletter: endLetter,
  credits,
  guide: d => guidePane(+d.p),
  guidedone: () => {
    locked = false;
    close();
    welcomeSeq();
  },
  help: () => guidePane(0),
  feed: () => (S.sleep ? blockedAsleep() : foodPane()),
  eat: d => eat(d.id),
  play: playPane,
  fetch: () => {
    close();
    fetchGame();
  },
  catch: catchPane,
  cgstop: () => {
    if (CG) {
      CG.t = 99;
    }
  },
  tricks: trickPane,
  toybox: toyBox,
  toy: d => playToy(d.t),
  trick: d => doTrick(d.id),
  bath,
  sleep,
  fly: flyPane,
  depart: d => depart(d.id),
  land,
  stamps: stampPane,
  shop: shopPane,
  buy: d => buy(d.id),
  place: d => {
    const i = S.deco.indexOf(d.id);
    if (i >= 0) S.deco.splice(i, 1);
    else S.deco.push(d.id);
    drawDeco();
    shopPane();
  },
  album: albumPane,
  snap,
  photo: d => photoPane(+d.i),
  delphoto: d => {
    ALB.splice(+d.i, 1);
    saveAlb();
    albumPane();
  },
  note: d => readNote(+d.i),
  quests: questPane,
  closet: closetPane,
  letters: () => {
    locked = false;
    lettersPane();
  },
  close: () => {
    locked = false;
    close();
    if (window._pxp && paneKind === '') {
      const x = window._pxp;
      window._pxp = 0;
      setTimeout(() => gain(x), 600);
    }
    if (S.lv >= MAXL && S.ended && !S.baby && !babyAsked) setTimeout(babyPane, 400);
  },
  snd: d => {
    S[d.k] = !S[d.k];
    if (d.k === 'music') {
      unlock();
      musicLevel();
    } else if (S.sfx) sfx('tap');
    drawSound();
    save();
  },
  rename: () => namePane(false),
  read: d => readLetter(+d.i),
  claim: d => {
    const q = QUESTS.find(x => x.id === d.id);
    if (!q || S.q.done.includes(q.id) || (S.q.p[q.id] || 0) < q.g) return;
    S.q.done.push(q.id);
    sfx('coin');
    toast(`+${q.xp} XP`);
    const lv = S.lv;
    gain(q.xp);
    if (S.lv === lv) questPane();
    save();
  },
  wear: d => {
    const i = ITEMS.find(x => x.id === d.id);
    if (!i || !unlocked(i)) return;
    locked = false;
    S.eq[i.slot] = S.eq[i.slot] === i.id ? null : i.id;
    drawDog(true);
    if (paneKind === 'stamp') {
      locked = false;
      close();
      if (window._pxp) {
        const x = window._pxp;
        window._pxp = 0;
        setTimeout(() => gain(x), 900);
      }
    } else closetPane();
    sfx('yip');
    save();
    if (S.eq[i.slot]) say(pick(['How do I look, Ploy?', 'Fashion!', 'Matching with the market lights!']));
  },
  reset: () => {
    resetting = true;
    try {
      localStorage.removeItem(KEY);
      localStorage.removeItem(KEY + '-album');
    } catch (e) {}
    location.replace(location.pathname + location.search);
  }
};
document.addEventListener('click', e => {
  if (noClick && e.target.closest('#scene')) return;
  const t = e.target.closest('[data-a]');
  if (t && !t.disabled) {
    ACT[t.dataset.a] && ACT[t.dataset.a](t.dataset);
    if (t.dataset.a !== 'reset') save();
    return;
  }
  const tu = e.target.closest('.tuft');
  if (tu) {
    grabFur(+tu.dataset.t);
    save();
    return;
  }
  if (e.target.closest('#note')) {
    readNote();
    return;
  }
  if (e.target.closest('#topmsg')) {
    const m = tmNew()[0];
    if (m) readTM(m.id);
    return;
  }
  if (e.target.closest('#cookie')) {
    openCookie();
    return;
  }
  if (e.target.closest('#gift')) {
    openGift();
    return;
  }
  const ty = e.target.closest('.toy');
  if (ty) {
    playToy(ty.dataset.t);
    return;
  }
  if (e.target.closest('#sunny')) {
    sunnyPane();
    return;
  }
  if (e.target.closest('#baby') && S.baby) {
    hearts(2);
    sfx('fur');
    say(
      pick([`${S.baby} wants pats too!`, `${S.baby} says hi, Ploy!`, `${S.baby} is copying everything I do.`])
    );
    return;
  }
  if (e.target.closest('#friend') && fr) {
    hearts(2);
    sfx('yip');
    fxAt(sz('heart', 20), fr.x / 3.6, 62, 'heart', 1200, 0);
    return;
  }
  if (e.target.closest('#dogW')) {
    pat();
    save();
    return;
  }
  if (e.target === $('#ov')) close();
});
function welcomeSeq() {
  window._wel = Date.now();
  drawNote();
  drawCookie();
  drawHome();
  joy(2000);
  hearts(4);
  S.stamps.germany = (S.stamps.germany || 0) + 1;
  save();
  showSign();
  render();
  setTimeout(() => say(`Welcome home from Germany, Ploy! I'm {n}. Can I stay with you?`, 6000), 400);
  setTimeout(() => {
    if (paneKind) return;
    const c = CITIES.find(x => x.id === 'germany');
    if (!S.pc.germany) S.pc.germany = { note: 'Welcome home. Rest well after the long flight.' };
    open(
      `<h2 style="text-align:center">Your first stamp!</h2>${postcardHTML(c, false)}<p style="text-align:center">${T('{n}')} saved you a souvenir from Germany: <b>Pretzel charm</b>.</p><div class="row" style="justify-content:center"><button class="btn ghost" data-a="close">Later</button><button class="btn" data-a="wear" data-id="pretzel">Try it on</button></div>`,
      'stamp',
      true
    );
  }, 7000);
}
document.addEventListener('submit', e => {
  e.preventDefault();
  if (e.target.id === 'bf') {
    const v = ($('#bfI').value || '').trim().slice(0, 14);
    if (!v) return;
    S.baby = v.replace(/[<>&"]/g, '');
    locked = false;
    close();
    babyX = Math.max(40, dogX - 90);
    drawBaby();
    save();
    hearts(4);
    sfx('level');
    setTimeout(() => say(`Ploy, meet ${S.baby}! I'm a big brother now!`, 5000), 500);
    return;
  }
  const v = ($('#nmI').value || '').trim().slice(0, 14);
  if (!v) return;
  const was = !S.name;
  if (was) window._wel = Date.now();
  S.name = v.replace(/[<>&"]/g, '');
  locked = false;
  close();
  render();
  save();
  if (was && window._pingName) window._pingName(S.name);
  if (was) guidePane(0);
  else {
    drawNote();
    drawCookie();
  }
});
document.addEventListener('keydown', e => {
  if (e.key === 'Escape') close();
});
document.addEventListener('visibilitychange', () => {
  if (document.hidden) save();
  else if (Date.now() - S.last > 6 * 3600e3) setTimeout(() => say(pick(LINES.wel)), 500);
});
function hash() {
  const h = location.hash;
  if (h === '#reset')
    open(
      `<h2>Start over?</h2><p>This erases ${T('{n}')} and all progress on this device.</p><div class="row"><button class="btn ghost" data-a="close">Keep my pup</button><button class="btn" data-a="reset">Start over</button></div>`,
      'reset',
      true
    );
  if (h === '#boost') {
    gain(100);
    toast('Preview boost: +100 XP');
  }
}
window.addEventListener('hashchange', hash);
window.addEventListener('pagehide', save);
window.addEventListener('beforeunload', save);
