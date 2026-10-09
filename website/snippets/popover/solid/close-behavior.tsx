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

export default function CloseBehaviorPopoverDemo() {
  return (
    <Popover closeOnEscape={false} closeOnInteractOutside={false}>
      <PopoverTrigger asChild={(props) => <Button {...props()}>Open persistent popover</Button>} />
      <PopoverPositioner>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Explicit close</PopoverTitle>
            <PopoverDescription>
              Escape and outside interactions do not dismiss this popover.
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