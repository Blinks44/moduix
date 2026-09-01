import type { CssPropertyInput } from '../../mdx/reference';

export const collapsibleOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-collapsible-body-gap', 'var(--moduix-spacing-2)', 'Controls body content gap.'],
  ['--moduix-collapsible-body-padding', '0', 'Controls body padding.'],
  ['--moduix-collapsible-color', 'var(--moduix-color-foreground)', 'Controls root text color.'],
  [
    '--moduix-collapsible-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  [
    '--moduix-collapsible-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls trigger focus ring color.',
  ],
  [
    '--moduix-collapsible-focus-ring-offset',
    'var(--moduix-border-width-sm)',
    'Controls trigger focus ring offset.',
  ],
  [
    '--moduix-collapsible-focus-ring-width',
    'var(--moduix-focus-ring-width, var(--moduix-border-width-md))',
    'Controls trigger focus ring width.',
  ],
  ['--moduix-collapsible-max-width', '100%', 'Controls root max width.'],
  [
    '--moduix-collapsible-indicator-open-transform',
    'rotate(180deg)',
    'Controls indicator transform while open.',
  ],
  ['--moduix-collapsible-indicator-size', 'var(--moduix-spacing-3)', 'Controls indicator size.'],
  [
    '--moduix-collapsible-indicator-transition',
    'var(--moduix-transition-default)',
    'Controls indicator transition.',
  ],
  [
    '--moduix-collapsible-content-color',
    'var(--moduix-color-muted-foreground)',
    'Controls content color.',
  ],
  ['--moduix-collapsible-content-closed-opacity', '0.01', 'Controls content opacity while closed.'],
  [
    '--moduix-collapsible-content-font-size',
    'var(--moduix-text-sm)',
    'Controls content font size.',
  ],
  [
    '--moduix-collapsible-content-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls content line height.',
  ],
  ['--moduix-collapsible-content-open-opacity', '1', 'Controls content opacity while open.'],
  [
    '--moduix-collapsible-content-transition',
    'var(--moduix-transition-default)',
    'Controls content open and close animation.',
  ],
  ['--moduix-collapsible-trigger-bg', 'transparent', 'Controls trigger background color.'],
  [
    '--moduix-collapsible-trigger-bg-active',
    'var(--moduix-collapsible-trigger-bg-hover)',
    'Controls trigger background color while pressed.',
  ],
  [
    '--moduix-collapsible-trigger-bg-hover',
    'var(--moduix-collapsible-trigger-bg)',
    'Controls trigger background color on hover.',
  ],
  [
    '--moduix-collapsible-trigger-color',
    'var(--moduix-collapsible-color)',
    'Controls trigger text color.',
  ],
  [
    '--moduix-collapsible-trigger-font-size',
    'var(--moduix-text-sm)',
    'Controls trigger font size.',
  ],
  ['--moduix-collapsible-trigger-gap', 'var(--moduix-spacing-2)', 'Controls trigger content gap.'],
  [
    '--moduix-collapsible-trigger-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls trigger line height.',
  ],
  ['--moduix-collapsible-trigger-padding-x', '0', 'Controls trigger horizontal padding.'],
  [
    '--moduix-collapsible-trigger-padding-y',
    'var(--moduix-spacing-1)',
    'Controls trigger vertical padding.',
  ],
  ['--moduix-collapsible-trigger-radius', '0', 'Controls trigger corner radius.'],
  [
    '--moduix-collapsible-trigger-transition',
    'var(--moduix-transition-default)',
    'Controls trigger color and background transition.',
  ],
  ['--moduix-collapsible-width', '100%', 'Controls root width.'],
];