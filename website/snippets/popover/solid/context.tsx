import { Button } from '@moduix/solid/button';
import { Popover, usePopoverContext } from '@moduix/solid/popover';

function PopoverState() {
  const popover = usePopoverContext();
  return <output>Open: {popover().open ? 'yes' : 'no'}</output>;
}

export default function PopoverContextDemo() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <PopoverState />
      <Popover.Trigger asChild={(props) => <Button {...props()}>Open context example</Button>} />
      <Popover.Positioner>
        <Popover.Content>
          <Popover.Header>
            <Popover.Title>Context state</Popover.Title>
            <Popover.Description>
              Read state from a descendant without passing props through the popup tree.
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