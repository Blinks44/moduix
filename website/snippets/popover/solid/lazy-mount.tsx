import { Button } from '@moduix/solid/button';
import { Popover } from '@moduix/solid/popover';

export default function LazyMountPopoverDemo() {
  return (
    <Popover lazyMount unmountOnExit positioning={{ gutter: 8 }}>
      <Popover.Trigger asChild={(props) => <Button {...props()}>Open lazy popover</Button>} />
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