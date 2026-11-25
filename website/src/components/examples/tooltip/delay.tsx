import { Tooltip, TooltipPanel, TooltipTrigger } from '@moduix/react/tooltip';

export default function DelayTooltipDemo() {
  return (
    <Tooltip closeDelay={0} openDelay={0}>
      <TooltipTrigger>Immediate tooltip</TooltipTrigger>
      <TooltipPanel>No open or close delay</TooltipPanel>
    </Tooltip>
  );
}