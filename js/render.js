/* render */
const STATS = [
  ['hunger', 'Full', 'bowl'],
  ['happy', 'Happy', 'heart'],
  ['clean', 'Clean', 'drop'],
  ['energy', 'Energy', 'bolt']
];
function render() {
  const s = S.st,
    st = stageOf(S.lv);
  $('#nm').textContent = S.name || 'Samoyed';
  $('#lv').textContent = `${STAGE[st]} · Lv ${S.lv}`;
  const mx = S.lv >= MAXL;
  $('#xpb i').style.width = (mx ? 100 : (S.xp / need(S.lv)) * 100) + '%';
  $('#xpt').textContent = mx ? 'Max level' : `${S.xp} / ${need(S.lv)} XP`;
  $('#stats').innerHTML = STATS.map(
    ([k, l, ic]) =>
      `<div class="st">${ico(ic)}<b>${l}${k === 'energy' && S.sleep && s[k] < 100 ? `<small style="font-weight:500;opacity:.75"> · full in ${Math.ceil(((100 - s[k]) / 150) * 60)} min</small>` : ''}</b><div class="bar${s[k] < 30 ? ' low' : ''}" role="meter" aria-label="${l}" aria-valuenow="${Math.round(s[k])}" aria-valuemin="0" aria-valuemax="100"><i style="width:${s[k]}%"></i></div></div>`
  ).join('');
  $('#i-sleep').innerHTML = ico(S.sleep ? 'sun' : 'moon');
  $('#sleepL').textContent = S.sleep ? 'Wake' : 'Sleep';
  $('#night').setAttribute('opacity', S.sleep ? 0.5 : 0);
  $('#chip').innerHTML = `${sz('tuft', 18)}${furBal()}`;
  $('#tripc').innerHTML = S.trip
    ? `${sz('plane', 18)}Ploy is in ${cityName(S.trip.c)} · Top is pet-sitting`
    : '';
  $('#tripc').classList.toggle('on', !!S.trip);
  $('#flyL').textContent = S.trip ? 'Home' : 'Fly';
  drawSound();
  resetQuests();
  $('#t-q').classList.toggle(
    'has',
    QUESTS.some(q => (S.q.p[q.id] || 0) >= q.g && !S.q.done.includes(q.id))
  );
  $('#t-l').classList.toggle(
    'has',
    LETTERS.some((l, i) => S.lv >= l.lv && !S.read.includes(i))
  );
  drawDog();
}
