import { PasswordInput } from '@moduix/react';

export default function PasswordInputIgnorePasswordManagersDemo() {
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