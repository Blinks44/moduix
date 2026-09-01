import { Button } from '@moduix/react/button';
import styles from '@/components/examples/button-variants.module.css';

const variants = [
  'default',
  'outline',
  'secondary',
  'destructive',
  'destructive-outline',
  'ghost',
  'link',
] as const;

export default function ButtonVariantsDemo() {
  return (
    <div className={styles.root}>
      {variants.map((variant) => (
        <Button key={variant} variant={variant}>
          {variant}
        </Button>
      ))}
    </div>
  );
}