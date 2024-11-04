'use client';

import { redirect, usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BookData } from '@/app/booksMetadata';
import Chapter from '@/app/components/Chapter';
import { getBookChapterClientSide } from '@/app/offlineUtils';

export default function ClientChapter() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookData, setBookData] = useState<BookData | null>(null);
  const isOnline = navigator.onLine;

  const pathParts = pathname.split('/');
  const rawChapter = pathParts.pop();
  const book = pathParts.pop();

  const chapter = parseInt(rawChapter || '0', 10);

  useEffect(() => {
    if (!book || !rawChapter) {
      setLoading(false);
      return;
    }

    if (!/^\d+$/.test(rawChapter)) {
      setLoading(false);
      setError('Invalid chapter number');
      return;
    }

    getBookChapterClientSide({ book, chapter: rawChapter })
      .then(setBookData)
      .catch(() => setError("Couldn't load book chapter"))
      .finally(() => setLoading(false));
  }, [book, chapter, rawChapter]);

  if (isOnline) {
    redirect('/');
  }

  if (!book || !rawChapter) {
    return <div>No data detected on: {pathname}</div>;
  }

  if (error) {
    return <div>Error: {error.toString()}</div>;
  }

  if (loading || !bookData) {
    return <div>Loading...</div>;
  }

  return <Chapter bookId={book} chapter={chapter} content={bookData} />;
}
