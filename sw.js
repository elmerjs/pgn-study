const CACHE_NAME = 'pgn-study-v8'; // Subimos la versión para forzar refresco

const urlsToCache = [
  '/pgn-study/',
  '/pgn-study/index.html',
  '/pgn-study/styles.css',
  '/pgn-study/script3.js',
  '/pgn-study/manifest.json',
  '/pgn-study/icon-192.png',
  '/pgn-study/icon-512.png'
];

// 🔥 CORRECCIÓN: Se agregó el evento install que faltaba por completo en tu archivo
self.addEventListener('install', event => {
  self.skipWaiting(); // Fuerza al Service Worker nuevo a activarse inmediatamente
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      console.log('Caché abierto: Guardando archivos críticos...');
      return cache.addAll(urlsToCache);
    })
  );
});

// Estrategia de Fetch estándar para PWAs
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(response => response || fetch(event.request))
  );
});

// Activación y limpieza de versiones viejas
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
  return self.clients.claim(); // Toma el control de las páginas activas de inmediato
});