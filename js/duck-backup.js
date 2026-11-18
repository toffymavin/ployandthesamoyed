/* --- drag Sunny the duck --- */
let dk = null;
function duckInit() {
  const sv = $('#scene');
  sv.addEventListener('pointerdown', e => {
    if (!e.target.closest('#sunny') || toyOut === 'duck' || fetching) return;
    dk = { x: e.clientX, y: e.clientY, m: false };
    e.preventDefault();
  });
  window.addEventListener('pointermove', e => {
    if (!dk) return;
    if (!dk.m) {
      if (Math.hypot(e.clientX - dk.x, e.clientY - dk.y) < 8) return;
      dk.m = true;
      $('#sunny').classList.add('drag');
      sfx('squeak');
    }
    const p = scenePt(e),
      x = Math.max(18, Math.min(342, p.x)),
      y = Math.max(236, Math.min(278, p.y + 10));
    S.duck = [Math.round(x), Math.round(y)];
    const g = $('#duckG');
    if (g)
      g.setAttribute(
        'transform',
        `translate(${x} ${y - 8}) scale(1.25) rotate(${f(Math.sin(Date.now() / 90) * 8)})`
      );
  });
  const end = () => {
    if (!dk) return;
    const m = dk.m;
    dk = null;
    if (!m) return;
    noClick = true;
    setTimeout(() => (noClick = false), 350);
    $('#sunny').classList.remove('drag');
    drawHome();
    sfx('squeak');
    save();
    if (!S.sleep && !paneKind && Math.random() < 0.4)
      setTimeout(
        () =>
          say(pick(['Hey! Where is Sunny going?', 'Sunny likes it there!', 'Ooh, a new spot for Sunny!'])),
        200
      );
  };
  window.addEventListener('pointerup', end);
  window.addEventListener('pointercancel', end);
}
duckInit();

/* --- home screen + backup --- */
const UA = navigator.userAgent,
  isIOS = /iPhone|iPad|iPod/.test(UA) || (navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1),
  isAndroid = /Android/i.test(UA),
  inApp = /\bLine\/|FBAN|FBAV|Instagram/i.test(UA);
const isApp = () => navigator.standalone === true || matchMedia('(display-mode: standalone)').matches;
const shareIco =
  '<svg viewBox="0 0 24 24" style="width:18px;height:18px;vertical-align:-3px"><path d="M12 3v12M8 7l4-4 4 4" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/><path d="M6 11H5v10h14V11h-1" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linejoin="round"/></svg>';
function howToHTML() {
  if (inApp)
    return `<p>Looks like this opened inside a chat app. Tap the menu (<b>⋯</b> or ${shareIco}) and choose <b>Open in ${isIOS ? 'Safari' : 'browser'}</b> first.</p>`;
  if (isIOS)
    return `<ol class="howto"><li>Tap the Share button ${shareIco} (on newer iPhones, tap <b>⋯</b> first).</li><li>Tap <b>Add to Home Screen</b>, then <b>Add</b>.</li><li>Open the game from the new Samoyed icon.</li></ol>`;
  return `<ol class="howto"><li>Tap <b>⋮</b> at the top right.</li><li>Tap <b>Add to Home screen</b> or <b>Install app</b>.</li><li>Open the game from the new Samoyed icon.</li></ol>`;
}
function homePane() {
  open(
    `<h2>One tiny step first</h2><p>Give your new pup a home on your phone, so they stay safe even when you're away on long trips.</p>${howToHTML()}<div class="row"><button class="btn ghost" data-a="homeskip">Play here for now</button></div>`,
    'home',
    true,
    true
  );
}
const needHome = () => (isIOS || isAndroid) && !isApp();
const BKP = 'PUP1:';
function bkCode() {
  const o = JSON.parse(JSON.stringify(S));
  return BKP + btoa(unescape(encodeURIComponent(JSON.stringify(o))));
}
function backupPane() {
  const has = !!S.name,
    code = has ? bkCode() : '';
  open(
    `<h2>${has ? 'Backup' : 'Restore your pup'}</h2>${
      has
        ? `<p class="sub">Keep this code somewhere safe, like a LINE chat with yourself or your Notes. It brings back ${T('{n}')} on any phone. Photos aren't included, so press and hold to save the ones you love.</p>
 <textarea class="bk" id="bkOut" readonly>${code}</textarea><div class="row"><button class="btn" data-a="bkcopy">Copy code</button>${navigator.share ? '<button class="btn" data-a="bkshare">Send…</button>' : ''}</div>
 <p style="font:600 15px Fredoka,sans-serif;margin:18px 0 6px">Restore from a code</p>`
        : `<p class="sub">Paste the backup code you saved.</p>`
    }
 <textarea class="bk" id="bkIn" style="min-height:70px" placeholder="PUP1:…" autocomplete="off" spellcheck="false"></textarea><div class="row"><button class="btn${has ? ' ghost' : ''}" data-a="bkrestore">Restore</button></div>
 ${needHome() ? `<button class="lnk" data-a="homehow">How to add to Home Screen</button>` : ''}
 <div class="row"><button class="btn ghost" data-a="${has ? 'close' : 'bkback'}">${has ? 'Close' : 'Back'}</button></div>`,
    'backup',
    false,
    !has
  );
}
function bkCopy() {
  const t = $('#bkOut');
  if (!t) return;
  const done = () => toast('Backup code copied');
  if (navigator.clipboard && navigator.clipboard.writeText)
    navigator.clipboard.writeText(t.value).then(done, () => {
      t.select();
      try {
        document.execCommand('copy');
        done();
      } catch (e) {
        toast('Press and hold the code to copy it');
      }
    });
  else {
    t.select();
    try {
      document.execCommand('copy');
      done();
    } catch (e) {
      toast('Press and hold the code to copy it');
    }
  }
}
function bkRestore() {
  const raw = (($('#bkIn') || {}).value || '').replace(/\s+/g, '');
  let o = null;
  try {
    if (raw.startsWith(BKP)) o = JSON.parse(decodeURIComponent(escape(atob(raw.slice(BKP.length)))));
  } catch (e) {}
  if (!o || typeof o !== 'object' || !o.name || !o.st)
    return toast("That code doesn't look right. Copy the whole thing and try again.");
  if (S.name && !confirm(`Replace ${S.name} on this phone with ${o.name} from the backup?`)) return;
  o.last = Date.now();
  resetting = true;
  try {
    localStorage.setItem(KEY, JSON.stringify(o));
  } catch (e) {
    resetting = false;
    return toast("Couldn't restore here.");
  }
  location.replace(location.pathname + location.search);
}
try {
  if (navigator.storage && navigator.storage.persist) navigator.storage.persist();
} catch (e) {}
