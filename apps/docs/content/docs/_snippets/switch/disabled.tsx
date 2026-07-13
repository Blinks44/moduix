/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const states = [
  { label: 'Enable dark mode', disabled: true },
  { label: 'Keep me signed in', defaultChecked: true, disabled: true },
];

import { Switch } from '@moduix/react';
import styles from './switch-demo.module.css';

export function DisabledSwitchDemo() {
  return (
    <div className={styles.stack}>
      <Switch disabled>
        <Switch.Control />
        <Switch.Label>Enable dark mode</Switch.Label>
      </Switch>
      <Switch defaultChecked disabled>
        <Switch.Control />
        <Switch.Label>Keep me signed in</Switch.Label>
      </Switch>
    </div>
  );
}

//#endregion