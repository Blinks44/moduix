import {
  Checkbox,
  CheckboxIndicator,
  Field,
  FieldControl,
  FieldDescription,
  FieldError,
  FieldItem,
  FieldLabel,
  FieldValidity,
  Input,
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  Radio,
  RadioField,
  RadioGroup,
  RadioIndicator,
  RadioLabel,
  Switch,
  SwitchLabel,
  type FieldProps,
} from 'moduix';
import * as React from 'react';
import type { CssPropertyInput } from '../preview';
import styles from './field.module.css';

export const fieldCssProperties: CssPropertyInput[] = [
  ['--field-width', '100%', 'Controls the root field width.'],
  ['--field-max-width', 'none', 'Controls the root field max width.'],
  ['--field-gap', 'var(--spacing-1)', 'Controls spacing between field parts.'],
  ['--field-color', 'var(--color-foreground)', 'Controls inherited field text color.'],
  ['--field-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled slot opacity.'],
  ['--field-item-gap', 'var(--spacing-1)', 'Controls spacing inside `FieldItem`.'],
  ['--field-label-gap', 'var(--spacing-2)', 'Controls spacing inside `FieldLabel`.'],
  ['--field-label-color', 'var(--color-foreground)', 'Controls label text color.'],
  ['--field-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--field-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--field-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  [
    '--field-description-color',
    'var(--color-muted-foreground)',
    'Controls description text color.',
  ],
  ['--field-description-font-size', 'var(--text-sm)', 'Controls description font size.'],
  [
    '--field-description-line-height',
    'var(--line-height-text-sm)',
    'Controls description line height.',
  ],
  ['--field-error-color', 'var(--color-destructive)', 'Controls error text color.'],
  ['--field-error-font-size', 'var(--text-sm)', 'Controls error font size.'],
  ['--field-error-line-height', 'var(--line-height-text-sm)', 'Controls error line height.'],
  ['--field-control-width', '100%', 'Controls `FieldControl` width.'],
  ['--field-control-height', 'var(--size-lg)', 'Controls `FieldControl` minimum height.'],
  ['--field-control-bg', 'var(--color-background)', 'Controls `FieldControl` background.'],
  ['--field-control-color', 'var(--color-foreground)', 'Controls `FieldControl` text color.'],
  ['--field-control-border-color', 'var(--color-border)', 'Controls `FieldControl` border color.'],
  [
    '--field-control-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid `FieldControl` border and focus ring color.',
  ],
  ['--field-control-radius', 'var(--radius-md)', 'Controls `FieldControl` corner radius.'],
  ['--field-control-padding-x', '0.875rem', 'Controls `FieldControl` horizontal padding.'],
  ['--field-control-padding-y', '0.5rem', 'Controls `FieldControl` vertical padding.'],
  ['--field-control-font-size', 'var(--text-md)', 'Controls `FieldControl` font size.'],
  [
    '--field-control-line-height',
    'var(--line-height-text-md)',
    'Controls `FieldControl` line height.',
  ],
  [
    '--field-control-placeholder-color',
    'var(--color-muted-foreground)',
    'Controls `FieldControl` placeholder color.',
  ],
  [
    '--field-control-transition',
    'var(--transition-default)',
    'Controls `FieldControl` state transition timing.',
  ],
  ['--field-focus-ring-color', 'var(--color-ring)', 'Controls `FieldControl` focus ring color.'],
];

export function FieldExample(props: FieldProps) {
  return (
    <Field validationMode="onBlur" className={styles.field} {...props}>
      <FieldLabel>Name</FieldLabel>
      <FieldControl required placeholder="Enter your name" />
      <FieldError match="valueMissing">Please enter your name.</FieldError>
      <FieldDescription>Visible on your public profile.</FieldDescription>
    </Field>
  );
}

export function FieldCustomValidationExample() {
  return (
    <Field
      validationMode="onChange"
      validate={(value) => {
        if (typeof value !== 'string' || value.length < 3) {
          return 'Username must be at least 3 characters.';
        }

        return null;
      }}
      className={styles.field}
    >
      <FieldLabel>Username</FieldLabel>
      <FieldControl placeholder="e.g. Vinny" />
      <FieldError match="customError" />
      <FieldValidity>
        {(state) => (
          <p className={styles.helper}>
            {state.validity.valid ? 'Looks good.' : 'Waiting for valid value.'}
          </p>
        )}
      </FieldValidity>
    </Field>
  );
}

export function FieldDisabledExample() {
  return (
    <Field disabled className={styles.field}>
      <FieldLabel>Organization</FieldLabel>
      <FieldControl placeholder="Acme Inc." />
      <FieldDescription>This field is currently managed by your workspace.</FieldDescription>
    </Field>
  );
}

export function FieldCheckboxExample() {
  return (
    <Field validationMode="onBlur" className={styles.field}>
      <FieldLabel>
        <Checkbox required name="terms">
          <CheckboxIndicator />
        </Checkbox>
        I agree to the terms
      </FieldLabel>
      <FieldError match="valueMissing">Please accept the terms.</FieldError>
      <FieldDescription>Required to continue.</FieldDescription>
    </Field>
  );
}

export function FieldRadioExample() {
  return (
    <Field name="account-type" validationMode="onBlur" className={styles.field}>
      <FieldLabel>Account type</FieldLabel>
      <RadioGroup>
        <FieldItem>
          <RadioField>
            <Radio value="personal" required>
              <RadioIndicator />
            </Radio>
            <RadioLabel>Personal account</RadioLabel>
          </RadioField>
        </FieldItem>
        <FieldItem>
          <RadioField>
            <Radio value="team">
              <RadioIndicator />
            </Radio>
            <RadioLabel>Team account</RadioLabel>
          </RadioField>
        </FieldItem>
      </RadioGroup>
      <FieldError match="valueMissing">Please choose an account type.</FieldError>
    </Field>
  );
}

export function FieldSwitchExample() {
  return (
    <Field name="newsletter" className={styles.field}>
      <FieldLabel>
        <Switch />
        <SwitchLabel>Subscribe to newsletter</SwitchLabel>
      </FieldLabel>
      <FieldDescription>We send updates once per week.</FieldDescription>
    </Field>
  );
}

export function FieldInputExample() {
  return (
    <Field validationMode="onBlur" className={styles.field}>
      <FieldLabel>Email</FieldLabel>
      <Input required type="email" placeholder="name@example.com" />
      <FieldError match="valueMissing">Please enter your email.</FieldError>
      <FieldError match="typeMismatch">Enter a valid email address.</FieldError>
    </Field>
  );
}

export function FieldNumberFieldExample() {
  const id = React.useId();

  return (
    <Field name="quantity" validationMode="onBlur" className={styles.field}>
      <FieldLabel htmlFor={id}>Items</FieldLabel>
      <NumberField id={id} min={1} max={10} required>
        <NumberFieldGroup>
          <NumberFieldDecrement aria-label="Decrease value" />
          <NumberFieldInput />
          <NumberFieldIncrement aria-label="Increase value" />
        </NumberFieldGroup>
      </NumberField>
      <FieldError match="valueMissing">Please provide a number.</FieldError>
      <FieldError match="rangeUnderflow">Value should be at least 1.</FieldError>
      <FieldError match="rangeOverflow">Value should be at most 10.</FieldError>
    </Field>
  );
}

export function FieldCustomStylesExample() {
  return (
    <Field validationMode="onBlur" className={styles.customField}>
      <FieldLabel className={styles.customLabel}>Project key</FieldLabel>
      <FieldControl required placeholder="MAPS" className={styles.customControl} />
      <FieldDescription className={styles.customDescription}>
        Use three to five uppercase letters.
      </FieldDescription>
      <FieldError className={styles.customError} match="valueMissing">
        Please enter a project key.
      </FieldError>
    </Field>
  );
}