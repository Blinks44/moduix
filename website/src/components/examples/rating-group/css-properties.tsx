import type { CssPropertyInput } from '../../mdx/reference';

export const ratingGroupOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-rating-group-active-color',
    'var(--moduix-color-primary)',
    'Controls the filled star color.',
  ],
  [
    '--moduix-rating-group-color',
    'var(--moduix-color-muted-foreground)',
    'Controls the empty star outline color.',
  ],
  ['--moduix-rating-group-gap', 'var(--moduix-spacing-1)', 'Controls gap between rating items.'],
  [
    '--moduix-rating-group-icon-size',
    'var(--moduix-spacing-5)',
    'Overrides the star size. Each `size` sets its own default.',
  ],
];