const CACHE_NAME = "buzzcut-learning-v1";
const ASSETS = [
    "./",
    "./index.html",
    "./css/style.css",
    "./js/app.js",
    "./js/leitner.js",
    "./manifest.json"
];

self.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(CACHE_NAME).then((cache) => {
            return cache.addAll(ASSETS);
        })
    );
});

self.addEventListener("fetch", (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});
