self.addEventListener('install', (event) => {
  console.log('[Service Worker] installing service worker...', event)
  event.waitUntil(
    caches.open('static')
      .then((event) => {
        console.log('[Service worker] precaching')
      })
  )
  //if exist will open if not will creat a new one
})

self.addEventListener('activate', (event) => {
  console.log('[Service worker] Activating service worker...', event)
  return self.clients.claim()
})

self.addEventListener('fetch', (event) => {
  console.log('[service worker] Fetching something..s.',event)
})