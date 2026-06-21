import type { ComponentProps } from 'react';
import { Checkbox, Field, Fieldset, useFieldset } from '@moduix/react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './fieldset.module.css';

export const fieldsetExampleCss = `
  .fieldset {
    width: min(16rem, 100%);
  }
`;

export const fieldsetCustomStylingCss = `
  .custom-fieldset {
    --fieldset-border-color: color-mix(in srgb, var(--color-primary) 30%, transparent);
    --fieldset-border-width: var(--border-width-sm);
    --fieldset-padding: var(--spacing-4);
    --fieldset-radius: var(--radius-lg);
    --fieldset-legend-color: var(--color-primary);
    --fieldset-legend-margin: 0 0 0 var(--spacing-2);
    --fieldset-legend-padding: 0 var(--spacing-2);
    --fieldset-helper-text-color: var(--color-primary);
  }
`;

const preferences = [
  { label: 'Product updates', value: 'product' },
  { label: 'Marketing emails', value: 'marketing' },
];

export const fieldsetPreferencesData = `const preferences = [
  { label: 'Product updates', value: 'product' },
  { label: 'Marketing emails', value: 'marketing' },
];`;

const countryCodes = ['+1', '+44', '+49', '+41'];

export const fieldsetCountryCodesData = `const countryCodes = ['+1', '+44', '+49', '+41'];`;
export const fieldsetEmptyData = `const initialFieldsetState = { disabled: false, invalid: false };`;

export const fieldsetOverrideCssProperties: CssPropertyInput[] = [
  ['--fieldset-border-color', 'transparent', 'Controls the root border color.'],
  [
    '--fieldset-border-color-invalid',
    'var(--color-destructive)',
    'Controls the invalid root border color.',
  ],
  ['--fieldset-border-style', 'solid', 'Controls the root border style.'],
  ['--fieldset-border-width', '0', 'Controls the root border width.'],
  ['--fieldset-disabled-opacity', 'var(--opacity-disabled)', 'Controls disabled opacity.'],
  ['--fieldset-error-text-color', 'var(--color-destructive)', 'Controls error text color.'],
  ['--fieldset-gap', 'var(--spacing-4)', 'Controls spacing between fieldset children.'],
  ['--fieldset-helper-text-color', 'var(--color-muted-foreground)', 'Controls helper text color.'],
  ['--fieldset-legend-color', 'var(--color-foreground)', 'Controls legend text color.'],
  ['--fieldset-legend-font-size', 'var(--text-lg)', 'Controls legend font size.'],
  ['--fieldset-legend-font-weight', 'var(--weight-semibold)', 'Controls legend font weight.'],
  ['--fieldset-legend-line-height', 'var(--line-height-text-lg)', 'Controls legend line height.'],
  ['--fieldset-legend-margin', '0', 'Controls legend margin.'],
  ['--fieldset-legend-padding', '0 0 var(--spacing-3)', 'Controls legend padding.'],
  ['--fieldset-margin', '0', 'Controls root margin.'],
  ['--fieldset-max-width', 'none', 'Controls root max width.'],
  ['--fieldset-message-font-size', 'var(--text-sm)', 'Controls helper and error font size.'],
  [
    '--fieldset-message-line-height',
    'var(--line-height-text-sm)',
    'Controls helper and error line height.',
  ],
  ['--fieldset-padding', '0', 'Controls root padding.'],
  ['--fieldset-radius', 'var(--radius-none)', 'Controls root corner radius.'],
  ['--fieldset-width', '100%', 'Controls root width.'],
];

export function FieldsetCssPropertiesPanel(_context: CSSPropertiesEditorContext) {
  return (
    <CSSPropertiesReferenceTable
      properties={fieldsetOverrideCssProperties.map(normalizeCssProperty)}
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
      <Fieldset.Legend>Contact details</Fieldset.Legend>
      <Field.Root>
        <Field.Label>Name</Field.Label>
        <Field.Input name="name" />
      </Field.Root>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Input name="email" type="email" />
      </Field.Root>
      <Fieldset.HelperText>We only use these details to contact you.</Fieldset.HelperText>
    </Fieldset>
  );
}

export function FieldsetWithFieldExample() {
  return (
    <Fieldset className={styles.fieldset}>
      <Fieldset.Legend>Personal information</Fieldset.Legend>
      <Field.Root>
        <Field.Label>First name</Field.Label>
        <Field.Input />
        <Field.HelperText>As it appears on your ID.</Field.HelperText>
      </Field.Root>
      <Field.Root>
        <Field.Label>Last name</Field.Label>
        <Field.Input />
      </Field.Root>
    </Fieldset>
  );
}

export function FieldsetCheckboxExample() {
  return (
    <Fieldset className={styles.fieldset}>
      <Fieldset.Legend>Email preferences</Fieldset.Legend>
      {preferences.map((preference) => (
        <Checkbox.Root key={preference.value} value={preference.value}>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>{preference.label}</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox.Root>
      ))}
    </Fieldset>
  );
}

export function FieldsetRootProviderExample() {
  const fieldset = useFieldset({ invalid: true });

  return (
    <Fieldset.RootProvider value={fieldset} className={styles.fieldset}>
      <Fieldset.Legend>Contact details</Fieldset.Legend>
      <Field.Root>
        <Field.Label>Email</Field.Label>
        <Field.Input type="email" defaultValue="invalid-address" />
      </Field.Root>
      <Fieldset.ErrorText>Enter a valid email address.</Fieldset.ErrorText>
      <Fieldset.Context>
        {(context) => <output className={styles.state}>Invalid: {String(context.invalid)}</output>}
      </Fieldset.Context>
    </Fieldset.RootProvider>
  );
}

export function FieldsetPhoneInputExample() {
  return (
    <Fieldset className={styles.fieldset}>
      <Fieldset.Legend>Mobile number</Fieldset.Legend>
      <div className={styles.phoneInput}>
        <Field.Root>
          <Field.Label>Code</Field.Label>
          <Field.Select aria-label="Country code">
            {countryCodes.map((code) => (
              <option key={code}>{code}</option>
            ))}
          </Field.Select>
        </Field.Root>
        <Field.Root>
          <Field.Label>Phone</Field.Label>
          <Field.Input type="tel" aria-label="Phone number" />
        </Field.Root>
      </div>
      <Fieldset.HelperText>Include the area code.</Fieldset.HelperText>
    </Fieldset>
  );
}

export function CustomStylesFieldsetExample() {
  return (
    <Fieldset className={`${styles.fieldset} ${styles.customFieldset}`}>
      <Fieldset.Legend>Styled fieldset</Fieldset.Legend>
      <Field.Root>
        <Field.Label>Project name</Field.Label>
        <Field.Input placeholder="Maps Platform" />
      </Field.Root>
      <Fieldset.HelperText>Visible to project members.</Fieldset.HelperText>
    </Fieldset>
  );
}