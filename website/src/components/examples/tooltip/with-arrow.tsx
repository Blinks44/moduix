import { Tooltip, TooltipArrow, TooltipPanel, TooltipTrigger } from '@moduix/react/tooltip';

export default function TooltipWithArrowDemo() {
  return (
    <Tooltip>
      <TooltipTrigger>Hover or focus</TooltipTrigger>
      <TooltipPanel>
        <TooltipArrow />
        Tooltip with arrow
      </TooltipPanel>
    </Tooltip>
  );
}