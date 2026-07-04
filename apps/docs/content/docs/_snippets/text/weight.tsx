/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Text } from '@moduix/react';
import styles from '@/components/examples/text.module.css';

export function TextWeightsDemo() {
  return (
    <div className={styles.stack}>
      <Text weight="regular">Regular weight</Text>
      <Text weight="medium">Medium weight</Text>
      <Text weight="semibold">Semibold weight</Text>
      <Text weight="bold">Bold weight</Text>
    </div>
  );
}

//#endregion