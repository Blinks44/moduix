/* eslint-disable no-unused-vars, no-unused-expressions */
//#region demo

import { Button, Popover } from '@moduix/react';
import { Bell as BellIcon } from 'lucide-react';

const positioning = {
  gutter: 8,
};

export function PopoverDemo() {
  return (
    <Popover
      positioning={{
        gutter: 8,
      }}
    >
      <Popover.Trigger asChild>
        <Button>
          <span className="triggerContent">
            <BellIcon className="icon" />
            Notifications
          </span>
        </Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Notifications</Popover.Title>
            <Popover.Description>You are all caught up. Good job!</Popover.Description>
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