import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const listboxOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-listbox-bg',
    'var(--moduix-color-background)',
    'Controls content and unified filter background.',
  ],
  [
    '--moduix-listbox-border-color',
    'var(--moduix-color-border)',
    'Controls content and filter fallback border color.',
  ],
  [
    '--moduix-listbox-border-width',
    'var(--moduix-border-width-sm)',
    'Controls content and filter fallback border width.',
  ],
  ['--moduix-listbox-color', 'var(--moduix-color-foreground)', 'Controls root text color.'],
  ['--moduix-listbox-content-max-height', '14rem', 'Controls content maximum height.'],
  [
    '--moduix-listbox-content-padding-y',
    'var(--moduix-popup-list-padding-y, var(--moduix-spacing-1))',
    'Controls content vertical padding.',
  ],
  [
    '--moduix-listbox-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  [
    '--moduix-listbox-empty-color',
    'var(--moduix-color-muted-foreground)',
    'Controls empty message color.',
  ],
  [
    '--moduix-listbox-empty-font-size',
    'var(--moduix-text-sm)',
    'Controls empty message font size.',
  ],
  [
    '--moduix-listbox-empty-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls empty line height.',
  ],
  [
    '--moduix-listbox-empty-padding-x',
    'var(--moduix-spacing-3)',
    'Controls empty horizontal padding.',
  ],
  [
    '--moduix-listbox-empty-padding-y',
    'var(--moduix-spacing-3)',
    'Controls empty vertical padding.',
  ],
  ['--moduix-listbox-filter-action-bg', 'transparent', 'Controls clear button background.'],
  [
    '--moduix-listbox-filter-action-bg-hover',
    'var(--moduix-color-muted)',
    'Controls clear button hover background.',
  ],
  [
    '--moduix-listbox-filter-action-color-hover',
    'var(--moduix-color-foreground)',
    'Controls clear button hover color.',
  ],
  [
    '--moduix-listbox-filter-action-radius',
    'var(--moduix-radius-sm)',
    'Controls clear button radius.',
  ],
  [
    '--moduix-listbox-filter-action-size',
    'var(--moduix-size-xs)',
    'Controls clear button box size.',
  ],
  [
    '--moduix-listbox-filter-height',
    'var(--moduix-listbox-input-height, var(--moduix-size-md))',
    'Controls search field height.',
  ],
  [
    '--moduix-listbox-filter-icon-color',
    'var(--moduix-color-muted-foreground)',
    'Controls search and clear icon color.',
  ],
  [
    '--moduix-listbox-filter-icon-size',
    'var(--moduix-spacing-4)',
    'Controls search and clear icon size.',
  ],
  [
    '--moduix-listbox-filter-input-padding-x',
    'var(--moduix-spacing-2)',
    'Controls text padding inside the search field.',
  ],
  [
    '--moduix-listbox-filter-padding-x',
    'var(--moduix-spacing-3)',
    'Controls search field edge padding.',
  ],
  ['--moduix-listbox-focus-ring-color', 'var(--moduix-color-ring)', 'Controls focus ring color.'],
  [
    '--moduix-listbox-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls focus ring width.',
  ],
  ['--moduix-listbox-grid-gap', 'var(--moduix-spacing-1)', 'Controls grid content gap.'],
  ['--moduix-listbox-grid-padding', 'var(--moduix-spacing-2)', 'Controls grid content padding.'],
  [
    '--moduix-listbox-grid-selected-bg',
    'var(--moduix-color-muted)',
    'Controls selected grid item background.',
  ],
  [
    '--moduix-listbox-grid-selected-color',
    'var(--moduix-color-foreground)',
    'Controls selected grid item text color.',
  ],
  [
    '--moduix-listbox-highlight-bg',
    'var(--moduix-color-accent)',
    'Controls highlighted item background.',
  ],
  [
    '--moduix-listbox-highlight-color',
    'var(--moduix-color-accent-foreground)',
    'Controls highlighted item text color.',
  ],
  [
    '--moduix-listbox-hover-bg',
    'var(--moduix-listbox-highlight-bg, var(--moduix-color-accent))',
    'Controls hovered item background.',
  ],
  [
    '--moduix-listbox-hover-color',
    'var(--moduix-listbox-highlight-color, var(--moduix-color-accent-foreground))',
    'Controls hovered item text color.',
  ],
  [
    '--moduix-listbox-horizontal-content-max-height',
    'none',
    'Controls horizontal content maximum height.',
  ],
  ['--moduix-listbox-horizontal-gap', 'var(--moduix-spacing-2)', 'Controls horizontal item gap.'],
  ['--moduix-listbox-horizontal-item-width', '11rem', 'Controls horizontal item width.'],
  ['--moduix-listbox-input-height', 'var(--moduix-size-md)', 'Controls Listbox input height.'],
  [
    '--moduix-listbox-input-bg',
    'var(--moduix-color-background)',
    'Controls standalone input background.',
  ],
  [
    '--moduix-listbox-input-border-color',
    'var(--moduix-listbox-border-color, var(--moduix-color-border))',
    'Controls Listbox input border color.',
  ],
  [
    '--moduix-listbox-input-border-width',
    'var(--moduix-listbox-border-width, var(--moduix-border-width-sm))',
    'Controls Listbox input border width.',
  ],
  [
    '--moduix-listbox-input-color',
    'var(--moduix-listbox-color, var(--moduix-color-foreground))',
    'Controls Listbox input text color.',
  ],
  [
    '--moduix-listbox-input-focus-ring-color',
    'var(--moduix-listbox-focus-ring-color, var(--moduix-color-ring))',
    'Controls standalone input focus ring color.',
  ],
  [
    '--moduix-listbox-input-focus-ring-width',
    'var(--moduix-listbox-focus-ring-width, var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm)))',
    'Controls standalone input focus ring width.',
  ],
  ['--moduix-listbox-input-font-size', 'var(--moduix-text-md)', 'Controls filter input font size.'],
  [
    '--moduix-listbox-input-line-height',
    'var(--moduix-line-height-text-md)',
    'Controls filter input line height.',
  ],
  [
    '--moduix-listbox-input-padding-x',
    'var(--moduix-spacing-3)',
    'Controls filter input horizontal padding.',
  ],
  [
    '--moduix-listbox-input-padding-y',
    'var(--moduix-spacing-1)',
    'Controls filter input vertical padding.',
  ],
  [
    '--moduix-listbox-input-radius',
    'var(--moduix-listbox-radius, var(--moduix-radius-md))',
    'Controls filter input radius.',
  ],
  ['--moduix-listbox-item-bg', 'transparent', 'Controls item background.'],
  ['--moduix-listbox-item-border-color', 'transparent', 'Controls item border color.'],
  ['--moduix-listbox-item-border-width', '0', 'Controls item border width.'],
  [
    '--moduix-listbox-item-color',
    'var(--moduix-listbox-color, var(--moduix-color-foreground))',
    'Controls item text color.',
  ],
  [
    '--moduix-listbox-item-disabled-color',
    'var(--moduix-color-muted-foreground)',
    'Controls disabled item text color.',
  ],
  [
    '--moduix-listbox-item-font-size',
    'var(--moduix-popup-item-font-size, var(--moduix-text-sm))',
    'Controls item font size.',
  ],
  ['--moduix-listbox-item-gap', 'var(--moduix-spacing-2)', 'Controls item content gap.'],
  [
    '--moduix-listbox-item-group-gap',
    'var(--moduix-spacing-2)',
    'Controls gap between item groups.',
  ],
  [
    '--moduix-listbox-item-group-label-color',
    'var(--moduix-popup-group-label-color, var(--moduix-color-muted-foreground))',
    'Controls group label color.',
  ],
  [
    '--moduix-listbox-item-group-label-font-size',
    'var(--moduix-popup-group-label-font-size, var(--moduix-text-xs))',
    'Controls group label font size.',
  ],
  [
    '--moduix-listbox-item-group-label-font-weight',
    'var(--moduix-popup-group-label-font-weight, var(--moduix-weight-regular))',
    'Controls group label font weight.',
  ],
  [
    '--moduix-listbox-item-group-label-line-height',
    'var(--moduix-popup-group-label-line-height, var(--moduix-line-height-text-xs))',
    'Controls group label line height.',
  ],
  [
    '--moduix-listbox-item-group-label-padding-x',
    'var(--moduix-spacing-2)',
    'Controls group label horizontal padding.',
  ],
  [
    '--moduix-listbox-item-group-label-padding-y',
    'var(--moduix-popup-group-label-padding-y, var(--moduix-spacing-1))',
    'Controls group label vertical padding.',
  ],
  ['--moduix-listbox-item-indicator-color', 'currentColor', 'Controls selected indicator color.'],
  [
    '--moduix-listbox-item-indicator-icon-size',
    'var(--moduix-spacing-3)',
    'Controls selected icon size.',
  ],
  [
    '--moduix-listbox-item-indicator-size',
    'var(--moduix-spacing-4)',
    'Controls selected indicator box size.',
  ],
  ['--moduix-listbox-item-inset-x', 'var(--moduix-spacing-2)', 'Controls item horizontal inset.'],
  [
    '--moduix-listbox-item-line-height',
    'var(--moduix-popup-item-line-height, var(--moduix-line-height-text-sm))',
    'Controls item line height.',
  ],
  [
    '--moduix-listbox-item-min-height',
    'var(--moduix-popup-item-min-height, var(--moduix-size-sm))',
    'Controls item minimum height.',
  ],
  [
    '--moduix-listbox-item-padding-x',
    'var(--moduix-popup-item-padding-x-start, var(--moduix-spacing-3))',
    'Controls item horizontal padding.',
  ],
  [
    '--moduix-listbox-item-padding-y',
    'var(--moduix-popup-item-padding-y, var(--moduix-spacing-1))',
    'Controls item vertical padding.',
  ],
  ['--moduix-listbox-item-radius', 'var(--moduix-radius-sm)', 'Controls item radius.'],
  [
    '--moduix-listbox-item-selected-color',
    'var(--moduix-listbox-item-color, var(--moduix-color-foreground))',
    'Controls selected item color.',
  ],
  [
    '--moduix-listbox-item-text-content-gap',
    'var(--moduix-spacing-2)',
    'Controls rich item text gap.',
  ],
  ['--moduix-listbox-item-text-icon-color', 'currentColor', 'Controls rich item icon color.'],
  [
    '--moduix-listbox-item-text-icon-size',
    'var(--moduix-spacing-4)',
    'Controls rich item icon size.',
  ],
  [
    '--moduix-listbox-label-color',
    'var(--moduix-listbox-color, var(--moduix-color-foreground))',
    'Controls label color.',
  ],
  ['--moduix-listbox-label-font-size', 'var(--moduix-text-sm)', 'Controls label font size.'],
  [
    '--moduix-listbox-label-font-weight',
    'var(--moduix-weight-medium)',
    'Controls label font weight.',
  ],
  [
    '--moduix-listbox-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls label line height.',
  ],
  ['--moduix-listbox-max-width', '100%', 'Controls root maximum width.'],
  [
    '--moduix-listbox-placeholder-color',
    'var(--moduix-color-muted-foreground)',
    'Controls input placeholder.',
  ],
  ['--moduix-listbox-radius', 'var(--moduix-radius-md)', 'Controls input and content radius.'],
  ['--moduix-listbox-root-gap', 'var(--moduix-spacing-3)', 'Controls root internal gap.'],
  [
    '--moduix-listbox-transition',
    'var(--moduix-transition-default)',
    'Controls interactive transitions.',
  ],
  [
    '--moduix-listbox-value-text-color',
    'var(--moduix-color-muted-foreground)',
    'Controls value text color.',
  ],
  [
    '--moduix-listbox-value-text-font-size',
    'var(--moduix-text-sm)',
    'Controls value text font size.',
  ],
  [
    '--moduix-listbox-value-text-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls value text line height.',
  ],
  ['--moduix-listbox-width', '16rem', 'Controls root width.'],
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