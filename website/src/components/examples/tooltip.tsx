import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

const tooltipCssProperties: CssPropertyInput[] = [
  [
    '--moduix-tooltip-arrow-background',
    'var(--moduix-tooltip-bg, var(--moduix-color-popover))',
    'Controls the Ark arrow background.',
  ],
  [
    '--moduix-tooltip-arrow-size',
    'var(--moduix-spacing-2-5)',
    'Controls the Ark arrow square size.',
  ],
  [
    '--moduix-tooltip-arrow-stroke-color',
    'var(--moduix-tooltip-border-color, var(--moduix-color-border))',
    'Controls arrow border color.',
  ],
  ['--moduix-tooltip-bg', 'var(--moduix-color-popover)', 'Controls the content background color.'],
  [
    '--moduix-tooltip-border-color',
    'var(--moduix-color-border)',
    'Controls the content border color.',
  ],
  [
    '--moduix-tooltip-border-width',
    'var(--moduix-border-width-sm)',
    'Controls content border width.',
  ],
  [
    '--moduix-tooltip-color',
    'var(--moduix-color-popover-foreground)',
    'Controls the content text color.',
  ],
  [
    '--moduix-tooltip-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled trigger opacity.',
  ],
  [
    '--moduix-tooltip-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls trigger focus ring color.',
  ],
  [
    '--moduix-tooltip-focus-ring-offset',
    'var(--moduix-focus-ring-inset-offset)',
    'Controls trigger focus ring offset.',
  ],
  [
    '--moduix-tooltip-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls trigger focus ring width.',
  ],
  ['--moduix-tooltip-font-size', 'var(--moduix-text-sm)', 'Controls the content font size.'],
  [
    '--moduix-tooltip-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls the content line height.',
  ],
  ['--moduix-tooltip-max-height', '24rem', 'Controls the content max height.'],
  ['--moduix-tooltip-max-width', '20rem', 'Controls the content max width.'],
  [
    '--moduix-tooltip-padding-x',
    'var(--moduix-spacing-2)',
    'Controls the content horizontal padding.',
  ],
  [
    '--moduix-tooltip-padding-y',
    'var(--moduix-spacing-1)',
    'Controls the content vertical padding.',
  ],
  [
    '--moduix-tooltip-popup-ending-opacity',
    '0',
    'Controls content opacity at the end of exit animation.',
  ],
  [
    '--moduix-tooltip-popup-ending-scale',
    'var(--moduix-scale-popup)',
    'Controls content scale at the end of exit animation.',
  ],
  [
    '--moduix-tooltip-popup-ending-translate-x',
    '0',
    'Controls content X offset at the end of exit animation.',
  ],
  [
    '--moduix-tooltip-popup-ending-translate-y',
    '0',
    'Controls content Y offset at the end of exit animation.',
  ],
  [
    '--moduix-tooltip-popup-starting-opacity',
    '0',
    'Controls content opacity at the start of enter animation.',
  ],
  [
    '--moduix-tooltip-popup-starting-scale',
    'var(--moduix-scale-popup)',
    'Controls content scale at the start of enter animation.',
  ],
  [
    '--moduix-tooltip-popup-starting-translate-x',
    '0',
    'Controls content X offset at the start of enter animation.',
  ],
  [
    '--moduix-tooltip-popup-starting-translate-y',
    '0',
    'Controls content Y offset at the start of enter animation.',
  ],
  ['--moduix-tooltip-radius', 'var(--moduix-radius-md)', 'Controls the content border radius.'],
  ['--moduix-tooltip-shadow', 'var(--moduix-shadow-lg)', 'Controls the content shadow.'],
  ['--moduix-tooltip-transition', '150ms', 'Controls content animation and trigger transitions.'],
  [
    '--moduix-tooltip-trigger-bg',
    'var(--moduix-color-background)',
    'Controls trigger background color.',
  ],
  [
    '--moduix-tooltip-trigger-bg-active',
    'var(--moduix-tooltip-trigger-bg-hover, var(--moduix-color-accent))',
    'Controls trigger background while the tooltip is open.',
  ],
  [
    '--moduix-tooltip-trigger-bg-hover',
    'var(--moduix-color-accent)',
    'Controls trigger hover background.',
  ],
  [
    '--moduix-tooltip-trigger-border-color',
    'var(--moduix-color-border)',
    'Controls trigger border color.',
  ],
  [
    '--moduix-tooltip-trigger-border-width',
    'var(--moduix-border-width-sm)',
    'Controls trigger border width.',
  ],
  [
    '--moduix-tooltip-trigger-color',
    'var(--moduix-color-foreground)',
    'Controls trigger text color.',
  ],
  ['--moduix-tooltip-trigger-font-size', 'var(--moduix-text-sm)', 'Controls trigger font size.'],
  ['--moduix-tooltip-trigger-height', 'var(--moduix-size-md)', 'Controls trigger height.'],
  [
    '--moduix-tooltip-trigger-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls trigger line height.',
  ],
  [
    '--moduix-tooltip-trigger-padding-x',
    'var(--moduix-spacing-3-5)',
    'Controls trigger horizontal padding.',
  ],
  [
    '--moduix-tooltip-trigger-padding-y',
    'var(--moduix-spacing-1)',
    'Controls trigger vertical padding.',
  ],
  ['--moduix-tooltip-trigger-radius', 'var(--moduix-radius-md)', 'Controls trigger border radius.'],
  ['--moduix-tooltip-z-index', 'var(--moduix-z-popup)', 'Controls the content z-index.'],
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