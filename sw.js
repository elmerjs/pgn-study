// Subimos la versión a v3 para limpiar la caché anterior que tenía errores
const CACHE_NAME = 'pgn-study-v3';  
const urlsToCache = [
  './',
  './index.html',
  './styles.css',
  './script.js',
  './manifest.json'
  // Nota: Dejé fuera los iconos por ahora para evitar 404s si las rutas no coinciden exacto. 
  // Si están en una carpeta, sería './icons/icon-192.png'
];

// Instalar el service worker y cachear archivos
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Cache abierta, guardando archivos...");
        return cache.addAll(urlsToCache);
      })
  );
});

// Interceptar peticiones y servir desde cache
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => response || fetch(event.request))
  );
});

// Limpiar cache viejo
self.addEventListener('activate', event => {
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (cacheName !== CACHE_NAME) {
            console.log("Limpiando caché antigua:", cacheName);
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});