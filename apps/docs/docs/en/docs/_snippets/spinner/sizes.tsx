import { Spinner } from '@moduix/react';
import styles from '@/components/examples/spinner.module.css';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function SpinnerSizesDemo() {
  return (
    <div className={styles.row}>
      {sizes.map((size) => (
        <Spinner key={size} decorative size={size} />
      ))}
    </div>
  );
}