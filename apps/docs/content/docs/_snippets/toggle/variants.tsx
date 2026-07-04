/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Toggle } from '@moduix/react';
import styles from './toggle.module.css';

const defaultPressed = true;

export function ToggleVariantsDemo() {
  return (
    <div className={styles.row}>
      <Toggle>Default</Toggle>
      <Toggle variant="outline">Outline</Toggle>
      <Toggle variant="ghost">Ghost</Toggle>
      <Toggle defaultPressed>Pressed</Toggle>
    </div>
  );
}

//#endregion