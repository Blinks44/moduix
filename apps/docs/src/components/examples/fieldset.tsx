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
  RadioIndicator,
  RadioLabel,
  type FieldsetProps,
} from 'moduix';
import type { CssPropertyInput } from '../preview';
import styles from './fieldset.module.css';

export const fieldsetCssProperties: CssPropertyInput[] = [
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

        <FieldItem>
          <FieldLabel>
            <Radio value="ssd">
              <RadioIndicator />
            </Radio>
            <RadioLabel>SSD</RadioLabel>
          </FieldLabel>
        </FieldItem>

        <FieldItem>
          <FieldLabel>
            <Radio value="hdd">
              <RadioIndicator />
            </Radio>
            <RadioLabel>HDD</RadioLabel>
          </FieldLabel>
        </FieldItem>
      </Fieldset>
    </Field>
  );
}

export function FieldsetClassNameExample() {
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