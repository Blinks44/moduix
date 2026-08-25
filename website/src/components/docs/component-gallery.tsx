import { useLang, usePages } from '@rspress/core/runtime';
import { Card, Cards } from '../mdx/Components';
import { ComponentCardPreview } from './component-card-preview';

const categories = [
  {
    id: 'form-input',
    slugs: [
      'checkbox',
      'color-picker',
      'combobox',
      'date-input',
      'date-picker',
      'editable',
      'field',
      'fieldset',
      'file-upload',
      'input',
      'input-group',
      'native-select',
      'number-input',
      'password-input',
      'pin-input',
      'radio-group',
      'rating-group',
      'segment-group',
      'select',
      'signature-pad',
      'slider',
      'switch',
      'tags-input',
      'textarea',
      'toggle',
      'toggle-group',
    ],
  },
  {
    id: 'layout-navigation',
    slugs: [
      'accordion',
      'aspect-ratio',
      'bleed',
      'breadcrumbs',
      'composition-patterns',
      'container',
      'menu',
      'navigation-menu',
      'pagination',
      'scroll-area',
      'separator',
      'sidebar',
      'simple-grid',
      'splitter',
      'stack',
      'steps',
      'tabs',
      'tree-view',
    ],
  },
  {
    id: 'overlays-dialogs',
    slugs: [
      'command-palette',
      'dialog',
      'drawer',
      'floating-panel',
      'hover-card',
      'lightbox',
      'popover',
      'tooltip',
      'tour',
    ],
  },
  {
    id: 'feedback-status',
    slugs: [
      'alert',
      'empty',
      'progress-circular',
      'progress-linear',
      'skeleton',
      'spinner',
      'toast',
    ],
  },
  {
    id: 'display-content',
    slugs: [
      'avatar',
      'badge',
      'card',
      'chart',
      'heading',
      'image',
      'image-cropper',
      'json-tree-view',
      'kbd',
      'list',
      'listbox',
      'marquee',
      'qr-code',
      'table',
      'tag',
      'text',
      'timer',
      'typeset',
    ],
  },
  {
    id: 'actions-utilities',
    slugs: [
      'angle-slider',
      'button',
      'carousel',
      'clipboard',
      'close-button',
      'collapsible',
      'split-button',
      'utilities',
    ],
  },
] as const;

type ComponentCategory = (typeof categories)[number]['id'];

export function ComponentGallery({ category: categoryId }: { category: ComponentCategory }) {
  const lang = useLang();
  const { pages } = usePages();
  const components = pages
    .filter(
      (page) =>
        page.lang === lang &&
        page.routePath.includes('/docs/') &&
        typeof page.frontmatter.component === 'string',
    )
    .map((page) => ({
      slug: page.routePath.split('/').filter(Boolean).at(-1) ?? '',
      description: page.description ?? '',
      title: page.title,
      url: page.routePath,
    }))
    .sort((left, right) => left.title.localeCompare(right.title));
  const category = categories.find((item) => item.id === categoryId);
  const categorySlugs: readonly string[] = category?.slugs ?? [];
  const items = components.filter((component) => categorySlugs.includes(component.slug));

  return (
    <Cards>
      {items.map((component) => (
        <Card
          key={component.slug}
          description={component.description}
          href={component.url}
          preview={<ComponentCardPreview component={component.slug} />}
          title={component.title}
        />
      ))}
    </Cards>
  );
}