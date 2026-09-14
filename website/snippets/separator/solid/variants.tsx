import { Separator } from '@moduix/solid/separator';
import styles from '@/components/examples/separator/separator-variants.module.css';

const variants = ['solid', 'dashed', 'dotted'] as const;

export default function SeparatorVariantsDemo() {
  return (
    <div class={styles.root}>
      {variants.map((variant) => (
        <div class={styles.item}>
          <span>{variant}</span>
          <Separator variant={variant} />
        </div>
      ))}
    </div>
  );
}