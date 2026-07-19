import { createListCollection } from '@ark-ui/react/collection';
import { Checkbox, Field, NativeSelect, RadioGroup, Select, useField } from '@moduix/react';
import type { ComponentProps } from 'react';
import { useState } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../mdx/preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../mdx/preview';
import styles from './field.module.css';

export const fieldOverrideCssProperties: CssPropertyInput[] = [
  ['--field-color', 'var(--color-foreground)', 'Controls inherited field text color.'],
  ['--field-control-bg', 'var(--color-background)', 'Controls field control background.'],
  ['--field-control-border-color', 'var(--color-border)', 'Controls field control border color.'],
  [
    '--field-control-border-color-invalid',
    'var(--color-destructive)',
    'Controls invalid field control border and focus ring color.',
  ],
  ['--field-control-border-style', 'solid', 'Controls field control border style.'],
  [
    '--field-control-border-width',
    'var(--border-width-sm)',
    'Controls field control border width.',
  ],
  ['--field-control-color', 'var(--color-foreground)', 'Controls field control text color.'],
  ['--field-control-font-size', 'var(--text-md)', 'Controls field control font size.'],
  ['--field-control-height', 'var(--size-lg)', 'Controls field control minimum height.'],
  [
    '--field-control-line-height',
    'var(--line-height-text-md)',
    'Controls field control line height.',
  ],
  ['--field-control-padding-x', '0.875rem', 'Controls field control horizontal padding.'],
  ['--field-control-padding-y', '0.5rem', 'Controls field control vertical padding.'],
  [
    '--field-control-placeholder-color',
    'var(--color-muted-foreground)',
    'Controls field control placeholder color.',
  ],
  ['--field-control-radius', 'var(--radius-md)', 'Controls field control corner radius.'],
  [
    '--field-control-transition',
    'var(--transition-default)',
    'Controls field control state transition timing.',
  ],
  ['--field-control-width', '100%', 'Controls field control width.'],
  ['--field-description-color', 'var(--color-muted-foreground)', 'Controls helper text color.'],
  ['--field-description-font-size', 'var(--text-sm)', 'Controls helper text font size.'],
  [
    '--field-description-line-height',
    'var(--line-height-text-sm)',
    'Controls helper text line height.',
  ],
  ['--field-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled field opacity.'],
  ['--field-error-color', 'var(--color-destructive)', 'Controls error text color.'],
  ['--field-error-font-size', 'var(--text-sm)', 'Controls error text font size.'],
  ['--field-error-line-height', 'var(--line-height-text-sm)', 'Controls error text line height.'],
  ['--field-focus-ring-color', 'var(--color-ring)', 'Controls field control focus ring color.'],
  ['--field-focus-ring-offset', '-1px', 'Controls field control focus ring offset.'],
  [
    '--field-focus-ring-width',
    'var(--border-width-sm)',
    'Controls field control focus ring width.',
  ],
  ['--field-gap', 'var(--spacing-1)', 'Controls spacing between field parts.'],
  ['--field-item-gap', 'var(--spacing-1)', 'Controls spacing inside `Field.Item`.'],
  ['--field-label-color', 'var(--color-foreground)', 'Controls label text color.'],
  ['--field-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--field-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--field-label-gap', 'var(--spacing-2)', 'Controls spacing inside `Field.Label`.'],
  ['--field-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--field-max-width', 'none', 'Controls the root field max width.'],
  [
    '--field-required-indicator-color',
    'var(--color-destructive)',
    'Controls required indicator color.',
  ],
  ['--field-textarea-min-height', '5rem', 'Controls `Field.Textarea` minimum height.'],
  ['--field-width', '100%', 'Controls the root field width.'],
];
export const fieldPlaygroundCssProperties: CssPropertyInput[] = [
  ['--field-control-bg', 'var(--color-background)', 'Controls control background.'],
  ['--field-control-border-color', 'var(--color-border)', 'Controls control border color.'],
  ['--field-control-color', 'var(--color-foreground)', 'Controls control text color.'],
  ['--field-control-radius', 'var(--radius-md)', 'Controls control radius.'],
  ['--field-description-color', 'var(--color-muted-foreground)', 'Controls helper text color.'],
  ['--field-error-color', 'var(--color-destructive)', 'Controls error text color.'],
  ['--field-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--field-gap', 'var(--spacing-1)', 'Controls spacing between field parts.'],
  ['--field-label-color', 'var(--color-foreground)', 'Controls label text color.'],
];

export function FieldCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={fieldOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function FieldCssPlaygroundPanel({ values, onChange, onReset }: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={fieldPlaygroundCssProperties.map(normalizeCssProperty)}
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

export const fieldPriorityOptions = [
  { label: 'Low', value: 'low' },
  { label: 'Normal', value: 'normal' },
  { label: 'High', value: 'high' },
];

export const fieldCurrencyOptions = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'GBP', value: 'GBP' },
];

const fieldPriorities = createListCollection({
  items: fieldPriorityOptions,
});

export function FieldExample(props: ComponentProps<typeof Field>) {
  return (
    <Field required className={styles.field} {...props}>
      <Field.Label>
        Name
        <Field.RequiredIndicator />
      </Field.Label>
      <Field.Input placeholder="Enter your name" />
      <Field.HelperText>Visible on your public profile.</Field.HelperText>
    </Field>
  );
}

export function FieldInvalidExample() {
  return (
    <Field invalid required className={styles.field}>
      <Field.Label>Email</Field.Label>
      <Field.Input type="email" placeholder="name@example.com" />
      <Field.HelperText>Use your work email.</Field.HelperText>
      <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
    </Field>
  );
}

export function FieldControlledInvalidExample() {
  const [value, setValue] = useState('');
  const invalid = value.length > 0 && value.length < 3;

  return (
    <Field invalid={invalid} className={styles.field}>
      <Field.Label>Username</Field.Label>
      <Field.Input
        value={value}
        onChange={(event) => setValue(event.currentTarget.value)}
        placeholder="e.g. vinny"
      />
      <Field.HelperText>Use at least 3 characters.</Field.HelperText>
      <Field.ErrorText>Username must be at least 3 characters.</Field.ErrorText>
    </Field>
  );
}

export function FieldTextareaExample() {
  return (
    <Field className={styles.field}>
      <Field.Label>Summary</Field.Label>
      <Field.Textarea placeholder="Describe the request" />
      <Field.HelperText>Use a short operational summary.</Field.HelperText>
    </Field>
  );
}

export function FieldTextareaAutoresizeExample() {
  return (
    <Field className={styles.field}>
      <Field.Label>Details</Field.Label>
      <Field.Textarea autoresize placeholder="Add extra context" />
      <Field.HelperText>The textarea grows as the user types.</Field.HelperText>
    </Field>
  );
}

export function FieldNativeSelectExample() {
  return (
    <Field required className={styles.field}>
      <Field.Label>Priority</Field.Label>
      <NativeSelect defaultValue="" name="priority">
        <option value="" disabled>
          Select priority
        </option>
        {fieldPriorityOptions.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </NativeSelect>
      <Field.HelperText>Used for triage queues.</Field.HelperText>
    </Field>
  );
}

export function FieldSelectExample() {
  return (
    <Field required className={styles.field}>
      <Select collection={fieldPriorities} name="priority">
        <Select.Label>Priority</Select.Label>
        <Select.Control>
          <Select.Trigger>
            <Select.ValueText placeholder="Select priority" />
          </Select.Trigger>
          <Select.Indicators>
            <Select.Indicator />
          </Select.Indicators>
        </Select.Control>
        <Select.Positioner>
          <Select.Content>
            {fieldPriorities.items.map((item) => (
              <Select.Item key={item.value} item={item}>
                <Select.ItemText>{item.label}</Select.ItemText>
                <Select.ItemIndicator />
              </Select.Item>
            ))}
          </Select.Content>
        </Select.Positioner>
      </Select>
      <Field.HelperText>Used for triage queues.</Field.HelperText>
    </Field>
  );
}

export function FieldCheckboxExample() {
  return (
    <Field required className={styles.field}>
      <Checkbox.Root>
        <Checkbox.Control />
        <Checkbox.Label>Accept support access</Checkbox.Label>
      </Checkbox.Root>
      <Field.HelperText>Required before the team can inspect workspace data.</Field.HelperText>
      <Field.ErrorText>Support access must be enabled.</Field.ErrorText>
    </Field>
  );
}

export function FieldRadioGroupExample() {
  return (
    <Field className={styles.field}>
      <Field.Label>Account type</Field.Label>
      <RadioGroup defaultValue="team" aria-label="Account type">
        <RadioGroup.Item value="personal">
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>Personal account</RadioGroup.ItemText>
        </RadioGroup.Item>
        <RadioGroup.Item value="team">
          <RadioGroup.ItemControl />
          <RadioGroup.ItemText>Team account</RadioGroup.ItemText>
        </RadioGroup.Item>
      </RadioGroup>
      <Field.HelperText>Choose the default account context for new projects.</Field.HelperText>
    </Field>
  );
}

export function FieldRootProviderExample() {
  const field = useField({ id: 'root-provider-field', required: true });

  return (
    <Field.RootProvider value={field} className={styles.field}>
      <Field.Label>Project key</Field.Label>
      <Field.Input placeholder="MAPS" />
      <Field.HelperText>The field state is created outside the rendered tree.</Field.HelperText>
    </Field.RootProvider>
  );
}

export function FieldDisabledExample() {
  return (
    <Field disabled className={styles.field}>
      <Field.Label>Organization</Field.Label>
      <Field.Input placeholder="Acme Inc." />
      <Field.HelperText>This field is currently managed by your workspace.</Field.HelperText>
    </Field>
  );
}

export function FieldReadOnlyExample() {
  return (
    <Field readOnly className={styles.field}>
      <Field.Label>Workspace key</Field.Label>
      <Field.Input defaultValue="MAPS" />
      <Field.HelperText>Read-only state is propagated to the input.</Field.HelperText>
    </Field>
  );
}

export function FieldItemExample() {
  return (
    <Field target="amount" className={styles.field}>
      <Field.Label>Amount</Field.Label>
      <div className={styles.inlineControls}>
        <Field.Item value="currency">
          <Field.Select aria-label="Currency" defaultValue="USD">
            {fieldCurrencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </Field.Select>
        </Field.Item>
        <Field.Item value="amount">
          <Field.Input inputMode="decimal" placeholder="0.00" />
        </Field.Item>
      </div>
      <Field.HelperText>The root label targets the amount input.</Field.HelperText>
    </Field>
  );
}