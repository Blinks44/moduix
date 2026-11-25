import { Button } from '@moduix/react/button';
import { Tooltip, TooltipPanel, TooltipTrigger } from '@moduix/react/tooltip';
import { Bell as BellIcon } from 'lucide-react';

export default function TooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild aria-label="Notifications">
        <Button>
          <BellIcon aria-hidden />
          Notifications
        </Button>
      </TooltipTrigger>
      <TooltipPanel>Notifications</TooltipPanel>
    </Tooltip>
  );
}