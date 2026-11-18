/* ---------- Fluffy Pop ---------- */
function popStart() {
  open(
    `<h2>Fluffy Pop</h2><p class="sub">Swipe across 3 or more of the same pup. Long chains make a star!</p><canvas id="mgc" class="cg" width="640" height="720"></canvas><div class="row"><button class="btn ghost" data-a="mgstop">Stop</button></div>`,
    'game',
    true,
    true
  );
  const cv = $('#mgc'),
    c = cv.getContext('2d'),
    I = pupImgs();
  const g = (MG = {
    id: 'pop',
    run: true,
    c,
    cv,
    I,
    balls: [],
    chain: [],
    score: 0,
    t: 62,
    gauge: 0,
    combo: 0,
    lastPop: -9,
    fx: [],
    uid: 0,
    pt: null,
    start: performance.now(),
    last: performance.now(),
    L: 16,
    R: 624,
    T: 96,
    B: 704
  });
  const add = y => {
    g.balls.push({
      id: ++g.uid,
      k: pick(PUPS),
      r: rnd(39, 45),
      x: rnd(g.L + 44, g.R - 44),
      y: y,
      vx: rnd(-30, 30),
      vy: 0
    });
  };
  for (let i = 0; i < 50; i++) add(-60 - i * 40);
  g.end = () => {
    g.t = 0;
  };
  const pick1 = (x, y) => {
    let best = null,
      bd = 1e9;
    for (const b of g.balls) {
      const d = Math.hypot(b.x - x, b.y - y);
      if (d < b.r * 1.05 && d < bd) {
        bd = d;
        best = b;
      }
    }
    return best;
  };
  const down = e => {
    if (!g.run || g.t <= 0 || g.t > 60) return;
    const [x, y] = mgPt(cv, e);
    if (x > 520 && y < 88 && g.gauge >= 1) {
      burst(g, x, y);
      return;
    }
    const b = pick1(x, y);
    if (!b) return;
    g.chain = [b];
    g.pt = [x, y];
    sfx('tap');
  };
  const move = e => {
    if (!g.chain.length) return;
    const [x, y] = mgPt(cv, e);
    g.pt = [x, y];
    const b = pick1(x, y),
      last = g.chain[g.chain.length - 1];
    if (!b || b === last) return;
    if (g.chain.length > 1 && b === g.chain[g.chain.length - 2]) {
      g.chain.pop();
      return;
    }
    if (last.k === 'star' || b.k !== g.chain[0].k || g.chain.includes(b)) return;
    if (Math.hypot(b.x - last.x, b.y - last.y) > (b.r + last.r) * 1.45) return;
    g.chain.push(b);
    sfx('pat');
  };
  const up = () => {
    if (!g.chain.length) return;
    const ch = g.chain;
    g.chain = [];
    g.pt = null;
    if (ch.length === 1 && ch[0].k === 'star') {
      starPop(g, ch[0]);
      return;
    }
    if (ch.length < 3) return;
    popChain(g, ch);
  };
  cv.addEventListener('pointerdown', down);
  cv.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
  window.addEventListener('pointercancel', up);
  g.cleanup = () => {
    window.removeEventListener('pointerup', up);
    window.removeEventListener('pointercancel', up);
  };
  requestAnimationFrame(popLoop);
}
function popFx(g, b, col) {
  for (let i = 0; i < 7; i++) {
    const a = Math.random() * 6.28,
      s = rnd(80, 220);
    g.fx.push({ x: b.x, y: b.y, vx: Math.cos(a) * s, vy: Math.sin(a) * s - 60, life: 0.6, col });
  }
  g.fx.push({ x: b.x, y: b.y, ring: 1, life: 0.35, r: b.r });
}
function popChain(g, ch) {
  const n = ch.length,
    now = g.t;
  g.combo = g.lastPop - now < 2.4 && g.lastPop >= now ? g.combo + 1 : 1;
  g.lastPop = now;
  const pts = Math.round(n * n * 20 * (1 + (g.combo - 1) * 0.1));
  g.score += pts;
  g.gauge = Math.min(1, g.gauge + (n * (ch[0].k === 'samo' ? 2 : 1)) / 26);
  ch.forEach((b, i) =>
    setTimeout(() => {
      g.balls = g.balls.filter(x => x !== b);
      popFx(g, b, ['#ffd23f', '#ff8fa3', '#fff', '#7cc4ee'][i % 4]);
      sfx(i % 2 ? 'fur' : 'pat');
    }, i * 45)
  );
  const last = ch[n - 1];
  g.fx.push({
    x: last.x,
    y: last.y - 20,
    txt: `+${pts}${g.combo > 1 ? '  combo ' + g.combo : ''}`,
    life: 1.1,
    vy: -60
  });
  if (n >= 7)
    setTimeout(
      () => g.balls.push({ id: ++g.uid, k: 'star', r: 38, x: last.x, y: last.y - 10, vx: 0, vy: -120 }),
      n * 45 + 40
    );
  setTimeout(
    () => {
      for (let i = 0; i < n; i++)
        g.balls.push({
          id: ++g.uid,
          k: pick(PUPS),
          r: rnd(39, 45),
          x: rnd(g.L + 44, g.R - 44),
          y: -50 - i * 46,
          vx: rnd(-30, 30),
          vy: 0
        });
    },
    n * 45 + 120
  );
  if (n >= 5) sfx('coin');
}
function popArea(g, cx, cy, rad, each) {
  const hit = g.balls.filter(b => Math.hypot(b.x - cx, b.y - cy) < rad);
  const pts = hit.length * each;
  g.score += pts;
  hit.forEach((b, i) =>
    setTimeout(() => {
      g.balls = g.balls.filter(x => x !== b);
      popFx(g, b, '#ffd23f');
      sfx('fur');
    }, i * 30)
  );
  g.fx.push({ x: cx, y: cy, txt: `+${pts}`, life: 1.2, vy: -60 });
  g.fx.push({ x: cx, y: cy, ring: 1, life: 0.5, r: rad * 0.5 });
  setTimeout(
    () => {
      for (let i = 0; i < hit.length; i++)
        g.balls.push({
          id: ++g.uid,
          k: pick(PUPS),
          r: rnd(39, 45),
          x: rnd(g.L + 44, g.R - 44),
          y: -50 - i * 46,
          vx: rnd(-30, 30),
          vy: 0
        });
    },
    hit.length * 30 + 120
  );
}
function starPop(g, b) {
  sfx('level');
  popArea(g, b.x, b.y, 170, 120);
}
function burst(g) {
  g.gauge = 0;
  sfx('level');
  setTimeout(() => sfx('yip'), 300);
  popArea(g, 320, (g.T + g.B) / 2 + 60, 210, 150);
}
function popStep(g, dt) {
  const sub = 4,
    h = dt / sub,
    G = 2000;
  for (let s = 0; s < sub; s++) {
    for (const b of g.balls) {
      b.vy += G * h;
      b.vx *= 0.996;
      b.x += b.vx * h;
      b.y += b.vy * h;
      if (b.x < g.L + b.r) {
        b.x = g.L + b.r;
        b.vx = Math.abs(b.vx) * 0.2;
      }
      if (b.x > g.R - b.r) {
        b.x = g.R - b.r;
        b.vx = -Math.abs(b.vx) * 0.2;
      }
      if (b.y > g.B - b.r) {
        b.y = g.B - b.r;
        b.vy = -Math.abs(b.vy) * 0.12;
        b.vx *= 0.92;
      }
    }
    const B = g.balls,
      n = B.length;
    for (let i = 0; i < n; i++) {
      const a = B[i];
      for (let j = i + 1; j < n; j++) {
        const b = B[j],
          dx = b.x - a.x,
          dy = b.y - a.y,
          rs = a.r + b.r;
        if (Math.abs(dx) > rs || Math.abs(dy) > rs) continue;
        const d2 = dx * dx + dy * dy;
        if (d2 >= rs * rs || d2 === 0) continue;
        const d = Math.sqrt(d2),
          nx = dx / d,
          ny = dy / d,
          ov = (rs - d) * 0.5;
        a.x -= nx * ov;
        a.y -= ny * ov;
        b.x += nx * ov;
        b.y += ny * ov;
        const rv = (b.vx - a.vx) * nx + (b.vy - a.vy) * ny;
        if (rv < 0) {
          const j2 = -rv * 0.55;
          a.vx -= nx * j2;
          a.vy -= ny * j2;
          b.vx += nx * j2;
          b.vy += ny * j2;
        }
      }
    }
  }
}
function popLoop(now) {
  const g = MG;
  if (!g || g.id !== 'pop' || !g.run) return;
  const dt = Math.min(0.033, (now - g.last) / 1000);
  g.last = now;
  g.t -= dt;
  popStep(g, dt);
  for (const f of g.fx) {
    f.life -= dt;
    if (f.vx != null) {
      f.x += f.vx * dt;
      f.y += f.vy * dt;
      f.vy += 500 * dt;
    } else if (f.vy) f.y += f.vy * dt;
  }
  g.fx = g.fx.filter(f => f.life > 0);
  popDraw(g);
  if (g.t <= 0) {
    g.run = false;
    g.chain = [];
    popDraw(g);
    banner(g.c, "Time's up!", `Score ${g.score}`);
    setTimeout(
      () => mgEnd('pop', g.score, g.score / 250, `${T('{n}')} popped pups all over the place.`),
      1400
    );
    return;
  }
  requestAnimationFrame(popLoop);
}
function popDraw(g) {
  const c = g.c,
    I = g.I;
  const bg = c.createLinearGradient(0, 0, 0, 720);
  bg.addColorStop(0, '#fff3cf');
  bg.addColorStop(1, '#ffe08a');
  c.fillStyle = bg;
  c.fillRect(0, 0, 640, 720);
  c.fillStyle = 'rgba(255,255,255,.55)';
  rr(c, g.L - 4, g.T - 6, g.R - g.L + 8, g.B - g.T + 12, 30);
  c.fill();
  for (const b of g.balls) {
    const on = g.chain.includes(b),
      s = (b.r / 42) * (on ? 1.12 : 1),
      w = 120 * s,
      h = 128 * s;
    if (I[b.k].complete) c.drawImage(I[b.k], b.x - 60 * s, b.y - 78 * s, w, h);
  }
  if (g.chain.length) {
    c.lineCap = 'round';
    c.lineJoin = 'round';
    const pts = g.chain.map(b => [b.x, b.y]);
    if (g.pt) pts.push(g.pt);
    for (const [w, col] of [
      [20, 'rgba(58,42,18,.35)'],
      [12, '#ffd23f']
    ]) {
      c.strokeStyle = col;
      c.lineWidth = w;
      c.beginPath();
      pts.forEach(([x, y], i) => (i ? c.lineTo(x, y) : c.moveTo(x, y)));
      c.stroke();
    }
    for (const b of g.chain) {
      c.strokeStyle = '#ffd23f';
      c.lineWidth = 6;
      c.beginPath();
      c.arc(b.x, b.y, b.r + 4, 0, 6.283);
      c.stroke();
    }
    c.fillStyle = INK;
    c.font = '700 34px Fredoka, sans-serif';
    c.textAlign = 'center';
    const l = g.chain[g.chain.length - 1];
    c.fillText(g.chain.length, l.x, l.y - l.r - 18);
    c.textAlign = 'left';
  }
  for (const f of g.fx) {
    c.globalAlpha = Math.min(1, f.life * 2);
    if (f.txt) {
      c.fillStyle = INK;
      c.font = '700 30px Fredoka, sans-serif';
      c.textAlign = 'center';
      c.strokeStyle = '#fff';
      c.lineWidth = 6;
      c.strokeText(f.txt, f.x, f.y);
      c.fillText(f.txt, f.x, f.y);
      c.textAlign = 'left';
    } else if (f.ring) {
      c.strokeStyle = '#ffd23f';
      c.lineWidth = 6;
      c.beginPath();
      c.arc(f.x, f.y, f.r * (1.6 - f.life), 0, 6.283);
      c.stroke();
    } else {
      c.fillStyle = f.col;
      c.beginPath();
      c.arc(f.x, f.y, 6, 0, 6.283);
      c.fill();
    }
  }
  c.globalAlpha = 1;
  hud(c, g.score, Math.min(60, g.t));
  const cx = 572,
    cy = 44;
  c.fillStyle = g.gauge >= 1 ? '#ffd23f' : '#fff';
  c.beginPath();
  c.arc(cx, cy, 30, 0, 6.283);
  c.fill();
  c.strokeStyle = '#efdfae';
  c.lineWidth = 7;
  c.beginPath();
  c.arc(cx, cy, 30, 0, 6.283);
  c.stroke();
  c.strokeStyle = g.gauge >= 1 ? '#d8344a' : '#ffc21a';
  c.beginPath();
  c.arc(cx, cy, 30, -1.571, -1.571 + 6.283 * g.gauge);
  c.stroke();
  if (I.samo.complete) c.drawImage(I.samo, cx - 24, cy - 31, 48, 51);
  if (g.gauge >= 1) {
    c.fillStyle = '#d8344a';
    c.font = '700 18px Fredoka, sans-serif';
    c.textAlign = 'center';
    c.fillText('TAP!', cx, cy + 44);
    c.textAlign = 'left';
  }
  if (g.t > 60) {
    banner(c, 'Ready…', 'Swipe matching pups!');
  }
}
