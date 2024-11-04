'use client';

import { useState } from 'react';

export default function Page() {
  const [isComplete, setIsComplete] = useState(false);

  const cacheContent = async () => {
    const res = await window.serwist.messageSW({ action: 'cache-on-demand', param: 'b1' });
    setIsComplete(res);
  };

  return (
    <main>
      <h1>Cache book content on demand!</h1>
      <p>Clicking the button will cache b1 chapters 1 and 2</p>
      <button onClick={cacheContent}>Cache book</button>
      {isComplete && (
        <>
          <p>Book cached cached!</p>
        </>
      )}
    </main>
  );
}
