import type { ComponentProps } from 'react';
import { Field, Fieldset, FieldsetLegend, RadioGroup } from 'moduix';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesEditor, CSSPropertiesReferenceTable } from '../preview';
import styles from './fieldset.module.css';

export const fieldsetOverrideCssProperties: CssPropertyInput[] = [
  ['--fieldset-border-color', 'transparent', 'Controls the root fieldset border color.'],
  ['--fieldset-border-style', 'solid', 'Controls the root fieldset border style.'],
  ['--fieldset-border-width', '0', 'Controls the root fieldset border width.'],
  ['--fieldset-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled fieldset opacity.'],
  ['--fieldset-gap', 'var(--spacing-4)', 'Controls spacing between fieldset parts.'],
  ['--fieldset-legend-border-color', 'var(--color-border)', 'Controls legend bottom border color.'],
  ['--fieldset-legend-border-style', 'solid', 'Controls legend bottom border style.'],
  [
    '--fieldset-legend-border-width',
    'var(--border-width-sm)',
    'Controls legend bottom border width.',
  ],
  ['--fieldset-legend-color', 'var(--color-foreground)', 'Controls legend text color.'],
  ['--fieldset-legend-font-size', 'var(--text-lg)', 'Controls legend font size.'],
  ['--fieldset-legend-font-weight', 'var(--weight-semibold)', 'Controls legend font weight.'],
  ['--fieldset-legend-line-height', 'var(--line-height-text-lg)', 'Controls legend line height.'],
  ['--fieldset-legend-margin', '0', 'Controls legend margin.'],
  ['--fieldset-legend-padding', '0 0 var(--spacing-3)', 'Controls legend padding.'],
  ['--fieldset-margin', '0', 'Controls the root fieldset margin.'],
  ['--fieldset-max-width', 'none', 'Controls the root fieldset max width.'],
  ['--fieldset-padding', '0', 'Controls the root fieldset padding.'],
  ['--fieldset-radius', 'var(--radius-none)', 'Controls the root fieldset corner radius.'],
  ['--fieldset-width', '100%', 'Controls the root fieldset width.'],
];
export const fieldsetPlaygroundCssProperties: CssPropertyInput[] = [
  ['--fieldset-border-color', 'transparent', 'Controls root fieldset border color.'],
  ['--fieldset-gap', 'var(--spacing-4)', 'Controls spacing between fieldset parts.'],
  ['--fieldset-legend-border-color', 'var(--color-border)', 'Controls legend border color.'],
  ['--fieldset-legend-color', 'var(--color-foreground)', 'Controls legend text color.'],
  ['--fieldset-radius', 'var(--radius-none)', 'Controls fieldset corner radius.'],
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

export function FieldsetExample(props: ComponentProps<typeof Fieldset>) {
  return (
    <Fieldset className={styles.fieldset} {...props}>
      <FieldsetLegend>Billing details</FieldsetLegend>

      <Field>
        <Field.Label>Company</Field.Label>
        <Field.Input required placeholder="Enter company name" />
        <Field.ErrorText>Please enter company name.</Field.ErrorText>
      </Field>

      <Field>
        <Field.Label>Tax ID</Field.Label>
        <Field.Input required placeholder="Enter tax ID" />
        <Field.ErrorText>Please enter tax ID.</Field.ErrorText>
      </Field>
    </Fieldset>
  );
}

export function DisabledFieldsetExample() {
  return (
    <Fieldset disabled className={styles.fieldset}>
      <FieldsetLegend>Disabled account details</FieldsetLegend>

      <Field>
        <Field.Label>Email</Field.Label>
        <Field.Input defaultValue="team@example.com" />
      </Field>

      <Field>
        <Field.Label>Phone</Field.Label>
        <Field.Input defaultValue="+1 (555) 123-45-67" />
      </Field>
    </Fieldset>
  );
}

export function CustomCompositionFieldsetExample() {
  return (
    <Field>
      <Fieldset
        className={styles.fieldset}
        render={<RadioGroup defaultValue="ssd" className={styles.choiceGroup} />}
      >
        <FieldsetLegend>Storage type</FieldsetLegend>

        <Field.Item value="ssd">
          <RadioGroup.Item value="ssd" className={styles.choiceRow}>
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>SSD</RadioGroup.ItemText>
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        </Field.Item>

        <Field.Item value="hdd">
          <RadioGroup.Item value="hdd" className={styles.choiceRow}>
            <RadioGroup.ItemControl />
            <RadioGroup.ItemText>HDD</RadioGroup.ItemText>
            <RadioGroup.ItemHiddenInput />
          </RadioGroup.Item>
        </Field.Item>
      </Fieldset>
    </Field>
  );
}

export function CustomStylesFieldsetExample() {
  return (
    <Fieldset className={styles.customFieldset}>
      <FieldsetLegend className={styles.customLegend}>Styled fieldset</FieldsetLegend>

      <Field className={styles.customField}>
        <Field.Label className={styles.customLabel}>Project name</Field.Label>
        <Field.Input required placeholder="Maps Platform" className={styles.customControl} />
        <Field.ErrorText className={styles.customError}>
          Please enter a project name.
        </Field.ErrorText>
      </Field>
    </Fieldset>
  );
}