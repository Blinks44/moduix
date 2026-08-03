import { Button } from '@moduix/react/button';
import { Popover } from '@moduix/react/popover';
import { useState } from 'react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function ControlledPopoverDemo() {
  const [open, setOpen] = useState(false);
  return (
    <div
      style={{
        display: 'grid',
        justifyItems: 'center',
        gap: 'var(--moduix-spacing-3)',
      }}
    >
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
      <PreviewMeta style={{ justifySelf: 'center' }}>
        <output>Open: {open ? 'yes' : 'no'}</output>
      </PreviewMeta>
    </div>
  );
}