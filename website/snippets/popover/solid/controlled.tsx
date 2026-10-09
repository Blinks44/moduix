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
import { createSignal } from 'solid-js';
import styles from '@/components/examples/popover/popover-controlled.module.css';

export default function ControlledPopoverDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <div class={styles.root}>
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
    </div>
  );
}