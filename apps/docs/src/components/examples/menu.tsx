import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const menuExampleCss = `
  .menu-content {
    --moduix-menu-popup-min-width: 13rem;
  }

  .menu-context-trigger {
    --moduix-menu-trigger-bg-hover: var(--moduix-color-muted);
    --moduix-menu-trigger-bg-active: var(--moduix-color-muted);

    width: 16rem;
  }

  .menu-dialog-stack {
    margin-block-start: var(--moduix-spacing-4);
  }

`;

const menuOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-menu-arrow-size', 'var(--moduix-spacing-2-5)', 'Controls Ark arrow size.'],
  [
    '--moduix-menu-arrow-stroke-color',
    'var(--moduix-menu-popup-border-color)',
    'Controls arrow tip stroke color.',
  ],
  [
    '--moduix-menu-check-gap',
    'var(--moduix-popup-check-gap, var(--moduix-spacing-2))',
    'Controls checkbox/radio indicator gap.',
  ],
  [
    '--moduix-menu-check-indicator-size',
    'var(--moduix-popup-check-indicator-size, var(--moduix-spacing-3))',
    'Controls checkbox/radio indicator size.',
  ],
  [
    '--moduix-menu-check-padding-x-start',
    'var(--moduix-popup-check-padding-x-start, var(--moduix-spacing-2-5))',
    'Controls checkbox/radio start padding.',
  ],
  ['--moduix-menu-checkbox-indicator-bg', 'transparent', 'Controls checkbox indicator background.'],
  [
    '--moduix-menu-checkbox-indicator-bg-checked',
    'var(--moduix-menu-checkbox-indicator-bg)',
    'Controls checked checkbox indicator background.',
  ],
  [
    '--moduix-menu-checkbox-indicator-border-color',
    'currentColor',
    'Controls checkbox indicator border color.',
  ],
  [
    '--moduix-menu-checkbox-indicator-border-color-checked',
    'var(--moduix-menu-checkbox-indicator-border-color)',
    'Controls checked checkbox indicator border color.',
  ],
  [
    '--moduix-menu-checkbox-indicator-border-width',
    '0',
    'Controls checkbox indicator border width.',
  ],
  [
    '--moduix-menu-checkbox-indicator-radius',
    'var(--moduix-radius-xs)',
    'Controls checkbox indicator radius.',
  ],
  [
    '--moduix-menu-context-trigger-border-style',
    'dashed',
    'Controls context trigger border style.',
  ],
  ['--moduix-menu-context-trigger-height', '10rem', 'Controls context trigger height.'],
  ['--moduix-menu-context-trigger-width', '15rem', 'Controls context trigger width.'],
  [
    '--moduix-menu-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled trigger opacity.',
  ],
  ['--moduix-menu-focus-ring-color', 'var(--moduix-color-ring)', 'Controls focus ring color.'],
  [
    '--moduix-menu-focus-ring-width',
    'var(--moduix-menu-trigger-border-width, var(--moduix-border-width-sm))',
    'Controls focus ring width.',
  ],
  [
    '--moduix-menu-group-label-color',
    'var(--moduix-popup-group-label-color, var(--moduix-color-muted-foreground))',
    'Controls group label color.',
  ],
  [
    '--moduix-menu-group-label-font-size',
    'var(--moduix-popup-group-label-font-size, var(--moduix-text-xs))',
    'Controls group label font size.',
  ],
  [
    '--moduix-menu-group-label-font-weight',
    'var(--moduix-popup-group-label-font-weight, var(--moduix-weight-regular))',
    'Controls group label weight.',
  ],
  [
    '--moduix-menu-group-label-line-height',
    'var(--moduix-popup-group-label-line-height, var(--moduix-line-height-text-xs))',
    'Controls group label line height.',
  ],
  [
    '--moduix-menu-group-label-padding-x-end',
    'var(--moduix-popup-group-label-padding-x-end, var(--moduix-spacing-3))',
    'Controls group label end padding.',
  ],
  [
    '--moduix-menu-group-label-padding-x-start',
    'var(--moduix-popup-group-label-padding-x-start, var(--moduix-spacing-2-5))',
    'Controls group label start padding.',
  ],
  [
    '--moduix-menu-group-label-padding-y',
    'var(--moduix-popup-group-label-padding-y, var(--moduix-spacing-1))',
    'Controls group label vertical padding.',
  ],
  ['--moduix-menu-group-padding-y', '0', 'Controls group vertical padding.'],
  [
    '--moduix-menu-highlight-bg',
    'var(--moduix-color-accent)',
    'Controls highlighted item background.',
  ],
  [
    '--moduix-menu-highlight-color',
    'var(--moduix-color-accent-foreground)',
    'Controls highlighted item color.',
  ],
  [
    '--moduix-menu-highlight-inset-x',
    'var(--moduix-popup-highlight-inset-x, var(--moduix-spacing-1))',
    'Controls highlight inline inset.',
  ],
  [
    '--moduix-menu-highlight-radius',
    'var(--moduix-popup-highlight-radius, var(--moduix-radius-sm))',
    'Controls highlight radius.',
  ],
  ['--moduix-menu-item-bg', 'transparent', 'Controls item background.'],
  [
    '--moduix-menu-item-bg-disabled',
    'var(--moduix-menu-item-bg)',
    'Controls disabled item background.',
  ],
  [
    '--moduix-menu-item-destructive-color',
    'var(--moduix-color-destructive)',
    'Controls destructive item text color.',
  ],
  [
    '--moduix-menu-item-destructive-highlight-bg',
    'color-mix(in oklab, var(--moduix-color-destructive) 12%, transparent)',
    'Controls destructive item highlight background.',
  ],
  [
    '--moduix-menu-item-destructive-highlight-color',
    'var(--moduix-menu-item-destructive-color, var(--moduix-color-destructive))',
    'Controls destructive item highlight text color.',
  ],
  [
    '--moduix-menu-item-disabled-color',
    'var(--moduix-color-muted-foreground)',
    'Controls disabled item color.',
  ],
  [
    '--moduix-menu-item-font-size',
    'var(--moduix-popup-item-font-size, var(--moduix-text-sm))',
    'Controls item font size.',
  ],
  ['--moduix-menu-item-gap', 'var(--moduix-spacing-2)', 'Controls item content gap.'],
  [
    '--moduix-menu-item-height',
    'var(--moduix-popup-item-min-height, var(--moduix-size-sm))',
    'Controls item minimum height.',
  ],
  [
    '--moduix-menu-item-indicator-color-checked',
    'currentColor',
    'Controls checked item indicator color.',
  ],
  [
    '--moduix-menu-item-line-height',
    'var(--moduix-popup-item-line-height, var(--moduix-line-height-text-sm))',
    'Controls item line height.',
  ],
  [
    '--moduix-menu-item-padding-x-end',
    'var(--moduix-popup-item-padding-x-end, var(--moduix-spacing-3))',
    'Controls item end padding.',
  ],
  [
    '--moduix-menu-item-padding-x-start',
    'var(--moduix-popup-item-padding-x-start, var(--moduix-spacing-3))',
    'Controls item start padding.',
  ],
  [
    '--moduix-menu-item-padding-y',
    'var(--moduix-popup-item-padding-y, var(--moduix-spacing-1))',
    'Controls item vertical padding.',
  ],
  ['--moduix-menu-item-radius', 'var(--moduix-radius-sm)', 'Controls item border radius.'],
  [
    '--moduix-menu-item-shortcut-color',
    'var(--moduix-color-muted-foreground)',
    'Controls shortcut color.',
  ],
  [
    '--moduix-menu-item-shortcut-font-size',
    'var(--moduix-text-xs)',
    'Controls shortcut font size.',
  ],
  [
    '--moduix-menu-item-shortcut-line-height',
    'var(--moduix-line-height-text-xs)',
    'Controls shortcut line height.',
  ],
  [
    '--moduix-menu-item-shortcut-padding-x-start',
    'var(--moduix-spacing-4)',
    'Controls shortcut start padding.',
  ],
  [
    '--moduix-menu-item-text-content-gap',
    'var(--moduix-spacing-2)',
    'Controls item text content gap.',
  ],
  ['--moduix-menu-item-text-icon-color', 'currentColor', 'Controls item text icon color.'],
  ['--moduix-menu-item-text-icon-size', 'var(--moduix-spacing-4)', 'Controls item text icon size.'],
  ['--moduix-menu-popup-bg', 'var(--moduix-color-popover)', 'Controls popup background.'],
  [
    '--moduix-menu-popup-border-color',
    'var(--moduix-color-border)',
    'Controls popup border color.',
  ],
  [
    '--moduix-menu-popup-border-width',
    'var(--moduix-border-width-sm)',
    'Controls popup border width.',
  ],
  [
    '--moduix-menu-popup-color',
    'var(--moduix-color-popover-foreground)',
    'Controls popup text color.',
  ],
  [
    '--moduix-menu-popup-ending-opacity',
    '0',
    'Controls popup opacity at the end of exit transitions.',
  ],
  [
    '--moduix-menu-popup-ending-scale',
    'var(--moduix-scale-popup)',
    'Controls popup scale at exit.',
  ],
  ['--moduix-menu-popup-ending-translate-x', '0', 'Controls popup horizontal exit offset.'],
  ['--moduix-menu-popup-ending-translate-y', '0', 'Controls popup vertical exit offset.'],
  ['--moduix-menu-popup-max-height', '24rem', 'Controls popup maximum height.'],
  ['--moduix-menu-popup-max-width', '20rem', 'Controls popup maximum width.'],
  ['--moduix-menu-popup-min-width', '12rem', 'Controls popup minimum width.'],
  [
    '--moduix-menu-popup-padding-y',
    'var(--moduix-popup-list-padding-y, var(--moduix-spacing-1))',
    'Controls popup vertical padding.',
  ],
  ['--moduix-menu-popup-radius', 'var(--moduix-radius-md)', 'Controls popup radius.'],
  ['--moduix-menu-popup-shadow', 'var(--moduix-shadow-lg)', 'Controls popup shadow.'],
  ['--moduix-menu-popup-starting-opacity', '0', 'Controls popup opacity at enter start.'],
  [
    '--moduix-menu-popup-starting-scale',
    'var(--moduix-scale-popup)',
    'Controls popup scale at enter start.',
  ],
  ['--moduix-menu-popup-starting-translate-x', '0', 'Controls popup horizontal enter offset.'],
  ['--moduix-menu-popup-starting-translate-y', '0', 'Controls popup vertical enter offset.'],
  ['--moduix-menu-separator-color', 'var(--moduix-color-border)', 'Controls separator color.'],
  [
    '--moduix-menu-separator-height',
    'var(--moduix-border-width-sm)',
    'Controls separator thickness.',
  ],
  [
    '--moduix-menu-separator-margin-x-end',
    'var(--moduix-popup-separator-margin-x-end, var(--moduix-spacing-3))',
    'Controls separator end margin.',
  ],
  [
    '--moduix-menu-separator-margin-x-start',
    'var(--moduix-popup-separator-margin-x-start, var(--moduix-spacing-3))',
    'Controls separator start margin.',
  ],
  [
    '--moduix-menu-separator-margin-y',
    'var(--moduix-popup-separator-margin-y, var(--moduix-spacing-1-5))',
    'Controls separator vertical margin.',
  ],
  [
    '--moduix-menu-submenu-open-bg',
    'var(--moduix-color-accent)',
    'Controls open nested trigger background.',
  ],
  [
    '--moduix-menu-transition',
    'var(--moduix-transition-default)',
    'Controls menu transition duration/timing.',
  ],
  ['--moduix-menu-trigger-bg', 'var(--moduix-color-background)', 'Controls trigger background.'],
  [
    '--moduix-menu-trigger-bg-active',
    'var(--moduix-menu-trigger-bg-hover)',
    'Controls active trigger background.',
  ],
  [
    '--moduix-menu-trigger-bg-hover',
    'no default (set explicitly when needed)',
    'Controls hover trigger background.',
  ],
  [
    '--moduix-menu-trigger-border-color',
    'var(--moduix-color-border)',
    'Controls trigger border color.',
  ],
  [
    '--moduix-menu-trigger-border-width',
    'var(--moduix-border-width-sm)',
    'Controls trigger border width.',
  ],
  ['--moduix-menu-trigger-color', 'var(--moduix-color-foreground)', 'Controls trigger color.'],
  ['--moduix-menu-trigger-font-size', 'var(--moduix-text-sm)', 'Controls trigger font size.'],
  [
    '--moduix-menu-trigger-font-weight',
    'var(--moduix-weight-medium)',
    'Controls trigger font weight.',
  ],
  ['--moduix-menu-trigger-gap', 'var(--moduix-spacing-2)', 'Controls trigger content gap.'],
  ['--moduix-menu-trigger-height', 'var(--moduix-size-md)', 'Controls trigger minimum height.'],
  ['--moduix-menu-trigger-icon-color', 'currentColor', 'Controls trigger icon color.'],
  ['--moduix-menu-trigger-icon-size', 'var(--moduix-spacing-4)', 'Controls trigger icon size.'],
  [
    '--moduix-menu-trigger-item-gap',
    'var(--moduix-spacing-3)',
    'Controls nested trigger item gap.',
  ],
  [
    '--moduix-menu-trigger-item-icon-size',
    'var(--moduix-spacing-3-5)',
    'Controls nested trigger icon size.',
  ],
  [
    '--moduix-menu-trigger-item-padding-x-end',
    'var(--moduix-spacing-3)',
    'Controls nested trigger end padding.',
  ],
  [
    '--moduix-menu-trigger-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls trigger line height.',
  ],
  [
    '--moduix-menu-trigger-padding-x',
    'var(--moduix-spacing-4)',
    'Controls trigger horizontal padding.',
  ],
  [
    '--moduix-menu-trigger-padding-y',
    'var(--moduix-spacing-1)',
    'Controls trigger vertical padding.',
  ],
  ['--moduix-menu-trigger-radius', 'var(--moduix-radius-md)', 'Controls trigger radius.'],
];

export function MenuCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable properties={menuOverrideCssProperties.map(normalizeCssProperty)} />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}