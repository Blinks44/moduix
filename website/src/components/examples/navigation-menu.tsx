import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable, normalizeCssProperties } from '../mdx/reference';

const navigationMenuOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-navigation-menu-arrow-offset',
    'calc(var(--moduix-spacing-1) - var(--moduix-navigation-menu-content-border-width, var(--moduix-border-width-sm)))',
    'Controls the arrow overlap with the popup outline.',
  ],
  ['--moduix-navigation-menu-arrow-size', 'var(--moduix-spacing-2-5)', 'Controls arrow size.'],
  [
    '--moduix-navigation-menu-arrow-stroke-color',
    'var(--moduix-navigation-menu-content-border-color)',
    'Controls arrow stroke color.',
  ],
  ['--moduix-navigation-menu-color', 'var(--moduix-color-foreground)', 'Controls root text color.'],
  [
    '--moduix-navigation-menu-content-bg',
    'var(--moduix-color-popover)',
    'Controls disclosure panel background.',
  ],
  [
    '--moduix-navigation-menu-content-border-color',
    'var(--moduix-color-border)',
    'Controls disclosure panel border color.',
  ],
  [
    '--moduix-navigation-menu-content-border-width',
    'var(--moduix-border-width-sm)',
    'Controls disclosure panel border width.',
  ],
  [
    '--moduix-navigation-menu-content-color',
    'var(--moduix-color-popover-foreground)',
    'Controls disclosure panel text color.',
  ],
  [
    '--moduix-navigation-menu-content-ending-opacity',
    'var(--moduix-popup-motion-ending-opacity, 0)',
    'Controls disclosure panel ending opacity.',
  ],
  [
    '--moduix-navigation-menu-content-ending-scale',
    'var(--moduix-popup-motion-ending-scale, var(--moduix-scale-popup))',
    'Controls disclosure panel ending scale.',
  ],
  [
    '--moduix-navigation-menu-content-ending-translate-x',
    'var(--moduix-popup-motion-ending-translate-x, 0)',
    'Controls disclosure panel ending horizontal offset.',
  ],
  [
    '--moduix-navigation-menu-content-ending-translate-y',
    'var(--moduix-popup-motion-ending-translate-y, 0)',
    'Controls disclosure panel ending vertical offset.',
  ],
  [
    '--moduix-navigation-menu-content-link-padding-x',
    'var(--moduix-spacing-2)',
    'Controls disclosure link horizontal padding.',
  ],
  [
    '--moduix-navigation-menu-content-link-radius',
    'var(--moduix-radius-sm)',
    'Controls disclosure link radius.',
  ],
  [
    '--moduix-navigation-menu-content-max-height',
    '20rem',
    'Controls disclosure panel maximum height.',
  ],
  [
    '--moduix-navigation-menu-content-max-width',
    '24rem',
    'Controls disclosure panel maximum width.',
  ],
  [
    '--moduix-navigation-menu-content-min-width',
    '12rem',
    'Controls disclosure panel minimum width.',
  ],
  [
    '--moduix-navigation-menu-content-offset',
    'var(--moduix-spacing-2)',
    'Controls space between a trigger and its disclosure panel.',
  ],
  [
    '--moduix-navigation-menu-content-padding',
    'var(--moduix-popup-list-padding-y, var(--moduix-spacing-1)) 0',
    'Controls disclosure panel padding.',
  ],
  [
    '--moduix-navigation-menu-content-radius',
    'var(--moduix-radius-md)',
    'Controls disclosure panel radius.',
  ],
  [
    '--moduix-navigation-menu-content-shadow',
    'var(--moduix-shadow-lg)',
    'Controls disclosure panel shadow.',
  ],
  [
    '--moduix-navigation-menu-content-starting-opacity',
    'var(--moduix-popup-motion-starting-opacity, 0)',
    'Controls disclosure panel starting opacity.',
  ],
  [
    '--moduix-navigation-menu-content-starting-scale',
    'var(--moduix-popup-motion-starting-scale, var(--moduix-scale-popup))',
    'Controls disclosure panel starting scale.',
  ],
  [
    '--moduix-navigation-menu-content-starting-translate-x',
    'var(--moduix-popup-motion-starting-translate-x, 0)',
    'Controls disclosure panel starting horizontal offset.',
  ],
  [
    '--moduix-navigation-menu-content-starting-translate-y',
    'var(--moduix-popup-motion-starting-translate-y, 0)',
    'Controls disclosure panel starting vertical offset.',
  ],
  [
    '--moduix-navigation-menu-content-z-index',
    'var(--moduix-z-popup)',
    'Controls disclosure panel stacking level.',
  ],
  [
    '--moduix-navigation-menu-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled item opacity.',
  ],
  [
    '--moduix-navigation-menu-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls trigger and link focus ring color.',
  ],
  [
    '--moduix-navigation-menu-focus-ring-offset',
    '0',
    'Controls trigger and link focus ring offset.',
  ],
  [
    '--moduix-navigation-menu-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls trigger and link focus ring width.',
  ],
  [
    '--moduix-navigation-menu-indicator-size',
    'var(--moduix-spacing-2-5)',
    'Controls indicator track size.',
  ],
  [
    '--moduix-navigation-menu-item-indicator-bg',
    'var(--moduix-color-foreground)',
    'Controls active item indicator color.',
  ],
  [
    '--moduix-navigation-menu-item-indicator-inset',
    'var(--moduix-spacing-2)',
    'Controls active item indicator horizontal inset.',
  ],
  [
    '--moduix-navigation-menu-item-indicator-size',
    'var(--moduix-border-width-md)',
    'Controls active item indicator thickness.',
  ],
  [
    '--moduix-navigation-menu-list-gap',
    'var(--moduix-spacing-1)',
    'Controls space between top-level items.',
  ],
  ['--moduix-navigation-menu-link-current-bg', 'transparent', 'Controls current link background.'],
  [
    '--moduix-navigation-menu-link-current-color',
    'var(--moduix-color-primary)',
    'Controls current link text color.',
  ],
  [
    '--moduix-navigation-menu-transition',
    'var(--moduix-transition-default)',
    'Controls panel, viewport, and trigger transitions.',
  ],
  [
    '--moduix-navigation-menu-trigger-bg-active',
    'var(--moduix-navigation-menu-trigger-bg-hover, var(--moduix-color-muted))',
    'Controls open trigger background.',
  ],
  [
    '--moduix-navigation-menu-trigger-bg-hover',
    'var(--moduix-color-muted)',
    'Controls trigger and link hover background.',
  ],
  [
    '--moduix-navigation-menu-trigger-color',
    'currentColor',
    'Controls trigger and link text color.',
  ],
  [
    '--moduix-navigation-menu-trigger-font-size',
    'var(--moduix-text-sm)',
    'Controls trigger and link font size.',
  ],
  [
    '--moduix-navigation-menu-trigger-font-weight',
    'var(--moduix-weight-medium)',
    'Controls trigger and link font weight.',
  ],
  [
    '--moduix-navigation-menu-trigger-gap',
    'var(--moduix-spacing-2)',
    'Controls space between a trigger label and icon.',
  ],
  [
    '--moduix-navigation-menu-trigger-height',
    'var(--moduix-size-md)',
    'Controls trigger and link minimum height.',
  ],
  [
    '--moduix-navigation-menu-trigger-icon-size',
    'var(--moduix-spacing-4)',
    'Controls direct trigger icon size.',
  ],
  [
    '--moduix-navigation-menu-trigger-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls trigger and link line height.',
  ],
  [
    '--moduix-navigation-menu-trigger-padding-x',
    'var(--moduix-spacing-3)',
    'Controls trigger and link horizontal padding.',
  ],
  [
    '--moduix-navigation-menu-trigger-padding-y',
    'var(--moduix-spacing-1)',
    'Controls trigger and link vertical padding.',
  ],
  [
    '--moduix-navigation-menu-trigger-radius',
    'var(--moduix-radius-md)',
    'Controls trigger and link radius.',
  ],
  ['--moduix-navigation-menu-viewport-max-height', '32rem', 'Controls viewport maximum height.'],
  ['--moduix-navigation-menu-viewport-max-width', '40rem', 'Controls viewport maximum width.'],
  [
    '--moduix-navigation-menu-viewport-motion-distance',
    '12.5rem',
    'Controls directional content travel distance.',
  ],
  [
    '--moduix-navigation-menu-viewport-offset',
    'var(--moduix-spacing-2)',
    'Controls space between the list and viewport.',
  ],
  [
    '--moduix-navigation-menu-viewport-radius',
    'var(--moduix-radius-md)',
    'Controls viewport radius.',
  ],
  [
    '--moduix-navigation-menu-viewport-transition',
    '200ms ease',
    'Controls viewport size and position transitions.',
  ],
  [
    '--moduix-navigation-menu-viewport-z-index',
    'var(--moduix-z-popup)',
    'Controls viewport stacking level.',
  ],
];

export function NavigationMenuCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable
      properties={normalizeCssProperties(navigationMenuOverrideCssProperties)}
    />
  );
}