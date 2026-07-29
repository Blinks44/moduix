import { PasswordInput, usePasswordInput } from '@moduix/react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function PasswordInputRootProviderDemo() {
  const passwordInput = usePasswordInput();
  return (
    <>
      <PasswordInput.RootProvider value={passwordInput}>
        <PasswordInput.Label>Password</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input placeholder="Managed outside the tree" />
          <PasswordInput.VisibilityTrigger>
            <PasswordInput.Indicator />
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput.RootProvider>
      <PreviewMeta>
        <output>Visibility: {passwordInput.visible ? 'visible' : 'hidden'}</output>
      </PreviewMeta>
    </>
  );
}