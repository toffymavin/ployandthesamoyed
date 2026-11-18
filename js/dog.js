/* dog drawing */
function fl(cx, cy, rx, ry, n, r) {
  let o = '',
    w = '';
  for (let i = 0; i < n; i++) {
    const a = (i / n) * Math.PI * 2 + 0.2,
      x = f(cx + Math.cos(a) * rx),
      y = f(cy + Math.sin(a) * ry),
      rr = r * [0.9, 1.05, 1.15][i % 3];
    o += `<circle cx="${x}" cy="${y}" r="${f(rr + 3)}"/>`;
    w += `<circle cx="${x}" cy="${y}" r="${f(rr)}"/>`;
  }
  return [o, w + `<ellipse cx="${f(cx)}" cy="${f(cy)}" rx="${f(rx)}" ry="${f(ry)}"/>`];
}
function fluff(cx, cy, rx, ry, n, r) {
  const [o, w] = fl(cx, cy, rx, ry, n, r);
  return `<g fill="${OL}">${o}</g><g fill="${FUR}">${w}</g>`;
}
function face(m) {
  const K2 = '#1c1a19',
    st = `stroke="${K2}" stroke-width="6" fill="none" stroke-linecap="round" stroke-linejoin="round"`;
  if (m === 'happy') return '';
  let s = `<ellipse cx="316" cy="250" rx="55" ry="46" fill="#f6ebe6"/>`;
  const E = [
    [281.5, 221.5],
    [351.5, 231]
  ];
  const dot = ([x, y]) => `<circle cx="${x}" cy="${y}" r="7.5" fill="${K2}"/>`;
  const arc = ([x, y], d) =>
    `<path d="M${x - 9} ${y + (d > 0 ? -2 : 3)}Q${x} ${y + d} ${x + 9} ${y + (d > 0 ? -2 : 3)}" ${st}/>`;
  for (const e of E) {
    if (m === 'sleep') s += arc(e, 9);
    else if (m === 'tired')
      s += `<path d="M${e[0] - 9} ${e[1]}h18" ${st}/><path d="M${e[0] - 6} ${e[1] + 2}a6 5 0 0 0 12 0z" fill="${K2}"/>`;
    else s += dot(e);
  }
  if (m === 'sad')
    s += `<path d="M270 207L291 201M362 214L342 212" ${st}/><path d="M361 241q4 8 0 12q-4-4 0-12z" fill="#7cc4ee"/>`;
  s += `<path d="M299 236Q313 229 327 236Q326 249 313 252Q300 249 299 236Z" fill="${K2}"/>`;
  if (m === 'sad') s += `<path d="M298 272Q313 262 328 272" ${st}/>`;
  else if (m === 'hungry')
    s += `<ellipse cx="313" cy="266" rx="6" ry="8" fill="#6b2b2b" stroke="${K2}" stroke-width="4"/>`;
  else if (m === 'tired') s += `<path d="M302 266h22" ${st}/>`;
  else if (m === 'sleep') s += `<path d="M302 262Q313 270 324 262" ${st}/>`;
  else s += `<path d="M281 254Q296 268 313 257Q330 270 346 260" ${st}/>`;
  return s;
}
function neck(id, n, hr) {
  if (!id) return '';
  const a = f(hr * 0.78),
    b = f(hr * 0.74);
  const band = (fill, str, w) =>
    `<path d="M${-a} ${f(n - 6)}Q0 ${f(n + 10)} ${a} ${f(n - 6)}L${b} ${f(n + w)}Q0 ${f(n + w + 16)} ${-b} ${f(n + w)}Z" fill="${fill}" stroke="${str}" stroke-width="2.5" stroke-linejoin="round"/>`;
  if (id === 'scarf')
    return (
      band('#ffc21a', '#9a6b00', 6) +
      `<path d="M${f(hr * 0.28)} ${f(n + 10)}L${f(hr * 0.42)} ${f(n + 36)}L${f(hr * 0.7)} ${f(n + 30)}L${f(hr * 0.5)} ${f(n + 8)}Z" fill="#ffc21a" stroke="#9a6b00" stroke-width="2.5" stroke-linejoin="round"/><path d="M${f(hr * 0.34)} ${f(n + 20)}L${f(hr * 0.58)} ${f(n + 16)}M${f(hr * 0.38)} ${f(n + 28)}L${f(hr * 0.63)} ${f(n + 24)}" stroke="#e39b00" stroke-width="3"/>`
    );
  if (id === 'bell')
    return (
      band('#d8344a', '#7a1424', 2) +
      `<circle cx="0" cy="${f(n + 15)}" r="6.5" fill="#ffd23f" stroke="#9a6b00" stroke-width="2"/><path d="M-3 ${f(n + 16)}h6" stroke="#9a6b00" stroke-width="2"/>`
    );
  if (id === 'wings')
    return (
      band('#2c3e6b', '#141d36', 2) +
      `<g transform="translate(0 ${f(n + 12)})"><path d="M-2 0Q-10-6-18-3Q-11 1-2 3ZM2 0Q10-6 18-3Q11 1 2 3Z" fill="#f1c232" stroke="#8a6500" stroke-width="1.2"/><circle r="3.4" fill="#f1c232" stroke="#8a6500" stroke-width="1.2"/></g>`
    );
  if (id === 'sakura')
    return (
      band('#ffc2d4', '#b84d74', 6) +
      `<path d="M${f(hr * 0.28)} ${f(n + 10)}L${f(hr * 0.42)} ${f(n + 36)}L${f(hr * 0.7)} ${f(n + 30)}L${f(hr * 0.5)} ${f(n + 8)}Z" fill="#ffc2d4" stroke="#b84d74" stroke-width="2.5" stroke-linejoin="round"/>` +
      [
        [-22, 6],
        [-4, 10],
        [16, 7],
        [30, 24]
      ]
        .map(
          ([x, y]) =>
            `<g transform="translate(${x} ${n + y})" fill="#fff">${[0, 72, 144, 216, 288].map(r => `<circle cx="0" cy="-2.4" r="2" transform="rotate(${r})"/>`).join('')}<circle r="1.3" fill="#e8708e"/></g>`
        )
        .join('')
    );
  if (id === 'boba')
    return (
      band('#8b5a2b', '#4a2d14', 2) +
      `<path d="M2 ${n + 11}l4-9" stroke="#d8344a" stroke-width="2.4" stroke-linecap="round"/><path d="M-7 ${n + 10}h14l-2 17h-10z" fill="#f3d9b1" stroke="#4a2d14" stroke-width="1.8" stroke-linejoin="round"/><circle cx="-2" cy="${n + 23}" r="1.8" fill="#3a2010"/><circle cx="2.4" cy="${n + 24}" r="1.8" fill="#3a2010"/><circle cx="0" cy="${n + 20}" r="1.6" fill="#3a2010"/>`
    );
  if (id === 'lantern')
    return (
      band('#d8344a', '#7a1424', 2) +
      `<path d="M0 ${n + 8}v4" stroke="#f1c232" stroke-width="1.6"/><ellipse cx="0" cy="${n + 21}" rx="8" ry="9" fill="#e23b3b" stroke="#7a1424" stroke-width="1.8"/><path d="M-3 ${n + 12.5}q-3 8.5 0 17M3 ${n + 12.5}q3 8.5 0 17" stroke="#7a1424" stroke-width="1.2" fill="none"/><rect x="-4.5" y="${n + 11}" width="9" height="3" rx="1" fill="#f1c232"/><rect x="-4.5" y="${n + 28}" width="9" height="3" rx="1" fill="#f1c232"/><path d="M0 ${n + 31}v6" stroke="#f1c232" stroke-width="1.8"/>`
    );
  if (id === 'pretzel')
    return (
      band('#6b3f22', '#3a2010', 2) +
      `<g transform="translate(0 ${n + 21})"><path d="M-9 6C-15 0-12-9-5-8C0-7 2 2 0 6C-2 2 0-7 5-8C12-9 15 0 9 6C5 10-5 10-9 6Z" fill="none" stroke="#3a2010" stroke-width="6.5" stroke-linejoin="round"/><path d="M-9 6C-15 0-12-9-5-8C0-7 2 2 0 6C-2 2 0-7 5-8C12-9 15 0 9 6C5 10-5 10-9 6Z" fill="none" stroke="#c7772e" stroke-width="3.6" stroke-linejoin="round"/><circle cx="-8" cy="-3" r=".9" fill="#fff"/><circle cx="7" cy="-4" r=".9" fill="#fff"/><circle cx="2" cy="7" r=".9" fill="#fff"/></g>`
    );
  if (id.startsWith('ch_')) {
    const c = CITIES.find(x => x.id === id.slice(3));
    if (!c) return '';
    return (
      band(c.col, '#2a2420', 2) +
      `<path d="M0 ${n + 6}v6" stroke="#f1c232" stroke-width="2"/><circle cx="0" cy="${n + 24}" r="13" fill="#fffdf6" stroke="#f1c232" stroke-width="3"/><circle cx="0" cy="${n + 24}" r="13" fill="none" stroke="#8a6500" stroke-width=".8"/><g transform="translate(-10 ${n + 15}) scale(.25)">${stampArt(c.id, c.col, true)}</g>`
    );
  }
  if (id === 'bandana')
    return (
      `<path d="M${-a} ${f(n - 6)}Q0 ${f(n + 10)} ${a} ${f(n - 6)}L0 ${f(n + 42)}Z" fill="#7cc4ee" stroke="#2a5f80" stroke-width="2.5" stroke-linejoin="round"/>` +
      [
        [-18, 5],
        [0, 9],
        [18, 5],
        [-8, 20],
        [8, 21],
        [0, 32]
      ]
        .map(([x, y]) => `<circle cx="${x}" cy="${n + y}" r="2.4" fill="#fff"/>`)
        .join('')
    );
  if (id === 'pawmedal')
    return (
      band('#d8344a', '#7a1424', 2) +
      `<g transform="translate(0 ${n + 19})"><circle r="10" fill="#f1c232" stroke="#8a6500" stroke-width="2"/><g fill="#8a6500"><ellipse cy="3" rx="3.6" ry="2.8"/><circle cx="-4.2" cy="-1.8" r="1.6"/><circle cx="-1.4" cy="-4.4" r="1.6"/><circle cx="1.6" cy="-4.4" r="1.6"/><circle cx="4.4" cy="-1.8" r="1.6"/></g></g>`
    );
  if (id === 'bowtie')
    return (
      band('#3a3330', '#111', -1) +
      `<path d="M0 ${n + 7}L-15 ${n - 2}V${n + 16}ZM0 ${n + 7}L15 ${n - 2}V${n + 16}Z" fill="#d8344a" stroke="#7a1424" stroke-width="2" stroke-linejoin="round"/><circle cx="0" cy="${n + 7}" r="4.2" fill="#ffd23f" stroke="#7a1424" stroke-width="1.6"/>`
    );
  return '';
}
function hat(id, t, hr) {
  if (!id) return '';
  if (id === 'santa')
    return `<path d="M${f(-hr * 0.62)} ${f(t + 4)}Q${f(-hr * 0.2)} ${f(t - hr * 0.95)} ${f(hr * 0.66)} ${f(t - hr * 0.72)}Q${f(hr * 0.3)} ${f(t - hr * 0.3)} ${f(hr * 0.62)} ${f(t + 4)}Z" fill="#d8344a" stroke="#7a1424" stroke-width="2.5" stroke-linejoin="round"/><rect x="${f(-hr * 0.7)}" y="${f(t - 3)}" width="${f(hr * 1.4)}" height="12" rx="6" fill="#fff" stroke="${LN}" stroke-width="2.5"/><circle cx="${f(hr * 0.68)}" cy="${f(t - hr * 0.72)}" r="7" fill="#fff" stroke="${LN}" stroke-width="2.5"/>`;
  if (id === 'antlers') {
    let s = '';
    for (const k of [-1, 1])
      s += `<path d="M${f(k * hr * 0.42)} ${f(t + 6)}Q${f(k * hr * 0.5)} ${f(t - 14)} ${f(k * hr * 0.8)} ${f(t - 30)}M${f(k * hr * 0.56)} ${f(t - 12)}L${f(k * hr * 0.95)} ${f(t - 16)}M${f(k * hr * 0.68)} ${f(t - 22)}L${f(k * hr * 0.58)} ${f(t - 36)}" stroke="#8b5a2b" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    return s;
  }
  if (id === 'bow')
    return `<g transform="translate(${f(hr * 0.5)} ${f(t + 8)}) rotate(15)"><path d="M0 0L-16-10Q-21 0-16 10ZM0 0L16-10Q21 0 16 10Z" fill="#ffc21a" stroke="#9a6b00" stroke-width="2.2" stroke-linejoin="round"/><circle r="5" fill="#ffd23f" stroke="#9a6b00" stroke-width="2.2"/></g>`;
  if (id === 'crew')
    return `<g transform="translate(${f(-hr * 0.12)} ${f(t - 2)}) rotate(-10)"><rect x="${f(-hr * 0.44)}" y="-14" width="${f(hr * 0.88)}" height="18" rx="5" fill="#2c3e6b" stroke="#141d36" stroke-width="2.2"/><rect x="${f(-hr * 0.44 + 1)}" y="-1" width="${f(hr * 0.88 - 2)}" height="4" fill="#f1c232"/><path d="M-2-7Q-8-11-13-9Q-8-6-2-5ZM2-7Q8-11 13-9Q8-6 2-5Z" fill="#f1c232"/><circle cx="0" cy="-6.5" r="2.2" fill="#f1c232"/></g>`;
  if (id === 'beanie')
    return (
      `<path d="M${f(-hr * 0.8)} ${f(t + 12)}Q${f(-hr * 0.82)} ${f(t - hr * 0.72)} 0 ${f(t - hr * 0.74)}Q${f(hr * 0.82)} ${f(t - hr * 0.72)} ${f(hr * 0.8)} ${f(t + 12)}Z" fill="#fffaf0" stroke="${LN}" stroke-width="2.5"/><path d="M${f(-hr * 0.32)} ${f(t - hr * 0.5)}v${f(hr * 0.5)}M0 ${f(t - hr * 0.64)}v${f(hr * 0.62)}M${f(hr * 0.32)} ${f(t - hr * 0.5)}v${f(hr * 0.5)}" stroke="#e3e8ef" stroke-width="2.5"/><rect x="${f(-hr * 0.84)}" y="${f(t + 2)}" width="${f(hr * 1.68)}" height="13" rx="6.5" fill="#ffc21a" stroke="#9a6b00" stroke-width="2.2"/>` +
      fluff(0, t - hr * 0.8, 6, 5, 6, 5)
    );
  if (id === 'beret')
    return `<g transform="rotate(-10)"><ellipse cx="4" cy="-8" rx="34" ry="13" fill="#d8344a" stroke="#7a1424" stroke-width="2.5"/><path d="M-24-4q28 9 56 0" stroke="#a32035" stroke-width="2" fill="none"/><path d="M4-21l1-7" stroke="#7a1424" stroke-width="3.5" stroke-linecap="round"/></g>`;
  if (id === 'guard')
    return `<path d="M-24 6Q-30-44 0-50Q30-44 24 6Z" fill="#1f1b1a" stroke="#000" stroke-width="2"/><path d="M-12-30q4-6 8-4M6-38q4-4 8 0M-4-16q4-4 8-2M10-22q3-3 7-1" stroke="#45403e" stroke-width="2" fill="none" stroke-linecap="round"/><path d="M-24 4Q0 12 24 4" stroke="#f1c232" stroke-width="3" fill="none"/>`;
  if (id === 'sunhat')
    return `<ellipse cx="0" cy="0" rx="46" ry="10" fill="#e9c27a" stroke="#8a6020" stroke-width="2.5"/><path d="M-22 0Q-22-27 0-28Q22-27 22 0Z" fill="#e9c27a" stroke="#8a6020" stroke-width="2.5"/><path d="M-22-6Q0-1 22-6" stroke="#d8344a" stroke-width="5" fill="none"/><path d="M-36 2q36 8 72 0" stroke="#c9a058" stroke-width="1.5" fill="none"/>`;
  if (id === 'bunny') {
    let s = `<path d="M-30 6Q0-8 30 6" stroke="#ff8fa3" stroke-width="6" fill="none" stroke-linecap="round"/>`;
    for (const k of [-1, 1])
      s += `<g transform="rotate(${k * 12} ${k * 14} 0)"><ellipse cx="${k * 14}" cy="-24" rx="9" ry="24" fill="#fff" stroke="${LN}" stroke-width="2.5"/><ellipse cx="${k * 14}" cy="-22" rx="4.5" ry="16" fill="#ffb3c1"/></g>`;
    return s;
  }
  if (id === 'orchid')
    return `<g transform="translate(26 4)">${[0, 72, 144, 216, 288].map(r => `<ellipse cx="0" cy="-8" rx="6" ry="9" fill="#d77fe6" stroke="#7b2f8a" stroke-width="1.6" transform="rotate(${r})"/>`).join('')}<circle r="4.5" fill="#ffd23f" stroke="#7b2f8a" stroke-width="1.4"/></g>`;
  if (id === 'ski')
    return (
      `<path d="M-31 10Q-33-30 0-32Q33-30 31 10Z" fill="#d8344a" stroke="#7a1424" stroke-width="2.5"/><rect x="-32" y="0" width="64" height="11" rx="5" fill="#fff" stroke="#7a1424" stroke-width="2"/><g stroke="#fff" stroke-width="2.6" stroke-linecap="round"><path d="M0-24v16M-7-20l14 8M7-20l-14 8"/></g>` +
      fluff(0, -34, 6, 5, 6, 5)
    );
  if (id === 'hachimaki')
    return `<path d="M-36 2Q0-8 36 2L36 12Q0 2-36 12Z" fill="#fff" stroke="${LN}" stroke-width="2.2"/><circle cx="0" cy="3" r="5" fill="#d8344a"/><path d="M34 7l16-8M34 7l14 10" stroke="${LN}" stroke-width="7.5" stroke-linecap="round"/><path d="M34 7l16-8M34 7l14 10" stroke="#fff" stroke-width="4" stroke-linecap="round"/>`;
  if (id === 'crown') {
    const C = ['#ffd23f', '#ff8fa3', '#fff', '#c3a6ff'];
    let s = '';
    [-32, -19, -6, 7, 20, 33].forEach((x, i) => {
      const y = 4 - (1 - (x / 36) ** 2) * 9;
      s += `<ellipse cx="${x + 6}" cy="${f(y + 3)}" rx="4" ry="2.2" fill="#6ab04c"/><g transform="translate(${x} ${f(y)})" fill="${C[i % 4]}" stroke="${LN}" stroke-width="1.2">${[0, 72, 144, 216, 288].map(r => `<circle cx="0" cy="-3.6" r="3.2" transform="rotate(${r})"/>`).join('')}<circle r="2.4" fill="#f08a2c"/></g>`;
    });
    return s;
  }
  if (id === 'starclip')
    return `<g transform="translate(${f(hr * 0.5)} ${f(t + 8)}) rotate(12)"><path d="M0-14L4-5L14-4L6.5 3L9 13L0 7.5L-9 13L-6.5 3L-14-4L-4-5Z" fill="#ffd23f" stroke="#9a6b00" stroke-width="2.2" stroke-linejoin="round"/><circle cx="-3" cy="-3" r="1.6" fill="#fff"/></g>`;
  if (id === 'party')
    return `<g transform="rotate(10)"><path d="M-16 4L2-42L20 4Z" fill="#7cc4ee" stroke="${LN}" stroke-width="2.5" stroke-linejoin="round"/><path d="M-9-12L15-8M-3-27L9-25" stroke="#ffd23f" stroke-width="4"/><circle cx="2" cy="-44" r="6" fill="#ff8fa3" stroke="${LN}" stroke-width="2"/></g>`;
  return '';
}
const PX = 274,
  PY = 512,
  SC = [0.3, 0.34, 0.38];
let dims = { s: 0.27 };
const LEGS = [
  [138, 216, 'la'],
  [216, 290, 'lb'],
  [290, 356, 'la'],
  [356, 428, 'lb']
];
function dog() {
  const s = SC[stageOf(S.lv)],
    m = mood();
  dims = { s };
  let g = `<rect x="86" y="96" width="380" height="420" fill="transparent"/>`;
  g += `<image href="dog.png" width="548" height="612" clip-path="url(#cBody)"/>`;
  const dt = dirtT();
  if (dt > 0)
    g += `<image href="dog.png" width="548" height="612" clip-path="url(#cBody)" filter="url(#dirtF)" opacity="${f(dt)}"/>`;
  LEGS.forEach(
    (l, i) =>
      (g += `<g class="leg ${l[2]} leg${i}"><image href="dog.png" width="548" height="612" clip-path="url(#cL${i})"/>${dt > 0 ? `<image href="dog.png" width="548" height="612" clip-path="url(#cL${i})" filter="url(#dirtF)" opacity="${f(dt)}"/>` : ''}${legDirt(i)}</g>`)
  );
  g += dirtSpots() + messFur();
  g += face(m);
  g += `<g transform="translate(318 302) scale(2.2)">${neck(S.eq.neck, 0, 56)}</g>`;
  g += `<g transform="translate(330 142) scale(2.2)">${hat(S.eq.hat, 0, 46)}</g>`;
  if (carry)
    g += `<g transform="translate(300 300) rotate(-8) scale(2.6)"><rect x="-13" y="-9" width="26" height="18" rx="2.5" fill="#fff8e1" stroke="${INK}" stroke-width="1.6"/><path d="M-12-8l12 9 12-9" fill="none" stroke="${INK}" stroke-width="1.6"/><path d="M0 4s-4-2-4-5a2 2 0 0 1 4-1 2 2 0 0 1 4 1c0 3-4 5-4 5z" fill="#d8344a"/></g>`;
  if (carryBall || carryToy)
    g += `<g transform="translate(322 272) scale(2.4)">${toyArt(carryToy || 'ball')}</g>`;
  if (m === 'happy')
    g += `<path d="M156 168L174 170M180 132L192 143M200 113L205 128" stroke="#e7a596" stroke-width="9" stroke-linecap="round"/>`;
  if (m === 'sleep')
    g += `<g class="zz" font-family="Fredoka,sans-serif" font-weight="700" fill="#fff8e1" stroke="#3a2a12" stroke-width="3" paint-order="stroke"><text x="420" y="130" font-size="44">z</text><text x="460" y="80" font-size="58" style="animation-delay:1.1s">z</text></g>`;
  if (m === 'hungry')
    g += `<g transform="translate(470 90) scale(2.4)"><circle cx="-15" cy="22" r="3" fill="#fff8e1"/><circle cx="-9" cy="14" r="4.5" fill="#fff8e1"/><circle r="18" fill="#fff8e1" stroke="${INK}" stroke-width="2"/><g transform="translate(-12 -12) scale(.5)">${G.burger}</g></g>`;
  return g;
}
const dirtN = () => Math.max(0, Math.round(((85 - S.st.clean) / 85) * DIRT.length));
const dirtT = () => Math.max(0, (60 - S.st.clean) / 60) * 0.32;
const DIRT = [
  [300, 380, 18, 11],
  [395, 412, 17, 10],
  [225, 330, 13, 8],
  [392, 195, 12, 8],
  [250, 440, 15, 9],
  [355, 345, 12, 7],
  [205, 260, 11, 7],
  [420, 300, 13, 8],
  [330, 425, 10, 6],
  [270, 170, 9, 6],
  [150, 330, 12, 8],
  [440, 250, 9, 6],
  [320, 300, 9, 5],
  [190, 390, 11, 7]
];
function blob(x, y, rx, ry, i) {
  const r = ((i * 37) % 20) - 10;
  return `<g transform="translate(${x} ${y}) rotate(${r})"><ellipse rx="${rx}" ry="${ry}" fill="#9c7a52" opacity=".55"/><circle cx="${f(rx * 0.7)}" cy="${f(-ry * 0.6)}" r="${f(ry * 0.35)}" fill="#9c7a52" opacity=".5"/><circle cx="${f(-rx * 0.9)}" cy="${f(ry * 0.4)}" r="${f(ry * 0.28)}" fill="#8a6a44" opacity=".55"/><circle cx="${f(-rx * 0.2)}" cy="${f(-ry * 0.1)}" r="2.6" fill="#6e5234" opacity=".6"/><circle cx="${f(rx * 0.3)}" cy="${f(ry * 0.3)}" r="2" fill="#6e5234" opacity=".6"/></g>`;
}
function dirtSpots() {
  const n = dirtN();
  let s = '';
  for (let i = 0; i < n; i++) s += blob(...DIRT[i], i);
  if (n >= 6)
    s += `<g fill="#7a6a58" opacity=".55">${[
      [210, 300],
      [260, 360],
      [340, 390],
      [410, 350],
      [230, 410],
      [370, 250],
      [300, 220],
      [440, 410],
      [180, 350],
      [330, 460]
    ]
      .slice(0, n - 4)
      .map(
        ([x, y], i) =>
          `<circle cx="${x}" cy="${y}" r="${2.2 + (i % 3)}"/><circle cx="${x + 9}" cy="${y - 6}" r="1.8"/>`
      )
      .join('')}</g>`;
  return s;
}
const LEGD = [
  [176, 500],
  [250, 505],
  [322, 500],
  [392, 503]
];
function legDirt(i) {
  if (S.st.clean >= 55) return '';
  const [x, y] = LEGD[i];
  return `<path d="M${x - 22} ${y - 6}q22-12 44 0v8h-44z" fill="#8a6a44" opacity="${f(Math.min(0.65, ((55 - S.st.clean) / 55) * 0.9))}"/>`;
}
const MESS = [
  [250, 118, -70],
  [300, 108, -90],
  [360, 110, -95],
  [420, 128, -60],
  [195, 190, -150],
  [455, 195, -25],
  [175, 270, -165],
  [462, 275, 0],
  [160, 350, 175],
  [468, 360, 10],
  [96, 300, -170],
  [125, 245, -130],
  [140, 395, 160],
  [455, 430, 25],
  [300, 470, 90],
  [230, 465, 110]
];
function messFur() {
  const m = S.mess || 0;
  if (m < 20) return '';
  const n = Math.min(MESS.length, Math.round(((m - 20) / 80) * MESS.length) + 1);
  let s = '';
  for (let i = 0; i < n; i++) {
    const [x, y, a] = MESS[i],
      k = 0.8 + (i % 3) * 0.15;
    s += `<g transform="translate(${x} ${y}) rotate(${a + 90}) scale(${k})"><path d="M-17 8Q-21-8-12-20Q-11-9-4-6Q-6-22 3-33Q2-17 8-8Q11-17 19-21Q14-8 17 8Z" fill="${FUR}" stroke="${OL}" stroke-width="4.5" stroke-linejoin="round"/><path d="M-10 2Q-12-6-9-12M2-4Q0-14 3-22M11 0Q11-6 14-11" stroke="#d6dbe0" stroke-width="3" fill="none" stroke-linecap="round"/></g>`;
  }
  if (m >= 55)
    s += `<g fill="none" stroke="#b9c2ca" stroke-width="4" stroke-linecap="round" opacity=".9">${[
      [230, 340],
      [380, 320],
      [300, 410],
      [400, 420],
      [250, 250]
    ]
      .slice(0, Math.round(((m - 55) / 45) * 5) + 1)
      .map(([x, y]) => `<path d="M${x - 12} ${y}c4-12 16-12 14 0s-16 10-12-2 14-10 18 2"/>`)
      .join('')}</g>`;
  return s;
}
let carryBall = false,
  fetching = false,
  carryToy = null,
  toyOut = null;
let sig = '',
  dogX = 180,
  dir = 1,
  targetX = null,
  nextWalk = Date.now() + 4000,
  busyUntil = 0,
  lastF = 0;
/* depth: dogZ 0 = front (feet at y 266), 1 = far back, <0 = a little closer to the glass */
let dogZ = 0,
  targetZ = 0,
  dogBehind = false;
const BACKY = {
  room: 226,
  cabin: 222,
  gate: 240,
  bangkok: 238,
  beach: 236,
  sakura: 220,
  paris: 226,
  chalet: 228,
  meadow: 224,
  market: 232
};
const ZMIN = -0.22,
  zSpan = () => 266 - (BACKY[scene] || 228),
  zK = z => 1 - 0.42 * z,
  zY = z => 266 - z * zSpan(),
  dZk = () => zK(dogZ),
  fy = () => zY(dogZ);
function layer() {
  const back = fy() < 255;
  if (back === dogBehind) return;
  dogBehind = back;
  const w = $('#dogW'),
    p = w.parentNode;
  p.insertBefore(w, back ? $('#fur') : $('#baby'));
}
function place() {
  const s = dims.s * (1 + (S.fluff || 0) * 0.0008) * dZk(),
    y = fy();
  $('#dogW').setAttribute(
    'transform',
    `translate(${f(dogX)} ${f(y)}) scale(${f(dir * s * 1000) / 1000} ${f(s * 1000) / 1000}) translate(${-PX} ${-PY})`
  );
  const sh = $('#shadow');
  sh.setAttribute('cx', f(dogX));
  sh.setAttribute('cy', f(y + 2));
  sh.setAttribute('rx', f(170 * dims.s * dZk()));
  sh.setAttribute('ry', f(8 * dZk()));
  layer();
}
function drawDog(force) {
  const s = [
    S.lv,
    mood(),
    S.eq.hat,
    S.eq.neck,
    dirtN(),
    Math.round(dirtT() * 20),
    S.st.clean < 55 ? Math.round(S.st.clean / 8) : 9,
    Math.round((S.mess || 0) / 6),
    carryBall,
    carryToy,
    carry
  ].join('|');
  if (!force && s === sig) return;
  sig = s;
  $('#dogB').innerHTML = dog();
  place();
  $('#dogA').classList.toggle('zzz', S.sleep);
}
function stopWalk(ms) {
  targetX = null;
  busyUntil = Date.now() + ms;
  nextWalk = busyUntil + rnd(1500, 4000);
}
function frame(t) {
  const dt = lastF ? Math.min(0.05, (t - lastF) / 1000) : 0;
  lastF = t;
  const now = Date.now(),
    can = !S.sleep && !!S.name && now > busyUntil,
    mg = 210 * dims.s;
  if (targetX === null) {
    if (can && now > nextWalk) {
      const tz = Math.random() < 0.3 ? 0 : f(rnd(ZMIN, 1)),
        m = mg * zK(tz),
        tx = rnd(m, 360 - m);
      if (Math.hypot(tx - dogX, (tz - dogZ) * zSpan() * 2) > 30) {
        targetX = tx;
        targetZ = tz;
        if (Math.abs(tx - dogX) > 6) dir = tx > dogX ? 1 : -1;
      } else nextWalk = now + 2000;
    }
  } else if (!can) {
    targetX = null;
    targetZ = dogZ;
  } else {
    const sp = (runFast ? 120 : S.st.energy < 25 ? 20 : 34) * dt * (0.55 + 0.45 * dZk()),
      ex = targetX - dogX,
      ey = (targetZ - dogZ) * zSpan() * 2,
      d = Math.hypot(ex, ey);
    if (d <= sp) {
      dogX = targetX;
      dogZ = targetZ;
      targetX = null;
      runFast = false;
      nextWalk = now + rnd(2500, 7000);
      if (arriveCb) {
        const cb = arriveCb;
        arriveCb = null;
        setTimeout(cb, 50);
      }
    } else {
      dogX += (ex / d) * sp;
      dogZ += ((ey / d) * sp) / (zSpan() * 2);
    }
  }
  friendTick(dt, now);
  babyTick(dt);
  placeSay();
  $('#dogA').classList.toggle('walk', targetX !== null);
  $('#dogA').classList.toggle('run', runFast && targetX !== null);
  if (targetX !== null && t - (window._st || 0) > 250) {
    window._st = t;
    sfx('step');
  }
  place();
  requestAnimationFrame(frame);
}
const dogPX = () => ((dogX + dir * 42 * dims.s * dZk()) / 360) * 100;
const headY = () => ((fy() + (200 - PY) * dims.s * dZk()) / 300) * 100,
  mouthY = () => ((fy() + (262 - PY) * dims.s * dZk()) / 300) * 100;
