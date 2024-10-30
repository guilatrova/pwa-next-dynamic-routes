import { notFound } from 'next/navigation';

import { BookData } from '@/app/booksMetadata';
import Chapter from '@/app/components/Chapter';
import { ChapterParams, getBookChapterServerSide } from '@/app/utils';

type PageProps = {
  params: Promise<ChapterParams>;
};

export default async function BookChapter(props: PageProps) {
  const chapterParams = await props.params;
  let bookData: BookData;

  try {
    bookData = await getBookChapterServerSide(chapterParams);
  } catch {
    notFound();
    return null;
  }

  const chapter = parseInt(chapterParams.chapter, 10);

  return <Chapter bookId={chapterParams.book} chapter={chapter} content={bookData} />;
}
