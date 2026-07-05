/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Popover } from '@moduix/react';

const gutter = 8;

export function PopoverArrowDemo() {
  return (
    <Popover
      positioning={{
        gutter: 8,
      }}
    >
      <Popover.Trigger asChild>
        <Button>Open with arrow</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow />
          <Popover.Header>
            <Popover.Title>With arrow</Popover.Title>
            <Popover.Description>
              Arrow and ArrowTip use Ark positioning variables.
            </Popover.Description>
          </Popover.Header>
          <Popover.Footer>
            <Popover.CloseTrigger>Close</Popover.CloseTrigger>
          </Popover.Footer>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}

//#endregion