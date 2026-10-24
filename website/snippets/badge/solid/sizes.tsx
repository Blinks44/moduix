import { Badge } from '@moduix/solid/badge';
import styles from '@/components/examples/badge/badge-sizes.module.css';

const sizes = ['sm', 'md', 'lg'] as const;

export default function BadgeSizesDemo() {
  return (
    <div class={styles.root}>
      {sizes.map((size) => (
        <Badge size={size}>{size}</Badge>
      ))}
    </div>
  );
}