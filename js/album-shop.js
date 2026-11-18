/* --- photo album --- */
const AKEY = KEY + '-album';
let ALB = [];
try {
  ALB = JSON.parse(localStorage.getItem(AKEY) || '[]');
} catch (e) {}
const saveAlb = () => {
  try {
    localStorage.setItem(AKEY, JSON.stringify(ALB));
    return true;
  } catch (e) {
    return false;
  }
};
let dogURL = null;
function getDogURL() {
  return dogURL
    ? Promise.resolve(dogURL)
    : fetch('dog.png')
        .then(r => r.blob())
        .then(
          b =>
            new Promise(ok => {
              const fr = new FileReader();
              fr.onload = () => ok((dogURL = fr.result));
              fr.readAsDataURL(b);
            })
        );
}
async function snap(auto, label) {
  sfx('shutter');
  const fl = document.createElement('div');
  fl.className = 'flash';
  $('.screen').appendChild(fl);
  setTimeout(() => fl.remove(), 500);
  try {
    const url = await getDogURL();
    const cl = $('#scene').cloneNode(true);
    cl.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    cl.setAttribute('width', '720');
    cl.setAttribute('height', '600');
    cl.querySelectorAll('image').forEach(i => i.setAttribute('href', url));
    const nt = cl.querySelector('#night');
    if (nt) nt.setAttribute('opacity', S.sleep ? 0.3 : 0);
    cl.querySelectorAll('.bulb').forEach(b => b.removeAttribute('class'));
    const svgURL =
      'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(new XMLSerializer().serializeToString(cl));
    const im = await new Promise((ok, no) => {
      const i = new Image();
      i.onload = () => ok(i);
      i.onerror = no;
      i.src = svgURL;
    });
    const cv = document.createElement('canvas');
    cv.width = 800;
    cv.height = 780;
    const c = cv.getContext('2d');
    c.fillStyle = '#fff8e1';
    c.fillRect(0, 0, 800, 780);
    c.drawImage(im, 40, 40, 720, 600);
    c.strokeStyle = INK;
    c.lineWidth = 4;
    c.strokeRect(40, 40, 720, 600);
    c.fillStyle = INK;
    c.font = '700 40px Fredoka, sans-serif';
    c.textBaseline = 'middle';
    c.fillText(S.name || 'Samoyed', 48, 700);
    c.font = '600 26px Fredoka, sans-serif';
    c.fillStyle = '#8a6a2c';
    const d = new Date();
    c.fillText(
      `For polyploii · ${d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })}`,
      48,
      742
    );
    c.save();
    c.translate(690, 712);
    c.rotate(-0.12);
    c.strokeStyle = '#d8344a';
    c.lineWidth = 4;
    c.setLineDash([6, 5]);
    c.strokeRect(-46, -40, 92, 80);
    c.setLineDash([]);
    c.fillStyle = '#d8344a';
    c.font = '700 22px Fredoka, sans-serif';
    c.textAlign = 'center';
    c.fillText('LV ' + S.lv, 0, -10);
    c.font = '600 16px Fredoka, sans-serif';
    c.fillText(STAGE[stageOf(S.lv)].toUpperCase(), 0, 16);
    c.restore();
    const out = cv.toDataURL('image/jpeg', 0.82);
    ALB.unshift({ u: out, t: Date.now() });
    while (ALB.length > 12) ALB.pop();
    if (!saveAlb()) {
      ALB.pop();
      saveAlb();
      toast('Album is full. Delete a photo to save more.');
    } else {
      toast(auto ? `Postcard saved: ${label}` : 'Photo saved to the album');
      if (!auto) albumPane();
    }
  } catch (e) {
    toast("Couldn't take the photo here");
  }
}
function albumPane() {
  open(
    `<h2>Photo album</h2><p class="sub">Postcards of ${T('{n}')}. Up to 12 photos.</p><div class="row" style="justify-content:flex-start;margin:0 0 12px"><button class="btn" data-a="snap">Take a photo</button></div>${ALB.length ? `<div class="album">${ALB.map((p, i) => `<button class="ph" data-a="photo" data-i="${i}"><img src="${p.u}" alt="Postcard ${i + 1}"></button>`).join('')}</div>` : '<p class="sub">No photos yet. Dress up your pup and take the first one!</p>'}${treasureHTML()}<div class="row"><button class="btn ghost" data-a="close">Close</button></div>`,
    'album'
  );
}
function photoPane(i) {
  const p = ALB[i];
  if (!p) return;
  open(
    `<img class="big-ph" src="${p.u}" alt="Postcard"><p class="sub" style="margin-top:10px!important">Press and hold the photo to save it to your phone.</p><div class="row"><button class="btn ghost" data-a="delphoto" data-i="${i}">Delete</button>${self !== top ? '' : `<a class="btn" href="${p.u}" download="samoyed-postcard.jpg" style="display:inline-flex;align-items:center;text-decoration:none;color:var(--ink)">Download</a>`}<button class="btn" data-a="album">Back</button></div>`,
    'photo'
  );
}

/* --- shop --- */
const thumb = g => `<svg class="thumb" viewBox="0 0 10 10" aria-hidden="true"><g>${g}</g></svg>`;
function fitThumbs() {
  document.querySelectorAll('#pane .thumb').forEach(sv => {
    try {
      const b = sv.firstChild.getBBox(),
        p = Math.max(b.width, b.height) * 0.12;
      sv.setAttribute('viewBox', `${f(b.x - p)} ${f(b.y - p)} ${f(b.width + 2 * p)} ${f(b.height + 2 * p)}`);
    } catch (e) {}
  });
}
function shopPane() {
  const b = furBal(),
    sec = (t, list) =>
      `<p style="font:600 15px Fredoka,sans-serif;margin:14px 0 8px">${t}</p><div class="grid2">${list}</div>`;
  const items = ITEMS.filter(i => i.shop)
    .map(i => {
      const own = S.owned.includes(i.id);
      return `<button class="item${own ? ' on' : ''}" data-a="${own ? 'closet' : 'buy'}" data-id="${i.id}" ${!own && b < i.shop ? 'disabled' : ''}>${thumb(i.slot === 'hat' ? hat(i.id, 0, 46) : neck(i.id, 0, 56))}${i.name}<small>${own ? 'Owned · in the closet' : i.shop + ' fur'}</small></button>`;
    })
    .join('');
  const decos = DECOS.map(d => {
    const own = S.owned.includes(d.id),
      on = S.deco.includes(d.id);
    return `<button class="item${on ? ' on' : ''}" data-a="${own ? 'place' : 'buy'}" data-id="${d.id}" ${!own && b < d.price ? 'disabled' : ''}>${thumb(decoSVG(d.id))}${d.name}<small>${own ? (on ? 'In the market · tap to put away' : 'Tap to place') : d.price + ' fur'}</small></button>`;
  }).join('');
  open(
    `<h2>Fur shop</h2><p class="sub">Trade the fur tufts you collect. You have <b>${b}</b> fur. Brush or play with ${T('{n}')} to get more.</p>${sec('Outfits', items)}${sec('Decorations', decos)}<div class="row"><button class="btn ghost" data-a="close">Close</button></div>`,
    'shop'
  );
  fitThumbs();
}
function buy(id) {
  const it = ITEMS.find(i => i.id === id && i.shop),
    d = DECOS.find(x => x.id === id),
    price = it ? it.shop : d ? d.price : 0;
  if (!price || S.owned.includes(id) || furBal() < price) return;
  S.spent += price;
  S.owned.push(id);
  if (d) {
    S.deco.push(id);
    drawDeco();
  }
  sfx('coin');
  toast(`Bought: ${(it || d).name}`);
  if (it) {
    S.eq[it.slot] = it.id;
    drawDog(true);
  }
  say(pick(['Ooh, new things!', 'Thank you, Ploy!', 'Is that for me?!']));
  render();
  shopPane();
}
