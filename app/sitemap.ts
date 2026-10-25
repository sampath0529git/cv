import type { MetadataRoute } from 'next';
import { BRAND_CONFIG } from '@/lib/config';
import { BLOG_POSTS } from '@/data/blogPosts';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = `https://${BRAND_CONFIG.domain}`;

  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${baseUrl}/`,
      lastModified: new Date('2026-10-25T00:00:00.000Z'),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${baseUrl}/templates`,
      lastModified: new Date('2026-10-25T00:00:00.000Z'),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date('2026-10-25T00:00:00.000Z'),
      changeFrequency: 'daily',
      priority: 0.8,
    },
  ];

  const blogPages: MetadataRoute.Sitemap = BLOG_POSTS.map((post) => ({
    url: `${baseUrl}/blog/${post.id}`,
    lastModified: new Date(post.dateModified || post.datePublished),
    changeFrequency: 'monthly',
    priority: 0.75,
  }));

  return [...staticPages, ...blogPages];
}
