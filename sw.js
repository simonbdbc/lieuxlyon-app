// Initialize required variables - Cache Assets
var shellCacheName = "lieuxlyon-v1.01";
var filesToCache = [
  "./",
  "./index.html",
  "./css/main.css",
  // "./serviceworker-cache-polyfill.js",
  "./images/icons/android-chrome-192x192.png",
  "./images/icons/android-chrome-512x512.png",
  "./images/icons/apple-touch-icon.png",
  "./images/icons/favicon-16x16.png",
  "./images/icons/favicon-32x32.png",
  "./images/icons/favicon.ico",
  "./images/icons/mstile-70x70.png",
  "./images/icons/mstile-144x144.png",
  "./images/icons/mstile-150x150.png",
  "./images/icons/mstile-310x150.png",
  "./images/icons/mstile-310x310.png",
  "./images/icons/safari-pinned-tab.svg",
  "./app.js",
  "https://cdn.jsdelivr.net/npm/vue",
  "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css"
];

// Listen to installation event
self.addEventListener("install", function(event) {
  //console.log("[ServiceWorker] Install");
  event.waitUntil(
    caches.open(shellCacheName).then(function(cache) {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});

// Listen to activation event - Update Assets Cache
self.addEventListener("activate", function(event) {
  //console.log("[ServiceWorker] Activate");
  event.waitUntil(
    // Get all cache containers
    caches.keys().then(function(keyList) {
      return Promise.all(
        keyList.map(function(key) {
          // Check and remove invalid cache containers
          if (key !== shellCacheName) {
            //console.log("[ServiceWorker] Removing old cache", key);
            return caches.delete(key);
          }
        })
      );
    })
  );

  // Enforce immediate scope control
  return self.clients.claim();
});

// Listen to fetching event - Serve App Shell Offline From Cache
self.addEventListener("fetch", function(event) {
  //console.log("[ServiceWorker] Fetch", event.request.url);
  event.respondWith(
    caches.match(event.request).then(function(response) {
      if (response) {
        return response;
      }
      return fetch(event.request);
    })
  );
});

self.addEventListener("message", function(event) {
  if (event.data.action === "skipWaiting") {
    self.skipWaiting();
  }
});
