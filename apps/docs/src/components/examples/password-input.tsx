import type { ComponentProps } from 'react';
import { Field, FieldDescription, FieldError, FieldLabel, PasswordInput } from 'moduix';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './password-input.module.css';

export const passwordInputOverrideCssProperties: CssPropertyInput[] = [
  [
    '--input-group-bg',
    'var(--color-background)',
    'Controls the grouped password field background color.',
  ],
  [
    '--input-group-border-color',
    'var(--color-border)',
    'Controls the grouped password field border color.',
  ],
  [
    '--input-group-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid border and focus ring color.',
  ],
  [
    '--input-group-button-color',
    'var(--color-foreground)',
    'Controls the password toggle button color.',
  ],
  [
    '--input-group-focus-ring-color',
    'var(--color-ring)',
    'Controls the grouped field focus ring color.',
  ],
  ['--input-group-height', 'var(--input-group-height-md)', 'Controls the default field height.'],
  ['--input-group-height-xs', 'var(--size-sm)', 'Controls height for `xs`.'],
  ['--input-group-height-sm', '2rem', 'Controls height for `sm`.'],
  ['--input-group-height-md', 'var(--size-lg)', 'Controls height for `md`.'],
  ['--input-group-height-lg', 'var(--size-xl)', 'Controls height for `lg`.'],
  ['--input-group-height-xl', '3rem', 'Controls height for `xl`.'],
  ['--input-group-icon-size', '1rem', 'Controls the visibility toggle icon size.'],
  [
    '--input-group-input-padding-x',
    '0.875rem',
    'Controls default input inline padding inside the shell.',
  ],
  ['--input-group-input-padding-y', '0.5rem', 'Controls default input block padding.'],
  ['--input-group-radius', 'var(--radius-md)', 'Controls the grouped field corner radius.'],
  [
    '--input-group-separator-color',
    'var(--color-border)',
    'Controls the separator color before the toggle button.',
  ],
  ['--input-group-width', '100%', 'Controls the grouped password field width.'],
];

export const passwordInputPlaygroundCssProperties: CssPropertyInput[] = [
  [
    '--input-group-bg',
    'var(--color-background)',
    'Controls the grouped password field background color.',
  ],
  [
    '--input-group-border-color',
    'var(--color-border)',
    'Controls the grouped password field border color.',
  ],
  [
    '--input-group-button-color',
    'var(--color-foreground)',
    'Controls the password toggle button color.',
  ],
  [
    '--input-group-focus-ring-color',
    'var(--color-ring)',
    'Controls the grouped field focus ring color.',
  ],
  ['--input-group-height', 'var(--input-group-height-md)', 'Controls the default field height.'],
  ['--input-group-icon-size', '1rem', 'Controls the visibility toggle icon size.'],
  ['--input-group-radius', 'var(--radius-md)', 'Controls the grouped field corner radius.'],
];

export function PasswordInputCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <>
      <p>
        `PasswordInput` does not add dedicated `--password-input-*` variables. Style it through the
        inherited grouped-field variables below.
      </p>
      <CSSPropertiesReferenceTable
        properties={passwordInputOverrideCssProperties.map(normalizeCssProperty)}
      />
    </>
  );
}

export function PasswordInputCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={passwordInputPlaygroundCssProperties.map(normalizeCssProperty)}
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

export function PasswordInputExample(props: ComponentProps<typeof PasswordInput>) {
  return (
    <Field className={styles.field}>
      <FieldLabel>Password</FieldLabel>
      <FieldDescription>Use at least 8 characters for production accounts.</FieldDescription>
      <PasswordInput autoComplete="current-password" placeholder="Enter your password" {...props} />
    </Field>
  );
}

export function ControlledPasswordInputExample() {
  const [value, setValue] = useState('');

  return (
    <Field className={styles.field}>
      <FieldLabel>Workspace password</FieldLabel>
      <PasswordInput
        autoComplete="new-password"
        onValueChange={setValue}
        placeholder="Type to control value"
        value={value}
      />
    </Field>
  );
}

export function PasswordInputDefaultVisibleExample() {
  return (
    <Field className={styles.field}>
      <FieldLabel>Temporary password</FieldLabel>
      <PasswordInput
        defaultValue="S3cur3!"
        defaultVisible
        visibilityToggleLabels={{
          show: 'Reveal temporary password',
          hide: 'Mask temporary password',
        }}
      />
    </Field>
  );
}

export function PasswordInputSizesExample() {
  return (
    <div className={styles.stack}>
      <PasswordInput size="xs" aria-label="Extra-small password input" placeholder="Extra-small" />
      <PasswordInput size="sm" aria-label="Small password input" placeholder="Small" />
      <PasswordInput size="md" aria-label="Medium password input" placeholder="Medium" />
      <PasswordInput size="lg" aria-label="Large password input" placeholder="Large" />
      <PasswordInput size="xl" aria-label="Extra-large password input" placeholder="Extra-large" />
    </div>
  );
}

export function DisabledAndReadOnlyPasswordInputExample() {
  return (
    <div className={styles.stack}>
      <PasswordInput disabled aria-label="Disabled password input" defaultValue="secret-value" />
      <PasswordInput
        readOnly
        aria-label="Read-only password input"
        defaultValue="readonly-secret"
      />
    </div>
  );
}

export function PasswordInputFieldValidationExample() {
  return (
    <Field className={styles.field} validationMode="onBlur">
      <FieldLabel>Password</FieldLabel>
      <PasswordInput required autoComplete="new-password" placeholder="Create a password" />
      <FieldError match="valueMissing">Please enter a password.</FieldError>
    </Field>
  );
}

export function CustomStylesPasswordInputExample() {
  return (
    <Field className={styles.field}>
      <FieldLabel>Workspace password</FieldLabel>
      <PasswordInput className={styles.customPasswordInput} placeholder="Custom password input" />
    </Field>
  );
}