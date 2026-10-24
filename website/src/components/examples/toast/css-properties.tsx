import type { CssProperty } from '../../mdx/reference';

export const toastCssProperties = (
  [
    [
      '--moduix-toast-bg',
      'var(--moduix-color-card)',
      'Overrides the toast background. Each `type` sets its own default.',
    ],
    [
      '--moduix-toast-border-color',
      'var(--moduix-color-border)',
      'Overrides the toast border color. Each `type` sets its own default.',
    ],
    [
      '--moduix-toast-color',
      'var(--moduix-color-card-foreground)',
      'Overrides the toast text color. Each `type` sets its own default.',
    ],
    [
      '--moduix-toast-description-color',
      'var(--moduix-color-muted-foreground)',
      'Controls the description text color.',
    ],
  ] as const
).map(([name, defaultValue, description]) => ({
  name,
  defaultValue,
  description,
})) satisfies CssProperty[];