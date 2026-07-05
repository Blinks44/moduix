/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Stack, Text } from '@moduix/react';
import styles from './stack.module.css';

export function StackRowDemo() {
  return (
    <Stack direction="row" align="center" justify="space-between" gap={12} className={styles.row}>
      <Text weight="semibold">Status</Text>
      <Text tone="muted">Ready to publish</Text>
    </Stack>
  );
}

//#endregion