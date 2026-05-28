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
  NumberFieldRoot,
  NumberFieldScrubArea,
  NumberFieldScrubAreaCursor,
} from 'moduix';
import { useId, useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './number-field.module.css';

export const numberFieldOverrideCssProperties: CssPropertyInput[] = [
  ['--number-field-border-color', 'var(--color-border)', 'Controls default border color.'],
  [
    '--number-field-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid input border and focus ring color.',
  ],
  ['--number-field-border-style', 'solid', 'Controls border style for buttons and input.'],
  [
    '--number-field-border-width',
    'var(--border-width-sm)',
    'Controls border width for buttons and input.',
  ],
  ['--number-field-button-bg', 'var(--color-background)', 'Controls button background.'],
  [
    '--number-field-button-bg-active',
    'var(--number-field-button-bg-hover)',
    'Controls button background while pressed.',
  ],
  ['--number-field-button-bg-hover', 'var(--color-accent)', 'Controls button background on hover.'],
  ['--number-field-button-color', 'var(--color-foreground)', 'Controls button icon color.'],
  ['--number-field-control-height', 'var(--size-lg)', 'Controls input and button height.'],
  ['--number-field-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--number-field-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  [
    '--number-field-focus-ring-width',
    'var(--number-field-border-width)',
    'Controls focus ring width.',
  ],
  ['--number-field-gap', 'var(--spacing-1)', 'Controls spacing between number field parts.'],
  ['--number-field-icon-size', '0.875rem', 'Controls button icon size.'],
  ['--number-field-input-bg', 'var(--color-background)', 'Controls input background.'],
  ['--number-field-input-color', 'var(--color-foreground)', 'Controls input text color.'],
  ['--number-field-input-font-size', 'var(--text-md)', 'Controls input font size.'],
  ['--number-field-input-line-height', 'var(--line-height-text-md)', 'Controls input line height.'],
  ['--number-field-input-padding-x', '0.75rem', 'Controls input horizontal padding.'],
  ['--number-field-input-padding-y', '0.5rem', 'Controls input vertical padding.'],
  ['--number-field-input-width', '6rem', 'Controls input width.'],
  ['--number-field-max-width', 'none', 'Controls the root number field max width.'],
  ['--number-field-radius', 'var(--radius-md)', 'Controls the outer control corner radius.'],
  ['--number-field-scrub-area-cursor-size', '1.5rem', 'Controls custom scrub cursor size.'],
  ['--number-field-scrub-area-color', 'var(--color-foreground)', 'Controls scrub area text color.'],
  ['--number-field-scrub-area-gap', 'var(--spacing-2)', 'Controls scrub area spacing.'],
  ['--number-field-width', 'auto', 'Controls the root number field width.'],
];
export const numberFieldPlaygroundCssProperties: CssPropertyInput[] = [
  ['--number-field-border-color', 'var(--color-border)', 'Controls default border color.'],
  ['--number-field-border-width', 'var(--border-width-sm)', 'Controls default border width.'],
  ['--number-field-button-bg', 'var(--color-background)', 'Controls button background.'],
  ['--number-field-button-bg-hover', 'var(--color-accent)', 'Controls button hover background.'],
  ['--number-field-button-color', 'var(--color-foreground)', 'Controls button icon color.'],
  ['--number-field-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--number-field-input-bg', 'var(--color-background)', 'Controls input background.'],
  ['--number-field-input-color', 'var(--color-foreground)', 'Controls input text color.'],
  ['--number-field-radius', 'var(--radius-md)', 'Controls control corner radius.'],
];

export function NumberFieldCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={numberFieldOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function NumberFieldCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={numberFieldPlaygroundCssProperties.map(normalizeCssProperty)}
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

export function NumberFieldExample(props: ComponentProps<typeof NumberField>) {
  const id = useId();

  return (
    <Field className={styles.field}>
      <FieldLabel htmlFor={id}>Amount</FieldLabel>
      <NumberField id={id} defaultValue={100} {...props} />
    </Field>
  );
}

export function ControlledNumberFieldExample() {
  const id = useId();
  const [value, setValue] = useState<number | null>(24);

  return (
    <div className={styles.stack}>
      <Field className={styles.field}>
        <FieldLabel htmlFor={id}>Controlled value</FieldLabel>
        <NumberField id={id} value={value} onValueChange={setValue} />
      </Field>
      <span className={styles.hint}>Current value: {value ?? 'empty'}</span>
    </div>
  );
}

export function MinMaxStepNumberFieldExample() {
  const id = useId();

  return (
    <Field className={styles.field}>
      <FieldLabel htmlFor={id}>Quantity (0-20, step 2)</FieldLabel>
      <NumberField id={id} defaultValue={10} min={0} max={20} step={2} />
    </Field>
  );
}

export function NumberFieldScrubAreaExample() {
  const id = useId();

  return (
    <Field className={styles.field}>
      <NumberField id={id} defaultValue={250}>
        <NumberFieldScrubArea>
          <FieldLabel htmlFor={id}>Drag to scrub</FieldLabel>
          <NumberFieldScrubAreaCursor />
        </NumberFieldScrubArea>
      </NumberField>
    </Field>
  );
}

export function FormattedNumberFieldExample() {
  const id = useId();

  return (
    <Field className={styles.field}>
      <FieldLabel htmlFor={id}>Price</FieldLabel>
      <NumberField
        id={id}
        defaultValue={1250}
        min={0}
        step={50}
        format={{ style: 'currency', currency: 'USD', maximumFractionDigits: 0 }}
      />
    </Field>
  );
}

export function NumberFieldValidationExample() {
  const id = useId();

  return (
    <Field name="quantity" validationMode="onBlur" className={styles.validationField}>
      <FieldLabel htmlFor={id}>Items</FieldLabel>
      <NumberField id={id} min={1} max={10} required />
      <FieldError match="valueMissing">Please provide a number.</FieldError>
      <FieldError match="rangeUnderflow">Value should be at least 1.</FieldError>
      <FieldError match="rangeOverflow">Value should be at most 10.</FieldError>
    </Field>
  );
}

export function LocalizedLabelsNumberFieldExample() {
  const id = useId();

  return (
    <Field className={styles.field}>
      <FieldLabel htmlFor={id}>Seats</FieldLabel>
      <NumberField
        id={id}
        defaultValue={2}
        decrementLabel="Decrease seat count"
        incrementLabel="Increase seat count"
      />
    </Field>
  );
}

export function CustomIconsNumberFieldExample() {
  const id = useId();

  return (
    <Field className={styles.field}>
      <FieldLabel htmlFor={id}>Floors</FieldLabel>
      <NumberFieldRoot id={id} defaultValue={8}>
        <NumberFieldGroup>
          <NumberFieldDecrement className={styles.customButton}>
            <ChevronDownIcon />
          </NumberFieldDecrement>
          <NumberFieldInput className={styles.customInput} />
          <NumberFieldIncrement className={styles.customButton}>
            <ChevronUpIcon />
          </NumberFieldIncrement>
        </NumberFieldGroup>
      </NumberFieldRoot>
    </Field>
  );
}