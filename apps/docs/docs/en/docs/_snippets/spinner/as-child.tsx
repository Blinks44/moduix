import { Spinner } from '@moduix/react';
import styles from '@/components/examples/spinner.module.css';

export default function SpinnerAsChildDemo() {
  return (
    <Spinner asChild size="lg" aria-label="Loading report">
      <span className={styles.customSpinnerHost}>
        <span data-scope="spinner" data-part="indicator" data-slot="spinner-indicator">
          <span data-scope="spinner" data-part="ring" data-slot="spinner-ring" />
        </span>
      </span>
    </Spinner>
  );
}