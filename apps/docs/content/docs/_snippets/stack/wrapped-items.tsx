/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Stack } from '@moduix/react';
import styles from './stack.module.css';

export function StackWrapDemo() {
  return (
    <Stack direction="row" gap={8} wrap="wrap" className={styles.wrap}>
      <div className={styles.pill}>Design</div>
      <div className={styles.pill}>Engineering</div>
      <div className={styles.pill}>Docs</div>
      <div className={styles.pill}>Release</div>
    </Stack>
  );
}

//#endregion