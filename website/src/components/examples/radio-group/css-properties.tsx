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
    'Size-specific fallback',
    'Overrides the checked dot size for every size.',
  ],
  [
    '--moduix-radio-size',
    'Size-specific fallback',
    'Overrides the item control size for every size.',
  ],
];