import type { CssPropertyInput } from '../../mdx/reference';

export const breadcrumbsCssProperties: CssPropertyInput[] = [
  [
    '--moduix-breadcrumbs-color',
    'var(--moduix-color-muted-foreground)',
    'Controls the text color of links, separators, and the ellipsis.',
  ],
  ['--moduix-breadcrumbs-font-size', 'var(--moduix-text-sm)', 'Controls breadcrumbs font size.'],
  [
    '--moduix-breadcrumbs-gap',
    'var(--moduix-spacing-1)',
    'Controls spacing between breadcrumb parts.',
  ],
  [
    '--moduix-breadcrumbs-item-max-width',
    '16rem',
    'Controls the primary truncation width of the current page breadcrumb item.',
  ],
  [
    '--moduix-breadcrumbs-item-padding-x',
    'var(--moduix-spacing-1)',
    'Controls inline padding for links, page text, and ellipsis.',
  ],
  [
    '--moduix-breadcrumbs-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls breadcrumbs line height.',
  ],
  [
    '--moduix-breadcrumbs-link-color-hover',
    'var(--moduix-color-foreground)',
    'Controls breadcrumb link hover color.',
  ],
  [
    '--moduix-breadcrumbs-page-color',
    'var(--moduix-color-foreground)',
    'Controls current page breadcrumb color.',
  ],
  [
    '--moduix-breadcrumbs-page-font-weight',
    'var(--moduix-weight-medium)',
    'Controls current page breadcrumb font weight.',
  ],
  ['--moduix-breadcrumbs-separator-icon-size', '1em', 'Controls separator icon size.'],
];