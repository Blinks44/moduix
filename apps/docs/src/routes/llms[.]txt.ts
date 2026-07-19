import { createFileRoute } from '@tanstack/react-router';
import { siteUrl } from '@/lib/shared';
import { slugsToMarkdownPath, source } from '@/lib/source';
import docsMeta from '../../content/docs/meta.json';

export const Route = createFileRoute('/llms.txt')({
  server: {
    handlers: {
      GET() {
        const pages = source.getPages();
        const sections: { title: string; slugs: string[] }[] = [];

        for (const item of docsMeta.pages) {
          const separator = /^---(.+)---$/.exec(item);
          if (separator) {
            sections.push({ title: separator[1], slugs: [] });
          } else if (item !== '...' && !item.startsWith('[') && !item.startsWith('external:')) {
            sections.at(-1)?.slugs.push(item);
          }
        }

        const curated = new Set(sections.flatMap((section) => section.slugs));

        const links = (slugs: string[]) =>
          slugs.flatMap((slug) => {
            const page = pages.find((candidate) => (candidate.slugs.at(-1) ?? 'index') === slug);
            if (!page) return [];

            return `- [${page.data.title}](${siteUrl}${slugsToMarkdownPath(page.slugs).url}): ${page.data.description}`;
          });

        const components = pages
          .filter((page) => !curated.has(page.slugs.at(-1) ?? 'index'))
          .sort((a, b) => a.data.title.localeCompare(b.data.title))
          .map(
            (page) =>
              `- [${page.data.title}](${siteUrl}${slugsToMarkdownPath(page.slugs).url}): ${page.data.description}`,
          );

        return new Response(
          [
            '# moduix',
            '> Ark-first React components for product interfaces. Install moduix as an npm package for managed updates, or install source with the shadcn-compatible registry when you need direct ownership.',
            ...sections.flatMap((section) => [`## ${section.title}`, ...links(section.slugs)]),
            '## Components',
            ...components,
            '## AI documentation',
            `- [Full documentation](${siteUrl}/llms-full.txt): Complete moduix documentation in one Markdown document.`,
          ].join('\n\n'),
          {
            headers: {
              'Content-Type': 'text/plain; charset=utf-8',
            },
          },
        );
      },
    },
  },
});