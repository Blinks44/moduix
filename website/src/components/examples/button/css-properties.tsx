import type { CssPropertyInput } from '../../mdx/reference';

export const buttonCssProperties: CssPropertyInput[] = [
  [
    '--moduix-button-bg',
    'var(--moduix-color-primary)',
    'Overrides button background color. Each `variant` sets its own default.',
  ],
  [
    '--moduix-button-bg-hover',
    'color-mix(in srgb, var(--moduix-button-bg) 88%, black)',
    'Overrides hover background color. Filled variants darken `--moduix-button-bg` by default. Each `variant` sets its own default.',
  ],
  [
    '--moduix-button-border-color',
    'var(--moduix-button-bg)',
    'Overrides button border color. Each `variant` sets its own default.',
  ],
  [
    '--moduix-button-border-width',
    'var(--moduix-border-width-sm)',
    'Controls button border width.',
  ],
  [
    '--moduix-button-color',
    'var(--moduix-color-primary-foreground)',
    'Overrides button text and icon color. Each `variant` sets its own default.',
  ],
  [
    '--moduix-button-content-gap',
    'var(--moduix-spacing-2)',
    'Controls space between text and icons.',
  ],
  [
    '--moduix-button-font-size',
    'var(--moduix-text-sm)',
    'Overrides button font size. Each `size` sets its own default.',
  ],
  ['--moduix-button-font-weight', 'var(--moduix-weight-medium)', 'Controls button font weight.'],
  [
    '--moduix-button-height',
    'var(--moduix-size-md)',
    'Overrides minimum height, and the square size of `icon-*` buttons. Each `size` sets its own default.',
  ],
  ['--moduix-button-icon-size', 'var(--moduix-spacing-4)', 'Controls direct child SVG icon size.'],
  [
    '--moduix-button-line-height',
    'var(--moduix-line-height-text-sm)',
    'Overrides button line-height. Each `size` sets its own default.',
  ],
  [
    '--moduix-button-padding-x',
    'var(--moduix-spacing-4)',
    'Overrides horizontal button padding. Each `size` sets its own default.',
  ],
  [
    '--moduix-button-padding-y',
    'var(--moduix-spacing-1)',
    'Overrides vertical button padding. Each `size` sets its own default.',
  ],
  ['--moduix-button-radius', 'var(--moduix-radius-md)', 'Controls button border radius.'],
];