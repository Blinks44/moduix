import type { CssProperty } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const numberInputControlledCss = `
  .number-input-state {
    margin-top: var(--moduix-spacing-3);
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-sm);
    line-height: var(--moduix-line-height-text-sm);
  }
`;

export const numberInputRootProviderCss = `
  .number-input-root-provider-actions {
    display: flex;
    gap: var(--moduix-spacing-2);
    margin-top: var(--moduix-spacing-3);
  }

  .number-input-root-provider-actions button {
    border: var(--moduix-border-width-sm) solid var(--moduix-color-border);
    border-radius: var(--moduix-radius-sm);
    padding: var(--moduix-spacing-1) var(--moduix-spacing-2);
    background: var(--moduix-color-background);
    color: var(--moduix-color-foreground);
  }
`;

export const numberInputAdvancedCustomizationCss = `
  .number-input-custom-button {
    --moduix-number-input-button-bg: var(--moduix-color-muted);
    --moduix-number-input-button-bg-hover: var(--moduix-color-accent);
    --moduix-number-input-icon-size: 1rem;
  }

  .number-input-custom-input {
    --moduix-number-input-input-width: 7rem;
    --moduix-number-input-input-font-size: var(--moduix-text-lg);
  }
`;

const numberInputOverrideCssProperties: CssProperty[] = [
  {
    name: '--moduix-number-input-border-color',
    defaultValue: 'var(--moduix-color-border)',
    description: 'Controls default border color.',
  },
  {
    name: '--moduix-number-input-border-color-invalid',
    defaultValue: 'var(--moduix-color-destructive)',
    description: 'Controls invalid input border and focus ring color.',
  },
  {
    name: '--moduix-number-input-border-style',
    defaultValue: 'solid',
    description: 'Controls border style for triggers and input.',
  },
  {
    name: '--moduix-number-input-border-width',
    defaultValue: 'var(--moduix-border-width-sm)',
    description: 'Controls border width for triggers and input.',
  },
  {
    name: '--moduix-number-input-button-bg',
    defaultValue: 'var(--moduix-color-background)',
    description: 'Controls trigger background.',
  },
  {
    name: '--moduix-number-input-button-bg-active',
    defaultValue: 'var(--moduix-number-input-button-bg-hover)',
    description: 'Controls trigger background while pressed.',
  },
  {
    name: '--moduix-number-input-button-bg-hover',
    defaultValue: 'var(--moduix-color-accent)',
    description: 'Controls trigger background on hover.',
  },
  {
    name: '--moduix-number-input-button-color',
    defaultValue: 'var(--moduix-color-foreground)',
    description: 'Controls trigger icon color.',
  },
  {
    name: '--moduix-number-input-control-height',
    defaultValue: 'var(--moduix-size-md)',
    description: 'Controls input and trigger height.',
  },
  {
    name: '--moduix-number-input-disabled-opacity',
    defaultValue: 'var(--moduix-opacity-disabled)',
    description: 'Controls disabled opacity.',
  },
  {
    name: '--moduix-number-input-focus-ring-color',
    defaultValue: 'var(--moduix-color-ring)',
    description: 'Controls focus ring color.',
  },
  {
    name: '--moduix-number-input-focus-ring-width',
    defaultValue: 'var(--moduix-number-input-border-width)',
    description: 'Controls focus ring width.',
  },
  {
    name: '--moduix-number-input-gap',
    defaultValue: 'var(--moduix-spacing-1)',
    description: 'Controls spacing between number input parts.',
  },
  {
    name: '--moduix-number-input-icon-size',
    defaultValue: '0.875rem',
    description: 'Controls trigger icon size.',
  },
  {
    name: '--moduix-number-input-input-bg',
    defaultValue: 'var(--moduix-color-background)',
    description: 'Controls input background.',
  },
  {
    name: '--moduix-number-input-input-color',
    defaultValue: 'var(--moduix-color-foreground)',
    description: 'Controls input text color.',
  },
  {
    name: '--moduix-number-input-input-font-size',
    defaultValue: 'var(--moduix-text-md)',
    description: 'Controls input font size.',
  },
  {
    name: '--moduix-number-input-input-line-height',
    defaultValue: 'var(--moduix-line-height-text-md)',
    description: 'Controls input line height.',
  },
  {
    name: '--moduix-number-input-input-padding-x',
    defaultValue: '0.75rem',
    description: 'Controls input horizontal padding.',
  },
  {
    name: '--moduix-number-input-input-padding-y',
    defaultValue: '0.5rem',
    description: 'Controls input vertical padding.',
  },
  {
    name: '--moduix-number-input-input-width',
    defaultValue: '6rem',
    description: 'Controls input width.',
  },
  {
    name: '--moduix-number-input-label-color',
    defaultValue: 'var(--moduix-color-foreground)',
    description: 'Controls label text color.',
  },
  {
    name: '--moduix-number-input-label-font-size',
    defaultValue: 'var(--moduix-text-sm)',
    description: 'Controls label font size.',
  },
  {
    name: '--moduix-number-input-label-font-weight',
    defaultValue: 'var(--moduix-weight-medium)',
    description: 'Controls label font weight.',
  },
  {
    name: '--moduix-number-input-label-line-height',
    defaultValue: 'var(--moduix-line-height-text-sm)',
    description: 'Controls label line height.',
  },
  {
    name: '--moduix-number-input-max-width',
    defaultValue: 'none',
    description: 'Controls root max width.',
  },
  {
    name: '--moduix-number-input-radius',
    defaultValue: 'var(--moduix-radius-md)',
    description: 'Controls the outer control corner radius.',
  },
  {
    name: '--moduix-number-input-scrubber-color',
    defaultValue: 'var(--moduix-color-foreground)',
    description: 'Controls scrubber text color.',
  },
  {
    name: '--moduix-number-input-scrubber-gap',
    defaultValue: 'var(--moduix-spacing-2)',
    description: 'Controls spacing inside the scrubber.',
  },
  {
    name: '--moduix-number-input-value-text-color',
    defaultValue: 'var(--moduix-color-muted-foreground)',
    description: 'Controls value text color.',
  },
  {
    name: '--moduix-number-input-value-text-font-size',
    defaultValue: 'var(--moduix-text-sm)',
    description: 'Controls value text font size.',
  },
  {
    name: '--moduix-number-input-value-text-line-height',
    defaultValue: 'var(--moduix-line-height-text-sm)',
    description: 'Controls value text line height.',
  },
  {
    name: '--moduix-number-input-width',
    defaultValue: 'auto',
    description: 'Controls root width.',
  },
];

export function NumberInputCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={numberInputOverrideCssProperties} />;
}