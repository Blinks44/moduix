import { Spinner } from '@moduix/solid/spinner';
import styles from '@/components/examples/spinner/spinner-as-child.module.css';

export default function SpinnerAsChildDemo() {
  return (
    <Spinner
      asChild={(props) => (
        <span {...props()} class={`${props().class ?? ''} ${styles.root}`}>
          <span
            aria-hidden="true"
            data-scope="spinner"
            data-part="indicator"
            data-slot="spinner-indicator"
          >
            <span data-scope="spinner" data-part="ring" data-slot="spinner-ring" />
          </span>
        </span>
      )}
      size="lg"
      aria-label="Loading report"
    />
  );
}