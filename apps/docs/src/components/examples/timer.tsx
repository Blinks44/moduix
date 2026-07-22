import type { CssPropertyInput } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const timerExampleCss = `
  .timer-note {
    margin: 0;
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
    color: var(--color-muted-foreground);
  }

  .timer-item-group {
    display: inline-grid;
    justify-items: center;
    gap: var(--spacing-1);
  }

  .timer-item-label {
    font-size: var(--text-xs);
    font-weight: var(--weight-regular);
    line-height: var(--line-height-text-xs);
    color: var(--color-muted-foreground);
  }
`;

const timerCssProperties: CssPropertyInput[] = [
  ['--timer-color', 'var(--color-foreground)', 'Controls the timer text color.'],
  ['--timer-gap', 'var(--spacing-3)', 'Controls the gap between timer sections.'],
  ['--timer-width', 'max-content', 'Controls the timer root width.'],
  ['--timer-area-gap', 'var(--spacing-1)', 'Controls the gap between time items.'],
  ['--timer-area-font-size', 'var(--text-2xl)', 'Controls the time display font size.'],
  ['--timer-area-font-weight', 'var(--weight-semibold)', 'Controls the time display font weight.'],
  [
    '--timer-area-line-height',
    'var(--line-height-text-sm)',
    'Controls the time display line height.',
  ],
  ['--timer-item-color', 'currentColor', 'Controls time item color.'],
  ['--timer-item-min-width', '2ch', 'Controls the minimum width of each time item.'],
  ['--timer-item-text-align', 'center', 'Controls time item text alignment.'],
  ['--timer-separator-color', 'var(--color-muted-foreground)', 'Controls separator color.'],
  ['--timer-control-gap', 'var(--spacing-2)', 'Controls the gap between action triggers.'],
  ['--timer-action-trigger-bg', 'var(--color-background)', 'Controls action trigger background.'],
  [
    '--timer-action-trigger-bg-hover',
    'var(--color-accent)',
    'Controls action trigger hover background.',
  ],
  [
    '--timer-action-trigger-border-color',
    'var(--color-border)',
    'Controls action trigger border color.',
  ],
  [
    '--timer-action-trigger-border-width',
    'var(--border-width-sm)',
    'Controls action trigger border width.',
  ],
  [
    '--timer-action-trigger-color',
    'var(--color-foreground)',
    'Controls action trigger text color.',
  ],
  [
    '--timer-action-trigger-disabled-opacity',
    'var(--opacity-disabled)',
    'Controls disabled action trigger opacity.',
  ],
  [
    '--timer-action-trigger-focus-ring-color',
    'var(--color-ring)',
    'Controls action trigger focus ring color.',
  ],
  [
    '--timer-action-trigger-focus-ring-offset',
    'var(--focus-ring-inset-offset)',
    'Controls action trigger focus ring offset.',
  ],
  [
    '--timer-action-trigger-focus-ring-width',
    'var(--focus-ring-width, var(--border-width-md))',
    'Controls action trigger focus ring width.',
  ],
  ['--timer-action-trigger-font-size', 'var(--text-sm)', 'Controls action trigger font size.'],
  [
    '--timer-action-trigger-font-weight',
    'var(--weight-medium)',
    'Controls action trigger font weight.',
  ],
  ['--timer-action-trigger-gap', 'var(--spacing-2)', 'Controls action trigger content gap.'],
  ['--timer-action-trigger-height', 'var(--size-md)', 'Controls action trigger minimum height.'],
  [
    '--timer-action-trigger-icon-size',
    'var(--spacing-4)',
    'Controls icons inside action triggers.',
  ],
  [
    '--timer-action-trigger-line-height',
    'var(--line-height-text-sm)',
    'Controls action trigger line height.',
  ],
  ['--timer-action-trigger-padding-x', 'var(--spacing-3)', 'Controls horizontal trigger padding.'],
  ['--timer-action-trigger-padding-y', 'var(--spacing-1-5)', 'Controls vertical trigger padding.'],
  ['--timer-action-trigger-radius', 'var(--radius-md)', 'Controls action trigger radius.'],
  [
    '--timer-action-trigger-transition',
    'var(--transition-default)',
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