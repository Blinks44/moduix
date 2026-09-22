import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/solid/password-input';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/password-input/password-input-strength-meter.module.css';

export default function PasswordInputStrengthMeterDemo() {
  const [password, setPassword] = createSignal('asdfasdf');
  const strength = () => getPasswordStrength(password());

  return (
    <PasswordInput class={styles.root}>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputControl>
        <PasswordInputInput
          value={password()}
          onInput={(event) => setPassword(event.currentTarget.value)}
          placeholder="Enter your password"
        />
        <PasswordInputVisibilityTrigger>
          <PasswordInputIndicator />
        </PasswordInputVisibilityTrigger>
      </PasswordInputControl>
      {strength() ? (
        <div class={styles.strengthMeter}>
          <div class={styles.strengthBar}>
            <div class={styles.strengthFill} data-strength={strength()} />
          </div>
          <div class={styles.strengthLabel}>{strength()} password</div>
        </div>
      ) : null}
    </PasswordInput>
  );
}

function getPasswordStrength(password: string) {
  if (!password) return null;
  if (password.length >= 10 && /[0-9]/.test(password) && /[^a-zA-Z0-9]/.test(password)) {
    return 'strong';
  }
  if (password.length >= 6) return 'medium';
  return 'weak';
}
