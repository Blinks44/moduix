import { Tooltip } from '@moduix/react';

export default function DelayTooltipDemo() {
  return (
    <Tooltip closeDelay={0} openDelay={0}>
      <Tooltip.Trigger>Immediate tooltip</Tooltip.Trigger>
      <Tooltip.Body>No open or close delay</Tooltip.Body>
    </Tooltip>
  );
}