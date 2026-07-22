import { Tooltip, useTooltipContext } from '@moduix/react';

function TooltipStateContent() {
  const tooltip = useTooltipContext();
  return <Tooltip.Content>Open from context: {tooltip.open.toString()}</Tooltip.Content>;
}

export default function ContextTooltipDemo() {
  return (
    <Tooltip>
      <Tooltip.Trigger>Context tooltip</Tooltip.Trigger>
      <Tooltip.Positioner>
        <TooltipStateContent />
      </Tooltip.Positioner>
    </Tooltip>
  );
}