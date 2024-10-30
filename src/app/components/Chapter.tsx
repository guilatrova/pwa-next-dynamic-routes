import { BookData, BOOKS } from '../booksMetadata';

export default function Chapter({ bookId, content }: { bookId: string; content: BookData }) {
  return (
    <div>
      <h1>{BOOKS[bookId].title}</h1>
      {Object.entries(content).map(([verse, text]) => (
        <div key={verse}>
          <span>{verse} - </span>
          <span>{text}</span>
        </div>
      ))}
    </div>
  );
}
