import { usePages } from '@rspress/core/runtime';
import { Component as ComponentIcon } from 'lucide-react';
import { Card, Cards } from '../mdx/Components';
import styles from './component-gallery.module.css';

const categories = [
  {
    id: 'form-input',
    title: 'Form & Input',
    description: 'Inputs, selection controls, field composition, and form-ready controls.',
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
    title: 'Layout & Navigation',
    description: 'Structure product screens, reveal content, and guide people through them.',
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
    title: 'Overlays & Dialogs',
    description: 'Focused surfaces for commands, details, help, and temporary workflows.',
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
    title: 'Feedback & Status',
    description: 'Communicate progress, empty states, loading, and actionable messages.',
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
    title: 'Display & Content',
    description: 'Present identity, media, data, keyboard hints, and supporting information.',
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
    title: 'Actions & Utilities',
    description: 'Small interaction primitives for common product actions and patterns.',
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
  const { pages } = usePages();
  const components = pages
    .filter(
      (page) =>
        page.routePath.startsWith('/docs/') && typeof page.frontmatter.component === 'string',
    )
    .map((page) => ({
      description: page.description ?? '',
      slug: page.routePath.split('/').filter(Boolean).at(-1) ?? '',
      title: page.title,
      url: page.routePath,
    }))
    .sort((left, right) => left.title.localeCompare(right.title));
  const categorizedSlugs = new Set<string>(categories.flatMap((category) => [...category.slugs]));
  const uncategorized = components.filter((component) => !categorizedSlugs.has(component.slug));

  return (
    <div className={styles.gallery}>
      <p className={styles.summary}>
        Browse {components.length} composable React components built on Ark UI. Every card leads to
        usage guidance, a runnable example, and its install command.
      </p>

      {categories.map((category) => {
        const slugs: readonly string[] = category.slugs;
        const items = components.filter((component) => slugs.includes(component.slug));

        return (
          <section key={category.id} aria-labelledby={category.id}>
            <div className={styles.heading}>
              <div>
                <h2 id={category.id}>{category.title}</h2>
                <p>{category.description}</p>
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
              <h2 id="more-components-title">More components</h2>
              <p>New components remain visible here until they receive a category.</p>
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