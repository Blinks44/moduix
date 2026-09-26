import {
  PasswordInput,
  PasswordInputControl,
  PasswordInputIndicator,
  PasswordInputInput,
  PasswordInputLabel,
  PasswordInputVisibilityTrigger,
} from '@moduix/solid/password-input';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/password-input/password-input-controlled-visibility.module.css';

export default function ControlledPasswordInputVisibilityDemo() {
  const [visible, setVisible] = createSignal(false);

  return (
    <>
      <PasswordInput
        class={styles.root}
        visible={visible()}
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
      <output>Visibility: {visible() ? 'visible' : 'hidden'}</output>
    </>
  );
}