import { Button } from '@moduix/solid/button';
import { Tooltip, TooltipPanel, TooltipTrigger } from '@moduix/solid/tooltip';
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
      <TooltipPanel>Notifications</TooltipPanel>
    </Tooltip>
  );
}