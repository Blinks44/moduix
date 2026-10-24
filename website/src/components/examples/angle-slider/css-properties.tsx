import type { CssPropertyInput } from '../../mdx/reference';

export const angleSliderCssProperties: CssPropertyInput[] = [
  [
    '--moduix-angle-slider-indicator-bg',
    'var(--moduix-color-primary)',
    'Controls the filled arc and the markers below the current value.',
  ],
  [
    '--moduix-angle-slider-ring-thickness',
    'var(--moduix-spacing-2)',
    'Controls the circular track thickness.',
  ],
  ['--moduix-angle-slider-size', '9rem', 'Controls the dial width and height.'],
  [
    '--moduix-angle-slider-thumb-size',
    'var(--moduix-spacing-4)',
    'Controls the thumb circle size.',
  ],
  [
    '--moduix-angle-slider-track-bg',
    'var(--moduix-color-muted)',
    'Controls the unfilled track color.',
  ],
];