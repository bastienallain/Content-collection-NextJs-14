import { allPosts, Post } from 'content-collections';
import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Image from 'next/image';

export async function generateStaticParams() {
  return allPosts.map((post) => ({
    slug: post._meta.path,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const post = allPosts.find((p: Post) => p._meta.path === params.slug);

  if (!post) {
    return {};
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: 'article',
      publishedTime: post.publishDate,
      authors: [post.author],
      images: [
        {
          url: post.image.src,
          alt: post.image.alt,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: post.title,
      description: post.description,
      images: [post.image.src],
    },
  };
}

export default function BlogPost({ params }: { params: { slug: string } }) {
  const post = allPosts.find((p: Post) => p._meta.path === params.slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="prose lg:prose-xl">
      <h1>{post.title}</h1>
      <div className="mb-4">
        <Image
          src={post.image.src}
          alt={post.image.alt}
          width={800}
          height={400}
        />
      </div>
      <div className="text-sm text-gray-500 mb-4">
        Publié le {post.publishDate} • Temps de lecture : {post.timeToRead} min
      </div>
      <div dangerouslySetInnerHTML={{ __html: post.content }} />
      <div className="mt-4">
        <h2>Tags</h2>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <span key={tag} className="bg-gray-200 px-2 py-1 rounded">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </article>
  );
}
