/* --- treat catch mini-game --- */
let CG = null,
  CGI = null;
const imgOf = k => {
  const i = new Image();
  i.src =
    'data:image/svg+xml;charset=utf-8,' +
    encodeURIComponent(
      `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48" width="96" height="96">${G[k]}</svg>`
    );
  return i;
};
function cgImgs() {
  if (!CGI) {
    CGI = {
      kibble: imgOf('bowl'),
      somtam: imgOf('somtam'),
      steak: imgOf('steak'),
      burger: imgOf('burger'),
      chili: imgOf('chili'),
      heart: imgOf('heart'),
      dog: new Image()
    };
    CGI.dog.src = 'dog.png';
  }
  return CGI;
}
function catchPane() {
  if (blockedAsleep()) return;
  if (S.st.energy < 15) {
    close();
    return say('Too sleepy to play… nap first?');
  }
  open(
    `<h2>Treat catch</h2><p class="sub">Drag to move ${T('{n}')}. Catch the food, dodge the chilies!</p><canvas id="cg" class="cg" width="640" height="720"></canvas><div class="row"><button class="btn ghost" data-a="cgstop">Stop</button></div>`,
    'game',
    true,
    true
  );
  startCG();
}
function startCG() {
  const cv = $('#cg'),
    c = cv.getContext('2d'),
    I = cgImgs();
  CG = {
    run: true,
    x: 320,
    tx: 320,
    dir: 1,
    items: [],
    score: 0,
    caught: 0,
    favs: 0,
    lives: 3,
    t: 0,
    spawn: 0.6,
    last: performance.now(),
    hit: 0,
    c,
    cv,
    I
  };
  const mv = e => {
    const r = cv.getBoundingClientRect();
    CG && (CG.tx = ((e.clientX - r.left) / r.width) * 640);
  };
  cv.addEventListener('pointerdown', mv);
  cv.addEventListener('pointermove', mv);
  requestAnimationFrame(cgLoop);
}
const KINDS = [
  ['kibble', 1, 0.28],
  ['somtam', 3, 0.19],
  ['steak', 3, 0.19],
  ['burger', 3, 0.19],
  ['chili', 0, 0.15]
];
function cgLoop(now) {
  const g = CG;
  if (!g || !g.run) return;
  const dt = Math.min(0.05, (now - g.last) / 1000);
  g.last = now;
  g.t += dt;
  const dx = g.tx - g.x;
  if (Math.abs(dx) > 3) {
    g.dir = dx > 0 ? 1 : -1;
    g.x += Math.sign(dx) * Math.min(Math.abs(dx), 560 * dt);
  }
  g.x = Math.max(70, Math.min(570, g.x));
  g.spawn -= dt;
  if (g.spawn <= 0) {
    let r = Math.random(),
      acc = 0,
      k = KINDS[0];
    for (const q of KINDS) {
      acc += q[2];
      if (r < acc) {
        k = q;
        break;
      }
    }
    g.items.push({
      k: k[0],
      p: k[1],
      x: 40 + Math.random() * 560,
      y: -50,
      vy: 190 + g.t * 7 + Math.random() * 80,
      rot: rnd(-0.4, 0.4)
    });
    g.spawn = Math.max(0.32, 0.85 - g.t * 0.013);
  }
  for (const it of g.items) {
    it.y += it.vy * dt;
    if (!it.done && it.y > 560 && it.y < 650 && Math.abs(it.x - g.x) < 78) {
      it.done = true;
      if (it.k === 'chili') {
        g.lives--;
        g.hit = 0.6;
        sfx('no');
      } else {
        g.score += it.p;
        g.caught++;
        if (it.p === 3) g.favs++;
        sfx('fur');
      }
    }
  }
  g.items = g.items.filter(it => !it.done && it.y < 780);
  if (g.hit > 0) g.hit -= dt;
  cgDraw();
  if (g.t >= 40 || g.lives <= 0) return endCG();
  requestAnimationFrame(cgLoop);
}
function cgDraw() {
  const { c, I } = CG,
    g = CG,
    day = tod === 'day';
  const sky = c.createLinearGradient(0, 0, 0, 720);
  sky.addColorStop(0, day ? '#7cc6ef' : '#0b2219');
  sky.addColorStop(1, day ? '#d8f0fb' : '#1f4d3c');
  c.fillStyle = sky;
  c.fillRect(0, 0, 640, 720);
  c.fillStyle = '#eef3f7';
  c.fillRect(0, 650, 640, 70);
  c.fillStyle = '#fff';
  c.fillRect(0, 648, 640, 5);
  for (const it of g.items) {
    c.save();
    c.translate(it.x, it.y);
    c.rotate(it.rot);
    c.drawImage(I[it.k], -38, -38, 76, 76);
    c.restore();
  }
  c.save();
  c.translate(g.x, 686);
  c.scale(g.dir * 0.36, 0.36);
  if (I.dog.complete) c.drawImage(I.dog, -274, -512);
  c.restore();
  if (g.hit > 0) {
    c.fillStyle = `rgba(216,52,74,${g.hit * 0.35})`;
    c.fillRect(0, 0, 640, 720);
  }
  c.fillStyle = 'rgba(255,248,225,.92)';
  c.beginPath();
  c.roundRect ? c.roundRect(14, 14, 612, 58, 29) : c.rect(14, 14, 612, 58);
  c.fill();
  c.fillStyle = INK;
  c.font = '600 30px Fredoka, sans-serif';
  c.textBaseline = 'middle';
  c.fillText(`Score ${g.score}`, 36, 44);
  c.textAlign = 'center';
  c.fillText(`${Math.max(0, Math.ceil(40 - g.t))}s`, 320, 44);
  c.textAlign = 'left';
  for (let i = 0; i < 3; i++) {
    c.globalAlpha = i < g.lives ? 1 : 0.25;
    c.drawImage(I.heart, 500 + i * 40, 26, 36, 36);
  }
  c.globalAlpha = 1;
}
function endCG() {
  const g = CG;
  if (!g) return;
  g.run = false;
  if (S.cg.day !== today()) S.cg = { day: today(), n: 0 };
  const xp = S.cg.n < 3 ? Math.min(30, g.score) : 0;
  S.cg.n++;
  S.snacks += g.favs;
  S.st.energy = clamp(S.st.energy - 6, 5);
  S.st.happy = clamp(S.st.happy + 15);
  S.st.hunger = clamp(S.st.hunger - 4, 5);
  prog('play');
  CG = null;
  open(
    `${ico('star', 'big')}<h2 style="text-align:center">${g.lives <= 0 ? 'Too spicy!' : 'Time!'} Score ${g.score}</h2><p style="text-align:center">${T('{n}')} caught ${g.caught} treat${g.caught === 1 ? '' : 's'}${g.favs ? ` and saved <b>${g.favs} market treat${g.favs === 1 ? '' : 's'}</b> for later` : ''}.${xp ? ` +${xp} XP` : ' (XP is for the first 3 games each day.)'}</p><div class="row" style="justify-content:center"><button class="btn ghost" data-a="close">Done</button>${S.st.energy >= 15 ? '<button class="btn" data-a="catch">Play again</button>' : ''}</div>`,
    'cgend',
    true
  );
  if (xp) gain(xp);
  render();
  save();
  setTimeout(() => say(g.score >= 40 ? 'That was the best game ever!' : 'Again! Again!'), 400);
}
