import Link from 'next/link';

import { BOOKS } from './booksMetadata';

export default function BooksIndex() {
  return (
    <main>
      <Link href="/books/cache">Cache manually for offline reading</Link>

      <h1>Books</h1>
      {Object.entries(BOOKS).map(([bookId, bookData]) => (
        <div key={bookId}>
          <h2>{bookData.title}</h2>
          <p>Chapters: {bookData.chapters}</p>

          {Array.from({ length: bookData.chapters }).map((_, i) => (
            <p key={i}>
              <Link href={`/books/${bookId}/${i + 1}`}>Chapter {i + 1}</Link>
            </p>
          ))}
        </div>
      ))}
    </main>
  );
}
