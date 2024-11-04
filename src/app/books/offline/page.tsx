'use client';

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

const DynamicComponentWithNoSSR = dynamic(() => import('./OfflineClientChapter'), { ssr: false });

export default function OfflineBookChapter() {
  return (
    <Suspense>
      <DynamicComponentWithNoSSR />
    </Suspense>
  );
}
