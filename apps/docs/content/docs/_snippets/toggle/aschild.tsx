/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { CheckIcon, Toggle } from '@moduix/react';
import styles from './toggle.module.css';

export function AsChildToggleDemo() {
  return (
    <Toggle asChild variant="outline" defaultPressed>
      <button type="button" className={styles.customButton}>
        <CheckIcon />
        Custom button
      </button>
    </Toggle>
  );
}

//#endregion