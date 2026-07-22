import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const menuExampleCss = `
  .menu-content {
    --menu-popup-min-width: 13rem;
  }

  .menu-context-trigger {
    --menu-trigger-bg-hover: var(--color-muted);
    --menu-trigger-bg-active: var(--color-muted);

    width: 16rem;
  }

  .menu-dialog-stack {
    margin-block-start: var(--spacing-4);
  }
`;

const menuOverrideCssProperties: CssPropertyInput[] = [
  ['--menu-arrow-size', 'var(--spacing-2-5)', 'Controls Ark arrow size.'],
  [
    '--menu-arrow-stroke-color',
    'var(--menu-popup-border-color)',
    'Controls arrow tip stroke color.',
  ],
  [
    '--menu-check-gap',
    'var(--popup-check-gap, var(--spacing-2))',
    'Controls checkbox/radio indicator gap.',
  ],
  [
    '--menu-check-indicator-size',
    'var(--popup-check-indicator-size, var(--spacing-3))',
    'Controls checkbox/radio indicator size.',
  ],
  [
    '--menu-check-padding-x-start',
    'var(--popup-check-padding-x-start, var(--spacing-2-5))',
    'Controls checkbox/radio start padding.',
  ],
  ['--menu-checkbox-indicator-bg', 'transparent', 'Controls checkbox indicator background.'],
  [
    '--menu-checkbox-indicator-bg-checked',
    'var(--menu-checkbox-indicator-bg)',
    'Controls checked checkbox indicator background.',
  ],
  [
    '--menu-checkbox-indicator-border-color',
    'currentColor',
    'Controls checkbox indicator border color.',
  ],
  [
    '--menu-checkbox-indicator-border-color-checked',
    'var(--menu-checkbox-indicator-border-color)',
    'Controls checked checkbox indicator border color.',
  ],
  ['--menu-checkbox-indicator-border-width', '0', 'Controls checkbox indicator border width.'],
  ['--menu-checkbox-indicator-radius', 'var(--radius-xs)', 'Controls checkbox indicator radius.'],
  ['--menu-context-trigger-border-style', 'dashed', 'Controls context trigger border style.'],
  ['--menu-context-trigger-height', '10rem', 'Controls context trigger height.'],
  ['--menu-context-trigger-width', '15rem', 'Controls context trigger width.'],
  ['--menu-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled trigger opacity.'],
  ['--menu-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--menu-focus-ring-width',
    'var(--menu-trigger-border-width, var(--border-width-sm))',
    'Controls focus ring width.',
  ],
  [
    '--menu-group-label-color',
    'var(--popup-group-label-color, var(--color-muted-foreground))',
    'Controls group label color.',
  ],
  [
    '--menu-group-label-font-size',
    'var(--popup-group-label-font-size, var(--text-xs))',
    'Controls group label font size.',
  ],
  [
    '--menu-group-label-font-weight',
    'var(--popup-group-label-font-weight, var(--weight-regular))',
    'Controls group label weight.',
  ],
  [
    '--menu-group-label-line-height',
    'var(--popup-group-label-line-height, var(--line-height-text-xs))',
    'Controls group label line height.',
  ],
  [
    '--menu-group-label-padding-x-end',
    'var(--popup-group-label-padding-x-end, var(--spacing-3))',
    'Controls group label end padding.',
  ],
  [
    '--menu-group-label-padding-x-start',
    'var(--popup-group-label-padding-x-start, var(--spacing-2-5))',
    'Controls group label start padding.',
  ],
  [
    '--menu-group-label-padding-y',
    'var(--popup-group-label-padding-y, var(--spacing-1))',
    'Controls group label vertical padding.',
  ],
  ['--menu-group-padding-y', '0', 'Controls group vertical padding.'],
  ['--menu-highlight-bg', 'var(--color-accent)', 'Controls highlighted item background.'],
  ['--menu-highlight-color', 'var(--color-accent-foreground)', 'Controls highlighted item color.'],
  [
    '--menu-highlight-inset-x',
    'var(--popup-highlight-inset-x, var(--spacing-1))',
    'Controls highlight inline inset.',
  ],
  [
    '--menu-highlight-radius',
    'var(--popup-highlight-radius, var(--radius-sm))',
    'Controls highlight radius.',
  ],
  ['--menu-item-bg', 'transparent', 'Controls item background.'],
  ['--menu-item-bg-disabled', 'var(--menu-item-bg)', 'Controls disabled item background.'],
  [
    '--menu-item-destructive-color',
    'var(--color-destructive)',
    'Controls destructive item text color.',
  ],
  [
    '--menu-item-destructive-highlight-bg',
    'color-mix(in oklab, var(--color-destructive) 12%, transparent)',
    'Controls destructive item highlight background.',
  ],
  [
    '--menu-item-destructive-highlight-color',
    'var(--menu-item-destructive-color, var(--color-destructive))',
    'Controls destructive item highlight text color.',
  ],
  ['--menu-item-disabled-color', 'var(--color-muted-foreground)', 'Controls disabled item color.'],
  [
    '--menu-item-font-size',
    'var(--popup-item-font-size, var(--text-sm))',
    'Controls item font size.',
  ],
  ['--menu-item-gap', 'var(--spacing-2)', 'Controls item content gap.'],
  [
    '--menu-item-height',
    'var(--popup-item-min-height, var(--size-sm))',
    'Controls item minimum height.',
  ],
  ['--menu-item-indicator-color-checked', 'currentColor', 'Controls checked item indicator color.'],
  [
    '--menu-item-line-height',
    'var(--popup-item-line-height, var(--line-height-text-sm))',
    'Controls item line height.',
  ],
  [
    '--menu-item-padding-x-end',
    'var(--popup-item-padding-x-end, var(--spacing-3))',
    'Controls item end padding.',
  ],
  [
    '--menu-item-padding-x-start',
    'var(--popup-item-padding-x-start, var(--spacing-3))',
    'Controls item start padding.',
  ],
  [
    '--menu-item-padding-y',
    'var(--popup-item-padding-y, var(--spacing-1))',
    'Controls item vertical padding.',
  ],
  ['--menu-item-radius', 'var(--radius-sm)', 'Controls item border radius.'],
  ['--menu-item-shortcut-color', 'var(--color-muted-foreground)', 'Controls shortcut color.'],
  ['--menu-item-shortcut-font-size', 'var(--text-xs)', 'Controls shortcut font size.'],
  [
    '--menu-item-shortcut-line-height',
    'var(--line-height-text-xs)',
    'Controls shortcut line height.',
  ],
  ['--menu-item-shortcut-padding-x-start', 'var(--spacing-4)', 'Controls shortcut start padding.'],
  ['--menu-item-text-content-gap', 'var(--spacing-2)', 'Controls item text content gap.'],
  ['--menu-item-text-icon-color', 'currentColor', 'Controls item text icon color.'],
  ['--menu-item-text-icon-size', 'var(--spacing-4)', 'Controls item text icon size.'],
  ['--menu-popup-bg', 'var(--color-popover)', 'Controls popup background.'],
  ['--menu-popup-border-color', 'var(--color-border)', 'Controls popup border color.'],
  ['--menu-popup-border-width', 'var(--border-width-sm)', 'Controls popup border width.'],
  ['--menu-popup-color', 'var(--color-popover-foreground)', 'Controls popup text color.'],
  ['--menu-popup-ending-opacity', '0', 'Controls popup opacity at the end of exit transitions.'],
  ['--menu-popup-ending-scale', 'var(--scale-popup)', 'Controls popup scale at exit.'],
  ['--menu-popup-ending-translate-x', '0', 'Controls popup horizontal exit offset.'],
  ['--menu-popup-ending-translate-y', '0', 'Controls popup vertical exit offset.'],
  ['--menu-popup-max-height', '24rem', 'Controls popup maximum height.'],
  ['--menu-popup-max-width', '20rem', 'Controls popup maximum width.'],
  ['--menu-popup-min-width', '12rem', 'Controls popup minimum width.'],
  [
    '--menu-popup-padding-y',
    'var(--popup-list-padding-y, var(--spacing-1))',
    'Controls popup vertical padding.',
  ],
  ['--menu-popup-radius', 'var(--radius-md)', 'Controls popup radius.'],
  ['--menu-popup-shadow', 'var(--shadow-lg)', 'Controls popup shadow.'],
  ['--menu-popup-starting-opacity', '0', 'Controls popup opacity at enter start.'],
  ['--menu-popup-starting-scale', 'var(--scale-popup)', 'Controls popup scale at enter start.'],
  ['--menu-popup-starting-translate-x', '0', 'Controls popup horizontal enter offset.'],
  ['--menu-popup-starting-translate-y', '0', 'Controls popup vertical enter offset.'],
  ['--menu-separator-color', 'var(--color-border)', 'Controls separator color.'],
  ['--menu-separator-height', 'var(--border-width-sm)', 'Controls separator thickness.'],
  [
    '--menu-separator-margin-x-end',
    'var(--popup-separator-margin-x-end, var(--spacing-3))',
    'Controls separator end margin.',
  ],
  [
    '--menu-separator-margin-x-start',
    'var(--popup-separator-margin-x-start, var(--spacing-3))',
    'Controls separator start margin.',
  ],
  [
    '--menu-separator-margin-y',
    'var(--popup-separator-margin-y, var(--spacing-1-5))',
    'Controls separator vertical margin.',
  ],
  ['--menu-submenu-open-bg', 'var(--color-accent)', 'Controls open nested trigger background.'],
  ['--menu-transition', 'var(--transition-default)', 'Controls menu transition duration/timing.'],
  ['--menu-trigger-bg', 'var(--color-background)', 'Controls trigger background.'],
  [
    '--menu-trigger-bg-active',
    'var(--menu-trigger-bg-hover)',
    'Controls active trigger background.',
  ],
  [
    '--menu-trigger-bg-hover',
    'no default (set explicitly when needed)',
    'Controls hover trigger background.',
  ],
  ['--menu-trigger-border-color', 'var(--color-border)', 'Controls trigger border color.'],
  ['--menu-trigger-border-width', 'var(--border-width-sm)', 'Controls trigger border width.'],
  ['--menu-trigger-color', 'var(--color-foreground)', 'Controls trigger color.'],
  ['--menu-trigger-font-size', 'var(--text-sm)', 'Controls trigger font size.'],
  ['--menu-trigger-font-weight', 'var(--weight-medium)', 'Controls trigger font weight.'],
  ['--menu-trigger-gap', 'var(--spacing-2)', 'Controls trigger content gap.'],
  ['--menu-trigger-height', 'var(--size-md)', 'Controls trigger minimum height.'],
  ['--menu-trigger-icon-color', 'currentColor', 'Controls trigger icon color.'],
  ['--menu-trigger-icon-size', 'var(--spacing-4)', 'Controls trigger icon size.'],
  ['--menu-trigger-item-gap', 'var(--spacing-3)', 'Controls nested trigger item gap.'],
  ['--menu-trigger-item-icon-size', 'var(--spacing-3-5)', 'Controls nested trigger icon size.'],
  ['--menu-trigger-item-padding-x-end', 'var(--spacing-3)', 'Controls nested trigger end padding.'],
  ['--menu-trigger-line-height', 'var(--line-height-text-sm)', 'Controls trigger line height.'],
  ['--menu-trigger-padding-x', 'var(--spacing-4)', 'Controls trigger horizontal padding.'],
  ['--menu-trigger-padding-y', 'var(--spacing-1)', 'Controls trigger vertical padding.'],
  ['--menu-trigger-radius', 'var(--radius-md)', 'Controls trigger radius.'],
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