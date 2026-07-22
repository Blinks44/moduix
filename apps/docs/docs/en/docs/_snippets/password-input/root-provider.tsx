import { PasswordInput, usePasswordInput } from '@moduix/react';

export default function PasswordInputRootProviderDemo() {
  const passwordInput = usePasswordInput();
  return (
    <div className="password-input-demo-stack">
      <output>password input is {passwordInput.visible ? 'visible' : 'hidden'}</output>
      <PasswordInput.RootProvider value={passwordInput}>
        <PasswordInput.Label>Password</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input placeholder="Managed outside the tree" />
          <PasswordInput.VisibilityTrigger>
            <PasswordInput.Indicator />
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput.RootProvider>
    </div>
  );
}