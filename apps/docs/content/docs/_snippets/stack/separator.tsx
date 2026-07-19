/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Separator, Stack, Text } from '@moduix/react';
import styles from './stack.module.css';

export function StackSeparatorDemo() {
  return (
    <Stack direction="row" align="center" gap={10} className={styles.row}>
      <Text weight="semibold">Design</Text>
      <Separator orientation="vertical" aria-hidden="true" />
      <Text tone="muted">Engineering</Text>
      <Separator orientation="vertical" aria-hidden="true" />
      <Text tone="muted">Docs</Text>
    </Stack>
  );
}

//#endregion