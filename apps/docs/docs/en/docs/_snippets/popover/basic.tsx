import { Button } from '@moduix/react/button';
import { Popover } from '@moduix/react/popover';
import { Bell as BellIcon } from 'lucide-react';

export default function PopoverDemo() {
  return (
    <Popover
      positioning={{
        gutter: 8,
      }}
    >
      <Popover.Trigger asChild>
        <Button>
          <BellIcon aria-hidden size={16} />
          Notifications
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