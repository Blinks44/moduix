import {
  PasswordInput,
  PasswordInputField,
  PasswordInputLabel,
} from '@moduix/react/password-input';
import styles from '@/components/examples/password-input/password-input-basic.module.css';

export default function PasswordInputDemo() {
  return (
    <PasswordInput className={styles.root} autoComplete="current-password">
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputField />
    </PasswordInput>
  );
}
