import { useI18n, useLang, usePages } from '@rspress/core/runtime';
import { Component as ComponentIcon } from 'lucide-react';
import { Card, Cards } from '../mdx/Components';
import styles from './component-gallery.module.css';

const categories = [
  {
    id: 'form-input',
    titleKey: 'componentGalleryCategoryFormInputTitle',
    descriptionKey: 'componentGalleryCategoryFormInputDescription',
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
    titleKey: 'componentGalleryCategoryLayoutNavigationTitle',
    descriptionKey: 'componentGalleryCategoryLayoutNavigationDescription',
    slugs: [
      'accordion',
      'aspect-ratio',
      'bleed',
      'breadcrumbs',
      'container',
      'menu',
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
    titleKey: 'componentGalleryCategoryOverlaysDialogsTitle',
    descriptionKey: 'componentGalleryCategoryOverlaysDialogsDescription',
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
    titleKey: 'componentGalleryCategoryFeedbackStatusTitle',
    descriptionKey: 'componentGalleryCategoryFeedbackStatusDescription',
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
    titleKey: 'componentGalleryCategoryDisplayContentTitle',
    descriptionKey: 'componentGalleryCategoryDisplayContentDescription',
    slugs: [
      'avatar',
      'badge',
      'card',
      'heading',
      'highlight',
      'image',
      'image-cropper',
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
    titleKey: 'componentGalleryCategoryActionsUtilitiesTitle',
    descriptionKey: 'componentGalleryCategoryActionsUtilitiesDescription',
    slugs: [
      'angle-slider',
      'button',
      'carousel',
      'clipboard',
      'close-button',
      'collapsible',
      'split-button',
      'swap',
    ],
  },
] as const;

export function ComponentGallery() {
  const t = useI18n<typeof import('i18n')>();
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
  const categorizedSlugs = new Set<string>(categories.flatMap((category) => [...category.slugs]));
  const uncategorized = components.filter((component) => !categorizedSlugs.has(component.slug));

  return (
    <div className={styles.gallery}>
      <p className={styles.summary}>{t('componentGallerySummary')}</p>
      {categories.map((category) => {
        const slugs: readonly string[] = category.slugs;
        const items = components.filter((component) => slugs.includes(component.slug));
        return (
          <section key={category.id} aria-labelledby={category.id}>
            <div className={styles.heading}>
              <div>
                <h2 id={category.id}>{t(category.titleKey)}</h2>
                <p>{t(category.descriptionKey)}</p>
              </div>
              <span>{items.length}</span>
            </div>
            <Cards>
              {items.map((component) => (
                <Card
                  key={component.slug}
                  description={component.description}
                  href={component.url}
                  icon={<ComponentIcon />}
                  title={component.title}
                />
              ))}
            </Cards>
          </section>
        );
      })}
      {uncategorized.length > 0 ? (
        <section aria-labelledby="more-components-title">
          <div className={styles.heading}>
            <div>
              <h2 id="more-components-title">{t('componentGalleryMoreTitle')}</h2>
              <p>{t('componentGalleryMoreDescription')}</p>
            </div>
            <span>{uncategorized.length}</span>
          </div>
          <Cards>
            {uncategorized.map((component) => (
              <Card
                key={component.slug}
                description={component.description}
                href={component.url}
                icon={<ComponentIcon />}
                title={component.title}
              />
            ))}
          </Cards>
        </section>
      ) : null}
    </div>
  );
}