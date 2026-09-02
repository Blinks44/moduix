import { Spinner } from '@moduix/react/spinner';
import styles from '@/components/examples/spinner/spinner-inline-loading-text.module.css';

export default function SpinnerInlineDemo() {
  return (
    <div className={styles.root}>
      <Spinner decorative size="inherit" />
      <span className={styles.label}>Saving changes</span>
    </div>
  );
}