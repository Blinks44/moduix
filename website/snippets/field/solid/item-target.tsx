import { Field, FieldHelperText, FieldItem, FieldLabel } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import { NativeSelect } from '@moduix/solid/native-select';
import styles from '@/components/examples/field/field-item-target.module.css';

const currencyOptions = [
  { label: 'USD', value: 'USD' },
  { label: 'EUR', value: 'EUR' },
  { label: 'GBP', value: 'GBP' },
];

export default function ItemFieldDemo() {
  return (
    <Field class={styles.root} target="amount">
      <FieldLabel>Amount</FieldLabel>
      <div class={styles.inlineControls}>
        <FieldItem value="currency">
          <NativeSelect aria-label="Currency">
            {currencyOptions.map((option) => (
              <option value={option.value} selected={option.value === 'USD'}>
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