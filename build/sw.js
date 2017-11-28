importScripts('workbox-sw.prod.v2.1.2.js');

/**
 * DO NOT EDIT THE FILE MANIFEST ENTRY
 *
 * The method precache() does the following:
 * 1. Cache URLs in the manifest to a local cache.
 * 2. When a network request is made for any of these URLs the response
 *    will ALWAYS comes from the cache, NEVER the network.
 * 3. When the service worker changes ONLY assets with a revision change are
 *    updated, old cache entries are left as is.
 *
 * By changing the file manifest manually, your users may end up not receiving
 * new versions of files because the revision hasn't changed.
 *
 * Please use workbox-build or some other tool / approach to generate the file
 * manifest which accounts for changes to local files and update the revision
 * accordingly.
 */
const fileManifest = [
  {
    "url": "bundle.js",
    "revision": "c13638928d95cdae29d9aa4fb635b807"
  },
  {
    "url": "index.html",
    "revision": "8a78a678f7873b200aa2036d2f27b678"
  },
  {
    "url": "main-3cd71d475a41bb5211d9.js",
    "revision": "7d2ddd650bcc045556993f4d3a749bfa"
  },
  {
    "url": "main-ee79399e02392724dc16.js",
    "revision": "acce55cdf2e1af06d1268f2ed455d7d7"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
