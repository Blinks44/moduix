import type { CssPropertyInput } from '../mdx/reference';

export const checkboxExampleCss = `
  .checkbox-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--moduix-spacing-2);
  }

  .checkbox-state,
  .checkbox-result {
    color: var(--moduix-color-muted-foreground);
    font-size: var(--moduix-text-xs);
    line-height: var(--moduix-line-height-text-xs);
  }

  .checkbox-fieldset {
    width: fit-content;
    max-width: min(20rem, 100%);
  }

  .checkbox-field {
    --moduix-field-width: fit-content;
    --moduix-field-max-width: min(20rem, 100%);
  }

  .checkbox-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--moduix-spacing-3);
  }

  .checkbox-submit {
    border: var(--moduix-border-width-sm) solid var(--moduix-color-border);
    border-radius: var(--moduix-radius-sm);
    padding: var(--moduix-spacing-2) var(--moduix-spacing-3);
    background: var(--moduix-color-background);
    color: var(--moduix-color-foreground);
    font-size: var(--moduix-text-sm);
    line-height: var(--moduix-line-height-text-sm);
  }
`;

export const checkboxCustomIndicatorCss = `
  .checkbox-custom-group,
  .checkbox-custom-root {
    gap: var(--moduix-spacing-3);
  }

  .checkbox-custom-control {
    border-color: var(--moduix-color-primary);
  }

  .checkbox-custom-control[data-state='checked'],
  .checkbox-custom-control[data-state='indeterminate'] {
    border-color: var(--moduix-color-primary);
    background-color: var(--moduix-color-primary);
  }

  .checkbox-custom-label {
    color: var(--moduix-color-primary);
  }

  .checkbox-custom-icon {
    transform: rotate(-8deg);
  }
`;

export const checkboxOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-checkbox-bg',
    'var(--moduix-color-background)',
    'Controls unchecked background color.',
  ],
  [
    '--moduix-checkbox-bg-checked',
    'var(--moduix-color-primary)',
    'Controls checked background color.',
  ],
  [
    '--moduix-checkbox-bg-hover',
    'var(--moduix-color-accent)',
    'Controls unchecked hover background color.',
  ],
  [
    '--moduix-checkbox-bg-invalid',
    'var(--moduix-color-destructive)',
    'Controls checked invalid background color.',
  ],
  [
    '--moduix-checkbox-border-color',
    'var(--moduix-color-border)',
    'Controls unchecked border color.',
  ],
  [
    '--moduix-checkbox-border-color-checked',
    'var(--moduix-color-primary)',
    'Controls checked and indeterminate border color.',
  ],
  [
    '--moduix-checkbox-border-color-invalid',
    'var(--moduix-color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  [
    '--moduix-checkbox-border-width',
    'var(--moduix-border-width-sm)',
    'Controls checkbox border width.',
  ],
  [
    '--moduix-checkbox-color',
    'var(--moduix-color-primary-foreground)',
    'Controls indicator icon color.',
  ],
  [
    '--moduix-checkbox-color-invalid',
    'var(--moduix-color-destructive-foreground)',
    'Controls checked invalid indicator icon color.',
  ],
  [
    '--moduix-checkbox-disabled-opacity',
    'var(--moduix-opacity-disabled)',
    'Controls disabled opacity.',
  ],
  ['--moduix-checkbox-focus-ring-color', 'var(--moduix-color-ring)', 'Controls focus ring color.'],
  [
    '--moduix-checkbox-focus-ring-offset',
    'var(--moduix-border-width-sm)',
    'Controls focus ring offset.',
  ],
  [
    '--moduix-checkbox-focus-ring-width',
    'var(--moduix-focus-ring-inset-width, var(--moduix-border-width-sm))',
    'Controls focus ring width.',
  ],
  [
    '--moduix-checkbox-gap',
    'var(--moduix-spacing-2)',
    'Controls spacing between control and label.',
  ],
  [
    '--moduix-checkbox-group-color',
    'var(--moduix-color-foreground)',
    'Controls checkbox group text color.',
  ],
  [
    '--moduix-checkbox-group-gap',
    'var(--moduix-spacing-2)',
    'Controls spacing between group items.',
  ],
  [
    '--moduix-checkbox-icon-size-xs',
    'var(--moduix-spacing-2)',
    'Controls `xs` indicator icon size.',
  ],
  [
    '--moduix-checkbox-icon-size-sm',
    'var(--moduix-spacing-2-5)',
    'Controls `sm` indicator icon size.',
  ],
  [
    '--moduix-checkbox-icon-size-md',
    'var(--moduix-spacing-3)',
    'Controls `md` indicator icon size.',
  ],
  [
    '--moduix-checkbox-icon-size-lg',
    'var(--moduix-spacing-3-5)',
    'Controls `lg` indicator icon size.',
  ],
  [
    '--moduix-checkbox-icon-size-xl',
    'var(--moduix-spacing-4)',
    'Controls `xl` indicator icon size.',
  ],
  ['--moduix-checkbox-label-color', 'var(--moduix-color-foreground)', 'Controls label text color.'],
  ['--moduix-checkbox-label-font-size', 'var(--moduix-text-sm)', 'Controls label font size.'],
  [
    '--moduix-checkbox-label-font-weight',
    'var(--moduix-weight-medium)',
    'Controls label font weight.',
  ],
  [
    '--moduix-checkbox-label-line-height',
    'var(--moduix-line-height-text-sm)',
    'Controls label line height.',
  ],
  ['--moduix-checkbox-radius', 'var(--moduix-radius-xs)', 'Controls checkbox corner radius.'],
  ['--moduix-checkbox-size-xs', 'var(--moduix-spacing-3-5)', 'Controls `xs` checkbox size.'],
  ['--moduix-checkbox-size-sm', 'var(--moduix-spacing-4)', 'Controls `sm` checkbox size.'],
  ['--moduix-checkbox-size-md', 'var(--moduix-spacing-5)', 'Controls `md` checkbox size.'],
  ['--moduix-checkbox-size-lg', 'var(--moduix-size-xs)', 'Controls `lg` checkbox size.'],
  ['--moduix-checkbox-size-xl', 'var(--moduix-spacing-7)', 'Controls `xl` checkbox size.'],
  [
    '--moduix-checkbox-transition',
    'var(--moduix-transition-default)',
    'Controls state transition timing.',
  ],
];