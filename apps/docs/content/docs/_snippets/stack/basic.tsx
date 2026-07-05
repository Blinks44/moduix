/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Heading, Stack, Text } from '@moduix/react';
import styles from './stack.module.css';

export function StackDemo() {
  return (
    <Stack gap={12} className={styles.panel}>
      <Heading as="h3" size="md">
        Project updates
      </Heading>
      <Text tone="muted">
        Use Stack when the layout intent is just flex direction, spacing, and alignment.
      </Text>
      <Text tone="muted">Keep custom layout rules in local CSS.</Text>
    </Stack>
  );
}

//#endregion