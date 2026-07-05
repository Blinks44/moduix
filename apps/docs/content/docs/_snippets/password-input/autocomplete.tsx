/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { PasswordInput } from '@moduix/react';

export function PasswordInputAutocompleteDemo() {
  return (
    <PasswordInput autoComplete="new-password" name="new-password">
      <PasswordInput.Label>New password</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input placeholder="Create a password" />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator />
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput>
  );
}

//#endregion