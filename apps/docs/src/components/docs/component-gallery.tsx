import { Card, Cards } from 'fumadocs-ui/components/card';
import { Component as ComponentIcon } from 'lucide-react';

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
];

export const componentGalleryToc = categories.map((category) => ({
  title: category.title,
  url: `#${category.id}`,
  depth: 2,
}));

export function ComponentGallery({
  components,
}: {
  components: { description: string; slug: string; title: string; url: string }[];
}) {
  const categorizedSlugs = new Set(categories.flatMap((category) => category.slugs));
  const uncategorized = components.filter((component) => !categorizedSlugs.has(component.slug));

  return (
    <div className="not-prose mt-8 space-y-12">
      <p className="text-sm text-fd-muted-foreground">
        Browse {components.length} composable React components built on Ark UI. Every card leads to
        usage guidance, live examples, and its install command.
      </p>

      {categories.map((category) => {
        const items = components.filter((component) => category.slugs.includes(component.slug));

        return (
          <section key={category.title} aria-labelledby={category.id}>
            <div className="mb-4 flex items-baseline justify-between gap-4">
              <div>
                <h2 id={category.id} className="text-xl font-semibold">
                  {category.title}
                </h2>
                <p className="mt-1 text-sm text-fd-muted-foreground">{category.description}</p>
              </div>
              <span className="text-sm tabular-nums text-fd-muted-foreground">{items.length}</span>
            </div>

            <Cards>
              {items.map((component) => (
                <Card
                  key={component.slug}
                  icon={<ComponentIcon />}
                  title={component.title}
                  description={component.description}
                  href={component.url}
                />
              ))}
            </Cards>
          </section>
        );
      })}

      {uncategorized.length > 0 ? (
        <section aria-labelledby="other-components-title">
          <div className="mb-4 flex items-baseline justify-between gap-4">
            <div>
              <h2 id="other-components-title" className="text-xl font-semibold">
                More components
              </h2>
              <p className="mt-1 text-sm text-fd-muted-foreground">
                Newly added components appear here until they receive a category.
              </p>
            </div>
            <span className="text-sm tabular-nums text-fd-muted-foreground">
              {uncategorized.length}
            </span>
          </div>

          <Cards>
            {uncategorized.map((component) => (
              <Card
                key={component.slug}
                icon={<ComponentIcon />}
                title={component.title}
                description={component.description}
                href={component.url}
              />
            ))}
          </Cards>
        </section>
      ) : null}
    </div>
  );
}