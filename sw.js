const CACHE_NAME = 'pgn-study-v9';
const urlsToCache = [
  '/pgn-study/',
  '/pgn-study/index.html',
  '/pgn-study/styles.css',
  '/pgn-study/script3.js',
  '/pgn-study/manifest.json'
  // 🚫 NO incluimos iconos aquí – los cachearemos solo si existen
];

self.addEventListener('install', event => {
  console.log('[SW] Instalando...');
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME).then(cache => {
      // Intentamos cachear solo los esenciales; si falla alguno, no rompe todo
      return Promise.allSettled(
        urlsToCache.map(url => cache.add(url).catch(err => 
          console.warn(`[SW] No se pudo cachear ${url}:`, err)
        ))
      );
    })
  );
});

self.addEventListener('fetch', event => {
  const request = event.request;
  // Estrategia: Cache First para recursos estáticos, Network First para audios
  if (request.url.includes('/audios/')) {
    event.respondWith(
      fetch(request).catch(() => caches.match(request))
    );
  } else {
    event.respondWith(
      caches.match(request).then(response => {
        if (response) return response;
        return fetch(request).then(fetchResponse => {
          // Cacheamos dinámicamente solo si es un recurso estático
          if (request.method === 'GET' && !request.url.includes('/audios/')) {
            const clone = fetchResponse.clone();
            caches.open(CACHE_NAME).then(cache => cache.put(request, clone));
          }
          return fetchResponse;
        });
      }).catch(() => caches.match('/pgn-study/index.html')) // offline fallback
    );
  }
});

self.addEventListener('activate', event => {
  console.log('[SW] Activando...');
  event.waitUntil(
    caches.keys().then(keys => Promise.all(
      keys.map(key => key !== CACHE_NAME && caches.delete(key))
    ))
  );
  self.clients.claim();
});