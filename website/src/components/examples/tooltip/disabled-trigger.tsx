import { Button } from '@moduix/react/button';
import { Tooltip, TooltipPanel, TooltipDisabledTrigger } from '@moduix/react/tooltip';

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