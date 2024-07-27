import Image from 'next/image';
import Link from 'next/link';
import { allPosts, Post } from 'content-collections';
import ShareButtons from '@/blog/ShareButtons';
import FeaturedPosts from '@/blog/FeaturedPosts';
import ShinyTag from '@/blog/ButtonTag';

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.path,
  }));
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = allPosts.find((p) => p._meta.path === params.slug);

  if (!post) {
    return <div>Post not found</div>;
  }

  return (
    <article className="max-w-screen-5xl mx-auto pt-20">
      <div className="relative w-full h-96">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          layout="fill"
          objectFit="cover"
          className="rounded-none"
        />
        <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <ShinyTag
              key={tag}
              text={tag}
              className="text-xs py-1 px-3" // Adjust size and padding as needed
            />
          ))}
        </div>
      </div>

      <div className="max-w-screen-xl mx-auto">
        <div className="mt-8 px-4 lg:px-0">
          <h1 className="text-4xl font-bold mb-4">{post.title}</h1>
          <div className="flex items-center text-gray-600 mb-8">
            <span>{new Date(post.publishDate).toLocaleDateString()}</span>
            <span className="mx-2">•</span>
            <span>{post.author}</span>
          </div>

          <div className="lg:flex lg:gap-8">
            <div className="lg:w-3/4">
              <div
                className="prose max-w-none"
                dangerouslySetInnerHTML={{ __html: post.content }}
              />
            </div>
            <div className="lg:w-1/4 mt-8 lg:mt-0">
              <div className="sticky top-8">
                <ShareButtons
                  url={`/blog/${post._meta.path}`}
                  title={post.title}
                />
                <FeaturedPosts currentPostId={post._meta.path} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </article>
  );
}
