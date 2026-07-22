import type { CssPropertyInput } from '../mdx/reference';

export const closeButtonOverrideCssProperties: CssPropertyInput[] = [
  ['--close-button-bg', 'transparent', 'Controls close button background.'],
  ['--close-button-bg-hover', 'var(--color-muted)', 'Controls hover background color.'],
  ['--close-button-color', 'var(--color-muted-foreground)', 'Controls icon color.'],
  ['--close-button-color-hover', 'var(--color-foreground)', 'Controls hover icon color.'],
  ['--close-button-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--close-button-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--close-button-focus-ring-offset', 'var(--focus-ring-offset)', 'Controls focus ring offset.'],
  [
    '--close-button-focus-ring-width',
    'var(--focus-ring-width, var(--border-width-md))',
    'Controls focus ring width.',
  ],
  ['--close-button-icon-size', 'var(--spacing-3)', 'Controls nested SVG icon size.'],
  ['--close-button-radius', 'var(--radius-sm)', 'Controls close button corner radius.'],
  ['--close-button-size', 'var(--spacing-7)', 'Controls close button width and height.'],
  ['--close-button-transition', 'var(--transition-default)', 'Controls transition timing.'],
];