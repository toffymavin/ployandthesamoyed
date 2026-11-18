/* --- flight mode --- */
function flyPane() {
  if (S.trip) {
    const c = CITIES.find(x => x.id === S.trip.c),
      hrs = Math.max(0, Math.round((Date.now() - S.trip.t) / 36e5));
    return open(
      `<h2>Flying to ${c.name}</h2><p class="sub">Left ${hrs} hour${hrs === 1 ? '' : 's'} ago. ${T('{n}')} gets hungry more slowly while you're away.${WX && WX.id === c.id ? ` Right now in ${wxName(c.id)}: ${WX.t}°C.` : ''}</p><div class="row"><button class="btn ghost" data-a="close">Still flying</button><button class="btn" data-a="land">I'm home!</button></div>`,
      'fly'
    );
  }
  open(
    `<h2>Where are you flying?</h2><p class="sub">${T('{n}')} will wait for you. Bring back a stamp and a souvenir!</p>${REG.map(
      ([r, lab]) =>
        `<p style="font:600 15px Fredoka,sans-serif;margin:14px 0 8px">${lab}</p><div class="grid2">${CITIES.filter(
          c => c.r === r
        )
          .map(
            c =>
              `<button class="item" data-a="depart" data-id="${c.id}" style="border-color:${S.stamps[c.id] ? c.col : '#efdfae'}">${c.name}<small>${S.stamps[c.id] ? 'Visited ×' + S.stamps[c.id] : 'New stamp'}</small></button>`
          )
          .join('')}</div>`
    ).join('')}<div class="row"><button class="btn ghost" data-a="close">Not today</button></div>`,
    'fly'
  );
}
function depart(id) {
  if (S.sleep) {
    S.sleep = false;
    drawDog(true);
    musicLevel();
  }
  S.trip = { c: id, t: Date.now() };
  close();
  sfx('wake');
  stopWalk(9000);
  clearTimeout(walkT);
  walk = null;
  departSeq(id);
  if (!S.pc[id]) S.pc[id] = { note: Math.random() < 0.65 ? pick(PCNOTE) : '' };
  setTimeout(sayWx, 6500);
  toast(`Have a great flight to ${cityName(id)}!`);
  render();
  save();
}
function land() {
  if (!S.trip) return;
  const c = CITIES.find(x => x.id === S.trip.c),
    hrs = (Date.now() - S.trip.t) / 36e5,
    firstTime = !S.stamps[c.id];
  S.stamps[c.id] = (S.stamps[c.id] || 0) + 1;
  S.trip = null;
  if (!S.pc[c.id]) S.pc[c.id] = { note: Math.random() < 0.65 ? pick(PCNOTE) : '' };
  close();
  clearTimeout(walkT);
  walk = null;
  sfx('level');
  S.st.happy = clamp(S.st.happy + 20);
  window._pxp = 20;
  landSeq(c, hrs, firstTime);
  render();
  save();
}
function stampPane() {
  const n = CITIES.filter(c => S.stamps[c.id]).length;
  open(
    `<h2>Stamp book</h2><p class="sub">${n} of ${CITIES.length} places. Each new place brings ${T('{n}')} a souvenir.</p>${REG.map(
      ([r, lab]) => {
        const L = CITIES.filter(c => c.r === r);
        return `<p style="font:600 15px Fredoka,sans-serif;margin:16px 0 8px">${lab} · ${L.filter(c => S.stamps[c.id]).length}/${L.length}</p><div class="stamps">${L.map(
          c => {
            const v = S.stamps[c.id];
            return v
              ? `<button class="stampc" data-a="postcard" data-id="${c.id}">${stampSVG(c, v)}<small>Visited ×${v} · tap for postcard</small></button>`
              : `<div class="stampc">${stampSVG(c, v)}<small>Not yet</small></div>`;
          }
        ).join('')}</div>`;
      }
    ).join(
      ''
    )}${visitorsHTML()}<div class="row"><button class="btn ghost" data-a="close">Close</button></div>`,
    'stamps'
  );
}
