import Link from 'next/link';
import { allPosts, Post } from 'content-collections';

export default function BlogList() {
  return (
    <>
      <h2 className="text-3xl font-bold mb-6">Articles du blog</h2>
      <ul className="space-y-4">
        {allPosts.map((post: Post) => (
          <li
            key={post._meta.path}
            className="border rounded-lg p-4 hover:shadow-md transition-shadow"
          >
            <Link href={`/blog/${post._meta.path}`}>
              <h3 className="text-xl font-semibold mb-2">{post.title}</h3>
              <p className="text-gray-600">{post.summary}</p>
            </Link>
          </li>
        ))}
      </ul>
    </>
  );
}
