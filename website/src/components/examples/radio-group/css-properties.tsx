import type { CssPropertyInput } from '../../mdx/reference';

export const radioGroupOverrideCssProperties: CssPropertyInput[] = [
  [
    '--moduix-radio-bg',
    'var(--moduix-color-background)',
    'Controls unchecked item control background.',
  ],
  [
    '--moduix-radio-bg-checked',
    'var(--moduix-color-primary)',
    'Controls checked item control background and border.',
  ],
  [
    '--moduix-radio-border-color',
    'var(--moduix-color-border)',
    'Controls unchecked item control border color.',
  ],
  [
    '--moduix-radio-gap',
    'var(--moduix-spacing-2)',
    'Controls spacing between item control and text.',
  ],
  [
    '--moduix-radio-indicator-color',
    'var(--moduix-color-primary-foreground)',
    'Controls checked dot color.',
  ],
  [
    '--moduix-radio-indicator-size',
    'var(--moduix-spacing-2)',
    'Overrides the checked dot size. Each `size` sets its own default.',
  ],
  [
    '--moduix-radio-size',
    'var(--moduix-spacing-5)',
    'Overrides the item control size. Each `size` sets its own default.',
  ],
];