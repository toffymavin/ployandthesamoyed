/* ---------- Fluffy Jump ---------- */
function jumpStart() {
  open(
    `<h2>Fluffy Jump</h2><p class="sub">Tap to jump. Tap again in the air for a double jump!</p><canvas id="mgc" class="cg" width="640" height="720"></canvas><div class="row"><button class="btn ghost" data-a="mgstop">Stop</button></div>`,
    'game',
    true,
    true
  );
  const cv = $('#mgc'),
    c = cv.getContext('2d'),
    I = cgImgs();
  const gy = 600;
  const g = (MG = {
    id: 'jump',
    run: true,
    c,
    cv,
    I,
    gy,
    y: 0,
    vy: 0,
    jumps: 0,
    speed: 330,
    dist: 0,
    stars: 0,
    obs: [],
    st: [],
    next: 1.4,
    nextS: 2,
    t: -1.4,
    last: performance.now(),
    dead: false,
    scroll: 0,
    fx: []
  });
  g.end = () => {
    g.dead = true;
  };
  const tap = e => {
    e.preventDefault();
    if (g.dead || g.t < 0) return;
    if (g.y >= 0) {
      g.vy = -980;
      g.jumps = 1;
      sfx('yip');
    } else if (g.jumps < 2) {
      g.vy = -820;
      g.jumps = 2;
      sfx('pat');
    }
  };
  cv.addEventListener('pointerdown', tap);
  requestAnimationFrame(jumpLoop);
}
const OBS = [
  { k: 'case', w: 62, h: 74 },
  { k: 'cone', w: 44, h: 58 },
  { k: 'small', w: 54, h: 44 },
  { k: 'tall', w: 58, h: 104 }
];
function jumpLoop(now) {
  const g = MG;
  if (!g || g.id !== 'jump' || !g.run) return;
  const dt = Math.min(0.033, (now - g.last) / 1000);
  g.last = now;
  g.t += dt;
  if (g.t > 0 && !g.dead) {
    g.speed = Math.min(720, 330 + g.t * 9);
    const dx = g.speed * dt;
    g.dist += dx;
    g.scroll += dx;
    g.vy += 2700 * dt;
    g.y += g.vy * dt;
    if (g.y >= 0) {
      g.y = 0;
      g.vy = 0;
      g.jumps = 0;
    }
    g.next -= dt;
    if (g.next <= 0) {
      const o = Object.assign({}, pick(g.t < 12 ? OBS.slice(0, 3) : OBS), {
        x: 700,
        col: pick(['#d8344a', '#7cc4ee', '#ffd23f', '#c3a6ff'])
      });
      g.obs.push(o);
      if (g.t > 20 && Math.random() < 0.25)
        g.obs.push(Object.assign({}, OBS[2], { x: 700 + o.w + 10, col: '#ff8fa3' }));
      g.next = rnd(0.85, 1.6) * Math.max(0.6, 1 - g.t / 90);
    }
    g.nextS -= dt;
    if (g.nextS <= 0) {
      const h = rnd(90, 250),
        n = Math.random() < 0.4 ? 3 : 1;
      for (let i = 0; i < n; i++) g.st.push({ x: 700 + i * 56, y: g.gy - h, got: false });
      g.nextS = rnd(1.2, 2.4);
    }
    for (const o of g.obs) o.x -= dx;
    for (const s of g.st) s.x -= dx;
    g.obs = g.obs.filter(o => o.x > -120);
    g.st = g.st.filter(s => s.x > -60 && !s.got);
    const dx0 = 130,
      feet = g.gy + g.y,
      box = [dx0 - 44, feet - 80, dx0 + 42, feet - 4];
    for (const o of g.obs) {
      if (box[2] > o.x + 6 && box[0] < o.x + o.w - 6 && box[3] > g.gy - o.h + 6) {
        g.dead = true;
        sfx('no');
        g.endT = g.t;
      }
    }
    for (const s of g.st) {
      if (!s.got && Math.abs(s.x - dx0) < 56 && Math.abs(s.y - (feet - 46)) < 62) {
        s.got = true;
        g.stars++;
        sfx('coin');
        g.fx.push({ x: s.x, y: s.y, life: 0.6 });
      }
    }
  }
  for (const f of g.fx) f.life -= dt;
  g.fx = g.fx.filter(f => f.life > 0);
  const score = Math.floor(g.dist / 12) + g.stars * 25;
  jumpDraw(g, score);
  if (g.dead) {
    g.run = false;
    banner(g.c, 'Bonk!', `Score ${score}`);
    setTimeout(
      () =>
        mgEnd(
          'jump',
          score,
          score / 25,
          `${T('{n}')} ran ${Math.floor(g.dist / 60)} m and grabbed ${g.stars} star${g.stars === 1 ? '' : 's'}.`
        ),
      1400
    );
    return;
  }
  requestAnimationFrame(jumpLoop);
}
function jumpDraw(g, score) {
  const c = g.c,
    day = tod !== 'night';
  const sky = c.createLinearGradient(0, 0, 0, 720);
  sky.addColorStop(0, day ? '#8fd0f5' : '#0b2219');
  sky.addColorStop(1, day ? '#e8f7fd' : '#1f4d3c');
  c.fillStyle = sky;
  c.fillRect(0, 0, 640, 720);
  c.fillStyle = day ? '#fff' : 'rgba(255,255,255,.25)';
  for (let i = 0; i < 4; i++) {
    const x = ((((i * 230 - g.scroll * 0.15) % 920) + 920) % 920) - 140,
      y = 120 + ((i * 37) % 90);
    c.beginPath();
    c.ellipse(x, y, 50, 18, 0, 0, 6.283);
    c.ellipse(x - 24, y - 10, 22, 18, 0, 0, 6.283);
    c.ellipse(x + 18, y - 14, 26, 20, 0, 0, 6.283);
    c.fill();
  }
  c.fillStyle = day ? '#a9bfdc' : '#2a4a5a';
  for (let i = 0; i < 5; i++) {
    const x = ((((i * 260 - g.scroll * 0.3) % 1300) + 1300) % 1300) - 260;
    c.beginPath();
    c.moveTo(x, g.gy - 60);
    c.lineTo(x + 130, g.gy - 260 + (i % 2) * 60);
    c.lineTo(x + 260, g.gy - 60);
    c.fill();
  }
  c.fillStyle = day ? '#93cc6b' : '#2f6b4a';
  c.beginPath();
  c.moveTo(0, g.gy - 40);
  for (let x = 0; x <= 640; x += 40) c.lineTo(x, g.gy - 40 - Math.sin((x + g.scroll * 0.6) / 90) * 16);
  c.lineTo(640, 720);
  c.lineTo(0, 720);
  c.fill();
  c.fillStyle = day ? '#84c25c' : '#285c3e';
  c.fillRect(0, g.gy, 640, 120);
  c.fillStyle = day ? '#6fae49' : '#1f4d33';
  c.fillRect(0, g.gy, 640, 8);
  const FC = ['#ffd23f', '#ff8fa3', '#fff', '#d8344a', '#c3a6ff'];
  for (let i = 0; i < 16; i++) {
    const x = ((((i * 53 - g.scroll) % 848) + 848) % 848) - 60;
    c.fillStyle = FC[i % 5];
    c.beginPath();
    c.arc(x, g.gy + 30 + ((i * 29) % 70), 5, 0, 6.283);
    c.fill();
  }
  for (const o of g.obs) {
    const x = o.x,
      top = g.gy - o.h;
    c.lineWidth = 4;
    c.strokeStyle = INK;
    if (o.k === 'cone') {
      c.fillStyle = '#f08a2c';
      c.beginPath();
      c.moveTo(x + o.w / 2, top);
      c.lineTo(x + o.w, g.gy);
      c.lineTo(x, g.gy);
      c.closePath();
      c.fill();
      c.stroke();
      c.fillStyle = '#fff';
      c.fillRect(x + o.w * 0.3, top + o.h * 0.45, o.w * 0.4, 8);
    } else {
      c.fillStyle = o.col;
      rr(c, x, top, o.w, o.h, 10);
      c.fill();
      c.stroke();
      c.beginPath();
      c.moveTo(x + o.w * 0.3, top);
      c.lineTo(x + o.w * 0.3, top - 12);
      c.lineTo(x + o.w * 0.7, top - 12);
      c.lineTo(x + o.w * 0.7, top);
      c.stroke();
      c.strokeStyle = 'rgba(58,42,18,.35)';
      c.beginPath();
      c.moveTo(x + 10, top + o.h * 0.5);
      c.lineTo(x + o.w - 10, top + o.h * 0.5);
      c.stroke();
      c.fillStyle = '#fff8e1';
      rr(c, x + o.w * 0.55, top + 8, o.w * 0.3, 14, 4);
      c.fill();
    }
  }
  for (const s of g.st) {
    c.save();
    c.translate(s.x, s.y + Math.sin(g.t * 5 + s.x) * 4);
    c.fillStyle = '#ffd23f';
    c.strokeStyle = INK;
    c.lineWidth = 3.5;
    c.beginPath();
    for (let i = 0; i < 10; i++) {
      const a = -1.571 + i * 0.6283,
        r = i % 2 ? 10 : 22;
      c.lineTo(Math.cos(a) * r, Math.sin(a) * r);
    }
    c.closePath();
    c.fill();
    c.stroke();
    c.restore();
  }
  for (const f of g.fx) {
    c.globalAlpha = f.life / 0.6;
    c.fillStyle = INK;
    c.font = '700 26px Fredoka, sans-serif';
    c.fillText('+25', f.x - 20, f.y - 30 * (1 - f.life));
    c.globalAlpha = 1;
  }
  const feet = g.gy + g.y,
    bob = g.y < 0 || g.dead ? 0 : Math.abs(Math.sin(g.t * 14)) * -6;
  c.fillStyle = 'rgba(0,0,0,.15)';
  c.beginPath();
  c.ellipse(130, g.gy + 4, 44 * (1 + g.y / 600), 8, 0, 0, 6.283);
  c.fill();
  c.save();
  c.translate(130, feet + bob);
  if (g.y < 0) c.rotate(-0.12);
  if (g.dead) c.rotate(0.5);
  c.scale(0.25, 0.25);
  if (g.I.dog.complete) c.drawImage(g.I.dog, -274, -512);
  c.restore();
  hud(c, score, null);
  c.font = '600 26px Fredoka, sans-serif';
  c.textAlign = 'right';
  c.fillStyle = INK;
  c.textBaseline = 'middle';
  c.fillText(`★ ${g.stars}`, 600, 44);
  c.textAlign = 'left';
  if (g.t < 0) banner(c, g.t < -0.7 ? 'Ready…' : 'Go!', 'Tap to jump');
}
