import { Badge } from '@moduix/solid/badge';
import styles from '@/components/examples/badge/badge-variants.module.css';

const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const;

export default function BadgeVariantsDemo() {
  return (
    <div class={styles.root}>
      {variants.map((variant) => (
        <Badge variant={variant}>{variant}</Badge>
      ))}
    </div>
  );
}