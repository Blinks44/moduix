import { Button } from '@moduix/react/button';
import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from '@moduix/react/tooltip';

export default function AdvancedCustomizationTooltipDemo() {
  return (
    <Tooltip positioning={{ placement: 'right', offset: { mainAxis: 12 } }}>
      <TooltipTrigger asChild>
        <Button>Hover or focus</Button>
      </TooltipTrigger>
      <TooltipPositioner>
        <TooltipContent>Explicit positioner and content.</TooltipContent>
      </TooltipPositioner>
    </Tooltip>
  );
}