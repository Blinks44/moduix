import { Button } from '@moduix/solid/button';
import { Popover } from '@moduix/solid/popover';
import { createSignal } from 'solid-js';
import styles from '@/components/examples/popover/popover-controlled.module.css';

export default function ControlledPopoverDemo() {
  const [open, setOpen] = createSignal(false);

  return (
    <div class={styles.root}>
      <Popover open={open()} onOpenChange={(details) => setOpen(details.open)}>
        <Popover.Trigger
          asChild={(props) => <Button {...props()}>Open controlled popover</Button>}
        />
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Header>
              <Popover.Title>Publish changes?</Popover.Title>
              <Popover.Description>
                This action will make your latest updates visible to all users.
              </Popover.Description>
            </Popover.Header>
            <Popover.Footer>
              <Popover.CloseTrigger>Close</Popover.CloseTrigger>
            </Popover.Footer>
          </Popover.Content>
        </Popover.Positioner>
      </Popover>
      <output>Open: {open() ? 'yes' : 'no'}</output>
    </div>
  );
}