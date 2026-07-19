/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Tooltip } from '@moduix/react';
import { useState } from 'react';
import styles from './tooltip-demo.module.css';

export function ControlledTooltipDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.stack}>
      <Button variant="outline" onClick={() => setOpen((value) => !value)}>
        Toggle
      </Button>
      <Tooltip open={open} onOpenChange={(details) => setOpen(details.open)}>
        <Tooltip.Trigger>Controlled tooltip</Tooltip.Trigger>
        <Tooltip.Body>Open: {String(open)}</Tooltip.Body>
      </Tooltip>
    </div>
  );
}

//#endregion