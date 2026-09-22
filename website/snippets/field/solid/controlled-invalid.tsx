import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/field/field-controlled-invalid.module.css';

export default function ControlledInvalidFieldDemo() {
  const [value, setValue] = createSignal('');
  const invalid = () => value().length > 0 && value().length < 3;

  return (
    <Field class={styles.root} invalid={invalid()}>
      <FieldLabel>Username</FieldLabel>
      <Input
        value={value()}
        onInput={(event) => setValue(event.currentTarget.value)}
        placeholder="e.g. vinny"
      />
      <FieldHelperText>Use at least 3 characters.</FieldHelperText>
      <FieldErrorText>Username must be at least 3 characters.</FieldErrorText>
    </Field>
  );
}