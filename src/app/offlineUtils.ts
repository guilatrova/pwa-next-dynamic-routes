'use client';

import { BookData } from '@/app/booksMetadata';

export type ChapterParams = {
  book: string;
  chapter: string;
};

// Not being used - how to use in PWA?
const HTTP_URL_PREFIX = 'http://localhost:3000/json/data/books';

export async function getBookChapterClientSide({ book, chapter }: ChapterParams): Promise<BookData> {
  const url = `${HTTP_URL_PREFIX}/${book}/${chapter}.json`;
  const response = await fetch(url);
  const bookData = await response.json();

  return bookData;
}

export async function loadCacheChapter({ book, chapter }: { book: string; chapter: string }): Promise<BookData | null> {
  const cache = await caches.open('book-assets');
  const jsonUrl = `/json/data/books/${book}/${chapter}.json`;

  const cacheResp = await cache.match(jsonUrl);
  if (!cacheResp) {
    return null;
  }

  return cacheResp.json();
}
