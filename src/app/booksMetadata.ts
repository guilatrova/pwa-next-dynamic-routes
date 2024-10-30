export type BookMetadata = {
  id: string;
  title: string;
  chapters: number;
};

export type BookData = {
  [verse: string]: string;
};

export const BOOKS: Record<string, BookMetadata> = {
  a: {
    id: 'a',
    title: 'Book A',
    chapters: 3,
  },
  b: {
    id: 'b',
    title: 'Book B',
    chapters: 2,
  },
};
