import { PasswordInput } from '@moduix/react/password-input';
import styles from '@/components/examples/password-input/password-input-advanced-customization.module.css';

export default function PasswordInputAdvancedCustomizationDemo() {
  return (
    <PasswordInput className={styles.root}>
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input placeholder="Enter your password" />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator />
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput>
  );
}