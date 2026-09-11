import { PasswordInput, usePasswordInput } from '@moduix/solid/password-input';
import styles from '@/components/examples/password-input/password-input-root-provider.module.css';

export default function PasswordInputRootProviderDemo() {
  const passwordInput = usePasswordInput();

  return (
    <>
      <PasswordInput.RootProvider class={styles.root} value={passwordInput}>
        <PasswordInput.Label>Password</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input placeholder="Managed outside the tree" />
          <PasswordInput.VisibilityTrigger>
            <PasswordInput.Indicator />
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput.RootProvider>
      <output>Visibility: {passwordInput().visible ? 'visible' : 'hidden'}</output>
    </>
  );
}