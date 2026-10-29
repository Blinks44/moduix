import type { CssPropertyInput } from '../../mdx/reference';

export const switchOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-switch-bg', 'var(--moduix-muted)', 'Controls unchecked track background.'],
  [
    '--moduix-switch-bg-checked',
    'var(--moduix-primary)',
    'Controls checked track background and border color.',
  ],
  [
    '--moduix-switch-border-color',
    'var(--moduix-border)',
    'Controls unchecked track border color.',
  ],
  ['--moduix-switch-gap', 'var(--moduix-spacing-2)', 'Controls gap between control and label.'],
  [
    '--moduix-switch-thumb-bg',
    'var(--moduix-input), checked var(--moduix-primary-foreground)',
    'Overrides the thumb background in both states.',
  ],
];