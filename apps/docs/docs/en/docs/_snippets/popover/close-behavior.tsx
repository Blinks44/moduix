import { Button, Popover } from '@moduix/react';

export default function CloseBehaviorPopoverDemo() {
  return (
    <Popover closeOnEscape={false} closeOnInteractOutside={false}>
      <Popover.Trigger asChild>
        <Button>Open persistent popover</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Explicit close</Popover.Title>
            <Popover.Description>
              Escape and outside interactions do not dismiss this popover.
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