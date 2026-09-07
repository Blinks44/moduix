import { Spinner } from '@moduix/solid/spinner';
import styles from '@/components/examples/spinner/spinner-inline-loading-text.module.css';

export default function SpinnerInlineDemo() {
  return (
    <div class={styles.root}>
      <Spinner decorative size="inherit" />
      <span class={styles.label}>Saving changes</span>
    </div>
  );
}