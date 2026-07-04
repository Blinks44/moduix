/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { PasswordInput } from '@moduix/react';

const secret = 'readonly-secret';

export function CustomPasswordInputDemo() {
  return (
    <PasswordInput className="password-input-demo-custom">
      <PasswordInput.Label>Workspace secret</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input defaultValue="readonly-secret" readOnly />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator />
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput>
  );
}

//#endregion