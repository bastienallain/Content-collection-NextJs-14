'use client';

import { useState, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import BlogPostCard from './BlogPostCard';
import { Post } from 'content-collections';

const POSTS_PER_PAGE = 6;

export default function BlogList({ initialPosts }: { initialPosts: Post[] }) {
  const [displayedPosts, setDisplayedPosts] = useState<Post[]>([]);
  const searchParams = useSearchParams();
  const selectedTag = searchParams.get('tag');

  useEffect(() => {
    const filteredPosts = selectedTag
      ? initialPosts.filter((post) => post.tags.includes(selectedTag))
      : initialPosts;
    setDisplayedPosts(filteredPosts.slice(0, POSTS_PER_PAGE));
  }, [initialPosts, selectedTag]);

  return (
    <div className="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
      {displayedPosts.map((post: Post) => (
        <BlogPostCard key={post._meta.path} post={post} />
      ))}
    </div>
  );
}
