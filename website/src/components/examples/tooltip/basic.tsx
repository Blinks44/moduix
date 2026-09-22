import { Button } from '@moduix/react/button';
import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/react/tooltip';
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
      <TooltipBody>Notifications</TooltipBody>
    </Tooltip>
  );
}