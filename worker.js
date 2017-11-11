var PRECACHE = 'precache-biome';
var RUNTIME = 'runtime';

// list the files you want cached by the service worker
PRECACHE_URLS = [
'qrReader/src/alignpat.js',   'qrReader/src/databr.js',    'qrReader/src/errorlevel.js',  'qrReader/src/gf256poly.js', 
'qrReader/src/bitmat.js',     'qrReader/src/datamask.js',  'qrReader/src/findpat.js',     'qrReader/src/grid.js',       'qrReader/src/version.js',
'qrReader/src/bmparser.js ',  'qrReader/src/decoder.js',   'qrReader/src/formatinf.js',   'qrReader/src/qrcode.js',
'qrReader/src/datablock.js',  'qrReader/src/detector.js',  'qrReader/src/gf256.js',       'qrReader/src/rsdecoder.js'
];


// the rest below handles the installing and caching
self.addEventListener('install', event => {
  event.waitUntil(
     caches.open(PRECACHE).then(cache => cache.addAll(PRECACHE_URLS)).then(self.skipWaiting())
  );
});

self.addEventListener('activate', event => {
  const currentCaches = [PRECACHE, RUNTIME];
  event.waitUntil(
    caches.keys().then(cacheNames => {
      return cacheNames.filter(cacheName => !currentCaches.includes(cacheName));
    }).then(cachesToDelete => {
      return Promise.all(cachesToDelete.map(cacheToDelete => {
        return caches.delete(cacheToDelete);
      }));
    }).then(() => self.clients.claim())
  );
});
/*
self.addEventListener('fetch', event => {
  if (event.request.url.startsWith(self.location.origin)) {
    event.respondWith(
      caches.match(event.request).then(cachedResponse => {
        if (cachedResponse) {
          return cachedResponse;
        }

        return caches.open(RUNTIME).then(cache => {
          return fetch(event.request).then(response => {
            // Put a copy of the response in the runtime cache.
            return cache.put(event.request, response.clone()).then(() => {
              return response;
            });
          });
        });
      })
    );
  }
});*/
self.addEventListener('fetch', function(event) {
  //Check if request is a POST
  if(event.request.method === 'POST'){
    event.respondWith(
      //POST
      fetch(event.request).then(function(response){
        //in the success callback make another request for my list of movies
        return response;
      })
    );
  }
  //if it's not a POST use different caching method
  else{
    event.respondWith(
      caches.match(event.request).then(function(response){
        if(response)
          return response;
        return fetch(event.request).then(function(response){
          return response;
        });
     }));
  }
});