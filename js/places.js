/* ===== round 4: home, walks, Top's touches ===== */
const PLACES = {
  market: {
    name: 'Christmas Market',
    hi: 'The Christmas market! It smells like cinnamon.',
    find: 'a gingerbread cookie'
  },
  bangkok: {
    name: 'Street Food Night',
    hi: "Som tam, grilled pork, mango sticky rice… I'm in heaven.",
    find: 'a grilled pork stick'
  },
  beach: {
    name: 'Beach Sunset',
    hi: 'Sand between my paws! The waves are so loud!',
    find: 'a pretty seashell'
  },
  sakura: { name: 'Sakura Park', hi: "So many petals! I'm going to sneeze.", find: 'a perfect sakura petal' },
  paris: { name: 'Paris Café', hi: 'Bonjour! Can I have a croissant?', find: 'a tiny croissant crumb' },
  chalet: {
    name: 'Alpine Chalet',
    hi: 'Snow! This is where Samoyeds come from!',
    find: 'a perfect snowball'
  },
  meadow: {
    name: 'Flower Meadow',
    hi: 'So many flowers! I want to roll in ALL of them.',
    find: 'a little daisy'
  }
};
const SPECIAL = {
  '2026-12-24': 'market',
  '2026-12-25': 'market',
  '2027-12-24': 'market',
  '2027-12-25': 'market'
};
const isoDay = () => {
  const d = new Date();
  return (
    d.getFullYear() +
    '-' +
    String(d.getMonth() + 1).padStart(2, '0') +
    '-' +
    String(d.getDate()).padStart(2, '0')
  );
};
let scene = 'room',
  marketHTML = '',
  walkT = null,
  walk = null,
  arriveCb = null,
  runFast = false;
function setScene(id) {
  scene = id;
  const sv = $('#scene');
  sv.dataset.scene = id;
  $('#back').innerHTML = id === 'market' ? marketHTML : SCN[id];
  $('#snow').style.display = id === 'market' || id === 'chalet' ? '' : 'none';
  tod = '';
  applyTime();
  tufts = [];
  drawFur();
  $('#sign').innerHTML = '';
  $('#placec').textContent = PLACES[id] ? PLACES[id].name : '';
  $('#placec').classList.toggle('on', !!PLACES[id]);
  $('#walkL').textContent = PLACES[id] ? 'Home' : 'Walkie!';
  walkScene(id);
}
function fadeTo(fn) {
  const f = $('#fade');
  f.classList.add('on');
  setTimeout(() => {
    fn();
    setTimeout(() => f.classList.remove('on'), 80);
  }, 420);
}
function runTo(x, from, cb, fast = true) {
  if (from < 0 || from > 360) dogZ = 0;
  dogX = from;
  if (x !== from) dir = x > from ? 1 : -1;
  targetX = x;
  targetZ = 0;
  busyUntil = 0;
  runFast = fast;
  arriveCb = cb;
  place();
}
function startWalk() {
  if (blockedAsleep()) return;
  if (PLACES[scene]) return goHome();
  if (S.st.energy < 15) return say("I'm too sleepy for a walk… nap first?");
  let id = SPECIAL[isoDay()];
  if (!id && BTJ.some(m => !BTS().read.includes(m.id)) && !S.lastP.includes('beach') && Math.random() < 0.4)
    id = 'beach';
  if (!id) {
    const opts = Object.keys(PLACES).filter(p => !S.lastP.includes(p));
    id = pick(opts.length ? opts : Object.keys(PLACES));
  }
  S.lastP = [id, ...S.lastP].slice(0, 2);
  sfx('wake');
  say(pick(['Walkies!! Let me get my leash!', "Yes! Yes! Let's go!", 'Outside? Best idea ever!']), 2200);
  stopWalk(1500);
  setTimeout(
    () =>
      fadeTo(() => {
        setScene(id);
        runTo(170, -60, () => {
          hearts(2);
          say(PLACES[id].hi, 4500);
          sfx('yip');
          setTimeout(() => {
            if (scene === id && walk && !walk.busy && Date.now() - lastSay > 4000)
              say('Ooh, something sparkly! Tap it, Ploy!', 3500);
          }, 5000);
        });
        const s = S.st;
        s.happy = clamp(s.happy + 20);
        s.energy = clamp(s.energy - 6, 5);
        s.hunger = clamp(s.hunger - 5, 5);
        if (S.wk.day !== today()) S.wk = { day: today(), n: 0 };
        if (S.wk.n < 2) {
          S.wk.n++;
          gain(10);
        }
        prog('play');
        walk = { id, t: Date.now() };
        clearTimeout(walkT);
        walkT = setTimeout(() => {
          if (PLACES[scene]) {
            say("That was fun! Let's go home.", 3000);
            setTimeout(goHome, 2500);
          }
        }, 180000);
        walkArrive(id);
        if (!S.visited[id]) S.visited[id] = 1;
        render();
        save();
      }),
    900
  );
}
function goHome() {
  const was = scene,
    w = walk;
  clearTimeout(walkT);
  walk = null;
  const line = walkEffects(was, w);
  fadeTo(() => {
    setScene('room');
    drawDog(true);
    runTo(
      180,
      -60,
      () => say(line || pick(['Home sweet home.', 'That was the best walk ever!', 'My paws are happy now.'])),
      false
    );
    drawHome();
  });
  render();
  save();
}
