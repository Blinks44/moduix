import type { CssProperty } from '../mdx/reference';

export const avatarExampleCss = `
  .docs-avatar-row {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: nowrap;
    gap: var(--moduix-spacing-3);
  }

  .docs-avatar-provider {
    display: grid;
    align-items: center;
    justify-items: center;
    gap: var(--moduix-spacing-3);
  }

  .docs-avatar-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--moduix-spacing-3);
  }

`;

export const avatarCompositionCss = `
  .docs-avatar-link {
    text-decoration: none;
    transition:
      box-shadow var(--moduix-transition-default),
      transform var(--moduix-transition-default);
  }

  .docs-avatar-link:hover {
    box-shadow:
      0 0 0 2px var(--moduix-color-background),
      0 0 0 4px var(--moduix-color-primary);
    transform: translateY(-1px);
  }

  .docs-avatar-link-image {
    object-position: 50% 35%;
  }

  .docs-avatar-link-fallback {
    --moduix-avatar-fallback-bg: var(--moduix-color-primary);
    --moduix-avatar-fallback-color: var(--moduix-color-primary-foreground);
  }
`;

export const avatarFallbackCss = `
  .docs-avatar-icon {
    --moduix-avatar-bg: var(--moduix-color-accent);
    --moduix-avatar-fallback-color: var(--moduix-color-accent-foreground);
  }

  .docs-avatar-icon-glyph {
    width: 55%;
    height: 55%;
  }
`;

export const avatarCustomImageCss = `
  .docs-avatar-custom-image {
    width: 100%;
    height: 100%;
    border-radius: inherit;
    object-fit: cover;
    object-position: center;
  }
`;

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