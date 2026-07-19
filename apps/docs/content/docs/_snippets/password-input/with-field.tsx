/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Field, PasswordInput } from '@moduix/react';

export function PasswordInputWithFieldDemo() {
  return (
    <Field className="password-input-demo-field" invalid>
      <PasswordInput required>
        <PasswordInput.Label>Password</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input placeholder="Enter your password" />
          <PasswordInput.VisibilityTrigger>
            <PasswordInput.Indicator />
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput>
      <Field.HelperText>Enter your password.</Field.HelperText>
      <Field.ErrorText>Password is required.</Field.ErrorText>
    </Field>
  );
}

//#endregion