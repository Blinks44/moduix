import { Field, FieldHelperText, FieldItem, FieldLabel } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import { NativeSelect } from '@moduix/react/native-select';
import styles from '@/components/examples/field/field-item-target.module.css';

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
    <Field className={styles.root} target="amount">
      <FieldLabel>Amount</FieldLabel>
      <div className={styles.inlineControls}>
        <FieldItem value="currency">
          <NativeSelect aria-label="Currency" defaultValue="USD">
            {currencyOptions.map((option) => (
              <option key={option.value} value={option.value}>
                {option.label}
              </option>
            ))}
          </NativeSelect>
        </FieldItem>
        <FieldItem value="amount">
          <Input inputMode="decimal" placeholder="0.00" />
        </FieldItem>
      </div>
      <FieldHelperText>The root label targets the amount input.</FieldHelperText>
    </Field>
  );
}