import fs, { promises as fsAsync } from 'fs';
import path from 'path';

import { BookData } from '@/app/booksMetadata';

export type ChapterParams = {
  book: string;
  chapter: string;
};

async function readFileContent<T>(filePath: string): Promise<T> {
  const fileContents = await fsAsync.readFile(filePath, 'utf8');
  return JSON.parse(fileContents);
}

const FS_DATA_PREFIX = path.join(process.cwd(), 'public/json/data/books');

export async function getBookChapterServerSide({ book, chapter }: ChapterParams): Promise<BookData> {
  const filePath = path.join(FS_DATA_PREFIX, book, `${chapter}.json`);

  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found at ${filePath}`);
  }

  const bookData = await readFileContent<BookData>(filePath);

  return bookData;
}

// Not being used - how to use in PWA?
const HTTP_URL_PREFIX = path.join(process.cwd(), 'json/data/books');

export async function getBookChapterClientSide({ book, chapter }: ChapterParams): Promise<BookData> {
  const response = await fetch(`${HTTP_URL_PREFIX}/${book}/${chapter}.json`);
  const bookData = await response.json();

  return bookData;
}
