import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/solid/password-input';
import styles from '@/components/examples/password-input/password-input-advanced-customization.module.css';

export default function PasswordInputAdvancedCustomizationDemo() {
  return (
    <PasswordInput class={styles.root}>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputControl>
        <PasswordInputInput placeholder="Enter your password" />
        <PasswordInputVisibilityTrigger>
          <PasswordInputIndicator />
        </PasswordInputVisibilityTrigger>
      </PasswordInputControl>
    </PasswordInput>
  );
}