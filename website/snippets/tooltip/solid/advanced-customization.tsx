import { Button } from '@moduix/solid/button';
import { Tooltip } from '@moduix/solid/tooltip';

export default function AdvancedCustomizationTooltipDemo() {
  return (
    <Tooltip positioning={{ placement: 'right', offset: { mainAxis: 12 } }}>
      <Tooltip.Trigger asChild={(props) => <Button {...props()}>Hover or focus</Button>} />
      <Tooltip.Positioner>
        <Tooltip.Content>Explicit positioner and content.</Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip>
  );
}