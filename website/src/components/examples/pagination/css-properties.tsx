import type { CssPropertyInput } from '../../mdx/reference';
import { CSSPropertiesReferenceTable } from '../../mdx/reference';

const paginationOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-pagination-color', 'var(--moduix-color-foreground)', 'Controls root text color.'],
  [
    '--moduix-pagination-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  [
    '--moduix-pagination-ellipsis-color',
    'var(--moduix-color-muted-foreground)',
    'Controls ellipsis color.',
  ],
  [
    '--moduix-pagination-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls focus ring color.',
  ],
  [
    '--moduix-pagination-focus-ring-offset',
    'var(--moduix-focus-ring-inset-offset)',
    'Controls focus ring offset.',
  ],
  [
    '--moduix-pagination-focus-ring-width',
    'var(--moduix-focus-ring-width, var(--moduix-border-width-md))',
    'Controls focus ring width.',
  ],
  ['--moduix-pagination-font-size', 'var(--moduix-text-sm)', 'Controls pagination font size.'],
  [
    '--moduix-pagination-font-weight',
    'var(--moduix-weight-medium)',
    'Controls pagination font weight.',
  ],
  ['--moduix-pagination-gap', 'var(--moduix-spacing-1)', 'Controls gap between pagination parts.'],
  ['--moduix-pagination-icon-size', 'var(--moduix-spacing-4)', 'Controls trigger icon size.'],
  [
    '--moduix-pagination-item-bg',
    'var(--moduix-color-background)',
    'Controls item background color.',
  ],
  [
    '--moduix-pagination-item-bg-hover',
    'var(--moduix-color-accent)',
    'Controls item and trigger hover background.',
  ],
  [
    '--moduix-pagination-item-bg-selected',
    'var(--moduix-color-foreground)',
    'Controls selected item background color.',
  ],
  [
    '--moduix-pagination-item-border-color',
    'var(--moduix-color-border)',
    'Controls item border color.',
  ],
  [
    '--moduix-pagination-item-border-color-selected',
    'var(--moduix-color-foreground)',
    'Controls selected item border color.',
  ],
  [
    '--moduix-pagination-item-border-width',
    'var(--moduix-border-width-sm)',
    'Controls item border width.',
  ],
  ['--moduix-pagination-item-color', 'var(--moduix-color-foreground)', 'Controls item text color.'],
  [
    '--moduix-pagination-item-color-selected',
    'var(--moduix-color-background)',
    'Controls selected item text color.',
  ],
  [
    '--moduix-pagination-item-padding-inline',
    'var(--moduix-spacing-2)',
    'Controls item horizontal padding.',
  ],
  ['--moduix-pagination-item-radius', 'var(--moduix-radius-md)', 'Controls item corner radius.'],
  ['--moduix-pagination-item-size', 'var(--moduix-size-md)', 'Controls item width and height.'],
  [
    '--moduix-pagination-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls pagination line height.',
  ],
  ['--moduix-pagination-trigger-gap', 'var(--moduix-spacing-2)', 'Controls trigger content gap.'],
];

const paginationCssPropertiesReference = paginationOverrideCssProperties.map(normalizeCssProperty);

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function PaginationCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={paginationCssPropertiesReference} />;
}