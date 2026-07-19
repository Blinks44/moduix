import { createFileRoute } from '@tanstack/react-router';
import { createServerFn } from '@tanstack/react-start';
import { useFumadocsLoader } from 'fumadocs-core/source/client';
import { DocsLayout } from 'fumadocs-ui/layouts/docs';
import { DocsBody, DocsDescription, DocsPage, DocsTitle } from 'fumadocs-ui/layouts/docs/page';
import { ComponentGallery, componentGalleryToc } from '@/components/component-gallery';
import { baseOptions } from '@/lib/layout.shared';
import { siteUrl } from '@/lib/shared';
import { source } from '@/lib/source';

export const Route = createFileRoute('/docs/components')({
  component: ComponentsPage,
  loader: () => loadComponents(),
  head: () => ({
    meta: [
      { title: 'Components — moduix' },
      {
        name: 'description',
        content: 'Browse moduix React components by product need.',
      },
    ],
    links: [{ rel: 'canonical', href: `${siteUrl}/docs/components` }],
  }),
});

const loadComponents = createServerFn({ method: 'GET' }).handler(async () => ({
  components: source
    .getPages()
    .filter((page) => page.data.icon === 'Component')
    .map((page) => ({
      description: page.data.description ?? '',
      slug: page.slugs.at(-1) ?? '',
      title: page.data.title,
      url: page.url,
    }))
    .sort((a, b) => a.title.localeCompare(b.title)),
  pageTree: await source.serializePageTree(source.getPageTree()),
}));

function ComponentsPage() {
  const { components, pageTree } = useFumadocsLoader(Route.useLoaderData());

  return (
    <DocsLayout {...baseOptions()} tree={pageTree}>
      <DocsPage toc={componentGalleryToc}>
        <DocsTitle>Components</DocsTitle>
        <DocsDescription>
          A practical catalog for finding the right primitive before you start composing.
        </DocsDescription>
        <DocsBody>
          <ComponentGallery components={components} />
        </DocsBody>
      </DocsPage>
    </DocsLayout>
  );
}