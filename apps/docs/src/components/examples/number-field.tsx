import {
  ChevronDownIcon,
  ChevronUpIcon,
  Field,
  FieldError,
  FieldLabel,
  NumberField,
  NumberFieldDecrement,
  NumberFieldGroup,
  NumberFieldIncrement,
  NumberFieldInput,
  NumberFieldScrubArea,
  type NumberFieldProps,
} from 'moduix';
import * as React from 'react';
import type { CssPropertyInput } from '../preview';
import styles from './number-field.module.css';

export const numberFieldCssProperties: CssPropertyInput[] = [
  ['--number-field-width', 'auto', 'Controls the root number field width.'],
  ['--number-field-max-width', 'none', 'Controls the root number field max width.'],
  ['--number-field-gap', 'var(--spacing-1)', 'Controls spacing between number field parts.'],
  ['--number-field-control-height', 'var(--size-lg)', 'Controls input and button height.'],
  ['--number-field-radius', 'var(--radius-md)', 'Controls the outer control corner radius.'],
  ['--number-field-border-color', 'var(--color-border)', 'Controls default border color.'],
  [
    '--number-field-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid input border and focus ring color.',
  ],
  ['--number-field-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--number-field-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--number-field-button-bg', 'var(--color-background)', 'Controls button background.'],
  ['--number-field-button-bg-hover', 'var(--color-accent)', 'Controls button background on hover.'],
  [
    '--number-field-button-bg-active',
    'var(--number-field-button-bg-hover)',
    'Controls button background while pressed.',
  ],
  ['--number-field-button-color', 'var(--color-foreground)', 'Controls button icon color.'],
  ['--number-field-icon-size', '0.875rem', 'Controls button icon size.'],
  ['--number-field-input-width', '6rem', 'Controls input width.'],
  ['--number-field-input-bg', 'var(--color-background)', 'Controls input background.'],
  ['--number-field-input-color', 'var(--color-foreground)', 'Controls input text color.'],
  ['--number-field-input-font-size', 'var(--text-md)', 'Controls input font size.'],
  ['--number-field-input-line-height', 'var(--line-height-text-md)', 'Controls input line height.'],
  ['--number-field-input-padding-x', '0.75rem', 'Controls input horizontal padding.'],
  ['--number-field-input-padding-y', '0.5rem', 'Controls input vertical padding.'],
  ['--number-field-scrub-area-color', 'var(--color-foreground)', 'Controls scrub area text color.'],
  ['--number-field-scrub-area-gap', 'var(--spacing-2)', 'Controls scrub area spacing.'],
  ['--number-field-scrub-area-cursor-size', '1.5rem', 'Controls custom scrub cursor size.'],
];

export function NumberFieldExample(props: NumberFieldProps) {
  const id = React.useId();

  return (
    <Field className={styles.field}>
      <FieldLabel htmlFor={id}>Amount</FieldLabel>
      <NumberField id={id} defaultValue={100} {...props}>
        <NumberFieldGroup>
          <NumberFieldDecrement aria-label="Decrease value" />
          <NumberFieldInput />
          <NumberFieldIncrement aria-label="Increase value" />
        </NumberFieldGroup>
      </NumberField>
    </Field>
  );
}

export function ControlledNumberFieldExample() {
  const id = React.useId();
  const [value, setValue] = React.useState<number | null>(24);

  return (
    <div className={styles.stack}>
      <Field className={styles.field}>
        <FieldLabel htmlFor={id}>Controlled value</FieldLabel>
        <NumberField id={id} value={value} onValueChange={setValue}>
          <NumberFieldGroup>
            <NumberFieldDecrement aria-label="Decrease value" />
            <NumberFieldInput />
            <NumberFieldIncrement aria-label="Increase value" />
          </NumberFieldGroup>
        </NumberField>
      </Field>
      <span className={styles.hint}>Current value: {value ?? 'empty'}</span>
    </div>
  );
}

export function NumberFieldScrubAreaExample() {
  const id = React.useId();

  return (
    <Field className={styles.field}>
      <NumberField id={id} defaultValue={250}>
        <NumberFieldScrubArea classNames={{ cursor: styles.scrubCursor }}>
          <FieldLabel htmlFor={id}>Drag to scrub</FieldLabel>
        </NumberFieldScrubArea>
        <NumberFieldGroup>
          <NumberFieldDecrement aria-label="Decrease value" />
          <NumberFieldInput />
          <NumberFieldIncrement aria-label="Increase value" />
        </NumberFieldGroup>
      </NumberField>
    </Field>
  );
}

export function FormattedNumberFieldExample() {
  const id = React.useId();

  return (
    <Field className={styles.field}>
      <FieldLabel htmlFor={id}>Price</FieldLabel>
      <NumberField
        id={id}
        defaultValue={1250}
        min={0}
        step={50}
        format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
      >
        <NumberFieldGroup>
          <NumberFieldDecrement aria-label="Decrease value" />
          <NumberFieldInput />
          <NumberFieldIncrement aria-label="Increase value" />
        </NumberFieldGroup>
      </NumberField>
    </Field>
  );
}

export function NumberFieldValidationExample() {
  const id = React.useId();

  return (
    <Field name="quantity" validationMode="onBlur" className={styles.validationField}>
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

export function CustomIconsNumberFieldExample() {
  const id = React.useId();

  return (
    <Field className={styles.field}>
      <FieldLabel htmlFor={id}>Floors</FieldLabel>
      <NumberField id={id} defaultValue={8}>
        <NumberFieldGroup>
          <NumberFieldDecrement aria-label="Decrease value" className={styles.customButton}>
            <ChevronDownIcon />
          </NumberFieldDecrement>
          <NumberFieldInput className={styles.customInput} />
          <NumberFieldIncrement aria-label="Increase value" className={styles.customButton}>
            <ChevronUpIcon />
          </NumberFieldIncrement>
        </NumberFieldGroup>
      </NumberField>
    </Field>
  );
}