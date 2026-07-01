import type { ComponentProps } from 'react';
import { createListCollection } from '@ark-ui/react/collection';
import { Checkbox, Field, Fieldset, Select, useFieldset } from '@moduix/react';
import type { CSSPropertiesEditorContext, CssPropertyInput } from '../preview';
import { CSSPropertiesReferenceTable } from '../preview';
import styles from './fieldset.module.css';

export const fieldsetExampleCss = `
  .fieldset {
    width: min(20rem, 100%);
    margin-inline: auto;
  }
`;

export const fieldsetPhoneInputCss = `
  .fieldset {
    width: min(20rem, 100%);
    margin-inline: auto;
  }

  .phone-input {
    display: grid;
    grid-template-columns: minmax(0, 6rem) minmax(0, 1fr);
    gap: var(--spacing-2);
  }

  .country-code {
    --select-width: 100%;
  }
`;

export const fieldsetCustomStylingCss = `
  .fieldset {
    width: min(20rem, 100%);
    margin-inline: auto;
  }

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

const countryCodeItems = [
  { label: '+1', value: '+1' },
  { label: '+44', value: '+44' },
  { label: '+49', value: '+49' },
  { label: '+41', value: '+41' },
];

const countryCodes = createListCollection({ items: countryCodeItems });

export const fieldsetCountryCodesData = `const countryCodes = createListCollection({
  items: [
    { label: '+1', value: '+1' },
    { label: '+44', value: '+44' },
    { label: '+49', value: '+49' },
    { label: '+41', value: '+41' },
  ],
});`;
export const fieldsetDisabledData = `const lockedAddress = {
  street: '123 Main St',
  city: 'San Francisco',
};`;
export const fieldsetEmptyData = `const initialFieldsetState = { disabled: false, invalid: false };`;
export const fieldsetInvalidData = `const validation = {
  username: 'Username must be at least 3 characters.',
  email: 'Enter a valid email address.',
};`;

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
      <Field>
        <Field.Label>Name</Field.Label>
        <Field.Input name="name" />
      </Field>
      <Field>
        <Field.Label>Email</Field.Label>
        <Field.Input name="email" type="email" />
      </Field>
      <Fieldset.HelperText>We only use these details to contact you.</Fieldset.HelperText>
    </Fieldset>
  );
}

export function FieldsetWithFieldExample() {
  return (
    <Fieldset className={styles.fieldset}>
      <Fieldset.Legend>Personal information</Fieldset.Legend>
      <Field>
        <Field.Label>First name</Field.Label>
        <Field.Input />
        <Field.HelperText>As it appears on your ID.</Field.HelperText>
      </Field>
      <Field>
        <Field.Label>Last name</Field.Label>
        <Field.Input />
      </Field>
    </Fieldset>
  );
}

export function FieldsetDisabledExample() {
  return (
    <Fieldset className={styles.fieldset} disabled>
      <Fieldset.Legend>Shipping address</Fieldset.Legend>
      <Fieldset.HelperText>
        Your address cannot be changed after order confirmation.
      </Fieldset.HelperText>
      <Field>
        <Field.Label>Street</Field.Label>
        <Field.Input defaultValue="123 Main St" />
      </Field>
      <Field>
        <Field.Label>City</Field.Label>
        <Field.Input defaultValue="San Francisco" />
      </Field>
    </Fieldset>
  );
}

export function FieldsetInvalidExample() {
  return (
    <Fieldset className={styles.fieldset} invalid>
      <Fieldset.Legend>Account information</Fieldset.Legend>
      <Fieldset.ErrorText>Please fix the errors below to continue.</Fieldset.ErrorText>
      <Field invalid>
        <Field.Label>Username</Field.Label>
        <Field.Input defaultValue="jo" />
        <Field.ErrorText>Username must be at least 3 characters.</Field.ErrorText>
      </Field>
      <Field invalid>
        <Field.Label>Email</Field.Label>
        <Field.Input type="email" defaultValue="invalid-email" />
        <Field.ErrorText>Enter a valid email address.</Field.ErrorText>
      </Field>
    </Fieldset>
  );
}

export function FieldsetCheckboxExample() {
  return (
    <Fieldset className={styles.fieldset}>
      <Fieldset.Legend>Email preferences</Fieldset.Legend>
      {preferences.map((preference) => (
        <Checkbox key={preference.value} value={preference.value}>
          <Checkbox.Control>
            <Checkbox.Indicator />
          </Checkbox.Control>
          <Checkbox.Label>{preference.label}</Checkbox.Label>
          <Checkbox.HiddenInput />
        </Checkbox>
      ))}
    </Fieldset>
  );
}

export function FieldsetRootProviderExample() {
  const fieldset = useFieldset({ invalid: true });

  return (
    <Fieldset.RootProvider value={fieldset} className={styles.fieldset}>
      <Fieldset.Legend>Contact details</Fieldset.Legend>
      <Field>
        <Field.Label>Email</Field.Label>
        <Field.Input type="email" defaultValue="invalid-address" />
      </Field>
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
        <Select className={styles.countryCode} collection={countryCodes} defaultValue={['+1']}>
          <Select.Label>Code</Select.Label>
          <Select.Control>
            <Select.Trigger>
              <Select.ValueText />
            </Select.Trigger>
            <Select.Indicators>
              <Select.Indicator />
            </Select.Indicators>
          </Select.Control>
          <Select.Positioner>
            <Select.Content>
              {countryCodes.items.map((item) => (
                <Select.Item key={item.value} item={item}>
                  <Select.ItemText>{item.label}</Select.ItemText>
                  <Select.ItemIndicator />
                </Select.Item>
              ))}
            </Select.Content>
          </Select.Positioner>
          <Select.HiddenSelect name="countryCode" />
        </Select>
        <Field>
          <Field.Label>Phone</Field.Label>
          <Field.Input type="tel" aria-label="Phone number" />
        </Field>
      </div>
      <Fieldset.HelperText>Include the area code.</Fieldset.HelperText>
    </Fieldset>
  );
}

export function CustomStylesFieldsetExample() {
  return (
    <Fieldset className={`${styles.fieldset} ${styles.customFieldset}`}>
      <Fieldset.Legend>Styled fieldset</Fieldset.Legend>
      <Field>
        <Field.Label>Project name</Field.Label>
        <Field.Input placeholder="Maps Platform" />
      </Field>
      <Fieldset.HelperText>Visible to project members.</Fieldset.HelperText>
    </Fieldset>
  );
}