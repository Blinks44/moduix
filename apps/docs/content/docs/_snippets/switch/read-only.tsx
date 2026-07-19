/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const states = [
  { label: 'Managed by policy', readOnly: true },
  { label: 'Always on', defaultChecked: true, readOnly: true },
];

import { Switch } from '@moduix/react';
import styles from './switch-demo.module.css';

export function ReadOnlySwitchDemo() {
  return (
    <div className={styles.stack}>
      <Switch readOnly>
        <Switch.Control />
        <Switch.Label>Managed by policy</Switch.Label>
      </Switch>
      <Switch defaultChecked readOnly>
        <Switch.Control />
        <Switch.Label>Always on</Switch.Label>
      </Switch>
    </div>
  );
}

//#endregion