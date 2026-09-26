import { Button } from '@moduix/solid/button';
import { Tooltip, TooltipContent, TooltipPositioner, TooltipTrigger } from '@moduix/solid/tooltip';

export default function AdvancedCustomizationTooltipDemo() {
  return (
    <Tooltip positioning={{ placement: 'right', offset: { mainAxis: 12 } }}>
      <TooltipTrigger asChild={(props) => <Button {...props()}>Hover or focus</Button>} />
      <TooltipPositioner>
        <TooltipContent>Explicit positioner and content.</TooltipContent>
      </TooltipPositioner>
    </Tooltip>
  );
}