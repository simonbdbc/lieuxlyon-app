// Initialize required variables - Cache Assets
var shellCacheName = "lieuxlyon";
var filesToCache = [
  "./",
  "./index.html",
  "./src/css/screen.css",
  // "./serviceworker-cache-polyfill.js",
  "./src/assets/icons/android-chrome-192x192.png",
  "./src/assets/icons/android-chrome-512x512.png",
  "./src/assets/icons/apple-touch-icon.png",
  "./src/assets/icons/favicon-16x16.png",
  "./src/assets/icons/favicon-32x32.png",
  "./src/assets/icons/favicon.ico",
  "./src/assets/icons/mstile-70x70.png",
  "./src/assets/icons/mstile-144x144.png",
  "./src/assets/icons/mstile-150x150.png",
  "./src/assets/icons/mstile-310x150.png",
  "./src/assets/icons/mstile-310x310.png",
  "./src/assets/icons/safari-pinned-tab.svg",
  "./src/js/app.js",
  "https://cdn.jsdelivr.net/npm/vue",
  "https://cdnjs.cloudflare.com/ajax/libs/normalize/8.0.0/normalize.min.css"
];

// Listen to installation event
self.addEventListener("install", function(e) {
  //console.log("[ServiceWorker] Install");
  e.waitUntil(
    caches.open(shellCacheName).then(function(cache) {
      console.log("[ServiceWorker] Caching app shell");
      return cache.addAll(filesToCache);
    })
  );
});

// Listen to activation event - Update Assets Cache
self.addEventListener("activate", function(e) {
  //console.log("[ServiceWorker] Activate");
  e.waitUntil(
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
self.addEventListener("fetch", function(e) {
  //console.log("[ServiceWorker] Fetch", e.request.url);
  e.respondWith(
    caches.match(e.request).then(function(response) {
      return response || fetch(e.request);
    })
  );
});
