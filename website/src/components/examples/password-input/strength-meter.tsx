import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/react/password-input';
import { useState } from 'react';
import styles from '@/components/examples/password-input/password-input-strength-meter.module.css';

export default function PasswordInputStrengthMeterDemo() {
  const [password, setPassword] = useState('asdfasdf');
  const strength = getPasswordStrength(password);
  return (
    <PasswordInput className={styles.root}>
      <PasswordInputLabel>Password</PasswordInputLabel>
      <PasswordInputControl>
        <PasswordInputInput
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          placeholder="Enter your password"
        />
        <PasswordInputVisibilityTrigger>
          <PasswordInputIndicator />
        </PasswordInputVisibilityTrigger>
      </PasswordInputControl>
      {strength ? (
        <div className={styles.strengthMeter}>
          <div className={styles.strengthBar}>
            <div className={styles.strengthFill} data-strength={strength} />
          </div>
          <div className={styles.strengthLabel}>{strength} password</div>
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
