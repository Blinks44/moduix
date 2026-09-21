import { Field, FieldErrorText, FieldHelperText, FieldLabel } from '@moduix/solid/field';
import { Input } from '@moduix/solid/input';
import styles from '@/components/examples/field/field-invalid.module.css';

export default function InvalidFieldDemo() {
  return (
    <Field class={styles.root} invalid required>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="name@example.com" />
      <FieldHelperText>Use your work email.</FieldHelperText>
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </Field>
  );
}
