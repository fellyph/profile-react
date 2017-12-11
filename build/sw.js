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
    "url": "app/assets/js/app.js",
    "revision": "7642a26eaed94bb0cb17fa543b77f1e6"
  },
  {
    "url": "app/assets/js/blog/blogItem.js",
    "revision": "ecd77d01030ea633e80a7f38ff73d6f5"
  },
  {
    "url": "app/assets/js/blog/blogList.js",
    "revision": "4857a4721ecd5caeb3b48ea3861e3a23"
  },
  {
    "url": "app/assets/js/bundle.js",
    "revision": "5559dece7526f6addb1474df8abdee7a"
  },
  {
    "url": "app/assets/js/common/thumb.js",
    "revision": "75b8888e1f2f566a6db7eecd8921e9d8"
  },
  {
    "url": "app/assets/js/index.js",
    "revision": "242af0528000818befb8360009c0bcea"
  },
  {
    "url": "app/assets/js/main.js",
    "revision": "5d40250c463eef2bb59a5b7b11d09457"
  },
  {
    "url": "app/assets/js/portfolio/portfolioItem.js",
    "revision": "f2bf590fc0fee578d4edb948357f87a9"
  },
  {
    "url": "app/assets/js/portfolio/portfolioList.js",
    "revision": "4a2f1f984803bb8d119d60baa89d76d5"
  },
  {
    "url": "app/html/template.html",
    "revision": "91c76184db1ea2731b7ee40474930933"
  },
  {
    "url": "build/bundle.js",
    "revision": "c13638928d95cdae29d9aa4fb635b807"
  },
  {
    "url": "build/index.html",
    "revision": "8a78a678f7873b200aa2036d2f27b678"
  },
  {
    "url": "build/main-3cd71d475a41bb5211d9.js",
    "revision": "7d2ddd650bcc045556993f4d3a749bfa"
  },
  {
    "url": "build/main-ee79399e02392724dc16.js",
    "revision": "acce55cdf2e1af06d1268f2ed455d7d7"
  },
  {
    "url": "server.js",
    "revision": "3fc6843eef95150258e1d99e28f1bb9b"
  },
  {
    "url": "webpack.config.js",
    "revision": "00652ce6338e19505aae31e9f504973d"
  },
  {
    "url": "webpack.prod.config.js",
    "revision": "b5109c7aedeb12296cae7b7a7f8d336f"
  }
];

const workboxSW = new self.WorkboxSW({
  "skipWaiting": true,
  "clientsClaim": true
});
workboxSW.precache(fileManifest);
