import { PasswordInput } from '@moduix/react';
import { useState } from 'react';

export default function ControlledPasswordInputVisibilityDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <PasswordInput visible={visible} onVisibilityChange={(details) => setVisible(details.visible)}>
      <PasswordInput.Label>Password is {visible ? 'visible' : 'hidden'}</PasswordInput.Label>
      <PasswordInput.Control>
        <PasswordInput.Input placeholder="Toggle visibility" />
        <PasswordInput.VisibilityTrigger>
          <PasswordInput.Indicator />
        </PasswordInput.VisibilityTrigger>
      </PasswordInput.Control>
    </PasswordInput>
  );
}