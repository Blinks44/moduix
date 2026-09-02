import { Separator } from '@moduix/react/separator';
import styles from '@/components/examples/separator/separator-variants.module.css';

const variants = ['solid', 'dashed', 'dotted'] as const;

export default function SeparatorVariantsDemo() {
  return (
    <div className={styles.root}>
      {variants.map((variant) => (
        <div key={variant} className={styles.item}>
          <span>{variant}</span>
          <Separator variant={variant} />
        </div>
      ))}
    </div>
  );
}