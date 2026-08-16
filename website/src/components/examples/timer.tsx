import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const timerExampleCss = `
  .timer-note {
    margin: 0;
    font-size: var(--moduix-text-sm);
    line-height: var(--moduix-line-height-text-sm);
    color: var(--moduix-color-muted-foreground);
  }

  .timer-item-group {
    display: inline-grid;
    justify-items: center;
    gap: var(--moduix-spacing-1);
  }

  .timer-item-label {
    font-size: var(--moduix-text-xs);
    font-weight: var(--moduix-weight-regular);
    line-height: var(--moduix-line-height-text-xs);
    color: var(--moduix-color-muted-foreground);
  }
`;

const timerCssProperties: CssPropertyInput[] = [
  ['--moduix-timer-color', 'var(--moduix-color-foreground)', 'Controls the timer text color.'],
  ['--moduix-timer-gap', 'var(--moduix-spacing-3)', 'Controls the gap between timer sections.'],
  ['--moduix-timer-width', 'max-content', 'Controls the timer root width.'],
  ['--moduix-timer-area-gap', 'var(--moduix-spacing-1)', 'Controls the gap between time items.'],
  [
    '--moduix-timer-area-font-size',
    'var(--moduix-text-2xl)',
    'Controls the time display font size.',
  ],
  [
    '--moduix-timer-area-font-weight',
    'var(--moduix-weight-semibold)',
    'Controls the time display font weight.',
  ],
  [
    '--moduix-timer-area-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls the time display line height.',
  ],
  ['--moduix-timer-item-color', 'currentColor', 'Controls time item color.'],
  ['--moduix-timer-item-min-width', '2ch', 'Controls the minimum width of each time item.'],
  ['--moduix-timer-item-text-align', 'center', 'Controls time item text alignment.'],
  [
    '--moduix-timer-separator-color',
    'var(--moduix-color-muted-foreground)',
    'Controls separator color.',
  ],
  [
    '--moduix-timer-control-gap',
    'var(--moduix-spacing-2)',
    'Controls the gap between action triggers.',
  ],
  [
    '--moduix-timer-action-trigger-bg',
    'var(--moduix-color-background)',
    'Controls action trigger background.',
  ],
  [
    '--moduix-timer-action-trigger-bg-hover',
    'var(--moduix-color-accent)',
    'Controls action trigger hover background.',
  ],
  [
    '--moduix-timer-action-trigger-border-color',
    'var(--moduix-color-border)',
    'Controls action trigger border color.',
  ],
  [
    '--moduix-timer-action-trigger-border-width',
    'var(--moduix-border-width-sm)',
    'Controls action trigger border width.',
  ],
  [
    '--moduix-timer-action-trigger-color',
    'var(--moduix-color-foreground)',
    'Controls action trigger text color.',
  ],
  [
    '--moduix-timer-action-trigger-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled action trigger opacity.',
  ],
  [
    '--moduix-timer-action-trigger-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls action trigger focus ring color.',
  ],
  [
    '--moduix-timer-action-trigger-focus-ring-offset',
    'var(--moduix-focus-ring-inset-offset)',
    'Controls action trigger focus ring offset.',
  ],
  [
    '--moduix-timer-action-trigger-focus-ring-width',
    'var(--moduix-focus-ring-width, var(--moduix-border-width-md))',
    'Controls action trigger focus ring width.',
  ],
  [
    '--moduix-timer-action-trigger-font-size',
    'var(--moduix-text-sm)',
    'Controls action trigger font size.',
  ],
  [
    '--moduix-timer-action-trigger-font-weight',
    'var(--moduix-weight-medium)',
    'Controls action trigger font weight.',
  ],
  [
    '--moduix-timer-action-trigger-gap',
    'var(--moduix-spacing-2)',
    'Controls action trigger content gap.',
  ],
  [
    '--moduix-timer-action-trigger-height',
    'var(--moduix-size-md)',
    'Controls action trigger minimum height.',
  ],
  [
    '--moduix-timer-action-trigger-icon-size',
    'var(--moduix-spacing-4)',
    'Controls icons inside action triggers.',
  ],
  [
    '--moduix-timer-action-trigger-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls action trigger line height.',
  ],
  [
    '--moduix-timer-action-trigger-padding-x',
    'var(--moduix-spacing-3)',
    'Controls horizontal trigger padding.',
  ],
  [
    '--moduix-timer-action-trigger-padding-y',
    'var(--moduix-spacing-1-5)',
    'Controls vertical trigger padding.',
  ],
  [
    '--moduix-timer-action-trigger-radius',
    'var(--moduix-radius-md)',
    'Controls action trigger radius.',
  ],
  [
    '--moduix-timer-action-trigger-transition',
    'var(--moduix-transition-default)',
    'Controls action trigger transitions.',
  ],
];

const timerCssPropertiesReference = timerCssProperties.map(normalizeCssProperty);

export function TimerCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={timerCssPropertiesReference} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}