import { Button } from '@moduix/react/button';
import { Popover } from '@moduix/react/popover';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/popover/popover-controlled.module.css';

export default function ControlledPopoverDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.root}>
      <Popover open={open} onOpenChange={(details) => setOpen(details.open)}>
        <Popover.Trigger asChild>
          <Button>Open controlled popover</Button>
        </Popover.Trigger>
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
      <PreviewMeta>
        <output>Open: {open ? 'yes' : 'no'}</output>
      </PreviewMeta>
    </div>
  );
}