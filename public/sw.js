// Cache name and files to cache
const CACHE_NAME = "pwa-cache-v1";
const urlsToCache = [
  "/",
  "/index.html",
  "/profile.html",
  "/demo.html",
  "/styles.css",
  "/app.js",
  "/SolaimanLipi.ttf",
  "/favicon152.png",
  "/favicon167.png",
  "/favicon180.png",
  "/favicon32.png",
  "/favicon512.png",
  "/manifest.json",
  "/sw.js",
  "/bannerbg.jpg",
  "/joynal.jpg"
];

// Install service worker and cache resources
self.addEventListener("install", event => {
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(cache => {
        console.log("Opened cache");
        return cache.addAll(urlsToCache);
      })
  );
});

// Serve files from cache and update cache
self.addEventListener("fetch", event => {
  event.respondWith(
    caches.match(event.request)
      .then(response => {
        // Serve cached file or fetch from network if not available in cache
        return response || fetch(event.request);
      })
  );
});

// Update service worker and clear old cache
self.addEventListener("activate", event => {
  const cacheWhitelist = [CACHE_NAME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return Promise.all(
        cacheNames.map(cacheName => {
          if (!cacheWhitelist.includes(cacheName)) {
            return caches.delete(cacheName);
          }
        })
      );
    })
  );
});
