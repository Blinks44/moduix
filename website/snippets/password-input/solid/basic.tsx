import { PasswordInput } from '@moduix/solid/password-input';
import styles from '@/components/examples/password-input/password-input-basic.module.css';

export default function PasswordInputDemo() {
  return (
    <PasswordInput class={styles.root} autoComplete="current-password">
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Field />
    </PasswordInput>
  );
}