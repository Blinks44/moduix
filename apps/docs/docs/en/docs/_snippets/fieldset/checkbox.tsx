import { Checkbox, Fieldset } from '@moduix/react';

const preferences = [
  {
    label: 'Product updates',
    value: 'product',
  },
  {
    label: 'Marketing emails',
    value: 'marketing',
  },
];
export default function EmailPreferences() {
  return (
    <Fieldset className="fieldset">
      <Fieldset.Legend>Email preferences</Fieldset.Legend>
      {preferences.map((preference) => (
        <Checkbox key={preference.value} value={preference.value}>
          <Checkbox.Control />
          <Checkbox.Label>{preference.label}</Checkbox.Label>
        </Checkbox>
      ))}
    </Fieldset>
  );
}