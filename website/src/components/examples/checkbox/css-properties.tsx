import type { CssPropertyInput } from '../../mdx/reference';

export const checkboxOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-checkbox-bg',
    'var(--moduix-color-background)',
    'Controls unchecked background color.',
  ],
  [
    '--moduix-checkbox-bg-checked',
    'var(--moduix-color-primary)',
    'Controls checked and indeterminate background and border color.',
  ],
  [
    '--moduix-checkbox-border-color',
    'var(--moduix-color-border)',
    'Controls unchecked border color.',
  ],
  [
    '--moduix-checkbox-color',
    'var(--moduix-color-primary-foreground)',
    'Controls checkmark color.',
  ],
  ['--moduix-checkbox-gap', 'var(--moduix-spacing-2)', 'Controls gap between control and label.'],
  [
    '--moduix-checkbox-icon-size',
    'Size-specific fallback',
    'Overrides the indicator icon size for every size.',
  ],
  ['--moduix-checkbox-radius', 'var(--moduix-radius-xs)', 'Controls checkbox corner radius.'],
  [
    '--moduix-checkbox-size',
    'Size-specific fallback',
    'Overrides the control size for every size.',
  ],
];