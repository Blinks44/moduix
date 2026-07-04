/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Popover } from '@moduix/react';

const sameWidth = true;

export function SameWidthPopoverDemo() {
  return (
    <Popover
      positioning={{
        sameWidth: true,
        gutter: 8,
      }}
    >
      <Popover.Trigger asChild>
        <Button className="wideTrigger">Match this trigger width</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content className="sameWidthContent">
          <Popover.Title>Matched width</Popover.Title>
          <Popover.Description>
            The content uses Ark's reference width measurement.
          </Popover.Description>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}

//#endregion