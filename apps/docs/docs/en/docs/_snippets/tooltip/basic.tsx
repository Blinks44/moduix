import { Button } from '@moduix/react/button';
import { Tooltip } from '@moduix/react/tooltip';
import { Bell as BellIcon } from 'lucide-react';
import styles from '@/components/examples/tooltip.module.css';

export default function TooltipDemo() {
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
      <Tooltip.Body>Notifications</Tooltip.Body>
    </Tooltip>
  );
}