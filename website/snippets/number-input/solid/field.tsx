import { Field } from '@moduix/solid/field';
import { NumberInput } from '@moduix/solid/number-input';
import styles from '@/components/examples/number-input/number-input-field.module.css';

export default function NumberInputFieldDemo() {
  return (
    <Field class={styles.root} invalid>
      <NumberInput min={1} max={10} required>
        <NumberInput.Label>Items</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput>
      <Field.HelperText>Choose between 1 and 10 items.</Field.HelperText>
      <Field.ErrorText>Value should be between 1 and 10.</Field.ErrorText>
    </Field>
  );
}