/* ---------- Pack the Suitcase ---------- */
const PACKLV = [
  [4, 3, 2, 3],
  [5, 3, 2, 3],
  [5, 4, 2, 4],
  [6, 4, 2, 4],
  [6, 5, 2, 5],
  [7, 5, 3, 5],
  [7, 6, 3, 5],
  [8, 6, 3, 5]
];
const PCOL = [
  '#ff8fa3',
  '#7cc4ee',
  '#ffd23f',
  '#9ccc65',
  '#c3a6ff',
  '#ff9a5c',
  '#f6b5ad',
  '#d8344a',
  '#5fb8a8',
  '#e9a640',
  '#b8d4f0'
];
function partition(W, H, mn, mx) {
  for (let tries = 0; tries < 60; tries++) {
    const own = Array.from({ length: H }, () => Array(W).fill(-1)),
      P = [];
    let ok = true;
    const cells = [];
    for (let y = 0; y < H; y++) for (let x = 0; x < W; x++) cells.push([x, y]);
    for (const [sx, sy] of cells.sort(() => Math.random() - 0.5)) {
      if (own[sy][sx] >= 0) continue;
      const id = P.length,
        sz = Math.floor(rnd(mn, mx + 1)),
        pc = [[sx, sy]];
      own[sy][sx] = id;
      while (pc.length < sz) {
        const fr = [];
        for (const [x, y] of pc)
          for (const [dx, dy] of [
            [1, 0],
            [-1, 0],
            [0, 1],
            [0, -1]
          ]) {
            const nx = x + dx,
              ny = y + dy;
            if (nx >= 0 && ny >= 0 && nx < W && ny < H && own[ny][nx] < 0) fr.push([nx, ny]);
          }
        if (!fr.length) break;
        const [nx, ny] = pick(fr);
        own[ny][nx] = id;
        pc.push([nx, ny]);
      }
      P.push(pc);
    }
    /* merge single cells into a neighbour */
    for (let i = 0; i < P.length; i++) {
      if (P[i].length > 1) continue;
      const [x, y] = P[i][0];
      const nb = [
        [1, 0],
        [-1, 0],
        [0, 1],
        [0, -1]
      ]
        .map(([dx, dy]) => [x + dx, y + dy])
        .filter(([a, b]) => a >= 0 && b >= 0 && a < W && b < H)
        .map(([a, b]) => own[b][a])
        .filter(j => j !== i && P[j].length < mx + 1);
      if (!nb.length) {
        ok = false;
        break;
      }
      const j = pick(nb);
      P[j].push([x, y]);
      own[y][x] = j;
      P[i] = [];
    }
    if (ok) return P.filter(p => p.length);
  }
  return null;
}
const norm = cs => {
  const mx = Math.min(...cs.map(c => c[0])),
    my = Math.min(...cs.map(c => c[1]));
  return cs.map(([x, y]) => [x - mx, y - my]);
};
const rot = cs => norm(cs.map(([x, y]) => [-y, x]));
function packStart() {
  open(
    `<h2>Pack the Suitcase</h2><p class="sub">Drag everything into the suitcase. Tap a piece to turn it.</p><canvas id="mgc" class="cg" width="640" height="720"></canvas><div class="row"><button class="btn ghost" data-a="mgstop">Stop</button></div>`,
    'game',
    true,
    true
  );
  const cv = $('#mgc'),
    c = cv.getContext('2d');
  const g = (MG = {
    id: 'pack',
    run: true,
    c,
    cv,
    lv: 0,
    score: 0,
    pieces: [],
    drag: null,
    last: performance.now(),
    msg: null,
    over: false
  });
  g.end = () => {
    g.over = true;
  };
  const hitPiece = (x, y) => {
    for (const p of g.pieces) {
      if (p.at) {
        for (const [cx, cy] of p.cells) {
          const X = g.gx + (p.at[0] + cx) * g.cs,
            Y = g.gy + (p.at[1] + cy) * g.cs;
          if (x >= X && x < X + g.cs && y >= Y && y < Y + g.cs) return [p, X - cx * g.cs, Y - cy * g.cs, 1];
        }
      } else {
        for (const [cx, cy] of p.cells) {
          const X = p.tx + cx * g.ts,
            Y = p.ty + cy * g.ts;
          if (x >= X - 4 && x < X + g.ts + 4 && y >= Y - 4 && y < Y + g.ts + 4)
            return [p, p.tx, p.ty, g.ts / g.cs];
        }
      }
    }
    return null;
  };
  const down = e => {
    if (g.msg || g.over) return;
    const [x, y] = mgPt(cv, e),
      h = hitPiece(x, y);
    if (!h) return;
    const [p, ox, oy, k] = h;
    g.drag = {
      p,
      fromGrid: !!p.at,
      ox: (x - ox) / k,
      oy: (y - oy) / k,
      x0: x,
      y0: y,
      x: x - (x - ox) / k,
      y: y - (y - oy) / k,
      moved: false
    };
    if (p.at) p.at = null;
    sfx('tap');
  };
  const move = e => {
    const d = g.drag;
    if (!d) return;
    const [x, y] = mgPt(cv, e);
    if (Math.hypot(x - d.x0, y - d.y0) > 10) d.moved = true;
    d.x = x - d.ox;
    d.y = y - d.oy - (e.pointerType === 'touch' && d.moved ? 40 : 0);
  };
  const up = () => {
    const d = g.drag;
    if (!d) return;
    g.drag = null;
    const p = d.p;
    if (!d.moved) {
      if (d.fromGrid) {
        layoutTray(g);
        sfx('squeak');
      } else {
        p.cells = rot(p.cells);
        layoutTray(g);
        sfx('pat');
      }
      return;
    }
    const ax = Math.round((d.x - g.gx) / g.cs),
      ay = Math.round((d.y - g.gy) / g.cs);
    if (fits(g, p, ax, ay)) {
      p.at = [ax, ay];
      sfx('fur');
      layoutTray(g);
      if (g.pieces.every(q => q.at)) packClear(g);
    } else {
      layoutTray(g);
      sfx('no');
    }
  };
  cv.addEventListener('pointerdown', down);
  cv.addEventListener('pointermove', move);
  window.addEventListener('pointerup', up);
  window.addEventListener('pointercancel', up);
  g.cleanup = () => {
    window.removeEventListener('pointerup', up);
    window.removeEventListener('pointercancel', up);
  };
  packLevel(g);
  requestAnimationFrame(packLoop);
}
function fits(g, p, ax, ay) {
  for (const [cx, cy] of p.cells) {
    const x = ax + cx,
      y = ay + cy;
    if (x < 0 || y < 0 || x >= g.W || y >= g.H) return false;
    for (const q of g.pieces)
      if (q !== p && q.at && q.cells.some(([qx, qy]) => q.at[0] + qx === x && q.at[1] + qy === y))
        return false;
  }
  return true;
}
function packLevel(g) {
  const L = PACKLV[Math.min(g.lv, PACKLV.length - 1)];
  g.W = L[0];
  g.H = L[1];
  const P =
    partition(g.W, g.H, L[2], L[3]) ||
    Array.from({ length: g.H }, (_, y) => {
      const r = [];
      for (let x = 0; x < g.W; x += 2)
        r.push(
          x + 1 < g.W
            ? [
                [x, y],
                [x + 1, y]
              ]
            : [[x, y]]
        );
      return r;
    }).flat();
  g.cs = Math.min(78, Math.floor(560 / g.W), Math.floor(310 / g.H));
  g.gx = Math.round((640 - g.W * g.cs) / 2);
  g.gy = Math.round(118 + (320 - g.H * g.cs) / 2);
  const cols = [...PCOL].sort(() => Math.random() - 0.5);
  g.pieces = P.map((cs, i) => {
    let c2 = norm(cs);
    for (let r = Math.floor(rnd(0, 4)); r > 0; r--) c2 = rot(c2);
    return { cells: c2, col: cols[i % cols.length], at: null };
  }).sort(() => Math.random() - 0.5);
  g.limit = 25 + g.W * g.H * 1.6;
  g.t = g.limit;
  layoutTray(g);
}
function layoutTray(g) {
  for (let ts = Math.min(46, Math.round(g.cs * 0.62)); ts >= 18; ts -= 2) {
    g.ts = ts;
    let x = 24,
      y = 468,
      rowH = 0;
    for (const p of g.pieces) {
      if (p.at) continue;
      const w = (Math.max(...p.cells.map(c => c[0])) + 1) * ts,
        h = (Math.max(...p.cells.map(c => c[1])) + 1) * ts;
      if (x + w > 616) {
        x = 24;
        y += rowH + 14;
        rowH = 0;
      }
      p.tx = x;
      p.ty = y;
      x += w + 16;
      rowH = Math.max(rowH, h);
    }
    if (y + rowH <= 700) return;
  }
}
function packClear(g) {
  const bonus = Math.round(g.t) * 5,
    pts = (g.lv + 1) * 100 + bonus;
  g.score += pts;
  g.msg = { t: 'Packed!', s: `+${pts} · time bonus ${bonus}`, until: performance.now() + 1500 };
  sfx('level');
  setTimeout(() => {
    if (MG !== g) return;
    g.lv++;
    g.msg = null;
    packLevel(g);
  }, 1500);
}
function packLoop(now) {
  const g = MG;
  if (!g || g.id !== 'pack' || !g.run) return;
  const dt = Math.min(0.05, (now - g.last) / 1000);
  g.last = now;
  if (!g.msg && !g.over) g.t -= dt;
  packDraw(g);
  if ((g.t <= 0 && !g.msg) || g.over) {
    g.run = false;
    g.drag = null;
    packDraw(g);
    banner(g.c, g.over ? 'Done!' : 'Boarding closed!', `Score ${g.score}`);
    setTimeout(
      () =>
        mgEnd(
          'pack',
          g.score,
          g.score / 30,
          `Packed ${g.lv} suitcase${g.lv === 1 ? '' : 's'}${g.lv ? " for Ploy's flights" : ''}.`
        ),
      1400
    );
    return;
  }
  requestAnimationFrame(packLoop);
}
function drawPiece(c, p, X, Y, s, ghost) {
  const pad = Math.max(2, s * 0.05),
    has = (x, y) => p.cells.some(q => q[0] === x && q[1] === y);
  c.globalAlpha = ghost ? 0.45 : 1;
  for (const [x, y] of p.cells) {
    c.fillStyle = 'rgba(58,42,18,.25)';
    c.fillRect(X + x * s + pad, Y + y * s + pad + 3, s - 2 * pad, s - 2 * pad);
  }
  c.fillStyle = p.col;
  for (const [x, y] of p.cells) {
    rr(c, X + x * s + pad, Y + y * s + pad, s - 2 * pad, s - 2 * pad, s * 0.18);
    c.fill();
    if (has(x + 1, y)) c.fillRect(X + x * s + s / 2, Y + y * s + pad, s, s - 2 * pad);
    if (has(x, y + 1)) c.fillRect(X + x * s + pad, Y + y * s + s / 2, s - 2 * pad, s);
  }
  c.strokeStyle = 'rgba(58,42,18,.55)';
  c.lineWidth = Math.max(2, s * 0.05);
  for (const [x, y] of p.cells) {
    c.beginPath();
    if (!has(x, y - 1)) {
      c.moveTo(X + x * s + pad, Y + y * s + pad);
      c.lineTo(X + x * s + s - pad, Y + y * s + pad);
    }
    if (!has(x, y + 1)) {
      c.moveTo(X + x * s + pad, Y + y * s + s - pad);
      c.lineTo(X + x * s + s - pad, Y + y * s + s - pad);
    }
    if (!has(x - 1, y)) {
      c.moveTo(X + x * s + pad, Y + y * s + pad);
      c.lineTo(X + x * s + pad, Y + y * s + s - pad);
    }
    if (!has(x + 1, y)) {
      c.moveTo(X + x * s + s - pad, Y + y * s + pad);
      c.lineTo(X + x * s + s - pad, Y + y * s + s - pad);
    }
    c.stroke();
  }
  const [hx, hy] = p.cells[0];
  c.fillStyle = 'rgba(255,255,255,.6)';
  c.beginPath();
  c.arc(X + hx * s + s * 0.32, Y + hy * s + s * 0.32, s * 0.09, 0, 6.283);
  c.fill();
  c.globalAlpha = 1;
}
function packDraw(g) {
  const c = g.c;
  c.fillStyle = '#fff3cf';
  c.fillRect(0, 0, 640, 720);
  const bx = g.gx - 22,
    by = g.gy - 22,
    bw = g.W * g.cs + 44,
    bh = g.H * g.cs + 44;
  c.lineWidth = 5;
  c.strokeStyle = INK;
  c.fillStyle = '#8a5530';
  rr(c, 320 - 50, by - 30, 100, 40, 14);
  c.fill();
  c.stroke();
  c.fillStyle = '#fff3cf';
  rr(c, 320 - 32, by - 16, 64, 18, 8);
  c.fill();
  c.fillStyle = '#d8344a';
  rr(c, bx, by, bw, bh, 26);
  c.fill();
  c.stroke();
  c.fillStyle = '#b82a3e';
  c.fillRect(bx + bw * 0.22, by, 10, bh);
  c.fillRect(bx + bw * 0.78 - 10, by, 10, bh);
  c.fillStyle = '#fff8e1';
  rr(c, g.gx - 6, g.gy - 6, g.W * g.cs + 12, g.H * g.cs + 12, 14);
  c.fill();
  c.strokeStyle = '#efdfae';
  c.lineWidth = 2;
  for (let x = 0; x <= g.W; x++) {
    c.beginPath();
    c.moveTo(g.gx + x * g.cs, g.gy);
    c.lineTo(g.gx + x * g.cs, g.gy + g.H * g.cs);
    c.stroke();
  }
  for (let y = 0; y <= g.H; y++) {
    c.beginPath();
    c.moveTo(g.gx, g.gy + y * g.cs);
    c.lineTo(g.gx + g.W * g.cs, g.gy + y * g.cs);
    c.stroke();
  }
  if (g.drag && g.drag.moved) {
    const d = g.drag,
      ax = Math.round((d.x - g.gx) / g.cs),
      ay = Math.round((d.y - g.gy) / g.cs);
    if (fits(g, d.p, ax, ay)) drawPiece(c, d.p, g.gx + ax * g.cs, g.gy + ay * g.cs, g.cs, true);
  }
  for (const p of g.pieces) {
    if (p.at && (!g.drag || g.drag.p !== p))
      drawPiece(c, p, g.gx + p.at[0] * g.cs, g.gy + p.at[1] * g.cs, g.cs);
  }
  c.fillStyle = 'rgba(255,255,255,.6)';
  rr(c, 12, 450, 616, 258, 22);
  c.fill();
  for (const p of g.pieces) {
    if (!p.at && (!g.drag || g.drag.p !== p)) drawPiece(c, p, p.tx, p.ty, g.ts);
  }
  if (g.drag) {
    const d = g.drag;
    drawPiece(c, d.p, d.moved ? d.x : d.p.tx, d.moved ? d.y : d.p.ty, d.moved ? g.cs : g.ts);
  }
  hud(c, g.score, null);
  c.fillStyle = INK;
  c.font = '600 26px Fredoka, sans-serif';
  c.textAlign = 'center';
  c.textBaseline = 'middle';
  c.fillText(`Suitcase ${g.lv + 1}`, 320, 44);
  c.textAlign = 'right';
  c.fillStyle = g.t < 10 ? '#d8344a' : INK;
  c.fillText(`${Math.max(0, Math.ceil(g.t))}s`, 604, 44);
  c.textAlign = 'left';
  const f = Math.max(0, g.t / g.limit);
  c.fillStyle = '#efdfae';
  rr(c, 24, 84, 592, 10, 5);
  c.fill();
  c.fillStyle = g.t < 10 ? '#d8344a' : '#ffc21a';
  rr(c, 24, 84, 592 * f, 10, 5);
  c.fill();
  if (g.msg) banner(c, g.msg.t, g.msg.s);
}
