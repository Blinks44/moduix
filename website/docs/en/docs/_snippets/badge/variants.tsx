import { Badge } from '@moduix/react/badge';
import styles from '@/components/examples/badge/badge-variants.module.css';

const variants = ['default', 'secondary', 'destructive', 'outline', 'ghost', 'link'] as const;

export default function BadgeVariantsDemo() {
  return (
    <div className={styles.root}>
      {variants.map((variant) => (
        <Badge key={variant} variant={variant}>
          {variant}
        </Badge>
      ))}
    </div>
  );
}