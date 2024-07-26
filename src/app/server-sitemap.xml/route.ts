import { allPosts } from 'content-collections';
import { getServerSideSitemap, ISitemapField } from 'next-sitemap';
import { NextRequest } from 'next/server';

export async function GET(request: NextRequest) {
  const baseUrl =
    process.env.NEXT_PUBLIC_SITE_URL || 'https://votre-domaine.com';

  const posts: ISitemapField[] = allPosts.map((post) => ({
    loc: `${baseUrl}/blog/${post._meta.path}`,
    lastmod: new Date(post.updateDate || post.publishDate).toISOString(),
    changefreq: 'weekly',
    priority: 0.8,
  }));

  const staticPages: ISitemapField[] = ['', '/blog'].map((route) => ({
    loc: `${baseUrl}${route}`,
    lastmod: new Date().toISOString(),
    changefreq: 'daily',
    priority: 1,
  }));

  const fields = [...staticPages, ...posts];

  return getServerSideSitemap(fields);
}

export const dynamic = 'force-dynamic';
export const revalidate = 0;
