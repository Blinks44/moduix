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
} from '@moduix/solid/popover';

export default function PositioningPopoverDemo() {
  return (
    <Popover positioning={{ placement: 'left', gutter: 12 }}>
      <PopoverTrigger asChild={(props) => <Button {...props()}>Open on the left</Button>} />
      <PopoverPositioner>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Left placement</PopoverTitle>
            <PopoverDescription>
              Placement and offsets belong to Root.positioning.
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