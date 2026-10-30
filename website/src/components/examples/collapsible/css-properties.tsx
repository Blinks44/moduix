import type { CssPropertyInput } from '../../mdx/reference';

export const collapsibleOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-collapsible-body-gap',
    'var(--moduix-spacing-2)',
    'Controls body content gap.',
    'collapsible-body',
  ],
  ['--moduix-collapsible-body-padding', '0', 'Controls body padding.', 'collapsible-body'],
  ['--moduix-collapsible-indicator-size', 'var(--moduix-spacing-3)', 'Controls indicator size.'],
  [
    '--moduix-collapsible-content-color',
    'var(--moduix-muted-foreground)',
    'Controls content color.',
    'collapsible-content',
  ],
  [
    '--moduix-collapsible-content-font-size',
    'var(--moduix-text-sm)',
    'Controls content font size.',
    'collapsible-content',
  ],
  [
    '--moduix-collapsible-trigger-font-size',
    'var(--moduix-text-sm)',
    'Controls trigger font size.',
  ],
  ['--moduix-collapsible-trigger-gap', 'var(--moduix-spacing-2)', 'Controls trigger content gap.'],
  ['--moduix-collapsible-trigger-padding-x', '0', 'Controls trigger horizontal padding.'],
  [
    '--moduix-collapsible-trigger-padding-y',
    'var(--moduix-spacing-1)',
    'Controls trigger vertical padding.',
  ],
];