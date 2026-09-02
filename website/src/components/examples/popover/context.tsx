import { Button } from '@moduix/react/button';
import { Popover, usePopoverContext } from '@moduix/react/popover';

function PopoverState() {
  const popover = usePopoverContext();
  return <output>Open: {popover.open ? 'yes' : 'no'}</output>;
}

export default function PopoverContextDemo() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <Popover.Trigger asChild>
        <Button>Open context example</Button>
      </Popover.Trigger>
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Context state</Popover.Title>
            <Popover.Description>
              Read state from a descendant without passing props through the popup tree.
            </Popover.Description>
          </Popover.Header>
          <Popover.Footer>
            <PopoverState />
            <Popover.CloseTrigger>Close</Popover.CloseTrigger>
          </Popover.Footer>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}