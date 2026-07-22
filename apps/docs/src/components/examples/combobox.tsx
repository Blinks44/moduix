import type { CssPropertyInput } from '../mdx/reference';

export const comboboxExampleCss = `
[data-slot='combobox-content'] {
  min-width: var(--reference-width);
  transform-origin: var(--transform-origin);
}

[data-slot='combobox-item'][data-highlighted] {
  background: var(--moduix-combobox-highlight-bg, var(--moduix-color-accent));
  color: var(--moduix-combobox-highlight-color, var(--moduix-color-accent-foreground));
}
`;

export const comboboxOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-combobox-action-bg', 'transparent', 'Controls action background.'],
  [
    '--moduix-combobox-action-bg-hover',
    'var(--moduix-color-muted)',
    'Controls action hover background.',
  ],
  [
    '--moduix-combobox-action-color-hover',
    'var(--moduix-color-foreground)',
    'Controls action hover color.',
  ],
  [
    '--moduix-combobox-action-gap',
    'var(--moduix-spacing-0-5)',
    'Controls the gap between actions.',
  ],
  [
    '--moduix-combobox-action-offset-right',
    'var(--moduix-spacing-2)',
    'Controls the trailing action offset.',
  ],
  ['--moduix-combobox-action-radius', 'var(--moduix-radius-sm)', 'Controls action radius.'],
  ['--moduix-combobox-action-size', 'var(--moduix-size-xs)', 'Controls action size.'],
  ['--moduix-combobox-bg', 'var(--moduix-color-background)', 'Controls control background.'],
  [
    '--moduix-combobox-border-color',
    'var(--moduix-color-border)',
    'Controls control border color.',
  ],
  [
    '--moduix-combobox-border-width',
    'var(--moduix-border-width-sm)',
    'Controls control border width.',
  ],
  ['--moduix-combobox-color', 'var(--moduix-color-foreground)', 'Controls root text color.'],
  ['--combobox-bg-active', 'var(--moduix-color-muted)', 'Controls control background when open.'],
  ['--combobox-bg-hover', 'var(--moduix-color-accent)', 'Controls control background on hover.'],
  ['--moduix-combobox-content-bg', 'var(--moduix-color-popover)', 'Controls content background.'],
  [
    '--moduix-combobox-content-border-color',
    'var(--moduix-color-border)',
    'Controls content border color.',
  ],
  [
    '--moduix-combobox-content-border-width',
    'var(--moduix-border-width-sm)',
    'Controls content border width.',
  ],
  ['--moduix-combobox-content-closed-opacity', '0', 'Controls closed animation opacity.'],
  [
    '--moduix-combobox-content-closed-scale',
    'var(--moduix-scale-popup)',
    'Controls closed animation scale.',
  ],
  [
    '--moduix-combobox-content-color',
    'var(--moduix-color-popover-foreground)',
    'Controls content text color.',
  ],
  ['--moduix-combobox-content-max-height', '24rem', 'Controls content maximum height.'],
  [
    '--moduix-combobox-content-padding-y',
    'var(--moduix-popup-list-padding-y, var(--moduix-spacing-1))',
    'Controls content vertical padding.',
  ],
  ['--moduix-combobox-content-shadow', 'var(--moduix-shadow-lg)', 'Controls content shadow.'],
  ['--moduix-combobox-control-height', 'var(--moduix-size-md)', 'Controls input height.'],
  [
    '--moduix-combobox-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  [
    '--moduix-combobox-empty-color',
    'var(--moduix-color-muted-foreground)',
    'Controls empty text color.',
  ],
  ['--moduix-combobox-empty-font-size', 'var(--moduix-text-sm)', 'Controls empty font size.'],
  [
    '--moduix-combobox-empty-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls empty line height.',
  ],
  [
    '--moduix-combobox-empty-padding-x',
    'var(--moduix-spacing-4)',
    'Controls empty horizontal padding.',
  ],
  [
    '--moduix-combobox-empty-padding-y',
    'var(--moduix-spacing-3)',
    'Controls empty vertical padding.',
  ],
  ['--moduix-combobox-focus-ring-color', 'var(--moduix-color-ring)', 'Controls focus ring color.'],
  [
    '--moduix-combobox-focus-ring-offset',
    'var(--moduix-border-width-sm)',
    'Controls focus ring offset.',
  ],
  [
    '--moduix-combobox-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls focus ring width.',
  ],
  [
    '--moduix-combobox-highlight-bg',
    'var(--moduix-color-accent)',
    'Controls highlighted item background.',
  ],
  [
    '--moduix-combobox-highlight-color',
    'var(--moduix-color-accent-foreground)',
    'Controls highlighted item color.',
  ],
  [
    '--moduix-combobox-icon-color',
    'var(--moduix-color-muted-foreground)',
    'Controls action icon color.',
  ],
  ['--moduix-combobox-icon-size', 'var(--moduix-spacing-4)', 'Controls action icon size.'],
  [
    '--moduix-combobox-input-padding-x-end',
    'var(--moduix-spacing-3-5)',
    'Controls input trailing padding.',
  ],
  [
    '--moduix-combobox-input-padding-x-end-with-clear',
    '4.375rem',
    'Customizes combobox input padding x end with clear.',
  ],
  [
    '--moduix-combobox-input-padding-x-end-with-trigger',
    '2.75rem',
    'Customizes combobox input padding x end with trigger.',
  ],
  [
    '--moduix-combobox-input-padding-x-start',
    'var(--moduix-spacing-3-5)',
    'Controls input leading padding.',
  ],
  [
    '--moduix-combobox-input-placeholder-color',
    'var(--moduix-color-muted-foreground)',
    'Controls placeholder color.',
  ],
  [
    '--moduix-combobox-invalid-color',
    'var(--moduix-color-destructive)',
    'Controls invalid border color.',
  ],
  [
    '--moduix-combobox-item-group-gap',
    'var(--moduix-spacing-2)',
    'Controls the gap between item groups.',
  ],
  [
    '--moduix-combobox-item-group-label-color',
    'var(--moduix-popup-group-label-color, var(--moduix-color-muted-foreground))',
    'Controls group label color.',
  ],
  [
    '--moduix-combobox-item-group-label-font-size',
    'var(--moduix-popup-group-label-font-size, var(--moduix-text-xs))',
    'Controls group label font size.',
  ],
  [
    '--moduix-combobox-item-group-label-font-weight',
    'var(--moduix-popup-group-label-font-weight, var(--moduix-weight-regular))',
    'Controls group label weight.',
  ],
  [
    '--moduix-combobox-item-group-label-line-height',
    'var(--moduix-popup-group-label-line-height, var(--moduix-line-height-text-xs))',
    'Controls group label line height.',
  ],
  [
    '--moduix-combobox-item-group-label-padding-x',
    'var(--moduix-spacing-2-5)',
    'Controls group label horizontal padding.',
  ],
  [
    '--moduix-combobox-item-group-label-padding-y',
    'var(--moduix-popup-group-label-padding-y, var(--moduix-spacing-1))',
    'Controls group label vertical padding.',
  ],
  ['--moduix-combobox-item-bg', 'transparent', 'Controls item background.'],
  ['--moduix-combobox-item-border-color', 'transparent', 'Controls item border color.'],
  ['--moduix-combobox-item-border-width', '0', 'Controls item border width.'],
  [
    '--moduix-combobox-item-checked-color',
    'var(--moduix-combobox-item-color)',
    'Controls selected item color.',
  ],
  ['--moduix-combobox-item-color', 'var(--moduix-color-foreground)', 'Controls item text color.'],
  [
    '--moduix-combobox-item-disabled-color',
    'var(--moduix-color-muted-foreground)',
    'Controls disabled item color.',
  ],
  [
    '--moduix-combobox-item-font-size',
    'var(--moduix-popup-item-font-size, var(--moduix-text-sm))',
    'Controls item font size.',
  ],
  ['--moduix-combobox-item-gap', 'var(--moduix-spacing-2)', 'Controls item content gap.'],
  ['--moduix-combobox-item-inset-x', 'var(--moduix-spacing-2)', 'Controls item horizontal inset.'],
  [
    '--moduix-combobox-item-indicator-size',
    'var(--moduix-spacing-3)',
    'Controls item indicator size.',
  ],
  [
    '--moduix-combobox-item-line-height',
    'var(--moduix-popup-item-line-height, var(--moduix-line-height-text-sm))',
    'Controls item line height.',
  ],
  [
    '--moduix-combobox-item-min-height',
    'var(--moduix-popup-item-min-height, var(--moduix-size-sm))',
    'Controls item minimum height.',
  ],
  [
    '--moduix-combobox-item-padding-x',
    'var(--moduix-popup-item-padding-x-start, var(--moduix-spacing-3))',
    'Controls item horizontal padding.',
  ],
  [
    '--moduix-combobox-item-padding-y',
    'var(--moduix-popup-item-padding-y, var(--moduix-spacing-1))',
    'Controls item vertical padding.',
  ],
  ['--moduix-combobox-item-radius', 'var(--moduix-radius-sm)', 'Controls item radius.'],
  ['--moduix-combobox-label-color', 'var(--moduix-combobox-color)', 'Controls label color.'],
  ['--moduix-combobox-label-font-size', 'var(--moduix-text-sm)', 'Controls label font size.'],
  [
    '--moduix-combobox-label-font-weight',
    'var(--moduix-weight-medium)',
    'Controls label font weight.',
  ],
  [
    '--moduix-combobox-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls label line height.',
  ],
  ['--moduix-combobox-max-width', '100%', 'Controls root maximum width.'],
  ['--moduix-combobox-radius', 'var(--moduix-radius-md)', 'Controls control and content radius.'],
  ['--moduix-combobox-root-gap', 'var(--moduix-spacing-1-5)', 'Controls root part spacing.'],
  [
    '--moduix-combobox-transition',
    'var(--moduix-transition-default)',
    'Controls state transitions.',
  ],
  ['--moduix-combobox-width', '16rem', 'Controls root width.'],
];