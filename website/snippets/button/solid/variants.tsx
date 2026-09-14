import { Button } from '@moduix/solid/button';
import styles from '@/components/examples/button/button-variants.module.css';

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
    <div class={styles.root}>
      {variants.map((variant) => (
        <Button variant={variant}>{variant}</Button>
      ))}
    </div>
  );
}