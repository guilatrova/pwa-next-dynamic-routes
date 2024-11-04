'use client';

import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';

import { BookData } from '@/app/booksMetadata';
import Chapter from '@/app/components/Chapter';
import { getBookChapterClientSide } from '@/app/offlineUtils';

export default function ClientChapter() {
  const pathname = usePathname();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [bookData, setBookData] = useState<BookData | null>(null);

  const pathParts = pathname.split('/');
  const rawChapter = pathParts.pop();
  const book = pathParts.pop();

  const chapter = parseInt(rawChapter || '0', 10);

  useEffect(() => {
    if (!book || !rawChapter) {
      console.error('No data sent on search params');
      setLoading(false);
      return;
    }

    getBookChapterClientSide({ book, chapter: rawChapter })
      .then(setBookData)
      .catch(setError)
      .finally(() => setLoading(false));
  }, [book, chapter, rawChapter]);

  if (!book || !rawChapter) {
    return <div>No data detected on: {pathname}</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (loading || !bookData) {
    return (
      <div>
        Loading {book} {rawChapter}...
      </div>
    );
  }

  return <Chapter bookId={book} chapter={chapter} content={bookData} />;
}
