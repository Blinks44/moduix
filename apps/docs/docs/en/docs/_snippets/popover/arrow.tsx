import { Button, Popover } from '@moduix/react';

export default function PopoverArrowDemo() {
  return (
    <Popover
      positioning={{
        gutter: 8,
      }}
    >
      <Popover.Trigger asChild>
        <Button>Open with arrow</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Arrow />
          <Popover.Header>
            <Popover.Title>With arrow</Popover.Title>
            <Popover.Description>
              Arrow and ArrowTip use Ark positioning variables.
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