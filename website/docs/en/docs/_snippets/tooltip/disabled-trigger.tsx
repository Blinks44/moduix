import { Button } from '@moduix/react/button';
import { Tooltip } from '@moduix/react/tooltip';

export default function DisabledTriggerTooltipDemo() {
  return (
    <Tooltip>
      <Tooltip.DisabledTrigger aria-label="Create project is unavailable">
        <Button disabled>Create project</Button>
      </Tooltip.DisabledTrigger>
      <Tooltip.Body>Projects are unavailable while offline.</Tooltip.Body>
    </Tooltip>
  );
}