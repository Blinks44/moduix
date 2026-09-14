import { Button } from '@moduix/solid/button';
import { Tooltip } from '@moduix/solid/tooltip';
import { Bell as BellIcon } from 'lucide-solid';

export default function TooltipDemo() {
  return (
    <Tooltip>
      <Tooltip.Trigger
        asChild={(props) => (
          <Button {...props()} aria-label="Notifications">
            <BellIcon aria-hidden />
            Notifications
          </Button>
        )}
      />
      <Tooltip.Body>Notifications</Tooltip.Body>
    </Tooltip>
  );
}