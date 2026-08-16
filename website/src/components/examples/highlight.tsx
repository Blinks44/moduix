import type { CssPropertyInput } from '../mdx/reference';

export const highlightCssProperties: CssPropertyInput[] = [
  [
    '--moduix-highlight-bg',
    'color-mix(in oklab, var(--moduix-color-warning) 40%, var(--moduix-color-accent))',
    'Controls the highlight background color for each matched mark.',
  ],
  [
    '--moduix-highlight-color',
    'var(--moduix-color-foreground)',
    'Controls the text color inside each matched mark.',
  ],
  [
    '--moduix-highlight-font-weight',
    'var(--moduix-weight-medium)',
    'Controls the font weight of each matched mark.',
  ],
  [
    '--moduix-highlight-padding-x',
    'var(--moduix-spacing-1)',
    'Controls the inline padding of each matched mark.',
  ],
  ['--moduix-highlight-padding-y', '0.0625rem', 'Controls the block padding of each matched mark.'],
  [
    '--moduix-highlight-radius',
    'var(--moduix-radius-xs)',
    'Controls the corner radius of each matched mark.',
  ],
  ['--moduix-highlight-shadow', 'none', 'Controls the box shadow of each matched mark.'],
];