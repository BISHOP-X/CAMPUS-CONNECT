// Campus Connect Service Worker - Force refresh for new images
const CACHE_NAME = 'campus-connect-v3'; // Updated for new deployment and simplified logo
const urlsToCache = [
  '/',
  '/static/js/bundle.js',
  '/static/css/main.css',
  '/manifest.json'
  // Intentionally exclude CAMPUSCONNECT.png to prevent caching issues
];

// Install event
self.addEventListener('install', (event) => {
  // Force immediate activation
  self.skipWaiting();
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then((cache) => {
        return cache.addAll(urlsToCache);
      })
  );
});

// Fetch event - special handling for images
self.addEventListener('fetch', (event) => {
  // Never cache CAMPUSCONNECT.png - always fetch fresh
  if (event.request.url.includes('CAMPUSCONNECT.png')) {
    event.respondWith(
      fetch(event.request.url + '?bust=' + Date.now())
        .catch(() => fetch(event.request))
    );
    return;
  }

  // For other requests, use normal caching
  event.respondWith(
    caches.match(event.request)
      .then((response) => {
        return response || fetch(event.request);
      }
    )
  );
});

// Activate event - clear old caches
self.addEventListener('activate', (event) => {
  // Take control immediately
  event.waitUntil(
    Promise.all([
      self.clients.claim(),
      caches.keys().then((cacheNames) => {
        return Promise.all(
          cacheNames.map((cacheName) => {
            if (cacheName !== CACHE_NAME) {
              return caches.delete(cacheName);
            }
          })
        );
      })
    ])
  );
});
