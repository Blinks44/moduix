import { Field } from '@moduix/react';

const currencyOptions = [
  {
    label: 'USD',
    value: 'USD',
  },
  {
    label: 'EUR',
    value: 'EUR',
  },
  {
    label: 'GBP',
    value: 'GBP',
  },
];
export default function ItemFieldDemo() {
  return (
    <Field target="amount">
      <Field.Label>Amount</Field.Label>
      <div className="inlineControls">
        <Field.Item value="currency">
          <Field.Select aria-label="Currency" defaultValue="USD">
            {currencyOptions.map((option) => (
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