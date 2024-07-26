import Image from 'next/image';
import Link from 'next/link';
import { allPosts, Post } from 'content-collections';

interface FeaturedPostsProps {
  currentPostId: string;
  limit?: number;
}

export default function FeaturedPosts({
  currentPostId,
  limit = 3,
}: FeaturedPostsProps) {
  const featuredPosts = allPosts
    .filter((post) => post._meta.path !== currentPostId && post.featured)
    .slice(0, limit);

  return (
    <div className="mb-8">
      <h2 className="text-2xl font-bold mb-4">Featured Posts</h2>
      <div className="space-y-4">
        {featuredPosts.map((post) => (
          <Link
            href={`/blog/${post._meta.path}`}
            key={post._meta.path}
            className="block group"
          >
            <div className="flex items-center space-x-4">
              <div className="flex-shrink-0 w-24 h-24 relative">
                <Image
                  src={post.image.src}
                  alt={post.image.alt}
                  layout="fill"
                  objectFit="cover"
                  className="rounded-md"
                />
              </div>
              <div className="flex-grow">
                <h3 className="text-lg font-semibold group-hover:text-green-500 transition-colors duration-200">
                  {post.title}
                </h3>
                <p className="text-sm text-gray-600">
                  {new Date(post.publishDate).toLocaleDateString()}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
