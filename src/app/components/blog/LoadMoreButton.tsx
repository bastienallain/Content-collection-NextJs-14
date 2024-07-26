'use client';

import { useCallback, useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';

export default function LoadMoreButton() {
  const [page, setPage] = useState(1);
  const router = useRouter();
  const searchParams = useSearchParams();

  const loadMore = useCallback(() => {
    const newPage = page + 1;
    setPage(newPage);
    const currentParams = new URLSearchParams(searchParams.toString());
    currentParams.set('page', newPage.toString());
    router.push(`/blog?${currentParams.toString()}`);
  }, [page, router, searchParams]);

  return (
    <div className="mt-12 text-center">
      <button
        onClick={loadMore}
        className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition duration-300"
      >
        Load More
      </button>
    </div>
  );
}
