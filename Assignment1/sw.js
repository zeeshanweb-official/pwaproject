var cacheName = 'testing_api_06';
var filesToCache = [
    '/',
    'index.html',
    'index.js',
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/css/bootstrap.min.css",
    "https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js",
    "https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.14.3/umd/popper.min.js",
    "https://maxcdn.bootstrapcdn.com/bootstrap/4.1.3/js/bootstrap.min.js",
];

self.addEventListener('install', function(e) {
  console.log('[ServiceWorker] Install');
  e.waitUntil(
    caches.open(cacheName).then(function(cache) {
      console.log('[ServiceWorker] Caching app shell');
      return cache.addAll(filesToCache);
    })
  );
});

self.addEventListener('activate', function(e) {
    console.log('[ServiceWorker] Activate');
    e.waitUntil(
      caches.keys().then(function(keyList) {
        return Promise.all(keyList.map(function(key) {
          if (key !== cacheName) {
            console.log('[ServiceWorker] Removing old cache', key);
            return caches.delete(key);
          }
        }));
      })
    );
    return self.clients.claim();
  });

  self.addEventListener('fetch', function(e) {
        // Do something interesting with the fetch here
        console.log('[ServiceWorker] Fetch', e.request.url);
        e.respondWith(
          caches.match(e.request)
      .then(function(response){
          if(response){
              return response;
          }else{
              return fetch(e.request)
          }
      }));
  });