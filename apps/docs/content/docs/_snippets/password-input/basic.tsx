/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { PasswordInput } from '@moduix/react';

export function PasswordInputDemo() {
  return (
    <PasswordInput autoComplete="current-password">
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Field />
    </PasswordInput>
  );
}

//#endregion