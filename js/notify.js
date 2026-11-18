/* notify-ping: tells Top's phone (ntfy) when Ploy opens the game, names the pup, or comes back later. Each ping max once per device. */
(function () {
  var TOPIC = 'ploy-pup-570d5ce67573',
    P = 'ploy-samoyed-ping',
    ls = localStorage;
  function get(k) {
    try {
      return ls.getItem(P + k);
    } catch (e) {
      return null;
    }
  }
  function ping(k, msg) {
    if (get('') === 'me' || get(k)) return;
    try {
      fetch('https://ntfy.sh/' + TOPIC, { method: 'POST', body: msg, keepalive: true })
        .then(function (r) {
          if (r.ok)
            try {
              ls.setItem(P + k, '1');
            } catch (e) {}
        })
        .catch(function () {});
    } catch (e) {}
  }
  window._pingName = function (n) {
    ping('-name', '🐶 พลอยตั้งชื่อน้องว่า "' + n + '" แล้ว!');
  };
  try {
    if (/[?&]me=1/.test(location.search)) {
      ls.setItem(P, 'me');
      return;
    }
    var o = null;
    try {
      o = JSON.parse(ls.getItem('ploy-samoyed-v1') || 'null');
    } catch (e) {}
    if (!o || !o.name) ping('-first', '🐶 พลอยเปิดเกมครั้งแรกแล้ว!');
    else if (!o.last || Date.now() - o.last > 30 * 60e3)
      ping('-back', '🐶 พลอยกลับมาเล่นเกมแล้ว — น้องชื่อ ' + o.name + ' เลเวล ' + (o.lv || 1));
  } catch (e) {}
})();
