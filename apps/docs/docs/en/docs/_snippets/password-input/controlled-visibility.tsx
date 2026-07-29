import { PasswordInput } from '@moduix/react';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function ControlledPasswordInputVisibilityDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <PasswordInput
        visible={visible}
        onVisibilityChange={(details) => setVisible(details.visible)}
      >
        <PasswordInput.Label>Password</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input placeholder="Toggle visibility" />
          <PasswordInput.VisibilityTrigger>
            <PasswordInput.Indicator />
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput>
      <PreviewMeta>
        <output>Visibility: {visible ? 'visible' : 'hidden'}</output>
      </PreviewMeta>
    </>
  );
}