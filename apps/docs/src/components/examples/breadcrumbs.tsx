import type { CssPropertyInput } from '../mdx/reference';

export const breadcrumbsCssProperties: CssPropertyInput[] = [
  ['--breadcrumbs-color', 'var(--color-muted-foreground)', 'Controls base breadcrumbs text color.'],
  ['--breadcrumbs-ellipsis-color', 'var(--color-muted-foreground)', 'Controls ellipsis color.'],
  ['--breadcrumbs-ellipsis-radius', 'var(--radius-sm)', 'Controls ellipsis radius.'],
  ['--breadcrumbs-ellipsis-size', 'var(--spacing-4)', 'Controls ellipsis size.'],
  ['--breadcrumbs-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--breadcrumbs-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls focus ring width.',
  ],
  ['--breadcrumbs-font-size', 'var(--text-sm)', 'Controls breadcrumbs font size.'],
  ['--breadcrumbs-gap', 'var(--spacing-1)', 'Controls spacing between breadcrumb parts.'],
  [
    '--breadcrumbs-item-max-width',
    '16rem',
    'Controls the primary truncation width of the current page breadcrumb item.',
  ],
  [
    '--breadcrumbs-item-padding-x',
    'var(--spacing-1)',
    'Controls inline padding for links, page text, and ellipsis.',
  ],
  ['--breadcrumbs-line-height', 'var(--line-height-text-sm)', 'Controls breadcrumbs line height.'],
  ['--breadcrumbs-link-color', 'var(--color-muted-foreground)', 'Controls breadcrumb link color.'],
  [
    '--breadcrumbs-link-color-hover',
    'var(--color-foreground)',
    'Controls breadcrumb link hover color.',
  ],
  ['--breadcrumbs-link-radius', 'var(--radius-sm)', 'Controls breadcrumb link radius.'],
  ['--breadcrumbs-link-text-decoration', 'none', 'Controls breadcrumb link text decoration.'],
  [
    '--breadcrumbs-link-text-decoration-hover',
    'none',
    'Controls breadcrumb link hover text decoration.',
  ],
  [
    '--breadcrumbs-link-transition',
    'var(--transition-default)',
    'Controls breadcrumb link transition.',
  ],
  ['--breadcrumbs-link-underline-offset', '0.2em', 'Controls breadcrumb link underline offset.'],
  ['--breadcrumbs-max-width', '100%', 'Controls max width of breadcrumbs root.'],
  [
    '--breadcrumbs-page-color',
    'var(--color-foreground)',
    'Controls current page breadcrumb color.',
  ],
  [
    '--breadcrumbs-page-font-weight',
    'var(--weight-medium)',
    'Controls current page breadcrumb font weight.',
  ],
  ['--breadcrumbs-separator-color', 'var(--color-muted-foreground)', 'Controls separator color.'],
  ['--breadcrumbs-separator-font-size', '0.875em', 'Controls separator font size.'],
  ['--breadcrumbs-separator-icon-size', '1em', 'Controls separator icon size.'],
];