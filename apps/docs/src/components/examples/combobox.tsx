import type { CssPropertyInput } from '../mdx/reference';

export const comboboxExampleCss = `
[data-slot='combobox-content'] {
  min-width: var(--reference-width);
  transform-origin: var(--transform-origin);
}

[data-slot='combobox-item'][data-highlighted] {
  background: var(--combobox-highlight-bg, var(--color-accent));
  color: var(--combobox-highlight-color, var(--color-accent-foreground));
}
`;

export const comboboxOverrideCssProperties: CssPropertyInput[] = [
  ['--combobox-action-bg', 'transparent', 'Controls action background.'],
  ['--combobox-action-bg-hover', 'var(--color-muted)', 'Controls action hover background.'],
  ['--combobox-action-color-hover', 'var(--color-foreground)', 'Controls action hover color.'],
  ['--combobox-action-gap', 'var(--spacing-0-5)', 'Controls the gap between actions.'],
  ['--combobox-action-offset-right', 'var(--spacing-2)', 'Controls the trailing action offset.'],
  ['--combobox-action-radius', 'var(--radius-sm)', 'Controls action radius.'],
  ['--combobox-action-size', 'var(--size-xs)', 'Controls action size.'],
  ['--combobox-bg', 'var(--color-background)', 'Controls control background.'],
  ['--combobox-border-color', 'var(--color-border)', 'Controls control border color.'],
  ['--combobox-border-width', 'var(--border-width-sm)', 'Controls control border width.'],
  ['--combobox-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--combobox-bg-active', 'var(--color-muted)', 'Controls control background when open.'],
  ['--combobox-bg-hover', 'var(--color-accent)', 'Controls control background on hover.'],
  ['--combobox-content-bg', 'var(--color-popover)', 'Controls content background.'],
  ['--combobox-content-border-color', 'var(--color-border)', 'Controls content border color.'],
  ['--combobox-content-border-width', 'var(--border-width-sm)', 'Controls content border width.'],
  ['--combobox-content-closed-opacity', '0', 'Controls closed animation opacity.'],
  ['--combobox-content-closed-scale', 'var(--scale-popup)', 'Controls closed animation scale.'],
  ['--combobox-content-color', 'var(--color-popover-foreground)', 'Controls content text color.'],
  ['--combobox-content-max-height', '24rem', 'Controls content maximum height.'],
  [
    '--combobox-content-padding-y',
    'var(--popup-list-padding-y, var(--spacing-1))',
    'Controls content vertical padding.',
  ],
  ['--combobox-content-shadow', 'var(--shadow-lg)', 'Controls content shadow.'],
  ['--combobox-control-height', 'var(--size-md)', 'Controls input height.'],
  ['--combobox-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--combobox-empty-color', 'var(--color-muted-foreground)', 'Controls empty text color.'],
  ['--combobox-empty-font-size', 'var(--text-sm)', 'Controls empty font size.'],
  ['--combobox-empty-line-height', 'var(--line-height-text-sm)', 'Controls empty line height.'],
  ['--combobox-empty-padding-x', 'var(--spacing-4)', 'Controls empty horizontal padding.'],
  ['--combobox-empty-padding-y', 'var(--spacing-3)', 'Controls empty vertical padding.'],
  ['--combobox-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--combobox-focus-ring-offset', 'var(--border-width-sm)', 'Controls focus ring offset.'],
  [
    '--combobox-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls focus ring width.',
  ],
  ['--combobox-highlight-bg', 'var(--color-accent)', 'Controls highlighted item background.'],
  [
    '--combobox-highlight-color',
    'var(--color-accent-foreground)',
    'Controls highlighted item color.',
  ],
  ['--combobox-icon-color', 'var(--color-muted-foreground)', 'Controls action icon color.'],
  ['--combobox-icon-size', 'var(--spacing-4)', 'Controls action icon size.'],
  ['--combobox-input-padding-x-end', 'var(--spacing-3-5)', 'Controls input trailing padding.'],
  [
    '--combobox-input-padding-x-end-with-clear',
    '4.375rem',
    'Customizes combobox input padding x end with clear.',
  ],
  [
    '--combobox-input-padding-x-end-with-trigger',
    '2.75rem',
    'Customizes combobox input padding x end with trigger.',
  ],
  ['--combobox-input-padding-x-start', 'var(--spacing-3-5)', 'Controls input leading padding.'],
  [
    '--combobox-input-placeholder-color',
    'var(--color-muted-foreground)',
    'Controls placeholder color.',
  ],
  ['--combobox-invalid-color', 'var(--color-destructive)', 'Controls invalid border color.'],
  ['--combobox-item-group-gap', 'var(--spacing-2)', 'Controls the gap between item groups.'],
  [
    '--combobox-item-group-label-color',
    'var(--popup-group-label-color, var(--color-muted-foreground))',
    'Controls group label color.',
  ],
  [
    '--combobox-item-group-label-font-size',
    'var(--popup-group-label-font-size, var(--text-xs))',
    'Controls group label font size.',
  ],
  [
    '--combobox-item-group-label-font-weight',
    'var(--popup-group-label-font-weight, var(--weight-regular))',
    'Controls group label weight.',
  ],
  [
    '--combobox-item-group-label-line-height',
    'var(--popup-group-label-line-height, var(--line-height-text-xs))',
    'Controls group label line height.',
  ],
  [
    '--combobox-item-group-label-padding-x',
    'var(--spacing-2-5)',
    'Controls group label horizontal padding.',
  ],
  [
    '--combobox-item-group-label-padding-y',
    'var(--popup-group-label-padding-y, var(--spacing-1))',
    'Controls group label vertical padding.',
  ],
  ['--combobox-item-bg', 'transparent', 'Controls item background.'],
  ['--combobox-item-border-color', 'transparent', 'Controls item border color.'],
  ['--combobox-item-border-width', '0', 'Controls item border width.'],
  ['--combobox-item-checked-color', 'var(--combobox-item-color)', 'Controls selected item color.'],
  ['--combobox-item-color', 'var(--color-foreground)', 'Controls item text color.'],
  [
    '--combobox-item-disabled-color',
    'var(--color-muted-foreground)',
    'Controls disabled item color.',
  ],
  [
    '--combobox-item-font-size',
    'var(--popup-item-font-size, var(--text-sm))',
    'Controls item font size.',
  ],
  ['--combobox-item-gap', 'var(--spacing-2)', 'Controls item content gap.'],
  ['--combobox-item-inset-x', 'var(--spacing-2)', 'Controls item horizontal inset.'],
  ['--combobox-item-indicator-size', 'var(--spacing-3)', 'Controls item indicator size.'],
  [
    '--combobox-item-line-height',
    'var(--popup-item-line-height, var(--line-height-text-sm))',
    'Controls item line height.',
  ],
  [
    '--combobox-item-min-height',
    'var(--popup-item-min-height, var(--size-sm))',
    'Controls item minimum height.',
  ],
  [
    '--combobox-item-padding-x',
    'var(--popup-item-padding-x-start, var(--spacing-3))',
    'Controls item horizontal padding.',
  ],
  [
    '--combobox-item-padding-y',
    'var(--popup-item-padding-y, var(--spacing-1))',
    'Controls item vertical padding.',
  ],
  ['--combobox-item-radius', 'var(--radius-sm)', 'Controls item radius.'],
  ['--combobox-label-color', 'var(--combobox-color)', 'Controls label color.'],
  ['--combobox-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--combobox-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--combobox-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--combobox-max-width', '100%', 'Controls root maximum width.'],
  ['--combobox-radius', 'var(--radius-md)', 'Controls control and content radius.'],
  ['--combobox-root-gap', 'var(--spacing-1-5)', 'Controls root part spacing.'],
  ['--combobox-transition', 'var(--transition-default)', 'Controls state transitions.'],
  ['--combobox-width', '16rem', 'Controls root width.'],
];