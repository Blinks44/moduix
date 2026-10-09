import { Field, FieldErrorText } from '@moduix/react/field';
import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/react/password-input';
import { useState } from 'react';
import styles from '@/components/examples/password-input/password-input-with-validation.module.css';

export default function PasswordInputValidationDemo() {
  const [password, setPassword] = useState('');
  const isValid = password.length >= 8;
  const invalid = !isValid && password.length > 0;
  return (
    <Field className={styles.root} invalid={invalid}>
      <PasswordInput>
        <PasswordInputLabel>Password (min 8 characters)</PasswordInputLabel>
        <PasswordInputControl>
          <PasswordInputInput
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
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