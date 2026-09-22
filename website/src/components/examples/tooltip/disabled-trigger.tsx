import { Button } from '@moduix/react/button';
import { Tooltip, TooltipBody, TooltipDisabledTrigger } from '@moduix/react/tooltip';

export default function DisabledTriggerTooltipDemo() {
  return (
    <Tooltip>
      <TooltipDisabledTrigger aria-label="Create project is unavailable">
        <Button disabled>Create project</Button>
      </TooltipDisabledTrigger>
      <TooltipBody>Projects are unavailable while offline.</TooltipBody>
    </Tooltip>
  );
}
