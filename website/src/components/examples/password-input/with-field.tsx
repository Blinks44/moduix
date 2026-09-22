import { Field, FieldErrorText, FieldHelperText } from '@moduix/react/field';
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/react/password-input';
import styles from '@/components/examples/password-input/password-input-with-field.module.css';

export default function PasswordInputWithFieldDemo() {
  return (
    <Field className={styles.root} invalid>
      <PasswordInput required>
        <PasswordInputLabel>Password</PasswordInputLabel>
        <PasswordInputControl>
          <PasswordInputInput placeholder="Enter your password" />
          <PasswordInputVisibilityTrigger>
            <PasswordInputIndicator />
          </PasswordInputVisibilityTrigger>
        </PasswordInputControl>
      </PasswordInput>
      <FieldHelperText>Enter your password.</FieldHelperText>
      <FieldErrorText>Password is required.</FieldErrorText>
    </Field>
  );
}
