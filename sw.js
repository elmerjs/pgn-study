// Aumentamos versión para obligar al móvil a actualizar
const CACHE_NAME = 'pgn-study-v7';

const urlsToCache = [
  '/pgn-study/',
  '/pgn-study/index.html',
  '/pgn-study/styles.css',
  '/pgn-study/script3.js',
  '/pgn-study/manifest.json',
  '/pgn-study/icon-192.png',
  '/pgn-study/icon-512.png'
];

// 1. EVENTO INSTALL (Faltaba en tu archivo) - Guarda en caché para funcionar offline
self.addEventListener('install', event => {
  self.skipWaiting(); // Obliga al SW a instalarse inmediatamente
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log('Precaching archivos críticos');
        return cache.addAll(urlsToCache);
      })
      .catch(error => console.error('Error en caché:', error))
  );
});

// 2. EVENTO FETCH - Responde desde la caché o va a internet
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        if (response) {
          return response; // Devuelve la versión en caché
        }
        return fetch(event.request); // Va a la red si no está en caché
      })
  );
});

// 3. EVENTO ACTIVATE - Limpia cachés viejos
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log('Limpiando caché viejo:', cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
  return self.clients.claim(); // Toma el control de la página inmediatamente
});