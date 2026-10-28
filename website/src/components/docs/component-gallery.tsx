import { useLang, usePages } from '@rspress/core/runtime';
import { Card, Cards } from '../mdx/Components';
import { ComponentCardPreview } from './component-card-preview';

const categories = [
  {
    id: 'actions',
    slugs: ['button', 'clipboard', 'close-button', 'split-button', 'swap'],
  },
  {
    id: 'display',
    slugs: [
      'avatar',
      'badge',
      'card',
      'carousel',
      'chart',
      'heading',
      'highlight',
      'image',
      'image-cropper',
      'json-tree-view',
      'kbd',
      'list',
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
    id: 'feedback',
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
    id: 'forms',
    slugs: [
      'angle-slider',
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
      'listbox',
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
    id: 'layout',
    slugs: [
      'accordion',
      'aspect-ratio',
      'bleed',
      'collapsible',
      'container',
      'scroll-area',
      'separator',
      'sidebar',
      'simple-grid',
      'splitter',
      'stack',
      'tree-view',
    ],
  },
  {
    id: 'navigation',
    slugs: [
      'breadcrumbs',
      'menu',
      'navigation-menu',
      'pagination',
      'steps',
      'table-of-contents',
      'tabs',
    ],
  },
  {
    id: 'overlays',
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
] as const;

type ComponentCategory = (typeof categories)[number]['id'];

const categoryLabelKeys = {
  actions: 'categoryActions',
  display: 'categoryDisplay',
  feedback: 'categoryFeedback',
  forms: 'categoryForms',
  layout: 'categoryLayout',
  navigation: 'categoryNavigation',
  overlays: 'categoryOverlays',
} as const satisfies Record<ComponentCategory, string>;

export function getComponentCategoryLabelKey(slug: string) {
  const category = categories.find((item) => (item.slugs as readonly string[]).includes(slug));
  return category ? categoryLabelKeys[category.id] : undefined;
}

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