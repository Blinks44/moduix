import { ArrowUpRightIcon, Button, PlusIcon, StarIcon, type ButtonProps } from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './button.module.css';

export const buttonOverrideCssProperties: CssPropertyInput[] = [
  ['--button-radius', 'var(--radius-md)', 'Controls button corner radius.'],
  ['--button-content-gap', 'var(--spacing-2)', 'Controls spacing between text and icons.'],
  ['--button-font-size', 'var(--text-sm)', 'Controls default button font size.'],
  ['--button-font-weight', 'var(--weight-medium)', 'Controls button font weight.'],
  ['--button-line-height', 'var(--line-height-text-sm)', 'Controls default line height.'],
  ['--button-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--button-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--button-transition', 'var(--transition-default)', 'Controls button transition timing.'],
  ['--button-icon-size', '1rem', 'Controls nested SVG icon size.'],
  ['--button-spinner-size', '0.875rem', 'Controls built-in spinner size.'],
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
  ['--button-outline-color', 'var(--color-foreground)', 'Controls outline variant color.'],
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
    'Controls secondary variant color.',
  ],
  ['--button-ghost-bg-hover', 'var(--color-accent)', 'Controls ghost variant hover background.'],
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
    'Controls destructive variant color.',
  ],
  [
    '--button-destructive-outline-bg',
    'var(--color-background)',
    'Controls destructive outline variant background.',
  ],
  [
    '--button-destructive-outline-bg-hover',
    'var(--color-destructive)',
    'Controls destructive outline variant hover background.',
  ],
  [
    '--button-destructive-outline-border-color',
    'var(--color-destructive)',
    'Controls destructive outline variant border color.',
  ],
  [
    '--button-destructive-outline-color',
    'var(--color-destructive)',
    'Controls destructive outline variant color.',
  ],
  ['--button-link-color', 'var(--color-primary)', 'Controls link variant color.'],
  ['--button-link-color-hover', 'var(--color-foreground)', 'Controls link variant hover color.'],
  ['--button-size-md', 'var(--size-lg)', 'Controls `md` button min height.'],
  ['--button-padding-x-md', '1rem', 'Controls `md` button horizontal padding.'],
  ['--button-padding-y-md', '0.5rem', 'Controls `md` button vertical padding.'],
  ['--button-size-icon-md', 'var(--size-lg)', 'Controls `icon-md` button size.'],
];

export const buttonPlaygroundCssProperties: CssPropertyInput[] = [
  ['--button-radius', 'var(--radius-md)', 'Controls button corner radius.'],
  ['--button-content-gap', 'var(--spacing-2)', 'Controls text and icon spacing.'],
  ['--button-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--button-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--button-transition', 'var(--transition-default)', 'Controls transition timing.'],
  ['--button-icon-size', '1rem', 'Controls nested SVG icon size.'],
  ['--button-spinner-size', '0.875rem', 'Controls built-in spinner size.'],
  ['--button-default-bg', 'var(--color-primary)', 'Controls default variant background.'],
  ['--button-default-color', 'var(--color-primary-foreground)', 'Controls default text color.'],
  ['--button-outline-bg', 'var(--color-background)', 'Controls outline variant background.'],
  ['--button-outline-color', 'var(--color-foreground)', 'Controls outline variant color.'],
];

export function ButtonCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-fd-muted-foreground">
        Full list of Button variables available for project-level overrides.
      </p>
      <CSSPropertiesReferenceTable
        properties={buttonOverrideCssProperties.map(normalizeCssProperty)}
      />
    </div>
  );
}

export function ButtonCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <div className="space-y-2">
      <p className="text-xs text-fd-muted-foreground">
        Interactive variables scoped for docs preview without overriding size preset tokens.
      </p>
      <CSSPropertiesEditor
        properties={buttonPlaygroundCssProperties.map(normalizeCssProperty)}
        values={values}
        onChange={onChange}
        onReset={onReset}
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

export function ButtonExample(props: ButtonProps) {
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

export function ButtonLoadingExample() {
  const [loading, setLoading] = React.useState(false);

  return (
    <Button
      loading={loading}
      loadingText="Saving"
      onClick={() => {
        setLoading(true);
        setTimeout(() => setLoading(false), 1800);
      }}
    >
      Save Changes
    </Button>
  );
}

export function ButtonCustomLoadingIndicatorExample() {
  return (
    <Button
      loading
      loadingText="Syncing"
      variant="outline"
      loadingIndicator={<StarIcon className={styles.customLoadingIndicator} />}
    >
      Sync
    </Button>
  );
}

export function CustomStylesButtonExample() {
  return (
    <Button
      className={styles.customButton}
      classNames={{
        content: styles.customButtonContent,
        loadingIndicator: styles.customLoadingIndicatorColor,
        spinner: styles.customSpinner,
      }}
      loading
      loadingText="Publishing"
    >
      Publish
    </Button>
  );
}