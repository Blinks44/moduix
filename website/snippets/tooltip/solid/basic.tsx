import { Button } from '@moduix/solid/button';
import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/solid/tooltip';
import { Bell as BellIcon } from 'lucide-solid';

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger
        asChild={(props) => (
          <Button {...props()} aria-label="Notifications">
            <BellIcon aria-hidden />
            Notifications
          </Button>
        )}
      />
      <TooltipBody>Notifications</TooltipBody>
    </Tooltip>
  );
}
