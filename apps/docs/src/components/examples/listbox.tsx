import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const listboxOverrideCssProperties: CssPropertyInput[] = [
  ['--listbox-bg', 'var(--color-background)', 'Controls content and unified filter background.'],
  [
    '--listbox-border-color',
    'var(--color-border)',
    'Controls content and filter fallback border color.',
  ],
  [
    '--listbox-border-width',
    'var(--border-width-sm)',
    'Controls content and filter fallback border width.',
  ],
  ['--listbox-color', 'var(--color-foreground)', 'Controls root text color.'],
  ['--listbox-content-max-height', '14rem', 'Controls content maximum height.'],
  [
    '--listbox-content-padding-y',
    'var(--popup-list-padding-y, var(--spacing-1))',
    'Controls content vertical padding.',
  ],
  ['--listbox-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--listbox-empty-color', 'var(--color-muted-foreground)', 'Controls empty message color.'],
  ['--listbox-empty-font-size', 'var(--text-sm)', 'Controls empty message font size.'],
  ['--listbox-empty-line-height', 'var(--line-height-text-sm)', 'Controls empty line height.'],
  ['--listbox-empty-padding-x', 'var(--spacing-3)', 'Controls empty horizontal padding.'],
  ['--listbox-empty-padding-y', 'var(--spacing-3)', 'Controls empty vertical padding.'],
  ['--listbox-filter-action-bg', 'transparent', 'Controls clear button background.'],
  [
    '--listbox-filter-action-bg-hover',
    'var(--color-muted)',
    'Controls clear button hover background.',
  ],
  [
    '--listbox-filter-action-color-hover',
    'var(--color-foreground)',
    'Controls clear button hover color.',
  ],
  ['--listbox-filter-action-radius', 'var(--radius-sm)', 'Controls clear button radius.'],
  ['--listbox-filter-action-size', 'var(--size-xs)', 'Controls clear button box size.'],
  [
    '--listbox-filter-height',
    'var(--listbox-input-height, var(--size-md))',
    'Controls search field height.',
  ],
  [
    '--listbox-filter-icon-color',
    'var(--color-muted-foreground)',
    'Controls search and clear icon color.',
  ],
  ['--listbox-filter-icon-size', 'var(--spacing-4)', 'Controls search and clear icon size.'],
  [
    '--listbox-filter-input-padding-x',
    'var(--spacing-2)',
    'Controls text padding inside the search field.',
  ],
  ['--listbox-filter-padding-x', 'var(--spacing-3)', 'Controls search field edge padding.'],
  ['--listbox-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--listbox-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls focus ring width.',
  ],
  ['--listbox-grid-gap', 'var(--spacing-1)', 'Controls grid content gap.'],
  ['--listbox-grid-padding', 'var(--spacing-2)', 'Controls grid content padding.'],
  ['--listbox-grid-selected-bg', 'var(--color-muted)', 'Controls selected grid item background.'],
  [
    '--listbox-grid-selected-color',
    'var(--color-foreground)',
    'Controls selected grid item text color.',
  ],
  ['--listbox-highlight-bg', 'var(--color-accent)', 'Controls highlighted item background.'],
  [
    '--listbox-highlight-color',
    'var(--color-accent-foreground)',
    'Controls highlighted item text color.',
  ],
  [
    '--listbox-hover-bg',
    'var(--listbox-highlight-bg, var(--color-accent))',
    'Controls hovered item background.',
  ],
  [
    '--listbox-hover-color',
    'var(--listbox-highlight-color, var(--color-accent-foreground))',
    'Controls hovered item text color.',
  ],
  [
    '--listbox-horizontal-content-max-height',
    'none',
    'Controls horizontal content maximum height.',
  ],
  ['--listbox-horizontal-gap', 'var(--spacing-2)', 'Controls horizontal item gap.'],
  ['--listbox-horizontal-item-width', '11rem', 'Controls horizontal item width.'],
  ['--listbox-input-height', 'var(--size-md)', 'Controls Listbox input height.'],
  ['--listbox-input-bg', 'var(--color-background)', 'Controls standalone input background.'],
  [
    '--listbox-input-border-color',
    'var(--listbox-border-color, var(--color-border))',
    'Controls Listbox input border color.',
  ],
  [
    '--listbox-input-border-width',
    'var(--listbox-border-width, var(--border-width-sm))',
    'Controls Listbox input border width.',
  ],
  [
    '--listbox-input-color',
    'var(--listbox-color, var(--color-foreground))',
    'Controls Listbox input text color.',
  ],
  [
    '--listbox-input-focus-ring-color',
    'var(--listbox-focus-ring-color, var(--color-ring))',
    'Controls standalone input focus ring color.',
  ],
  [
    '--listbox-input-focus-ring-width',
    'var(--listbox-focus-ring-width, var(--focus-ring-inset-width, var(--border-width-sm)))',
    'Controls standalone input focus ring width.',
  ],
  ['--listbox-input-font-size', 'var(--text-md)', 'Controls filter input font size.'],
  [
    '--listbox-input-line-height',
    'var(--line-height-text-md)',
    'Controls filter input line height.',
  ],
  ['--listbox-input-padding-x', 'var(--spacing-3)', 'Controls filter input horizontal padding.'],
  ['--listbox-input-padding-y', 'var(--spacing-1)', 'Controls filter input vertical padding.'],
  [
    '--listbox-input-radius',
    'var(--listbox-radius, var(--radius-md))',
    'Controls filter input radius.',
  ],
  ['--listbox-item-bg', 'transparent', 'Controls item background.'],
  ['--listbox-item-border-color', 'transparent', 'Controls item border color.'],
  ['--listbox-item-border-width', '0', 'Controls item border width.'],
  [
    '--listbox-item-color',
    'var(--listbox-color, var(--color-foreground))',
    'Controls item text color.',
  ],
  [
    '--listbox-item-disabled-color',
    'var(--color-muted-foreground)',
    'Controls disabled item text color.',
  ],
  [
    '--listbox-item-font-size',
    'var(--popup-item-font-size, var(--text-sm))',
    'Controls item font size.',
  ],
  ['--listbox-item-gap', 'var(--spacing-2)', 'Controls item content gap.'],
  ['--listbox-item-group-gap', 'var(--spacing-2)', 'Controls gap between item groups.'],
  [
    '--listbox-item-group-label-color',
    'var(--popup-group-label-color, var(--color-muted-foreground))',
    'Controls group label color.',
  ],
  [
    '--listbox-item-group-label-font-size',
    'var(--popup-group-label-font-size, var(--text-xs))',
    'Controls group label font size.',
  ],
  [
    '--listbox-item-group-label-font-weight',
    'var(--popup-group-label-font-weight, var(--weight-regular))',
    'Controls group label font weight.',
  ],
  [
    '--listbox-item-group-label-line-height',
    'var(--popup-group-label-line-height, var(--line-height-text-xs))',
    'Controls group label line height.',
  ],
  [
    '--listbox-item-group-label-padding-x',
    'var(--spacing-2)',
    'Controls group label horizontal padding.',
  ],
  [
    '--listbox-item-group-label-padding-y',
    'var(--popup-group-label-padding-y, var(--spacing-1))',
    'Controls group label vertical padding.',
  ],
  ['--listbox-item-indicator-color', 'currentColor', 'Controls selected indicator color.'],
  ['--listbox-item-indicator-icon-size', 'var(--spacing-3)', 'Controls selected icon size.'],
  ['--listbox-item-indicator-size', 'var(--spacing-4)', 'Controls selected indicator box size.'],
  ['--listbox-item-inset-x', 'var(--spacing-2)', 'Controls item horizontal inset.'],
  [
    '--listbox-item-line-height',
    'var(--popup-item-line-height, var(--line-height-text-sm))',
    'Controls item line height.',
  ],
  [
    '--listbox-item-min-height',
    'var(--popup-item-min-height, var(--size-sm))',
    'Controls item minimum height.',
  ],
  [
    '--listbox-item-padding-x',
    'var(--popup-item-padding-x-start, var(--spacing-3))',
    'Controls item horizontal padding.',
  ],
  [
    '--listbox-item-padding-y',
    'var(--popup-item-padding-y, var(--spacing-1))',
    'Controls item vertical padding.',
  ],
  ['--listbox-item-radius', 'var(--radius-sm)', 'Controls item radius.'],
  [
    '--listbox-item-selected-color',
    'var(--listbox-item-color, var(--color-foreground))',
    'Controls selected item color.',
  ],
  ['--listbox-item-text-content-gap', 'var(--spacing-2)', 'Controls rich item text gap.'],
  ['--listbox-item-text-icon-color', 'currentColor', 'Controls rich item icon color.'],
  ['--listbox-item-text-icon-size', 'var(--spacing-4)', 'Controls rich item icon size.'],
  [
    '--listbox-label-color',
    'var(--listbox-color, var(--color-foreground))',
    'Controls label color.',
  ],
  ['--listbox-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--listbox-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--listbox-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--listbox-max-width', '100%', 'Controls root maximum width.'],
  ['--listbox-placeholder-color', 'var(--color-muted-foreground)', 'Controls input placeholder.'],
  ['--listbox-radius', 'var(--radius-md)', 'Controls input and content radius.'],
  ['--listbox-root-gap', 'var(--spacing-3)', 'Controls root internal gap.'],
  ['--listbox-transition', 'var(--transition-default)', 'Controls interactive transitions.'],
  ['--listbox-value-text-color', 'var(--color-muted-foreground)', 'Controls value text color.'],
  ['--listbox-value-text-font-size', 'var(--text-sm)', 'Controls value text font size.'],
  [
    '--listbox-value-text-line-height',
    'var(--line-height-text-sm)',
    'Controls value text line height.',
  ],
  ['--listbox-width', '16rem', 'Controls root width.'],
];

export function ListboxCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={listboxOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}