// Masaliya service worker (generated at build time)
const CACHE = 'masaliya-e5f2b79d01';
const PRECACHE = ["./","./index.html","./apple-touch-icon.png","./icon-512.png","./icon.svg","./manifest.webmanifest","./assets/andika-latin-400-normal-BTFTIZb-.woff2","./assets/andika-latin-ext-400-normal-D580Nkki.woff2","./assets/andika-latin-700-normal-Dk95f5lc.woff2","./assets/andika-latin-ext-700-normal-Ch3SGZaH.woff2","./assets/grandstander-latin-ext-600-normal-BLRGYHrl.woff2","./assets/grandstander-latin-ext-800-normal-DXxZD3HK.woff2","./assets/grandstander-latin-600-normal-DhUtGjFB.woff2","./assets/grandstander-latin-800-normal-C5RZ1tt5.woff2","./assets/index-C-2nC65i.css","./assets/index-BEsHQWer.js"];

self.addEventListener('install', (e) => {
  e.waitUntil(caches.open(CACHE).then((c) => c.addAll(PRECACHE)).then(() => self.skipWaiting()));
});

self.addEventListener('activate', (e) => {
  e.waitUntil(
    caches
      .keys()
      .then((keys) => Promise.all(keys.filter((k) => k.startsWith('masaliya-') && k !== CACHE).map((k) => caches.delete(k))))
      .then(() => self.clients.claim()),
  );
});

self.addEventListener('fetch', (e) => {
  const req = e.request;
  if (req.method !== 'GET' || new URL(req.url).origin !== self.location.origin) return;
  if (req.mode === 'navigate') {
    // Network first for the page itself, so updates arrive; the cached copy works offline.
    e.respondWith(
      fetch(req)
        .then((res) => {
          const copy = res.clone();
          caches.open(CACHE).then((c) => c.put('./index.html', copy));
          return res;
        })
        .catch(() => caches.match('./index.html')),
    );
    return;
  }
  e.respondWith(
    caches.match(req).then(
      (hit) =>
        hit ||
        fetch(req).then((res) => {
          if (res.ok) {
            const copy = res.clone();
            caches.open(CACHE).then((c) => c.put(req, copy));
          }
          return res;
        }),
    ),
  );
});
