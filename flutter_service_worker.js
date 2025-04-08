'use strict';
const MANIFEST = 'flutter-app-manifest';
const TEMP = 'flutter-temp-cache';
const CACHE_NAME = 'flutter-app-cache';

const RESOURCES = {"assets/AssetManifest.bin": "625b957dc0b124d9bd5479665eeece21",
"assets/AssetManifest.bin.json": "13c06a2272ac6452a1c217c0fd6d589f",
"assets/AssetManifest.json": "0912a427256964297aa51964637d6a7c",
"assets/assets/ai_nakayoshi.png": "f8b72a7a9be30a05665912bd495f3130",
"assets/assets/ai_search.png": "ebd19be7e653bd0f9683ecd95a653e4b",
"assets/assets/ai_study.png": "5d6312ce0e03a24d3acb79b43b2ab651",
"assets/assets/background.jpg": "a59800ab52263e2d2171e4ca8dadc1e2",
"assets/assets/background_intellici.png": "b472d52b7c5bf80f52a2297750f5b871",
"assets/assets/bagonew.png": "e2060f6db151d68f9114aaeef91c56b2",
"assets/assets/bago_background.png": "f23c4b66cc222db67c6c0fdb34bc918e",
"assets/assets/bago_icon.png": "bf82dfbc9cd11e8f470b092314568f58",
"assets/assets/f4285315799f28c0edee16.jpg": "4901b9750ab3ed5e3523ea4c199b8a8e",
"assets/assets/intellici_icon.png": "1ce85b738c4dac4f1b6f5ab7f4bf9b98",
"assets/assets/intellici_icon2.png": "cfafc9cbb342dfff1b63a1b7093879ff",
"assets/assets/pexels-0.jpg": "a532ebbb0a55fab0084dfe64b8d91855",
"assets/assets/pexels-1.jpg": "a8fd484b132489e54e8c209171860149",
"assets/assets/pexels-2.jpg": "b542f4957918084d369f1589b6074284",
"assets/assets/pexels-3.jpg": "105e7b445ffee2787b75d2ba297bca9f",
"assets/assets/pexels-3.png": "f57dd4a6367ce3e31604883a5306f8a1",
"assets/assets/xingweizhunze1.jpg": "c7c03d1bcf4f1cb8cb194ef4871771d6",
"assets/assets/zhipuai.png": "ebd4f0c4a8602446338b949ef4bca119",
"assets/FontManifest.json": "dc3d03800ccca4601324923c0b1d6d57",
"assets/fonts/MaterialIcons-Regular.otf": "058335b430161218c0f2c3f5affc8734",
"assets/NOTICES": "fb4b2270fca1bb4299496a63dfcbd068",
"assets/packages/cupertino_icons/assets/CupertinoIcons.ttf": "33b7d9392238c04c131b6ce224e13711",
"assets/shaders/ink_sparkle.frag": "ecc85a2e95f5e9f53123dcaf8cb9b6ce",
"canvaskit/canvaskit.js": "6cfe36b4647fbfa15683e09e7dd366bc",
"canvaskit/canvaskit.js.symbols": "68eb703b9a609baef8ee0e413b442f33",
"canvaskit/canvaskit.wasm": "efeeba7dcc952dae57870d4df3111fad",
"canvaskit/chromium/canvaskit.js": "ba4a8ae1a65ff3ad81c6818fd47e348b",
"canvaskit/chromium/canvaskit.js.symbols": "5a23598a2a8efd18ec3b60de5d28af8f",
"canvaskit/chromium/canvaskit.wasm": "64a386c87532ae52ae041d18a32a3635",
"canvaskit/skwasm.js": "f2ad9363618c5f62e813740099a80e63",
"canvaskit/skwasm.js.symbols": "80806576fa1056b43dd6d0b445b4b6f7",
"canvaskit/skwasm.wasm": "f0dfd99007f989368db17c9abeed5a49",
"canvaskit/skwasm.worker.js": "bfb704a6c714a75da9ef320991e88b03",
"canvaskit/skwasm_st.js": "d1326ceef381ad382ab492ba5d96f04d",
"canvaskit/skwasm_st.js.symbols": "c7e7aac7cd8b612defd62b43e3050bdd",
"canvaskit/skwasm_st.wasm": "56c3973560dfcbf28ce47cebe40f3206",
"favicon.png": "071ae4b3007d92afd7b4faa6f4d25abc",
"flutter.js": "76f08d47ff9f5715220992f993002504",
"flutter_bootstrap.js": "9b31ef359dfa6b04e88c7103ddcb04eb",
"icons/Icon-192.png": "a14f1ecd042f997952f5649a3084b625",
"icons/Icon-512.png": "f3f909582beacc4e56e1af20aeeb8f3a",
"icons/Icon-maskable-192.png": "a14f1ecd042f997952f5649a3084b625",
"icons/Icon-maskable-512.png": "f3f909582beacc4e56e1af20aeeb8f3a",
"index.html": "290be38c454da11f39782f5799c27631",
"/": "290be38c454da11f39782f5799c27631",
"main.dart.js": "b5537b19284966d9efbdd5c614a39ee2",
"manifest.json": "29f746c0bd4726414e2fa229ac98bdce",
"robots.txt": "5c3148169a43707406d58cbbbf283544",
"sitemap.xml": "09979e3acc7a344c5c4404b0526b05a1",
"version.json": "3518ae9a8983a9364bc29872e14716fc"};
// The application shell files that are downloaded before a service worker can
// start.
const CORE = ["main.dart.js",
"index.html",
"flutter_bootstrap.js",
"assets/AssetManifest.bin.json",
"assets/FontManifest.json"];

// During install, the TEMP cache is populated with the application shell files.
self.addEventListener("install", (event) => {
  self.skipWaiting();
  return event.waitUntil(
    caches.open(TEMP).then((cache) => {
      return cache.addAll(
        CORE.map((value) => new Request(value, {'cache': 'reload'})));
    })
  );
});
// During activate, the cache is populated with the temp files downloaded in
// install. If this service worker is upgrading from one with a saved
// MANIFEST, then use this to retain unchanged resource files.
self.addEventListener("activate", function(event) {
  return event.waitUntil(async function() {
    try {
      var contentCache = await caches.open(CACHE_NAME);
      var tempCache = await caches.open(TEMP);
      var manifestCache = await caches.open(MANIFEST);
      var manifest = await manifestCache.match('manifest');
      // When there is no prior manifest, clear the entire cache.
      if (!manifest) {
        await caches.delete(CACHE_NAME);
        contentCache = await caches.open(CACHE_NAME);
        for (var request of await tempCache.keys()) {
          var response = await tempCache.match(request);
          await contentCache.put(request, response);
        }
        await caches.delete(TEMP);
        // Save the manifest to make future upgrades efficient.
        await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
        // Claim client to enable caching on first launch
        self.clients.claim();
        return;
      }
      var oldManifest = await manifest.json();
      var origin = self.location.origin;
      for (var request of await contentCache.keys()) {
        var key = request.url.substring(origin.length + 1);
        if (key == "") {
          key = "/";
        }
        // If a resource from the old manifest is not in the new cache, or if
        // the MD5 sum has changed, delete it. Otherwise the resource is left
        // in the cache and can be reused by the new service worker.
        if (!RESOURCES[key] || RESOURCES[key] != oldManifest[key]) {
          await contentCache.delete(request);
        }
      }
      // Populate the cache with the app shell TEMP files, potentially overwriting
      // cache files preserved above.
      for (var request of await tempCache.keys()) {
        var response = await tempCache.match(request);
        await contentCache.put(request, response);
      }
      await caches.delete(TEMP);
      // Save the manifest to make future upgrades efficient.
      await manifestCache.put('manifest', new Response(JSON.stringify(RESOURCES)));
      // Claim client to enable caching on first launch
      self.clients.claim();
      return;
    } catch (err) {
      // On an unhandled exception the state of the cache cannot be guaranteed.
      console.error('Failed to upgrade service worker: ' + err);
      await caches.delete(CACHE_NAME);
      await caches.delete(TEMP);
      await caches.delete(MANIFEST);
    }
  }());
});
// The fetch handler redirects requests for RESOURCE files to the service
// worker cache.
self.addEventListener("fetch", (event) => {
  if (event.request.method !== 'GET') {
    return;
  }
  var origin = self.location.origin;
  var key = event.request.url.substring(origin.length + 1);
  // Redirect URLs to the index.html
  if (key.indexOf('?v=') != -1) {
    key = key.split('?v=')[0];
  }
  if (event.request.url == origin || event.request.url.startsWith(origin + '/#') || key == '') {
    key = '/';
  }
  // If the URL is not the RESOURCE list then return to signal that the
  // browser should take over.
  if (!RESOURCES[key]) {
    return;
  }
  // If the URL is the index.html, perform an online-first request.
  if (key == '/') {
    return onlineFirst(event);
  }
  event.respondWith(caches.open(CACHE_NAME)
    .then((cache) =>  {
      return cache.match(event.request).then((response) => {
        // Either respond with the cached resource, or perform a fetch and
        // lazily populate the cache only if the resource was successfully fetched.
        return response || fetch(event.request).then((response) => {
          if (response && Boolean(response.ok)) {
            cache.put(event.request, response.clone());
          }
          return response;
        });
      })
    })
  );
});
self.addEventListener('message', (event) => {
  // SkipWaiting can be used to immediately activate a waiting service worker.
  // This will also require a page refresh triggered by the main worker.
  if (event.data === 'skipWaiting') {
    self.skipWaiting();
    return;
  }
  if (event.data === 'downloadOffline') {
    downloadOffline();
    return;
  }
});
// Download offline will check the RESOURCES for all files not in the cache
// and populate them.
async function downloadOffline() {
  var resources = [];
  var contentCache = await caches.open(CACHE_NAME);
  var currentContent = {};
  for (var request of await contentCache.keys()) {
    var key = request.url.substring(origin.length + 1);
    if (key == "") {
      key = "/";
    }
    currentContent[key] = true;
  }
  for (var resourceKey of Object.keys(RESOURCES)) {
    if (!currentContent[resourceKey]) {
      resources.push(resourceKey);
    }
  }
  return contentCache.addAll(resources);
}
// Attempt to download the resource online before falling back to
// the offline cache.
function onlineFirst(event) {
  return event.respondWith(
    fetch(event.request).then((response) => {
      return caches.open(CACHE_NAME).then((cache) => {
        cache.put(event.request, response.clone());
        return response;
      });
    }).catch((error) => {
      return caches.open(CACHE_NAME).then((cache) => {
        return cache.match(event.request).then((response) => {
          if (response != null) {
            return response;
          }
          throw error;
        });
      });
    })
  );
}
