import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputRootProvider,
  PasswordInputVisibilityTrigger,
  usePasswordInput,
} from '@moduix/solid/password-input';
import styles from '@/components/examples/password-input/password-input-root-provider.module.css';

export default function PasswordInputRootProviderDemo() {
  const passwordInput = usePasswordInput();

  return (
    <>
      <PasswordInputRootProvider class={styles.root} value={passwordInput}>
        <PasswordInputLabel>Password</PasswordInputLabel>
        <PasswordInputControl>
          <PasswordInputInput placeholder="Managed outside the tree" />
          <PasswordInputVisibilityTrigger>
            <PasswordInputIndicator />
          </PasswordInputVisibilityTrigger>
        </PasswordInputControl>
      </PasswordInputRootProvider>
      <output>Visibility: {passwordInput().visible ? 'visible' : 'hidden'}</output>
    </>
  );
}
