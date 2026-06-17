import type { ComponentProps } from 'react';
import { Avatar, ComputerIcon } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

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
      <Avatar.Image src={avatarImage} alt="Alex T." />
      <Avatar.Fallback>LT</Avatar.Fallback>
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
        <Avatar.Image className="docs-avatar-link-image" src={avatarImage} alt="" />
        <Avatar.Fallback className="docs-avatar-link-fallback">LT</Avatar.Fallback>
      </a>
    </Avatar.Root>
  );
}

export function AvatarImageErrorExample() {
  return (
    <Avatar.Root>
      <Avatar.Image src="https://example.com/does-not-exist.png" alt="Broken image example" />
      <Avatar.Fallback>NA</Avatar.Fallback>
    </Avatar.Root>
  );
}

export function CustomCompositionAvatarExample() {
  return (
    <Avatar.Root size="lg" className="docs-avatar-ring">
      <Avatar.Image className="docs-avatar-saturated-image" src={avatarImage} alt="Alex T." />
      <Avatar.Fallback className="docs-avatar-uppercase">LT</Avatar.Fallback>
    </Avatar.Root>
  );
}

export function AvatarCustomFallbackExample() {
  return (
    <Avatar.Root size="lg" className="docs-avatar-icon">
      <Avatar.Fallback>
        <ComputerIcon className="docs-avatar-icon-glyph" />
      </Avatar.Fallback>
    </Avatar.Root>
  );
}