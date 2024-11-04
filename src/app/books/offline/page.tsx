import { BookData } from '@/app/booksMetadata';
import Chapter from '@/app/components/Chapter';
import { ChapterParams, getBookChapterClientSide } from '@/app/utils';

type PageProps = {
  searchParams: Promise<ChapterParams>;
};

export default async function OfflineBookChapter(props: PageProps) {
  const chapterParams = await props.searchParams;
  let bookData: BookData;

  try {
    bookData = await getBookChapterClientSide(chapterParams);
  } catch (err) {
    console.error(err);
    return (
      <p>
        Not found book data for: {chapterParams.book} ch {chapterParams.chapter}
      </p>
    );
  }

  const chapter = parseInt(chapterParams.chapter, 10);

  return <Chapter bookId={chapterParams.book} chapter={chapter} content={bookData} />;
}
