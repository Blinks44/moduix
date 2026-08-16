import type { CssPropertyInput } from '../mdx/reference';

export const splitButtonCssProperties: CssPropertyInput[] = [
  ['--moduix-split-button-separator-color', 'currentColor', 'Controls separator color.'],
  [
    '--moduix-split-button-separator-inset',
    'var(--moduix-spacing-1-5)',
    'Controls separator block inset.',
  ],
  ['--moduix-split-button-separator-offset', '0', 'Controls separator inline offset.'],
  ['--moduix-split-button-separator-opacity', '0.16', 'Controls separator opacity.'],
  [
    '--moduix-split-button-separator-width',
    'var(--moduix-border-width-sm)',
    'Controls separator width.',
  ],
  [
    '--moduix-split-button-trigger-padding-x-xs',
    'var(--moduix-spacing-2)',
    'Controls horizontal trigger padding for the xs size.',
  ],
  [
    '--moduix-split-button-trigger-padding-x-sm',
    'var(--moduix-spacing-2-5)',
    'Controls horizontal trigger padding for the sm size.',
  ],
  [
    '--moduix-split-button-trigger-padding-x-md',
    'var(--moduix-spacing-3)',
    'Controls horizontal trigger padding for the md size.',
  ],
  [
    '--moduix-split-button-trigger-padding-x-lg',
    'var(--moduix-spacing-3-5)',
    'Controls horizontal trigger padding for the lg size.',
  ],
  [
    '--moduix-split-button-trigger-padding-x-xl',
    'var(--moduix-spacing-4)',
    'Controls horizontal trigger padding for the xl size.',
  ],
];

export const splitButtonExampleCss = `
  .split-button-stack {
    display: grid;
    justify-items: center;
    gap: var(--moduix-spacing-4);
  }

  .split-button-stack > [data-preview-meta] {
    justify-self: center;
  }

  .row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: center;
  gap: var(--moduix-spacing-3);
}
`;