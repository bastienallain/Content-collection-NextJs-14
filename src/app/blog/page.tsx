import { Suspense } from 'react';
import { allPosts, Post } from 'content-collections';
import TagFilter from '../components/blog/TagFilter';
import BlogList from '../components/blog/BlogList';
import LoadMoreButton from '../components/blog/LoadMoreButton';

export const dynamic = 'force-dynamic';

async function getUniqueTags() {
  const tags = new Set(allPosts.flatMap((post) => post.tags));
  return Array.from(tags);
}

export default async function BlogPage() {
  const tags = await getUniqueTags();

  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            From the Blog
          </h2>
          <p className="mt-2 text-lg leading-8 text-gray-600">
            Discover our latest articles and stay informed about the latest
            trends.
          </p>
        </div>

        <div className="mt-8 max-w-md mx-auto">
          <TagFilter tags={tags} />
        </div>

        <Suspense fallback={<div>Loading posts...</div>}>
          <BlogList initialPosts={allPosts} />
        </Suspense>

        <LoadMoreButton />
      </div>
    </div>
  );
}
