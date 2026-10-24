import type { CssPropertyInput } from '../../mdx/reference';

export const switchOverrideCssProperties: CssPropertyInput[] = [
  ['--moduix-switch-bg', 'var(--moduix-color-muted)', 'Controls unchecked track background.'],
  [
    '--moduix-switch-bg-checked',
    'var(--moduix-color-primary)',
    'Controls checked track background and border color.',
  ],
  [
    '--moduix-switch-border-color',
    'var(--moduix-color-border)',
    'Controls unchecked track border color.',
  ],
  ['--moduix-switch-gap', 'var(--moduix-spacing-2)', 'Controls gap between control and label.'],
  [
    '--moduix-switch-thumb-bg',
    'var(--moduix-color-background), checked var(--moduix-color-primary-foreground)',
    'Overrides the thumb background in both states.',
  ],
];