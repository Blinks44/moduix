import type { ComponentProps } from 'react';
import { Avatar, ComputerIcon, useAvatar } from '@moduix/react';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
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

export const avatarCustomStylingCss = `
  .docs-avatar-ring {
    box-shadow:
      0 0 0 2px var(--color-background),
      0 0 0 4px color-mix(in srgb, var(--color-primary) 30%, transparent);
  }

  .docs-avatar-saturated-image {
    filter: saturate(1.1) contrast(1.05);
  }

  .docs-avatar-uppercase {
    letter-spacing: 0;
    text-transform: uppercase;
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

export const avatarOverrideCssProperties: CssPropertyInput[] = [
  ['--avatar-bg', 'var(--color-muted)', 'Controls avatar background color.'],
  ['--avatar-color', 'var(--color-foreground)', 'Controls avatar text color.'],
  [
    '--avatar-fallback-bg',
    'var(--avatar-bg)',
    'Controls fallback background color independently from the root.',
  ],
  ['--avatar-fallback-color', 'inherit', 'Controls fallback text and icon color.'],
  ['--avatar-fallback-padding', '0', 'Controls fallback inner padding.'],
  ['--avatar-font-size', 'var(--text-md)', 'Controls avatar text font size.'],
  ['--avatar-font-weight', 'var(--weight-medium)', 'Controls avatar text font weight.'],
  ['--avatar-image-object-fit', 'cover', 'Controls how the image fits into the avatar.'],
  [
    '--avatar-image-object-position',
    'center',
    'Controls which part of the image remains visible when cropped.',
  ],
  ['--avatar-line-height', 'var(--line-height-text-md)', 'Controls avatar text line height.'],
  ['--avatar-radius', 'var(--radius-full)', 'Controls avatar corner radius.'],
  ['--avatar-size', 'var(--size-md)', 'Controls avatar width and height.'],
];
const avatarCssProperties = avatarOverrideCssProperties.map(normalizeCssProperty);

export function AvatarCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={avatarCssProperties} />;
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return {
      name: property[0],
      defaultValue: property[1],
      description: property[2],
    };
  }

  return property;
}

export function AvatarExample(props: ComponentProps<typeof Avatar.Root>) {
  return (
    <Avatar.Root {...props}>
      <Avatar.Fallback>LT</Avatar.Fallback>
      <Avatar.Image src={avatarImage} alt="Alex T." />
    </Avatar.Root>
  );
}

export function AvatarFallbackOnlyExample() {
  return (
    <div className="docs-avatar-row">
      <Avatar.Root size="xs">
        <Avatar.Fallback>XS</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root size="sm">
        <Avatar.Fallback>SM</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root>
        <Avatar.Fallback>MD</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root size="lg">
        <Avatar.Fallback>LG</Avatar.Fallback>
      </Avatar.Root>
      <Avatar.Root size="xl">
        <Avatar.Fallback>XL</Avatar.Fallback>
      </Avatar.Root>
    </div>
  );
}

export function AvatarCompositionExample() {
  return (
    <Avatar.Root asChild size="xl" className="docs-avatar-link">
      <a href="mailto:alex@example.com" aria-label="Email Alex T.">
        <Avatar.Fallback className="docs-avatar-link-fallback">LT</Avatar.Fallback>
        <Avatar.Image className="docs-avatar-link-image" src={avatarImage} alt="" />
      </a>
    </Avatar.Root>
  );
}

export function AvatarImageErrorExample() {
  return (
    <Avatar.Root>
      <Avatar.Fallback>NA</Avatar.Fallback>
      <Avatar.Image src="https://example.com/does-not-exist.png" alt="Broken image example" />
    </Avatar.Root>
  );
}

export function AvatarStatusExample() {
  const [status, setStatus] = useState('idle');

  return (
    <div className="docs-avatar-status">
      <Avatar.Root onStatusChange={(details) => setStatus(details.status)}>
        <Avatar.Fallback>LT</Avatar.Fallback>
        <Avatar.Image src={avatarImage} alt="Alex T." />
      </Avatar.Root>
      <output className="text-sm text-muted-foreground">Status: {status}</output>
    </div>
  );
}

export function AvatarContextExample() {
  return (
    <Avatar.Root>
      <Avatar.Context>
        {(avatar) => <Avatar.Fallback>{avatar.loaded ? 'LT' : 'Loading'}</Avatar.Fallback>}
      </Avatar.Context>
      <Avatar.Image src={avatarImage} alt="Alex T." />
    </Avatar.Root>
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
        <Avatar.Fallback>LT</Avatar.Fallback>
        <Avatar.Image src={`${avatarImage}&seed=${count}`} alt="Alex T." />
      </Avatar.RootProvider>
    </div>
  );
}

export function CustomCompositionAvatarExample() {
  return (
    <Avatar.Root size="lg" className="docs-avatar-ring">
      <Avatar.Fallback className="docs-avatar-uppercase">LT</Avatar.Fallback>
      <Avatar.Image className="docs-avatar-saturated-image" src={avatarImage} alt="Alex T." />
    </Avatar.Root>
  );
}

export function AvatarCustomFallbackExample() {
  return (
    <Avatar.Root size="lg" className="docs-avatar-icon">
      <Avatar.Fallback role="img" aria-label="Workstation account">
        <ComputerIcon className="docs-avatar-icon-glyph" />
      </Avatar.Fallback>
    </Avatar.Root>
  );
}