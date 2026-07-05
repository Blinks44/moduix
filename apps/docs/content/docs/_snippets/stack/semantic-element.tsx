/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Heading, Stack, Text } from '@moduix/react';
import styles from './stack.module.css';

export function StackSemanticDemo() {
  return (
    <Stack asChild gap={12} className={styles.panel}>
      <section>
        <Heading as="h3" size="md">
          Rendered as section
        </Heading>
        <Text tone="muted">
          Use asChild when the layout wrapper should also carry document semantics.
        </Text>
      </section>
    </Stack>
  );
}

//#endregion