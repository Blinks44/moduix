import { Avatar, AvatarFallback, AvatarImage, ComputerIcon, type AvatarProps } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor } from '../preview';
import styles from './avatar.module.css';

const avatarImage =
  'https://images.unsplash.com/photo-1543610892-0b1f7e6d8ac1?w=128&h=128&dpr=2&q=80';

export const avatarOverrideCssProperties: CssPropertyInput[] = [
  ['--avatar-size', 'var(--avatar-size-md)', 'Controls avatar width and height.'],
  ['--avatar-size-xs', 'var(--size-xs)', 'Controls the `xs` avatar size.'],
  ['--avatar-size-sm', 'var(--size-sm)', 'Controls the `sm` avatar size.'],
  ['--avatar-size-md', 'var(--size-md)', 'Controls the `md` avatar size.'],
  ['--avatar-size-lg', 'var(--size-lg)', 'Controls the `lg` avatar size.'],
  ['--avatar-size-xl', 'var(--size-xl)', 'Controls the `xl` avatar size.'],
  ['--avatar-radius', 'var(--radius-full)', 'Controls avatar corner radius.'],
  ['--avatar-bg', 'var(--color-muted)', 'Controls avatar background color.'],
  ['--avatar-color', 'var(--color-foreground)', 'Controls avatar text color.'],
  ['--avatar-font-size', 'var(--avatar-font-size-md)', 'Controls avatar text font size.'],
  ['--avatar-font-weight', 'var(--weight-medium)', 'Controls avatar text font weight.'],
  ['--avatar-line-height', 'var(--avatar-line-height-md)', 'Controls avatar text line height.'],
  ['--avatar-image-object-fit', 'cover', 'Controls how the image fits into the avatar.'],
  [
    '--avatar-image-object-position',
    'center',
    'Controls which part of the image remains visible when cropped.',
  ],
  [
    '--avatar-fallback-bg',
    'var(--avatar-bg)',
    'Controls fallback background color independently from the root.',
  ],
  ['--avatar-fallback-color', 'inherit', 'Controls fallback text and icon color.'],
  ['--avatar-fallback-padding', '0', 'Controls fallback inner padding.'],
  ['--avatar-transition', 'var(--transition-default)', 'Controls image fade transition.'],
];

export const avatarPlaygroundCssProperties: CssPropertyInput[] = [
  ['--avatar-radius', 'var(--radius-full)', 'Controls avatar corner radius.'],
  ['--avatar-bg', 'var(--color-muted)', 'Controls avatar background color.'],
  ['--avatar-color', 'var(--color-foreground)', 'Controls avatar text color.'],
  ['--avatar-image-object-fit', 'cover', 'Controls how the image fits into the avatar.'],
  [
    '--avatar-image-object-position',
    'center',
    'Controls which part of the image remains visible when cropped.',
  ],
  [
    '--avatar-fallback-bg',
    'var(--avatar-bg)',
    'Controls fallback background color independently from the root.',
  ],
  ['--avatar-fallback-color', 'inherit', 'Controls fallback text and icon color.'],
  ['--avatar-fallback-padding', '0', 'Controls fallback inner padding.'],
];

export function AvatarCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  const overrideProperties = avatarOverrideCssProperties.map(normalizeCssProperty);

  return (
    <div className={styles.cssPropertiesSection}>
      <div className={styles.cssPropertiesTableWrap}>
        <table className={styles.cssPropertiesTable}>
          <thead>
            <tr>
              <th>Property</th>
              <th>Default</th>
              <th>Description</th>
            </tr>
          </thead>
          <tbody>
            {overrideProperties.map((property) => {
              return (
                <tr key={property.name}>
                  <td>{property.name}</td>
                  <td>{property.defaultValue}</td>
                  <td>{property.description ?? '-'}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export function AvatarCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  const playgroundProperties = avatarPlaygroundCssProperties.map(normalizeCssProperty);

  return (
    <div className={styles.cssPropertiesSection}>
      <CSSPropertiesEditor
        properties={playgroundProperties}
        values={values}
        onChange={onChange}
        onReset={onReset}
      />
    </div>
  );
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

export function AvatarExample(props: AvatarProps) {
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
      <Avatar size="md">
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
    <Avatar render={<a href="mailto:alex@example.com" />} className={styles.compositionRoot}>
      <AvatarImage className={styles.compositionImage} src={avatarImage} alt="Alex T." />
      <AvatarFallback className={styles.compositionFallback} delay={600}>
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

export function CustomStylesAvatarExample() {
  return (
    <Avatar size="lg" className={styles.ring}>
      <AvatarImage className={styles.imageSaturated} src={avatarImage} alt="Alex T." />
      <AvatarFallback className={styles.uppercase}>LT</AvatarFallback>
    </Avatar>
  );
}

export function AvatarCustomFallbackExample() {
  return (
    <Avatar size="lg" className={styles.customFallbackAvatar}>
      <AvatarFallback>
        <ComputerIcon className={styles.customFallbackIcon} />
      </AvatarFallback>
    </Avatar>
  );
}