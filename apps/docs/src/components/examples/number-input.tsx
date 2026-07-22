import type { CssProperty } from '../mdx/reference';
import { CSSPropertiesReferenceTable } from '../mdx/reference';

export const numberInputControlledCss = `
  .number-input-state {
    margin-top: var(--spacing-3);
    color: var(--color-muted-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }
`;

export const numberInputRootProviderCss = `
  .number-input-root-provider-actions {
    display: flex;
    gap: var(--spacing-2);
    margin-top: var(--spacing-3);
  }

  .number-input-root-provider-actions button {
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: var(--spacing-1) var(--spacing-2);
    background: var(--color-background);
    color: var(--color-foreground);
  }
`;

export const numberInputAdvancedCustomizationCss = `
  .number-input-custom-button {
    --number-input-button-bg: var(--color-muted);
    --number-input-button-bg-hover: var(--color-accent);
    --number-input-icon-size: 1rem;
  }

  .number-input-custom-input {
    --number-input-input-width: 7rem;
    --number-input-input-font-size: var(--text-lg);
  }
`;

const numberInputOverrideCssProperties: CssProperty[] = [
  {
    name: '--number-input-border-color',
    defaultValue: 'var(--color-border)',
    description: 'Controls default border color.',
  },
  {
    name: '--number-input-border-color-invalid',
    defaultValue: 'var(--color-destructive)',
    description: 'Controls invalid input border and focus ring color.',
  },
  {
    name: '--number-input-border-style',
    defaultValue: 'solid',
    description: 'Controls border style for triggers and input.',
  },
  {
    name: '--number-input-border-width',
    defaultValue: 'var(--border-width-sm)',
    description: 'Controls border width for triggers and input.',
  },
  {
    name: '--number-input-button-bg',
    defaultValue: 'var(--color-background)',
    description: 'Controls trigger background.',
  },
  {
    name: '--number-input-button-bg-active',
    defaultValue: 'var(--number-input-button-bg-hover)',
    description: 'Controls trigger background while pressed.',
  },
  {
    name: '--number-input-button-bg-hover',
    defaultValue: 'var(--color-accent)',
    description: 'Controls trigger background on hover.',
  },
  {
    name: '--number-input-button-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls trigger icon color.',
  },
  {
    name: '--number-input-control-height',
    defaultValue: 'var(--size-md)',
    description: 'Controls input and trigger height.',
  },
  {
    name: '--number-input-disabled-opacity',
    defaultValue: 'var(--opacity-disabled)',
    description: 'Controls disabled opacity.',
  },
  {
    name: '--number-input-focus-ring-color',
    defaultValue: 'var(--color-ring)',
    description: 'Controls focus ring color.',
  },
  {
    name: '--number-input-focus-ring-width',
    defaultValue: 'var(--number-input-border-width)',
    description: 'Controls focus ring width.',
  },
  {
    name: '--number-input-gap',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls spacing between number input parts.',
  },
  {
    name: '--number-input-icon-size',
    defaultValue: '0.875rem',
    description: 'Controls trigger icon size.',
  },
  {
    name: '--number-input-input-bg',
    defaultValue: 'var(--color-background)',
    description: 'Controls input background.',
  },
  {
    name: '--number-input-input-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls input text color.',
  },
  {
    name: '--number-input-input-font-size',
    defaultValue: 'var(--text-md)',
    description: 'Controls input font size.',
  },
  {
    name: '--number-input-input-line-height',
    defaultValue: 'var(--line-height-text-md)',
    description: 'Controls input line height.',
  },
  {
    name: '--number-input-input-padding-x',
    defaultValue: '0.75rem',
    description: 'Controls input horizontal padding.',
  },
  {
    name: '--number-input-input-padding-y',
    defaultValue: '0.5rem',
    description: 'Controls input vertical padding.',
  },
  {
    name: '--number-input-input-width',
    defaultValue: '6rem',
    description: 'Controls input width.',
  },
  {
    name: '--number-input-label-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls label text color.',
  },
  {
    name: '--number-input-label-font-size',
    defaultValue: 'var(--text-sm)',
    description: 'Controls label font size.',
  },
  {
    name: '--number-input-label-font-weight',
    defaultValue: 'var(--weight-medium)',
    description: 'Controls label font weight.',
  },
  {
    name: '--number-input-label-line-height',
    defaultValue: 'var(--line-height-text-sm)',
    description: 'Controls label line height.',
  },
  {
    name: '--number-input-max-width',
    defaultValue: 'none',
    description: 'Controls root max width.',
  },
  {
    name: '--number-input-radius',
    defaultValue: 'var(--radius-md)',
    description: 'Controls the outer control corner radius.',
  },
  {
    name: '--number-input-scrubber-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls scrubber text color.',
  },
  {
    name: '--number-input-scrubber-gap',
    defaultValue: 'var(--spacing-2)',
    description: 'Controls spacing inside the scrubber.',
  },
  {
    name: '--number-input-value-text-color',
    defaultValue: 'var(--color-muted-foreground)',
    description: 'Controls value text color.',
  },
  {
    name: '--number-input-value-text-font-size',
    defaultValue: 'var(--text-sm)',
    description: 'Controls value text font size.',
  },
  {
    name: '--number-input-value-text-line-height',
    defaultValue: 'var(--line-height-text-sm)',
    description: 'Controls value text line height.',
  },
  {
    name: '--number-input-width',
    defaultValue: 'auto',
    description: 'Controls root width.',
  },
];

export function NumberInputCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={numberInputOverrideCssProperties} />;
}