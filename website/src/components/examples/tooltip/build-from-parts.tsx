import { Button } from '@moduix/react/button';
import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from '@moduix/react/tooltip';
import { Bell as BellIcon } from 'lucide-react';

export default function BuildFromPartsTooltipDemo() {
  return (
    <Tooltip>
      <TooltipTrigger asChild aria-label="Notifications">
        <Button>
          <BellIcon aria-hidden />
          Notifications
        </Button>
      </TooltipTrigger>
      <TooltipPositioner>
        <TooltipContent>Notifications</TooltipContent>
      </TooltipPositioner>
    </Tooltip>
  );
}