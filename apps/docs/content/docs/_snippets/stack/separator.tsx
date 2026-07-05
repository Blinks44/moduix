/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Separator, Stack, Text } from '@moduix/react';
import styles from './stack.module.css';

export function StackSeparatorDemo() {
  return (
    <Stack
      direction="row"
      align="center"
      gap={10}
      separator={<Separator orientation="vertical" aria-hidden="true" />}
      className={styles.row}
    >
      <Text weight="semibold">Design</Text>
      <Text tone="muted">Engineering</Text>
      <Text tone="muted">Docs</Text>
    </Stack>
  );
}

//#endregion