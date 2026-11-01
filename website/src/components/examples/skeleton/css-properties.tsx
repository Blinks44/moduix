import type { CssPropertyInput } from '../../mdx/reference';

const skeletonCssProperties: CssPropertyInput[] = [
  [
    '--moduix-skeleton-border-radius',
    'var(--moduix-radius-md)',
    'Controls default skeleton border radius.',
  ],
  [
    '--moduix-skeleton-bg',
    'color-mix(in oklab, var(--moduix-muted-foreground) 18%, var(--moduix-background))',
    'Controls skeleton background color.',
  ],
  ['--moduix-skeleton-height', 'var(--moduix-spacing-4)', 'Controls default loading height.'],
];
export const skeletonOverrideCssProperties = skeletonCssProperties;