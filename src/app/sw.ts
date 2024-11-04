import { defaultCache } from '@serwist/next/worker';
import { Serwist } from 'serwist';

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
  runtimeCaching: defaultCache,
});

const DEFAULT_URLS = ['/', '/books/offline'] as const;

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

serwist.setCatchHandler(async ({ event, request, url }) => {
  if (request.destination === 'document' && url.origin === location.origin && url.pathname.startsWith('/books')) {
    const match = serwist.handleRequest({ event, request: new Request('/books/offline') });
    return match ? await match : Response.error();
  }
  return Response.error();
});

serwist.addEventListeners();
