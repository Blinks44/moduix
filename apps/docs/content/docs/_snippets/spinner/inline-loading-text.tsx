/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Spinner } from '@moduix/react';
import styles from './spinner.module.css';

export function SpinnerInlineDemo() {
  return (
    <div className={styles.inline}>
      <Spinner decorative size="sm" />
      <span className={styles.muted}>Saving changes</span>
    </div>
  );
}

//#endregion