import { Button } from '@moduix/solid/button';
import { Popover, usePopover } from '@moduix/solid/popover';
import styles from '@/components/examples/popover/popover-root-provider.module.css';

export default function RootProviderDemo() {
  const popover = usePopover({ positioning: { placement: 'bottom-start', gutter: 8 } });

  return (
    <div class={styles.root}>
      <Popover.RootProvider value={popover}>
        <Popover.Trigger asChild={(props) => <Button {...props()}>Open from trigger</Button>} />
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
      <output>Open: {popover().open ? 'yes' : 'no'}</output>
      <Button size="sm" onClick={() => popover().setOpen(!popover().open)}>
        Toggle externally
      </Button>
    </div>
  );
}