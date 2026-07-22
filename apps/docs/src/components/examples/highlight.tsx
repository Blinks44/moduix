import type { CssPropertyInput } from '../mdx/reference';

export const highlightCssProperties: CssPropertyInput[] = [
  [
    '--highlight-bg',
    'color-mix(in oklab, var(--color-warning) 40%, var(--color-accent))',
    'Controls the highlight background color for each matched mark.',
  ],
  [
    '--highlight-color',
    'var(--color-foreground)',
    'Controls the text color inside each matched mark.',
  ],
  [
    '--highlight-font-weight',
    'var(--weight-medium)',
    'Controls the font weight of each matched mark.',
  ],
  [
    '--highlight-padding-x',
    'var(--spacing-1)',
    'Controls the inline padding of each matched mark.',
  ],
  ['--highlight-padding-y', '0.0625rem', 'Controls the block padding of each matched mark.'],
  ['--highlight-radius', 'var(--radius-xs)', 'Controls the corner radius of each matched mark.'],
  ['--highlight-shadow', 'none', 'Controls the box shadow of each matched mark.'],
];