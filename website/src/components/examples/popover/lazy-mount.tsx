import { Button } from '@moduix/react/button';
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
} from '@moduix/react/popover';

export default function LazyMountPopoverDemo() {
  return (
    <Popover
      lazyMount
      unmountOnExit
      positioning={{
        gutter: 8,
      }}
    >
      <PopoverTrigger asChild>
        <Button>Open lazy popover</Button>
      </PopoverTrigger>
      <PopoverPositioner>
        <PopoverContent>
          <PopoverHeader>
            <PopoverTitle>Lazy mounted</PopoverTitle>
            <PopoverDescription>
              This content mounts on open and unmounts after exit.
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