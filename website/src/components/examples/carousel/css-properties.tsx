import type { CssPropertyInput } from '../../mdx/reference';

export const carouselOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-carousel-control-bg',
    'color-mix(in oklab, var(--moduix-color-background) 92%, var(--moduix-color-card) 8%)',
    'Controls the trigger and autoplay button background.',
  ],
  [
    '--moduix-carousel-control-bg-hover',
    'var(--moduix-color-accent)',
    'Controls the trigger and autoplay button hover background.',
  ],
  [
    '--moduix-carousel-control-border-color',
    'color-mix(in oklab, var(--moduix-color-border) 88%, black 12%)',
    'Controls the trigger and autoplay button border color.',
  ],
  [
    '--moduix-carousel-control-border-color-hover',
    'var(--moduix-color-ring)',
    'Controls the trigger and autoplay button hover border color.',
  ],
  [
    '--moduix-carousel-control-color',
    'var(--moduix-color-foreground)',
    'Controls the trigger and autoplay button icon color.',
  ],
  [
    '--moduix-carousel-control-color-hover',
    'var(--moduix-color-accent-foreground)',
    'Controls the trigger and autoplay button hover icon color.',
  ],
  ['--moduix-carousel-control-shadow', 'var(--moduix-shadow-sm)', 'Controls the trigger shadow.'],
  [
    '--moduix-carousel-control-shadow-hover',
    'var(--moduix-shadow-md)',
    'Controls the trigger hover shadow.',
  ],
  [
    '--moduix-carousel-autoplay-indicator-min-width',
    'var(--moduix-spacing-4)',
    'Controls the minimum status label width.',
  ],
  [
    '--moduix-carousel-autoplay-trigger-min-width',
    'calc(var(--moduix-size-md) + var(--moduix-spacing-3))',
    'Controls the labelled autoplay trigger minimum width.',
  ],
  ['--moduix-carousel-control-icon-size', 'var(--moduix-spacing-4)', 'Controls trigger icon size.'],
  ['--moduix-carousel-control-size', 'var(--moduix-size-md)', 'Controls trigger size.'],
  [
    '--moduix-carousel-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls focus ring color for triggers and indicators.',
  ],
  [
    '--moduix-carousel-focus-ring-offset',
    'var(--moduix-focus-ring-offset)',
    'Controls focus ring offset.',
  ],
  [
    '--moduix-carousel-focus-ring-width',
    'var(--moduix-focus-ring-width, var(--moduix-border-width-md))',
    'Controls focus ring width.',
  ],
  ['--moduix-carousel-gap', 'var(--moduix-spacing-3)', 'Controls spacing between Ark parts.'],
  ['--moduix-carousel-height', '24rem', 'Controls the root height in vertical orientation.'],
  [
    '--moduix-carousel-indicator-bg',
    'color-mix(in oklab, var(--moduix-color-muted) 84%, var(--moduix-color-background) 16%)',
    'Controls idle indicator color.',
  ],
  [
    '--moduix-carousel-indicator-bg-current',
    'var(--moduix-color-primary)',
    'Controls current indicator color.',
  ],
  [
    '--moduix-carousel-indicator-bg-hover',
    'color-mix(in oklab, var(--moduix-color-muted) 56%, var(--moduix-color-foreground) 44%)',
    'Controls indicator hover color.',
  ],
  [
    '--moduix-carousel-indicator-gap',
    'var(--moduix-spacing-2)',
    'Controls spacing between indicators.',
  ],
  ['--moduix-carousel-indicator-size', 'var(--moduix-spacing-2)', 'Controls base indicator size.'],
  [
    '--moduix-carousel-progress-text-color',
    'var(--moduix-color-muted-foreground)',
    'Controls progress text color.',
  ],
  [
    '--moduix-carousel-progress-text-font-size',
    'var(--moduix-text-sm)',
    'Controls progress text font size.',
  ],
  [
    '--moduix-carousel-track-radius',
    'var(--moduix-radius-xl)',
    'Controls the scroll track radius.',
  ],
];