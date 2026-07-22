import type { CssProperty } from '../mdx/reference';

export const avatarExampleCss = `
  .docs-avatar-row,
  .docs-avatar-provider {
    display: flex;
    align-items: center;
    gap: var(--spacing-3);
  }

  .docs-avatar-status {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: var(--spacing-3);
  }

  .docs-avatar-provider-button {
    min-height: var(--size-md);
    padding-inline: var(--spacing-3);
    border: 1px solid var(--color-border);
    border-radius: var(--radius-md);
    background: var(--color-background);
    color: var(--color-foreground);
    font: inherit;
  }
`;

export const avatarCompositionCss = `
  .docs-avatar-link {
    text-decoration: none;
    transition:
      box-shadow var(--transition-default),
      transform var(--transition-default);
  }

  .docs-avatar-link:hover {
    box-shadow:
      0 0 0 2px var(--color-background),
      0 0 0 4px var(--color-primary);
    transform: translateY(-1px);
  }

  .docs-avatar-link-image {
    object-position: 50% 35%;
  }

  .docs-avatar-link-fallback {
    --avatar-fallback-bg: var(--color-primary);
    --avatar-fallback-color: var(--color-primary-foreground);
  }
`;

export const avatarFallbackCss = `
  .docs-avatar-icon {
    --avatar-bg: var(--color-accent);
    --avatar-fallback-color: var(--color-accent-foreground);
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
    name: '--avatar-bg',
    defaultValue: 'var(--color-muted)',
    description: 'Controls avatar background color.',
  },
  {
    name: '--avatar-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls avatar text color.',
  },
  {
    name: '--avatar-fallback-bg',
    defaultValue: 'var(--avatar-bg)',
    description: 'Controls fallback background color independently from the root.',
  },
  {
    name: '--avatar-fallback-color',
    defaultValue: 'inherit',
    description: 'Controls fallback text and icon color.',
  },
  {
    name: '--avatar-fallback-padding',
    defaultValue: '0',
    description: 'Controls fallback inner padding.',
  },
  {
    name: '--avatar-font-size',
    defaultValue: 'var(--text-md)',
    description: 'Controls avatar text font size.',
  },
  {
    name: '--avatar-font-weight',
    defaultValue: 'var(--weight-medium)',
    description: 'Controls avatar text font weight.',
  },
  {
    name: '--avatar-image-object-fit',
    defaultValue: 'cover',
    description: 'Controls how the image fits into the avatar.',
  },
  {
    name: '--avatar-image-object-position',
    defaultValue: 'center',
    description: 'Controls which part of the image remains visible when cropped.',
  },
  {
    name: '--avatar-line-height',
    defaultValue: 'var(--line-height-text-md)',
    description: 'Controls avatar text line height.',
  },
  {
    name: '--avatar-radius',
    defaultValue: 'var(--radius-full)',
    description: 'Controls avatar corner radius.',
  },
  {
    name: '--avatar-size',
    defaultValue: 'var(--size-md)',
    description: 'Controls avatar width and height.',
  },
] satisfies CssProperty[];