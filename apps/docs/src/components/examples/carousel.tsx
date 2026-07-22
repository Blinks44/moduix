import type { CssPropertyInput } from '../mdx/reference';

export const carouselExampleCss = `
  [data-scope='carousel'][data-part='root'] {
    width: min(100%, 42rem);
  }

  [data-scope='carousel'][data-part='item-group'] {
    border-radius: var(--radius-xl);
  }

  [data-scope='carousel'][data-part='control'] {
    justify-content: center;
  }

  .carouselStack {
    display: grid;
    width: min(100%, 42rem);
    gap: var(--spacing-3);
    justify-items: center;
  }

  .carouselStack [data-scope='carousel'][data-part='root'] {
    width: 100%;
  }

  [data-scope='carousel'][data-part='item'] > img {
    display: block;
    width: 100%;
    height: 21rem;
    object-fit: cover;
    border-radius: var(--radius-xl);
  }

  [data-scope='carousel'][data-part='indicator'][data-current] {
    background-color: var(--color-primary);
  }
`;

export const carouselOverrideCssProperties: CssPropertyInput[] = [
  [
    '--carousel-control-bg',
    'color-mix(in oklab, var(--color-background) 92%, var(--color-card) 8%)',
    'Controls the trigger and autoplay button background.',
  ],
  [
    '--carousel-control-bg-hover',
    'var(--color-accent)',
    'Controls the trigger and autoplay button hover background.',
  ],
  [
    '--carousel-control-border-color',
    'color-mix(in oklab, var(--color-border) 88%, black 12%)',
    'Controls the trigger and autoplay button border color.',
  ],
  [
    '--carousel-control-border-color-hover',
    'color-mix(in oklab, var(--color-border) 50%, var(--color-foreground) 50%)',
    'Controls the trigger and autoplay button hover border color.',
  ],
  [
    '--carousel-control-color',
    'var(--color-foreground)',
    'Controls the trigger and autoplay button icon color.',
  ],
  [
    '--carousel-control-color-hover',
    'var(--color-accent-foreground)',
    'Controls the trigger and autoplay button hover icon color.',
  ],
  ['--carousel-control-shadow', 'var(--shadow-sm)', 'Controls the trigger shadow.'],
  ['--carousel-control-shadow-hover', 'var(--shadow-md)', 'Controls the trigger hover shadow.'],
  [
    '--carousel-autoplay-indicator-min-width',
    'var(--spacing-4)',
    'Controls the minimum status label width.',
  ],
  [
    '--carousel-autoplay-trigger-min-width',
    'calc(var(--size-md) + var(--spacing-3))',
    'Controls the labelled autoplay trigger minimum width.',
  ],
  ['--carousel-control-icon-size', 'var(--spacing-4)', 'Controls trigger icon size.'],
  ['--carousel-control-size', 'var(--size-md)', 'Controls trigger size.'],
  [
    '--carousel-focus-ring-color',
    'var(--color-ring)',
    'Controls focus ring color for triggers and indicators.',
  ],
  ['--carousel-focus-ring-offset', 'var(--focus-ring-offset)', 'Controls focus ring offset.'],
  [
    '--carousel-focus-ring-width',
    'var(--focus-ring-width, var(--border-width-md))',
    'Controls focus ring width.',
  ],
  ['--carousel-gap', 'var(--spacing-3)', 'Controls spacing between Ark parts.'],
  ['--carousel-height', '24rem', 'Controls the root height in vertical orientation.'],
  [
    '--carousel-indicator-bg',
    'color-mix(in oklab, var(--color-muted) 84%, var(--color-background) 16%)',
    'Controls idle indicator color.',
  ],
  ['--carousel-indicator-bg-current', 'var(--color-primary)', 'Controls current indicator color.'],
  [
    '--carousel-indicator-bg-hover',
    'color-mix(in oklab, var(--color-muted) 56%, var(--color-foreground) 44%)',
    'Controls indicator hover color.',
  ],
  ['--carousel-indicator-gap', 'var(--spacing-2)', 'Controls spacing between indicators.'],
  ['--carousel-indicator-size', 'var(--spacing-2)', 'Controls base indicator size.'],
  [
    '--carousel-progress-text-color',
    'var(--color-muted-foreground)',
    'Controls progress text color.',
  ],
  ['--carousel-progress-text-font-size', 'var(--text-sm)', 'Controls progress text font size.'],
  ['--carousel-track-radius', 'var(--radius-xl)', 'Controls the scroll track radius.'],
];