import type { CssPropertyInput } from '../mdx/reference';

export const checkboxExampleCss = `
  .checkbox-stack {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-3);
  }

  .checkbox-wrapper {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-2);
  }

  .checkbox-state,
  .checkbox-result {
    color: var(--color-muted-foreground);
    font-size: var(--text-xs);
    line-height: var(--line-height-text-xs);
  }

  .checkbox-fieldset {
    width: fit-content;
    max-width: min(20rem, 100%);
  }

  .checkbox-field {
    --field-width: fit-content;
    --field-max-width: min(20rem, 100%);
  }

  .checkbox-form {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: var(--spacing-3);
  }

  .checkbox-submit {
    border: var(--border-width-sm) solid var(--color-border);
    border-radius: var(--radius-sm);
    padding: var(--spacing-2) var(--spacing-3);
    background: var(--color-background);
    color: var(--color-foreground);
    font-size: var(--text-sm);
    line-height: var(--line-height-text-sm);
  }
`;

export const checkboxCustomIndicatorCss = `
  .checkbox-custom-group,
  .checkbox-custom-root {
    gap: var(--spacing-3);
  }

  .checkbox-custom-control {
    border-color: var(--color-primary);
  }

  .checkbox-custom-control[data-state='checked'],
  .checkbox-custom-control[data-state='indeterminate'] {
    border-color: var(--color-primary);
    background-color: var(--color-primary);
  }

  .checkbox-custom-label {
    color: var(--color-primary);
  }

  .checkbox-custom-icon {
    transform: rotate(-8deg);
  }
`;

export const checkboxOverrideCssProperties: CssPropertyInput[] = [
  ['--checkbox-bg', 'var(--color-background)', 'Controls unchecked background color.'],
  ['--checkbox-bg-checked', 'var(--color-primary)', 'Controls checked background color.'],
  ['--checkbox-bg-hover', 'var(--color-accent)', 'Controls unchecked hover background color.'],
  [
    '--checkbox-bg-invalid',
    'var(--color-destructive)',
    'Controls checked invalid background color.',
  ],
  ['--checkbox-border-color', 'var(--color-border)', 'Controls unchecked border color.'],
  [
    '--checkbox-border-color-checked',
    'var(--color-primary)',
    'Controls checked and indeterminate border color.',
  ],
  [
    '--checkbox-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  ['--checkbox-border-width', 'var(--border-width-sm)', 'Controls checkbox border width.'],
  ['--checkbox-color', 'var(--color-primary-foreground)', 'Controls indicator icon color.'],
  [
    '--checkbox-color-invalid',
    'var(--color-destructive-foreground)',
    'Controls checked invalid indicator icon color.',
  ],
  ['--checkbox-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--checkbox-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--checkbox-focus-ring-offset', 'var(--border-width-sm)', 'Controls focus ring offset.'],
  [
    '--checkbox-focus-ring-width',
    'var(--focus-ring-inset-width, var(--border-width-sm))',
    'Controls focus ring width.',
  ],
  ['--checkbox-gap', 'var(--spacing-2)', 'Controls spacing between control and label.'],
  ['--checkbox-group-color', 'var(--color-foreground)', 'Controls checkbox group text color.'],
  ['--checkbox-group-gap', 'var(--spacing-2)', 'Controls spacing between group items.'],
  ['--checkbox-icon-size-xs', 'var(--spacing-2)', 'Controls `xs` indicator icon size.'],
  ['--checkbox-icon-size-sm', 'var(--spacing-2-5)', 'Controls `sm` indicator icon size.'],
  ['--checkbox-icon-size-md', 'var(--spacing-3)', 'Controls `md` indicator icon size.'],
  ['--checkbox-icon-size-lg', 'var(--spacing-3-5)', 'Controls `lg` indicator icon size.'],
  ['--checkbox-icon-size-xl', 'var(--spacing-4)', 'Controls `xl` indicator icon size.'],
  ['--checkbox-label-color', 'var(--color-foreground)', 'Controls label text color.'],
  ['--checkbox-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--checkbox-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--checkbox-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--checkbox-radius', 'var(--radius-xs)', 'Controls checkbox corner radius.'],
  ['--checkbox-size-xs', 'var(--spacing-3-5)', 'Controls `xs` checkbox size.'],
  ['--checkbox-size-sm', 'var(--spacing-4)', 'Controls `sm` checkbox size.'],
  ['--checkbox-size-md', 'var(--spacing-5)', 'Controls `md` checkbox size.'],
  ['--checkbox-size-lg', 'var(--size-xs)', 'Controls `lg` checkbox size.'],
  ['--checkbox-size-xl', 'var(--spacing-7)', 'Controls `xl` checkbox size.'],
  ['--checkbox-transition', 'var(--transition-default)', 'Controls state transition timing.'],
];