/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { PasswordInput } from '@moduix/react';
import { useState } from 'react';

export function PasswordInputValidationDemo() {
  const [password, setPassword] = useState('');
  const isValid = password.length >= 8;
  const invalid = !isValid && password.length > 0;
  return (
    <PasswordInput invalid={invalid}>
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
      {password.length > 0 ? (
        <p className="password-input-demo-validation-message" data-valid={isValid}>
          {isValid ? 'Password is valid.' : 'Password must be at least 8 characters.'}
        </p>
      ) : null}
    </PasswordInput>
  );
}

//#endregion