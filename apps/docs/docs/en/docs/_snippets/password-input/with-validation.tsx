import { Field } from '@moduix/react/field';
import { PasswordInput } from '@moduix/react/password-input';
import { useState } from 'react';

export default function PasswordInputValidationDemo() {
  const [password, setPassword] = useState('');
  const isValid = password.length >= 8;
  const invalid = !isValid && password.length > 0;
  return (
    <Field invalid={invalid}>
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
      <Field.ErrorText>Password must be at least 8 characters.</Field.ErrorText>
    </Field>
  );
}