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
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';
import styles from '@/components/examples/popover/popover-controlled.module.css';

export default function ControlledPopoverDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div className={styles.root}>
      <Popover open={open} onOpenChange={(details) => setOpen(details.open)}>
        <PopoverTrigger asChild>
          <Button>Open controlled popover</Button>
        </PopoverTrigger>
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
      <PreviewMeta>
        <output>Open: {open ? 'yes' : 'no'}</output>
      </PreviewMeta>
    </div>
  );
}