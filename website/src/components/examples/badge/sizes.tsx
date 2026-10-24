import { Badge } from '@moduix/react/badge';
import styles from '@/components/examples/badge/badge-sizes.module.css';

const sizes = ['sm', 'md', 'lg'] as const;

export default function BadgeSizesDemo() {
  return (
    <div className={styles.root}>
      {sizes.map((size) => (
        <Badge key={size} size={size}>
          {size}
        </Badge>
      ))}
    </div>
  );
}