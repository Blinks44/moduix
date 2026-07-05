/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Toggle } from '@moduix/react';
import styles from './toggle.module.css';

const disabled = true;

const defaultPressed = true;

export function DisabledToggleDemo() {
  return (
    <div className={styles.row}>
      <Toggle disabled>Disabled</Toggle>
      <Toggle defaultPressed disabled>
        Pressed
      </Toggle>
    </div>
  );
}

//#endregion