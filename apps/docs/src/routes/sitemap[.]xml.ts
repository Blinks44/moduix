import { createFileRoute } from '@tanstack/react-router';
import { siteUrl } from '@/lib/shared';
import { source } from '@/lib/source';

export const Route = createFileRoute('/sitemap.xml')({
  server: {
    handlers: {
      GET() {
        const paths = [
          ...new Set(['/', '/docs/components', ...source.getPages().map((page) => page.url)]),
        ].sort();
        const urls = paths
          .map((path) => `  <url><loc>${path === '/' ? siteUrl : `${siteUrl}${path}`}</loc></url>`)
          .join('\n');

        return new Response(
          `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>`,
          {
            headers: {
              'Cache-Control': 'public, max-age=3600',
              'Content-Type': 'application/xml; charset=utf-8',
            },
          },
        );
      },
    },
  },
});