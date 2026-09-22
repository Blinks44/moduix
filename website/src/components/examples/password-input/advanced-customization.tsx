import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/react/password-input';
import styles from '@/components/examples/password-input/password-input-advanced-customization.module.css';

export default function PasswordInputAdvancedCustomizationDemo() {
  return (
    <PasswordInput className={styles.root}>
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