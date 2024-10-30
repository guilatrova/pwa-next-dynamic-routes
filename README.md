# PWA + NextJs + Dynamic Routes

This project intents to show to precache json files and handle dynamic routes gracefully.

### JSON Data

Book Data is stored as json under [`public/json/data/books`](public/json/data/books/)

The data is simple, e.g.:

```ts
export type BookData = {
  [verse: string]: string;
};
```

```json
{
  "1": "The only limit to our realization of tomorrow is our doubts of today.",
  "2": "In the end, we will remember not the words of our enemies, but the silence of our friends.",
  "3": "The best way to predict the future is to invent it.",
  "4": "Life is 10% what happens to us and 90% how we react to it."
}
```

### Reading the json

Feature implemented in [utils](./src/app/utils.ts):

- We can handle reading from **Server side** using `fs` (see `getBookChapterServerSide`)
- We can handle reading from **Client side** using `fetch` (see `getBookChapterClientSide`)

### Components

- [Index page](./src/app/page.tsx) shows all book chapters available (this can be easily cached by PWA)
- [Chapter page](./src/app/books/[book]/[chapter]/page.tsx) is dynamic, reads the data and pass to `Chapter` component (hard to cache with PWA)
- [Chapter component](./src/app/components/Chapter.tsx) is dummy, just displays the chapter data.

### Challenge

How to precache the json files (easy actually), but still handle the dynamic chapter page?

Somehow on **OFFLINE mode** visiting http://localhost:3000/books/a/3 -> render `Chapter` component -> pulls JSON data from cache.

