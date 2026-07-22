import type { CssPropertyInput } from '../mdx/reference';

export const accordionExampleCss = `
  [data-slot='accordion-root'],
  [data-slot='accordion-root-provider'] {
    width: 100%;
    max-width: 22rem;
  }

  .accordion-provider-stack {
    display: grid;
    gap: var(--spacing-3);
    width: fit-content;
    max-width: 100%;
  }

  .accordion-provider-stack .accordion-state {
    margin-top: 0;
  }

  .accordion-state {
    margin-top: var(--spacing-3);
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }

`;

export const accordionOverrideCssProperties: CssPropertyInput[] = [
  ['--accordion-color', 'var(--color-foreground)', 'Controls accordion text color.'],
  ['--accordion-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled item opacity.'],
  ['--accordion-focus-ring-color', 'var(--color-ring)', 'Controls trigger focus ring color.'],
  [
    '--accordion-focus-ring-offset',
    'var(--border-width-sm)',
    'Controls trigger focus ring offset from trigger edge.',
  ],
  [
    '--accordion-focus-ring-width',
    'var(--focus-ring-width, var(--border-width-md))',
    'Controls trigger focus ring outline width.',
  ],
  [
    '--accordion-horizontal-content-width',
    '16rem',
    'Controls the inner content width for horizontal accordions.',
  ],
  ['--accordion-horizontal-height', '20rem', 'Controls horizontal accordion height.'],
  ['--accordion-horizontal-max-height', '100%', 'Controls horizontal accordion maximum height.'],
  [
    '--accordion-horizontal-trigger-width',
    '2.5rem',
    'Controls trigger width in horizontal orientation.',
  ],
  ['--accordion-horizontal-width', 'auto', 'Controls horizontal accordion width.'],
  [
    '--accordion-icon-open-transform',
    'rotate(45deg) scale(1.1)',
    'Controls indicator transform when the item is open.',
  ],
  ['--accordion-icon-size', 'var(--spacing-3)', 'Controls indicator icon size.'],
  ['--accordion-icon-transition', 'var(--transition-default)', 'Controls indicator transition.'],
  [
    '--accordion-item-border-color',
    'var(--color-border)',
    'Controls the separator color between accordion items.',
  ],
  [
    '--accordion-item-border-width',
    'var(--border-width-sm)',
    'Controls the separator width between accordion items.',
  ],
  [
    '--accordion-item-body-gap',
    'var(--spacing-3)',
    'Controls spacing between elements in item body.',
  ],
  ['--accordion-item-body-padding', 'var(--spacing-3)', 'Controls item body padding.'],
  [
    '--accordion-item-content-closed-opacity',
    '0.01',
    'Controls content opacity at the closed end of the animation.',
  ],
  [
    '--accordion-item-content-color',
    'var(--color-muted-foreground)',
    'Controls item content text color.',
  ],
  ['--accordion-item-content-font-size', 'var(--text-md)', 'Controls item content font size.'],
  [
    '--accordion-item-content-line-height',
    'var(--line-height-text-md)',
    'Controls item content line height.',
  ],
  [
    '--accordion-item-content-open-opacity',
    '1',
    'Controls content opacity at the open end of the animation.',
  ],
  [
    '--accordion-item-content-transition',
    'var(--transition-default)',
    'Controls item content open and close animation timing.',
  ],
  ['--accordion-max-width', '100%', 'Controls the maximum accordion width.'],
  ['--accordion-trigger-bg', 'var(--color-muted)', 'Controls trigger background color.'],
  [
    '--accordion-trigger-bg-hover',
    'var(--color-accent)',
    'Controls trigger background color on hover.',
  ],
  ['--accordion-trigger-font-size', 'var(--text-md)', 'Controls trigger text font size.'],
  [
    '--accordion-trigger-gap',
    'var(--spacing-4)',
    'Controls spacing between trigger content and indicator.',
  ],
  [
    '--accordion-trigger-line-height',
    'var(--line-height-text-md)',
    'Controls trigger text line height.',
  ],
  ['--accordion-trigger-padding-x', 'var(--spacing-3)', 'Controls trigger horizontal padding.'],
  ['--accordion-trigger-padding-y', 'var(--spacing-2)', 'Controls trigger vertical padding.'],
  ['--accordion-width', '100%', 'Controls the default accordion width.'],
];