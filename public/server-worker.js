
const FILES_TO_CACHE = [
    '/',
    '/index.js',
    'style.css'
];

const CACHE_NAME = "static-cache-v2";
const DATA_CACHE_NAME = "data-cache-v1";


self.addEventListener("install", function (evt) {
    evt.waitUntil(
        caches.open(CACHE_NAME).then(cache => {
            console.log("Your files were pre-cached successfully!");
            return cache.addAll(FILES_TO_CACHE);
        })
    );

    // self.skipWaiting();
});

// self.addEventListener("activate", function (evt) {
//     evt.waitUntil(
//         caches.keys().then(keyList => {
//             return Promise.all(
//                 keyList.map(key => {
//                     if (key !== CACHE_NAME && key !== DATA_CACHE_NAME) {
//                         console.log("Removing old cache data", key);
//                         return caches.delete(key);
//                     }
//                 })
//             );
//         })
//     );

//     self.clients.claim();
// });

// fetch
self.addEventListener("fetch", function (evt) {
    // cache successful requests to the API

    evt.respondWith(
        fetch(evt.request).catch(function () {
            return caches.match(evt.request).then(function (res) {
                if (res) {
                    return res;
                } else if (evt.request.headers.get("accept").includes("text/html")) {
                    return caches.match("/index.html")
                }
            })
        })
    )
});