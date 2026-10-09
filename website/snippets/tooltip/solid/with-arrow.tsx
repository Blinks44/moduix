import { Tooltip, TooltipArrow, TooltipBody, TooltipTrigger } from '@moduix/solid/tooltip';

export default function TooltipWithArrowDemo() {
  return (
    <Tooltip>
      <TooltipTrigger>Hover or focus</TooltipTrigger>
      <TooltipBody>
        <TooltipArrow />
        Tooltip with arrow
      </TooltipBody>
    </Tooltip>
  );
}