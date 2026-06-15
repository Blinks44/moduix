import type { ComponentProps } from 'react';
import { Avatar, AvatarFallback, AvatarImage, ComputerIcon } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './avatar.module.css';

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
  ['--avatar-image-ending-opacity', '0', 'Controls ending image opacity for exit motion.'],
  ['--avatar-image-ending-scale', '1', 'Controls ending image scale for exit motion.'],
  ['--avatar-image-ending-translate-x', '0', 'Controls ending image horizontal translation.'],
  ['--avatar-image-ending-translate-y', '0', 'Controls ending image vertical translation.'],
  ['--avatar-image-object-fit', 'cover', 'Controls how the image fits into the avatar.'],
  [
    '--avatar-image-object-position',
    'center',
    'Controls which part of the image remains visible when cropped.',
  ],
  ['--avatar-image-starting-opacity', '0', 'Controls starting image opacity for enter motion.'],
  ['--avatar-image-starting-scale', '1', 'Controls starting image scale for enter motion.'],
  ['--avatar-image-starting-translate-x', '0', 'Controls starting image horizontal translation.'],
  ['--avatar-image-starting-translate-y', '0', 'Controls starting image vertical translation.'],
  ['--avatar-line-height', 'var(--line-height-text-md)', 'Controls avatar text line height.'],
  ['--avatar-radius', 'var(--radius-full)', 'Controls avatar corner radius.'],
  ['--avatar-size', 'var(--size-md)', 'Controls avatar width and height.'],
  ['--avatar-transition', 'var(--transition-default)', 'Controls image fade transition.'],
];

export function AvatarCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  const overrideProperties = avatarOverrideCssProperties.map(normalizeCssProperty);

  return <CSSPropertiesReferenceTable properties={overrideProperties} />;
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

export function AvatarExample(props: ComponentProps<typeof Avatar>) {
  return (
    <Avatar {...props}>
      <AvatarImage src={avatarImage} alt="Alex T." />
      <AvatarFallback delay={600}>LT</AvatarFallback>
    </Avatar>
  );
}

export function AvatarFallbackOnlyExample() {
  return (
    <div className={styles.row}>
      <Avatar size="xs">
        <AvatarFallback>XS</AvatarFallback>
      </Avatar>
      <Avatar size="sm">
        <AvatarFallback>SM</AvatarFallback>
      </Avatar>
      <Avatar>
        <AvatarFallback>MD</AvatarFallback>
      </Avatar>
      <Avatar size="lg">
        <AvatarFallback>LG</AvatarFallback>
      </Avatar>
      <Avatar size="xl">
        <AvatarFallback>XL</AvatarFallback>
      </Avatar>
    </div>
  );
}

export function AvatarCompositionExample() {
  return (
    <Avatar render={<a href="mailto:alex@example.com" />} size="xl" className={styles.linkAvatar}>
      <AvatarImage className={styles.linkAvatarImage} src={avatarImage} alt="Alex T." />
      <AvatarFallback className={styles.linkAvatarFallback} delay={600}>
        LT
      </AvatarFallback>
    </Avatar>
  );
}

export function AvatarImageErrorExample() {
  return (
    <Avatar>
      <AvatarImage src="https://example.com/does-not-exist.png" alt="Broken image example" />
      <AvatarFallback>NA</AvatarFallback>
    </Avatar>
  );
}

export function CustomCompositionAvatarExample() {
  return (
    <Avatar size="lg" className={styles.ring}>
      <AvatarImage className={styles.imageSaturated} src={avatarImage} alt="Alex T." />
      <AvatarFallback className={styles.uppercase}>LT</AvatarFallback>
    </Avatar>
  );
}

export function AvatarCustomFallbackExample() {
  return (
    <Avatar size="lg" className={styles.iconAvatar}>
      <AvatarFallback>
        <ComputerIcon className={styles.iconAvatarGlyph} />
      </AvatarFallback>
    </Avatar>
  );
}