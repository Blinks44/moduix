import { Separator } from '@moduix/react/separator';
import styles from '@/components/examples/separator/separator-sizes.module.css';

const sizes = ['xs', 'sm', 'md', 'lg'] as const;

export default function SeparatorSizesDemo() {
  return (
    <div className={styles.root}>
      {sizes.map((size) => (
        <div key={size} className={styles.item}>
          <span>{size}</span>
          <Separator size={size} />
        </div>
      ))}
    </div>
  );
}