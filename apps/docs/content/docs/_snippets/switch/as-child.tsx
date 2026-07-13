/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const rootElement = 'label';
const asChild = true;

import { Switch } from '@moduix/react';
import styles from './switch-demo.module.css';

export function AsChildSwitchDemo() {
  return (
    <Switch asChild defaultChecked>
      <label className={styles.siblingRow}>
        <Switch.Control />
        <span className={styles.label}>Enable reminders</span>
      </label>
    </Switch>
  );
}

//#endregion