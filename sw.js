// Initialize required variables - Cache Assets
var shellCacheName = "lieuxlyon";
var filesToCache = [
  "./",
  "./index.html",
  "./src/css/screen.css",
  "./serviceworker-cache-polyfill.js",
  "./src/assets/icons/blank-thumbnail.png",
  "./src/assets/icons/favicon.png",
  "./src/assets/icons/icon-48.png",
  "./src/assets/icons/icon-96.png",
  "./src/assets/icons/icon-128.png",
  "./src/assets/icons/icon-144.png",
  "./src/assets/icons/icon-152.png",
  "./src/assets/icons/icon-196.png",
  "./src/assets/icons/icon-384.png",
  "./src/js/app.js",
  "https://cdn.jsdelivr.net/npm/vue/dist/vue.js",
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
