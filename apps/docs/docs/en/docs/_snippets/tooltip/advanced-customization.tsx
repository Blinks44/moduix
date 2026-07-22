import { Button, Tooltip } from '@moduix/react';

export default function AdvancedCustomizationTooltipDemo() {
  return (
    <Tooltip positioning={{ placement: 'right', offset: { mainAxis: 12 } }}>
      <Tooltip.Trigger asChild>
        <Button>Hover or focus</Button>
      </Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>
          <Tooltip.Arrow>
            <Tooltip.ArrowTip />
          </Tooltip.Arrow>
          Explicit positioner and content.
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip>
  );
}