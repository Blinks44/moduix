import { Button, Spinner } from '@moduix/react';
import { ArrowUpRight as ArrowUpRightIcon, Plus as PlusIcon, Star as StarIcon } from 'lucide-react';
import { useRef, useState, type ComponentProps } from 'react';
import type { CssPropertyInput } from '../mdx/preview';
import styles from './button.module.css';

const buttonLabels = {
  basic: 'Save Changes',
  create: 'Create Item',
  disabled: 'Disabled',
  disabledLink: 'Disabled Link',
  favorite: 'Favorites',
  focusTarget: 'Focus target',
  focusTrigger: 'Focus first button',
  link: 'Open Button Docs',
  loading: 'Saving',
  loadingIdle: 'Save Changes',
  publishing: 'Publishing',
};
const variants = [
  'default',
  'outline',
  'secondary',
  'destructive',
  'destructive-outline',
  'ghost',
  'link',
] as const;
const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;
const iconSizes = [
  { label: 'Small favorite', size: 'icon-sm' },
  { label: 'Favorite', size: 'icon-md' },
  { label: 'Large favorite', size: 'icon-lg' },
] as const;

export const buttonCssProperties: CssPropertyInput[] = [
  ['--button-border-width', 'var(--border-width-sm)', 'Controls base button border width.'],
  ['--button-color', 'var(--color-foreground)', 'Controls base button text and icon color.'],
  ['--button-content-gap', 'var(--spacing-2)', 'Controls spacing between text and icons.'],
  ['--button-default-bg', 'var(--color-primary)', 'Controls default variant background.'],
  [
    '--button-default-bg-hover',
    'color-mix(in srgb, var(--button-default-bg, var(--color-primary)) 88%, black)',
    'Controls default variant hover background.',
  ],
  [
    '--button-default-border-color',
    'var(--color-primary)',
    'Controls default variant border color.',
  ],
  [
    '--button-default-color',
    'var(--color-primary-foreground)',
    'Controls default variant text and icon color.',
  ],
  [
    '--button-destructive-bg',
    'var(--color-destructive)',
    'Controls destructive variant background.',
  ],
  [
    '--button-destructive-border-color',
    'var(--color-destructive)',
    'Controls destructive variant border color.',
  ],
  [
    '--button-destructive-color',
    'var(--color-destructive-foreground)',
    'Controls destructive variant text and icon color.',
  ],
  [
    '--button-destructive-hover-brightness',
    '0.96',
    'Controls destructive variant hover brightness filter.',
  ],
  [
    '--button-destructive-outline-bg',
    'var(--color-background)',
    'Controls destructive-outline variant background.',
  ],
  [
    '--button-destructive-outline-bg-hover',
    'var(--color-destructive)',
    'Controls destructive-outline variant hover background.',
  ],
  [
    '--button-destructive-outline-border-color',
    'var(--color-destructive)',
    'Controls destructive-outline variant border color.',
  ],
  [
    '--button-destructive-outline-color',
    'var(--color-destructive)',
    'Controls destructive-outline variant text and icon color.',
  ],
  [
    '--button-destructive-outline-color-hover',
    'var(--button-destructive-color, var(--color-destructive-foreground))',
    'Controls destructive-outline variant hover text and icon color.',
  ],
  ['--button-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled state opacity.'],
  ['--button-focus-ring-color', 'var(--color-ring)', 'Controls focus-visible outline color.'],
  [
    '--button-focus-ring-offset',
    'var(--button-border-width, var(--border-width-sm))',
    'Controls focus-visible outline offset.',
  ],
  [
    '--button-focus-ring-width',
    'var(--focus-ring-width, var(--border-width-md))',
    'Controls focus-visible outline width.',
  ],
  ['--button-font-size', 'var(--text-sm)', 'Controls base button font size.'],
  ['--button-font-size-xs', 'var(--text-xs)', 'Controls `xs` button font size.'],
  ['--button-font-size-lg', 'var(--text-md)', 'Controls `lg` button font size.'],
  ['--button-font-size-xl', 'var(--text-lg)', 'Controls `xl` button font size.'],
  ['--button-font-weight', 'var(--weight-medium)', 'Controls button font weight.'],
  ['--button-ghost-bg', 'transparent', 'Controls ghost variant background.'],
  ['--button-ghost-bg-hover', 'var(--color-accent)', 'Controls ghost variant hover background.'],
  ['--button-ghost-border-color', 'transparent', 'Controls ghost variant border color.'],
  [
    '--button-ghost-color',
    'var(--color-foreground)',
    'Controls ghost variant text and icon color.',
  ],
  ['--button-icon-size', 'var(--spacing-4)', 'Controls nested SVG icon size.'],
  ['--button-line-height', 'var(--line-height-text-sm)', 'Controls base button line height.'],
  ['--button-line-height-xs', 'var(--line-height-text-xs)', 'Controls `xs` button line height.'],
  ['--button-line-height-lg', 'var(--line-height-text-md)', 'Controls `lg` button line height.'],
  ['--button-line-height-xl', 'var(--line-height-text-lg)', 'Controls `xl` button line height.'],
  ['--button-link-color', 'var(--color-primary)', 'Controls link variant color.'],
  ['--button-link-color-hover', 'var(--color-foreground)', 'Controls link variant hover color.'],
  ['--button-link-text-decoration', 'underline', 'Controls link variant text decoration.'],
  ['--button-link-underline-offset', '0.25em', 'Controls link variant underline offset.'],
  ['--button-outline-bg', 'var(--color-background)', 'Controls outline variant background.'],
  [
    '--button-outline-bg-hover',
    'var(--color-accent)',
    'Controls outline variant hover background.',
  ],
  [
    '--button-outline-border-color',
    'var(--color-border)',
    'Controls outline variant border color.',
  ],
  [
    '--button-outline-color',
    'var(--color-foreground)',
    'Controls outline variant text and icon color.',
  ],
  ['--button-padding-x-xs', 'var(--spacing-2-5)', 'Controls `xs` button horizontal padding.'],
  ['--button-padding-x-sm', 'var(--spacing-3)', 'Controls `sm` button horizontal padding.'],
  ['--button-padding-x-md', 'var(--spacing-4)', 'Controls `md` button horizontal padding.'],
  ['--button-padding-x-lg', 'var(--spacing-5)', 'Controls `lg` button horizontal padding.'],
  ['--button-padding-x-xl', 'var(--spacing-6)', 'Controls `xl` button horizontal padding.'],
  ['--button-padding-y-xs', 'var(--spacing-0-5)', 'Controls `xs` button vertical padding.'],
  ['--button-padding-y-sm', 'var(--spacing-1)', 'Controls `sm` button vertical padding.'],
  ['--button-padding-y-md', 'var(--spacing-1)', 'Controls `md` button vertical padding.'],
  ['--button-padding-y-lg', 'var(--spacing-1-5)', 'Controls `lg` button vertical padding.'],
  ['--button-padding-y-xl', 'var(--spacing-2)', 'Controls `xl` button vertical padding.'],
  ['--button-radius', 'var(--radius-md)', 'Controls button corner radius.'],
  ['--button-secondary-bg', 'var(--color-secondary)', 'Controls secondary variant background.'],
  [
    '--button-secondary-bg-hover',
    'var(--color-accent)',
    'Controls secondary variant hover background.',
  ],
  [
    '--button-secondary-border-color',
    'var(--color-secondary)',
    'Controls secondary variant border color.',
  ],
  [
    '--button-secondary-color',
    'var(--color-secondary-foreground)',
    'Controls secondary variant text and icon color.',
  ],
  ['--button-size-icon-sm', 'var(--size-sm)', 'Controls `icon-sm` button size.'],
  ['--button-size-icon-md', 'var(--size-md)', 'Controls `icon-md` button size.'],
  ['--button-size-icon-lg', 'var(--size-lg)', 'Controls `icon-lg` button size.'],
  ['--button-size-xs', 'var(--size-xs)', 'Controls `xs` button min height.'],
  ['--button-size-sm', 'var(--size-sm)', 'Controls `sm` button min height.'],
  ['--button-size-md', 'var(--size-md)', 'Controls `md` button min height.'],
  ['--button-size-lg', 'var(--size-lg)', 'Controls `lg` button min height.'],
  ['--button-size-xl', 'var(--size-xl)', 'Controls `xl` button min height.'],
  [
    '--button-transition',
    'var(--transition-default)',
    'Controls transition timing for interactive states.',
  ],
];

export function ButtonExample(props: ComponentProps<typeof Button>) {
  return (
    <div className={styles.row}>
      <Button {...props}>{buttonLabels.basic}</Button>
    </div>
  );
}

export function ButtonVariantsExample() {
  return (
    <div className={styles.row}>
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  );
}

export function ButtonSizesExample() {
  return (
    <div className={styles.row}>
      {sizes.map((size) => (
        <Button key={size} size={size}>
          {size}
        </Button>
      ))}
      {iconSizes.map((item) => (
        <Button key={item.size} size={item.size} variant="outline" aria-label={item.label}>
          <StarIcon />
        </Button>
      ))}
    </div>
  );
}

export function ButtonIconExample() {
  return (
    <div className={styles.row}>
      <Button>
        <PlusIcon data-icon="inline-start" />
        {buttonLabels.create}
      </Button>
      <Button size="icon-md" variant="outline" aria-label={buttonLabels.favorite}>
        <StarIcon />
      </Button>
      <Button variant="link">
        {buttonLabels.link}
        <ArrowUpRightIcon data-icon="inline-end" />
      </Button>
    </div>
  );
}

export function ButtonDisabledExample() {
  return (
    <div className={styles.row}>
      <Button disabled>{buttonLabels.disabled}</Button>
      <Button asChild aria-disabled="true" variant="outline">
        <a href="#button" onClick={(event) => event.preventDefault()}>
          {buttonLabels.disabledLink}
        </a>
      </Button>
    </div>
  );
}

export function ButtonLinkCompositionExample() {
  return (
    <Button asChild variant="outline">
      <a href="#button">{buttonLabels.link}</a>
    </Button>
  );
}

export function ButtonRefExample() {
  const buttonRef = useRef<HTMLButtonElement>(null);

  return (
    <div className={styles.row}>
      <Button ref={buttonRef}>{buttonLabels.focusTarget}</Button>
      <Button variant="outline" onClick={() => buttonRef.current?.focus()}>
        {buttonLabels.focusTrigger}
      </Button>
    </div>
  );
}

export function ButtonLoadingExample() {
  const [pending, setPending] = useState(false);

  return (
    <Button
      loading={pending}
      onClick={() => {
        setPending(true);
        setTimeout(() => setPending(false), 1800);
      }}
    >
      {pending ? (
        <>
          <Spinner decorative size="sm" data-icon="inline-start" />
          {buttonLabels.loading}
        </>
      ) : (
        buttonLabels.loadingIdle
      )}
    </Button>
  );
}