const C='samoyed-v9',APP=['./','index.html','style.css','dog.png','manifest.webmanifest','icon-192.png','icon-512.png','apple-touch-icon.png',
 'js/core.js','js/icons.js','js/content.js','js/state.js','js/dog.js','js/scene.js','js/sound.js','js/ui.js','js/actions.js','js/world-data.js','js/room.js','js/flight.js','js/tricks.js','js/games/treat-catch.js','js/album-shop.js','js/city-art.js','js/extras.js','js/places.js','js/home.js','js/render.js','js/messages.js','js/walk-extras.js','js/games/arcade.js','js/games/fluffy-pop.js','js/games/snack-cart.js','js/games/fluffy-jump.js','js/games/pack-suitcase.js','js/duck-backup.js','js/events.js','js/start.js','js/notify.js'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(C).then(c=>c.addAll(APP)));self.skipWaiting()});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==C).map(x=>caches.delete(x)))));self.clients.claim()});
self.addEventListener('fetch',e=>{if(e.request.method!=='GET')return;
 e.respondWith(fetch(e.request).then(r=>{const cp=r.clone();caches.open(C).then(c=>c.put(e.request,cp)).catch(()=>{});return r}).catch(()=>caches.match(e.request)))});
