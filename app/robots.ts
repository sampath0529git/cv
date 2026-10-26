import type { MetadataRoute } from 'next';
import { BRAND_CONFIG, getSiteUrl } from '@/lib/config';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = getSiteUrl();

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: ['/api/', '/share'],
      },
    ],
    sitemap: `${baseUrl}/sitemap.xml`,
    host: `https://${BRAND_CONFIG.domain}`,
  };
}

