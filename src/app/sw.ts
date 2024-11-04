import { Serwist } from 'serwist';

import { CUSTOM_CACHE } from './serviceWorker/caching';

import type { PrecacheEntry, SerwistGlobalConfig } from 'serwist';

// This declares the value of `injectionPoint` to TypeScript.
// `injectionPoint` is the string that will be replaced by the
// actual precache manifest. By default, this string is set to
// `"self.__SW_MANIFEST"`.
declare global {
  interface WorkerGlobalScope extends SerwistGlobalConfig {
    __SW_MANIFEST: (PrecacheEntry | string)[] | undefined;
  }
}

declare const self: ServiceWorkerGlobalScope;

const serwist = new Serwist({
  precacheEntries: self.__SW_MANIFEST,
  skipWaiting: true,
  clientsClaim: true,
  navigationPreload: true,
  runtimeCaching: CUSTOM_CACHE,
});

const DEFAULT_URLS = ['/', '/books/offline'];

self.addEventListener('install', (event) => {
  event.waitUntil(
    Promise.all(
      DEFAULT_URLS.map((entry) => {
        const request = serwist.handleRequest({
          request: new Request(entry),
          event,
        });
        return request;
      })
    )
  );
});

const CACHE_DEMAND_CMD = 'cache-on-demand';
const CACHE_DEMAND_GROUP = 'book-assets';

self.addEventListener('message', async (event) => {
  if (event.data.action === CACHE_DEMAND_CMD) {
    const bookId = event.data.param;
    const cache = await caches.open(CACHE_DEMAND_GROUP);
    const chaptersToCache = [1, 2];

    for (const chapter of chaptersToCache) {
      const jsonUrl = `json/data/books/${bookId}/${chapter}.json`;
      const isCached = await cache.match(jsonUrl);
      if (!isCached) {
        const res = await fetch(jsonUrl);
        await cache.put(jsonUrl, res);
      }
    }
  }
  event.ports[0].postMessage(true);
});

serwist.setCatchHandler(async ({ event, request, url }) => {
  if (request.destination === 'document' && url.origin === location.origin && url.pathname.startsWith('/books')) {
    const match = serwist.handleRequest({ event, request: new Request('/books/offline') });
    return match ? await match : Response.error();
  }
  return Response.error();
});

serwist.addEventListeners();
