import type { ComponentProps } from 'react';
import { ArrowUpRightIcon, Button, PlusIcon, Spinner, StarIcon } from 'moduix';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './button.module.css';

const buttonCssProperties: CssPropertyInput[] = [
  ['--button-border-width', 'var(--border-width-sm)', 'Controls base button border width.'],
  ['--button-color', 'var(--color-foreground)', 'Controls base button text and icon color.'],
  ['--button-content-gap', 'var(--spacing-2)', 'Controls spacing between text and icons.'],
  ['--button-default-bg', 'var(--color-primary)', 'Controls default variant background.'],
  [
    '--button-default-bg-hover',
    'var(--color-foreground)',
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
    'var(--color-primary-foreground)',
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
    'var(--button-destructive-color)',
    'Controls destructive-outline variant hover text and icon color.',
  ],
  ['--button-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled state opacity.'],
  ['--button-focus-ring-color', 'var(--color-ring)', 'Controls focus-visible outline color.'],
  [
    '--button-focus-ring-offset',
    'var(--button-border-width)',
    'Controls focus-visible outline offset.',
  ],
  ['--button-focus-ring-width', 'var(--border-width-md)', 'Controls focus-visible outline width.'],
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
  ['--button-icon-size', '1rem', 'Controls nested SVG icon size.'],
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
  ['--button-padding-x-xs', '0.625rem', 'Controls `xs` button horizontal padding.'],
  ['--button-padding-x-sm', '0.75rem', 'Controls `sm` button horizontal padding.'],
  ['--button-padding-x-md', '1rem', 'Controls `md` button horizontal padding.'],
  ['--button-padding-x-lg', '1.25rem', 'Controls `lg` button horizontal padding.'],
  ['--button-padding-x-xl', '1.5rem', 'Controls `xl` button horizontal padding.'],
  ['--button-padding-y-xs', '0.25rem', 'Controls `xs` button vertical padding.'],
  ['--button-padding-y-sm', '0.375rem', 'Controls `sm` button vertical padding.'],
  ['--button-padding-y-md', '0.5rem', 'Controls `md` button vertical padding.'],
  ['--button-padding-y-lg', '0.625rem', 'Controls `lg` button vertical padding.'],
  ['--button-padding-y-xl', '0.75rem', 'Controls `xl` button vertical padding.'],
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
  ['--button-size-icon-md', 'var(--size-lg)', 'Controls `icon-md` button size.'],
  ['--button-size-icon-lg', 'var(--size-xl)', 'Controls `icon-lg` button size.'],
  ['--button-size-xs', 'var(--size-xs)', 'Controls `xs` button min height.'],
  ['--button-size-sm', 'var(--size-sm)', 'Controls `sm` button min height.'],
  ['--button-size-md', 'var(--size-lg)', 'Controls `md` button min height.'],
  ['--button-size-lg', 'var(--size-xl)', 'Controls `lg` button min height.'],
  ['--button-size-xl', '3.5rem', 'Controls `xl` button min height.'],
  [
    '--button-transition',
    'var(--transition-default)',
    'Controls transition timing for interactive states.',
  ],
];

export const buttonOverrideCssProperties: CssPropertyInput[] = buttonCssProperties;

export function ButtonCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <CSSPropertiesReferenceTable
        properties={buttonOverrideCssProperties.map(normalizeCssProperty)}
      />
    </div>
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

export function ButtonExample(props: ComponentProps<typeof Button>) {
  return <Button {...props}>Save Changes</Button>;
}

export function ButtonVariantsExample() {
  return (
    <div className={styles.row}>
      <Button>Default</Button>
      <Button variant="outline">Outline</Button>
      <Button variant="secondary">Secondary</Button>
      <Button variant="destructive">Destructive</Button>
      <Button variant="destructive-outline">Destructive Outline</Button>
      <Button variant="ghost">Ghost</Button>
      <Button variant="link">Link</Button>
    </div>
  );
}

export function ButtonSizesExample() {
  return (
    <div className={styles.row}>
      <Button size="xs">Extra-small</Button>
      <Button size="sm">Small</Button>
      <Button size="md">Medium</Button>
      <Button size="lg">Large</Button>
      <Button size="xl">Extra-large</Button>
      <Button size="icon-sm" variant="outline" aria-label="Small favorite">
        <StarIcon />
      </Button>
      <Button size="icon-md" variant="outline" aria-label="Favorite">
        <StarIcon />
      </Button>
      <Button size="icon-lg" variant="outline" aria-label="Large favorite">
        <StarIcon />
      </Button>
    </div>
  );
}

export function ButtonIconExample() {
  return (
    <div className={styles.row}>
      <Button>
        <PlusIcon />
        Create Item
      </Button>
      <Button size="icon-md" variant="outline" aria-label="Favorites">
        <StarIcon />
      </Button>
      <Button variant="link">
        Open Docs
        <ArrowUpRightIcon />
      </Button>
    </div>
  );
}

export function ButtonDisabledExample() {
  return (
    <div className={styles.row}>
      <Button disabled>Disabled</Button>
      <Button disabled focusableWhenDisabled variant="outline">
        Focusable Disabled
      </Button>
    </div>
  );
}

export function ButtonLinkCompositionExample() {
  return (
    <Button render={<a href="#button" />} nativeButton={false} variant="outline">
      Open Button Docs
    </Button>
  );
}

export function ButtonLoadingExample() {
  const [pending, setPending] = useState(false);

  return (
    <Button
      disabled={pending}
      focusableWhenDisabled
      aria-busy={pending || undefined}
      onClick={() => {
        setPending(true);
        setTimeout(() => setPending(false), 1800);
      }}
    >
      {pending ? (
        <>
          <Spinner decorative size="sm" />
          Saving
        </>
      ) : (
        'Save Changes'
      )}
    </Button>
  );
}

export function CustomCompositionButtonExample() {
  return (
    <Button className={styles.customButton} disabled focusableWhenDisabled aria-busy>
      <Spinner decorative size="sm" className={styles.customSpinner} />
      Publishing
    </Button>
  );
}