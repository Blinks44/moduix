import { Button } from '@moduix/solid/button';
import { Popover } from '@moduix/solid/popover';

export default function CloseBehaviorPopoverDemo() {
  return (
    <Popover closeOnEscape={false} closeOnInteractOutside={false}>
      <Popover.Trigger asChild={(props) => <Button {...props()}>Open persistent popover</Button>} />
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