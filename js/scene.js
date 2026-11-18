/* scene */
function stall(x, label, sw, c) {
  let s = `<g transform="translate(${x} 0)"><rect x="6" y="138" width="98" height="80" fill="#ffcf6b"/><rect x="6" y="138" width="98" height="80" fill="#b8540f" opacity=".25"/>`;
  for (let i = 0; i < 5; i++)
    s += `<circle cx="${18 + i * 19}" cy="178" r="6" fill="${i % 2 ? '#ffe9a8' : c}" stroke="#5a3320" stroke-width="1.5"/>`;
  s += `<rect x="0" y="134" width="8" height="86" fill="#6b3f22"/><rect x="102" y="134" width="8" height="86" fill="#6b3f22"/><rect x="-3" y="186" width="116" height="34" rx="3" fill="#8a5530"/><rect x="-3" y="186" width="116" height="6" fill="#ad6d3e"/><path d="M-3 200h116M-3 210h116" stroke="#6b3f22" stroke-width="1.5"/>`;
  for (let i = 0; i < 6; i++) {
    const xx = -5 + i * 20,
      col = i % 2 ? '#fff3d6' : '#d8344a';
    s += `<rect x="${xx}" y="118" width="20" height="20" fill="${col}"/><circle cx="${xx + 10}" cy="138" r="10" fill="${col}"/>`;
  }
  s += `<path d="M-9 120L55 90L119 120Z" fill="#5a3320"/><path d="M-8 119L55 90L118 119" stroke="#fff" stroke-width="7" fill="none" stroke-linecap="round" stroke-linejoin="round"/>`;
  s += `</g>`;
  return s;
}
function buildScene() {
  let s = '<g id="stars">';
  for (let i = 0; i < 16; i++)
    s += `<circle cx="${f(rnd(5, 355))}" cy="${f(rnd(4, 95))}" r="${f(rnd(0.6, 1.5))}" fill="#fff8e1" opacity="${f(rnd(0.4, 0.9))}"/>`;
  s += '</g>';
  s += `<path id="roofs" d="M0 200V150l26-18 26 18v-8l32-24 32 24v12l20-14 24 16 30-22 30 22 22-16 26 18v-10l28-20 28 20 36-14V200Z" fill="#163a2e"/>`;
  s += `<ellipse id="glowE" cx="180" cy="180" rx="140" ry="95" fill="url(#glow)"/>`;
  s += `<rect x="174" y="186" width="12" height="30" fill="#5a3320"/><path d="M180 72L212 126H148ZM180 98L224 158H136ZM180 126L236 192H124Z" fill="#1f6b4a" stroke="#123f2c" stroke-width="2" stroke-linejoin="round"/>`;
  [
    [168, 116],
    [194, 112],
    [152, 150],
    [204, 146],
    [180, 138],
    [140, 184],
    [166, 176],
    [196, 180],
    [222, 184]
  ].forEach(
    ([x, y], i) =>
      (s += `<circle class="bulb" cx="${x}" cy="${y}" r="3" fill="${i % 3 ? '#ffd23f' : '#d8344a'}" style="animation-delay:${f(i * 0.3)}s"/>`)
  );
  s += `<g transform="translate(156 46) scale(.5)">${G.star}</g>`;
  s += stall(6, 'SOM TAM', 64, '#7fbf3a') + stall(244, 'STEAK · BURGER', 90, '#c98b4a');
  for (const [x0, x2] of [
    [-10, 180],
    [180, 370]
  ]) {
    const c = [(x0 + x2) / 2, 96];
    s += `<path d="M${x0} 28Q${c[0]} ${c[1]} ${x2} 28" stroke="#2a1a10" stroke-width="1.5" fill="none"/>`;
    for (let t = 0.1; t < 0.95; t += 0.12) {
      const x = (1 - t) ** 2 * x0 + 2 * (1 - t) * t * c[0] + t * t * x2,
        y = (1 - t) ** 2 * 28 + 2 * (1 - t) * t * c[1] + t * t * 28,
        col = Math.round(t * 10) % 3 ? '#ffd23f' : '#fff3c4';
      s += `<g class="bulb" style="animation-delay:${f(rnd(0, 2))}s"><circle cx="${f(x)}" cy="${f(y + 5)}" r="9" fill="${col}" opacity=".22"/><ellipse cx="${f(x)}" cy="${f(y + 5)}" rx="3.4" ry="4.4" fill="${col}"/></g><rect x="${f(x - 1.8)}" y="${f(y - 1)}" width="3.6" height="3" fill="#2a1a10"/>`;
    }
  }
  s += `<path d="M0 216Q90 206 180 214T360 210V300H0Z" fill="url(#snowg)"/><path d="M0 216Q90 206 180 214T360 210" stroke="#fff" stroke-width="3" fill="none"/>`;
  $('#back').innerHTML = s;
  let w = '';
  for (let i = 0; i < 30; i++)
    w += `<circle class="flake" cx="${f(rnd(0, 360))}" cy="0" r="${f(rnd(0.9, 2.6))}" fill="#fff" opacity="${f(rnd(0.6, 0.95))}" style="animation-duration:${f(rnd(7, 14))}s;animation-delay:-${f(rnd(0, 14))}s;--d:${f(rnd(-24, 24))}px"/>`;
  $('#snow').innerHTML = w;
}

/* fur tufts */
let tufts = [],
  tid = 0;
function spawnFur(n) {
  for (let i = 0; i < n && tufts.length < 6; i++) {
    const left = Math.random() < 0.5;
    tufts.push({ id: ++tid, x: left ? rnd(22, 118) : rnd(242, 338), y: rnd(236, 288) });
  }
  drawFur();
}
function drawFur() {
  $('#fur').innerHTML = tufts
    .map(
      t =>
        `<g class="tuft" data-t="${t.id}" transform="translate(${f(t.x - 14)} ${f(t.y - 14)}) scale(.6)"><circle cx="24" cy="26" r="26" fill="transparent"/>${G.tuft}</g>`
    )
    .join('');
}
function grabFur(id) {
  tufts = tufts.filter(t => t.id !== id);
  drawFur();
  sfx('fur');
  S.fur++;
  prog('fur');
  if (S.fur === 60) toast('Unlocked in the closet: Fur beanie');
  else if (Math.random() < 0.2) say('So much fluff… sorry, Ploy!');
  render();
}
