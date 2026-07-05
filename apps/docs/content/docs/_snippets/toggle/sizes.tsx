/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Toggle } from '@moduix/react';
import styles from './toggle.module.css';

export function ToggleSizesDemo() {
  return (
    <div className={styles.row}>
      <Toggle size="xs">Extra-small</Toggle>
      <Toggle size="sm">Small</Toggle>
      <Toggle size="md">Medium</Toggle>
      <Toggle size="lg">Large</Toggle>
    </div>
  );
}

//#endregion