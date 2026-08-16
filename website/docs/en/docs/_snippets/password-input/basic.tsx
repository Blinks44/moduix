import { PasswordInput } from '@moduix/react/password-input';

export default function PasswordInputDemo() {
  return (
    <PasswordInput autoComplete="current-password">
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Field />
    </PasswordInput>
  );
}