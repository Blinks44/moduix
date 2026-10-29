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
import { Stack } from '@moduix/solid/stack';
import { createSignal } from 'solid-js';

export default function ControlledPopoverDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <Stack align="center" gap="3">
      <Popover open={open()} onOpenChange={(details) => setOpen(details.open)}>
        <PopoverTrigger
          asChild={(props) => <Button {...props()}>Open controlled popover</Button>}
        />
        <PopoverPositioner>
          <PopoverContent>
            <PopoverHeader>
              <PopoverTitle>Publish changes?</PopoverTitle>
              <PopoverDescription>
                This action will make your latest updates visible to all users.
              </PopoverDescription>
            </PopoverHeader>
            <PopoverFooter>
              <PopoverCloseTrigger>Close</PopoverCloseTrigger>
            </PopoverFooter>
          </PopoverContent>
        </PopoverPositioner>
      </Popover>
      <output>Open: {open() ? 'yes' : 'no'}</output>
    </Stack>
  );
}