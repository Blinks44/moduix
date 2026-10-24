import type { CssProperty } from '../../mdx/reference';

export const tagCssProperties = (
  [
    [
      '--moduix-tag-bg',
      'var(--moduix-color-primary)',
      'Overrides the tag background. Each `variant` sets its own default.',
    ],
    [
      '--moduix-tag-border-color',
      'transparent',
      'Overrides the tag border color. Each `variant` sets its own default.',
    ],
    [
      '--moduix-tag-color',
      'var(--moduix-color-primary-foreground)',
      'Overrides the tag text, icon, and close trigger color. Each `variant` sets its own default.',
    ],
  ] as const
).map(([name, defaultValue, description]) => ({
  name,
  defaultValue,
  description,
})) satisfies CssProperty[];