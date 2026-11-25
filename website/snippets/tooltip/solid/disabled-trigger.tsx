import { Button } from '@moduix/solid/button';
import { Tooltip, TooltipPanel, TooltipDisabledTrigger } from '@moduix/solid/tooltip';

export default function DisabledTriggerTooltipDemo() {
  return (
    <Tooltip>
      <TooltipDisabledTrigger aria-label="Create project is unavailable">
        <Button disabled>Create project</Button>
      </TooltipDisabledTrigger>
      <TooltipPanel>Projects are unavailable while offline.</TooltipPanel>
    </Tooltip>
  );
}