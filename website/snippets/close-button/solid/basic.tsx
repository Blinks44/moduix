import { CloseButton } from '@moduix/solid/close-button';
import { createSignal, Show } from 'solid-js';
import styles from '@/components/examples/close-button/close-button-basic.module.css';

export default function CloseButtonDemo() {
  const [isVisible, setIsVisible] = createSignal(true);

  return (
    <Show when={isVisible()} fallback={<output>Notification dismissed</output>}>
      <div class={styles.root}>
        <CloseButton
          aria-label="Dismiss notification"
          class={styles.closeButton}
          onClick={() => setIsVisible(false)}
        />
        <p class={styles.title}>Draft saved</p>
        <p class={styles.description}>The notification can be dismissed.</p>
      </div>
    </Show>
  );
}