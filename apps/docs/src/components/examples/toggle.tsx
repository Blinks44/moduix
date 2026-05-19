import { BellIcon, CheckSmallIcon, StarIcon, Toggle, type ToggleProps } from 'moduix';
import * as React from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './toggle.module.css';

export const toggleOverrideCssProperties: CssPropertyInput[] = [
  ['--toggle-border-width', 'var(--border-width-sm)', 'Controls toggle border width.'],
  ['--toggle-color', 'var(--color-foreground)', 'Controls base toggle text and icon color.'],
  ['--toggle-content-gap', 'var(--spacing-2)', 'Controls spacing between text and icons.'],
  ['--toggle-default-bg', 'transparent', 'Controls default variant background.'],
  ['--toggle-default-bg-active', 'var(--color-accent)', 'Controls default active background.'],
  ['--toggle-default-bg-hover', 'var(--color-accent)', 'Controls default hover background.'],
  ['--toggle-default-bg-pressed', 'var(--color-primary)', 'Controls pressed background.'],
  ['--toggle-default-border-color', 'transparent', 'Controls default variant border color.'],
  [
    '--toggle-default-border-color-pressed',
    'var(--color-primary)',
    'Controls pressed border color.',
  ],
  ['--toggle-default-color', 'var(--color-foreground)', 'Controls default variant text color.'],
  [
    '--toggle-default-color-pressed',
    'var(--color-primary-foreground)',
    'Controls pressed text and icon color.',
  ],
  ['--toggle-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--toggle-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--toggle-focus-ring-offset', '-1px', 'Controls focus ring offset.'],
  ['--toggle-focus-ring-width', 'var(--border-width-md)', 'Controls focus ring width.'],
  ['--toggle-font-size', 'var(--text-sm)', 'Controls base font size.'],
  ['--toggle-font-size-xs', 'var(--text-xs)', 'Controls extra-small font size.'],
  ['--toggle-font-size-lg', 'var(--text-md)', 'Controls large font size.'],
  ['--toggle-font-weight', 'var(--weight-medium)', 'Controls toggle font weight.'],
  ['--toggle-ghost-bg', 'transparent', 'Controls ghost variant background.'],
  ['--toggle-ghost-bg-active', 'var(--color-accent)', 'Controls ghost variant active background.'],
  ['--toggle-ghost-bg-hover', 'var(--color-accent)', 'Controls ghost variant hover background.'],
  ['--toggle-ghost-bg-pressed', 'var(--color-accent)', 'Controls ghost pressed background.'],
  ['--toggle-ghost-border-color', 'transparent', 'Controls ghost variant border color.'],
  ['--toggle-ghost-color', 'var(--color-foreground)', 'Controls ghost variant text color.'],
  [
    '--toggle-ghost-color-pressed',
    'var(--color-foreground)',
    'Controls ghost pressed text and icon color.',
  ],
  ['--toggle-icon-size', '1rem', 'Controls nested SVG icon size.'],
  ['--toggle-line-height', 'var(--line-height-text-sm)', 'Controls base line height.'],
  ['--toggle-line-height-xs', 'var(--line-height-text-xs)', 'Controls extra-small line height.'],
  ['--toggle-line-height-lg', 'var(--line-height-text-md)', 'Controls large line height.'],
  ['--toggle-outline-bg', 'var(--color-background)', 'Controls outline variant background.'],
  ['--toggle-outline-bg-active', 'var(--color-accent)', 'Controls outline active background.'],
  ['--toggle-outline-bg-hover', 'var(--color-accent)', 'Controls outline hover background.'],
  ['--toggle-outline-bg-pressed', 'var(--color-primary)', 'Controls outline pressed background.'],
  ['--toggle-outline-border-color', 'var(--color-border)', 'Controls outline border color.'],
  [
    '--toggle-outline-border-color-pressed',
    'var(--color-primary)',
    'Controls outline pressed border color.',
  ],
  ['--toggle-outline-color', 'var(--color-foreground)', 'Controls outline text color.'],
  [
    '--toggle-outline-color-pressed',
    'var(--color-primary-foreground)',
    'Controls outline pressed text color.',
  ],
  ['--toggle-padding-x-xs', '0.625rem', 'Controls extra-small horizontal padding.'],
  ['--toggle-padding-x-sm', '0.75rem', 'Controls small horizontal padding.'],
  ['--toggle-padding-x-md', '1rem', 'Controls medium horizontal padding.'],
  ['--toggle-padding-x-lg', '1.25rem', 'Controls large horizontal padding.'],
  ['--toggle-padding-y-xs', '0.25rem', 'Controls extra-small vertical padding.'],
  ['--toggle-padding-y-sm', '0.375rem', 'Controls small vertical padding.'],
  ['--toggle-padding-y-md', '0.5rem', 'Controls medium vertical padding.'],
  ['--toggle-padding-y-lg', '0.625rem', 'Controls large vertical padding.'],
  ['--toggle-radius', 'var(--radius-md)', 'Controls toggle corner radius.'],
  ['--toggle-size-icon-sm', 'var(--size-sm)', 'Controls small icon-only toggle size.'],
  ['--toggle-size-icon-md', 'var(--size-lg)', 'Controls medium icon-only toggle size.'],
  ['--toggle-size-icon-lg', 'var(--size-xl)', 'Controls large icon-only toggle size.'],
  ['--toggle-size-xs', 'var(--size-xs)', 'Controls extra-small toggle height.'],
  ['--toggle-size-sm', 'var(--size-sm)', 'Controls small toggle height.'],
  ['--toggle-size-md', 'var(--size-lg)', 'Controls medium toggle height.'],
  ['--toggle-size-lg', 'var(--size-xl)', 'Controls large toggle height.'],
  ['--toggle-transition', 'var(--transition-default)', 'Controls state transition timing.'],
];
export const togglePlaygroundCssProperties: CssPropertyInput[] = [
  ['--toggle-default-bg', 'transparent', 'Controls default variant background.'],
  [
    '--toggle-default-bg-hover',
    'var(--color-accent)',
    'Controls default variant hover background.',
  ],
  ['--toggle-default-bg-pressed', 'var(--color-primary)', 'Controls pressed background.'],
  ['--toggle-default-color', 'var(--color-foreground)', 'Controls default variant text color.'],
  [
    '--toggle-default-color-pressed',
    'var(--color-primary-foreground)',
    'Controls pressed text color.',
  ],
  ['--toggle-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--toggle-icon-size', '1rem', 'Controls nested SVG icon size.'],
  ['--toggle-radius', 'var(--radius-md)', 'Controls toggle corner radius.'],
];

export function ToggleCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={toggleOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function ToggleCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={togglePlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

function BookmarkIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="none" aria-hidden="true" focusable="false" {...props}>
      <path
        d="M4.5 2.75h7v10.5L8 11l-3.5 2.25V2.75Z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function BookmarkFilledIcon(props: React.ComponentProps<'svg'>) {
  return (
    <svg viewBox="0 0 16 16" fill="currentColor" aria-hidden="true" focusable="false" {...props}>
      <path d="M4 2.75A.75.75 0 0 1 4.75 2h6.5a.75.75 0 0 1 .75.75v10.5a.75.75 0 0 1-1.16.63L8 12.03l-2.84 1.85A.75.75 0 0 1 4 13.25V2.75Z" />
    </svg>
  );
}

export function ToggleExample(props: ToggleProps) {
  return (
    <Toggle defaultPressed {...props}>
      <StarIcon />
      Favorite
    </Toggle>
  );
}

export function ToggleVariantsExample() {
  return (
    <div className={styles.row}>
      <Toggle>Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle variant="ghost">Ghost</Toggle>
      <Toggle defaultPressed>Pressed</Toggle>
    </div>
  );
}

export function ToggleSizesExample() {
  return (
    <div className={styles.row}>
      <Toggle size="xs">Extra-small</Toggle>
      <Toggle size="sm">Small</Toggle>
      <Toggle size="md">Medium</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  );
}

export function ToggleIconExample() {
  return (
    <div className={styles.row}>
      <Toggle variant="outline">
        <BellIcon />
        Alerts
      </Toggle>
      <Toggle size="icon-md" variant="outline" aria-label="Favorites">
        <StarIcon />
      </Toggle>
      <Toggle size="icon-md" variant="ghost" aria-label="Enabled" defaultPressed>
        <CheckSmallIcon />
      </Toggle>
    </div>
  );
}

export function ToggleDisabledExample() {
  return (
    <div className={styles.row}>
      <Toggle disabled>Disabled</Toggle>
      <Toggle defaultPressed disabled>
        Pressed
      </Toggle>
    </div>
  );
}

export function ControlledToggleExample() {
  const [pressed, setPressed] = React.useState(false);

  return (
    <div className={styles.stack}>
      <Toggle pressed={pressed} onPressedChange={setPressed}>
        <BellIcon />
        {pressed ? 'Notifications on' : 'Notifications off'}
      </Toggle>
      <span className={styles.hint}>Current value: {String(pressed)}</span>
    </div>
  );
}

export function ToggleRenderCallbackExample() {
  return (
    <Toggle
      aria-label="Save article"
      size="icon-md"
      variant="outline"
      render={(buttonProps, state) => (
        <button type="button" {...buttonProps}>
          {state.pressed ? (
            <BookmarkFilledIcon className={styles.customIcon} />
          ) : (
            <BookmarkIcon className={styles.customIcon} />
          )}
        </button>
      )}
    />
  );
}

export function ToggleClassNameExample() {
  return (
    <Toggle className={styles.customToggle} variant="outline" defaultPressed>
      <CheckSmallIcon />
      Styled with className
    </Toggle>
  );
}

export { ToggleClassNameExample as CustomStylesToggleExample };