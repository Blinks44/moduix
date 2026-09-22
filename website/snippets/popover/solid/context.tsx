import { Button } from '@moduix/solid/button';
import {
  Popover,
  PopoverCloseTrigger,
  PopoverContent,
  PopoverDescription,
  PopoverFooter,
  PopoverHeader,
  PopoverPositioner,
  PopoverTitle,
  PopoverTrigger,
  usePopoverContext,
} from '@moduix/solid/popover';

function PopoverState() {
  const popover = usePopoverContext();
  return <output>Open: {popover().open ? 'yes' : 'no'}</output>;
}

export default function PopoverContextDemo() {
  return (
    <Popover positioning={{ gutter: 8 }}>
      <PopoverState />
      <PopoverTrigger asChild={(props) => <Button {...props()}>Open context example</Button>} />
      <PopoverPositioner>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Context state</PopoverTitle>
            <PopoverDescription>
              Read state from a descendant without passing props through the popup tree.
            </PopoverDescription>
          </PopoverHeader>
          <PopoverFooter>
            <PopoverCloseTrigger>Close</PopoverCloseTrigger>
          </PopoverFooter>
        </PopoverContent>
      </PopoverPositioner>
    </Popover>
  );
}