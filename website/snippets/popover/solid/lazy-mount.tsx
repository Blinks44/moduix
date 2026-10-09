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

export default function LazyMountPopoverDemo() {
  return (
    <Popover lazyMount unmountOnExit positioning={{ gutter: 8 }}>
      <PopoverTrigger asChild={(props) => <Button {...props()}>Open lazy popover</Button>} />
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