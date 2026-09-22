import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/solid/password-input';
import styles from '@/components/examples/password-input/password-input-ignore-password-managers.module.css';

export default function PasswordInputIgnorePasswordManagersDemo() {
  return (
    <PasswordInput class={styles.root} ignorePasswordManagers>
      <PasswordInputLabel>API key</PasswordInputLabel>
      <PasswordInputControl>
        <PasswordInputInput defaultValue="spd_1234567890" />
        <PasswordInputVisibilityTrigger>
          <PasswordInputIndicator />
        </PasswordInputVisibilityTrigger>
      </PasswordInputControl>
    </PasswordInput>
  );
}