import type { CssPropertyInput } from '../../mdx/reference';

export const progressLinearCssProperties: CssPropertyInput[] = [
  [
    '--moduix-progress-linear-range-bg',
    'var(--moduix-color-primary)',
    'Controls filled range color.',
  ],
  ['--moduix-progress-linear-track-bg', 'var(--moduix-color-muted)', 'Controls track background.'],
  [
    '--moduix-progress-linear-track-size',
    'var(--moduix-spacing-2)',
    'Controls track thickness: height when horizontal, width when vertical.',
  ],
];