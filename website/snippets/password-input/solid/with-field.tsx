import { Field, FieldErrorText, FieldHelperText } from '@moduix/solid/field';
import { PasswordInput } from '@moduix/solid/password-input';
import styles from '@/components/examples/password-input/password-input-with-field.module.css';

export default function PasswordInputWithFieldDemo() {
  return (
    <Field class={styles.root} invalid>
      <PasswordInput required>
        <PasswordInput.Label>Password</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input placeholder="Enter your password" />
          <PasswordInput.VisibilityTrigger>
            <PasswordInput.Indicator />
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput>
      <FieldHelperText>Enter your password.</FieldHelperText>
      <FieldErrorText>Password is required.</FieldErrorText>
    </Field>
  );
}
