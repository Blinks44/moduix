import { Button, Input, Popover } from '@moduix/react';

export default function AnchorPopoverDemo() {
  return (
    <Popover
      positioning={{
        gutter: 8,
      }}
    >
      <Popover.Anchor asChild>
        <Input placeholder="Popover anchor" />
      </Popover.Anchor>
      <Popover.Trigger asChild>
        <Button>Open below the input</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Custom anchor</Popover.Title>
            <Popover.Description>
              The popup is positioned relative to the input instead of the trigger.
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