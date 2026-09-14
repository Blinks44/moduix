import { Spinner } from '@moduix/solid/spinner';
import styles from '@/components/examples/spinner/spinner-sizes.module.css';

const sizes = ['xs', 'sm', 'md', 'lg', 'xl'] as const;

export default function SpinnerSizesDemo() {
  return (
    <div class={styles.root}>
      {sizes.map((size) => (
        <Spinner decorative size={size} />
      ))}
    </div>
  );
}