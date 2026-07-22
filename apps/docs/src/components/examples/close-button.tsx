import type { CssPropertyInput } from '../mdx/reference';

export const closeButtonOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-close-button-bg', 'transparent', 'Controls close button background.'],
  [
    '--moduix-close-button-bg-hover',
    'var(--moduix-color-muted)',
    'Controls hover background color.',
  ],
  ['--moduix-close-button-color', 'var(--moduix-color-muted-foreground)', 'Controls icon color.'],
  [
    '--moduix-close-button-color-hover',
    'var(--moduix-color-foreground)',
    'Controls hover icon color.',
  ],
  [
    '--moduix-close-button-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  [
    '--moduix-close-button-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls focus ring color.',
  ],
  [
    '--moduix-close-button-focus-ring-offset',
    'var(--moduix-focus-ring-offset)',
    'Controls focus ring offset.',
  ],
  [
    '--moduix-close-button-focus-ring-width',
    'var(--moduix-focus-ring-width, var(--moduix-border-width-md))',
    'Controls focus ring width.',
  ],
  ['--moduix-close-button-icon-size', 'var(--moduix-spacing-3)', 'Controls nested SVG icon size.'],
  [
    '--moduix-close-button-radius',
    'var(--moduix-radius-sm)',
    'Controls close button corner radius.',
  ],
  [
    '--moduix-close-button-size',
    'var(--moduix-spacing-7)',
    'Controls close button width and height.',
  ],
  [
    '--moduix-close-button-transition',
    'var(--moduix-transition-default)',
    'Controls transition timing.',
  ],
];