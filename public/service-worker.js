//
// 2. Añadir un Service Worker
//
// Archivo tipo de service worker: Para todos los service workers será el mismo
//
'use strict';

// <!-- Inicio - Esto es lo que varía de un service worker -->
// CODELAB: Update cache names any time any of the cached files change.
const CACHE_NAME = 'static-cache-v9'; // Nombre de la caché

// CODELAB: Add list of files to cache here.
const FILES_TO_CACHE = [ // Archivos a la caché, los que se necesitenen cada App ...
    '/assets/bueno_muerto.png',
    '/assets/bueno.png',
    '/assets/clases.png',
    '/assets/game_over.png',
    '/assets/jefe_muerto.png',
    '/assets/jefe.png',
    '/assets/malo_muerto.png',
    '/assets/malo.png',
    '/assets/screenshot.png',
    '/assets/shot1.png',
    '/assets/shot2.png',
    '/assets/you_win.png',
    '/assets/character128.png',
    '/assets/character192.png',
    '/assets/character256.png',
    '/assets/character512.png',
    '/assets/character640.png',
    '/Boss.js', // ... conforme añadimos archivos a la App los añadimos a la caché
    '/Character.js',
    '/Entity.js',
    '/game.css',
    '/Game.js',
    '/index.html',
    '/install.js', // ... conforme añadimos archivos a la App los añadimos a la caché
    '/main.js',
    '/offline.html', // ... conforme añadimos archivos a la App los añadimos a la caché
    '/Opponent.js',
    '/Player.js',
    '/Shot.js'
];
// <!-- Fin - Esto es lo que varía de un service worker -->


//
// Eventos del service worker
//
self.addEventListener('install', (evt) => { // Install 
    console.log('[ServiceWorker] Install');
    // CODELAB: Precache static resources here.
    evt.waitUntil(
        caches.open(CACHE_NAME).then((cache) => { // Abrimos la caché creada al inicio ...
            console.log('[ServiceWorker] Pre-caching offline page');
            return cache.addAll(FILES_TO_CACHE); // ... y añadimos el contenido a cachear
        })
    );
    self.skipWaiting();
});

self.addEventListener('activate', (evt) => { // Activate 
    console.log('[ServiceWorker] Activate');
    // CODELAB: Remove previous cached data from disk.
    evt.waitUntil(
        caches.keys().then((keyList) => { // Comprobamos si el contenido de la caché es correcto ...
            return Promise.all(keyList.map((key) => {
                if (key !== CACHE_NAME) { // ... la borro en caso que no lo sea
                    console.log('[ServiceWorker] Removing old cache', key);
                    return caches.delete(key);
                }
            }));
        })
    );
    self.clients.claim();
});

self.addEventListener('fetch', (evt) => { // Fetcht
    // CODELAB: Add fetch event handler here.
    // if (evt.request.mode !== 'navigate') {
    //   // Not a page navigation, bail.
    //   console.log("Fetch no navigate");
    //   return;
    // }
    console.log('[ServiceWorker] Fetch', evt.request.url); // Solicito un recurso ...
    evt.respondWith(
        caches.open(CACHE_NAME).then((cache) => { // ... abro la caché ...
            return cache.match(evt.request) // ... consulto si el recurso estaba en la caché ...
                .then((response) => {
                    console.log("RESP", response);
                    return response || fetch(evt.request); // ... devuelvo el resultado de la caché o hago la consulta a la red ...
                });
        })
    );
});