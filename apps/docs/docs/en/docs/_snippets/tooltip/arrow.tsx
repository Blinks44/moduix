import { Tooltip } from '@moduix/react';

export default function ArrowTooltipDemo() {
  return (
    <Tooltip>
      <Tooltip.Trigger>Hover or focus</Tooltip.Trigger>
      <Tooltip.Body>
        <Tooltip.Arrow />
        Tooltip with arrow
      </Tooltip.Body>
    </Tooltip>
  );
}