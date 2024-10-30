export type BookMetadata = {
  id: string;
  title: string;
  chapters: number;
};

export type BookData = {
  [verse: string]: string;
};

export const BOOKS: Record<string, BookMetadata> = {
  b1: {
    id: 'b1',
    title: 'Book A',
    chapters: 3,
  },
  b2: {
    id: 'b2',
    title: 'Book B',
    chapters: 2,
  },
};
