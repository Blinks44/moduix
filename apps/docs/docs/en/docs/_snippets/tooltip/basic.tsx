import { Button } from '@moduix/react/button';
import { Tooltip } from '@moduix/react/tooltip';
import { Bell as BellIcon } from 'lucide-react';

export default function TooltipDemo() {
  return (
    <Tooltip>
      <Tooltip.Trigger asChild aria-label="Notifications">
        <Button>
          <BellIcon aria-hidden />
          Notifications
        </Button>
      </Tooltip.Trigger>
      <Tooltip.Body>Notifications</Tooltip.Body>
    </Tooltip>
  );
}