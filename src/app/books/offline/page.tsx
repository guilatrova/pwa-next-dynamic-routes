'use client';

import { Suspense } from 'react';

import ClientChapter from './OfflineClientChapter';

export default function OfflineBookChapter() {
  return (
    <Suspense>
      <ClientChapter />
    </Suspense>
  );
}
