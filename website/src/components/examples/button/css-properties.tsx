import type { CssPropertyInput } from '../../mdx/reference';

export const buttonCssProperties: CssPropertyInput[] = [
  ['--moduix-button-bg', 'Variant-specific fallback', 'Overrides button background color.'],
  [
    '--moduix-button-bg-hover',
    'Variant-specific fallback',
    'Overrides hover background color. Filled variants darken `--moduix-button-bg` by default.',
  ],
  ['--moduix-button-border-color', 'Variant-specific fallback', 'Overrides button border color.'],
  [
    '--moduix-button-border-width',
    'var(--moduix-border-width-sm)',
    'Controls button border width.',
  ],
  ['--moduix-button-color', 'Variant-specific fallback', 'Overrides button text and icon color.'],
  [
    '--moduix-button-content-gap',
    'var(--moduix-spacing-2)',
    'Controls space between text and icons.',
  ],
  ['--moduix-button-font-size', 'Size-specific fallback', 'Overrides button font size.'],
  ['--moduix-button-font-weight', 'var(--moduix-weight-medium)', 'Controls button font weight.'],
  [
    '--moduix-button-height',
    'Size-specific fallback',
    'Overrides minimum height, and the square size of `icon-*` buttons.',
  ],
  ['--moduix-button-icon-size', 'var(--moduix-spacing-4)', 'Controls direct child SVG icon size.'],
  ['--moduix-button-line-height', 'Size-specific fallback', 'Overrides button line-height.'],
  ['--moduix-button-padding-x', 'Size-specific fallback', 'Overrides horizontal button padding.'],
  ['--moduix-button-padding-y', 'Size-specific fallback', 'Overrides vertical button padding.'],
  ['--moduix-button-radius', 'var(--moduix-radius-md)', 'Controls button border radius.'],
];