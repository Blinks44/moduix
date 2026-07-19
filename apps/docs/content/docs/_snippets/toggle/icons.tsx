/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Toggle } from '@moduix/react';
import { Bell as BellIcon, Check as CheckIcon, Star as StarIcon } from 'lucide-react';
import styles from './toggle.module.css';

const size = 'icon-md';

const defaultPressed = true;

export function ToggleIconsDemo() {
  return (
    <div className={styles.row}>
      <Toggle variant="outline">
        <BellIcon />
        Alerts
      </Toggle>
      <Toggle size="icon-md" variant="outline" aria-label="Favorites">
        <StarIcon />
      </Toggle>
      <Toggle size="icon-md" variant="ghost" aria-label="Enabled" defaultPressed>
        <CheckIcon />
      </Toggle>
    </div>
  );
}

//#endregion