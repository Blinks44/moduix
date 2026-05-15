import {
  Field,
  FieldControl,
  FieldError,
  FieldItem,
  FieldLabel,
  Fieldset,
  FieldsetLegend,
  Radio,
  RadioGroup,
  RadioLabel,
  type FieldsetProps,
} from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './fieldset.module.css';

export const fieldsetOverrideCssProperties: CssPropertyInput[] = [
  ['--fieldset-width', '100%', 'Controls the root fieldset width.'],
  ['--fieldset-max-width', 'none', 'Controls the root fieldset max width.'],
  ['--fieldset-gap', 'var(--spacing-4)', 'Controls spacing between fieldset parts.'],
  ['--fieldset-margin', '0', 'Controls the root fieldset margin.'],
  ['--fieldset-padding', '0', 'Controls the root fieldset padding.'],
  ['--fieldset-border-width', '0', 'Controls the root fieldset border width.'],
  ['--fieldset-border-style', 'solid', 'Controls the root fieldset border style.'],
  ['--fieldset-border-color', 'transparent', 'Controls the root fieldset border color.'],
  ['--fieldset-radius', 'var(--radius-none)', 'Controls the root fieldset corner radius.'],
  ['--fieldset-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled fieldset opacity.'],
  ['--fieldset-legend-padding-bottom', 'var(--spacing-3)', 'Controls legend bottom padding.'],
  [
    '--fieldset-legend-border-width',
    'var(--border-width-sm)',
    'Controls legend bottom border width.',
  ],
  ['--fieldset-legend-border-style', 'solid', 'Controls legend bottom border style.'],
  ['--fieldset-legend-border-color', 'var(--color-border)', 'Controls legend bottom border color.'],
  ['--fieldset-legend-color', 'var(--color-foreground)', 'Controls legend text color.'],
  ['--fieldset-legend-font-size', 'var(--text-lg)', 'Controls legend font size.'],
  ['--fieldset-legend-font-weight', 'var(--weight-semibold)', 'Controls legend font weight.'],
  ['--fieldset-legend-line-height', 'var(--line-height-text-lg)', 'Controls legend line height.'],
];
export const fieldsetPlaygroundCssProperties: CssPropertyInput[] = [
  ['--fieldset-gap', 'var(--spacing-4)', 'Controls spacing between fieldset parts.'],
  ['--fieldset-border-color', 'transparent', 'Controls root fieldset border color.'],
  ['--fieldset-radius', 'var(--radius-none)', 'Controls fieldset corner radius.'],
  ['--fieldset-legend-border-color', 'var(--color-border)', 'Controls legend border color.'],
  ['--fieldset-legend-color', 'var(--color-foreground)', 'Controls legend text color.'],
];

export function FieldsetCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={fieldsetOverrideCssProperties.map(normalizeCssProperty)}
    />
  );
}

export function FieldsetCssPlaygroundPanel({
  values,
  onChange,
  onReset,
}: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesEditor
      properties={fieldsetPlaygroundCssProperties.map(normalizeCssProperty)}
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

export function FieldsetExample(props: FieldsetProps) {
  return (
    <Fieldset {...props}>
      <FieldsetLegend>Billing details</FieldsetLegend>

      <Field validationMode="onBlur">
        <FieldLabel>Company</FieldLabel>
        <FieldControl required placeholder="Enter company name" />
        <FieldError match="valueMissing">Please enter company name.</FieldError>
      </Field>

      <Field validationMode="onBlur">
        <FieldLabel>Tax ID</FieldLabel>
        <FieldControl required placeholder="Enter tax ID" />
        <FieldError match="valueMissing">Please enter tax ID.</FieldError>
      </Field>
    </Fieldset>
  );
}

export function DisabledFieldsetExample() {
  return (
    <Fieldset disabled>
      <FieldsetLegend>Disabled account details</FieldsetLegend>

      <Field>
        <FieldLabel>Email</FieldLabel>
        <FieldControl defaultValue="team@example.com" />
      </Field>

      <Field>
        <FieldLabel>Phone</FieldLabel>
        <FieldControl defaultValue="+1 (555) 123-45-67" />
      </Field>
    </Fieldset>
  );
}

export function RadioGroupFieldsetExample() {
  return (
    <Field name="storageType">
      <Fieldset render={<RadioGroup defaultValue="ssd" />}>
        <FieldsetLegend>Storage type</FieldsetLegend>

        {storageTypes.map((item) => (
          <FieldItem key={item.value}>
            <FieldLabel>
              <Radio value={item.value} />
              <RadioLabel>{item.label}</RadioLabel>
            </FieldLabel>
          </FieldItem>
        ))}
      </Fieldset>
    </Field>
  );
}

export function CustomStylesFieldsetExample() {
  return (
    <Fieldset className={styles.customFieldset}>
      <FieldsetLegend className={styles.customLegend}>Styled fieldset</FieldsetLegend>

      <Field validationMode="onBlur" className={styles.customField}>
        <FieldLabel className={styles.customLabel}>Project name</FieldLabel>
        <FieldControl required placeholder="Maps Platform" className={styles.customControl} />
        <FieldError className={styles.customError} match="valueMissing">
          Please enter a project name.
        </FieldError>
      </Field>
    </Fieldset>
  );
}

const storageTypes = [
  { value: 'ssd', label: 'SSD' },
  { value: 'hdd', label: 'HDD' },
];