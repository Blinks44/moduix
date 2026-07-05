/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { PasswordInput } from '@moduix/react';

export function PasswordInputIgnorePasswordManagersDemo() {
  return (
    <PasswordInput ignorePasswordManagers>
      <PasswordInput.Label>API key</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input defaultValue="spd_1234567890" />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator />
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput>
  );
}

//#endregion