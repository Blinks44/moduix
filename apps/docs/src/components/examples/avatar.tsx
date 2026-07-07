import type { ComponentProps } from 'react';
import { useAvatar } from '@ark-ui/react/avatar';
import { Avatar } from '@moduix/react';
import { Computer as ComputerIcon } from 'lucide-react';
import { useState } from 'react';
import type { CssProperty } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

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
    align-items: flex-start;
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

export const avatarImageData = `
  const avatarImage =
    "https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80";
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

export function AvatarCssPropertiesPanel() {
  return <CSSPropertiesReferenceTable properties={avatarCssProperties} />;
}

export function AvatarExample(props: ComponentProps<typeof Avatar.Root>) {
  return (
    <Avatar {...props}>
      <Avatar.Fallback name="Alex T." />
      <Avatar.Image src={avatarImage} alt="Alex T." />
    </Avatar>
  );
}

export function AvatarFallbackOnlyExample() {
  return (
    <div className="docs-avatar-row">
      <Avatar size="xs">
        <Avatar.Fallback>XS</Avatar.Fallback>
      </Avatar>
      <Avatar size="sm">
        <Avatar.Fallback>SM</Avatar.Fallback>
      </Avatar>
      <Avatar>
        <Avatar.Fallback>MD</Avatar.Fallback>
      </Avatar>
      <Avatar size="lg">
        <Avatar.Fallback>LG</Avatar.Fallback>
      </Avatar>
      <Avatar size="xl">
        <Avatar.Fallback>XL</Avatar.Fallback>
      </Avatar>
    </div>
  );
}

export function AvatarCompositionExample() {
  return (
    <Avatar asChild size="xl" className="docs-avatar-link">
      <a href="mailto:alex@example.com" aria-label="Email Alex T.">
        <Avatar.Fallback className="docs-avatar-link-fallback" name="Alex T." />
        <Avatar.Image className="docs-avatar-link-image" src={avatarImage} alt="" />
      </a>
    </Avatar>
  );
}

export function AvatarImageErrorExample() {
  return (
    <Avatar>
      <Avatar.Fallback name="No Avatar" />
      <Avatar.Image src="https://example.com/does-not-exist.png" alt="Broken image example" />
    </Avatar>
  );
}

export function AvatarStatusExample() {
  const [status, setStatus] = useState('idle');

  return (
    <div className="docs-avatar-status">
      <Avatar onStatusChange={(details) => setStatus(details.status)}>
        <Avatar.Fallback name="Alex T." />
        <Avatar.Image src={avatarImage} alt="Alex T." />
      </Avatar>
      <output className="text-sm text-muted-foreground">Status: {status}</output>
    </div>
  );
}

export function AvatarRootProviderExample() {
  const [count, setCount] = useState(0);
  const avatar = useAvatar();

  return (
    <div className="docs-avatar-provider">
      <button
        type="button"
        className="docs-avatar-provider-button"
        onClick={() => setCount(count + 1)}
      >
        Change avatar
      </button>
      <Avatar.RootProvider value={avatar}>
        <Avatar.Fallback name="Alex T." />
        <Avatar.Image src={`${avatarImage}&seed=${count}`} alt="Alex T." />
      </Avatar.RootProvider>
    </div>
  );
}

export function CustomCompositionAvatarExample() {
  return (
    <Avatar size="lg" className="docs-avatar-ring">
      <Avatar.Fallback className="docs-avatar-uppercase" name="Alex T." />
      <Avatar.Image className="docs-avatar-saturated-image" src={avatarImage} alt="Alex T." />
    </Avatar>
  );
}

export function AvatarCustomFallbackExample() {
  return (
    <Avatar size="lg" className="docs-avatar-icon">
      <Avatar.Fallback role="img" aria-label="Workstation account">
        <ComputerIcon className="docs-avatar-icon-glyph" />
      </Avatar.Fallback>
    </Avatar>
  );
}