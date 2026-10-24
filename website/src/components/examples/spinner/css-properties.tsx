import type { CssPropertyInput } from '../../mdx/reference';

export const spinnerOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-spinner-ring-border-width',
    'var(--moduix-border-width-md)',
    'Controls ring stroke width.',
  ],
  [
    '--moduix-spinner-ring-track-color',
    'color-mix(in oklab, currentColor 22%, transparent)',
    'Controls inactive ring stroke color.',
  ],
  [
    '--moduix-spinner-size',
    'size-specific, md: var(--moduix-spacing-5)',
    'Overrides the spinner size for every size except inherit.',
  ],
];