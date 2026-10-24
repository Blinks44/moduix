import type { CssProperty } from '../../mdx/reference';

export const avatarCssProperties = [
  {
    name: '--moduix-avatar-bg',
    defaultValue: 'var(--moduix-color-muted)',
    description: 'Controls avatar background color.',
  },
  {
    name: '--moduix-avatar-color',
    defaultValue: 'var(--moduix-color-foreground)',
    description: 'Controls avatar text color.',
  },
  {
    name: '--moduix-avatar-font-size',
    defaultValue: 'var(--moduix-text-md)',
    description: 'Controls avatar text font size.',
  },
  {
    name: '--moduix-avatar-font-weight',
    defaultValue: 'var(--moduix-weight-medium)',
    description: 'Controls avatar text font weight.',
  },
  {
    name: '--moduix-avatar-radius',
    defaultValue: 'var(--moduix-radius-full)',
    description: 'Controls avatar corner radius.',
  },
  {
    name: '--moduix-avatar-size',
    defaultValue: 'var(--moduix-size-md)',
    description: 'Controls avatar width and height.',
  },
] satisfies CssProperty[];