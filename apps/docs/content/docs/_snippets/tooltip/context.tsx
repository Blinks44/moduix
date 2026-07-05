/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { useTooltipContext } from '@ark-ui/react/tooltip';
import { Tooltip } from '@moduix/react';

function TooltipStateContent() {
  const tooltip = useTooltipContext();
  return <Tooltip.Content>Open from context: {tooltip.open.toString()}</Tooltip.Content>;
}

export function ContextTooltipDemo() {
  return (
    <Tooltip>
      <Tooltip.Trigger>Context tooltip</Tooltip.Trigger>
      <Tooltip.Positioner>
        <TooltipStateContent />
      </Tooltip.Positioner>
    </Tooltip>
  );
}

//#endregion