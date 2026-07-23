import type { CssPropertyInput } from '../mdx/reference';

export const accordionExampleCss = `
  .accordion-provider-stack {
    display: grid;
    gap: var(--moduix-spacing-3);
    width: fit-content;
    max-width: 100%;
  }

  .accordion-provider-stack .accordion-state {
    margin-top: 0;
  }

  .accordion-state {
    margin-top: var(--moduix-spacing-3);
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-sm);
    line-height: var(--moduix-line-height-text-sm);
  }

`;

export const accordionOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-accordion-color', 'var(--moduix-color-foreground)', 'Controls accordion text color.'],
  [
    '--moduix-accordion-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled item opacity.',
  ],
  [
    '--moduix-accordion-focus-ring-color',
    'var(--moduix-color-ring)',
    'Controls trigger focus ring color.',
  ],
  [
    '--moduix-accordion-focus-ring-offset',
    'var(--moduix-border-width-sm)',
    'Controls trigger focus ring offset from trigger edge.',
  ],
  [
    '--moduix-accordion-focus-ring-width',
    'var(--moduix-focus-ring-width, var(--moduix-border-width-md))',
    'Controls trigger focus ring outline width.',
  ],
  [
    '--moduix-accordion-horizontal-content-width',
    '16rem',
    'Controls the inner content width for horizontal accordions.',
  ],
  ['--moduix-accordion-horizontal-height', '20rem', 'Controls horizontal accordion height.'],
  [
    '--moduix-accordion-horizontal-max-height',
    '100%',
    'Controls horizontal accordion maximum height.',
  ],
  [
    '--moduix-accordion-horizontal-trigger-width',
    '2.5rem',
    'Controls trigger width in horizontal orientation.',
  ],
  ['--moduix-accordion-horizontal-width', 'auto', 'Controls horizontal accordion width.'],
  [
    '--moduix-accordion-icon-open-transform',
    'rotate(45deg) scale(1.1)',
    'Controls indicator transform when the item is open.',
  ],
  ['--moduix-accordion-icon-size', 'var(--moduix-spacing-3)', 'Controls indicator icon size.'],
  [
    '--moduix-accordion-icon-transition',
    'var(--moduix-transition-default)',
    'Controls indicator transition.',
  ],
  [
    '--moduix-accordion-item-border-color',
    'var(--moduix-color-border)',
    'Controls the separator color between accordion items.',
  ],
  [
    '--moduix-accordion-item-border-width',
    'var(--moduix-border-width-sm)',
    'Controls the separator width between accordion items.',
  ],
  [
    '--moduix-accordion-item-body-gap',
    'var(--moduix-spacing-3)',
    'Controls spacing between elements in item body.',
  ],
  [
    '--moduix-accordion-item-body-padding',
    'var(--moduix-spacing-3)',
    'Controls item body padding.',
  ],
  [
    '--moduix-accordion-item-content-closed-opacity',
    '0.01',
    'Controls content opacity at the closed end of the animation.',
  ],
  [
    '--moduix-accordion-item-content-color',
    'var(--moduix-color-muted-foreground)',
    'Controls item content text color.',
  ],
  [
    '--moduix-accordion-item-content-font-size',
    'var(--moduix-text-md)',
    'Controls item content font size.',
  ],
  [
    '--moduix-accordion-item-content-line-height',
    'var(--moduix-line-height-text-md)',
    'Controls item content line height.',
  ],
  [
    '--moduix-accordion-item-content-open-opacity',
    '1',
    'Controls content opacity at the open end of the animation.',
  ],
  [
    '--moduix-accordion-item-content-transition',
    'var(--moduix-transition-default)',
    'Controls item content open and close animation timing.',
  ],
  ['--moduix-accordion-max-width', '100%', 'Controls the maximum accordion width.'],
  [
    '--moduix-accordion-trigger-bg',
    'var(--moduix-color-muted)',
    'Controls trigger background color.',
  ],
  [
    '--moduix-accordion-trigger-bg-hover',
    'var(--moduix-color-accent)',
    'Controls trigger background color on hover.',
  ],
  [
    '--moduix-accordion-trigger-font-size',
    'var(--moduix-text-md)',
    'Controls trigger text font size.',
  ],
  [
    '--moduix-accordion-trigger-gap',
    'var(--moduix-spacing-4)',
    'Controls spacing between trigger content and indicator.',
  ],
  [
    '--moduix-accordion-trigger-line-height',
    'var(--moduix-line-height-text-md)',
    'Controls trigger text line height.',
  ],
  [
    '--moduix-accordion-trigger-padding-x',
    'var(--moduix-spacing-3)',
    'Controls trigger horizontal padding.',
  ],
  [
    '--moduix-accordion-trigger-padding-y',
    'var(--moduix-spacing-2)',
    'Controls trigger vertical padding.',
  ],
  ['--moduix-accordion-width', '100%', 'Controls the default accordion width.'],
];