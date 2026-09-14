import { Field } from '@moduix/solid/field';
import { PasswordInput } from '@moduix/solid/password-input';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/password-input/password-input-with-validation.module.css';

export default function PasswordInputValidationDemo() {
  const [password, setPassword] = createSignal('');
  const isValid = () => password().length >= 8;
  const invalid = () => !isValid() && password().length > 0;

  return (
    <Field class={styles.root} invalid={invalid()}>
      <PasswordInput>
        <PasswordInput.Label>Password (min 8 characters)</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input
            value={password()}
            onInput={(event) => setPassword(event.currentTarget.value)}
            placeholder="Enter your password"
          />
          <PasswordInput.VisibilityTrigger>
            <PasswordInput.Indicator />
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput>
      <Field.ErrorText>Password must be at least 8 characters.</Field.ErrorText>
    </Field>
  );
}