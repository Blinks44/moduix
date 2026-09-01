import type { CssProperty } from '../mdx/reference';

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
    name: '--moduix-avatar-fallback-bg',
    defaultValue: 'var(--moduix-avatar-bg)',
    description: 'Controls fallback background color independently from the root.',
  },
  {
    name: '--moduix-avatar-fallback-color',
    defaultValue: 'inherit',
    description: 'Controls fallback text and icon color.',
  },
  {
    name: '--moduix-avatar-fallback-icon-size',
    defaultValue: '55%',
    description: 'Controls the size of the built-in fallback icon.',
  },
  {
    name: '--moduix-avatar-fallback-padding',
    defaultValue: '0',
    description: 'Controls fallback inner padding.',
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
    name: '--moduix-avatar-image-object-fit',
    defaultValue: 'cover',
    description: 'Controls how the image fits into the avatar.',
  },
  {
    name: '--moduix-avatar-image-object-position',
    defaultValue: 'center',
    description: 'Controls which part of the image remains visible when cropped.',
  },
  {
    name: '--moduix-avatar-line-height',
    defaultValue: 'var(--moduix-line-height-text-md)',
    description: 'Controls avatar text line height.',
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