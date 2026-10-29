import type { CssPropertyInput } from '../../mdx/reference';

export const carouselOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-carousel-gap', 'var(--moduix-spacing-3)', 'Controls the gap between carousel parts.'],
  [
    '--moduix-carousel-height',
    '24rem',
    'Controls the root height in vertical orientation. No effect horizontally.',
  ],
  [
    '--moduix-carousel-control-size',
    'var(--moduix-size-md)',
    'Controls the previous, next, and autoplay button size.',
  ],
  [
    '--moduix-carousel-control-bg',
    'var(--moduix-card)',
    'Controls the previous, next, and autoplay button background.',
  ],
  [
    '--moduix-carousel-control-border-color',
    'var(--moduix-border)',
    'Controls the previous, next, and autoplay button border color.',
  ],
  [
    '--moduix-carousel-control-color',
    'var(--moduix-foreground)',
    'Controls the previous, next, and autoplay button icon and text color.',
  ],
  [
    '--moduix-carousel-indicator-size',
    'var(--moduix-spacing-2)',
    'Controls the indicator dot size. The current indicator is three times longer.',
  ],
  [
    '--moduix-carousel-indicator-bg',
    'color-mix(in oklab, var(--moduix-muted-foreground) 50%, transparent)',
    'Controls the idle indicator color.',
  ],
  [
    '--moduix-carousel-indicator-bg-current',
    'var(--moduix-primary)',
    'Controls the current indicator color.',
  ],
];