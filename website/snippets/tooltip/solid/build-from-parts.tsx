import { Button } from '@moduix/solid/button';
import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from '@moduix/solid/tooltip';
import { Bell as BellIcon } from 'lucide-solid';

export default function BuildFromPartsTooltipDemo() {
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
      <TooltipPositioner>
        <TooltipContent>Notifications</TooltipContent>
      </TooltipPositioner>
    </Tooltip>
  );
}