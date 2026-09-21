import { Field, FieldErrorText } from '@moduix/react/field';
import { PasswordInput } from '@moduix/react/password-input';
import { useState } from 'react';
import styles from '@/components/examples/password-input/password-input-with-validation.module.css';

export default function PasswordInputValidationDemo() {
  const [password, setPassword] = useState('');
  const isValid = password.length >= 8;
  const invalid = !isValid && password.length > 0;
  return (
    <Field className={styles.root} invalid={invalid}>
      <PasswordInput>
        <PasswordInput.Label>Password (min 8 characters)</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input
            value={password}
            onChange={(event) => setPassword(event.currentTarget.value)}
            placeholder="Enter your password"
          />
          <PasswordInput.VisibilityTrigger>
            <PasswordInput.Indicator />
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput>
      <FieldErrorText>Password must be at least 8 characters.</FieldErrorText>
    </Field>
  );
}
