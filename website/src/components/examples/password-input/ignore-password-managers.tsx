import { PasswordInput } from '@moduix/react/password-input';
import styles from '@/components/examples/password-input/password-input-ignore-password-managers.module.css';

export default function PasswordInputIgnorePasswordManagersDemo() {
  return (
    <PasswordInput className={styles.root} ignorePasswordManagers>
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