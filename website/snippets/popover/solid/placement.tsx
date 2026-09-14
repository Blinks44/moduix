import { Button } from '@moduix/solid/button';
import { Popover } from '@moduix/solid/popover';

export default function PositioningPopoverDemo() {
  return (
    <Popover positioning={{ placement: 'left', gutter: 12 }}>
      <Popover.Trigger asChild={(props) => <Button {...props()}>Open on the left</Button>} />
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Left placement</Popover.Title>
            <Popover.Description>
              Placement and offsets belong to Root.positioning.
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