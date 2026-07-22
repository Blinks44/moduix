import type { CssPropertyInput } from '../mdx/reference';

export const breadcrumbsCssProperties: CssPropertyInput[] = [
  [
    '--moduix-breadcrumbs-color',
    'var(--moduix-color-muted-foreground)',
    'Controls base breadcrumbs text color.',
  ],
  [
    '--moduix-breadcrumbs-ellipsis-color',
    'var(--moduix-color-muted-foreground)',
    'Controls ellipsis color.',
  ],
  ['--moduix-breadcrumbs-ellipsis-radius', 'var(--moduix-radius-sm)', 'Controls ellipsis radius.'],
  ['--moduix-breadcrumbs-ellipsis-size', 'var(--moduix-spacing-4)', 'Controls ellipsis size.'],
  [
    '--moduix-breadcrumbs-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls focus ring color.',
  ],
  [
    '--moduix-breadcrumbs-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls focus ring width.',
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
    '--moduix-breadcrumbs-link-color',
    'var(--moduix-color-muted-foreground)',
    'Controls breadcrumb link color.',
  ],
  [
    '--moduix-breadcrumbs-link-color-hover',
    'var(--moduix-color-foreground)',
    'Controls breadcrumb link hover color.',
  ],
  [
    '--moduix-breadcrumbs-link-radius',
    'var(--moduix-radius-sm)',
    'Controls breadcrumb link radius.',
  ],
  [
    '--moduix-breadcrumbs-link-text-decoration',
    'none',
    'Controls breadcrumb link text decoration.',
  ],
  [
    '--moduix-breadcrumbs-link-text-decoration-hover',
    'none',
    'Controls breadcrumb link hover text decoration.',
  ],
  [
    '--moduix-breadcrumbs-link-transition',
    'var(--moduix-transition-default)',
    'Controls breadcrumb link transition.',
  ],
  [
    '--moduix-breadcrumbs-link-underline-offset',
    '0.2em',
    'Controls breadcrumb link underline offset.',
  ],
  ['--moduix-breadcrumbs-max-width', '100%', 'Controls max width of breadcrumbs root.'],
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
  [
    '--moduix-breadcrumbs-separator-color',
    'var(--moduix-color-muted-foreground)',
    'Controls separator color.',
  ],
  ['--moduix-breadcrumbs-separator-font-size', '0.875em', 'Controls separator font size.'],
  ['--moduix-breadcrumbs-separator-icon-size', '1em', 'Controls separator icon size.'],
];