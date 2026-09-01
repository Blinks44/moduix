import { Spinner } from '@moduix/react/spinner';
import styles from '@/components/examples/spinner/spinner-as-child.module.css';

export default function SpinnerAsChildDemo() {
  return (
    <Spinner asChild size="lg" aria-label="Loading report">
      <span className={styles.root}>
        <span
          aria-hidden="true"
          data-scope="spinner"
          data-part="indicator"
          data-slot="spinner-indicator"
        >
          <span data-scope="spinner" data-part="ring" data-slot="spinner-ring" />
        </span>
      </span>
    </Spinner>
  );
}