import { Field } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/field/field-controlled-invalid.module.css';

export default function ControlledInvalidFieldDemo() {
  const [value, setValue] = createSignal('');
  const invalid = () => value().length > 0 && value().length < 3;

  return (
    <Field class={styles.root} invalid={invalid()}>
      <Field.Label>Username</Field.Label>
      <Input
        value={value()}
        onInput={(event) => setValue(event.currentTarget.value)}
        placeholder="e.g. vinny"
      />
      <Field.HelperText>Use at least 3 characters.</Field.HelperText>
      <Field.ErrorText>Username must be at least 3 characters.</Field.ErrorText>
    </Field>
  );
}