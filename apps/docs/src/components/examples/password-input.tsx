import type { ComponentProps } from 'react';
import { Field, FieldDescription, FieldError, FieldLabel, PasswordInput } from 'moduix';
import { useState } from 'react';
import type { CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import { inputGroupOverrideCssProperties } from './input-group';

export function PasswordInputCssPropertiesPanel() {
  return (
    <>
      <p>
        `PasswordInput` does not add dedicated `--password-input-*` variables. Style it through the
        inherited grouped-field variables below.
      </p>
      <CSSPropertiesReferenceTable
        properties={inputGroupOverrideCssProperties.map(normalizeCssProperty)}
      />
    </>
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property))
    return { name: property[0], defaultValue: property[1], description: property[2] };
  return property;
}

export function PasswordInputExample(props: ComponentProps<typeof PasswordInput>) {
  return (
    <Field className="password-input-demo-field">
      <FieldLabel>Password</FieldLabel>
      <FieldDescription>Use at least 8 characters for production accounts.</FieldDescription>
      <PasswordInput autoComplete="current-password" placeholder="Enter your password" {...props} />
    </Field>
  );
}

export function ControlledPasswordInputExample() {
  const [value, setValue] = useState('');

  return (
    <Field className="password-input-demo-field">
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
    <Field className="password-input-demo-field">
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
    <div className="password-input-demo-stack">
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
    <div className="password-input-demo-stack">
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
    <Field className="password-input-demo-field" validationMode="onBlur">
      <FieldLabel>Password</FieldLabel>
      <PasswordInput required autoComplete="new-password" placeholder="Create a password" />
      <FieldError match="valueMissing">Please enter a password.</FieldError>
    </Field>
  );
}

export function CustomStylesPasswordInputExample() {
  return (
    <Field className="password-input-demo-field">
      <FieldLabel>Workspace password</FieldLabel>
      <PasswordInput
        className="password-input-demo-custom-password-input"
        placeholder="Custom password input"
      />
    </Field>
  );
}