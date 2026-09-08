import { CloseButton } from '@moduix/solid/close-button';
import styles from '@/components/examples/close-button/close-button-disabled-state.module.css';

export default function CloseButtonDisabledDemo() {
  return (
    <div class={styles.root}>
      <div class={styles.row}>
        <CloseButton disabled aria-label="Close unavailable message" />
        <span>Native disabled</span>
      </div>
      <div class={styles.row}>
        <CloseButton aria-disabled="true" aria-label="Close unavailable notification" />
        <span>ARIA disabled</span>
      </div>
    </div>
  );
}