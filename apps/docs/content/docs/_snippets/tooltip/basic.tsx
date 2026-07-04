/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Tooltip } from '@moduix/react';
import { Bell as BellIcon } from 'lucide-react';
import styles from './tooltip-demo.module.css';

export function TooltipDemo() {
  return (
    <Tooltip>
      <Tooltip.Trigger asChild aria-label="Notifications">
        <Button>
          <span className={styles.triggerContent}>
            <BellIcon className={styles.icon} />
            Notifications
          </span>
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>Notifications</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip>
  );
}

//#endregion