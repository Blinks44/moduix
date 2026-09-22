import { Tooltip, TooltipBody, TooltipTrigger } from '@moduix/react/tooltip';

export default function DelayTooltipDemo() {
  return (
    <Tooltip closeDelay={0} openDelay={0}>
      <TooltipTrigger>Immediate tooltip</TooltipTrigger>
      <TooltipBody>No open or close delay</TooltipBody>
    </Tooltip>
  );
}