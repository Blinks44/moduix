/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Text } from '@moduix/react';
import styles from '@/components/examples/text.module.css';

const href = '/docs';

export function TextCustomElementDemo() {
  return (
    <Text asChild tone="primary" weight="medium">
      <a className={styles.link} href="/docs">
        Read the documentation
      </a>
    </Text>
  );
}

//#endregion