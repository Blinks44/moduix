import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/react/password-input';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/password-input/password-input-controlled-visibility.module.css';

export default function ControlledPasswordInputVisibilityDemo() {
  const [visible, setVisible] = useState(false);
  return (
    <>
      <PasswordInput
        className={styles.root}
        visible={visible}
        onVisibilityChange={(details) => setVisible(details.visible)}
      >
        <PasswordInputLabel>Password</PasswordInputLabel>
        <PasswordInputControl>
          <PasswordInputInput placeholder="Toggle visibility" />
          <PasswordInputVisibilityTrigger>
            <PasswordInputIndicator />
          </PasswordInputVisibilityTrigger>
        </PasswordInputControl>
      </PasswordInput>
      <PreviewMeta>
        <output>Visibility: {visible ? 'visible' : 'hidden'}</output>
      </PreviewMeta>
    </>
  );
}
