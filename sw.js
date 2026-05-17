// SW desactivado temporalmente
self.addEventListener('install', () => self.skipWaiting());
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(k => Promise.all(k.map(x => caches.delete(x))))
  );
  clients.claim();
});
self.addEventListener('fetch', event => {
  event.respondWith(fetch(event.request));
});
