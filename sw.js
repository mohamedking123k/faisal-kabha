// ماسة — Service Worker: دايماً بيجيب أحدث نسخة من الإنترنت، وبس إذا ما في نت بيفتح آخر نسخة محفوظة
const CACHE = 'massa-v1';
self.addEventListener('install', e => { self.skipWaiting(); });
self.addEventListener('activate', e => { e.waitUntil(self.clients.claim()); });
self.addEventListener('fetch', e => {
  const req = e.request;
  if(req.method !== 'GET') return;
  const url = new URL(req.url);
  if(url.origin !== location.origin) return;            // المزامنة والخطوط وغيرها ما بتمر من هون
  e.respondWith(
    fetch(req).then(res => { const copy = res.clone(); caches.open(CACHE).then(c => c.put(req, copy)); return res; })
      .catch(() => caches.match(req).then(r => r || caches.match('./')))
  );
});
