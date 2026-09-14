import { Button } from '@moduix/react/button';
import { Popover, usePopoverContext } from '@moduix/react/popover';
import { PreviewMeta } from '@/components/mdx/Components';

function PopoverState() {
  const popover = usePopoverContext();
  return (
    <PreviewMeta>
      <output>Open: {popover.open ? 'yes' : 'no'}</output>
    </PreviewMeta>
  );
}

export default function PopoverContextDemo() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <PopoverState />
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
            <Popover.CloseTrigger>Close</Popover.CloseTrigger>
          </Popover.Footer>
        </Popover.Content>
      </Popover.Positioner>
    </Popover>
  );
}