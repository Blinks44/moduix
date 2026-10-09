import {
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputRootProvider,
  PasswordInputVisibilityTrigger,
  usePasswordInput,
} from '@moduix/react/password-input';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/password-input/password-input-root-provider.module.css';

export default function PasswordInputRootProviderDemo() {
  const passwordInput = usePasswordInput();
  return (
    <>
      <PasswordInputRootProvider className={styles.root} value={passwordInput}>
        <PasswordInputLabel>Password</PasswordInputLabel>
        <PasswordInputControl>
          <PasswordInputInput placeholder="Managed outside the tree" />
          <PasswordInputVisibilityTrigger>
            <PasswordInputIndicator />
          </PasswordInputVisibilityTrigger>
        </PasswordInputControl>
      </PasswordInputRootProvider>
      <PreviewMeta>
        <output>Visibility: {passwordInput.visible ? 'visible' : 'hidden'}</output>
      </PreviewMeta>
    </>
  );
}