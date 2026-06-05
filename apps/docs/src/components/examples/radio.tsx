import {
  Field,
  FieldItem,
  FieldLabel,
  Fieldset,
  FieldsetLegend,
  Radio,
  RadioField,
  RadioGroup,
  RadioGroupLabel,
  RadioGroupList,
  RadioIndicator,
  RadioLabel,
} from 'moduix';
import { useId, useState, type ComponentProps } from 'react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './radio.module.css';

const radioOptions = [
  { value: 'personal', label: 'Personal account' },
  { value: 'team', label: 'Team account' },
  { value: 'enterprise', label: 'Enterprise account' },
] as const;

export const radioOverrideCssProperties: CssPropertyInput[] = [
  ['--radio-bg', 'var(--color-background)', 'Controls unchecked background color.'],
  ['--radio-bg-checked', 'var(--color-primary)', 'Controls checked background color.'],
  ['--radio-bg-hover', 'var(--color-accent)', 'Controls unchecked hover background color.'],
  ['--radio-border-color', 'var(--color-border)', 'Controls unchecked border color.'],
  ['--radio-border-color-checked', 'var(--color-primary)', 'Controls checked border color.'],
  ['--radio-border-width', 'var(--border-width-sm)', 'Controls radio border width.'],
  ['--radio-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--radio-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--radio-focus-ring-offset', 'var(--border-width-sm)', 'Controls focus ring offset.'],
  ['--radio-focus-ring-width', 'var(--border-width-sm)', 'Controls focus ring width.'],
  ['--radio-gap', 'var(--spacing-2)', 'Controls spacing between control and label.'],
  ['--radio-group-color', 'var(--color-foreground)', 'Controls inherited group text color.'],
  ['--radio-group-gap', 'var(--spacing-2)', 'Controls spacing inside the group root.'],
  ['--radio-group-label-color', 'var(--radio-group-color)', 'Controls group label text color.'],
  ['--radio-group-label-font-size', 'var(--text-sm)', 'Controls group label font size.'],
  [
    '--radio-group-label-font-weight',
    'var(--weight-semibold)',
    'Controls group label font weight.',
  ],
  [
    '--radio-group-label-line-height',
    'var(--line-height-text-sm)',
    'Controls group label line height.',
  ],
  ['--radio-group-list-gap', 'var(--spacing-2)', 'Controls spacing between radio rows.'],
  ['--radio-indicator-border-color', 'currentColor', 'Controls indicator border color.'],
  ['--radio-indicator-border-width', '0', 'Controls indicator border width.'],
  ['--radio-indicator-color', 'var(--color-primary-foreground)', 'Controls indicator color.'],
  ['--radio-indicator-radius', 'var(--radius-full)', 'Controls indicator border radius.'],
  ['--radio-indicator-size-xs', '0.25rem', 'Controls `xs` indicator size.'],
  ['--radio-indicator-size-sm', '0.375rem', 'Controls `sm` indicator size.'],
  ['--radio-indicator-size-md', '0.5rem', 'Controls `md` indicator size.'],
  ['--radio-indicator-size-lg', '0.625rem', 'Controls `lg` indicator size.'],
  ['--radio-indicator-size-xl', '0.75rem', 'Controls `xl` indicator size.'],
  ['--radio-label-color', 'var(--color-foreground)', 'Controls label text color.'],
  ['--radio-label-font-size', 'var(--text-sm)', 'Controls label font size.'],
  ['--radio-label-font-weight', 'var(--weight-medium)', 'Controls label font weight.'],
  ['--radio-label-line-height', 'var(--line-height-text-sm)', 'Controls label line height.'],
  ['--radio-size-xs', '0.875rem', 'Controls `xs` radio size.'],
  ['--radio-size-sm', '1rem', 'Controls `sm` radio size.'],
  ['--radio-size-md', '1.25rem', 'Controls `md` radio size.'],
  ['--radio-size-lg', '1.5rem', 'Controls `lg` radio size.'],
  ['--radio-size-xl', '1.75rem', 'Controls `xl` radio size.'],
  ['--radio-transition', 'var(--transition-default)', 'Controls state transition timing.'],
];

export const radioPlaygroundCssProperties: CssPropertyInput[] = [
  ['--radio-bg', 'var(--color-background)', 'Controls unchecked background color.'],
  ['--radio-bg-checked', 'var(--color-primary)', 'Controls checked background color.'],
  ['--radio-bg-hover', 'var(--color-accent)', 'Controls unchecked hover background color.'],
  ['--radio-border-color', 'var(--color-border)', 'Controls unchecked border color.'],
  ['--radio-border-color-checked', 'var(--color-primary)', 'Controls checked border color.'],
  ['--radio-border-width', 'var(--border-width-sm)', 'Controls radio border width.'],
  ['--radio-focus-ring-color', 'var(--color-ring)', 'Controls focus ring color.'],
  ['--radio-indicator-border-color', 'currentColor', 'Controls indicator border color.'],
  ['--radio-indicator-border-width', '0', 'Controls indicator border width.'],
  ['--radio-indicator-color', 'var(--color-primary-foreground)', 'Controls indicator color.'],
];

export function RadioCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={radioOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function RadioCssPlaygroundPanel({ values, onChange, onReset }: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={radioPlaygroundCssProperties.map(normalizeCssProperty)}
      values={values}
      onChange={onChange}
      onReset={onReset}
    />
  );
}

function normalizeCssProperty(property: CssPropertyInput) {
  if (!('name' in property)) {
    return { name: property[0], defaultValue: property[1], description: property[2] };
  }

  return property;
}

function CustomRadioIcon(props: ComponentProps<'svg'>) {
  return (
    <svg
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      aria-hidden="true"
      focusable="false"
      {...props}
    >
      <path d="M6 1.5L10.5 6L6 10.5L1.5 6L6 1.5Z" fill="currentColor" />
    </svg>
  );
}

export function RadioExample(props: ComponentProps<typeof RadioGroup>) {
  const labelId = useId();

  return (
    <RadioGroup aria-labelledby={labelId} defaultValue="team" {...props}>
      <RadioGroupLabel id={labelId}>Account Type</RadioGroupLabel>
      <RadioGroupList>
        {radioOptions.map((option) => (
          <RadioField key={option.value}>
            <Radio value={option.value} />
            <RadioLabel>{option.label}</RadioLabel>
          </RadioField>
        ))}
      </RadioGroupList>
    </RadioGroup>
  );
}

export function RadioSizesExample() {
  const labelId = useId();

  return (
    <RadioGroup aria-labelledby={labelId} defaultValue="md">
      <RadioGroupLabel id={labelId}>Control Size</RadioGroupLabel>
      <RadioGroupList>
        <RadioField>
          <Radio value="xs" size="xs" />
          <RadioLabel>Extra-small</RadioLabel>
        </RadioField>
        <RadioField>
          <Radio value="sm" size="sm" />
          <RadioLabel>Small</RadioLabel>
        </RadioField>
        <RadioField>
          <Radio value="md" size="md" />
          <RadioLabel>Medium</RadioLabel>
        </RadioField>
        <RadioField>
          <Radio value="lg" size="lg" />
          <RadioLabel>Large</RadioLabel>
        </RadioField>
        <RadioField>
          <Radio value="xl" size="xl" />
          <RadioLabel>Extra-large</RadioLabel>
        </RadioField>
      </RadioGroupList>
    </RadioGroup>
  );
}

export function ControlledRadioExample() {
  const labelId = useId();
  const [value, setValue] = useState('personal');

  return (
    <div className={styles.stack}>
      <RadioGroup aria-labelledby={labelId} value={value} onValueChange={setValue}>
        <RadioGroupLabel id={labelId}>Workspace Visibility</RadioGroupLabel>
        <RadioGroupList>
          <RadioField>
            <Radio value="personal" />
            <RadioLabel>Only me</RadioLabel>
          </RadioField>
          <RadioField>
            <Radio value="team" />
            <RadioLabel>Team</RadioLabel>
          </RadioField>
        </RadioGroupList>
      </RadioGroup>
      <span className={styles.hint}>Current value: {value}</span>
    </div>
  );
}

export function DisabledRadioExample() {
  const labelId = useId();

  return (
    <RadioGroup aria-labelledby={labelId} defaultValue="enterprise" disabled>
      <RadioGroupLabel id={labelId}>Plan</RadioGroupLabel>
      <RadioGroupList>
        {radioOptions.map((option) => (
          <RadioField key={option.value}>
            <Radio value={option.value} />
            <RadioLabel>{option.label}</RadioLabel>
          </RadioField>
        ))}
      </RadioGroupList>
    </RadioGroup>
  );
}

export function ReadOnlyRadioExample() {
  const labelId = useId();

  return (
    <RadioGroup aria-labelledby={labelId} defaultValue="team" readOnly>
      <RadioGroupLabel id={labelId}>Workspace Visibility</RadioGroupLabel>
      <RadioGroupList>
        <RadioField>
          <Radio value="personal" />
          <RadioLabel>Only me</RadioLabel>
        </RadioField>
        <RadioField>
          <Radio value="team" />
          <RadioLabel>Team</RadioLabel>
        </RadioField>
      </RadioGroupList>
    </RadioGroup>
  );
}

export function RadioClassNameExample() {
  const labelId = useId();

  return (
    <RadioGroup aria-labelledby={labelId} defaultValue="team" className={styles.customGroup}>
      <RadioGroupLabel id={labelId} className={styles.customLabel}>
        Styled Account Type
      </RadioGroupLabel>
      <RadioGroupList className={styles.customList}>
        {radioOptions.map((option) => (
          <RadioField key={option.value} className={styles.customField}>
            <Radio value={option.value} className={styles.customRadio} />
            <RadioLabel className={styles.customLabel}>{option.label}</RadioLabel>
          </RadioField>
        ))}
      </RadioGroupList>
    </RadioGroup>
  );
}

export function CustomIndicatorRadioExample() {
  const labelId = useId();

  return (
    <RadioGroup aria-labelledby={labelId} defaultValue="team">
      <RadioGroupLabel id={labelId}>Account Type</RadioGroupLabel>
      <RadioGroupList>
        {radioOptions.map((option) => (
          <RadioField key={option.value}>
            <Radio value={option.value}>
              <RadioIndicator>
                <CustomRadioIcon className={styles.customIndicatorIcon} />
              </RadioIndicator>
            </Radio>
            <RadioLabel>{option.label}</RadioLabel>
          </RadioField>
        ))}
      </RadioGroupList>
    </RadioGroup>
  );
}

export function RadioSiblingLabelNativeButtonExample() {
  const id = useId();
  const labelId = useId();

  return (
    <div className={styles.siblingRow}>
      <div id={labelId} className={styles.hint}>
        Delivery method
      </div>
      <RadioGroup defaultValue="email" aria-labelledby={labelId}>
        <Radio nativeButton render={<button />} id={id} value="email" />
      </RadioGroup>
      <label htmlFor={id} className={styles.label}>
        Email
      </label>
    </div>
  );
}

export function RadioFormIntegrationExample() {
  return (
    <Field name="storageType">
      <Fieldset render={<RadioGroup defaultValue="ssd" className={styles.formGroup} />}>
        <FieldsetLegend>Storage type</FieldsetLegend>
        <FieldItem>
          <FieldLabel>
            <Radio value="ssd" />
            <RadioLabel>SSD</RadioLabel>
          </FieldLabel>
        </FieldItem>
        <FieldItem>
          <FieldLabel>
            <Radio value="hdd" />
            <RadioLabel>HDD</RadioLabel>
          </FieldLabel>
        </FieldItem>
      </Fieldset>
    </Field>
  );
}