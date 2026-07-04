/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Tooltip } from '@moduix/react';

export function ArrowTooltipDemo() {
  return (
    <Tooltip>
      <Tooltip.Trigger>Hover or focus</Tooltip.Trigger>
      <Tooltip.Positioner>
        <Tooltip.Content>
          <Tooltip.Arrow />
          Tooltip with arrow
        </Tooltip.Content>
      </Tooltip.Positioner>
    </Tooltip>
  );
}

//#endregion