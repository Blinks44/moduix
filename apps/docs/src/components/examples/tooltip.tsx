import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const tooltipCssProperties: CssPropertyInput[] = [
  [
    '--tooltip-arrow-background',
    'var(--tooltip-bg, var(--color-popover))',
    'Controls the Ark arrow background.',
  ],
  ['--tooltip-arrow-size', 'var(--spacing-2-5)', 'Controls the Ark arrow square size.'],
  [
    '--tooltip-arrow-stroke-color',
    'var(--tooltip-border-color, var(--color-border))',
    'Controls arrow border color.',
  ],
  ['--tooltip-bg', 'var(--color-popover)', 'Controls the content background color.'],
  ['--tooltip-border-color', 'var(--color-border)', 'Controls the content border color.'],
  ['--tooltip-border-width', 'var(--border-width-sm)', 'Controls content border width.'],
  ['--tooltip-color', 'var(--color-popover-foreground)', 'Controls the content text color.'],
  ['--tooltip-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled trigger opacity.'],
  ['--tooltip-focus-ring-color', 'var(--color-ring)', 'Controls trigger focus ring color.'],
  [
    '--tooltip-focus-ring-offset',
    'var(--focus-ring-inset-offset)',
    'Controls trigger focus ring offset.',
  ],
  [
    '--tooltip-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls trigger focus ring width.',
  ],
  ['--tooltip-font-size', 'var(--text-sm)', 'Controls the content font size.'],
  ['--tooltip-line-height', 'var(--line-height-text-sm)', 'Controls the content line height.'],
  ['--tooltip-max-height', '24rem', 'Controls the content max height.'],
  ['--tooltip-max-width', '20rem', 'Controls the content max width.'],
  ['--tooltip-padding-x', 'var(--spacing-2)', 'Controls the content horizontal padding.'],
  ['--tooltip-padding-y', 'var(--spacing-1)', 'Controls the content vertical padding.'],
  ['--tooltip-popup-ending-opacity', '0', 'Controls content opacity at the end of exit animation.'],
  [
    '--tooltip-popup-ending-scale',
    'var(--scale-popup)',
    'Controls content scale at the end of exit animation.',
  ],
  [
    '--tooltip-popup-ending-translate-x',
    '0',
    'Controls content X offset at the end of exit animation.',
  ],
  [
    '--tooltip-popup-ending-translate-y',
    '0',
    'Controls content Y offset at the end of exit animation.',
  ],
  [
    '--tooltip-popup-starting-opacity',
    '0',
    'Controls content opacity at the start of enter animation.',
  ],
  [
    '--tooltip-popup-starting-scale',
    'var(--scale-popup)',
    'Controls content scale at the start of enter animation.',
  ],
  [
    '--tooltip-popup-starting-translate-x',
    '0',
    'Controls content X offset at the start of enter animation.',
  ],
  [
    '--tooltip-popup-starting-translate-y',
    '0',
    'Controls content Y offset at the start of enter animation.',
  ],
  ['--tooltip-radius', 'var(--radius-md)', 'Controls the content border radius.'],
  ['--tooltip-shadow', 'var(--shadow-lg)', 'Controls the content shadow.'],
  ['--tooltip-transition', '150ms', 'Controls content animation and trigger transitions.'],
  ['--tooltip-trigger-bg', 'var(--color-background)', 'Controls trigger background color.'],
  [
    '--tooltip-trigger-bg-active',
    'var(--tooltip-trigger-bg-hover, var(--color-accent))',
    'Controls trigger background while the tooltip is open.',
  ],
  ['--tooltip-trigger-bg-hover', 'var(--color-accent)', 'Controls trigger hover background.'],
  ['--tooltip-trigger-border-color', 'var(--color-border)', 'Controls trigger border color.'],
  ['--tooltip-trigger-border-width', 'var(--border-width-sm)', 'Controls trigger border width.'],
  ['--tooltip-trigger-color', 'var(--color-foreground)', 'Controls trigger text color.'],
  ['--tooltip-trigger-font-size', 'var(--text-sm)', 'Controls trigger font size.'],
  ['--tooltip-trigger-height', 'var(--size-md)', 'Controls trigger height.'],
  ['--tooltip-trigger-line-height', 'var(--line-height-text-sm)', 'Controls trigger line height.'],
  ['--tooltip-trigger-padding-x', 'var(--spacing-3-5)', 'Controls trigger horizontal padding.'],
  ['--tooltip-trigger-padding-y', 'var(--spacing-1)', 'Controls trigger vertical padding.'],
  ['--tooltip-trigger-radius', 'var(--radius-md)', 'Controls trigger border radius.'],
  ['--tooltip-z-index', 'var(--z-popup)', 'Controls the content z-index.'],
];

export function TooltipCssPropertiesPanel() {
  return (
    <CSSPropertiesReferenceTable properties={tooltipCssProperties.map(normalizeCssProperty)} />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}