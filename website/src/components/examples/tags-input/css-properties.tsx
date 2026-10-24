import type { CssProperty } from '../../mdx/reference';

export const tagsInputCssProperties = (
  [
    ['--moduix-tags-input-width', '24rem', 'Sets the root width; the root never exceeds 100%.'],
    [
      '--moduix-tags-input-min-height',
      'var(--moduix-size-md)',
      'Sets the minimum control height; wrapped tags grow it.',
    ],
    ['--moduix-tags-input-radius', 'var(--moduix-radius-md)', 'Sets the control border radius.'],
  ] as const
).map(([name, defaultValue, description]) => ({
  name,
  defaultValue,
  description,
})) satisfies CssProperty[];