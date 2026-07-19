/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

const initialChecked = true;
const onCheckedChange = (details) => setChecked(details.checked);

import { Switch } from '@moduix/react';
import { useState } from 'react';
import styles from './switch-demo.module.css';

export function ControlledSwitchDemo() {
  const [checked, setChecked] = useState(true);

  return (
    <div className={styles.stack}>
      <Switch checked={checked} onCheckedChange={(details) => setChecked(details.checked)}>
        <Switch.Control />
        <Switch.Label>{checked ? 'On' : 'Off'}</Switch.Label>
      </Switch>
      <span className={styles.hint}>Current value: {String(checked)}</span>
    </div>
  );
}

//#endregion