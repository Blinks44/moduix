/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Popover } from '@moduix/react';

const positioning = {
  placement: 'left',
  gutter: 12,
};

export function PositioningPopoverDemo() {
  return (
    <Popover
      positioning={{
        placement: 'left',
        gutter: 12,
      }}
    >
      <Popover.Trigger asChild>
        <Button>Open on the left</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Left placement</Popover.Title>
            <Popover.Description>
              Placement and offsets belong to Root.positioning.
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