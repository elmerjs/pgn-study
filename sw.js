// Cambiamos a v4 para romper de forma agresiva cualquier caché previa en móviles
const CACHE_NAME = 'pgn-study-v4';  
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script2.js',
  './manifest.json'
];

self.addEventListener('install', event => {
  // Fuerza al Service Worker nuevo a convertirse en el activo de inmediato
  self.skipWaiting();
  
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => cache.addAll(urlsToCache))
  );
});

self.addEventListener('activate', event => {
  // Asegura que el SW controle la página actual de inmediato sin esperar a recargar
  event.waitUntil(clients.claim());

  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});

self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});