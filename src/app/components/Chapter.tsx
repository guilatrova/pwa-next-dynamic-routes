import Link from 'next/link';

import { BookData, BOOKS } from '../booksMetadata';

export default function Chapter({ bookId, chapter, content }: { bookId: string; chapter: number; content: BookData }) {
  return (
    <main>
      <h1>{BOOKS[bookId].title}</h1>
      {Object.entries(content).map(([verse, text]) => (
        <div key={verse}>
          <span>{verse} - </span>
          <span>{text}</span>
        </div>
      ))}

      {chapter > 1 && (
        <Link href={`/books/${bookId}/${chapter - 1}`}>
          <button>Back</button>
        </Link>
      )}

      <Link href={`/books/${bookId}/${chapter + 1}`}>
        <button>Next</button>
      </Link>
    </main>
  );
}
