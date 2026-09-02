import { Button } from '@moduix/react/button';
import { Tooltip } from '@moduix/react/tooltip';

export default function AdvancedCustomizationTooltipDemo() {
  return (
    <Tooltip positioning={{ placement: 'right', offset: { mainAxis: 12 } }}>
      <Tooltip.Trigger asChild>
        <Button>Hover or focus</Button>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>Explicit positioner and content.</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip>
  );
}