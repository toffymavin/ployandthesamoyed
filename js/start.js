/* start */
buildScene();
marketHTML = $('#back').innerHTML;
setScene('room');
applyTime();
setInterval(applyTime, 60000);
drawDeco();
brushInit();
let lastT = Date.now(),
  gap = 0;
if (!first) {
  gap = Date.now() - S.last;
  decay(Math.min(gap, 72 * 3600e3) / 3600e3);
}
resetQuests();
render();
drawDog(true);
drawNote();
drawCookie();
drawBaby();
drawHome();
setInterval(() => {
  drawNote();
  drawCookie();
  drawHome();
}, 60000);
if (!first && S.name && gap >= 2 * 36e5) {
  const g0 = gap,
    wt = !!S.trip;
  setTimeout(() => enqueue(() => diaryPane(g0, wt)), 2500);
}
if (first || !S.name) {
  if (needHome()) homePane();
  else namePane(true);
} else {
  setTimeout(() => {
    if (cookieReady() && !paneKind) say('There is a fortune cookie on the stall for you, Ploy!');
  }, 8500);
  setTimeout(sayWx, 14000);
}
if (!first && S.name)
  setTimeout(
    () =>
      say(
        S.trip
          ? `Ploy! Are you still in ${cityName(S.trip.c)}? I miss you.`
          : gap > 6 * 3600e3
            ? pick(LINES.wel)
            : timeLine() || pick(LINES.gen)
      ),
    600
  );
hash();
requestAnimationFrame(frame);
checkIn();
loadTM();
setInterval(() => {
  checkIn();
  drawTM();
}, 60000);
setInterval(loadTM, 20 * 60e3);
document.addEventListener('visibilitychange', () => {
  if (!document.hidden) {
    loadTM();
    checkIn();
  }
});
if (!canStore)
  setTimeout(
    () => toast("This app can't save progress. Open the link in Safari or Chrome."),
    first ? 6000 : 1500
  );
setInterval(() => {
  const n = Date.now(),
    h = (n - lastT) / 3600e3;
  lastT = n;
  const was = S.sleep;
  decay(Math.min(h, 72));
  if (was && !S.sleep) {
    drawDog(true);
    musicLevel();
    sfx('wake');
    say('*big stretch* I slept so well, Ploy!');
  }
  render();
}, 1000);
setInterval(save, 5000);
setInterval(() => {
  if (paneKind || !S.name || S.sleep || Date.now() - lastSay < 16000) return;
  const m = mood();
  if (Math.random() < 0.1) {
    sayWx();
    return;
  }
  if ((S.mess || 0) >= 50 && Math.random() < 0.35) {
    say(pick(LINES.messy));
    return;
  }
  if (S.baby && S.lv >= MAXL && Math.random() < 0.15) {
    say(
      pick([
        `${S.baby} copies everything I do!`,
        `Ploy, ${S.baby} says hi! (I think.)`,
        `I'm teaching ${S.baby} the Samoyed smile.`
      ])
    );
    return;
  }
  say(
    LINES[m] && Math.random() < 0.75
      ? pick(LINES[m])
      : Math.random() < 0.25
        ? timeLine() || pick(LINES.gen)
        : pick(LINES.gen)
  );
}, 9000);
setInterval(() => {
  if (!S.sleep && !paneKind && Math.random() < 0.35) spawnFur(1);
}, 20000);
setInterval(() => {
  if (
    S.sleep ||
    paneKind ||
    fetching ||
    scene !== 'room' ||
    !S.name ||
    S.trip ||
    CG ||
    fr ||
    targetX !== null ||
    S.st.energy < 30 ||
    Date.now() < busyUntil
  )
    return;
  if (Math.random() < 0.2) playToy(pick(['duck', ...S.toys]));
}, 30000);
setInterval(() => {
  if (S.st.clean >= 45 || paneKind || S.trip) return;
  const k = S.st.clean < 20 ? 3 : S.st.clean < 30 ? 2 : 1;
  for (let i = 0; i < k; i++)
    setTimeout(
      () =>
        fxAt(
          `<svg width="26" height="18" viewBox="0 0 26 18"><g fill="#b9a68a" opacity=".7"><circle cx="7" cy="11" r="5"/><circle cx="14" cy="7" r="6"/><circle cx="20" cy="11" r="4.5"/></g></svg>`,
          dogX / 3.6 + rnd(-9, 9),
          headY() + rnd(4, 30),
          'bub',
          1600,
          rnd(-25, 25)
        ),
      i * 260
    );
}, 2600);
