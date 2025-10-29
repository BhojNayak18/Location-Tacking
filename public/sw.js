self.addEventListener('install', () => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(self.clients.claim());
});

// Transparent fetch handler; you can extend this to cache assets for offline use
self.addEventListener('fetch', () => {
  // Intentionally pass-through for now
});


