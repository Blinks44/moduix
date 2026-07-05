/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Text } from '@moduix/react';
import styles from '@/components/examples/text.module.css';

export function TextDemo() {
  return (
    <div className={styles.stack}>
      <Text>Use text to describe interface state and supporting details.</Text>
      <Text as="small" tone="muted">
        Last updated 2 minutes ago
      </Text>
    </div>
  );
}

//#endregion