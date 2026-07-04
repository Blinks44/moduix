/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Stack, Text } from '@moduix/react';
import styles from './stack.module.css';

const direction = {
  mobile: 'column',
  desktop: 'row',
};

export function StackResponsiveDirectionDemo() {
  return (
    <Stack
      direction={{
        mobile: 'column',
        desktop: 'row',
      }}
      gap={12}
      className={styles.row}
    >
      <Text weight="semibold">Adaptive layout</Text>
      <Text tone="muted">Column on mobile, row from desktop width.</Text>
    </Stack>
  );
}

//#endregion