import { Field, FieldErrorText, FieldHelperText } from '@moduix/react/field';
import { NumberInput } from '@moduix/react/number-input';
import styles from '@/components/examples/number-input/number-input-field.module.css';

export default function NumberInputFieldDemo() {
  return (
    <Field className={styles.root} invalid>
      <NumberInput min={1} max={10} required>
        <NumberInput.Label>Items</NumberInput.Label>
        <NumberInput.Field />
      </NumberInput>
      <FieldHelperText>Choose between 1 and 10 items.</FieldHelperText>
      <FieldErrorText>Value should be between 1 and 10.</FieldErrorText>
    </Field>
  );
}
