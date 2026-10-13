import type { CssPropertyInput } from '../../mdx/reference';

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
    '--moduix-accordion-icon-open-transform',
    'rotate(180deg)',
    'Controls indicator transform when the item is open.',
  ],
  ['--moduix-accordion-icon-size', 'var(--moduix-spacing-3)', 'Controls indicator icon size.'],
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
    '--moduix-accordion-item-content-color',
    'var(--moduix-color-muted-foreground)',
    'Controls item content text color.',
  ],
  [
    '--moduix-accordion-item-content-font-size',
    'var(--moduix-text-md)',
    'Controls item content font size.',
  ],
  ['--moduix-accordion-trigger-bg', 'transparent', 'Controls trigger background color.'],
  [
    '--moduix-accordion-trigger-bg-hover',
    'var(--moduix-color-muted)',
    'Controls trigger background color on hover and while pressed.',
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
    '--moduix-accordion-trigger-padding-x',
    'var(--moduix-spacing-3)',
    'Controls trigger horizontal padding.',
  ],
  [
    '--moduix-accordion-trigger-padding-y',
    'var(--moduix-spacing-2)',
    'Controls trigger vertical padding.',
  ],
];