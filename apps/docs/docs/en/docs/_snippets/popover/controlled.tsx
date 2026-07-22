import { Button, Popover } from '@moduix/react';
import { useState } from 'react';

export default function ControlledPopoverDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className="stack">
      <span>Popover is {open ? 'open' : 'closed'}</span>
      <Popover open={open} onOpenChange={(details) => setOpen(details.open)}>
        <Popover.Trigger asChild>
          <Button>Open controlled popover</Button>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Header>
              <Popover.Title>Publish changes?</Popover.Title>
              <Popover.Description>
                This action will make your latest updates visible to all users.
              </Popover.Description>
            </Popover.Header>
            <Popover.Footer>
              <Popover.CloseTrigger>Close</Popover.CloseTrigger>
            </Popover.Footer>
          </Popover.Content>
        </Popover.Positioner>
      </Popover>
    </div>
  );
}