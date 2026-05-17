const CACHE_NAME = 'pgn-study-v5';
const urlsToCache = [
  '/pgn-study/',
  '/pgn-study/index.html',
  '/pgn-study/styles.css',
  '/pgn-study/script.js',
  '/pgn-study/manifest.json',
  '/pgn-study/icon-192.png',
  '/pgn-study/icon-512.png'
  // NO agregues audios aquí si son muy pesados
];

self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames =>
      Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      )
    )
  );
});
