import { Stack } from '@moduix/react';
import styles from '@/components/examples/stack.module.css';

export default function StackWrapDemo() {
  return (
    <Stack direction="row" gap={8} wrap="wrap" className={styles.wrap}>
      <div className={styles.pill}>Design</div>
      <div className={styles.pill}>Engineering</div>
      <div className={styles.pill}>Docs</div>
      <div className={styles.pill}>Release</div>
    </Stack>
  );
}