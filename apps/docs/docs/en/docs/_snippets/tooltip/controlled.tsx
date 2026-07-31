import { Button } from '@moduix/react/button';
import { Tooltip } from '@moduix/react/tooltip';
import { useState } from 'react';
import styles from '@/components/examples/tooltip.module.css';

export default function ControlledTooltipDemo() {
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