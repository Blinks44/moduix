import { PasswordInput } from '@moduix/solid/password-input';
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
        <PasswordInput.Label>Password</PasswordInput.Label>
        <PasswordInput.Control>
          <PasswordInput.Input placeholder="Toggle visibility" />
          <PasswordInput.VisibilityTrigger>
            <PasswordInput.Indicator />
          </PasswordInput.VisibilityTrigger>
        </PasswordInput.Control>
      </PasswordInput>
      <output>Visibility: {visible() ? 'visible' : 'hidden'}</output>
    </>
  );
}