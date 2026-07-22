import { Spinner } from '@moduix/react';
import styles from '@/components/examples/spinner.module.css';

export default function SpinnerInlineDemo() {
  return (
    <div className={styles.inline}>
      <Spinner decorative size="sm" />
      <span className={styles.muted}>Saving changes</span>
    </div>
  );
}