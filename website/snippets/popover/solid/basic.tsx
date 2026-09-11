import { Button } from '@moduix/solid/button';
import { Popover } from '@moduix/solid/popover';
import { Bell as BellIcon } from 'lucide-solid';

export default function PopoverDemo() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <Popover.Trigger
        asChild={(props) => (
          <Button {...props()}>
            <BellIcon aria-hidden size={16} />
            Notifications
          </Button>
        )}
      />
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