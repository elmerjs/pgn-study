const CACHE_NAME = 'pgn-study-v5';
const urlsToCache = [
  '/pgn-study/',
  '/pgn-study/index.html',
  '/pgn-study/styles.css',
  '/pgn-study/script3.js',
  '/pgn-study/manifest.json',
  '/pgn-study/icon-192.png',
  '/pgn-study/icon-512.png'
  // NO agregues audios aquí si son muy pesados
];
// Estrategia de Fetch estándar para PWAs
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Activación y limpieza
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Eliminando caché antiguo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
