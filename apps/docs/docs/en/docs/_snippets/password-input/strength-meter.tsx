import { PasswordInput } from '@moduix/react';
import { useState } from 'react';

export default function PasswordInputStrengthMeterDemo() {
  const [password, setPassword] = useState('asdfasdf');
  const strength = getPasswordStrength(password);
  return (
    <PasswordInput>
      <PasswordInput.Label>Password</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input
          value={password}
          onChange={(event) => setPassword(event.currentTarget.value)}
          placeholder="Enter your password"
        />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator />
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
      {strength ? (
        <div className="password-input-demo-strength-meter">
          <div className="password-input-demo-strength-bar">
            <div className="password-input-demo-strength-fill" data-strength={strength} />
          </div>
          <div className="password-input-demo-strength-label">{strength} password</div>
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