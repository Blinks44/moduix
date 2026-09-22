import { Field, FieldErrorText } from '@moduix/solid/field';
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/solid/password-input';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/password-input/password-input-with-validation.module.css';

export default function PasswordInputValidationDemo() {
  const [password, setPassword] = createSignal('');
  const isValid = () => password().length >= 8;
  const invalid = () => !isValid() && password().length > 0;

  return (
    <Field class={styles.root} invalid={invalid()}>
      <PasswordInput>
        <PasswordInputLabel>Password (min 8 characters)</PasswordInputLabel>
        <PasswordInputControl>
          <PasswordInputInput
            value={password()}
            onInput={(event) => setPassword(event.currentTarget.value)}
            placeholder="Enter your password"
          />
          <PasswordInputVisibilityTrigger>
            <PasswordInputIndicator />
          </PasswordInputVisibilityTrigger>
        </PasswordInputControl>
      </PasswordInput>
      <FieldErrorText>Password must be at least 8 characters.</FieldErrorText>
    </Field>
  );
}