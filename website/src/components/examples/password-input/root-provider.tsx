import { PasswordInput, usePasswordInput } from '@moduix/react/password-input';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/password-input/password-input-root-provider.module.css';

export default function PasswordInputRootProviderDemo() {
  const passwordInput = usePasswordInput();
  return (
    <>
      <PasswordInput.RootProvider className={styles.root} value={passwordInput}>
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