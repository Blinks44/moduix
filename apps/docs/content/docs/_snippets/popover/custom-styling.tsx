/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Popover } from '@moduix/react';

export function CustomStylingPopoverDemo() {
  return (
    <Popover
      positioning={{
        gutter: 8,
      }}
    >
      <Popover.Trigger asChild>
        <Button>Open styled popover</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content className="customContent">
          <Popover.Arrow />
          <Popover.Header>
            <Popover.Title>Custom styling</Popover.Title>
            <Popover.Description>
              The Ark structure stays unchanged while moduix variables change the surface.
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