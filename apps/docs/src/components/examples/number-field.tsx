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
import type { CSSPropertiesEditorContext, CssProperty } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';

export const numberFieldOverrideCssProperties: CssProperty[] = [
  {
    name: '--number-field-border-color',
    defaultValue: 'var(--color-border)',
    description: 'Controls default border color.',
  },
  {
    name: '--number-field-border-color-invalid',
    defaultValue: 'var(--color-destructive)',
    description: 'Controls invalid input border and focus ring color.',
  },
  {
    name: '--number-field-border-style',
    defaultValue: 'solid',
    description: 'Controls border style for buttons and input.',
  },
  {
    name: '--number-field-border-width',
    defaultValue: 'var(--border-width-sm)',
    description: 'Controls border width for buttons and input.',
  },
  {
    name: '--number-field-button-bg',
    defaultValue: 'var(--color-background)',
    description: 'Controls button background.',
  },
  {
    name: '--number-field-button-bg-active',
    defaultValue: 'var(--number-field-button-bg-hover)',
    description: 'Controls button background while pressed.',
  },
  {
    name: '--number-field-button-bg-hover',
    defaultValue: 'var(--color-accent)',
    description: 'Controls button background on hover.',
  },
  {
    name: '--number-field-button-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls button icon color.',
  },
  {
    name: '--number-field-control-height',
    defaultValue: 'var(--size-lg)',
    description: 'Controls input and button height.',
  },
  {
    name: '--number-field-disabled-opacity',
    defaultValue: 'var(--opacity-disabled)',
    description: 'Controls disabled opacity.',
  },
  {
    name: '--number-field-focus-ring-color',
    defaultValue: 'var(--color-ring)',
    description: 'Controls focus ring color.',
  },
  {
    name: '--number-field-focus-ring-width',
    defaultValue: 'var(--number-field-border-width)',
    description: 'Controls focus ring width.',
  },
  {
    name: '--number-field-gap',
    defaultValue: 'var(--spacing-1)',
    description: 'Controls spacing between number field parts.',
  },
  {
    name: '--number-field-icon-size',
    defaultValue: '0.875rem',
    description: 'Controls button icon size.',
  },
  {
    name: '--number-field-input-bg',
    defaultValue: 'var(--color-background)',
    description: 'Controls input background.',
  },
  {
    name: '--number-field-input-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls input text color.',
  },
  {
    name: '--number-field-input-font-size',
    defaultValue: 'var(--text-md)',
    description: 'Controls input font size.',
  },
  {
    name: '--number-field-input-line-height',
    defaultValue: 'var(--line-height-text-md)',
    description: 'Controls input line height.',
  },
  {
    name: '--number-field-input-padding-x',
    defaultValue: '0.75rem',
    description: 'Controls input horizontal padding.',
  },
  {
    name: '--number-field-input-padding-y',
    defaultValue: '0.5rem',
    description: 'Controls input vertical padding.',
  },
  {
    name: '--number-field-input-width',
    defaultValue: '6rem',
    description: 'Controls input width.',
  },
  {
    name: '--number-field-max-width',
    defaultValue: 'none',
    description: 'Controls the root number field max width.',
  },
  {
    name: '--number-field-radius',
    defaultValue: 'var(--radius-md)',
    description: 'Controls the outer control corner radius.',
  },
  {
    name: '--number-field-scrub-area-cursor-size',
    defaultValue: '1.5rem',
    description: 'Controls custom scrub cursor size.',
  },
  {
    name: '--number-field-scrub-area-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls scrub area text color.',
  },
  {
    name: '--number-field-scrub-area-gap',
    defaultValue: 'var(--spacing-2)',
    description: 'Controls scrub area spacing.',
  },
  {
    name: '--number-field-width',
    defaultValue: 'auto',
    description: 'Controls the root number field width.',
  },
];

export const numberFieldPlaygroundCssProperties: CssProperty[] = [
  {
    name: '--number-field-border-color',
    defaultValue: 'var(--color-border)',
    description: 'Controls default border color.',
  },
  {
    name: '--number-field-border-width',
    defaultValue: 'var(--border-width-sm)',
    description: 'Controls default border width.',
  },
  {
    name: '--number-field-button-bg',
    defaultValue: 'var(--color-background)',
    description: 'Controls button background.',
  },
  {
    name: '--number-field-button-bg-hover',
    defaultValue: 'var(--color-accent)',
    description: 'Controls button hover background.',
  },
  {
    name: '--number-field-button-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls button icon color.',
  },
  {
    name: '--number-field-focus-ring-color',
    defaultValue: 'var(--color-ring)',
    description: 'Controls focus ring color.',
  },
  {
    name: '--number-field-input-bg',
    defaultValue: 'var(--color-background)',
    description: 'Controls input background.',
  },
  {
    name: '--number-field-input-color',
    defaultValue: 'var(--color-foreground)',
    description: 'Controls input text color.',
  },
  {
    name: '--number-field-radius',
    defaultValue: 'var(--radius-md)',
    description: 'Controls control corner radius.',
  },
];

export function NumberFieldCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return <CSSPropertiesReferenceTable properties={numberFieldOverrideCssProperties} />;
}

export function NumberFieldCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={numberFieldPlaygroundCssProperties}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

export function NumberFieldExample(props: ComponentProps<typeof NumberField>) {
  const id = useId();

  return (
    <Field>
      <FieldLabel htmlFor={id}>Amount</FieldLabel>
      <NumberField id={id} defaultValue={100} {...props} />
    </Field>
  );
}

export function ControlledNumberFieldExample() {
  const id = useId();
  const [value, setValue] = useState<number | null>(24);

  return (
    <div>
      <Field>
        <FieldLabel htmlFor={id}>Controlled value</FieldLabel>
        <NumberField id={id} value={value} onValueChange={setValue} />
      </Field>
      <span>Current value: {value ?? 'empty'}</span>
    </div>
  );
}

export function MinMaxStepNumberFieldExample() {
  const id = useId();

  return (
    <Field>
      <FieldLabel htmlFor={id}>Quantity (0-20, step 2)</FieldLabel>
      <NumberField id={id} defaultValue={10} min={0} max={20} step={2} />
    </Field>
  );
}

export function NumberFieldScrubAreaExample() {
  const id = useId();

  return (
    <Field>
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
    <Field>
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
    <Field name="quantity" validationMode="onBlur">
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
    <Field>
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
    <Field>
      <FieldLabel htmlFor={id}>Floors</FieldLabel>
      <NumberFieldRoot id={id} defaultValue={8}>
        <NumberFieldGroup>
          <NumberFieldDecrement className="customButton">
            <ChevronDownIcon />
          </NumberFieldDecrement>
          <NumberFieldInput className="customInput" />
          <NumberFieldIncrement className="customButton">
            <ChevronUpIcon />
          </NumberFieldIncrement>
        </NumberFieldGroup>
      </NumberFieldRoot>
    </Field>
  );
}