import { Field, FieldErrorText, FieldLabel } from '@moduix/react/field';
import { Input } from '@moduix/react/input';
import styles from '@/components/examples/input/input-field-state.module.css';

export default function InvalidInputDemo() {
  return (
    <Field className={styles.root} invalid>
      <FieldLabel>Email</FieldLabel>
      <Input type="email" placeholder="name@example.com" />
      <FieldErrorText>Enter a valid email address.</FieldErrorText>
    </Field>
  );
}