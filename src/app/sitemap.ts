import { MetadataRoute } from 'next';
import { sidebarData } from '@/lib/docs-data';
import { SITE_CONFIG } from '@/config/site-config';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = SITE_CONFIG.url;

  const allLinks = sidebarData.flatMap(group => group.links);

  const docsUrls = allLinks.map(link => ({
    url: `${baseUrl}${link.href}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: link.href === '/docs/guides/getting-started' ? 1 : 0.8,
  }));

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...docsUrls,
  ];
}
