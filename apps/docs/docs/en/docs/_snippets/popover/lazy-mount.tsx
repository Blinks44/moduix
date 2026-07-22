import { Button, Popover } from '@moduix/react';

export default function LazyMountPopoverDemo() {
  return (
    <Popover
      lazyMount
      unmountOnExit
      positioning={{
        gutter: 8,
      }}
    >
      <Popover.Trigger asChild>
        <Button>Open lazy popover</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Lazy mounted</Popover.Title>
            <Popover.Description>
              This content mounts on open and unmounts after exit.
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