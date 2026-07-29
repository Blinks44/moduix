import { Button, Popover, usePopover } from '@moduix/react';
import { PreviewMeta } from '@/components/mdx/Components';

export default function RootProviderDemo() {
  const popover = usePopover({
    positioning: {
      placement: 'bottom-start',
      gutter: 8,
    },
  });
  return (
    <div
      style={{
        display: 'grid',
        justifyItems: 'center',
        gap: 'var(--moduix-spacing-3)',
      }}
    >
      <Popover.RootProvider value={popover}>
        <Popover.Trigger asChild>
          <Button>Open from trigger</Button>
        </Popover.Trigger>
        <Popover.Positioner>
          <Popover.Content>
            <Popover.Header>
              <Popover.Title>External state</Popover.Title>
              <Popover.Description>
                The usePopover hook owns this popover state.
              </Popover.Description>
            </Popover.Header>
            <Popover.Footer>
              <Popover.CloseTrigger>Close</Popover.CloseTrigger>
            </Popover.Footer>
          </Popover.Content>
        </Popover.Positioner>
      </Popover.RootProvider>
      <PreviewMeta style={{ justifySelf: 'center' }}>
        <output>Open: {popover.open ? 'yes' : 'no'}</output>
        <Button size="sm" onClick={() => popover.setOpen(!popover.open)}>
          Toggle externally
        </Button>
      </PreviewMeta>
    </div>
  );
}