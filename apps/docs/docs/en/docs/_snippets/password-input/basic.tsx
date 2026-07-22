import { PasswordInput } from '@moduix/react';

export default function PasswordInputDemo() {
  return (
    <PasswordInput autoComplete="current-password">
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Field />
    </PasswordInput>
  );
}